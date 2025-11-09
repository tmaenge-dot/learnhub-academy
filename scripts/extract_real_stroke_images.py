#!/usr/bin/env python3
"""
Extract actual stroke images directly from the Pitman reference PDF.
This will give us the REAL stroke symbols, not approximations.
"""

from pdf2image import convert_from_path
from PIL import Image
import os
from pathlib import Path

def extract_stroke_images_from_pdf():
    """Extract the actual stroke images from specific pages of the PDF"""
    
    pdf_path = Path(__file__).parent.parent / "assets/reference-materials/pitman/Shorthand-Book.pdf"
    output_dir = Path(__file__).parent.parent / "assets/stroke-images/consonants"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print("📖 Extracting ACTUAL stroke images from PDF...")
    print(f"📄 Source: {pdf_path}")
    print(f"💾 Output: {output_dir}\n")
    
    # Convert the Introduction page (page with all strokes shown)
    # We'll extract page 8-10 which typically show the consonant alphabet
    print("🔄 Converting PDF pages to images...")
    pages = convert_from_path(str(pdf_path), first_page=8, last_page=10, dpi=300)
    
    print(f"✅ Converted {len(pages)} pages\n")
    
    # Save each page as a high-quality image
    for i, page in enumerate(pages, start=8):
        page_path = output_dir / f"reference_page_{i}.png"
        page.save(page_path, 'PNG')
        print(f"💾 Saved: {page_path}")
        print(f"   Size: {page.size[0]}x{page.size[1]} pixels")
    
    print("\n" + "="*60)
    print("✅ EXTRACTION COMPLETE!")
    print("="*60)
    print(f"\n📁 Images saved to: {output_dir}")
    print("\n📝 NEXT STEPS:")
    print("   1. Open the extracted PNG files")
    print("   2. Manually crop each stroke symbol")
    print("   3. Save as: P.png, B.png, T.png, D.png, etc.")
    print("   4. Place in: assets/stroke-images/consonants/")
    print("\n💡 OR: Tell me the coordinates to crop each stroke")
    print("   and I'll automate the cropping!")
    
    return pages

def crop_strokes_manually():
    """
    After reviewing the pages, we can define crop coordinates
    for each stroke and extract them automatically.
    """
    # This will be filled in after seeing the actual page layout
    # Format: stroke_id -> (page_num, x, y, width, height)
    
    stroke_positions = {
        # Example (to be filled after viewing the extracted pages):
        # "P": (8, 100, 200, 50, 100),
        # "B": (8, 200, 200, 50, 100),
        # etc.
    }
    
    # We'll implement this after seeing the page layout
    pass

if __name__ == "__main__":
    try:
        pages = extract_stroke_images_from_pdf()
        
        print("\n" + "="*60)
        print("🎯 IMPORTANT: Review the extracted images!")
        print("="*60)
        print("\nOpen these files to see the stroke positions:")
        print("  - assets/stroke-images/consonants/reference_page_8.png")
        print("  - assets/stroke-images/consonants/reference_page_9.png")
        print("  - assets/stroke-images/consonants/reference_page_10.png")
        print("\nThen we can crop each individual stroke symbol.")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
