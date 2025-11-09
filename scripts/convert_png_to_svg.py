#!/usr/bin/env python3
"""
Convert hand-drawn PNG strokes to clean SVG paths using potrace
This will give us professional, scalable vector graphics
"""

import os
import subprocess
from pathlib import Path
import shutil

# Paths
PNG_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-images/consonants")
SVG_OUTPUT_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-svgs")
TEMP_DIR = Path("/tmp/stroke_conversion")

print("🎨 CONVERTING HAND-DRAWN PNGs TO CLEAN SVG PATHS")
print("="*70)

# Create directories
SVG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# Get all PNG files
png_files = sorted(PNG_DIR.glob("*.png"))
png_files = [f for f in png_files if not f.name.endswith("_original.png")]

print(f"\n📁 Found {len(png_files)} stroke PNG files")
print(f"📂 Input directory: {PNG_DIR}")
print(f"📂 Output directory: {SVG_OUTPUT_DIR}")

successful = 0
failed = 0

for i, png_file in enumerate(png_files, 1):
    stroke_name = png_file.stem
    print(f"\n[{i}/{len(png_files)}] Processing: {stroke_name}")
    
    try:
        # Step 1: Convert PNG to BMP (potrace needs BMP input)
        bmp_file = TEMP_DIR / f"{stroke_name}.bmp"
        print(f"  1️⃣ Converting to BMP...")
        result = subprocess.run([
            'convert',
            str(png_file),
            '-threshold', '50%',  # Convert to pure black/white
            '-negate',            # Invert colors (potrace needs black strokes)
            str(bmp_file)
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ BMP conversion failed: {result.stderr}")
            failed += 1
            continue
        
        # Step 2: Trace BMP to SVG using potrace
        svg_file = SVG_OUTPUT_DIR / f"{stroke_name}.svg"
        print(f"  2️⃣ Tracing to SVG with potrace...")
        result = subprocess.run([
            'potrace',
            str(bmp_file),
            '-s',                 # SVG output
            '-o', str(svg_file),
            '--tight',            # Remove whitespace
            '--turnpolicy', 'minority',  # Better curves
            '--turdsize', '2',    # Remove tiny specs
            '--alphamax', '1.0',  # Smoother curves
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ SVG tracing failed: {result.stderr}")
            failed += 1
            continue
        
        # Step 3: Optimize SVG (remove metadata, clean up)
        print(f"  3️⃣ Optimizing SVG...")
        
        # Read SVG content
        with open(svg_file, 'r') as f:
            svg_content = f.read()
        
        # Basic cleanup
        svg_content = svg_content.replace('<?xml version="1.0" standalone="no"?>\n', '')
        svg_content = svg_content.replace('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"\n "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n', '')
        
        # Write cleaned SVG
        with open(svg_file, 'w') as f:
            f.write(svg_content)
        
        file_size = svg_file.stat().st_size
        print(f"  ✅ Success! ({file_size} bytes)")
        successful += 1
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        failed += 1

print("\n" + "="*70)
print(f"✨ CONVERSION COMPLETE!")
print(f"  ✅ Successful: {successful}")
print(f"  ❌ Failed: {failed}")
print(f"  📂 SVG files saved to: {SVG_OUTPUT_DIR}")

# Clean up temp files
print(f"\n🧹 Cleaning up temporary files...")
shutil.rmtree(TEMP_DIR)

print("\n" + "="*70)
print("🎯 NEXT STEPS:")
print("="*70)
print("""
1. Review generated SVG files in: assets/stroke-svgs/
2. Open SVGs in Inkscape to fine-tune if needed
3. Update data/stroke-svgs.ts to use new SVG files
4. Test in app to verify all strokes display correctly

📝 To use SVGs in React Native:
   - Use react-native-svg library
   - Import SVG as component
   - Render with <SvgComponent /> 

🔍 You can preview SVGs:
   - firefox assets/stroke-svgs/*.svg
   - inkscape assets/stroke-svgs/
""")
