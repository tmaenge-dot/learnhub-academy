# Reference Materials & AI Integration Guide

## Overview
This guide explains how to upload and organize Pitman shorthand reference materials for AI-powered recognition training.

## Folder Structure

```
assets/reference-materials/
├── pitman/                          # Pitman shorthand specific materials
│   ├── strokes/                     # Individual stroke images
│   │   ├── consonants/
│   │   ├── vowels/
│   │   └── blends/
│   ├── words/                       # Complete word outlines
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── phrases/                     # Common phrase outlines
│   ├── charts/                      # Reference charts and guides
│   └── rules/                       # Visual rule explanations
└── training-data/                   # Labeled training data
    ├── labeled/                     # Verified, labeled samples
    └── unlabeled/                   # Raw samples for labeling
```

## What to Upload

### 1. **Stroke Charts** (`pitman/charts/`)
Upload comprehensive charts showing:
- All consonant strokes (light and heavy)
- All vowel marks and positions
- Diphthongs
- Special forms (circles, loops, hooks)

**File naming convention:** 
- `consonant-chart.png`
- `vowel-chart.png`
- `special-forms-chart.png`

### 2. **Individual Strokes** (`pitman/strokes/`)

For each stroke, provide:
- Clear image of the stroke
- Multiple variations (different handwriting styles)
- Labeled with the sound it represents

**File naming:** `stroke-{sound}-{type}-{variant}.png`

Examples:
- `stroke-p-light-01.png`
- `stroke-b-heavy-01.png`
- `stroke-t-downward-01.png`

### 3. **Complete Words** (`pitman/words/`)

Organize by difficulty level:

**Beginner:**
- Simple 3-4 letter words
- Clear stroke patterns
- Basic vowel placements

**Intermediate:**
- 5-7 letter words
- Combined strokes
- More complex patterns

**Advanced:**
- 8+ letter words
- Multiple special forms
- Complex combinations

**File naming:** `word-{difficulty}-{word}.png`

Examples:
- `word-beginner-cat.png`
- `word-intermediate-teacher.png`
- `word-advanced-communication.png`

### 4. **Metadata Files**

For each image, create a corresponding JSON file:

```json
{
  "word": "example",
  "outline": "X-M-P-L",
  "strokes": [
    { "type": "consonant", "value": "X", "heavy": false },
    { "type": "consonant", "value": "M", "heavy": true },
    { "type": "consonant", "value": "P", "heavy": false },
    { "type": "consonant", "value": "L", "heavy": false }
  ],
  "vowels": [
    { "position": "after-X", "type": "short-a", "mark": "light-dot" }
  ],
  "difficulty": "intermediate",
  "category": "common",
  "verified": true
}
```

## Image Requirements

### Quality Standards
- **Resolution:** Minimum 300 DPI
- **Format:** PNG or JPG
- **Size:** At least 800x600 pixels
- **Background:** White or transparent
- **Clarity:** High contrast, clear strokes

### Best Practices
1. **Consistency:** Use the same writing tool/style for related samples
2. **Lighting:** Even, bright lighting with no shadows
3. **Alignment:** Keep baseline consistent
4. **Framing:** Include some white space around the shorthand
5. **Focus:** Sharp, clear images without blur

## Training Data Organization

### Labeled Data Structure

Create a CSV file (`training-data/labels.csv`):

```csv
filename,word,strokes,difficulty,verified
word-beginner-cat.png,cat,K-A-T,beginner,true
word-intermediate-book.png,book,B-OO-K,intermediate,true
phrase-common-thank-you.png,thank you,TH-K-U,intermediate,true
```

### Annotation Format

For each training image, provide bounding boxes for strokes:

```json
{
  "image": "word-example.png",
  "annotations": [
    {
      "type": "stroke",
      "value": "P",
      "bbox": { "x": 10, "y": 20, "width": 30, "height": 50 },
      "confidence": 1.0
    },
    {
      "type": "vowel",
      "value": "short-a",
      "bbox": { "x": 25, "y": 15, "width": 5, "height": 5 },
      "confidence": 1.0
    }
  ]
}
```

## AI Model Integration (Future)

### Planned Features

1. **Stroke Recognition**
   - Identify individual strokes
   - Classify light vs heavy
   - Determine direction

2. **Vowel Detection**
   - Locate vowel marks
   - Classify vowel type
   - Determine position

3. **Word Assembly**
   - Combine strokes into words
   - Apply Pitman rules
   - Suggest alternatives

4. **Confidence Scoring**
   - Rate recognition accuracy
   - Provide multiple suggestions
   - Learn from corrections

### Technology Stack Options

**Option 1: TensorFlow.js**
```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native
```

**Option 2: ML Kit (Google)**
```bash
npx expo install expo-ml-kit
```

**Option 3: Custom ML Model**
- Train with Python (TensorFlow/PyTorch)
- Export to TensorFlow Lite
- Use in React Native

## How to Contribute Training Data

### Step 1: Prepare Images
1. Write Pitman shorthand clearly
2. Photograph or scan at high resolution
3. Crop to focus on the shorthand
4. Save with descriptive filename

### Step 2: Label the Data
1. Create corresponding JSON metadata
2. Identify each stroke and vowel
3. Provide the correct translation
4. Mark confidence level

### Step 3: Verify Quality
- [ ] Image is clear and high-resolution
- [ ] Metadata is accurate
- [ ] Follows naming convention
- [ ] Includes all required fields
- [ ] Matches Pitman rules correctly

### Step 4: Submit
Place files in the appropriate folders and they'll be included in the next training cycle.

## Sample Upload Template

### For a New Word

1. **Image:** `assets/reference-materials/pitman/words/beginner/cat.png`

2. **Metadata:** `assets/reference-materials/pitman/words/beginner/cat.json`
```json
{
  "word": "cat",
  "outline": "K-A-T",
  "description": "Simple three-stroke word",
  "strokes": [
    { "stroke": "K", "type": "consonant", "heavy": false, "direction": "curved" },
    { "stroke": "A", "type": "vowel", "mark": "light-dot", "position": "first" },
    { "stroke": "T", "type": "consonant", "heavy": false, "direction": "downward" }
  ],
  "difficulty": "beginner",
  "category": "animals",
  "verified": true,
  "createdBy": "admin",
  "createdAt": "2025-11-02"
}
```

## Current Status

- ✅ Folder structure created
- ✅ Type definitions complete
- ✅ Pitman rules documented
- ✅ Recognition screen added to app
- ⏳ Awaiting reference material uploads
- ⏳ AI model to be trained
- ⏳ Integration to be completed

## Next Steps

1. **Upload reference materials** to designated folders
2. **Review and verify** all uploaded content
3. **Train initial model** with collected data
4. **Test recognition** accuracy
5. **Iterate and improve** based on results

## Questions?

For questions about:
- **Format requirements:** See "Image Requirements" section
- **Pitman rules:** Check `data/pitman-rules.ts`
- **Technical integration:** Review `types/pitman.ts`

---

**Ready to contribute?** Start uploading your Pitman shorthand reference materials to help train the AI! 🚀
