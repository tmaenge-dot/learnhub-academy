#!/usr/bin/env python3
"""
Automatically extract individual strokes from professional reference pages
using OpenCV computer vision.

This script:
1. Loads professional stroke pages (PNG, 300 DPI)
2. Detects individual stroke regions using contour detection
3. Crops and saves each stroke as a separate image
4. Generates a PDF document with all extracted strokes
"""

import cv2
import numpy as np
from pathlib import Path
import json
from PIL import Image
from reportlab.lib.pagesizes import letter, A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
PROFESSIONAL_DIR = PROJECT_ROOT / "assets" / "stroke-images" / "professional"
OUTPUT_DIR = PROJECT_ROOT / "assets" / "stroke-images" / "extracted-professional"
PDF_OUTPUT = PROJECT_ROOT / "extracted_strokes.pdf"

# Create output directory
OUTPUT_DIR.mkdir(exist_ok=True, parents=True)

# Stroke pages mapping (from OFFICIAL_STROKE_REFERENCE.md)
STROKE_PAGES = {
    '009': ['P', 'B'],
    '010': ['T', 'D'],
    '011': ['CH', 'J'],
    '016': ['F', 'V'],
    '017': ['ITH', 'THE'],
    '018': ['S', 'Z'],
    '019': ['ISH', 'ZHEE'],
    '020': ['K', 'G', 'M'],
    '021': ['N', 'NG', 'L', 'W', 'Y', 'H'],
}

def detect_strokes(image_path, min_area=1000, max_area=50000):
    """
    Detect individual stroke regions using OpenCV contour detection.
    
    Args:
        image_path: Path to the page image
        min_area: Minimum contour area to consider as a stroke
        max_area: Maximum contour area to consider as a stroke
        
    Returns:
        List of bounding boxes (x, y, w, h) for detected strokes
    """
    # Read image
    img = cv2.imread(str(image_path))
    if img is None:
        print(f"❌ Failed to load: {image_path}")
        return []
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply adaptive thresholding to handle varying lighting
    binary = cv2.adaptiveThreshold(
        gray, 255, 
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY_INV, 
        11, 2
    )
    
    # Morphological operations to clean up noise
    kernel = np.ones((3, 3), np.uint8)
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
    
    # Find contours
    contours, _ = cv2.findContours(
        binary,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )
    
    # Filter contours by area and get bounding boxes
    bboxes = []
    for contour in contours:
        area = cv2.contourArea(contour)
        if min_area < area < max_area:
            x, y, w, h = cv2.boundingRect(contour)
            # Add some padding
            padding = 10
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = w + 2 * padding
            h = h + 2 * padding
            bboxes.append((x, y, w, h))
    
    # Sort bboxes left to right, top to bottom
    bboxes.sort(key=lambda b: (b[1] // 100, b[0]))  # Group by rows first
    
    return bboxes, img

def extract_stroke(img, bbox, stroke_name, output_dir):
    """Extract and save a single stroke."""
    x, y, w, h = bbox
    cropped = img[y:y+h, x:x+w]
    
    # Save as PNG
    output_path = output_dir / f"{stroke_name}_professional.png"
    cv2.imwrite(str(output_path), cropped)
    
    return output_path

def create_pdf_document(extracted_strokes, pdf_path):
    """Create a PDF document with all extracted strokes."""
    c = canvas.Canvas(str(pdf_path), pagesize=A4)
    width, height = A4
    
    # Title page
    c.setFont("Helvetica-Bold", 24)
    c.drawString(100, height - 100, "Pitman Shorthand Strokes")
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 130, "Extracted from Official Reference Material")
    c.drawString(100, height - 150, f"Total Strokes: {len(extracted_strokes)}")
    c.showPage()
    
    # Strokes per page
    strokes_per_page = 6
    current_row = 0
    y_position = height - 100
    
    for i, (stroke_name, stroke_path) in enumerate(extracted_strokes.items()):
        if current_row >= strokes_per_page:
            c.showPage()
            current_row = 0
            y_position = height - 100
        
        # Draw stroke name
        c.setFont("Helvetica-Bold", 14)
        c.drawString(100, y_position, stroke_name)
        
        # Draw stroke image
        try:
            img = ImageReader(str(stroke_path))
            c.drawImage(img, 200, y_position - 80, width=150, height=100, preserveAspectRatio=True)
        except Exception as e:
            c.drawString(200, y_position - 40, f"Error loading image: {e}")
        
        y_position -= 120
        current_row += 1
    
    c.save()
    print(f"\n📄 PDF created: {pdf_path}")

def process_all_pages():
    """Process all professional stroke pages."""
    print("🎨 AUTOMATIC STROKE EXTRACTION")
    print("=" * 60)
    print("\nUsing OpenCV computer vision to detect and extract strokes...")
    print()
    
    extracted_strokes = {}
    total_detected = 0
    
    for page_num, stroke_names in STROKE_PAGES.items():
        # Find page file
        page_files = list(PROFESSIONAL_DIR.glob(f"*page-{page_num}.png"))
        
        if not page_files:
            print(f"⚠️  Page {page_num} not found, skipping...")
            continue
        
        page_path = page_files[0]
        print(f"\n📖 Processing: {page_path.name}")
        print(f"   Expected strokes: {', '.join(stroke_names)}")
        
        # Detect strokes
        bboxes, img = detect_strokes(page_path)
        print(f"   Detected regions: {len(bboxes)}")
        
        if len(bboxes) == 0:
            print(f"   ❌ No strokes detected!")
            continue
        
        # Extract each stroke
        for i, stroke_name in enumerate(stroke_names):
            if i < len(bboxes):
                bbox = bboxes[i]
                output_path = extract_stroke(img, bbox, stroke_name, OUTPUT_DIR)
                extracted_strokes[stroke_name] = output_path
                print(f"   ✅ Extracted: {stroke_name} -> {output_path.name}")
                total_detected += 1
            else:
                print(f"   ⚠️  Not enough regions for: {stroke_name}")
    
    print("\n" + "=" * 60)
    print("✨ EXTRACTION COMPLETE!")
    print("=" * 60)
    print(f"\n📊 Summary:")
    print(f"   • Total strokes extracted: {total_detected}/26")
    print(f"   • Output directory: {OUTPUT_DIR}")
    print(f"   • Files:")
    
    for stroke_name, path in sorted(extracted_strokes.items()):
        size = path.stat().st_size // 1024
        print(f"      {stroke_name:8s} -> {path.name} ({size}KB)")
    
    # Create metadata JSON
    metadata = {
        'total_strokes': len(extracted_strokes),
        'strokes': {name: str(path) for name, path in extracted_strokes.items()},
        'extraction_method': 'OpenCV contour detection',
        'source': 'Professional reference book pages (300 DPI)'
    }
    
    metadata_path = OUTPUT_DIR / "extraction_metadata.json"
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"\n📝 Metadata saved: {metadata_path}")
    
    # Create PDF document
    print("\n📄 Creating PDF document...")
    create_pdf_document(extracted_strokes, PDF_OUTPUT)
    
    print("\n🎯 Next Steps:")
    print("   1. Review extracted strokes in:", OUTPUT_DIR)
    print("   2. Check PDF document:", PDF_OUTPUT)
    print("   3. Manually adjust any incorrect extractions if needed")
    print("   4. Integrate into app when ready!")

def main():
    try:
        import cv2
        print("✅ OpenCV available")
    except ImportError:
        print("❌ OpenCV not installed!")
        print("\nInstall with:")
        print("   pip install opencv-python")
        return
    
    try:
        from reportlab.pdfgen import canvas
        print("✅ ReportLab available")
    except ImportError:
        print("❌ ReportLab not installed!")
        print("\nInstall with:")
        print("   pip install reportlab")
        return
    
    # Check for professional pages
    if not PROFESSIONAL_DIR.exists():
        print(f"❌ Professional pages directory not found: {PROFESSIONAL_DIR}")
        return
    
    page_files = list(PROFESSIONAL_DIR.glob("*page-*.png"))
    if not page_files:
        print(f"❌ No professional page files found in: {PROFESSIONAL_DIR}")
        return
    
    print(f"✅ Found {len(page_files)} professional pages\n")
    
    # Process all pages
    process_all_pages()

if __name__ == "__main__":
    main()
