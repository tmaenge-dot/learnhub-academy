#!/usr/bin/env python3
"""
Re-run extraction with different parameters for the missing strokes.
Try multiple area ranges to catch strokes that were missed.
"""

import cv2
import numpy as np
from pathlib import Path
import json

def detect_strokes_multipass(image_path, passes):
    """
    Try multiple detection passes with different parameters.
    
    Args:
        image_path: Path to the image
        passes: List of (min_area, max_area) tuples to try
    
    Returns:
        Combined list of unique bounding boxes
    """
    img = cv2.imread(str(image_path))
    if img is None:
        return [], None
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Try multiple thresholding techniques
    all_bboxes = []
    
    for min_area, max_area in passes:
        # Adaptive threshold
        binary = cv2.adaptiveThreshold(
            gray, 255, 
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY_INV, 
            11, 2
        )
        
        # Morphological operations
        kernel = np.ones((3, 3), np.uint8)
        binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
        binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
        
        # Find contours
        contours, _ = cv2.findContours(
            binary,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )
        
        # Filter by area
        for contour in contours:
            area = cv2.contourArea(contour)
            if min_area < area < max_area:
                x, y, w, h = cv2.boundingRect(contour)
                # Add padding
                padding = 10
                x = max(0, x - padding)
                y = max(0, y - padding)
                w = min(img.shape[1] - x, w + 2 * padding)
                h = min(img.shape[0] - h, h + 2 * padding)
                all_bboxes.append((x, y, w, h, area))
    
    # Remove duplicates (bboxes that overlap significantly)
    unique_bboxes = []
    all_bboxes.sort(key=lambda b: b[4], reverse=True)  # Sort by area, largest first
    
    for bbox in all_bboxes:
        x1, y1, w1, h1, _ = bbox
        is_duplicate = False
        
        for existing in unique_bboxes:
            x2, y2, w2, h2 = existing
            # Check overlap
            overlap_x = max(0, min(x1 + w1, x2 + w2) - max(x1, x2))
            overlap_y = max(0, min(y1 + h1, y2 + h2) - max(y1, y2))
            overlap_area = overlap_x * overlap_y
            
            # If more than 50% overlap, consider duplicate
            area1 = w1 * h1
            if overlap_area > area1 * 0.5:
                is_duplicate = True
                break
        
        if not is_duplicate:
            unique_bboxes.append((x1, y1, w1, h1))
    
    # Sort by position (top to bottom, left to right)
    unique_bboxes.sort(key=lambda b: (b[1] // 100, b[0]))
    
    return unique_bboxes, img

def extract_stroke(img, bbox, stroke_name, output_dir):
    """Extract and save a stroke."""
    x, y, w, h = bbox
    cropped = img[y:y+h, x:x+w]
    
    output_path = output_dir / f"{stroke_name}_professional.png"
    cv2.imwrite(str(output_path), cropped)
    
    file_size = output_path.stat().st_size / 1024
    return output_path, file_size

def reextract_missing_strokes():
    """Re-run extraction for pages with missing strokes."""
    
    base_dir = Path(__file__).parent.parent / "assets" / "stroke-images" / "professional"
    output_dir = Path(__file__).parent.parent / "assets" / "stroke-images" / "extracted-professional"
    output_dir.mkdir(exist_ok=True, parents=True)
    
    # Pages with missing strokes - try multiple area ranges
    missing_extractions = [
        {
            'page': 'stroke_page-010.png',
            'strokes': ['D'],
            'passes': [(500, 100000), (100, 50000), (1000, 50000)]  # Try smaller areas first
        },
        {
            'page': 'book_page-011.png',
            'strokes': ['J'],
            'passes': [(500, 100000), (100, 50000), (1000, 50000)]
        },
        {
            'page': 'vowel_page-017.png',  # Try vowel_page prefix
            'strokes': ['TH'],
            'passes': [(500, 100000), (100, 50000), (1000, 50000)]
        },
        {
            'page': 'book_page-018.png',
            'strokes': ['Z'],
            'passes': [(500, 100000), (100, 50000), (1000, 50000)]
        },
        {
            'page': 'book_page-019.png',
            'strokes': ['SH', 'ZH'],
            'passes': [(500, 100000), (100, 50000), (1000, 50000)]
        },
        {
            'page': 'book_page-021.png',
            'strokes': ['L', 'W', 'Y', 'H'],
            'passes': [(500, 100000), (100, 50000), (1000, 50000)]
        }
    ]
    
    print("=" * 70)
    print("🔄 RE-EXTRACTING MISSING STROKES")
    print("=" * 70)
    print("Using multi-pass detection with varying area thresholds")
    print()
    
    total_extracted = 0
    
    for item in missing_extractions:
        page_name = item['page']
        expected_strokes = item['strokes']
        passes = item['passes']
        
        page_path = base_dir / page_name
        
        # Try alternate page name if not found
        if not page_path.exists():
            # Try different prefixes
            alt_names = [
                f"stroke_page-{page_name.split('-')[1]}",
                f"unit2_curved_page-{page_name.split('-')[1]}",
                f"vowel_page-{page_name.split('-')[1]}",
            ]
            for alt_name in alt_names:
                alt_path = base_dir / alt_name
                if alt_path.exists():
                    page_path = alt_path
                    page_name = alt_name
                    break
        
        if not page_path.exists():
            print(f"❌ Page not found: {page_name}")
            continue
        
        print(f"📖 Processing: {page_name}")
        print(f"   Expected strokes: {', '.join(expected_strokes)}")
        
        bboxes, img = detect_strokes_multipass(page_path, passes)
        
        print(f"   Detected regions: {len(bboxes)}")
        
        # Extract strokes
        for i, stroke_name in enumerate(expected_strokes):
            if i < len(bboxes):
                output_path, file_size = extract_stroke(img, bboxes[i], stroke_name, output_dir)
                print(f"   ✅ Extracted: {stroke_name} -> {output_path.name} ({file_size:.1f} KB)")
                total_extracted += 1
            else:
                print(f"   ⚠️  Not enough regions for: {stroke_name}")
        
        print()
    
    print("=" * 70)
    print(f"✨ Re-extraction complete! Added {total_extracted} new strokes")
    print("=" * 70)
    print()
    
    # List all extracted files now
    all_files = sorted(output_dir.glob("*_professional.png"))
    print(f"📊 Total professional strokes: {len(all_files)}")
    for file in all_files:
        stroke_name = file.stem.replace('_professional', '')
        size_kb = file.stat().st_size / 1024
        print(f"   • {stroke_name:6} ({size_kb:6.1f} KB)")

if __name__ == "__main__":
    reextract_missing_strokes()
