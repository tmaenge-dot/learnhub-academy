#!/bin/bash
# Extract ALL pages from the beginning of the reference book

PDF_FILE="/home/oem/Desktop/shorthand-simplified/assets/reference-materials/pitman/Shorthand-Book.pdf"
OUTPUT_DIR="/home/oem/Desktop/shorthand-simplified/assets/stroke-images/professional"

echo "📖 EXTRACTING ALL PAGES FROM PITMAN REFERENCE BOOK"
echo "======================================================================"

mkdir -p "$OUTPUT_DIR"

# Get total pages
TOTAL_PAGES=$(pdfinfo "$PDF_FILE" 2>/dev/null | grep "Pages:" | awk '{print $2}')
echo "📄 Total pages in book: $TOTAL_PAGES"
echo ""
echo "🎯 Extracting pages 1-50 at 300 DPI (high quality)..."
echo "This will take about 2-3 minutes..."
echo ""

# Extract first 50 pages (covers all essential stroke content)
pdftoppm -png -f 1 -l 50 -r 300 "$PDF_FILE" "$OUTPUT_DIR/book_page"

echo ""
echo "✨ EXTRACTION COMPLETE!"
echo ""
ls -lh "$OUTPUT_DIR"/book_page-*.png | head -20
echo ""
echo "Total files created: $(ls -1 "$OUTPUT_DIR"/book_page-*.png 2>/dev/null | wc -l)"
