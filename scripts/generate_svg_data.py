#!/usr/bin/env python3
"""
Convert SVG files to inline SVG strings for React Native
"""

import os
from pathlib import Path
import re

SVG_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-svgs")
OUTPUT_FILE = Path("/home/oem/Desktop/shorthand-simplified/data/svg-stroke-data.ts")

print("🎨 Converting SVG files to TypeScript data...")

# Read all SVG files
svg_data = {}
svg_files = sorted([f for f in SVG_DIR.glob("*.svg") if not f.name.startswith("page_")])

for svg_file in svg_files:
    stroke_name = svg_file.stem
    with open(svg_file, 'r') as f:
        svg_content = f.read()
    
    # Clean up the SVG content
    # Remove XML declaration and DOCTYPE
    svg_content = re.sub(r'<\?xml[^>]+\?>\s*', '', svg_content)
    svg_content = re.sub(r'<!DOCTYPE[^>]+>\s*', '', svg_content)
    
    # Minify whitespace
    svg_content = re.sub(r'\s+', ' ', svg_content)
    svg_content = svg_content.strip()
    
    svg_data[stroke_name] = svg_content
    print(f"  ✓ {stroke_name}")

# Generate TypeScript file
ts_content = """// Auto-generated SVG stroke data
// Generated from assets/stroke-svgs/*.svg files
// These are vectorized versions of the hand-drawn PNG strokes

export const svgStrokeData: Record<string, string> = {
"""

for name, svg in sorted(svg_data.items()):
    # Escape backticks and special characters
    svg_escaped = svg.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    ts_content += f"  '{name}': `{svg_escaped}`,\n"

ts_content += """};

// Get SVG for a specific stroke
export function getSvgStroke(strokeName: string): string {
  return svgStrokeData[strokeName] || '';
}

// Get all available stroke names
export function getAvailableStrokes(): string[] {
  return Object.keys(svgStrokeData);
}

// Total number of strokes
export const TOTAL_SVG_STROKES = Object.keys(svgStrokeData).length;
"""

# Write the file
with open(OUTPUT_FILE, 'w') as f:
    f.write(ts_content)

print(f"\n✅ Generated {OUTPUT_FILE}")
print(f"📊 Total strokes: {len(svg_data)}")
print(f"💾 File size: {OUTPUT_FILE.stat().st_size:,} bytes")
