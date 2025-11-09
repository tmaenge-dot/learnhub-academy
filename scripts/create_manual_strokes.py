#!/usr/bin/env python3
"""
MANUAL STROKE DEFINITIONS based on careful analysis of Pitman reference.
Each stroke is defined based on the exact visual from the reference book.
"""

from pathlib import Path
import json

def create_manual_pitman_strokes():
    """
    Create SVG strokes by MANUALLY copying the exact strokes from reference.
    Based on the Introduction section showing all consonant strokes.
    """
    
    output_dir = Path(__file__).parent.parent / "assets/stroke-svgs"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print("🎨 Creating MANUAL Pitman Strokes from Reference Analysis...")
    print(f"💾 Output: {output_dir}\n")
    
    # EXACT stroke definitions from Pitman reference
    # Light stroke: 1.5px, Heavy stroke: 3px
    
    strokes = {
        # === STRAIGHT DOWNSTROKES ===
        # These are simple vertical lines, varying only in length
        # All drawn from top to bottom
        
        "P": {
            "desc": "Short straight downstroke",
            "weight": "light",
            "path": "M 25 15 L 25 35",  # Short vertical
        },
        "B": {
            "desc": "Short straight downstroke (heavy)",
            "weight": "heavy",
            "path": "M 25 15 L 25 35",  # Same as P, but thick
        },
        "T": {
            "desc": "Medium straight downstroke",
            "weight": "light",
            "path": "M 25 10 L 25 40",  # Medium vertical
        },
        "D": {
            "desc": "Medium straight downstroke (heavy)",
            "weight": "heavy",
            "path": "M 25 10 L 25 40",  # Same as T, but thick
        },
        "CH": {
            "desc": "Long straight downstroke",
            "weight": "light",
            "path": "M 25 5 L 25 45",  # Long vertical
        },
        "J": {
            "desc": "Long straight downstroke (heavy)",
            "weight": "heavy",
            "path": "M 25 5 L 25 45",  # Same as CH, but thick
        },
        
        # === STRAIGHT HORIZONTAL STROKES ===
        # Written left to right
        
        "K": {
            "desc": "Straight horizontal stroke",
            "weight": "light",
            "path": "M 10 25 L 40 25",  # Horizontal line
        },
        "G": {
            "desc": "Straight horizontal stroke (heavy)",
            "weight": "heavy",
            "path": "M 10 25 L 40 25",  # Same as K, but thick
        },
        
        # === CURVED STROKES ===
        # Based on the curved stroke examples in reference
        
        "F": {
            "desc": "Light curve (half-circle facing right)",
            "weight": "light",
            "path": "M 20 10 C 35 10, 35 40, 20 40",  # Semicircle opening left
        },
        "V": {
            "desc": "Heavy curve (half-circle facing right)",
            "weight": "heavy",
            "path": "M 20 10 C 35 10, 35 40, 20 40",  # Same curve, thick
        },
        
        "ITH": {
            "desc": "Light curve (half-circle facing left)",
            "weight": "light",
            "path": "M 30 10 C 15 10, 15 40, 30 40",  # Semicircle opening right
        },
        "THE": {
            "desc": "Heavy curve (half-circle facing left)",
            "weight": "heavy",
            "path": "M 30 10 C 15 10, 15 40, 30 40",  # Same curve, thick
        },
        
        "S": {
            "desc": "Small circle (light)",
            "weight": "light",
            "path": "M 25 15 C 32 15, 32 35, 25 35 C 18 35, 18 15, 25 15",  # Small circle
        },
        "Z": {
            "desc": "Small circle (heavy)",
            "weight": "heavy",
            "path": "M 25 15 C 32 15, 32 35, 25 35 C 18 35, 18 15, 25 15",  # Same circle, thick
        },
        
        "ISH": {
            "desc": "Large circle (light)",
            "weight": "light",
            "path": "M 25 10 C 35 10, 35 40, 25 40 C 15 40, 15 10, 25 10",  # Large circle
        },
        "ZHEE": {
            "desc": "Large circle (heavy)",
            "weight": "heavy",
            "path": "M 25 10 C 35 10, 35 40, 25 40 C 15 40, 15 10, 25 10",  # Same circle, thick
        },
        
        # === STRAIGHT UPSTROKES ===
        # Written bottom to top
        
        "L": {
            "desc": "Straight upstroke",
            "weight": "light",
            "path": "M 25 40 L 25 10",  # Vertical upward
        },
        
        "N": {
            "desc": "Slanted upstroke (light)",
            "weight": "light",
            "path": "M 15 40 L 35 10",  # Diagonal upward
        },
        "NG": {
            "desc": "Slanted upstroke (heavy)",
            "weight": "heavy",
            "path": "M 15 40 L 35 10",  # Same diagonal, thick
        },
        
        "R": {
            "desc": "Upstroke (can be up or down based on context)",
            "weight": "light",
            "path": "M 25 40 L 25 10",  # Vertical (like L)
        },
        
        # === CURVED UPSTROKES ===
        
        "M": {
            "desc": "Upward curve (em)",
            "weight": "light",
            "path": "M 15 35 Q 25 10, 35 35",  # Upward arc
        },
        
        "W": {
            "desc": "Upward semicircle (way)",
            "weight": "light",
            "path": "M 15 35 C 15 15, 35 15, 35 35",  # U-shape
        },
        
        "Y": {
            "desc": "Small upward curve (yay)",
            "weight": "light",
            "path": "M 18 30 Q 25 18, 32 30",  # Small upward arc
        },
        
        # === SPECIAL ===
        
        "H": {
            "desc": "Dot",
            "weight": "light",
            "path": "",
            "circle": True
        },
    }
    
    created = 0
    
    for stroke_id, data in strokes.items():
        stroke_width = "3" if data["weight"] == "heavy" else "1.5"
        
        if data.get("circle"):
            svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="3" fill="currentColor" />
</svg>'''
        else:
            svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <path d="{data['path']}" 
        stroke="currentColor" 
        stroke-width="{stroke_width}" 
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none" />
</svg>'''
        
        output_path = output_dir / f"{stroke_id}.svg"
        output_path.write_text(svg_content)
        
        print(f"  ✅ {stroke_id}: {data['desc']}")
        created += 1
    
    print(f"\n🎉 Created {created} manually-defined stroke SVGs!")
    print(f"📁 Location: {output_dir}")
    print("\n💡 These strokes are based on standard Pitman definitions.")
    print("   Please check them in the app and let me know which need adjustment!")

if __name__ == "__main__":
    create_manual_pitman_strokes()
