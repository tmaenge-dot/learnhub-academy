#!/usr/bin/env python3
"""
Extract stroke information from Pitman Shorthand reference materials
This script will help extract the actual stroke data from the PDF
"""

import PyPDF2
import re
import json

def extract_pdf_text(pdf_path):
    """Extract all text from PDF"""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            print(f"Total pages: {len(reader.pages)}")
            
            for page_num, page in enumerate(reader.pages, 1):
                page_text = page.extract_text()
                text += f"\n--- PAGE {page_num} ---\n"
                text += page_text
                print(f"Processed page {page_num}")
            
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return None

def extract_unit_strokes(text, unit_num):
    """Extract strokes for a specific unit"""
    # Pattern to find unit sections
    unit_pattern = rf'UNIT\s+{unit_num}[:\s]+(.*?)(?=UNIT\s+\d+|$)'
    
    match = re.search(unit_pattern, text, re.DOTALL | re.IGNORECASE)
    
    if match:
        unit_content = match.group(1)
        return unit_content[:1000]  # Return first 1000 chars
    
    return None

def save_all_pages(pdf_path, output_file):
    """Save all extracted text to a file"""
    text = extract_pdf_text(pdf_path)
    
    if text:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"\n✅ Saved all text to: {output_file}")
        print(f"   Total characters: {len(text)}")
        return True
    
    return False

def main():
    pdf_path = '../assets/reference-materials/pitman/Shorthand-Book.pdf'
    output_file = '../data/extracted-textbook.txt'
    
    print("Extracting Pitman Shorthand Book content...")
    print("=" * 60)
    
    success = save_all_pages(pdf_path, output_file)
    
    if success:
        print("\n" + "=" * 60)
        print("NEXT STEPS:")
        print("1. Open 'data/extracted-textbook.txt'")
        print("2. Search for each unit (UNIT 1, UNIT 2, etc.)")
        print("3. Copy the stroke descriptions")
        print("4. Update the strokes.ts file with accurate data")
        print("=" * 60)
    else:
        print("\n❌ Extraction failed. Please check:")
        print("   - PyPDF2 is installed: pip install PyPDF2")
        print("   - PDF file exists at the correct path")

if __name__ == '__main__':
    main()
