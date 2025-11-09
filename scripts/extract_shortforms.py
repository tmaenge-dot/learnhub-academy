#!/usr/bin/env python3
"""
Extract shortforms section from Pitman Shorthand textbook
"""

import pdfplumber
import json
import re

def extract_text_from_pdf(pdf_path):
    """Extract all text from PDF with page numbers"""
    content = []
    
    print(f"Opening PDF: {pdf_path}")
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        
        for page_num, page in enumerate(pdf.pages, 1):
            text = page.extract_text()
            if text:
                content.append({
                    'page': page_num,
                    'text': text
                })
                print(f"Extracted page {page_num}")
    
    return content

def find_shortforms_section(content):
    """Find pages that contain shortforms"""
    shortform_pages = []
    
    # Keywords to identify shortforms sections
    keywords = [
        'shortform', 'short form', 'short-form',
        'abbreviation', 'contracted', 'contraction'
    ]
    
    for page_data in content:
        page_text = page_data['text'].lower()
        
        # Check if any keyword appears
        for keyword in keywords:
            if keyword in page_text:
                shortform_pages.append(page_data)
                print(f"\n{'='*60}")
                print(f"FOUND SHORTFORMS ON PAGE {page_data['page']}")
                print(f"{'='*60}")
                print(page_data['text'][:500])  # First 500 chars
                print("...")
                break
    
    return shortform_pages

def extract_shortforms(pages):
    """Extract individual shortforms from the pages"""
    shortforms = []
    
    for page_data in pages:
        text = page_data['text']
        lines = text.split('\n')
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                continue
            
            # Pattern 1: "word = outline" or "word - outline"
            match1 = re.match(r'^([a-zA-Z\s]+)\s*[=\-:]\s*(.+)$', line)
            if match1:
                word = match1.group(1).strip()
                outline = match1.group(2).strip()
                shortforms.append({
                    'word': word,
                    'outline': outline,
                    'page': page_data['page'],
                    'category': 'general'
                })
            
            # Pattern 2: Lines with common shortform words
            shortform_indicators = ['I', 'you', 'he', 'she', 'it', 'we', 'they', 
                                   'have', 'had', 'shall', 'will', 'would', 
                                   'could', 'should', 'may', 'might', 'must',
                                   'are', 'were', 'was', 'been', 'being']
            
            for indicator in shortform_indicators:
                if line.lower().startswith(indicator.lower() + ' ') or line.lower() == indicator.lower():
                    shortforms.append({
                        'word': line,
                        'outline': 'See page ' + str(page_data['page']),
                        'page': page_data['page'],
                        'category': 'common'
                    })
                    break
    
    return shortforms

def main():
    pdf_path = '/home/oem/Desktop/shorthand-simplified/assets/reference-materials/pitman/Shorthand-Book.pdf'
    
    # Extract all text
    print("\n" + "="*60)
    print("EXTRACTING TEXT FROM PITMAN SHORTHAND TEXTBOOK")
    print("="*60 + "\n")
    
    content = extract_text_from_pdf(pdf_path)
    
    # Find shortforms sections
    print("\n" + "="*60)
    print("SEARCHING FOR SHORTFORMS SECTIONS")
    print("="*60 + "\n")
    
    shortform_pages = find_shortforms_section(content)
    
    if shortform_pages:
        print(f"\n✅ Found shortforms on {len(shortform_pages)} pages")
        
        # Extract individual shortforms
        shortforms = extract_shortforms(shortform_pages)
        
        # Save to JSON
        output_file = '/home/oem/Desktop/shorthand-simplified/extracted-shortforms.json'
        with open(output_file, 'w') as f:
            json.dump({
                'pages': [p['page'] for p in shortform_pages],
                'shortforms': shortforms,
                'total_found': len(shortforms)
            }, f, indent=2)
        
        print(f"\n✅ Extracted {len(shortforms)} shortforms")
        print(f"✅ Saved to: {output_file}")
        
        # Also save page content for manual review
        pages_output = '/home/oem/Desktop/shorthand-simplified/extracted-shortform-pages.txt'
        with open(pages_output, 'w') as f:
            for page_data in shortform_pages:
                f.write(f"\n{'='*60}\n")
                f.write(f"PAGE {page_data['page']}\n")
                f.write(f"{'='*60}\n\n")
                f.write(page_data['text'])
                f.write("\n\n")
        
        print(f"✅ Saved full page content to: {pages_output}")
        
    else:
        print("\n❌ No shortforms section found")
        print("📝 Saving all pages for manual review...")
        
        # Save all content for manual review
        all_pages_output = '/home/oem/Desktop/shorthand-simplified/all-pages-content.txt'
        with open(all_pages_output, 'w') as f:
            for page_data in content:
                f.write(f"\n{'='*60}\n")
                f.write(f"PAGE {page_data['page']}\n")
                f.write(f"{'='*60}\n\n")
                f.write(page_data['text'])
                f.write("\n\n")
        
        print(f"✅ Saved all {len(content)} pages to: {all_pages_output}")
        print("📖 Please review the file to locate shortforms manually")

if __name__ == '__main__':
    main()
