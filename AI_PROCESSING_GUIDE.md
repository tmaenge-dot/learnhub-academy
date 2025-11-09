# AI Processing Guide for Reference Materials

## Overview
This guide explains how to extract and process content from your uploaded Pitman shorthand reference materials for AI integration.

---

## Tools Needed

### For PDF Processing:
```bash
# Install PDF processing tools
pip install PyPDF2 pdf2image pytesseract pillow

# For advanced text extraction
pip install pdfplumber

# For image extraction
pip install pdfminer.six
```

### For DOC Processing:
```bash
# Install document processing tools
pip install python-docx mammoth

# For conversion
pip install docx2txt
```

---

## Step 1: Extract Text from PDF

### Option A: Simple Text Extraction
```python
import PyPDF2

def extract_pdf_text(pdf_path):
    """Extract all text from PDF"""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

# Usage
textbook_text = extract_pdf_text('assets/reference-materials/pitman/Shorthand-Book.pdf')
print(f"Extracted {len(textbook_text)} characters")
```

### Option B: Advanced Extraction with Structure
```python
import pdfplumber

def extract_structured_pdf(pdf_path):
    """Extract text with structure preservation"""
    content = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            # Extract text
            text = page.extract_text()
            
            # Extract tables
            tables = page.extract_tables()
            
            # Extract images
            images = page.images
            
            content.append({
                'page': page_num,
                'text': text,
                'tables': tables,
                'images': len(images)
            })
    
    return content

# Usage
textbook_content = extract_structured_pdf('assets/reference-materials/pitman/Shorthand-Book.pdf')
```

---

## Step 2: Extract Images from PDF

```python
from pdf2image import convert_from_path
import os

def extract_pdf_images(pdf_path, output_folder):
    """Extract all pages as images"""
    # Convert PDF to images
    images = convert_from_path(pdf_path, dpi=300)
    
    # Save each page
    for i, image in enumerate(images, 1):
        output_path = os.path.join(output_folder, f'page_{i}.png')
        image.save(output_path, 'PNG')
        print(f"Saved page {i}")
    
    return len(images)

# Usage
output_dir = 'assets/reference-materials/pitman/extracted-images/'
os.makedirs(output_dir, exist_ok=True)
num_pages = extract_pdf_images(
    'assets/reference-materials/pitman/Shorthand-Book.pdf',
    output_dir
)
print(f"Extracted {num_pages} pages")
```

---

## Step 3: Extract Content from DOC

### Option A: Text Only
```python
import docx2txt

def extract_doc_text(doc_path):
    """Extract text from Word document"""
    text = docx2txt.process(doc_path)
    return text

# Usage
answers_text = extract_doc_text('assets/reference-materials/pitman/Shorthand-Key.doc')
print(f"Answer key contains {len(answers_text)} characters")
```

### Option B: Structured Content
```python
from docx import Document

def extract_doc_structured(doc_path):
    """Extract structured content from Word document"""
    doc = Document(doc_path)
    
    content = {
        'paragraphs': [],
        'tables': [],
        'images': []
    }
    
    # Extract paragraphs
    for para in doc.paragraphs:
        if para.text.strip():
            content['paragraphs'].append({
                'text': para.text,
                'style': para.style.name
            })
    
    # Extract tables
    for table in doc.tables:
        table_data = []
        for row in table.rows:
            row_data = [cell.text for cell in row.cells]
            table_data.append(row_data)
        content['tables'].append(table_data)
    
    return content

# Usage
answers_content = extract_doc_structured('assets/reference-materials/pitman/Shorthand-Key.doc')
```

---

## Step 4: Parse Exercises and Answers

```python
import re
import json

def parse_exercises(textbook_text):
    """Extract exercises from textbook"""
    exercises = []
    
    # Pattern to match exercise numbers (e.g., "Exercise 1", "1.", etc.)
    exercise_pattern = r'(?:Exercise|EXERCISE)\s+(\d+)'
    
    # Split text into sections
    sections = re.split(exercise_pattern, textbook_text)
    
    for i in range(1, len(sections), 2):
        if i+1 < len(sections):
            exercise_num = sections[i]
            exercise_text = sections[i+1].strip()
            
            exercises.append({
                'number': int(exercise_num),
                'content': exercise_text[:500],  # First 500 chars
                'type': 'practice'
            })
    
    return exercises

def parse_answers(answers_text):
    """Extract answers from answer key"""
    answers = []
    
    # Pattern to match answer numbers
    answer_pattern = r'(\d+)\.\s*([^\n]+)'
    
    matches = re.finditer(answer_pattern, answers_text)
    
    for match in matches:
        answer_num = match.group(1)
        answer_text = match.group(2)
        
        answers.append({
            'number': int(answer_num),
            'answer': answer_text.strip()
        })
    
    return answers

# Usage
exercises = parse_exercises(textbook_text)
answers = parse_answers(answers_text)

# Save to JSON
with open('data/extracted-exercises.json', 'w') as f:
    json.dump(exercises, f, indent=2)

with open('data/extracted-answers.json', 'w') as f:
    json.dump(answers, f, indent=2)
```

---

## Step 5: Create Training Dataset

```python
def create_training_dataset(exercises, answers):
    """Match exercises with answers"""
    dataset = []
    
    # Create a dictionary of answers by number
    answers_dict = {ans['number']: ans['answer'] for ans in answers}
    
    for exercise in exercises:
        ex_num = exercise['number']
        if ex_num in answers_dict:
            dataset.append({
                'id': ex_num,
                'question': exercise['content'],
                'answer': answers_dict[ex_num],
                'type': exercise['type'],
                'source': 'textbook'
            })
    
    return dataset

# Usage
training_data = create_training_dataset(exercises, answers)

# Save as TypeScript data
ts_content = f"""// Auto-generated from reference materials
export const exerciseData = {json.dumps(training_data, indent=2)};
"""

with open('data/exercises.ts', 'w') as f:
    f.write(ts_content)
```

---

## Step 6: Extract Shorthand Outlines

```python
import cv2
import numpy as np
from PIL import Image

def extract_shorthand_outlines(image_path):
    """Extract individual shorthand outlines from page images"""
    # Load image
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold
    _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours (individual outlines)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    outlines = []
    for i, contour in enumerate(contours):
        x, y, w, h = cv2.boundingRect(contour)
        
        # Filter small contours (noise)
        if w > 20 and h > 20:
            # Extract outline region
            outline_img = img[y:y+h, x:x+w]
            outlines.append({
                'id': i,
                'image': outline_img,
                'bbox': (x, y, w, h)
            })
    
    return outlines

# Process all extracted pages
for page_num in range(1, num_pages + 1):
    page_path = f'assets/reference-materials/pitman/extracted-images/page_{page_num}.png'
    outlines = extract_shorthand_outlines(page_path)
    
    # Save individual outlines
    for outline in outlines:
        output_path = f'assets/reference-materials/training-data/labeled/page{page_num}_outline{outline["id"]}.png'
        cv2.imwrite(output_path, outline['image'])
```

---

## Step 7: Integrate into App

### Update the exercises data file:

```typescript
// data/exercises.ts
import { Exercise } from '@/types/shorthand';

export const exercisesData: Exercise[] = [
  {
    id: '1',
    title: 'Basic Strokes Practice',
    description: 'Practice writing light and heavy strokes',
    difficulty: 'beginner',
    type: 'strokes',
    content: 'Write the following strokes: T, D, K, G, P, B',
    answer: 'Refer to Shorthand-Key.doc page 1',
    source: 'Shorthand Book Exercise 1'
  },
  // More exercises extracted from the textbook...
];
```

---

## Next Steps

1. **Run Extraction Scripts:**
   ```bash
   # Create extraction script
   python scripts/extract_materials.py
   ```

2. **Review Extracted Data:**
   - Check `data/extracted-exercises.json`
   - Review `data/extracted-answers.json`
   - Verify images in `training-data/labeled/`

3. **Integrate into App:**
   - Update `data/exercises.ts`
   - Add to Q&A tab
   - Link to Resources tab

4. **Train AI Model:**
   - Use labeled images for recognition
   - Train on exercise patterns
   - Validate with answer key

---

## Automated Processing Script

Create `scripts/process_materials.py`:

```python
#!/usr/bin/env python3
"""
Automated script to process reference materials
"""

import os
import json
from extract_functions import (
    extract_pdf_text,
    extract_doc_text,
    parse_exercises,
    parse_answers,
    create_training_dataset
)

def main():
    print("Processing Pitman Shorthand Reference Materials...")
    
    # Paths
    pdf_path = 'assets/reference-materials/pitman/Shorthand-Book.pdf'
    doc_path = 'assets/reference-materials/pitman/Shorthand-Key.doc'
    
    # Extract content
    print("1. Extracting textbook content...")
    textbook_text = extract_pdf_text(pdf_path)
    
    print("2. Extracting answer key...")
    answers_text = extract_doc_text(doc_path)
    
    print("3. Parsing exercises...")
    exercises = parse_exercises(textbook_text)
    
    print("4. Parsing answers...")
    answers = parse_answers(answers_text)
    
    print("5. Creating training dataset...")
    dataset = create_training_dataset(exercises, answers)
    
    # Save results
    print("6. Saving results...")
    with open('data/training-dataset.json', 'w') as f:
        json.dump(dataset, f, indent=2)
    
    print(f"\n✅ Processing complete!")
    print(f"   - Extracted {len(exercises)} exercises")
    print(f"   - Found {len(answers)} answers")
    print(f"   - Created {len(dataset)} training pairs")

if __name__ == '__main__':
    main()
```

Run with:
```bash
python scripts/process_materials.py
```

---

**Status:** Ready for processing  
**Materials:** 37.4 MB (PDF + DOC)  
**Expected Output:** 100+ training examples
