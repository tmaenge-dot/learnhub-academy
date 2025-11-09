#!/bin/bash

# Quick Start Script for Stroke Recognition System
# This script automates the setup process

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  PITMAN SHORTHAND - STROKE RECOGNITION SETUP               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Python is installed
echo -e "${BLUE}Checking Python installation...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ Python found: $PYTHON_VERSION${NC}"
else
    echo -e "${RED}✗ Python 3 not found. Please install Python 3.8 or higher.${NC}"
    exit 1
fi

# Check if pip is installed
echo -e "${BLUE}Checking pip installation...${NC}"
if command -v pip3 &> /dev/null; then
    echo -e "${GREEN}✓ pip found${NC}"
else
    echo -e "${RED}✗ pip not found. Installing...${NC}"
    python3 -m ensurepip --default-pip
fi

# Install Python packages
echo ""
echo -e "${BLUE}Installing Python packages...${NC}"
pip3 install opencv-python pdf2image pillow pytesseract numpy --quiet

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Python packages installed${NC}"
else
    echo -e "${YELLOW}⚠ Some packages may have failed. Continuing...${NC}"
fi

# Check for poppler
echo ""
echo -e "${BLUE}Checking poppler installation (for PDF processing)...${NC}"
if command -v pdftotext &> /dev/null; then
    echo -e "${GREEN}✓ Poppler found${NC}"
else
    echo -e "${YELLOW}⚠ Poppler not found${NC}"
    echo -e "${YELLOW}  Please install it manually:${NC}"
    echo -e "${YELLOW}  Ubuntu/Debian: sudo apt-get install poppler-utils${NC}"
    echo -e "${YELLOW}  macOS: brew install poppler${NC}"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create directory structure
echo ""
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p assets/reference-materials/training-data/unlabeled
mkdir -p assets/reference-materials/training-data/labeled
mkdir -p models
echo -e "${GREEN}✓ Directories created${NC}"

# Check if reference PDF exists
echo ""
echo -e "${BLUE}Checking for reference PDF...${NC}"
PDF_PATH="assets/reference-materials/pitman/Shorthand-Book.pdf"

if [ -f "$PDF_PATH" ]; then
    PDF_SIZE=$(du -h "$PDF_PATH" | cut -f1)
    echo -e "${GREEN}✓ Reference book found (${PDF_SIZE})${NC}"
    
    echo ""
    echo -e "${YELLOW}Ready to extract stroke images!${NC}"
    echo ""
    read -p "Extract strokes now? (y/n) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo -e "${BLUE}Extracting stroke images from PDF...${NC}"
        echo -e "${YELLOW}This may take 2-5 minutes...${NC}"
        echo ""
        python3 scripts/extract_stroke_images.py
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✓ Extraction complete!${NC}"
            echo ""
            echo -e "${BLUE}Next steps:${NC}"
            echo "1. Review extracted images in: assets/reference-materials/training-data/unlabeled/"
            echo "2. Label strokes: python3 scripts/label_strokes.py"
            echo "3. Train model: python3 scripts/train_cnn_model.py"
        else
            echo ""
            echo -e "${RED}✗ Extraction failed. Check errors above.${NC}"
        fi
    fi
else
    echo -e "${RED}✗ Reference PDF not found at: $PDF_PATH${NC}"
    echo ""
    echo "Please ensure the PDF is in the correct location:"
    echo "  $PDF_PATH"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  SETUP COMPLETE                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "For more information, see:"
echo "  • README_RECOGNITION.md - Quick start guide"
echo "  • STROKE_RECOGNITION_IMPLEMENTATION_GUIDE.md - Detailed guide"
echo "  • RECOGNITION_ARCHITECTURE.md - System architecture"
echo ""
