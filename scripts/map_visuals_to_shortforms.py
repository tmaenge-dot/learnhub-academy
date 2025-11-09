#!/usr/bin/env python3
"""
Update shortforms.ts with AI-analyzed visual stroke descriptions
This maps the stroke analysis to each shortform entry
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
STROKE_DB = BASE_DIR / "data" / "ai_analyzed_strokes.json"

# Load AI-analyzed stroke data
with open(STROKE_DB, 'r') as f:
    stroke_data = json.load(f)

consonants = stroke_data['consonants']

# Mapping of shortform words to their visual representations
# Based on AI analysis of reference pages
SHORTFORM_VISUAL_MAPPINGS = {
    'be': consonants['B']['visual'],
    'it': consonants['T']['visual'],
    'do': consonants['D']['visual'],
    'which': consonants['CH']['visual'],
    'to': f"{consonants['T']['visual']} (disjoined above line)",
    'too': f"{consonants['T']['visual']} (disjoined above line)",
    'two': f"{consonants['T']['visual']} (disjoined above line)",
    'but': consonants['B']['visual'],
    'who': consonants['W']['visual'],
    'the': "TH stroke - Heavy curve opening to the left",
    'is': consonants['S']['visual'],
    'his': consonants['S']['visual'],
    
    # Unit 2
    'have': consonants['V']['visual'],
    'think': "TH stroke (thin) - Light curve opening to the left",
    'them': "TH stroke + M - Heavy curve with light horizontal hook",
    'than': "TH stroke + N - Heavy curve with upward diagonal",
    
    # Unit 3
    'come': consonants['K']['visual'],
    'give': consonants['G']['visual'],
    'given': consonants['G']['visual'],
    'him': consonants['M']['visual'],
    'thing': consonants['NG']['visual'],
    'we': consonants['W']['visual'],
    
    # Common shortforms
    'for': consonants['F']['visual'],
    'an': "TH stroke above the line",
    'of': f"{consonants['T']['visual']} (above line)",
    'all': f"{consonants['B']['visual']} (above line)",
    'as': f"{consonants['S']['visual']} (above line)",
    'has': f"{consonants['S']['visual']} (above line)",
    'had': f"{consonants['D']['visual']} (above line)",
    'with': "Half curve of S above the line",
    'and': "Light who stroke above the line",
    
    # More common ones
    'can': f"{consonants['K']['visual']} (above line)",
    'go': f"{consonants['G']['visual']} (above line)",
    'in': f"{consonants['N']['visual']} (above line)",
    'any': f"{consonants['N']['visual']} (above line)",
    
    'are': "Upward R stroke",
    'our': "Upward R stroke through the line",
    'hour': "Upward R stroke through the line",
    'your': "Downward R stroke on the line",
    'year': "Downward R stroke through the line",
}

print("=" * 70)
print("AI VISUAL STROKE MAPPINGS FOR SHORTFORMS")
print("=" * 70)
print(f"\n📊 Total mappings created: {len(SHORTFORM_VISUAL_MAPPINGS)}")
print("\nSample mappings:")
print("-" * 70)

for word, visual in list(SHORTFORM_VISUAL_MAPPINGS.items())[:10]:
    print(f"  {word:12} → {visual}")

print("\n" + "=" * 70)
print("NEXT STEP")
print("=" * 70)
print("Update shortforms.ts with these visual descriptions")
print("Each entry will now show:")
print("  - Word (e.g., 'be')")
print("  - Visual representation (e.g., 'Heavy straight line written downward')")
print("  - Detailed description with direction and weight")
print("  - Reference page number")

# Generate TypeScript update snippet
print("\n" + "=" * 70)
print("SAMPLE TYPESCRIPT ENTRIES")
print("=" * 70)
print("""
{
  id: 'u1_sf1',
  word: 'be',
  shorthandRepresentation: 'Heavy straight line written downward',
  description: 'Single B stroke: Thick vertical stroke from top to bottom. Visual: Heavy downward line.',
  category: 'common',
  source: 'Unit 1 - Page 9',
},
{
  id: 'u1_sf5',
  word: 'to',
  shorthandRepresentation: 'Light straight line written downward (disjoined above line)',
  description: 'Disjoined T stroke: Straight vertical stroke placed above the writing line.',
  category: 'common',
  source: 'Unit 1 - Page 13',
}
""")

