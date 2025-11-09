#!/usr/bin/env python3
"""
Process stroke images to make heavy strokes darker and thicker
"""

from PIL import Image, ImageEnhance, ImageFilter
from pathlib import Path

def make_stroke_heavier(image_path, output_path):
    """Make a stroke image darker and thicker"""
    
    # Open the image
    img = Image.open(image_path).convert('RGBA')
    
    # Extract alpha channel
    alpha = img.split()[3]
    
    # Make the stroke thicker by dilating
    # Apply a slight blur and threshold to thicken lines
    for _ in range(2):  # Apply twice for more thickness
        alpha = alpha.filter(ImageFilter.MaxFilter(3))
    
    # Darken the stroke
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.3)  # Make much darker
    
    # Increase contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2.0)  # Increase contrast
    
    # Restore the modified alpha channel
    r, g, b, _ = img.split()
    img = Image.merge('RGBA', (r, g, b, alpha))
    
    # Save
    img.save(output_path)
    print(f"  ✅ Processed: {output_path.name}")

def process_heavy_strokes():
    """Process all heavy strokes to make them darker and thicker"""
    
    stroke_dir = Path(__file__).parent.parent / "assets/stroke-images/consonants"
    
    # Define heavy strokes
    heavy_strokes = ['B', 'D', 'J', 'V', 'THE', 'Z', 'ZHEE', 'G', 'NG']
    
    print("🎨 Making heavy strokes darker and thicker...\n")
    
    for stroke_id in heavy_strokes:
        input_path = stroke_dir / f"{stroke_id}.png"
        
        if not input_path.exists():
            print(f"  ⚠️  Not found: {stroke_id}.png")
            continue
        
        # Create backup
        backup_path = stroke_dir / f"{stroke_id}_original.png"
        if not backup_path.exists():
            import shutil
            shutil.copy(input_path, backup_path)
            print(f"  💾 Backed up: {stroke_id}_original.png")
        
        # Process to make heavier
        make_stroke_heavier(input_path, input_path)
    
    print(f"\n✅ Processed {len(heavy_strokes)} heavy strokes!")
    print("📁 Location: assets/stroke-images/consonants/")
    print("\n💡 Original versions backed up as *_original.png")
    print("   Reload the app to see the darker heavy strokes!")

if __name__ == "__main__":
    try:
        process_heavy_strokes()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
