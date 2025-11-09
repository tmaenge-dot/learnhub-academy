#!/usr/bin/env python3
"""
Display extracted stroke pages for manual verification and AI analysis.
This script shows the stroke table images that were extracted.
"""

from pathlib import Path
import json

BASE_DIR = Path(__file__).parent.parent
DATA_FILE = BASE_DIR / "data" / "ai_extracted_strokes.json"
STROKE_DIR = BASE_DIR / "assets" / "extracted-strokes"

with open(DATA_FILE, 'r') as f:
    data = json.load(f)

print("=" * 70)
print("EXTRACTED STROKE PAGES FROM PITMAN REFERENCE")
print("=" * 70)
print(f"\n📊 Total pages with strokes: {data['total_pages_processed']}")
print(f"📁 Images location: {STROKE_DIR}\n")

print("=" * 70)
print("PAGES WITH STROKE TABLES/DIAGRAMS:")
print("=" * 70)

for page in data['extracted_pages']:
    print(f"\n📄 Page {page['page']}:")
    print(f"   Image: {page['image_path']}")
    print(f"   Has table: {page['has_table']}")
    print(f"   Content preview:")
    preview = page['ocr_text'][:200].replace('\n', ' ')
    print(f"   {preview}...")
    print()

print("=" * 70)
print("NEXT STEPS:")
print("=" * 70)
print("1. Open the images in: assets/extracted-strokes/")
print("2. Page 9 appears to have the alphabet stroke table")
print("3. Page 11 has vowel representations")  
print("4. Page 13 has shortforms")
print("\n💡 These images can now be analyzed by AI vision to extract:")
print("   - Stroke shapes and directions")
print("   - Letter/sound mappings")
print("   - Example words")
print("   - Visual representations")

