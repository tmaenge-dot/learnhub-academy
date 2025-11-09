# Stroke Recognition Implementation Guide

## Yes, This is Absolutely Possible! ✅

Your system can definitely recognize strokes from the reference materials. Here's how to make it work:

---

## 🎯 What You Already Have

### ✅ Reference Materials
- **Shorthand-Book.pdf** - Contains all stroke images
- **OCR-extracted text** - Descriptions of each stroke
- **Stroke data** - Structured information in `data/strokes.ts`
- **Upload system** - Ready to collect training images

### ✅ Data Structure
- **Visual patterns** defined in types
- **Stroke categories** (consonant/vowel/blend)
- **Direction/shape** metadata
- **Example words** for each stroke

---

## 🚀 How to Implement Stroke Recognition

### Phase 1: Extract Stroke Images from Reference Book

#### Step 1: Extract Individual Stroke Images from PDF

Create `scripts/extract_stroke_images.py`:

```python
#!/usr/bin/env python3
"""
Extract individual stroke images from the reference book
"""
import cv2
import numpy as np
from pdf2image import convert_from_path
import os
import json

def extract_strokes_from_page(image_path, page_num):
    """Extract individual strokes from a textbook page"""
    # Load image
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold to get binary image
    _, binary = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours (individual strokes)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    strokes = []
    for i, contour in enumerate(contours):
        # Get bounding box
        x, y, w, h = cv2.boundingRect(contour)
        
        # Filter noise (too small or too large)
        if 15 < w < 200 and 15 < h < 200:
            # Extract stroke region with padding
            padding = 10
            x1 = max(0, x - padding)
            y1 = max(0, y - padding)
            x2 = min(img.shape[1], x + w + padding)
            y2 = min(img.shape[0], y + h + padding)
            
            stroke_img = img[y1:y2, x1:x2]
            
            strokes.append({
                'image': stroke_img,
                'bbox': (x, y, w, h),
                'page': page_num,
                'id': f'p{page_num}_s{i}'
            })
    
    return strokes

def process_reference_book(pdf_path, output_dir):
    """Process the entire reference book"""
    print("Converting PDF to images...")
    pages = convert_from_path(pdf_path, dpi=300)
    
    all_strokes = []
    
    for page_num, page in enumerate(pages[:40], 1):  # First 40 pages
        print(f"Processing page {page_num}...")
        
        # Save page as temp image
        temp_path = f'/tmp/page_{page_num}.png'
        page.save(temp_path, 'PNG')
        
        # Extract strokes from this page
        strokes = extract_strokes_from_page(temp_path, page_num)
        
        # Save individual stroke images
        for stroke in strokes:
            stroke_id = stroke['id']
            output_path = os.path.join(output_dir, 'unlabeled', f'{stroke_id}.png')
            cv2.imwrite(output_path, stroke['image'])
            
            # Store metadata
            all_strokes.append({
                'id': stroke_id,
                'page': page_num,
                'bbox': stroke['bbox'],
                'path': output_path
            })
        
        print(f"  Found {len(strokes)} strokes")
        os.remove(temp_path)
    
    # Save metadata
    metadata_path = os.path.join(output_dir, 'metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(all_strokes, f, indent=2)
    
    print(f"\n✅ Extraction complete!")
    print(f"   Total strokes extracted: {len(all_strokes)}")
    print(f"   Saved to: {output_dir}")
    
    return all_strokes

# Run extraction
if __name__ == '__main__':
    pdf_path = 'assets/reference-materials/pitman/Shorthand-Book.pdf'
    output_dir = 'assets/reference-materials/training-data'
    
    # Create directories
    os.makedirs(os.path.join(output_dir, 'unlabeled'), exist_ok=True)
    os.makedirs(os.path.join(output_dir, 'labeled'), exist_ok=True)
    
    # Extract strokes
    strokes = process_reference_book(pdf_path, output_dir)
```

Run with:
```bash
pip install opencv-python pdf2image pillow
python scripts/extract_stroke_images.py
```

---

### Phase 2: Label the Extracted Strokes

#### Option A: Manual Labeling Tool

Create `scripts/label_strokes.py`:

```python
#!/usr/bin/env python3
"""
Interactive tool to label extracted strokes
"""
import cv2
import json
import os
from pathlib import Path

# Import stroke data from the app
STROKES = {
    'p': 'pee (light left slant)',
    'b': 'bee (heavy left slant)',
    't': 'tee (light vertical)',
    'd': 'dee (heavy vertical)',
    'ch': 'chay (light right slant)',
    'j': 'jay (heavy right slant)',
    'f': 'ef (light curve 45°)',
    'v': 'vee (heavy curve 45°)',
    'th': 'ith (light curve 90°)',
    'TH': 'thee (heavy curve 90°)',
    's': 'ess (light curve 90°)',
    'z': 'zee (heavy curve 90°)',
    'sh': 'ish (light curve reverse)',
    'zh': 'zhee (heavy curve reverse)',
    'm': 'em (horizontal curve)',
    'n': 'en (horizontal curve)',
    'ng': 'ing (heavy horizontal curve)',
    'k': 'kay (horizontal straight)',
    'g': 'gay (heavy horizontal straight)',
    'l': 'el (upward curve 45°)',
    'r': 'ar (downward curve 45°)',
    'R': 'ray (upward straight 30°)',
    'w': 'way (hooked upstroke)',
    'y': 'yay (hooked upstroke)',
    # Vowels
    'a': 'Pa (dash 1st place)',
    'A': 'That (dot 1st place)',
    'e': 'May (dash 2nd place)',
    'E': 'Pen (dot 2nd place)',
    'i': 'We (dash 3rd place)',
    'I': 'Is (dot 3rd place)',
}

def label_strokes(input_dir, output_dir):
    """Interactive labeling of stroke images"""
    # Load metadata
    metadata_path = os.path.join(input_dir, 'metadata.json')
    with open(metadata_path, 'r') as f:
        strokes = json.load(f)
    
    labeled_data = []
    
    print("\n=== Stroke Labeling Tool ===")
    print("Available stroke labels:")
    for key, name in sorted(STROKES.items()):
        print(f"  {key:3s} - {name}")
    print("\nPress 'q' to quit, 's' to skip\n")
    
    for i, stroke in enumerate(strokes):
        # Load image
        img_path = stroke['path']
        img = cv2.imread(img_path)
        
        if img is None:
            continue
        
        # Show image
        display_img = cv2.resize(img, (400, 400), interpolation=cv2.INTER_NEAREST)
        cv2.imshow('Stroke', display_img)
        cv2.setWindowTitle('Stroke', f'Stroke {i+1}/{len(strokes)} - {stroke["id"]}')
        
        # Get label
        print(f"\n[{i+1}/{len(strokes)}] Page {stroke['page']}, ID: {stroke['id']}")
        label = input("Enter stroke label (or 's' to skip, 'q' to quit): ").strip().lower()
        
        if label == 'q':
            break
        elif label == 's':
            continue
        elif label in STROKES:
            # Save labeled image
            stroke_name = STROKES[label].split()[0]
            output_path = os.path.join(
                output_dir, 
                'labeled', 
                label,
                f'{stroke_name}_{stroke["id"]}.png'
            )
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            cv2.imwrite(output_path, img)
            
            # Record label
            labeled_data.append({
                'id': stroke['id'],
                'label': label,
                'stroke_name': STROKES[label],
                'page': stroke['page'],
                'path': output_path
            })
            
            print(f"✓ Labeled as: {STROKES[label]}")
        else:
            print(f"✗ Invalid label: {label}")
    
    cv2.destroyAllWindows()
    
    # Save labeled metadata
    labeled_path = os.path.join(output_dir, 'labeled_metadata.json')
    with open(labeled_path, 'w') as f:
        json.dump(labeled_data, f, indent=2)
    
    print(f"\n✅ Labeling complete!")
    print(f"   Labeled strokes: {len(labeled_data)}")
    print(f"   Saved to: {labeled_path}")

if __name__ == '__main__':
    input_dir = 'assets/reference-materials/training-data'
    output_dir = 'assets/reference-materials/training-data'
    label_strokes(input_dir, output_dir)
```

Run with:
```bash
python scripts/label_strokes.py
```

#### Option B: Automatic Labeling Using OCR Context

Create `scripts/auto_label_strokes.py`:

```python
#!/usr/bin/env python3
"""
Automatically label strokes using OCR text from surrounding context
"""
import json
import re
from pathlib import Path

def auto_label_from_ocr(strokes_metadata, ocr_pages_dir):
    """
    Match extracted strokes with OCR text to auto-label them
    """
    labeled_strokes = []
    
    # Load OCR text for each page
    for stroke in strokes_metadata:
        page_num = stroke['page']
        ocr_file = Path(ocr_pages_dir) / f'page_{page_num:03d}.txt'
        
        if not ocr_file.exists():
            continue
        
        # Read OCR text
        with open(ocr_file, 'r') as f:
            page_text = f.read()
        
        # Look for stroke descriptions near this position
        # Example patterns: "P as in pay", "Light stroke for T", etc.
        label = detect_stroke_from_context(page_text, stroke['bbox'])
        
        if label:
            labeled_strokes.append({
                **stroke,
                'label': label,
                'auto_labeled': True
            })
    
    return labeled_strokes

def detect_stroke_from_context(text, bbox):
    """Detect stroke type from OCR text context"""
    # Common patterns in the textbook
    patterns = {
        r'(?i)\bp\b.*?pay': 'p',
        r'(?i)\bb\b.*?bee': 'b',
        r'(?i)\bt\b.*?tea': 't',
        r'(?i)\bd\b.*?day': 'd',
        r'(?i)ch.*?each': 'ch',
        r'(?i)j.*?jay': 'j',
        # Add more patterns...
    }
    
    for pattern, label in patterns.items():
        if re.search(pattern, text):
            return label
    
    return None
```

---

### Phase 3: Train a Recognition Model

#### Option A: Simple Template Matching (Quick Start)

Create `scripts/simple_recognition.py`:

```python
#!/usr/bin/env python3
"""
Simple template-based stroke recognition
"""
import cv2
import numpy as np
import json
from pathlib import Path

class SimpleStrokeRecognizer:
    def __init__(self, templates_dir):
        """Load stroke templates"""
        self.templates = {}
        
        # Load all labeled images as templates
        for stroke_dir in Path(templates_dir).glob('*/'):
            stroke_label = stroke_dir.name
            self.templates[stroke_label] = []
            
            for img_path in stroke_dir.glob('*.png'):
                template = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
                if template is not None:
                    self.templates[stroke_label].append(template)
        
        print(f"Loaded templates for {len(self.templates)} stroke types")
    
    def recognize(self, image_path, top_k=3):
        """Recognize stroke in image"""
        # Load query image
        query = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if query is None:
            return None
        
        # Normalize size
        query = cv2.resize(query, (128, 128))
        
        # Try matching with each template
        scores = {}
        
        for label, templates in self.templates.items():
            best_score = 0
            
            for template in templates:
                # Resize template to match query
                template_resized = cv2.resize(template, (128, 128))
                
                # Calculate similarity (SSIM or correlation)
                similarity = self._calculate_similarity(query, template_resized)
                best_score = max(best_score, similarity)
            
            scores[label] = best_score
        
        # Get top K matches
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        
        return [{
            'label': label,
            'confidence': score
        } for label, score in sorted_scores[:top_k]]
    
    def _calculate_similarity(self, img1, img2):
        """Calculate similarity between two images"""
        # Simple correlation
        correlation = cv2.matchTemplate(img1, img2, cv2.TM_CCOEFF_NORMED)
        return float(correlation[0][0])

# Usage
recognizer = SimpleStrokeRecognizer('assets/reference-materials/training-data/labeled')

# Test recognition
result = recognizer.recognize('path/to/unknown/stroke.png')
print(f"Recognized as: {result[0]['label']} ({result[0]['confidence']:.2%} confidence)")
```

#### Option B: Deep Learning (Advanced)

Create `scripts/train_cnn_model.py`:

```python
#!/usr/bin/env python3
"""
Train a CNN model for stroke recognition using TensorFlow
"""
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
from pathlib import Path
import cv2
import json

def load_dataset(data_dir):
    """Load labeled stroke images"""
    images = []
    labels = []
    label_map = {}
    
    data_path = Path(data_dir) / 'labeled'
    
    # Build label map
    stroke_dirs = sorted([d for d in data_path.iterdir() if d.is_dir()])
    label_map = {d.name: i for i, d in enumerate(stroke_dirs)}
    
    print(f"Found {len(label_map)} stroke classes")
    
    # Load images
    for stroke_dir in stroke_dirs:
        label = label_map[stroke_dir.name]
        
        for img_path in stroke_dir.glob('*.png'):
            img = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
            if img is not None:
                # Resize and normalize
                img = cv2.resize(img, (64, 64))
                img = img.astype('float32') / 255.0
                
                images.append(img)
                labels.append(label)
    
    # Convert to numpy arrays
    X = np.array(images).reshape(-1, 64, 64, 1)
    y = np.array(labels)
    
    print(f"Loaded {len(X)} images")
    
    return X, y, label_map

def build_model(num_classes):
    """Build CNN model"""
    model = keras.Sequential([
        # Convolutional layers
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 1)),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        
        # Dense layers
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def train_model(data_dir, output_path):
    """Train the stroke recognition model"""
    # Load data
    print("Loading dataset...")
    X, y, label_map = load_dataset(data_dir)
    
    # Split train/test
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print(f"Training set: {len(X_train)} images")
    print(f"Test set: {len(X_test)} images")
    
    # Build model
    print("Building model...")
    model = build_model(len(label_map))
    model.summary()
    
    # Train
    print("Training...")
    history = model.fit(
        X_train, y_train,
        epochs=50,
        batch_size=32,
        validation_data=(X_test, y_test),
        callbacks=[
            keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
            keras.callbacks.ReduceLROnPlateau(patience=3)
        ]
    )
    
    # Evaluate
    test_loss, test_acc = model.evaluate(X_test, y_test)
    print(f"\n✅ Test accuracy: {test_acc:.2%}")
    
    # Save model
    model.save(output_path)
    
    # Save label map
    label_map_path = Path(output_path).parent / 'label_map.json'
    inverse_map = {v: k for k, v in label_map.items()}
    with open(label_map_path, 'w') as f:
        json.dump(inverse_map, f, indent=2)
    
    print(f"\n✅ Model saved to: {output_path}")
    print(f"✅ Label map saved to: {label_map_path}")
    
    return model, history

if __name__ == '__main__':
    data_dir = 'assets/reference-materials/training-data'
    output_path = 'models/stroke_recognizer.h5'
    
    # Create models directory
    Path('models').mkdir(exist_ok=True)
    
    # Train
    model, history = train_model(data_dir, output_path)
```

Run with:
```bash
pip install tensorflow scikit-learn
python scripts/train_cnn_model.py
```

---

### Phase 4: Integrate Recognition into the App

#### Step 1: Create Recognition Service

Create `scripts/recognize_stroke.py`:

```python
#!/usr/bin/env python3
"""
Stroke recognition service that can be called from the app
"""
import tensorflow as tf
import cv2
import numpy as np
import json
import sys

def load_model(model_path, label_map_path):
    """Load trained model and label map"""
    model = tf.keras.models.load_model(model_path)
    
    with open(label_map_path, 'r') as f:
        label_map = json.load(f)
    
    return model, label_map

def recognize_stroke(image_path, model, label_map, top_k=3):
    """Recognize stroke from image"""
    # Load and preprocess image
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (64, 64))
    img = img.astype('float32') / 255.0
    img = img.reshape(1, 64, 64, 1)
    
    # Predict
    predictions = model.predict(img)[0]
    
    # Get top K results
    top_indices = np.argsort(predictions)[-top_k:][::-1]
    
    results = []
    for idx in top_indices:
        results.append({
            'label': label_map[str(idx)],
            'confidence': float(predictions[idx])
        })
    
    return results

if __name__ == '__main__':
    # Command line usage
    if len(sys.argv) < 2:
        print("Usage: python recognize_stroke.py <image_path>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    # Load model
    model, label_map = load_model(
        'models/stroke_recognizer.h5',
        'models/label_map.json'
    )
    
    # Recognize
    results = recognize_stroke(image_path, model, label_map)
    
    # Print results
    print(json.dumps(results, indent=2))
```

#### Step 2: Create API Endpoint (Optional - for web/mobile)

If you want to run recognition in real-time, create a simple Flask API:

```python
# scripts/recognition_api.py
from flask import Flask, request, jsonify
import tensorflow as tf
import cv2
import numpy as np
import json
import base64

app = Flask(__name__)

# Load model once at startup
model = tf.keras.models.load_model('models/stroke_recognizer.h5')
with open('models/label_map.json', 'r') as f:
    label_map = json.load(f)

@app.route('/recognize', methods=['POST'])
def recognize():
    """API endpoint for stroke recognition"""
    # Get image from request
    data = request.json
    image_data = base64.b64decode(data['image'])
    
    # Convert to numpy array
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    
    # Preprocess
    img = cv2.resize(img, (64, 64))
    img = img.astype('float32') / 255.0
    img = img.reshape(1, 64, 64, 1)
    
    # Predict
    predictions = model.predict(img)[0]
    
    # Get top 3 results
    top_indices = np.argsort(predictions)[-3:][::-1]
    results = [{
        'label': label_map[str(idx)],
        'confidence': float(predictions[idx])
    } for idx in top_indices]
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

Run with:
```bash
pip install flask
python scripts/recognition_api.py
```

#### Step 3: Update the React Native App

Update `app/(tabs)/recognize.tsx`:

```typescript
const processImage = async () => {
  if (!selectedImage) return;
  
  setIsProcessing(true);
  
  try {
    // Convert image to base64
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      
      // Call recognition API
      const apiResponse = await fetch('http://localhost:5000/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64data.split(',')[1] // Remove data:image prefix
        })
      });
      
      const results = await apiResponse.json();
      
      // Display results
      setRecognitionResult({
        word: results[0].label,
        confidence: results[0].confidence
      });
      
      setIsProcessing(false);
    };
    
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Recognition error:', error);
    Alert.alert('Error', 'Failed to recognize stroke');
    setIsProcessing(false);
  }
};
```

---

## 📊 Expected Accuracy

With proper training data:
- **Template matching**: 60-70% accuracy (good for prototyping)
- **CNN model**: 85-95% accuracy (with 100+ images per stroke)
- **Advanced models**: 95-99% accuracy (with 1000+ images)

---

## 🎯 Quick Start Path

### Easiest Path (No ML Required):
1. Use template matching with reference book images
2. Match based on stroke direction, shape, weight
3. 70% accuracy is good enough for learning assistance

### Best Path (ML Model):
1. Extract 200+ stroke images from reference book
2. Label them (1-2 hours of work)
3. Train CNN model (30 minutes)
4. Get 90%+ accuracy

---

## 📝 Summary

**YES, this is 100% possible!** Here's what you need to do:

1. **Extract stroke images** from your PDF reference book ✅
2. **Label them** (or use OCR context to auto-label) ✅
3. **Train a model** (either template matching or CNN) ✅
4. **Integrate into app** (API or local processing) ✅

The hardest part is labeling the training data, but you only need to do it once, and you already have all the strokes in your reference book!

---

**Ready to start?** Run:
```bash
python scripts/extract_stroke_images.py
```

This will extract all strokes from your reference book and you'll be ready to build the recognition system! 🚀
