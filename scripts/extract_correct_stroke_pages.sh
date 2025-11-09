#!/bin/bash

# Extract the actual stroke pages from the Pitman reference book
# Based on OFFICIAL_STROKE_REFERENCE.md structure:
# Unit 1: Pages 9-11 (Straight downstrokes)
# Unit 2: Pages 16-19 (Curved strokes)
# Unit 3: Pages 20-21 (Horizontal & Upward strokes)

PDF_FILE="/home/oem/Desktop/shorthand-simplified/assets/reference-materials/pitman/Shorthand-Book.pdf"
OUTPUT_DIR="/home/oem/Desktop/shorthand-simplified/assets/stroke-images/professional"

echo "📖 EXTRACTING ACTUAL STROKE PAGES FROM REFERENCE BOOK"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Based on Official Stroke Reference:"
echo "  • Unit 1 (Pages 9-11):  Straight downstrokes P, B, T, D, CH, J"
echo "  • Unit 2 (Pages 16-19): Curved strokes F, V, TH, S, Z, SH, ZH"
echo "  • Unit 3 (Pages 20-21): Horizontal (K, G, M, N, NG) & Upward (L, W, Y, H)"
echo ""

mkdir -p "$OUTPUT_DIR"

echo "🎯 Extracting Unit 1: Straight Downstrokes (Pages 9-11)..."
pdftoppm -png -f 9 -l 11 -r 300 "$PDF_FILE" "$OUTPUT_DIR/unit1_straight_page"

echo "🎯 Extracting Unit 2: Curved Strokes (Pages 16-19)..."
pdftoppm -png -f 16 -l 19 -r 300 "$PDF_FILE" "$OUTPUT_DIR/unit2_curved_page"

echo "🎯 Extracting Unit 3: Horizontal & Upward (Pages 20-21)..."
pdftoppm -png -f 20 -l 21 -r 300 "$PDF_FILE" "$OUTPUT_DIR/unit3_horizontal_page"

echo ""
echo "✅ EXTRACTION COMPLETE!"
echo ""
echo "📂 Extracted pages saved to: $OUTPUT_DIR/"
echo ""
ls -lh "$OUTPUT_DIR"/unit*.png
echo ""
echo "🎨 Next step: Open these pages and crop individual strokes!"
