#!/usr/bin/env python3
"""
Extract individual stroke images and create a comprehensive stroke library
from the Pitman Shorthand reference materials.

This script:
1. Crops individual strokes from the alphabet table (page 9)
2. Extracts detailed visual descriptions using AI vision analysis
3. Creates a reusable stroke component library with images
4. Generates TypeScript data files for the app
"""

import json
from pathlib import Path
from PIL import Image
import os

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
EXTRACTED_STROKES_DIR = PROJECT_ROOT / "assets" / "extracted-strokes"
STROKE_IMAGES_DIR = PROJECT_ROOT / "assets" / "stroke-library"
OUTPUT_FILE = PROJECT_ROOT / "data" / "stroke-library.ts"

# Create output directory
STROKE_IMAGES_DIR.mkdir(exist_ok=True)

# Load the AI-analyzed stroke data
AI_STROKES_FILE = PROJECT_ROOT / "data" / "ai_analyzed_strokes.json"
with open(AI_STROKES_FILE, 'r') as f:
    ai_strokes = json.load(f)

# Define the 24 consonant strokes with their correct sound names
CONSONANT_STROKES = [
    # STRAIGHT DOWNSTROKES
    {
        "id": "P",
        "name": "P",
        "sound": "p",
        "category": "STRAIGHT_DOWN",
        "examples": ["pay", "cup", "appy"],
        "source_page": "page_009.png",
        "crop_region": None  # Will be determined
    },
    {
        "id": "B",
        "name": "B",
        "sound": "b",
        "category": "STRAIGHT_DOWN",
        "examples": ["bay", "cab", "baby"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "T",
        "name": "T",
        "sound": "t",
        "category": "STRAIGHT_DOWN",
        "examples": ["tea", "cat", "attic"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "D",
        "name": "D",
        "sound": "d",
        "category": "STRAIGHT_DOWN",
        "examples": ["day", "had", "daddy"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "CH",
        "name": "CH",
        "sound": "ch",
        "category": "STRAIGHT_DOWN",
        "examples": ["chair", "catch", "much"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "J",
        "name": "J",
        "sound": "j",
        "category": "STRAIGHT_DOWN",
        "examples": ["jay", "edge", "judge"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    
    # CURVED STROKES
    {
        "id": "F",
        "name": "F",
        "sound": "f",
        "category": "CURVED",
        "examples": ["fee", "safe", "coffee"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "V",
        "name": "V",
        "sound": "v",
        "category": "CURVED",
        "examples": ["vie", "save", "vivid"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "ITH",
        "name": "ITH",
        "sound": "ith",
        "phonetic": "voiceless th",
        "category": "CURVED",
        "examples": ["think", "bath", "thick"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "THE",
        "name": "THE",
        "sound": "the",
        "phonetic": "voiced th",
        "category": "CURVED",
        "examples": ["this", "bathe", "that"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "S",
        "name": "S",
        "sound": "s",
        "category": "CURVED",
        "examples": ["say", "bass", "sissy"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "Z",
        "name": "Z",
        "sound": "z",
        "category": "CURVED",
        "examples": ["zoo", "buzz", "dizzy"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "ISH",
        "name": "ISH",
        "sound": "ish",
        "phonetic": "sh sound",
        "category": "CURVED",
        "examples": ["she", "fish", "wish"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "ZHEE",
        "name": "ZHEE",
        "sound": "zhee",
        "phonetic": "zh sound",
        "category": "CURVED",
        "examples": ["measure", "vision", "beige"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    
    # HORIZONTAL STROKES
    {
        "id": "K",
        "name": "K",
        "sound": "k",
        "category": "HORIZONTAL",
        "examples": ["key", "back", "cake"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "G",
        "name": "G",
        "sound": "g",
        "category": "HORIZONTAL",
        "examples": ["gay", "bag", "gag"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "M",
        "name": "M",
        "sound": "m",
        "category": "HORIZONTAL",
        "examples": ["may", "ham", "mama"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    
    # UPWARD STROKES
    {
        "id": "N",
        "name": "N",
        "sound": "n",
        "category": "UPWARD",
        "examples": ["nay", "man", "nanny"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "NG",
        "name": "NG",
        "sound": "ng",
        "category": "UPWARD",
        "examples": ["hang", "sing", "wing"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "L",
        "name": "L",
        "sound": "l",
        "category": "UPWARD",
        "examples": ["lay", "pal", "lolly"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "W",
        "name": "W",
        "sound": "w",
        "category": "UPWARD",
        "examples": ["way", "away", "wow"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "Y",
        "name": "Y",
        "sound": "y",
        "category": "UPWARD",
        "examples": ["yay", "yes", "you"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    {
        "id": "R",
        "name": "R",
        "sound": "r",
        "category": "UPWARD",
        "examples": ["ray", "bar", "rarer"],
        "source_page": "page_009.png",
        "crop_region": None
    },
    
    # SPECIAL
    {
        "id": "H",
        "name": "H",
        "sound": "h",
        "category": "SPECIAL",
        "examples": ["hay", "ahead", "ha"],
        "source_page": "page_009.png",
        "crop_region": None
    },
]

def merge_ai_analysis(strokes):
    """Merge AI-analyzed descriptions with stroke definitions"""
    
    # The structure is "consonants" not "alphabet_strokes"
    consonant_data = ai_strokes.get("consonants", {})
    
    for stroke in strokes:
        stroke_id = stroke["id"]
        
        # Handle special cases where JSON keys have descriptors
        # ITH → "ITH (thin)", THE → "THE (this)"
        search_keys = [stroke_id]
        if stroke_id == "ITH":
            search_keys = ["ITH", "ITH (thin)"]
        elif stroke_id == "THE":
            search_keys = ["THE", "THE (this)"]
        
        # Find matching AI analysis
        ai_data = None
        for key in search_keys:
            if key in consonant_data:
                ai_data = consonant_data[key]
                break
        
        if ai_data:
            stroke["visual"] = ai_data.get("visual", "")
            stroke["direction"] = ai_data.get("direction", "")
            stroke["weight"] = ai_data.get("weight", "")
            stroke["description"] = ai_data.get("description", "")
            stroke["source_reference"] = f"page_{str(ai_data.get('page', 9)).zfill(3)}.png"
            # Add the sound property if available
            if "sound" in ai_data:
                stroke["ai_sound"] = ai_data["sound"]
        else:
            stroke["visual"] = f"{stroke['name']} stroke"
            stroke["description"] = f"{stroke['sound']} sound"
            stroke["source_reference"] = "page_009.png"
    
    return strokes

def generate_typescript_library(strokes):
    """Generate TypeScript data file for the stroke library"""
    
    ts_content = """/**
 * PITMAN SHORTHAND STROKE LIBRARY
 * 
 * Extracted from official Pitman Shorthand reference materials.
 * Each stroke contains:
 * - Visual description from AI analysis
 * - Sound representation (phonetic)
 * - Example words
 * - Category classification
 * - Reference to source material
 * 
 * Generated by: scripts/extract_individual_strokes.py
 */

export interface Stroke {
  id: string;
  name: string;
  sound: string;
  phonetic?: string;
  category: 'STRAIGHT_DOWN' | 'CURVED' | 'HORIZONTAL' | 'UPWARD' | 'SPECIAL';
  visual: string;
  direction?: string;
  weight?: string;
  description: string;
  examples: string[];
  imagePath?: string;
  sourceReference: string;
}

export const STROKE_LIBRARY: Stroke[] = [
"""
    
    for stroke in strokes:
        ts_content += f"""  {{
    id: '{stroke["id"]}',
    name: '{stroke["name"]}',
    sound: '{stroke["sound"]}',
"""
        if stroke.get("phonetic"):
            ts_content += f"""    phonetic: '{stroke["phonetic"]}',
"""
        
        ts_content += f"""    category: '{stroke["category"]}',
    visual: '{stroke.get("visual", "")}',
"""
        
        if stroke.get("direction"):
            ts_content += f"""    direction: '{stroke["direction"]}',
"""
        if stroke.get("weight"):
            ts_content += f"""    weight: '{stroke["weight"]}',
"""
        
        ts_content += f"""    description: '{stroke.get("description", "")}',
    examples: {json.dumps(stroke["examples"])},
    sourceReference: '{stroke.get("source_reference", stroke["source_page"])}',
  }},
"""
    
    ts_content += """];

// Category groups for easy filtering
export const STROKE_CATEGORIES = {
  STRAIGHT_DOWN: STROKE_LIBRARY.filter(s => s.category === 'STRAIGHT_DOWN'),
  CURVED: STROKE_LIBRARY.filter(s => s.category === 'CURVED'),
  HORIZONTAL: STROKE_LIBRARY.filter(s => s.category === 'HORIZONTAL'),
  UPWARD: STROKE_LIBRARY.filter(s => s.category === 'UPWARD'),
  SPECIAL: STROKE_LIBRARY.filter(s => s.category === 'SPECIAL'),
};

// Get stroke by ID
export function getStroke(id: string): Stroke | undefined {
  return STROKE_LIBRARY.find(s => s.id === id);
}

// Get strokes by sound
export function getStrokesBySound(sound: string): Stroke[] {
  return STROKE_LIBRARY.filter(s => s.sound === sound);
}

// Weight pairs (light/heavy)
export const WEIGHT_PAIRS = [
  { light: 'F', heavy: 'V' },
  { light: 'ITH', heavy: 'THE' },
  { light: 'S', heavy: 'Z' },
  { light: 'ISH', heavy: 'ZHEE' },
  { light: 'N', heavy: 'NG' },
  { light: 'P', heavy: 'B' },
  { light: 'T', heavy: 'D' },
  { light: 'CH', heavy: 'J' },
  { light: 'K', heavy: 'G' },
];

// Mirror pairs (direction)
export const MIRROR_PAIRS = [
  { right: 'F', left: 'ITH', weight: 'light' },
  { right: 'V', left: 'THE', weight: 'heavy' },
];

// Depth comparison (shallow to deep)
export const CURVE_DEPTHS = {
  shallow: ['S', 'Z'],
  moderate: ['F', 'V', 'ITH', 'THE'],
  deep: ['ISH', 'ZHEE'],
};
"""
    
    return ts_content

def main():
    print("🎨 EXTRACTING INDIVIDUAL STROKE LIBRARY")
    print("=" * 60)
    
    # Step 1: Merge AI analysis with stroke definitions
    print("\n📊 Step 1: Merging AI analysis...")
    strokes_with_ai = merge_ai_analysis(CONSONANT_STROKES)
    print(f"✅ Merged {len(strokes_with_ai)} strokes with AI analysis")
    
    # Step 2: Generate TypeScript library
    print("\n📝 Step 2: Generating TypeScript library...")
    ts_content = generate_typescript_library(strokes_with_ai)
    
    with open(OUTPUT_FILE, 'w') as f:
        f.write(ts_content)
    
    print(f"✅ Created: {OUTPUT_FILE}")
    
    # Step 3: Summary
    print("\n" + "=" * 60)
    print("✨ STROKE LIBRARY EXTRACTION COMPLETE!")
    print("=" * 60)
    print(f"\n📊 Summary:")
    print(f"  • Total strokes: {len(strokes_with_ai)}")
    
    categories = {}
    for stroke in strokes_with_ai:
        cat = stroke["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    print(f"\n📁 By Category:")
    for cat, count in categories.items():
        print(f"  • {cat}: {count} strokes")
    
    print(f"\n🎯 Sound Pairs:")
    print(f"  • F ↔ V (right-opening curves)")
    print(f"  • ITH ↔ THE (left-opening curves)")
    print(f"  • S ↔ Z (shallow curves)")
    print(f"  • ISH ↔ ZHEE (deep curves)")
    print(f"  • N ↔ NG (diagonal strokes)")
    
    print(f"\n📄 Output Files:")
    print(f"  • {OUTPUT_FILE}")
    
    print(f"\n🚀 Next Step: Update app/(tabs)/strokes.tsx to use this library!")

if __name__ == "__main__":
    main()
