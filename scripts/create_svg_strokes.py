#!/usr/bin/env python3
"""
Create SVG representations of Pitman shorthand strokes.
These SVG files can be used directly in React Native with react-native-svg.
"""

from pathlib import Path
import json

def create_svg_strokes():
    """Create SVG files for each Pitman consonant stroke"""
    
    output_dir = Path(__file__).parent.parent / "assets/stroke-svgs"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print("🎨 Creating SVG Pitman Stroke Symbols...")
    print(f"💾 Output: {output_dir}\n")
    
    # Define SVG paths for each stroke based on Pitman specifications
    # Light strokes: 1.5px width, Heavy strokes: 3px width
    
    strokes = {
        # CURVED STROKES (the problematic ones)
        "F": {
            "name": "F (ef)",
            "weight": "light",
            "path": "M 10 40 Q 20 20, 40 10",  # Shallow curve right
            "viewBox": "0 0 50 50"
        },
        "V": {
            "name": "V (vee)",
            "weight": "heavy",
            "path": "M 10 40 Q 20 20, 40 10",  # Shallow curve right (heavy)
            "viewBox": "0 0 50 50"
        },
        "ITH": {
            "name": "ITH (voiceless th)",
            "weight": "light",
            "path": "M 40 40 Q 30 20, 10 10",  # Shallow curve left
            "viewBox": "0 0 50 50"
        },
        "THE": {
            "name": "THE (voiced th)",
            "weight": "heavy",
            "path": "M 40 40 Q 30 20, 10 10",  # Shallow curve left (heavy)
            "viewBox": "0 0 50 50"
        },
        "S": {
            "name": "S (ess)",
            "weight": "light",
            "path": "M 35 45 Q 25 25, 15 5",  # Medium curve
            "viewBox": "0 0 50 50"
        },
        "Z": {
            "name": "Z (zee)",
            "weight": "heavy",
            "path": "M 35 45 Q 25 25, 15 5",  # Medium curve (heavy)
            "viewBox": "0 0 50 50"
        },
        "ISH": {
            "name": "ISH (ishi)",
            "weight": "light",
            "path": "M 40 50 Q 15 25, 40 0",  # Deep curve
            "viewBox": "0 0 50 60"
        },
        "ZHEE": {
            "name": "ZHEE (zhee)",
            "weight": "heavy",
            "path": "M 40 50 Q 15 25, 40 0",  # Deep curve (heavy)
            "viewBox": "0 0 50 60"
        },
        
        # STRAIGHT STROKES
        "P": {
            "name": "P",
            "weight": "light",
            "path": "M 25 10 L 25 30",  # Short downward
            "viewBox": "0 0 50 50"
        },
        "B": {
            "name": "B",
            "weight": "heavy",
            "path": "M 25 10 L 25 30",  # Short downward (heavy)
            "viewBox": "0 0 50 50"
        },
        "T": {
            "name": "T",
            "weight": "light",
            "path": "M 25 10 L 25 40",  # Medium downward
            "viewBox": "0 0 50 50"
        },
        "D": {
            "name": "D",
            "weight": "heavy",
            "path": "M 25 10 L 25 40",  # Medium downward (heavy)
            "viewBox": "0 0 50 50"
        },
        "CH": {
            "name": "CH",
            "weight": "light",
            "path": "M 25 5 L 25 45",  # Long downward
            "viewBox": "0 0 50 50"
        },
        "J": {
            "name": "J",
            "weight": "heavy",
            "path": "M 25 5 L 25 45",  # Long downward (heavy)
            "viewBox": "0 0 50 50"
        },
        
        # HORIZONTAL STROKES
        "K": {
            "name": "K (kay)",
            "weight": "light",
            "path": "M 10 25 L 40 25",  # Horizontal
            "viewBox": "0 0 50 50"
        },
        "G": {
            "name": "G (gay)",
            "weight": "heavy",
            "path": "M 10 25 L 40 25",  # Horizontal (heavy)
            "viewBox": "0 0 50 50"
        },
        "M": {
            "name": "M (em)",
            "weight": "light",
            "path": "M 10 25 Q 25 15, 40 25",  # Horizontal hook
            "viewBox": "0 0 50 50"
        },
        
        # UPWARD STROKES
        "N": {
            "name": "N (en)",
            "weight": "light",
            "path": "M 10 40 L 40 10",  # Upward diagonal
            "viewBox": "0 0 50 50"
        },
        "NG": {
            "name": "NG (ing)",
            "weight": "heavy",
            "path": "M 10 40 L 40 10",  # Upward diagonal (heavy)
            "viewBox": "0 0 50 50"
        },
        "L": {
            "name": "L (el)",
            "weight": "light",
            "path": "M 25 40 L 25 10",  # Upward vertical
            "viewBox": "0 0 50 50"
        },
        "W": {
            "name": "W (way)",
            "weight": "light",
            "path": "M 10 40 Q 25 25, 40 10",  # Upward curve
            "viewBox": "0 0 50 50"
        },
        "Y": {
            "name": "Y (yay)",
            "weight": "light",
            "path": "M 15 35 Q 25 25, 35 15",  # Smaller upward curve
            "viewBox": "0 0 50 50"
        },
        "R": {
            "name": "R (ar)",
            "weight": "light",
            "path": "M 15 10 Q 25 25, 35 40",  # Variable curve
            "viewBox": "0 0 50 50"
        },
        
        # SPECIAL
        "H": {
            "name": "H (aitch)",
            "weight": "light",
            "path": "M 25 25 L 25 25",  # Dot (will use circle instead)
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
  <circle cx="25" cy="25" r="4" fill="currentColor" />
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
    
    print(f"\n🎉 Created {created} SVG stroke files!")
    print(f"📁 Location: {output_dir}")
    print(f"📄 Metadata: {metadata_path}")
    
    print("\n📦 Next: Install react-native-svg")
    print("   npm install react-native-svg")
    print("   npx expo install react-native-svg")

if __name__ == "__main__":
    create_svg_strokes()
