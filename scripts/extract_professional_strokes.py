#!/usr/bin/env python3
"""
Extract professional stroke images directly from the Pitman Shorthand PDF
This will give us the actual book-quality strokes, not hand-drawn versions
"""

import fitz  # PyMuPDF
from pathlib import Path
from PIL import Image
import io

PDF_PATH = Path("/home/oem/Desktop/shorthand-simplified/assets/reference-materials/pitman/Shorthand-Book.pdf")
OUTPUT_DIR = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-images/professional")

print("📖 EXTRACTING PROFESSIONAL STROKES FROM REFERENCE PDF")
print("="*70)

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Open the PDF
doc = fitz.open(PDF_PATH)
print(f"✅ Opened: {PDF_PATH.name}")
print(f"📄 Total pages: {len(doc)}")

# Pages with stroke diagrams (from your reference)
stroke_pages = {
    8: "Consonant Strokes Overview",
    9: "Individual Consonant Strokes",
    10: "Stroke Variations and Thickness",
    17: "Vowel Strokes",
    # Add more as needed
}

print(f"\n📊 Extracting from {len(stroke_pages)} key pages...")

for page_num, description in stroke_pages.items():
    print(f"\n[Page {page_num}] {description}")
    
    try:
        page = doc[page_num - 1]  # 0-indexed
        
        # Get page as high-resolution image
        mat = fitz.Matrix(3.0, 3.0)  # 3x zoom for high quality
        pix = page.get_pixmap(matrix=mat)
        
        # Save full page
        img_path = OUTPUT_DIR / f"page_{page_num:03d}.png"
        pix.save(str(img_path))
        print(f"  ✅ Saved full page: {img_path.name} ({pix.width}x{pix.height})")
        
        # Extract individual images from page
        image_list = page.get_images()
        if image_list:
            print(f"  📸 Found {len(image_list)} embedded images")
            
            for img_idx, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Save extracted image
                img_name = f"page_{page_num:03d}_img_{img_idx:02d}.{image_ext}"
                img_path = OUTPUT_DIR / img_name
                
                with open(img_path, "wb") as f:
                    f.write(image_bytes)
                
                print(f"    → Extracted: {img_name}")
        
    except Exception as e:
        print(f"  ❌ Error on page {page_num}: {e}")

doc.close()

print("\n" + "="*70)
print("✨ EXTRACTION COMPLETE!")
print(f"📂 Professional images saved to: {OUTPUT_DIR}")
print("\n🎯 NEXT STEPS:")
print("1. Review extracted images")
print("2. Crop individual strokes from the page images")
print("3. Create a mapping of professional strokes")
print("4. Replace hand-drawn strokes with professional ones")
