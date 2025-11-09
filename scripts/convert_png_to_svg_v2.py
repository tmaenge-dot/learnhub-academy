#!/usr/bin/env python3
"""
IMPROVED PNG to SVG conversion with proper transparency handling
"""

import os
import subprocess
from pathlib import Path
import shutil

# Paths
PNG_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-images/consonants")
SVG_OUTPUT_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-svgs")
TEMP_DIR = Path("/tmp/stroke_conversion_v2")

print("🎨 CONVERTING PNGs TO SVG (IMPROVED VERSION)")
print("="*70)

# Create directories
SVG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# Get all PNG files (exclude pages and originals)
png_files = sorted(PNG_DIR.glob("*.png"))
png_files = [f for f in png_files if not f.name.endswith("_original.png") and not f.name.startswith("page_")]

print(f"\n📁 Found {len(png_files)} stroke PNG files")

successful = 0
failed = 0

for i, png_file in enumerate(png_files, 1):
    stroke_name = png_file.stem
    print(f"\n[{i}/{len(png_files)}] Processing: {stroke_name}")
    
    try:
        # Step 1: Flatten PNG and convert to pure black on white
        bmp_file = TEMP_DIR / f"{stroke_name}.bmp"
        print(f"  1️⃣ Preprocessing PNG...")
        result = subprocess.run([
            'convert',
            str(png_file),
            '-background', 'white',     # White background
            '-alpha', 'remove',         # Remove transparency
            '-alpha', 'off',            # Disable alpha
            '-colorspace', 'Gray',      # Convert to grayscale
            '-negate',                  # Invert (black becomes white, white becomes black)
            '-threshold', '50%',        # Make it pure black/white
            '-negate',                  # Invert back
            str(bmp_file)
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ Preprocessing failed: {result.stderr}")
            failed += 1
            continue
        
        # Step 2: Trace to SVG
        svg_file = SVG_OUTPUT_DIR / f"{stroke_name}.svg"
        print(f"  2️⃣ Tracing to SVG...")
        result = subprocess.run([
            'potrace',
            str(bmp_file),
            '-s',                       # SVG output
            '-o', str(svg_file),
            '--tight',                  # Remove whitespace
            '--turnpolicy', 'majority', # Better curves
            '--turdsize', '2',          # Remove tiny specs
            '--alphamax', '0.8',        # Smoother curves
            '--opttolerance', '0.2',    # Optimize paths
        ], capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"  ❌ Tracing failed: {result.stderr}")
            failed += 1
            continue
        
        # Step 3: Verify SVG has content
        with open(svg_file, 'r') as f:
            svg_content = f.read()
        
        if '<path' not in svg_content:
            print(f"  ⚠️  Warning: No paths detected (empty stroke?)")
            # Keep the file anyway
        
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
print(f"  📂 SVG files: {SVG_OUTPUT_DIR}")

# Clean up
shutil.rmtree(TEMP_DIR)

# Now let's create a viewer to preview the SVGs
print("\n📊 Creating SVG preview HTML...")

html_content = """<!DOCTYPE html>
<html>
<head>
    <title>Pitman Shorthand Stroke SVGs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f0f0f0;
        }
        h1 {
            color: #333;
        }
        .stroke-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .stroke-card {
            background: white;
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        .stroke-card h3 {
            margin: 0 0 10px 0;
            color: #0066cc;
            font-size: 14px;
        }
        .stroke-display {
            width: 100%;
            height: 100px;
            background: #fafafa;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .stroke-display img {
            max-width: 80px;
            max-height: 80px;
        }
    </style>
</head>
<body>
    <h1>🖋️ Pitman Shorthand Strokes (SVG)</h1>
    <p>All 26 consonant strokes converted from hand-drawn PNGs to scalable SVG format</p>
    
    <div class="stroke-grid">
"""

# Add each stroke
stroke_names = sorted([f.stem for f in SVG_OUTPUT_DIR.glob("*.svg") if not f.name.startswith("page_")])
for name in stroke_names:
    html_content += f"""
        <div class="stroke-card">
            <h3>{name}</h3>
            <div class="stroke-display">
                <img src="../assets/stroke-svgs/{name}.svg" alt="{name}">
            </div>
        </div>
"""

html_content += """
    </div>
</body>
</html>
"""

preview_file = Path("/home/oem/Desktop/shorthand-simplified/stroke-svg-preview.html")
with open(preview_file, 'w') as f:
    f.write(html_content)

print(f"✅ Preview created: {preview_file}")
print(f"\n🌐 Open preview: firefox {preview_file}")
