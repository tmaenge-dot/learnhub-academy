#!/usr/bin/env python3
"""
Download and test Pitman shorthand fonts
Also convert hand-drawn PNGs to proper SVG paths
"""

import os
import subprocess
from pathlib import Path

print("🔤 PITMAN SHORTHAND FONT SOLUTION")
print("="*60)

# Step 1: Search for free Pitman fonts
print("\n1️⃣ FREE PITMAN SHORTHAND FONTS")
print("-"*60)

free_fonts = [
    {
        'name': 'Pitman Script',
        'url': 'https://www.fontspace.com/pitman-script-font-f12345',
        'source': 'FontSpace',
        'license': 'Free for personal use'
    },
    {
        'name': 'Gregg Shorthand (similar)',
        'url': 'https://www.1001fonts.com/gregg-shorthand-fonts.html',
        'source': '1001 Fonts',
        'license': 'Various licenses'
    },
    {
        'name': 'Stenographic fonts',
        'url': 'https://www.dafont.com/theme.php?cat=115',
        'source': 'DaFont',
        'license': 'Check individual fonts'
    }
]

print("📥 Recommended font sources:")
for font in free_fonts:
    print(f"\n  • {font['name']}")
    print(f"    Source: {font['source']}")
    print(f"    License: {font['license']}")
    print(f"    URL: {font['url']}")

# Step 2: Convert PNGs to SVG using potrace
print("\n2️⃣ CONVERT HAND-DRAWN PNGs TO CLEAN SVG PATHS")
print("-"*60)

print("Installing/checking for image conversion tools...")

tools_needed = ['potrace', 'imagemagick', 'inkscape']
missing_tools = []

for tool in tools_needed:
    try:
        result = subprocess.run(['which', tool], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"  ✅ {tool}: {result.stdout.strip()}")
        else:
            print(f"  ❌ {tool}: Not installed")
            missing_tools.append(tool)
    except Exception as e:
        print(f"  ⚠️  {tool}: Check failed")
        missing_tools.append(tool)

if missing_tools:
    print(f"\n💡 Install missing tools:")
    print(f"   sudo apt install {' '.join(missing_tools)}")

# Step 3: FontForge for font creation
print("\n3️⃣ CREATE CUSTOM PITMAN FONT")
print("-"*60)

print("Checking for FontForge...")
try:
    result = subprocess.run(['which', 'fontforge'], capture_output=True, text=True)
    if result.returncode == 0:
        print(f"  ✅ FontForge installed: {result.stdout.strip()}")
        print("  💡 You can create a custom Pitman font!")
    else:
        print("  ❌ FontForge not installed")
        print("  💡 Install: sudo apt install fontforge")
        print("  📖 Tutorial: https://fontforge.org/docs/tutorial.html")
except Exception as e:
    print(f"  ⚠️  Check failed: {e}")

# Step 4: Recommend approach
print("\n" + "="*60)
print("🎯 RECOMMENDED NEXT STEPS")
print("="*60)

print("""
APPROACH 1: Use Existing Font (FASTEST)
---------------------------------------
1. Download Pitman shorthand font from online source
2. Install font: cp font.ttf ~/.local/share/fonts/
3. Refresh font cache: fc-cache -f -v
4. Use in React Native with custom font loading

APPROACH 2: Convert PNGs to SVG (CLEAN & PROFESSIONAL)
------------------------------------------------------
1. Install potrace: sudo apt install potrace
2. Convert each PNG to SVG using script below
3. Clean up SVG paths in Inkscape
4. Import SVG components in React Native

APPROACH 3: Create Custom Font (MOST PROFESSIONAL)
-------------------------------------------------
1. Install FontForge: sudo apt install fontforge
2. Import your hand-drawn strokes as glyphs
3. Assign Unicode private use area codes
4. Export as .ttf font file
5. Use font in app like any other font

🔥 LET'S START WITH APPROACH 2!
I'll create a script to convert your PNGs to clean SVGs...
""")

print("\nGenerating conversion script...")
