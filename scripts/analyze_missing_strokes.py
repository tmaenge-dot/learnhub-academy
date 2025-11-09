#!/usr/bin/env python3
"""
Analyze which strokes are missing from the extraction.
Cross-reference extracted files with the complete list of 26 consonants.
"""

from pathlib import Path
import json

def analyze_missing_strokes():
    """Identify which strokes were extracted and which are missing."""
    
    # Complete list of 26 consonant strokes expected
    ALL_STROKES = {
        # Unit 1 - Straight Downstrokes (Pages 9-11)
        'P': {'unit': 1, 'type': 'straight', 'page': 9},
        'B': {'unit': 1, 'type': 'straight', 'page': 9},
        'T': {'unit': 1, 'type': 'straight', 'page': 10},
        'D': {'unit': 1, 'type': 'straight', 'page': 10},
        'CH': {'unit': 1, 'type': 'straight', 'page': 11},
        'J': {'unit': 1, 'type': 'straight', 'page': 11},
        
        # Unit 2 - Curved Strokes (Pages 16-19)
        'F': {'unit': 2, 'type': 'curved', 'page': 16},
        'V': {'unit': 2, 'type': 'curved', 'page': 16},
        'TH': {'unit': 2, 'type': 'curved', 'page': 17},
        'THE': {'unit': 2, 'type': 'curved', 'page': 17},
        'S': {'unit': 2, 'type': 'curved', 'page': 18},
        'Z': {'unit': 2, 'type': 'curved', 'page': 18},
        'SH': {'unit': 2, 'type': 'curved', 'page': 19},
        'ZH': {'unit': 2, 'type': 'curved', 'page': 19},
        
        # Unit 3 - Horizontal (Page 20)
        'K': {'unit': 3, 'type': 'horizontal', 'page': 20},
        'G': {'unit': 3, 'type': 'horizontal', 'page': 20},
        'M': {'unit': 3, 'type': 'horizontal', 'page': 20},
        
        # Unit 3 - Upward (Page 21)
        'N': {'unit': 3, 'type': 'upward', 'page': 21},
        'NG': {'unit': 3, 'type': 'upward', 'page': 21},
        'L': {'unit': 3, 'type': 'upward', 'page': 21},
        'W': {'unit': 3, 'type': 'upward', 'page': 21},
        'Y': {'unit': 3, 'type': 'upward', 'page': 21},
        'H': {'unit': 3, 'type': 'upward', 'page': 21},
        
        # Additional variants (if in book)
        'ITH': {'unit': 2, 'type': 'curved_variant', 'page': 17},
        'ISH': {'unit': 2, 'type': 'curved_variant', 'page': 19},
        'ZHEE': {'unit': 2, 'type': 'curved_variant', 'page': 19},
    }
    
    # Check what's been extracted
    extracted_dir = Path(__file__).parent.parent / "assets" / "stroke-images" / "extracted-professional"
    extracted_files = list(extracted_dir.glob("*_professional.png"))
    
    extracted_strokes = {}
    for file in extracted_files:
        # Extract stroke name from filename (e.g., "P_professional.png" -> "P")
        stroke_name = file.stem.replace('_professional', '')
        file_size_kb = file.stat().st_size / 1024
        extracted_strokes[stroke_name] = {
            'file': file.name,
            'size_kb': round(file_size_kb, 1)
        }
    
    # Categorize strokes
    found = []
    missing = []
    extra = []  # Extracted but not in our expected list
    
    for stroke in sorted(ALL_STROKES.keys()):
        if stroke in extracted_strokes:
            found.append({
                'name': stroke,
                'info': ALL_STROKES[stroke],
                'file': extracted_strokes[stroke]
            })
        else:
            missing.append({
                'name': stroke,
                'info': ALL_STROKES[stroke]
            })
    
    # Check for extra files (variants we extracted but didn't expect)
    for stroke in extracted_strokes:
        if stroke not in ALL_STROKES:
            extra.append({
                'name': stroke,
                'file': extracted_strokes[stroke]
            })
    
    # Print detailed report
    print("=" * 70)
    print("📊 STROKE EXTRACTION ANALYSIS")
    print("=" * 70)
    print()
    
    print(f"✅ SUCCESSFULLY EXTRACTED: {len(found)}/{len(ALL_STROKES)} strokes")
    print("-" * 70)
    
    # Group by unit
    for unit in [1, 2, 3]:
        unit_strokes = [s for s in found if s['info']['unit'] == unit]
        if unit_strokes:
            print(f"\n📖 Unit {unit}:")
            for stroke in unit_strokes:
                name = stroke['name']
                stype = stroke['info']['type']
                page = stroke['info']['page']
                size = stroke['file']['size_kb']
                print(f"   ✓ {name:6} - {stype:16} (page {page:2}, {size:6.1f} KB)")
    
    # Show variants
    variants = [s for s in found if 'variant' in s['info']['type']]
    if variants:
        print(f"\n📝 Variants/Alternatives:")
        for stroke in variants:
            name = stroke['name']
            stype = stroke['info']['type']
            page = stroke['info']['page']
            size = stroke['file']['size_kb']
            print(f"   ✓ {name:6} - {stype:16} (page {page:2}, {size:6.1f} KB)")
    
    print()
    print("=" * 70)
    print(f"❌ MISSING STROKES: {len(missing)}/{len(ALL_STROKES)}")
    print("-" * 70)
    
    if missing:
        # Group missing by page
        pages = {}
        for stroke in missing:
            page = stroke['info']['page']
            if page not in pages:
                pages[page] = []
            pages[page].append(stroke)
        
        for page in sorted(pages.keys()):
            strokes_on_page = pages[page]
            print(f"\n📄 Page {page}:")
            for stroke in strokes_on_page:
                name = stroke['name']
                stype = stroke['info']['type']
                print(f"   ✗ {name:6} - {stype:16}")
        
        print()
        print("🔧 EXTRACTION PLAN:")
        print("-" * 70)
        for page in sorted(pages.keys()):
            stroke_names = [s['name'] for s in pages[page]]
            file_prefix = f"stroke_page-{page:03d}.png" if page < 20 else f"book_page-{page:03d}.png"
            print(f"   Page {page:2}: Extract {', '.join(stroke_names):20} from {file_prefix}")
    
    if extra:
        print()
        print("=" * 70)
        print(f"📌 UNEXPECTED EXTRACTIONS: {len(extra)}")
        print("-" * 70)
        print("   (These were extracted but not in the standard 26 consonants list)")
        for stroke in extra:
            name = stroke['name']
            size = stroke['file']['size_kb']
            print(f"   ? {name:6} ({size:6.1f} KB) - Check if this is a variant/alternative")
    
    print()
    print("=" * 70)
    print("📈 SUMMARY STATISTICS")
    print("=" * 70)
    print(f"   Total expected:        {len(ALL_STROKES)} strokes")
    print(f"   Successfully extracted: {len(found)} strokes ({len(found)*100//len(ALL_STROKES)}%)")
    print(f"   Still missing:          {len(missing)} strokes ({len(missing)*100//len(ALL_STROKES)}%)")
    print(f"   Unexpected extractions: {len(extra)} files")
    print()
    
    # Save analysis to JSON
    analysis = {
        'total_expected': len(ALL_STROKES),
        'extracted_count': len(found),
        'missing_count': len(missing),
        'success_rate': round(len(found) * 100 / len(ALL_STROKES), 1),
        'extracted': [s['name'] for s in found],
        'missing': [s['name'] for s in missing],
        'extraction_details': found,
        'missing_details': missing
    }
    
    output_file = extracted_dir / "extraction_analysis.json"
    with open(output_file, 'w') as f:
        json.dump(analysis, f, indent=2)
    
    print(f"💾 Detailed analysis saved to: {output_file}")
    print()
    
    return analysis

if __name__ == "__main__":
    analyze_missing_strokes()
