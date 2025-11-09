# Stroke Image Upload Guide

## Purpose
This system allows you to build an AI training dataset by uploading individual shortform stroke images from the Pitman Shorthand textbook.

## How to Use

### Step 1: Take Screenshots
1. Open your Pitman Shorthand textbook (PDF or physical book)
2. Take individual screenshots of each shortform stroke
3. Crop tightly around the stroke for best results

### Step 2: Upload via App
1. Open the app and go to the **Upload** tab (📸 icon)
2. Enter the word the stroke represents (e.g., "be", "for", "are")
3. Select the Unit number (1-12)
4. Choose to either:
   - **Gallery**: Pick from saved screenshots
   - **Camera**: Take a live photo of the textbook
5. Click **Save Stroke Image**

### Step 3: Images are Organized
Images are automatically saved to:
```
assets/stroke-images/
  ├── unit1/
  │   ├── be-1234567890.jpg
  │   ├── it-1234567891.jpg
  │   └── ...
  ├── unit2/
  ├── unit3/
  └── ...
```

### Step 4: Metadata Tracking
The system creates a `metadata.json` file that tracks:
- Word/phrase
- Unit number
- File path
- Upload timestamp

## Tips for Best Results

### ✅ Good Screenshots
- Clear, sharp stroke image
- Good contrast (black stroke on white/light background)
- Tightly cropped (minimal empty space)
- Single shortform per image
- Straight orientation (not tilted)

### ❌ Avoid
- Blurry images
- Multiple shortforms in one image
- Too much surrounding text
- Poor lighting/contrast
- Angled/tilted strokes

## Example Workflow

**Unit 1 - Shortform "be":**
1. Screenshot the "be" shortform from Unit 1
2. Open Upload tab
3. Enter word: "be"
4. Select unit: "1"
5. Upload the screenshot
6. Save

**Result:** Image saved as `assets/stroke-images/unit1/be-1699123456789.jpg`

## Building the AI Training Dataset

As you upload more images, you're building a comprehensive dataset that maps:
- **Visual strokes** (images) ↔ **Words** (labels) ↔ **Units** (categories)

This dataset will be used to:
1. Train computer vision models to recognize handwritten shorthand
2. Create an image recognition system in the AI tab
3. Enable real-time shorthand translation
4. Generate practice exercises

## Progress Tracking

The app shows:
- Total uploaded strokes
- Organized by unit
- Preview thumbnails
- Upload date/time

## Next Steps

After uploading stroke images:
1. **Python script** will process images for ML training
2. **TensorFlow/PyTorch model** will learn stroke patterns
3. **AI Recognition tab** will use the trained model
4. **Real-time recognition** of handwritten shorthand

---

**Current Status:**
- ✅ Image upload system ready
- ✅ Directory structure created (unit1-unit8)
- ✅ Metadata tracking enabled
- ⏳ Waiting for stroke images to be uploaded
- ⏳ AI training pipeline to be implemented

**Recommended Order:**
1. Upload all Unit 1 shortforms (14 images)
2. Upload all Unit 2 shortforms (6 images)
3. Upload all Unit 3 shortforms (11 images)
4. Continue through Unit 8+
5. Then upload stroke alphabet images
6. Finally upload vowel/diphthong images
