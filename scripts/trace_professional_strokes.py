#!/usr/bin/env python3
"""
Trace professional strokes from reference book pages to perfect SVG vectors
This creates smooth, scalable, book-quality strokes
"""

import subprocess
from pathlib import Path
import shutil

PROFESSIONAL_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-images/professional")
SVG_OUTPUT_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-svgs/book-quality")
TEMP_DIR = Path("/tmp/stroke_trace")

print("🎨 TRACING PROFESSIONAL STROKES TO PERFECT SVG VECTORS")
print("="*70)

# Create directories
SVG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# Get all extracted book pages
book_pages = sorted(PROFESSIONAL_DIR.glob("book_page-*.png"))
print(f"📄 Found {len(book_pages)} professional pages")
print()

# Focus on key pages with stroke diagrams
key_pages = {
    1: "Title/Introduction",
    2: "Contents",
    3: "Basics",
    4: "Introduction to Strokes",
    5: "Consonant Overview",
    6: "Stroke Fundamentals",
    7: "Stroke Principles",
    8: "Consonant Strokes (Part 1)",
    9: "Consonant Strokes (Part 2)",
    10: "Consonant Strokes (Part 3)",
    11: "Vowel Introduction",
    12: "Vowel Strokes",
    13: "Stroke Combinations",
    14: "Practice Strokes",
    15: "Word Outlines (Part 1)",
}

print("🎯 Processing key pages with stroke content...")
print()

successful = 0
for page_num, description in key_pages.items():
    page_file = PROFESSIONAL_DIR / f"book_page-{page_num:03d}.png"
    
    if not page_file.exists():
        print(f"  ⚠️  Page {page_num} not found")
        continue
    
    print(f"[Page {page_num}] {description}")
    
    try:
        # Pre-process image for better tracing
        processed_file = TEMP_DIR / f"processed_{page_num:03d}.bmp"
        print(f"  1️⃣ Pre-processing...")
        
        result = subprocess.run([
            'convert',
            str(page_file),
            '-colorspace', 'Gray',
            '-threshold', '50%',
            '-negate',
            str(processed_file)
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ Pre-processing failed")
            continue
        
        # Trace to SVG with highest quality settings
        svg_file = SVG_OUTPUT_DIR / f"page_{page_num:03d}_traced.svg"
        print(f"  2️⃣ Tracing to SVG with potrace...")
        
        result = subprocess.run([
            'potrace',
            str(processed_file),
            '-s',  # SVG output
            '-o', str(svg_file),
            '--tight',
            '--turnpolicy', 'majority',
            '--turdsize', '2',
            '--alphamax', '0.0',  # Sharpest corners
            '--opttolerance', '0.2',
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ Tracing failed")
            continue
        
        file_size = svg_file.stat().st_size
        print(f"  ✅ Success! ({file_size:,} bytes)")
        successful += 1
        
    except Exception as e:
        print(f"  ❌ Error: {e}")

# Clean up
shutil.rmtree(TEMP_DIR)

print()
print("="*70)
print(f"✨ TRACING COMPLETE!")
print(f"  ✅ Successfully traced: {successful} pages")
print(f"  📂 SVG files saved to: {SVG_OUTPUT_DIR}")
print()
print("🎯 NEXT STEP:")
print("   Open the SVG files to view the professional traced strokes!")
print(f"   Command: firefox {SVG_OUTPUT_DIR}/page_*.svg")
