#!/usr/bin/env python3
"""
Debug script to visualize what OpenCV is detecting on each page.
This helps us understand why some strokes aren't being extracted.
"""

import cv2
import numpy as np
from pathlib import Path

def visualize_detection(image_path, min_area=1000, max_area=50000):
    """
    Visualize what regions OpenCV is detecting on a page.
    Draws bounding boxes on the original image.
    """
    # Read image
    img = cv2.imread(str(image_path))
    if img is None:
        print(f"❌ Failed to load: {image_path}")
        return
    
    # Create a copy for visualization
    viz = img.copy()
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply adaptive thresholding
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
    
    # Draw all contours and filter by area
    valid_count = 0
    all_count = 0
    
    for contour in contours:
        area = cv2.contourArea(contour)
        x, y, w, h = cv2.boundingRect(contour)
        
        if min_area < area < max_area:
            # Valid stroke - draw in green
            cv2.rectangle(viz, (x, y), (x+w, y+h), (0, 255, 0), 3)
            cv2.putText(viz, f"#{valid_count+1}", (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            valid_count += 1
        elif area > 500:  # Show larger rejected regions in red
            cv2.rectangle(viz, (x, y), (x+w, y+h), (0, 0, 255), 2)
            cv2.putText(viz, f"area:{int(area)}", (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1)
        
        all_count += 1
    
    # Save visualization
    output_path = Path(image_path).parent / f"DEBUG_{Path(image_path).name}"
    cv2.imwrite(str(output_path), viz)
    
    print(f"📊 {Path(image_path).name}")
    print(f"   Total contours: {all_count}")
    print(f"   Valid regions (green): {valid_count}")
    print(f"   Saved: {output_path}")
    print()

def main():
    """Process the pages that had missing strokes."""
    base_dir = Path(__file__).parent.parent / "assets" / "stroke-images" / "professional"
    
    # Pages that had missing strokes
    problem_pages = [
        "stroke_page-010.png",     # Missing D
        "book_page-011.png",       # Missing J
        "book_page-018.png",       # Missing Z
        "book_page-021.png",       # Missing L, W, Y, H
    ]
    
    print("🔍 DETECTION DEBUG")
    print("=" * 50)
    print("Green boxes = valid strokes (1000 < area < 50000)")
    print("Red boxes = rejected regions (with area size)")
    print("=" * 50)
    print()
    
    for page in problem_pages:
        page_path = base_dir / page
        if page_path.exists():
            visualize_detection(page_path)
        else:
            print(f"❌ Not found: {page_path}")
    
    print("✅ Debug images saved with DEBUG_ prefix")
    print("   Check them to see what OpenCV is detecting")

if __name__ == "__main__":
    main()
