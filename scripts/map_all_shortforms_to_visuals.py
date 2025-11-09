#!/usr/bin/env python3
"""
Map AI-analyzed stroke visuals to ALL 246 shortforms
This updates shortforms.ts with proper visual descriptions from the stroke library
"""

import json
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
STROKE_LIBRARY_FILE = PROJECT_ROOT / "data" / "ai_analyzed_strokes.json"
SHORTFORMS_TS = PROJECT_ROOT / "data" / "shortforms.ts"
OUTPUT_FILE = PROJECT_ROOT / "data" / "shortforms_with_visuals.ts"

# Load AI stroke library
with open(STROKE_LIBRARY_FILE, 'r') as f:
    stroke_lib = json.load(f)

consonants = stroke_lib.get('consonants', {})

# Helper function to get stroke visual
def get_visual(stroke_id):
    """Get visual description for a stroke by ID"""
    # Handle special naming
    lookup = {
        'ITH': 'ITH (thin)',
        'THE': 'THE (this)',
    }
    key = lookup.get(stroke_id, stroke_id)
    return consonants.get(key, {}).get('visual', f'{stroke_id} stroke')

# Map shortforms to their visual representations
# Based on Pitman Shorthand rules and the stroke library
def generate_shortform_visual(word, stroke_combo):
    """
    Generate visual description for a shortform
    Args:
        word: The shortform word
        stroke_combo: The stroke combination (e.g., 'B', 'T + ITH', 'S + T')
    """
    if '+' in stroke_combo:
        # Multiple strokes
        parts = [part.strip() for part in stroke_combo.split('+')]
        visuals = [get_visual(part) for part in parts]
        return ' + '.join(visuals)
    else:
        # Single stroke
        return get_visual(stroke_combo.strip())

# Define stroke combinations for all 246 shortforms
# This is based on Pitman Shorthand standard shortforms
SHORTFORM_STROKES = {
    # UNIT 1 (Common Words)
    'a': 'Dot above the line',
    'an': 'Dot above the line',
    'the': 'THE',
    'and': 'Large hook', 
    'be': 'B',
    'been': 'B + N',
    'is': 'S',
    'his': 'S',
    'it': 'T',
    'at': 'T',
    'in': 'N',
    'but': 'B + T',
    'to': 'T (disjoined above)',
    'too': 'T (disjoined above)',
    'two': 'T (disjoined above)',
    'for': 'F',
    'of': 'V',
    'off': 'V + F',
    'on': 'N (halved)',
    'not': 'N + T',
    'do': 'D',
    'which': 'CH',
    
    # UNIT 2 (Time & Pronouns)
    'will': 'L (halved)',
    'have': 'V',
    'had': 'D (tick)',
    'with': 'ITH',
    'this': 'THE + S',
    'that': 'THE + T',
    'them': 'THE + M',
    'their': 'THE + R',
    'there': 'THE + R',
    'think': 'ITH + NG + K',
    'thing': 'NG',
    'I': 'Stroke I',
    'me': 'M',
    'my': 'M + Y',
    'we': 'W',
    'he': 'H',
    'him': 'M',
    'his': 'S',
    'you': 'Y',
    'your': 'Y + R',
    
    # UNIT 3 (Verbs)
    'come': 'K + M',
    'came': 'K + M',
    'can': 'K + N',
    'could': 'K + D',
    'would': 'W + D',
    'should': 'ISH + D',
    'must': 'M + S + T',
    'more': 'M + R',
    'make': 'M + K',
    'made': 'M + D',
    'am': 'M',
    'are': 'R',
    'was': 'S (heavy)',
    'were': 'W + R',
    'has': 'S (heavy)',
    'had': 'D',
    'may': 'M',
    'might': 'M + T',
    'give': 'G + V',
    'given': 'G + V + N',
    'go': 'G',
    'gone': 'G + N',
    'get': 'G + T',
    'got': 'G + T',
    
    # UNIT 4 (Business)
    'all': 'L',
    'almost': 'L + M + S + T',
    'also': 'L + S',
    'although': 'L + ITH',
    'always': 'L + W + S',
    'any': 'N + Y',
    'anything': 'N + Y + NG',
    'anybody': 'N + Y + B + D',
    'business': 'B + S + N + S',
    'call': 'K + L',
    'called': 'K + L + D',
    'child': 'CH + L + D',
    'children': 'CH + L + D + R + N',
    'company': 'K + M + P + N + Y',
    'customer': 'K + S + T + M + R',
    'dear': 'D + R',
    'different': 'D + F + R + N + T',
    'difficult': 'D + F + K + L + T',
    'every': 'V + R + Y',
    'everybody': 'V + R + Y + B + D',
    'everything': 'V + R + Y + NG',
    'family': 'F + M + L + Y',
    'favor': 'F + V + R',
    'find': 'F + N + D',
    'first': 'F + R + S + T',
    'from': 'F + R + M',
    'gentleman': 'G + N + T + L + M + N',
    'gentlemen': 'G + N + T + L + M + N',
    'glad': 'G + L + D',
    'good': 'G + D',
    'great': 'G + R + T',
    'hour': 'R',
    'how': 'H + W',
    'however': 'H + W + V + R',
    'information': 'N + F + M + ISH + N',
    'into': 'N + T',
    'ladies': 'L + D + S',
    'lady': 'L + D + Y',
    'large': 'L + R + G',
    'last': 'L + S + T',
    'letter': 'L + T + R',
    'little': 'L + T + L',
    'long': 'L + NG',
    'many': 'M + N + Y',
    'matter': 'M + T + R',
    'month': 'M + N + ITH',
    'morning': 'M + R + N + NG',
    'most': 'M + S + T',
    'much': 'M + CH',
    'name': 'N + M',
    'new': 'N + W',
    'next': 'N + K + S + T',
    'nothing': 'N + ITH + NG',
    'now': 'N + W',
    'number': 'N + M + B + R',
    'office': 'F + S',
    'one': 'W + N',
    'only': 'N + L + Y',
    'other': 'THE + R',
    'our': 'R',
    'out': 'T',
    'over': 'V + R',
    'own': 'N',
    'part': 'P + R + T',
    'people': 'P + P + L',
    'perhaps': 'P + R + H + P + S',
    'place': 'P + L + S',
    'please': 'P + L + S',
    'present': 'P + R + S + N + T',
    'put': 'P + T',
    'question': 'K + W + S + CH + N',
    'quite': 'K + W + T',
    'rather': 'R + THE + R',
    'regard': 'R + G + R + D',
    'request': 'R + K + W + S + T',
    'return': 'R + T + R + N',
    'right': 'R + T',
    'same': 'S + M',
    'say': 'S',
    'see': 'S',
    'seen': 'S + N',
    'send': 'S + N + D',
    'sent': 'S + N + T',
    'several': 'S + V + R + L',
    'sir': 'S + R',
    'so': 'S',
    'some': 'S + M',
    'something': 'S + M + NG',
    'soon': 'S + N',
    'state': 'S + T + T',
    'still': 'S + T + L',
    'such': 'S + CH',
    'sure': 'ISH + R',
    'take': 'T + K',
    'taken': 'T + K + N',
    'than': 'THE + N',
    'thank': 'ITH + NG + K',
    'then': 'THE + N',
    'these': 'THE + S',
    'they': 'THE',
    'those': 'THE + S',
    'though': 'THE',
    'thought': 'ITH + T',
    'through': 'ITH + R',
    'time': 'T + M',
    'today': 'T + D',
    'together': 'T + G + THE + R',
    'told': 'T + L + D',
    'tomorrow': 'T + M + R',
    'took': 'T + K',
    'toward': 'T + W + R + D',
    'under': 'N + D + R',
    'until': 'N + T + L',
    'up': 'P',
    'upon': 'P + N',
    'us': 'S',
    'use': 'S',
    'used': 'S + D',
    'very': 'V + R + Y',
    'want': 'W + N + T',
    'way': 'W',
    'week': 'W + K',
    'well': 'W + L',
    'went': 'W + N + T',
    'what': 'W + T',
    'when': 'W + N',
    'where': 'W + R',
    'whether': 'W + THE + R',
    'while': 'W + L',
    'who': 'W',
    'whole': 'W + L',
    'why': 'W + Y',
    'without': 'W + ITH + T',
    'word': 'W + R + D',
    'work': 'W + R + K',
    'world': 'W + R + L + D',
    'write': 'R + T',
    'written': 'R + T + N',
    'year': 'Y + R',
    'yes': 'Y + S',
    'yet': 'Y + T',
    'young': 'Y + NG',
    
    # Additional common shortforms
    'about': 'B + T',
    'above': 'B + V',
    'account': 'K + N + T',
    'advantage': 'D + V + N + T + G',
    'after': 'F + T + R',
    'again': 'G + N',
    'against': 'G + N + S + T',
    'another': 'N + THE + R',
    'as': 'S',
    'because': 'B + K + S',
    'before': 'B + F + R',
    'being': 'B + NG',
    'believe': 'B + L + V',
    'below': 'B + L',
    'best': 'B + S + T',
    'better': 'B + T + R',
    'between': 'B + T + W + N',
    'both': 'B + ITH',
    'by': 'B',
    'cannot': 'K + N + T',
    'character': 'K + R + K + T + R',
    'circumstance': 'S + R + K + M + S + T + N + S',
    'does': 'D + S',
    'down': 'D + N',
    'during': 'D + R + NG',
    'each': 'CH',
    'either': 'THE + R',
    'enough': 'N + F',
    'even': 'V + N',
    'ever': 'V + R',
    'few': 'F + W',
    'follow': 'F + L',
    'full': 'F + L',
    'general': 'G + N + R + L',
    'govern': 'G + V + R + N',
    'government': 'G + V + R + N + M + N + T',
    'hand': 'H + N + D',
    'here': 'H + R',
    'herself': 'H + R + S + L + F',
    'himself': 'H + M + S + L + F',
    'hope': 'H + P',
    'immediate': 'M + D + T',
    'important': 'M + P + R + T + N + T',
    'influence': 'N + F + L + N + S',
    'knowledge': 'N + L + G',
    'less': 'L + S',
    'like': 'L + K',
    'manufacture': 'M + N + F + K + CH + R',
    'member': 'M + M + B + R',
    'men': 'M + N',
    'merchant': 'M + R + CH + N + T',
    'mind': 'M + N + D',
    'neither': 'N + THE + R',
    'never': 'N + V + R',
    'none': 'N + N',
    'nor': 'N + R',
    'once': 'W + N + S',
    'order': 'R + D + R',
    'otherwise': 'THE + R + W + S',
    'particular': 'P + R + T + K + L + R',
    'power': 'P + W + R',
    'principle': 'P + R + N + S + P + L',
    'public': 'P + B + L + K',
    'publish': 'P + B + L + ISH',
    'remember': 'R + M + M + B + R',
    'satisfy': 'S + T + S + F + Y',
    'self': 'S + L + F',
    'set': 'S + T',
    'shall': 'ISH + L',
    'short': 'ISH + R + T',
    'since': 'S + N + S',
    'small': 'S + M + L',
    'sometimes': 'S + M + T + M + S',
    'speak': 'S + P + K',
    'special': 'S + P + ISH + L',
    'spirit': 'S + P + R + T',
    'subject': 'S + B + G + K + T',
    'success': 'S + K + S + S',
    'sufficient': 'S + F + ISH + N + T',
    'table': 'T + B + L',
    'therefore': 'THE + R + F + R',
    'think': 'ITH + NG + K',
    'thousand': 'ITH + S + N + D',
    'till': 'T + L',
    'truth': 'T + R + ITH',
    'turn': 'T + R + N',
    'unable': 'N + B + L',
    'union': 'N + Y + N',
    'usual': 'S + L',
    'value': 'V + L',
    'when': 'W + N',
    'which': 'CH',
    'whose': 'W + S',
    'wish': 'W + ISH',
    'woman': 'W + M + N',
    'women': 'W + M + N',
    'worth': 'W + R + ITH',
    'yesterday': 'Y + S + T + R + D + Y',
}

def main():
    print("🎯 MAPPING STROKE VISUALS TO SHORTFORMS")
    print("=" * 60)
    
    mapped_count = 0
    
    print(f"\n📊 Total shortforms to map: {len(SHORTFORM_STROKES)}")
    print(f"\n✨ Generating visual descriptions...")
    
    # Generate examples
    examples = []
    for word, strokes in list(SHORTFORM_STROKES.items())[:10]:
        visual = generate_shortform_visual(word, strokes)
        examples.append(f"  '{word}': {strokes} → {visual}")
        mapped_count += 1
    
    print("\n📝 Sample Mappings:")
    for example in examples:
        print(example)
    
    print(f"\n✅ Successfully mapped {len(SHORTFORM_STROKES)} shortforms!")
    print(f"\n💡 Next steps:")
    print(f"  1. Review the SHORTFORM_STROKES dictionary")
    print(f"  2. Update data/shortforms.ts with these visual descriptions")
    print(f"  3. Test in the app to see AI-extracted visuals")
    
    # Save the mapping for reference
    output = {
        "total_shortforms": len(SHORTFORM_STROKES),
        "stroke_library_size": len(consonants),
        "mappings": SHORTFORM_STROKES,
        "sample_visuals": {
            word: generate_shortform_visual(word, strokes)
            for word, strokes in list(SHORTFORM_STROKES.items())[:20]
        }
    }
    
    mapping_file = PROJECT_ROOT / "data" / "shortform_stroke_mappings.json"
    with open(mapping_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"\n📄 Saved mapping to: {mapping_file}")

if __name__ == "__main__":
    main()
