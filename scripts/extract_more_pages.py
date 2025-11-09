#!/usr/bin/env python3
"""
Process more pages from the PDF to get Units 2 and 3
"""

from pdf2image import convert_from_path
import pytesseract
import os

def extract_more_pages(pdf_path, start_page=20, end_page=40, output_dir='../data/ocr_extracted'):
    """Extract pages 20-40 to get more units"""
    
    print(f"Extracting pages {start_page}-{end_page}...")
    
    try:
        images = convert_from_path(pdf_path, dpi=200, first_page=start_page, last_page=end_page)
        
        for i, image in enumerate(images, start_page):
            print(f"Processing page {i}...", end=" ")
            
            text = pytesseract.image_to_string(image, lang='eng')
            
            # Save page
            page_file = os.path.join(output_dir, f'page_{i:03d}.txt')
            with open(page_file, 'w', encoding='utf-8') as f:
                f.write(f"=== PAGE {i} ===\n\n")
                f.write(text)
            
            # Check for units
            if 'UNIT' in text.upper() or 'Unit' in text:
                print(f"✓ (Found Unit content!)")
            else:
                print("✓")
        
        print(f"\n✓ Extracted pages {start_page}-{end_page}")
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

if __name__ == '__main__':
    pdf_path = '../assets/reference-materials/pitman/Shorthand-Book.pdf'
    extract_more_pages(pdf_path, 20, 40)
    print("\nDone! Check data/ocr_extracted/ for new pages")
