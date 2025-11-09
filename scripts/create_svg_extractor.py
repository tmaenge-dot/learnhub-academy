#!/usr/bin/env python3
"""
Extract individual professional strokes from SVG-traced pages.
Creates a web-based SVG viewer/cropper for selecting strokes.
"""

import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SVG_DIR = PROJECT_ROOT / "assets" / "stroke-svgs" / "professional-traced"
OUTPUT_DIR = PROJECT_ROOT / "assets" / "stroke-svgs" / "professional-strokes"
HTML_OUTPUT = PROJECT_ROOT / "professional-stroke-extractor.html"

# Strokes on each page
STROKE_PAGES = {
    '009': ['P', 'B'],
    '010': ['T', 'D'],
    '011': ['CH', 'J'],
    '016': ['F', 'V'],
    '017': ['ITH', 'THE'],
    '018': ['S', 'Z'],
    '019': ['ISH', 'ZHEE'],
    '020': ['K', 'G', 'M'],
    '021': ['N', 'NG', 'L', 'W', 'Y', 'H'],
}

def create_svg_extractor_html():
    """Create an HTML tool for extracting individual strokes from SVG files"""
    
    # Get list of SVG files
    svg_files = sorted(SVG_DIR.glob("*.svg"))
    
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📖 Professional Stroke Extractor (SVG)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .controls {
            display: flex;
            gap: 20px;
            padding: 20px 30px;
            background: #f8f9fa;
            border-bottom: 2px solid #e9ecef;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .control-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .control-group label {
            font-size: 0.9em;
            font-weight: 600;
            color: #495057;
        }
        
        select, button {
            padding: 10px 20px;
            border-radius: 8px;
            border: 2px solid #dee2e6;
            font-size: 1em;
            cursor: pointer;
        }
        
        select {
            background: white;
        }
        
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            font-weight: 600;
            transition: transform 0.2s;
        }
        
        button:hover {
            transform: translateY(-2px);
        }
        
        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .info-panel {
            padding: 15px 30px;
            background: #e3f2fd;
            border-bottom: 2px solid #90caf9;
        }
        
        .info-panel h3 {
            color: #1976d2;
            margin-bottom: 10px;
        }
        
        .stroke-list {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .stroke-badge {
            padding: 5px 15px;
            background: white;
            border: 2px solid #90caf9;
            border-radius: 20px;
            font-weight: 600;
            color: #1976d2;
        }
        
        .stroke-badge.done {
            background: #4caf50;
            border-color: #4caf50;
            color: white;
        }
        
        .svg-container {
            padding: 30px;
            display: flex;
            gap: 20px;
            min-height: 600px;
            background: #fafafa;
        }
        
        .svg-main {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .preview-panel {
            flex: 1;
            background: white;
            border: 3px solid #dee2e6;
            border-radius: 10px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .preview-panel h3 {
            color: #495057;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
        }
        
        .preview-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            min-height: 300px;
            padding: 20px;
        }
        
        .preview-empty {
            text-align: center;
            color: #adb5bd;
            font-style: italic;
        }
        
        #previewSVG {
            max-width: 100%;
            max-height: 400px;
            border: 2px solid #28a745;
            border-radius: 5px;
            background: white;
        }
        
        #svgDisplay {
            max-width: 100%;
            max-height: 700px;
            border: 3px solid #dee2e6;
            border-radius: 10px;
            background: white;
            cursor: crosshair;
        }
        
        .selection-box {
            position: absolute;
            border: 3px dashed #4caf50;
            background: rgba(76, 175, 80, 0.1);
            pointer-events: none;
        }
        
        .instructions {
            padding: 20px 30px;
            background: #fff3cd;
            border-top: 2px solid #ffc107;
        }
        
        .instructions h4 {
            color: #856404;
            margin-bottom: 10px;
        }
        
        .instructions ul {
            list-style-position: inside;
            color: #856404;
        }
        
        .instructions li {
            margin: 5px 0;
        }
        
        .progress-bar {
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 30px 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4caf50, #8bc34a);
            transition: width 0.3s;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📖 Professional Stroke Extractor</h1>
            <p>Extract individual strokes from SVG-traced reference pages</p>
        </div>
        
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
        </div>
        
        <div class="controls">
            <div class="control-group">
                <label for="pageSelect">Select Page:</label>
                <select id="pageSelect">
"""
    
    # Add page options
    for svg_file in svg_files:
        page_num = svg_file.stem.split('-')[-1]
        strokes = STROKE_PAGES.get(page_num, [])
        stroke_text = ', '.join(strokes)
        html_content += f'                    <option value="{svg_file.name}">Page {page_num} ({stroke_text})</option>\n'
    
    html_content += """                </select>
            </div>
            
            <div class="control-group">
                <label for="strokeSelect">Current Stroke:</label>
                <select id="strokeSelect"></select>
            </div>
            
            <button id="saveBtn" disabled>💾 Save This Stroke</button>
            <button id="skipBtn">⏭️ Skip Stroke</button>
            <button id="clearBtn">🗑️ Clear Selection</button>
            <button id="downloadBtn" style="margin-left: auto;">📦 Download All Strokes</button>
        </div>
        
        <div class="info-panel">
            <h3>Current Page Strokes:</h3>
            <div class="stroke-list" id="strokeList"></div>
        </div>
        
        <div class="svg-container">
            <div class="svg-main">
                <div style="position: relative;">
                    <div id="svgDisplay"></div>
                </div>
            </div>
            
            <div class="preview-panel">
                <h3>🎨 Stroke Preview</h3>
                <div class="preview-content" id="previewContent">
                    <div class="preview-empty">
                        Select a region to see preview
                    </div>
                </div>
                <div style="font-size: 0.9em; color: #6c757d;">
                    <strong>Current:</strong> <span id="currentStrokeName">-</span>
                </div>
            </div>
        </div>
        
        <div class="instructions">
            <h4>📋 Instructions:</h4>
            <ul>
                <li>Click and drag on the SVG to select a stroke region</li>
                <li>The current stroke to extract is highlighted in the dropdown</li>
                <li>Click "Save This Stroke" to extract the selected region as an individual SVG file</li>
                <li>Click "Skip Stroke" to move to the next stroke without saving</li>
                <li>When all strokes are extracted, click "Download All Strokes" to get a ZIP file</li>
            </ul>
        </div>
    </div>
    
    <script>
        const svgDir = 'assets/stroke-svgs/professional-traced/';
        const strokePages = """ + str(STROKE_PAGES).replace("'", '"') + """;
        
        let currentPage = null;
        let currentStrokes = [];
        let currentStrokeIndex = 0;
        let extractedStrokes = {};
        let selectionStart = null;
        let selectionBox = null;
        
        // Load SVG file
        async function loadSVG(filename) {
            const response = await fetch(svgDir + filename);
            const svgText = await response.text();
            document.getElementById('svgDisplay').innerHTML = svgText;
            
            const svg = document.querySelector('#svgDisplay svg');
            if (svg) {
                svg.style.maxWidth = '100%';
                svg.style.height = 'auto';
                setupSVGSelection(svg);
            }
            
            // Update stroke list
            const pageNum = filename.split('-').pop().replace('.svg', '');
            currentStrokes = strokePages[pageNum] || [];
            currentStrokeIndex = 0;
            updateStrokeList();
            updateStrokeSelect();
        }
        
        // Setup SVG selection
        function setupSVGSelection(svg) {
            svg.addEventListener('mousedown', startSelection);
            svg.addEventListener('mousemove', updateSelection);
            svg.addEventListener('mouseup', endSelection);
        }
        
        function startSelection(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            selectionStart = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            
            if (selectionBox) {
                selectionBox.remove();
            }
            
            selectionBox = document.createElement('div');
            selectionBox.className = 'selection-box';
            selectionBox.style.left = selectionStart.x + 'px';
            selectionBox.style.top = selectionStart.y + 'px';
            e.currentTarget.parentElement.appendChild(selectionBox);
        }
        
        function updateSelection(e) {
            if (!selectionStart || !selectionBox) return;
            
            const rect = e.currentTarget.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            
            const width = currentX - selectionStart.x;
            const height = currentY - selectionStart.y;
            
            if (width < 0) {
                selectionBox.style.left = currentX + 'px';
                selectionBox.style.width = Math.abs(width) + 'px';
            } else {
                selectionBox.style.width = width + 'px';
            }
            
            if (height < 0) {
                selectionBox.style.top = currentY + 'px';
                selectionBox.style.height = Math.abs(height) + 'px';
            } else {
                selectionBox.style.height = height + 'px';
            }
        }
        
        function endSelection(e) {
            if (selectionBox) {
                document.getElementById('saveBtn').disabled = false;
                updatePreview();
            }
            selectionStart = null;
        }
        
        // Update preview with cropped stroke
        function updatePreview() {
            if (!selectionBox) return;
            
            const strokeName = currentStrokes[currentStrokeIndex];
            const svg = document.querySelector('#svgDisplay svg');
            
            if (!svg) return;
            
            // Get selection bounds
            const rect = selectionBox.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            
            // Calculate viewBox for cropped region
            const svgWidth = parseFloat(svg.getAttribute('width') || svg.viewBox.baseVal.width);
            const svgHeight = parseFloat(svg.getAttribute('height') || svg.viewBox.baseVal.height);
            
            const scaleX = svgWidth / svgRect.width;
            const scaleY = svgHeight / svgRect.height;
            
            const x = (rect.left - svgRect.left) * scaleX;
            const y = (rect.top - svgRect.top) * scaleY;
            const width = rect.width * scaleX;
            const height = rect.height * scaleY;
            
            // Clone SVG and set viewBox
            const clonedSVG = svg.cloneNode(true);
            clonedSVG.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
            clonedSVG.setAttribute('width', '300');
            clonedSVG.setAttribute('height', '300');
            clonedSVG.id = 'previewSVG';
            
            // Update preview
            const previewContent = document.getElementById('previewContent');
            previewContent.innerHTML = '';
            previewContent.appendChild(clonedSVG);
            
            // Update stroke name
            document.getElementById('currentStrokeName').textContent = strokeName;
        }
        
        // Clear preview
        function clearPreview() {
            const previewContent = document.getElementById('previewContent');
            previewContent.innerHTML = '<div class="preview-empty">Select a region to see preview</div>';
            document.getElementById('currentStrokeName').textContent = '-';
        }
        
        // Update stroke list display
        function updateStrokeList() {
            const list = document.getElementById('strokeList');
            list.innerHTML = '';
            
            currentStrokes.forEach((stroke, index) => {
                const badge = document.createElement('div');
                badge.className = 'stroke-badge';
                if (extractedStrokes[stroke]) {
                    badge.classList.add('done');
                }
                if (index === currentStrokeIndex) {
                    badge.style.borderWidth = '3px';
                    badge.style.fontWeight = '700';
                }
                badge.textContent = stroke;
                list.appendChild(badge);
            });
            
            updateProgress();
        }
        
        // Update stroke select dropdown
        function updateStrokeSelect() {
            const select = document.getElementById('strokeSelect');
            select.innerHTML = '';
            
            currentStrokes.forEach((stroke, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = stroke + (extractedStrokes[stroke] ? ' ✓' : '');
                if (index === currentStrokeIndex) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        }
        
        // Update progress bar
        function updateProgress() {
            const total = Object.keys(strokePages).reduce((sum, page) => sum + strokePages[page].length, 0);
            const extracted = Object.keys(extractedStrokes).length;
            const percentage = (extracted / total) * 100;
            document.getElementById('progressFill').style.width = percentage + '%';
        }
        
        // Save stroke
        document.getElementById('saveBtn').addEventListener('click', () => {
            if (!selectionBox) return;
            
            const strokeName = currentStrokes[currentStrokeIndex];
            const svg = document.querySelector('#svgDisplay svg');
            
            // Get selection bounds
            const rect = selectionBox.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            
            // Calculate viewBox for cropped region
            const svgWidth = parseFloat(svg.getAttribute('width') || svg.viewBox.baseVal.width);
            const svgHeight = parseFloat(svg.getAttribute('height') || svg.viewBox.baseVal.height);
            
            const scaleX = svgWidth / svgRect.width;
            const scaleY = svgHeight / svgRect.height;
            
            const x = (rect.left - svgRect.left) * scaleX;
            const y = (rect.top - svgRect.top) * scaleY;
            const width = rect.width * scaleX;
            const height = rect.height * scaleY;
            
            // Clone SVG and set viewBox
            const clonedSVG = svg.cloneNode(true);
            clonedSVG.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
            clonedSVG.setAttribute('width', width);
            clonedSVG.setAttribute('height', height);
            
            // Store extracted stroke
            extractedStrokes[strokeName] = new XMLSerializer().serializeToString(clonedSVG);
            
            // Move to next stroke
            clearSelection();
            currentStrokeIndex++;
            
            if (currentStrokeIndex >= currentStrokes.length) {
                // Move to next page
                const pageSelect = document.getElementById('pageSelect');
                if (pageSelect.selectedIndex < pageSelect.options.length - 1) {
                    pageSelect.selectedIndex++;
                    pageSelect.dispatchEvent(new Event('change'));
                } else {
                    alert('🎉 All strokes extracted! Click "Download All Strokes" to save.');
                }
            } else {
                updateStrokeList();
                updateStrokeSelect();
            }
        });
        
        // Skip stroke
        document.getElementById('skipBtn').addEventListener('click', () => {
            clearSelection();
            currentStrokeIndex++;
            
            if (currentStrokeIndex >= currentStrokes.length) {
                const pageSelect = document.getElementById('pageSelect');
                if (pageSelect.selectedIndex < pageSelect.options.length - 1) {
                    pageSelect.selectedIndex++;
                    pageSelect.dispatchEvent(new Event('change'));
                }
            } else {
                updateStrokeList();
                updateStrokeSelect();
            }
        });
        
        // Clear selection
        document.getElementById('clearBtn').addEventListener('click', clearSelection);
        
        function clearSelection() {
            if (selectionBox) {
                selectionBox.remove();
                selectionBox = null;
            }
            document.getElementById('saveBtn').disabled = true;
            clearPreview();
        }
        
        // Download all strokes
        document.getElementById('downloadBtn').addEventListener('click', () => {
            if (Object.keys(extractedStrokes).length === 0) {
                alert('No strokes extracted yet!');
                return;
            }
            
            // Create a summary JSON file
            const summary = {
                extracted_count: Object.keys(extractedStrokes).length,
                strokes: Object.keys(extractedStrokes),
                timestamp: new Date().toISOString()
            };
            
            console.log('📦 Extracted Strokes:', summary);
            
            // Download each stroke individually
            Object.entries(extractedStrokes).forEach(([name, svgContent]) => {
                const blob = new Blob([svgContent], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${name}_professional.svg`;
                a.click();
                URL.revokeObjectURL(url);
            });
            
            alert(`✅ Downloaded ${Object.keys(extractedStrokes).length} professional strokes!\\n\\nSave them to: assets/stroke-svgs/professional-strokes/`);
        });
        
        // Page change handler
        document.getElementById('pageSelect').addEventListener('change', (e) => {
            loadSVG(e.target.value);
            clearSelection();
        });
        
        // Stroke select change
        document.getElementById('strokeSelect').addEventListener('change', (e) => {
            currentStrokeIndex = parseInt(e.target.value);
            updateStrokeList();
        });
        
        // Load first page
        window.addEventListener('load', () => {
            const pageSelect = document.getElementById('pageSelect');
            if (pageSelect.options.length > 0) {
                loadSVG(pageSelect.options[0].value);
            }
        });
    </script>
</body>
</html>
"""
    
    return html_content

def main():
    print("🎨 CREATING SVG STROKE EXTRACTOR TOOL")
    print("=" * 60)
    
    # Check for SVG files
    svg_files = list(SVG_DIR.glob("*.svg"))
    
    if not svg_files:
        print(f"❌ No SVG files found in {SVG_DIR}")
        print("   Run trace_stroke_pages_to_svg.sh first!")
        return
    
    print(f"\n✅ Found {len(svg_files)} SVG pages:")
    for svg_file in sorted(svg_files):
        size = svg_file.stat().st_size // 1024
        print(f"   • {svg_file.name} ({size}K)")
    
    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True, parents=True)
    
    # Generate HTML tool
    html_content = create_svg_extractor_html()
    
    with open(HTML_OUTPUT, 'w') as f:
        f.write(html_content)
    
    print(f"\n✅ Created: {HTML_OUTPUT}")
    print("\n" + "=" * 60)
    print("🚀 READY TO EXTRACT!")
    print("=" * 60)
    print(f"\n📖 Open in browser:")
    print(f"   file://{HTML_OUTPUT.absolute()}")
    print(f"\n🎯 OR run:")
    print(f"   xdg-open {HTML_OUTPUT.name}")
    print(f"\n💡 Instructions:")
    print("   1. Click and drag to select a stroke on the SVG")
    print("   2. Click 'Save This Stroke' to extract it")
    print("   3. Repeat for all 26 consonants")
    print("   4. Click 'Download All Strokes' to save them")
    print(f"\n📂 Save extracted strokes to:")
    print(f"   {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
