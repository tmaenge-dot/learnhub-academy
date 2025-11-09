#!/usr/bin/env python3
"""
Create ACCURATE SVG representations of Pitman shorthand strokes
based on the official reference showing stroke directions with arrows.
"""

from pathlib import Path
import json

def create_accurate_svg_strokes():
    """Create SVG files matching the actual Pitman stroke directions"""
    
    output_dir = Path(__file__).parent.parent / "assets/stroke-svgs"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print("🎨 Creating ACCURATE Pitman Stroke Symbols from Reference...")
    print(f"💾 Output: {output_dir}\n")
    
    # Define SVG paths based on ACTUAL Pitman strokes with correct directions
    # Reference: The arrows in the provided image show exact stroke directions
    
    strokes = {
        # STRAIGHT DOWNSTROKES (p, b, t, d, ch, j)
        # Arrow shows: TOP to BOTTOM (vertical down)
        "P": {
            "name": "P",
            "weight": "light",
            "path": "M 25 10 L 25 30",  # Short downstroke
            "viewBox": "0 0 50 50"
        },
        "B": {
            "name": "B",
            "weight": "heavy",
            "path": "M 25 10 L 25 30",  # Short downstroke (heavy)
            "viewBox": "0 0 50 50"
        },
        "T": {
            "name": "T",
            "weight": "light",
            "path": "M 25 5 L 25 35",  # Medium downstroke
            "viewBox": "0 0 50 50"
        },
        "D": {
            "name": "D",
            "weight": "heavy",
            "path": "M 25 5 L 25 35",  # Medium downstroke (heavy)
            "viewBox": "0 0 50 50"
        },
        "CH": {
            "name": "CH",
            "weight": "light",
            "path": "M 25 5 L 25 40",  # Long downstroke
            "viewBox": "0 0 50 50"
        },
        "J": {
            "name": "J",
            "weight": "heavy",
            "path": "M 25 5 L 25 40",  # Long downstroke (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # CURVED DOWNSTROKES - Based on reference arrows
        # F, V: Curve from top-left, curving RIGHT, ending bottom-right
        "F": {
            "name": "F (ef)",
            "weight": "light",
            "path": "M 15 10 Q 25 20, 35 30",  # Gentle right curve downward
            "viewBox": "0 0 50 50"
        },
        "V": {
            "name": "V (vee)",
            "weight": "heavy",
            "path": "M 15 10 Q 25 20, 35 30",  # Gentle right curve downward (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # TH (voiceless), TH (voiced): Curve from top-right, curving LEFT, ending bottom-left
        "ITH": {
            "name": "ITH (th)",
            "weight": "light",
            "path": "M 35 10 Q 25 20, 15 30",  # Gentle left curve downward
            "viewBox": "0 0 50 50"
        },
        "THE": {
            "name": "THE (TH)",
            "weight": "heavy",
            "path": "M 35 10 Q 25 20, 15 30",  # Gentle left curve downward (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # S, Z: Deeper curve - starts top, curves more prominently
        "S": {
            "name": "S (ess)",
            "weight": "light",
            "path": "M 30 5 Q 20 15, 20 25 Q 20 35, 30 45",  # S-curve (left lean)
            "viewBox": "0 0 50 50"
        },
        "Z": {
            "name": "Z (zee)",
            "weight": "heavy",
            "path": "M 30 5 Q 20 15, 20 25 Q 20 35, 30 45",  # S-curve (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # SH, ZH: Deep semi-circle curve
        "ISH": {
            "name": "ISH (sh)",
            "weight": "light",
            "path": "M 35 5 Q 10 25, 35 45",  # Deep semi-circle
            "viewBox": "0 0 50 50"
        },
        "ZHEE": {
            "name": "ZHEE (zh)",
            "weight": "heavy",
            "path": "M 35 5 Q 10 25, 35 45",  # Deep semi-circle (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # STRAIGHT HORIZONTAL STROKES (k, g)
        # Arrow shows: LEFT to RIGHT
        "K": {
            "name": "K (kay)",
            "weight": "light",
            "path": "M 10 25 L 40 25",  # Horizontal stroke
            "viewBox": "0 0 50 50"
        },
        "G": {
            "name": "G (gay)",
            "weight": "heavy",
            "path": "M 10 25 L 40 25",  # Horizontal stroke (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # STRAIGHT UPSTROKES
        # L: Straight vertical UP (arrow points up)
        "L": {
            "name": "L (el)",
            "weight": "light",
            "path": "M 25 40 L 25 10",  # Upward stroke
            "viewBox": "0 0 50 50"
        },
        
        # N: Diagonal upward stroke (arrow points up-right)
        "N": {
            "name": "N (en)",
            "weight": "light",
            "path": "M 15 40 L 35 10",  # Diagonal upward
            "viewBox": "0 0 50 50"
        },
        "NG": {
            "name": "NG (ing)",
            "weight": "heavy",
            "path": "M 15 40 L 35 10",  # Diagonal upward (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # R: Can be upward or downward (shown with up/down arrows)
        "R": {
            "name": "R (ar)",
            "weight": "light",
            "path": "M 25 40 L 25 10",  # Vertical (context-dependent)
            "viewBox": "0 0 50 50"
        },
        
        # M: Horizontal with slight hook (shown as horizontal with curve)
        "M": {
            "name": "M (em)",
            "weight": "light",
            "path": "M 10 30 Q 15 20, 25 25 Q 35 30, 40 25",  # Horizontal wave
            "viewBox": "0 0 50 50"
        },
        
        # SPECIALLY FORMED UPSTROKES
        # W: Large semicircle curve upward
        "W": {
            "name": "W (way)",
            "weight": "light",
            "path": "M 10 35 Q 25 10, 40 35",  # Upward semicircle
            "viewBox": "0 0 50 50"
        },
        
        # Y: Smaller semicircle curve upward
        "Y": {
            "name": "Y (yay)",
            "weight": "light",
            "path": "M 15 30 Q 25 15, 35 30",  # Smaller upward curve
            "viewBox": "0 0 50 50"
        },
        
        # H: Dot (specially formed)
        "H": {
            "name": "H (aitch)",
            "weight": "light",
            "path": "M 25 25 L 25 25",
            "viewBox": "0 0 50 50",
            "circle": True
        },
    }
    
    created = 0
    metadata = {}
    
    for stroke_id, stroke_data in strokes.items():
        # Determine stroke width based on weight
        stroke_width = "3" if stroke_data["weight"] == "heavy" else "1.5"
        
        # Create SVG content
        if stroke_data.get("circle"):
            # H is a dot
            svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{stroke_data['viewBox']}">
  <circle cx="25" cy="25" r="3" fill="currentColor" />
</svg>'''
        else:
            svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{stroke_data['viewBox']}">
  <path d="{stroke_data['path']}" 
        stroke="currentColor" 
        stroke-width="{stroke_width}" 
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none" />
</svg>'''
        
        # Save SVG file
        output_path = output_dir / f"{stroke_id}.svg"
        output_path.write_text(svg_content)
        
        # Store metadata
        metadata[stroke_id] = {
            "name": stroke_data["name"],
            "weight": stroke_data["weight"],
            "file": f"{stroke_id}.svg",
            "viewBox": stroke_data["viewBox"]
        }
        
        print(f"  ✅ {stroke_id}: {stroke_data['name']}")
        created += 1
    
    # Save metadata JSON
    metadata_path = output_dir / "strokes.json"
    metadata_path.write_text(json.dumps(metadata, indent=2))
    
    print(f"\n🎉 Created {created} ACCURATE SVG stroke files based on reference arrows!")
    print(f"📁 Location: {output_dir}")
    print(f"📄 Metadata: {metadata_path}")

if __name__ == "__main__":
    create_accurate_svg_strokes()
