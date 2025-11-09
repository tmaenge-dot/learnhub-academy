#!/usr/bin/env python3
"""
OCR-based extraction from Pitman Shorthand PDF
This will convert the scanned PDF to text using Tesseract OCR
"""

import os
import sys
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import json

def extract_pdf_with_ocr(pdf_path, output_dir='extracted_content'):
    """
    Extract text from PDF using OCR
    """
    print("=" * 70)
    print("PITMAN SHORTHAND REFERENCE BOOK - OCR EXTRACTION")
    print("=" * 70)
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"\n1. Converting PDF to images...")
    print(f"   PDF: {pdf_path}")
    
    try:
        # Convert PDF to images (lower DPI for faster processing initially)
        images = convert_from_path(pdf_path, dpi=200, first_page=1, last_page=20)
        print(f"   ✓ Converted first 20 pages to images")
        
        all_text = ""
        unit_data = {}
        current_unit = None
        
        print(f"\n2. Processing pages with OCR...")
        
        for page_num, image in enumerate(images, 1):
            print(f"   Processing page {page_num}...", end=" ")
            
            # Perform OCR
            text = pytesseract.image_to_string(image, lang='eng')
            
            # Save page text
            page_file = os.path.join(output_dir, f'page_{page_num:03d}.txt')
            with open(page_file, 'w', encoding='utf-8') as f:
                f.write(f"=== PAGE {page_num} ===\n\n")
                f.write(text)
            
            all_text += f"\n\n{'='*70}\nPAGE {page_num}\n{'='*70}\n\n{text}"
            
            # Try to detect units
            if 'UNIT' in text.upper():
                import re
                unit_match = re.search(r'UNIT\s+(\d+)', text, re.IGNORECASE)
                if unit_match:
                    unit_num = unit_match.group(1)
                    current_unit = f"unit_{unit_num}"
                    if current_unit not in unit_data:
                        unit_data[current_unit] = {
                            'unit_number': unit_num,
                            'start_page': page_num,
                            'content': text
                        }
                        print(f"✓ Found UNIT {unit_num}!")
                    else:
                        unit_data[current_unit]['content'] += '\n' + text
                else:
                    print("✓")
            else:
                print("✓")
                if current_unit and current_unit in unit_data:
                    unit_data[current_unit]['content'] += '\n' + text
        
        # Save complete text
        complete_file = os.path.join(output_dir, 'complete_book.txt')
        with open(complete_file, 'w', encoding='utf-8') as f:
            f.write(all_text)
        print(f"\n   ✓ Saved complete text to: {complete_file}")
        
        # Save unit data
        units_file = os.path.join(output_dir, 'units_data.json')
        with open(units_file, 'w', encoding='utf-8') as f:
            json.dump(unit_data, f, indent=2)
        print(f"   ✓ Saved unit data to: {units_file}")
        
        # Create summary
        print(f"\n3. Extraction Summary:")
        print(f"   - Pages processed: {len(images)}")
        print(f"   - Total characters: {len(all_text)}")
        print(f"   - Units found: {len(unit_data)}")
        
        if unit_data:
            print(f"\n   Detected Units:")
            for unit_key, unit_info in sorted(unit_data.items()):
                print(f"   - Unit {unit_info['unit_number']}: starts at page {unit_info['start_page']}")
        
        return {
            'complete_text': all_text,
            'units': unit_data,
            'pages_processed': len(images),
            'output_dir': output_dir
        }
        
    except Exception as e:
        print(f"\n   ✗ Error during OCR: {e}")
        print(f"\n   Note: Make sure tesseract-ocr is installed:")
        print(f"   sudo apt-get install tesseract-ocr")
        return None

def extract_stroke_info(text):
    """
    Extract stroke information from OCR text
    """
    import re
    
    strokes = {}
    
    # Common patterns for stroke descriptions
    patterns = [
        r'([A-Z]{1,2})\s+(?:stroke|consonant).*?examples?:?\s*([^\n.]+)',
        r'(?:The|A)\s+([a-z]+)\s+stroke.*?(?:for|represents)\s+([A-Z])',
    ]
    
    for pattern in patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            stroke_name = match.group(1)
            info = match.group(2) if len(match.groups()) > 1 else ""
            strokes[stroke_name] = info
    
    return strokes

def main():
    # Path to the PDF
    pdf_path = '../assets/reference-materials/pitman/Shorthand-Book.pdf'
    output_dir = '../data/ocr_extracted'
    
    if not os.path.exists(pdf_path):
        print(f"Error: PDF not found at {pdf_path}")
        print("Please check the path and try again.")
        sys.exit(1)
    
    # Extract content
    result = extract_pdf_with_ocr(pdf_path, output_dir)
    
    if result:
        print("\n" + "=" * 70)
        print("SUCCESS! Content extracted.")
        print("=" * 70)
        print("\nNext steps:")
        print(f"1. Review: {result['output_dir']}/complete_book.txt")
        print(f"2. Check units: {result['output_dir']}/units_data.json")
        print("3. Individual pages are in: page_XXX.txt files")
        print("\nThe AI can now read this content to provide accurate stroke data!")
        print("=" * 70)
    else:
        print("\n" + "=" * 70)
        print("TROUBLESHOOTING")
        print("=" * 70)
        print("\nIf OCR failed, you may need to install tesseract:")
        print("  Ubuntu/Debian: sudo apt-get install tesseract-ocr")
        print("  macOS: brew install tesseract")
        print("\nThen run this script again.")

if __name__ == '__main__':
    main()
