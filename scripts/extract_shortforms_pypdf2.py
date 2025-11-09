#!/usr/bin/env python3
"""
Extract shortforms using PyPDF2 (alternative method)
"""

import PyPDF2
import json
import re

def extract_with_pypdf2(pdf_path):
    """Extract text using PyPDF2"""
    content = []
    
    print(f"Opening PDF: {pdf_path}")
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        print(f"Total pages: {len(reader.pages)}")
        
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text = page.extract_text()
            
            if text and text.strip():
                content.append({
                    'page': page_num + 1,
                    'text': text
                })
                print(f"✓ Page {page_num + 1}: {len(text)} characters")
    
    return content

def search_for_shortforms(content):
    """Search for shortforms in extracted content"""
    results = []
    
    # Common Pitman shortform words to look for
    common_shortforms = [
        'I', 'you', 'he', 'she', 'it', 'we', 'they',
        'have', 'has', 'had', 'shall', 'will', 'would',
        'could', 'should', 'may', 'might', 'must',
        'are', 'were', 'was', 'been', 'being',
        'for', 'of', 'to', 'and', 'the', 'a', 'in',
        'is', 'at', 'be', 'this', 'that', 'with',
        'from', 'by', 'on', 'not', 'but', 'can'
    ]
    
    keywords = ['shortform', 'short form', 'short-form', 'abbreviation', 
                'contracted form', 'special outline', 'grammalogue']
    
    for page_data in content:
        text = page_data['text']
        text_lower = text.lower()
        
        # Check for shortform keywords
        found_keyword = False
        for keyword in keywords:
            if keyword in text_lower:
                found_keyword = True
                break
        
        # Or check for many common shortform words on same page
        shortform_count = sum(1 for word in common_shortforms if word.lower() in text_lower)
        
        if found_keyword or shortform_count > 10:
            results.append({
                'page': page_data['page'],
                'text': text,
                'keyword_found': found_keyword,
                'shortform_words': shortform_count
            })
            print(f"\n{'='*60}")
            print(f"📄 PAGE {page_data['page']} - Shortforms likely present")
            print(f"   Keywords: {found_keyword}, Word count: {shortform_count}")
            print(f"{'='*60}")
            # Show first 300 characters
            print(text[:300].replace('\n', ' '))
            print("...\n")
    
    return results

def main():
    pdf_path = '/home/oem/Desktop/shorthand-simplified/assets/reference-materials/pitman/Shorthand-Book.pdf'
    
    print("\n" + "="*60)
    print("EXTRACTING SHORTFORMS FROM PITMAN TEXTBOOK")
    print("="*60 + "\n")
    
    # Extract text
    content = extract_with_pypdf2(pdf_path)
    
    if not content:
        print("❌ Failed to extract text from PDF")
        return
    
    print(f"\n✅ Extracted text from {len(content)} pages")
    
    # Search for shortforms
    print("\n" + "="*60)
    print("SEARCHING FOR SHORTFORMS")
    print("="*60 + "\n")
    
    shortform_pages = search_for_shortforms(content)
    
    # Save all extracted pages for manual review
    output_file = '/home/oem/Desktop/shorthand-simplified/all-textbook-pages.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        for page_data in content:
            f.write(f"\n{'='*70}\n")
            f.write(f"PAGE {page_data['page']}\n")
            f.write(f"{'='*70}\n\n")
            f.write(page_data['text'])
            f.write("\n\n")
    
    print(f"\n✅ Saved all pages to: {output_file}")
    
    if shortform_pages:
        # Save shortform pages separately
        shortform_file = '/home/oem/Desktop/shorthand-simplified/shortform-pages.txt'
        with open(shortform_file, 'w', encoding='utf-8') as f:
            for page_data in shortform_pages:
                f.write(f"\n{'='*70}\n")
                f.write(f"PAGE {page_data['page']}\n")
                f.write(f"{'='*70}\n\n")
                f.write(page_data['text'])
                f.write("\n\n")
        
        print(f"✅ Found shortforms on {len(shortform_pages)} pages")
        print(f"✅ Saved to: {shortform_file}")
    
    print("\n📖 Review the files to locate exact shortforms")
    print("💡 Tip: Search for 'shortform' or 'grammalogue' in the text files")

if __name__ == '__main__':
    main()
