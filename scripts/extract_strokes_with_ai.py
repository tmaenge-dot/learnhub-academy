#!/usr/bin/env python3
"""
AI-Powered Stroke Extraction from Pitman Shorthand Reference
This script extracts stroke representations, diagrams, and tables from the reference PDF
and uses AI to identify and catalog them.
"""

import os
import json
import re
from pathlib import Path
from pdf2image import convert_from_path
from PIL import Image
import pytesseract

# Base paths
BASE_DIR = Path(__file__).parent.parent
REFERENCE_PDF = BASE_DIR / "assets" / "reference-materials" / "pitman" / "Shorthand-Book.pdf"
OUTPUT_DIR = BASE_DIR / "assets" / "extracted-strokes"
DATA_OUTPUT = BASE_DIR / "data" / "ai_extracted_strokes.json"

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def extract_stroke_tables_from_pdf():
    """
    Extract pages containing stroke tables/diagrams from the reference PDF.
    Pages with alphabet tables, stroke charts, shortform lists, etc.
    """
    print("📖 Converting PDF pages to images...")
    
    # Key pages from the reference that contain stroke tables
    # Based on typical Pitman book structure
    key_pages = {
        'alphabet_strokes': list(range(1, 15)),      # Basic alphabet strokes
        'vowels': list(range(15, 25)),                # Vowel marks
        'shortforms': list(range(13, 80)),            # Shortforms throughout units
        'consonant_blends': list(range(25, 50)),      # Consonant combinations
        'special_forms': list(range(50, 100)),        # Special outlines
        'phrases': list(range(100, 120)),             # Phrase combinations
    }
    
    all_pages = set()
    for page_list in key_pages.values():
        all_pages.update(page_list)
    
    all_pages = sorted(list(all_pages))[:20]  # Start with first 20 pages
    
    print(f"🎯 Processing {len(all_pages)} key pages...")
    
    try:
        images = convert_from_path(
            REFERENCE_PDF,
            first_page=min(all_pages),
            last_page=max(all_pages),
            dpi=300  # High DPI for better quality
        )
        
        extracted_data = []
        
        for idx, img in enumerate(images):
            page_num = min(all_pages) + idx
            print(f"  📄 Processing page {page_num}...")
            
            # Save full page image
            page_img_path = OUTPUT_DIR / f"page_{page_num:03d}.png"
            img.save(page_img_path, 'PNG')
            
            # Extract text using OCR
            text = pytesseract.image_to_string(img)
            
            # Detect if page contains stroke tables/diagrams
            indicators = [
                'stroke', 'alphabet', 'vowel', 'consonant',
                'shortform', 'outline', 'representation',
                'horizontal', 'vertical', 'upward', 'downward'
            ]
            
            has_strokes = any(indicator in text.lower() for indicator in indicators)
            
            if has_strokes:
                extracted_data.append({
                    'page': page_num,
                    'image_path': str(page_img_path.relative_to(BASE_DIR)),
                    'ocr_text': text[:500],  # First 500 chars
                    'has_table': 'table' in text.lower() or '|' in text,
                    'has_diagram': True,
                })
                print(f"    ✅ Found stroke content on page {page_num}")
        
        return extracted_data
        
    except Exception as e:
        print(f"❌ Error processing PDF: {e}")
        return []

def detect_stroke_regions(image_path):
    """
    Detect regions in the image that contain stroke diagrams/tables.
    This uses image processing to find boxes, lines, and stroke patterns.
    """
    from PIL import ImageDraw, ImageFilter
    
    img = Image.open(image_path)
    
    # Convert to grayscale
    gray = img.convert('L')
    
    # Detect edges (strokes will have clear edges)
    edges = gray.filter(ImageFilter.FIND_EDGES)
    
    # For now, save the edge-detected version
    edges_path = Path(image_path).parent / f"{Path(image_path).stem}_edges.png"
    edges.save(edges_path)
    
    return {
        'original': str(image_path),
        'edges': str(edges_path),
        'regions': []  # TODO: Implement region detection
    }

def analyze_with_ai_description(page_data):
    """
    Prepare data structure for AI analysis.
    In a production system, this would call an AI vision API (like GPT-4 Vision, Claude Vision, etc.)
    to analyze the stroke diagrams and extract:
    - Letter/sound represented
    - Stroke direction (upward, downward, horizontal, etc.)
    - Stroke shape (straight, curve, hook, etc.)
    - Example words
    """
    
    # For now, we'll structure the data to be ready for AI analysis
    return {
        'page': page_data['page'],
        'image_for_ai': page_data['image_path'],
        'ocr_context': page_data['ocr_text'],
        'extraction_prompt': """
        Analyze this Pitman Shorthand reference page and extract:
        1. All stroke representations shown (as visual descriptions)
        2. The letter/sound each stroke represents
        3. The direction of the stroke (upward, downward, horizontal, left-to-right, etc.)
        4. Example words using each stroke
        5. Any special notes about the stroke usage
        
        Format as JSON with entries like:
        {
          "letter": "m",
          "stroke": "Horizontal left to right",
          "visual_description": "Short horizontal line written left to right",
          "examples": ["men", "him", "sum"],
          "notes": "Light horizontal stroke"
        }
        """,
        'expected_output_format': 'structured_json'
    }

def main():
    """Main extraction process."""
    print("🚀 Starting AI-Powered Stroke Extraction\n")
    
    if not REFERENCE_PDF.exists():
        print(f"❌ Reference PDF not found at: {REFERENCE_PDF}")
        return
    
    # Step 1: Extract key pages
    print("=" * 60)
    print("STEP 1: Extracting pages with stroke tables")
    print("=" * 60)
    extracted_pages = extract_stroke_tables_from_pdf()
    print(f"\n✅ Extracted {len(extracted_pages)} pages with stroke content\n")
    
    # Step 2: Detect stroke regions in each page
    print("=" * 60)
    print("STEP 2: Detecting stroke diagram regions")
    print("=" * 60)
    for page_data in extracted_pages[:5]:  # Process first 5 pages
        print(f"  🔍 Analyzing page {page_data['page']}...")
        regions = detect_stroke_regions(BASE_DIR / page_data['image_path'])
        page_data['regions'] = regions
    
    # Step 3: Prepare for AI analysis
    print("\n" + "=" * 60)
    print("STEP 3: Preparing data for AI vision analysis")
    print("=" * 60)
    ai_ready_data = []
    for page_data in extracted_pages:
        ai_data = analyze_with_ai_description(page_data)
        ai_ready_data.append(ai_data)
        print(f"  ✅ Prepared page {page_data['page']} for AI analysis")
    
    # Step 4: Save results
    output = {
        'extraction_date': '2025-11-04',
        'source_pdf': str(REFERENCE_PDF.name),
        'total_pages_processed': len(extracted_pages),
        'pages_with_strokes': len([p for p in extracted_pages if p.get('has_diagram')]),
        'extracted_pages': extracted_pages,
        'ai_ready_data': ai_ready_data,
        'next_steps': [
            'Send ai_ready_data to AI vision API (GPT-4 Vision, Claude, etc.)',
            'Extract stroke representations from AI response',
            'Match with existing word lists in shortforms.ts',
            'Generate TypeScript data file with image references'
        ]
    }
    
    with open(DATA_OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print("✨ EXTRACTION COMPLETE!")
    print("=" * 60)
    print(f"📊 Processed: {len(extracted_pages)} pages")
    print(f"🖼️  Images saved to: {OUTPUT_DIR}")
    print(f"💾 Data saved to: {DATA_OUTPUT}")
    print(f"\n📋 Next Step: Review {DATA_OUTPUT} and send images to AI vision API")
    print("    for automatic stroke recognition and cataloging.")

if __name__ == "__main__":
    main()
