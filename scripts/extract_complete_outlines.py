#!/usr/bin/env python3
"""
Extract complete word outlines (consonants + vowels + diphthongs) from reference book
This creates a comprehensive dataset for full outline recognition
"""
import cv2
import numpy as np
from pdf2image import convert_from_path
import os
import json
from pathlib import Path
import pytesseract

def extract_word_and_outline_pairs(image_path, page_num):
    """
    Extract word-outline pairs from a textbook page
    
    In the textbook, words are usually shown as:
    [shorthand outline] word
    or
    word: [shorthand outline]
    
    This function finds both the text and the corresponding outline
    """
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Get all text from the page using OCR
    ocr_data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    
    # Find shorthand outlines (darker regions with specific characteristics)
    _, binary = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    outline_candidates = []
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        
        # Outlines are usually 30-150 pixels wide, 20-100 pixels tall
        if 30 < w < 200 and 20 < 120:
            aspect_ratio = w / h
            
            # Filter based on aspect ratio (outlines are usually not too elongated)
            if 0.3 < aspect_ratio < 5.0:
                # Extract outline region
                outline_img = img[y:y+h, x:x+w]
                
                outline_candidates.append({
                    'image': outline_img,
                    'bbox': (x, y, w, h),
                    'page': page_num
                })
    
    # Try to match outlines with nearby words
    word_outline_pairs = []
    
    for outline in outline_candidates:
        ox, oy, ow, oh = outline['bbox']
        
        # Look for text near this outline (within 100 pixels horizontally, 30 pixels vertically)
        nearby_words = []
        
        for i, word in enumerate(ocr_data['text']):
            if not word.strip() or len(word) < 2:
                continue
            
            tx, ty, tw, th = (ocr_data['left'][i], ocr_data['top'][i], 
                              ocr_data['width'][i], ocr_data['height'][i])
            
            # Check if word is near outline
            horizontal_dist = abs((ox + ow/2) - (tx + tw/2))
            vertical_dist = abs((oy + oh/2) - (ty + th/2))
            
            if horizontal_dist < 150 and vertical_dist < 40:
                nearby_words.append({
                    'word': word.strip().lower(),
                    'distance': horizontal_dist + vertical_dist,
                    'bbox': (tx, ty, tw, th)
                })
        
        # Get closest word
        if nearby_words:
            closest = sorted(nearby_words, key=lambda x: x['distance'])[0]
            
            word_outline_pairs.append({
                'word': closest['word'],
                'outline_image': outline['image'],
                'outline_bbox': outline['bbox'],
                'word_bbox': closest['bbox'],
                'page': page_num
            })
    
    return word_outline_pairs

def analyze_outline_components(outline_image, word):
    """
    Analyze an outline to identify its components
    
    Returns:
        - Consonants detected
        - Vowels detected (type, position)
        - Diphthongs detected
        - Line position
    """
    gray = cv2.cvtColor(outline_image, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    
    # Analyze components
    components = {
        'word': word,
        'consonants': [],
        'vowels': [],
        'diphthongs': [],
        'position': None,
        'features': {}
    }
    
    # Find all marks in the outline
    _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    for contour in contours:
        x, y, width, height = cv2.boundingRect(contour)
        area = cv2.contourArea(contour)
        
        # Classify by size
        if area > 100:
            # Likely a consonant stroke
            stroke_type = classify_stroke_shape(contour, width, height)
            components['consonants'].append({
                'type': stroke_type,
                'bbox': (x, y, width, height)
            })
        elif 5 < area < 100:
            # Likely a vowel mark
            vowel_type = classify_vowel_mark(contour, width, height, area)
            vowel_position = determine_vowel_place(y, h)
            components['vowels'].append({
                'type': vowel_type,
                'position': vowel_position,
                'bbox': (x, y, width, height)
            })
        elif area < 5:
            # Very small - might be a diphthong mark
            pass
    
    # Determine line position (analyze vertical distribution)
    components['position'] = estimate_line_position(components)
    
    # Store features for ML training
    components['features'] = {
        'num_consonants': len(components['consonants']),
        'num_vowels': len(components['vowels']),
        'outline_width': w,
        'outline_height': h,
        'word_length': len(word)
    }
    
    return components

def classify_stroke_shape(contour, width, height):
    """Classify consonant stroke type based on shape"""
    aspect_ratio = width / height
    perimeter = cv2.arcLength(contour, True)
    area = cv2.contourArea(contour)
    
    # Calculate shape descriptors
    hull = cv2.convexHull(contour)
    hull_area = cv2.contourArea(hull)
    solidity = area / hull_area if hull_area > 0 else 0
    
    # Approximate the contour
    epsilon = 0.02 * perimeter
    approx = cv2.approxPolyDP(contour, epsilon, True)
    
    # Simple classification
    if len(approx) < 4:
        return 'straight'
    elif solidity > 0.9:
        return 'straight'
    else:
        return 'curved'

def classify_vowel_mark(contour, width, height, area):
    """Classify vowel type"""
    aspect_ratio = width / height
    
    # Dot: roughly circular
    if 0.7 < aspect_ratio < 1.4:
        if area < 20:
            return 'light_dot'
        else:
            return 'heavy_dot'
    # Dash: elongated
    else:
        if area < 40:
            return 'light_dash'
        else:
            return 'heavy_dash'

def determine_vowel_place(y_position, total_height):
    """Determine if vowel is in 1st, 2nd, or 3rd place"""
    relative_pos = y_position / total_height
    
    if relative_pos < 0.33:
        return 'place1'
    elif relative_pos < 0.66:
        return 'place2'
    else:
        return 'place3'

def estimate_line_position(components):
    """Estimate if outline is above/on/through line"""
    # This is a simplified heuristic
    # In reality, would need to detect the actual writing line
    
    if len(components['consonants']) == 0:
        return 'unknown'
    
    # Analyze vertical positions of consonants
    avg_y = sum(c['bbox'][1] for c in components['consonants']) / len(components['consonants'])
    
    # Placeholder logic
    return 'on_line'  # Would need actual line detection

def process_reference_book_for_outlines(pdf_path, output_dir, start_page=1, end_page=40):
    """
    Process reference book to extract complete word outlines
    """
    print("\n" + "="*70)
    print("COMPLETE OUTLINE EXTRACTION")
    print("="*70)
    
    print(f"\n📖 Processing: {pdf_path}")
    print(f"📄 Pages: {start_page} to {end_page}")
    
    # Convert PDF to images
    print(f"\n🔄 Converting PDF to images...")
    try:
        pages = convert_from_path(pdf_path, dpi=300, first_page=start_page, last_page=end_page)
        print(f"✅ Converted {len(pages)} pages")
    except Exception as e:
        print(f"❌ Error: {e}")
        return []
    
    all_outlines = []
    temp_dir = Path(output_dir) / 'temp_pages'
    temp_dir.mkdir(parents=True, exist_ok=True)
    
    # Process each page
    for page_num, page in enumerate(pages, start_page):
        print(f"\n📄 Processing page {page_num}...")
        
        # Save page as temp image
        temp_path = str(temp_dir / f'page_{page_num:03d}.png')
        page.save(temp_path, 'PNG')
        
        # Extract word-outline pairs
        try:
            pairs = extract_word_and_outline_pairs(temp_path, page_num)
            print(f"  ✓ Found {len(pairs)} word-outline pairs")
            
            # Analyze each pair
            for i, pair in enumerate(pairs):
                # Analyze outline components
                components = analyze_outline_components(pair['outline_image'], pair['word'])
                
                # Save outline image
                outline_id = f'p{page_num:03d}_w{i:03d}'
                outline_filename = f"{pair['word']}_{outline_id}.png"
                
                # Create word-specific directory
                word_dir = Path(output_dir) / 'complete-outlines' / 'labeled' / pair['word']
                word_dir.mkdir(parents=True, exist_ok=True)
                
                outline_path = word_dir / outline_filename
                cv2.imwrite(str(outline_path), pair['outline_image'])
                
                # Store complete data
                all_outlines.append({
                    'id': outline_id,
                    'word': pair['word'],
                    'page': page_num,
                    'components': components,
                    'image_path': str(outline_path),
                    'bbox': pair['outline_bbox']
                })
                
        except Exception as e:
            print(f"  ⚠️ Error processing page {page_num}: {e}")
            continue
    
    # Clean up temp files
    print(f"\n🧹 Cleaning up...")
    for temp_file in temp_dir.glob('*.png'):
        temp_file.unlink()
    temp_dir.rmdir()
    
    # Save metadata
    metadata_path = Path(output_dir) / 'complete-outlines' / 'metadata.json'
    metadata_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(metadata_path, 'w') as f:
        json.dump(all_outlines, f, indent=2)
    
    # Print summary
    print("\n" + "="*70)
    print("✅ EXTRACTION COMPLETE!")
    print("="*70)
    print(f"📊 Statistics:")
    print(f"   • Total outlines extracted: {len(all_outlines)}")
    print(f"   • Unique words: {len(set(o['word'] for o in all_outlines))}")
    print(f"\n💾 Output:")
    print(f"   • Outlines saved to: {output_dir}/complete-outlines/labeled/")
    print(f"   • Metadata saved to: {metadata_path}")
    print(f"\n📝 Next steps:")
    print(f"   1. Review extracted outlines")
    print(f"   2. Verify word-outline matching accuracy")
    print(f"   3. Train complete outline recognition model")
    print("="*70 + "\n")
    
    return all_outlines

def main():
    """Main execution"""
    pdf_path = 'assets/reference-materials/pitman/Shorthand-Book.pdf'
    output_dir = 'assets/reference-materials/training-data'
    
    # Create output directories
    Path(output_dir, 'complete-outlines', 'labeled').mkdir(parents=True, exist_ok=True)
    Path(output_dir, 'complete-outlines', 'unlabeled').mkdir(parents=True, exist_ok=True)
    
    # Extract complete outlines
    outlines = process_reference_book_for_outlines(
        pdf_path,
        output_dir,
        start_page=9,  # Start from page with actual outlines
        end_page=40
    )
    
    if len(outlines) > 0:
        print("🎉 Success! Complete outline database created.")
        print("\n💡 You can now:")
        print("   • Use these for template matching")
        print("   • Train a complete outline recognition model")
        print("   • Build a searchable outline dictionary")
    else:
        print("⚠️  No outlines extracted. Check the reference book format.")

if __name__ == '__main__':
    main()
