#!/bin/bash
# Extract professional stroke images from PDF using pdftoppm

PDF_FILE="/home/oem/Desktop/shorthand-simplified/assets/reference-materials/pitman/Shorthand-Book.pdf"
OUTPUT_DIR="/home/oem/Desktop/shorthand-simplified/assets/stroke-images/professional"

echo "📖 EXTRACTING PROFESSIONAL STROKES FROM REFERENCE PDF"
echo "======================================================================"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Extract key pages at 300 DPI
echo "📄 Extracting pages 8-10, 17, 20, 25 at high resolution..."

pdftoppm -png -f 8 -l 10 -r 300 "$PDF_FILE" "$OUTPUT_DIR/stroke_page"
pdftoppm -png -f 17 -l 17 -r 300 "$PDF_FILE" "$OUTPUT_DIR/vowel_page"
pdftoppm -png -f 20 -l 25 -r 300 "$PDF_FILE" "$OUTPUT_DIR/outline_page"

echo ""
echo "✨ EXTRACTION COMPLETE!"
ls -lh "$OUTPUT_DIR"/*.png
