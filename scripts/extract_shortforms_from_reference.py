#!/usr/bin/env python3
"""
Extract shortforms from the Pitman Shorthand reference book.
This script processes OCR-extracted text to find shortform listings.
"""

import os
import re
import json
from pathlib import Path

# Define base paths
BASE_DIR = Path(__file__).parent.parent
OCR_DIR = BASE_DIR / "data" / "ocr_extracted"
OUTPUT_FILE = BASE_DIR / "data" / "extracted_shortforms.json"

# Shortform patterns to look for
SHORTFORM_INDICATORS = [
    r"short\s+form",
    r"grammalog",
    r"special\s+outline",
    r"abbreviated",
]

def extract_from_page(page_path):
    """Extract shortforms from a single OCR page."""
    with open(page_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    shortforms = []
    
    # Look for lines with shortform indicators
    lines = content.split('\n')
    for i, line in enumerate(lines):
        # Check if line mentions shortforms
        if any(re.search(pattern, line, re.IGNORECASE) for pattern in SHORTFORM_INDICATORS):
            # Extract context (previous and next 5 lines)
            context_start = max(0, i - 5)
            context_end = min(len(lines), i + 6)
            context = '\n'.join(lines[context_start:context_end])
            
            shortforms.append({
                'page': page_path.stem,
                'line_number': i + 1,
                'context': context,
                'matched_line': line.strip()
            })
    
    return shortforms

def find_word_lists(content):
    """Find lists of words that might be shortforms."""
    # Pattern: word followed by dots (OCR representation of shorthand)
    pattern = r'([a-z]+)\s+\.{2,}'
    matches = re.findall(pattern, content, re.IGNORECASE)
    return matches

def extract_all_shortforms():
    """Extract shortforms from all OCR pages."""
    all_shortforms = []
    word_lists = []
    
    # Process all OCR pages
    ocr_files = sorted(OCR_DIR.glob("page_*.txt"))
    
    print(f"Processing {len(ocr_files)} OCR files...")
    
    for page_file in ocr_files:
        # Extract shortforms with context
        page_shortforms = extract_from_page(page_file)
        all_shortforms.extend(page_shortforms)
        
        # Extract word lists
        with open(page_file, 'r', encoding='utf-8') as f:
            content = f.read()
            words = find_word_lists(content)
            if words:
                word_lists.append({
                    'page': page_file.stem,
                    'words': words
                })
    
    # Save results
    output_data = {
        'shortform_references': all_shortforms,
        'word_lists': word_lists,
        'summary': {
            'total_references': len(all_shortforms),
            'pages_with_shortforms': len(all_shortforms),
            'pages_with_word_lists': len(word_lists),
        }
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Extraction complete!")
    print(f"📊 Found {len(all_shortforms)} shortform references")
    print(f"📄 Found word lists in {len(word_lists)} pages")
    print(f"💾 Saved to: {OUTPUT_FILE}")
    
    # Print sample
    if all_shortforms:
        print(f"\n📝 Sample shortform reference:")
        print(f"   Page: {all_shortforms[0]['page']}")
        print(f"   Line: {all_shortforms[0]['matched_line']}")
    
    if word_lists:
        print(f"\n📝 Sample word list from {word_lists[0]['page']}:")
        print(f"   Words: {', '.join(word_lists[0]['words'][:10])}")

if __name__ == "__main__":
    extract_all_shortforms()
