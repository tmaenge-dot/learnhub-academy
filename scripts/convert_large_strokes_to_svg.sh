#!/bin/bash
# Convert large PNG files to SVG for better quality and smaller size

echo "🎨 Converting large PNG strokes to SVG..."
echo "=========================================="
echo ""

# Create output directory
mkdir -p assets/stroke-svgs/extracted-professional

# Large files to convert (>100KB)
LARGE_FILES=("P" "V" "K" "F")

for stroke in "${LARGE_FILES[@]}"; do
    input_file="assets/stroke-images/extracted-professional/${stroke}_professional.png"
    output_file="assets/stroke-svgs/extracted-professional/${stroke}_professional.svg"
    
    if [ -f "$input_file" ]; then
        original_size=$(du -h "$input_file" | cut -f1)
        echo "📄 Converting: $stroke"
        echo "   Original: $original_size (PNG)"
        
        # Use potrace to convert PNG to SVG
        # First convert to PBM format (required by potrace)
        convert "$input_file" -threshold 50% /tmp/${stroke}_temp.pbm
        
        # Convert PBM to SVG using potrace
        potrace /tmp/${stroke}_temp.pbm -s -o "$output_file" 2>/dev/null
        
        if [ -f "$output_file" ]; then
            svg_size=$(du -h "$output_file" | cut -f1)
            echo "   ✅ SVG: $svg_size (converted)"
            
            # Clean up temp file
            rm -f /tmp/${stroke}_temp.pbm
        else
            echo "   ❌ Conversion failed"
        fi
        echo ""
    fi
done

echo "=========================================="
echo "✨ Conversion complete!"
echo ""
echo "📊 File size comparison:"
ls -lh assets/stroke-images/extracted-professional/{P,V,K,F}_professional.png 2>/dev/null | awk '{print "   PNG: " $9 " - " $5}'
ls -lh assets/stroke-svgs/extracted-professional/{P,V,K,F}_professional.svg 2>/dev/null | awk '{print "   SVG: " $9 " - " $5}'
