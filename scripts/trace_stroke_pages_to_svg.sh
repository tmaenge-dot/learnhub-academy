#!/bin/bash

# Trace professional stroke pages to SVG using potrace
# This creates perfect vector versions of the reference book pages

echo "🎨 TRACING PROFESSIONAL STROKE PAGES TO SVG"
echo "=============================================="
echo ""

# Directories
INPUT_DIR="../assets/stroke-images/professional"
OUTPUT_DIR="../assets/stroke-svgs/professional-traced"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "📂 Input:  $INPUT_DIR"
echo "📂 Output: $OUTPUT_DIR"
echo ""

# Counter
total=0
traced=0

# Trace Unit 1: Straight Downstrokes (Pages 9-11)
echo "📖 Unit 1: Straight Downstrokes (Pages 9-11)"
echo "---------------------------------------------"
for page in 009 010 011; do
    input_file="$INPUT_DIR/unit1_straight_page-$page.png"
    output_file="$OUTPUT_DIR/unit1_straight_page-$page.svg"
    
    if [ -f "$input_file" ]; then
        echo "  ⚙️  Tracing page $page..."
        
        # Convert to PBM (bitmap) first for potrace
        temp_pbm="/tmp/page-$page.pbm"
        convert "$input_file" -threshold 50% "$temp_pbm"
        
        # Trace to SVG
        potrace -s -o "$output_file" "$temp_pbm" 2>/dev/null
        
        # Clean up temp file
        rm -f "$temp_pbm"
        
        if [ -f "$output_file" ]; then
            size=$(du -h "$output_file" | cut -f1)
            echo "  ✅ Created: unit1_straight_page-$page.svg ($size)"
            ((traced++))
        else
            echo "  ❌ Failed to trace page $page"
        fi
        ((total++))
    else
        echo "  ⚠️  Not found: $input_file"
    fi
done
echo ""

# Trace Unit 2: Curved Strokes (Pages 16-19)
echo "📖 Unit 2: Curved Strokes (Pages 16-19)"
echo "----------------------------------------"
for page in 016 017 018 019; do
    input_file="$INPUT_DIR/unit2_curved_page-$page.png"
    output_file="$OUTPUT_DIR/unit2_curved_page-$page.svg"
    
    if [ -f "$input_file" ]; then
        echo "  ⚙️  Tracing page $page..."
        
        temp_pbm="/tmp/page-$page.pbm"
        convert "$input_file" -threshold 50% "$temp_pbm"
        potrace -s -o "$output_file" "$temp_pbm" 2>/dev/null
        rm -f "$temp_pbm"
        
        if [ -f "$output_file" ]; then
            size=$(du -h "$output_file" | cut -f1)
            echo "  ✅ Created: unit2_curved_page-$page.svg ($size)"
            ((traced++))
        else
            echo "  ❌ Failed to trace page $page"
        fi
        ((total++))
    else
        echo "  ⚠️  Not found: $input_file"
    fi
done
echo ""

# Trace Unit 3: Horizontal & Upward (Pages 20-21)
echo "📖 Unit 3: Horizontal & Upward (Pages 20-21)"
echo "---------------------------------------------"
for page in 020 021; do
    input_file="$INPUT_DIR/unit3_horizontal_page-$page.png"
    output_file="$OUTPUT_DIR/unit3_horizontal_page-$page.svg"
    
    if [ -f "$input_file" ]; then
        echo "  ⚙️  Tracing page $page..."
        
        temp_pbm="/tmp/page-$page.pbm"
        convert "$input_file" -threshold 50% "$temp_pbm"
        potrace -s -o "$output_file" "$temp_pbm" 2>/dev/null
        rm -f "$temp_pbm"
        
        if [ -f "$output_file" ]; then
            size=$(du -h "$output_file" | cut -f1)
            echo "  ✅ Created: unit3_horizontal_page-$page.svg ($size)"
            ((traced++))
        else
            echo "  ❌ Failed to trace page $page"
        fi
        ((total++))
    else
        echo "  ⚠️  Not found: $input_file"
    fi
done
echo ""

# Summary
echo "=============================================="
echo "✨ TRACING COMPLETE!"
echo "=============================================="
echo ""
echo "📊 Summary:"
echo "  • Pages processed: $total"
echo "  • Successfully traced: $traced"
echo ""
echo "📂 Location: $OUTPUT_DIR"
echo ""
ls -lh "$OUTPUT_DIR"/*.svg 2>/dev/null | awk '{print "  •", $9, "(" $5 ")"}'
echo ""
echo "🎯 Next Step: Extract individual strokes from these SVG files"
echo "   (Much easier to crop from vectors!)"
