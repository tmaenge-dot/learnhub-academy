#!/usr/bin/env python3
"""
Improved stroke extraction with tighter detection.
Focuses on extracting ONLY the clean stroke symbols, not full page diagrams.
"""

import cv2
import numpy as np
from pathlib import Path
import json

def extract_clean_stroke_symbol(image_path, stroke_info):
    """
    Extract just the clean stroke symbol from a page.
    
    Args:
        image_path: Path to the professional page image
        stroke_info: Dict with 'name', 'expected_x', 'expected_y', 'size_hint'
    
    Returns:
        Cropped image of just the stroke symbol
    """
    img = cv2.imread(str(image_path))
    if img is None:
        print(f"❌ Failed to load: {image_path}")
        return None
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Use very aggressive thresholding to get only the darkest strokes
    _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
    
    # Remove text and small noise - keep only stroke-like elements
    kernel_vertical = np.ones((15, 3), np.uint8)
    kernel_horizontal = np.ones((3, 15), np.uint8)
    
    # Detect vertical and horizontal strokes
    vertical = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_vertical)
    horizontal = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_horizontal)
    
    # Combine both
    strokes = cv2.bitwise_or(vertical, horizontal)
    
    # Find contours
    contours, _ = cv2.findContours(strokes, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        print(f"  ⚠️  No stroke contours found for {stroke_info['name']}")
        return None
    
    # Filter contours by:
    # 1. Aspect ratio (strokes are typically tall or wide)
    # 2. Position (use expected_x, expected_y if provided)
    # 3. Size (not too small, not too large)
    
    valid_contours = []
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        area = cv2.contourArea(contour)
        
        # Skip very small contours (noise/text)
        if area < 500:
            continue
        
        # Skip very large contours (page borders, full diagrams)
        if area > 30000:
            continue
        
        # Check aspect ratio - strokes are typically elongated
        aspect_ratio = max(w, h) / max(min(w, h), 1)
        
        # Skip square-ish shapes (likely not strokes)
        if aspect_ratio < 2.0:
            continue
        
        # If we have position hints, prefer contours near that position
        if 'expected_x' in stroke_info and 'expected_y' in stroke_info:
            expected_x = stroke_info['expected_x']
            expected_y = stroke_info['expected_y']
            
            # Calculate distance from expected position
            center_x = x + w // 2
            center_y = y + h // 2
            distance = np.sqrt((center_x - expected_x)**2 + (center_y - expected_y)**2)
            
            valid_contours.append((contour, area, distance, (x, y, w, h)))
        else:
            valid_contours.append((contour, area, 0, (x, y, w, h)))
    
    if not valid_contours:
        print(f"  ⚠️  No valid stroke contours for {stroke_info['name']}")
        return None
    
    # Sort by distance (if we have expected position) or by area (largest first)
    if 'expected_x' in stroke_info:
        valid_contours.sort(key=lambda x: x[2])  # Sort by distance
    else:
        valid_contours.sort(key=lambda x: x[1], reverse=True)  # Sort by area
    
    # Take the best match
    best_contour, area, distance, bbox = valid_contours[0]
    x, y, w, h = bbox
    
    # Add minimal padding
    padding = 5
    x = max(0, x - padding)
    y = max(0, y - padding)
    w = min(img.shape[1] - x, w + 2 * padding)
    h = min(img.shape[0] - y, h + 2 * padding)
    
    # Extract the stroke
    stroke_img = img[y:y+h, x:x+w]
    
    return stroke_img

def extract_all_clean_strokes():
    """
    Extract clean stroke symbols from all professional pages.
    Uses tighter detection focused on stroke outlines only.
    """
    base_dir = Path(__file__).parent.parent / "assets" / "stroke-images" / "professional"
    output_dir = Path(__file__).parent.parent / "assets" / "stroke-images" / "extracted-professional-clean"
    output_dir.mkdir(exist_ok=True, parents=True)
    
    # Define stroke extraction hints
    # These are approximate positions where strokes typically appear on each page
    stroke_extractions = [
        # Page 9 - P and B (straight downstrokes)
        {
            'page': 'stroke_page-009.png',
            'strokes': [
                {'name': 'P', 'expected_x': 800, 'expected_y': 1000},
                {'name': 'B', 'expected_x': 1200, 'expected_y': 1000},
            ]
        },
        # Page 10 - T and D
        {
            'page': 'stroke_page-010.png',
            'strokes': [
                {'name': 'T', 'expected_x': 800, 'expected_y': 1000},
                {'name': 'D', 'expected_x': 1200, 'expected_y': 1000},
            ]
        },
        # Page 11 - CH and J
        {
            'page': 'book_page-011.png',
            'strokes': [
                {'name': 'CH', 'expected_x': 800, 'expected_y': 1000},
                {'name': 'J', 'expected_x': 1200, 'expected_y': 1000},
            ]
        },
        # Page 16 - F and V (curved)
        {
            'page': 'unit2_curved_page-016.png',
            'strokes': [
                {'name': 'F', 'expected_x': 800, 'expected_y': 1200},
                {'name': 'V', 'expected_x': 1200, 'expected_y': 1200},
            ]
        },
        # Page 17 - TH and THE
        {
            'page': 'vowel_page-017.png',
            'strokes': [
                {'name': 'TH', 'expected_x': 600, 'expected_y': 1000},
                {'name': 'THE', 'expected_x': 1000, 'expected_y': 1000},
                {'name': 'ITH', 'expected_x': 1400, 'expected_y': 1000},
            ]
        },
        # Page 18 - S and Z
        {
            'page': 'book_page-018.png',
            'strokes': [
                {'name': 'S', 'expected_x': 800, 'expected_y': 1200},
                {'name': 'Z', 'expected_x': 1200, 'expected_y': 1200},
            ]
        },
        # Page 19 - SH, ZH, ISH, ZHEE
        {
            'page': 'book_page-019.png',
            'strokes': [
                {'name': 'SH', 'expected_x': 600, 'expected_y': 1000},
                {'name': 'ZH', 'expected_x': 900, 'expected_y': 1000},
                {'name': 'ISH', 'expected_x': 1200, 'expected_y': 1000},
                {'name': 'ZHEE', 'expected_x': 1500, 'expected_y': 1000},
            ]
        },
        # Page 20 - K, G, M (horizontal)
        {
            'page': 'book_page-020.png',
            'strokes': [
                {'name': 'K', 'expected_x': 700, 'expected_y': 1200},
                {'name': 'G', 'expected_x': 1100, 'expected_y': 1200},
                {'name': 'M', 'expected_x': 1500, 'expected_y': 1200},
            ]
        },
        # Page 21 - N, NG, L, W, Y, H (upward)
        {
            'page': 'book_page-021.png',
            'strokes': [
                {'name': 'N', 'expected_x': 500, 'expected_y': 1000},
                {'name': 'NG', 'expected_x': 800, 'expected_y': 1000},
                {'name': 'L', 'expected_x': 1100, 'expected_y': 1000},
                {'name': 'W', 'expected_x': 1400, 'expected_y': 1000},
                {'name': 'Y', 'expected_x': 1700, 'expected_y': 1000},
                {'name': 'H', 'expected_x': 2000, 'expected_y': 1000},
            ]
        },
    ]
    
    print("=" * 70)
    print("🎨 CLEAN STROKE EXTRACTION - FOCUSED MODE")
    print("=" * 70)
    print("Extracting ONLY the stroke symbols, not full page content")
    print()
    
    total_extracted = 0
    
    for page_info in stroke_extractions:
        page_name = page_info['page']
        strokes = page_info['strokes']
        
        page_path = base_dir / page_name
        if not page_path.exists():
            print(f"❌ Page not found: {page_name}")
            continue
        
        print(f"📖 Processing: {page_name}")
        print(f"   Expected strokes: {', '.join([s['name'] for s in strokes])}")
        
        for stroke_info in strokes:
            stroke_img = extract_clean_stroke_symbol(page_path, stroke_info)
            
            if stroke_img is not None:
                output_path = output_dir / f"{stroke_info['name']}_professional.png"
                cv2.imwrite(str(output_path), stroke_img)
                file_size_kb = output_path.stat().st_size / 1024
                print(f"   ✅ Extracted: {stroke_info['name']} -> {output_path.name} ({file_size_kb:.1f} KB)")
                total_extracted += 1
            else:
                print(f"   ❌ Failed: {stroke_info['name']}")
        
        print()
    
    print("=" * 70)
    print(f"✨ Extraction complete! Extracted {total_extracted}/26 clean strokes")
    print("=" * 70)
    print()
    print(f"📁 Output directory: {output_dir}")
    print()
    print("🔍 NEXT STEPS:")
    print("1. Review extracted strokes in the output directory")
    print("2. If they look correct, replace the old extractions:")
    print(f"   rm assets/stroke-images/extracted-professional/*.png")
    print(f"   cp {output_dir}/*.png assets/stroke-images/extracted-professional/")
    print("3. Refresh the app to see the clean strokes")
    print()

if __name__ == "__main__":
    extract_all_clean_strokes()
