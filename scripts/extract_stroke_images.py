#!/usr/bin/env python3
"""
Extract individual stroke images from the Pitman Shorthand reference book
This script processes the PDF and extracts each stroke as a separate image
"""
import cv2
import numpy as np
from pdf2image import convert_from_path
import os
import json
from pathlib import Path

def extract_strokes_from_page(image_path, page_num):
    """Extract individual strokes from a textbook page"""
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        print(f"  ⚠️  Could not load image: {image_path}")
        return []
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold to get binary image
    _, binary = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)
    
    # Apply morphological operations to clean up
    kernel = np.ones((2, 2), np.uint8)
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    
    # Find contours (individual strokes)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    strokes = []
    for i, contour in enumerate(contours):
        # Get bounding box
        x, y, w, h = cv2.boundingRect(contour)
        
        # Filter noise (too small) and full page elements (too large)
        # Strokes are typically between 20-200 pixels in each dimension
        if 20 < w < 300 and 20 < h < 300:
            # Calculate aspect ratio to filter out text/numbers
            aspect_ratio = w / h
            
            # Strokes usually have aspect ratio between 0.2 and 5.0
            if 0.2 < aspect_ratio < 5.0:
                # Extract stroke region with padding
                padding = 15
                x1 = max(0, x - padding)
                y1 = max(0, y - padding)
                x2 = min(img.shape[1], x + w + padding)
                y2 = min(img.shape[0], y + h + padding)
                
                stroke_img = img[y1:y2, x1:x2]
                
                strokes.append({
                    'image': stroke_img,
                    'bbox': (x, y, w, h),
                    'page': page_num,
                    'id': f'p{page_num:03d}_s{i:03d}',
                    'size': (w, h),
                    'aspect_ratio': round(aspect_ratio, 2)
                })
    
    return strokes

def process_reference_book(pdf_path, output_dir, start_page=1, end_page=40):
    """Process the reference book and extract all strokes"""
    print("\n" + "="*60)
    print("STROKE IMAGE EXTRACTION FROM REFERENCE BOOK")
    print("="*60)
    
    # Check if PDF exists
    if not os.path.exists(pdf_path):
        print(f"❌ Error: PDF not found at {pdf_path}")
        return []
    
    print(f"\n📖 Processing: {pdf_path}")
    print(f"📄 Pages: {start_page} to {end_page}")
    
    # Convert PDF to images
    print(f"\n🔄 Converting PDF to images (this may take a minute)...")
    try:
        pages = convert_from_path(
            pdf_path, 
            dpi=300,
            first_page=start_page,
            last_page=end_page
        )
        print(f"✅ Converted {len(pages)} pages")
    except Exception as e:
        print(f"❌ Error converting PDF: {e}")
        print("\n💡 Make sure you have poppler installed:")
        print("   Ubuntu/Debian: sudo apt-get install poppler-utils")
        print("   macOS: brew install poppler")
        return []
    
    all_strokes = []
    total_strokes = 0
    
    # Create temp directory for page images
    temp_dir = Path(output_dir) / 'temp_pages'
    temp_dir.mkdir(parents=True, exist_ok=True)
    
    # Process each page
    for page_num, page in enumerate(pages, start_page):
        print(f"\n📄 Processing page {page_num}...")
        
        # Save page as temp image
        temp_path = str(temp_dir / f'page_{page_num:03d}.png')
        page.save(temp_path, 'PNG')
        
        # Extract strokes from this page
        strokes = extract_strokes_from_page(temp_path, page_num)
        
        # Save individual stroke images
        for stroke in strokes:
            stroke_id = stroke['id']
            output_path = os.path.join(output_dir, 'unlabeled', f'{stroke_id}.png')
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save stroke image
            cv2.imwrite(output_path, stroke['image'])
            
            # Store metadata (without the image data)
            all_strokes.append({
                'id': stroke_id,
                'page': page_num,
                'bbox': stroke['bbox'],
                'size': stroke['size'],
                'aspect_ratio': stroke['aspect_ratio'],
                'path': output_path
            })
        
        total_strokes += len(strokes)
        print(f"  ✓ Found {len(strokes)} potential strokes (total: {total_strokes})")
    
    # Clean up temp directory
    print(f"\n🧹 Cleaning up temporary files...")
    for temp_file in temp_dir.glob('*.png'):
        temp_file.unlink()
    temp_dir.rmdir()
    
    # Save metadata
    metadata_path = os.path.join(output_dir, 'metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(all_strokes, f, indent=2)
    
    # Print summary
    print("\n" + "="*60)
    print("✅ EXTRACTION COMPLETE!")
    print("="*60)
    print(f"📊 Statistics:")
    print(f"   • Total pages processed: {len(pages)}")
    print(f"   • Total strokes extracted: {len(all_strokes)}")
    print(f"   • Average per page: {len(all_strokes) / len(pages):.1f}")
    print(f"\n💾 Output:")
    print(f"   • Images saved to: {output_dir}/unlabeled/")
    print(f"   • Metadata saved to: {metadata_path}")
    print(f"\n📝 Next steps:")
    print(f"   1. Review the extracted images in: {output_dir}/unlabeled/")
    print(f"   2. Use the labeling tool to label strokes")
    print(f"   3. Train the recognition model")
    print("="*60 + "\n")
    
    return all_strokes

def main():
    """Main execution"""
    # Configuration
    pdf_path = 'assets/reference-materials/pitman/Shorthand-Book.pdf'
    output_dir = 'assets/reference-materials/training-data'
    
    # Create output directories
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    Path(output_dir, 'unlabeled').mkdir(parents=True, exist_ok=True)
    Path(output_dir, 'labeled').mkdir(parents=True, exist_ok=True)
    
    # Extract strokes from first 40 pages (Units 1-3)
    # You can change this to process more pages later
    strokes = process_reference_book(
        pdf_path, 
        output_dir,
        start_page=1,
        end_page=40
    )
    
    if len(strokes) > 0:
        print("🎉 Success! You can now proceed to labeling the strokes.")
        print("\n💡 To label the extracted strokes, run:")
        print("   python scripts/label_strokes.py")
    else:
        print("⚠️  No strokes were extracted. Check the errors above.")

if __name__ == '__main__':
    main()
