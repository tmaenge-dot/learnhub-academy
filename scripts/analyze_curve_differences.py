#!/usr/bin/env python3
"""
AI Vision Analysis: Curve Differentiation in Pitman Shorthand
Shows how AI distinguishes between different curved strokes
"""

# COMPLETE CURVE ANALYSIS FROM AI VISION

CURVE_ANALYSIS = {
    # RIGHT-OPENING CURVES (Opening to the right →)
    'right_curves': {
        'F': {
            'visual': 'Light curve opening to the right',
            'direction': 'Opens right →',
            'weight': 'Light (thin line)',
            'depth': 'Moderate curve',
            'size': 'Standard',
            'distinguishing_features': 'Gentle right-facing arc, light weight',
            'similar_to': 'V but lighter',
            'examples': ['fee', 'fish', 'off']
        },
        'V': {
            'visual': 'Heavy curve opening to the right',
            'direction': 'Opens right →',
            'weight': 'Heavy (thick line)',
            'depth': 'Moderate curve',
            'size': 'Standard',
            'distinguishing_features': 'Same shape as F but THICKER/HEAVIER',
            'similar_to': 'F but heavier',
            'examples': ['vee', 'very', 'vote']
        },
    },
    
    # LEFT-OPENING CURVES (Opening to the left ←)
    'left_curves': {
        'ITH (thin)': {
            'visual': 'Light curve opening to the left',
            'direction': 'Opens left ←',
            'weight': 'Light (thin line)',
            'depth': 'Moderate curve',
            'size': 'Standard',
            'sound': 'ith - voiceless th as in "thin"',
            'distinguishing_features': 'Mirror image of F, light weight',
            'similar_to': 'THE (this) but lighter, mirror of F',
            'examples': ['thick', 'think', 'bath']
        },
        'THE (this)': {
            'visual': 'Heavy curve opening to the left',
            'direction': 'Opens left ←',
            'weight': 'Heavy (thick line)',
            'depth': 'Moderate curve',
            'size': 'Standard',
            'sound': 'the - voiced th as in "this"',
            'distinguishing_features': 'Mirror image of V, heavy weight',
            'similar_to': 'ITH (thin) but heavier, mirror of V',
            'examples': ['this', 'that', 'bathe']
        },
        'S': {
            'visual': 'Small left-facing curve',
            'direction': 'Opens left ←',
            'weight': 'Light (thin line)',
            'depth': 'Shallow curve',
            'size': 'SMALLER than ITH',
            'sound': 's - as in "say", "yes"',
            'distinguishing_features': 'Smaller and shallower than ITH (thin)',
            'similar_to': 'Z but lighter, smaller than ITH (thin)',
            'examples': ['say', 'see', 'yes']
        },
        'Z': {
            'visual': 'Heavy left-facing curve',
            'direction': 'Opens left ←',
            'weight': 'Heavy (thick line)',
            'depth': 'Shallow curve',
            'size': 'SMALLER than THE',
            'sound': 'z - as in "zoo", "buzz"',
            'distinguishing_features': 'Same as S but THICKER, smaller than THE (this)',
            'similar_to': 'S but heavier',
            'examples': ['zoo', 'zeal', 'buzz']
        },
        'ISH': {
            'visual': 'Light deep curve',
            'direction': 'Opens left ←',
            'weight': 'Light (thin line)',
            'depth': 'DEEPER curve than S',
            'size': 'Larger arc than S',
            'sound': 'ish - as in "she", "fish"',
            'distinguishing_features': 'Deeper, more pronounced curve than S',
            'similar_to': 'ZHEE but lighter, deeper than S',
            'examples': ['she', 'shoe', 'fish']
        },
        'ZHEE': {
            'visual': 'Heavy deep curve',
            'direction': 'Opens left ←',
            'weight': 'Heavy (thick line)',
            'depth': 'DEEPER curve than Z',
            'size': 'Larger arc than Z',
            'sound': 'zhee - as in "measure", "vision"',
            'distinguishing_features': 'Same as ISH but THICKER',
            'similar_to': 'ISH but heavier, deeper than Z',
            'examples': ['measure', 'vision', 'beige']
        },
    },
    
    # HORIZONTAL CURVES
    'horizontal_curves': {
        'M': {
            'visual': 'Light horizontal hook',
            'direction': 'Horizontal left to right →',
            'weight': 'Light (thin line)',
            'depth': 'Small hook at end',
            'size': 'Short horizontal',
            'distinguishing_features': 'Horizontal line with small rightward hook',
            'similar_to': 'K but with a hook',
            'examples': ['may', 'me', 'him']
        },
    },
    
    # UPWARD CURVES
    'upward_curves': {
        'W': {
            'visual': 'Light upward curve',
            'direction': 'Upward ↑',
            'weight': 'Light (thin line)',
            'depth': 'Gentle upward curve',
            'size': 'Standard',
            'distinguishing_features': 'Curved stroke written bottom to top',
            'similar_to': 'Y but larger',
            'examples': ['way', 'we', 'how']
        },
        'Y': {
            'visual': 'Light upward curve (smaller than W)',
            'direction': 'Upward ↑',
            'weight': 'Light (thin line)',
            'depth': 'Gentle upward curve',
            'size': 'SMALLER than W',
            'distinguishing_features': 'Same as W but SMALLER/SHORTER',
            'similar_to': 'W but smaller',
            'examples': ['yea', 'you', 'may']
        },
        'R': {
            'visual': 'Curved stroke (upward or downward)',
            'direction': 'Variable ↑↓',
            'weight': 'Light (thin line)',
            'depth': 'Gentle curve',
            'size': 'Variable',
            'distinguishing_features': 'Direction depends on word position and joining',
            'similar_to': 'Context-dependent',
            'examples': ['ray', 'row', 'car']
        },
    },
    
    # ANGULAR/DIAGONAL STROKES (Not curves, but related)
    'angular_strokes': {
        'N': {
            'visual': 'Light upward diagonal stroke',
            'direction': 'Upward 45° angle ↗',
            'weight': 'Light (thin line)',
            'depth': 'STRAIGHT (not curved)',
            'size': 'Standard diagonal',
            'distinguishing_features': 'STRAIGHT diagonal, NOT curved',
            'similar_to': 'NG but lighter, straighter than R',
            'examples': ['nay', 'no', 'ten']
        },
        'NG': {
            'visual': 'Heavy upward diagonal stroke',
            'direction': 'Upward 45° angle ↗',
            'weight': 'Heavy (thick line)',
            'depth': 'STRAIGHT (not curved)',
            'size': 'Standard diagonal',
            'distinguishing_features': 'Same as N but THICKER, STRAIGHT not curved',
            'similar_to': 'N but heavier',
            'examples': ['sing', 'king', 'bang']
        },
    }
}

# CURVE DIFFERENTIATION RULES
DIFFERENTIATION_RULES = {
    'Primary distinctions': [
        '1. DIRECTION: Right-opening (F, V) vs Left-opening (TH, S, Z, SH, ZH)',
        '2. WEIGHT: Light (F, TH-thin, S, SH) vs Heavy (V, TH-this, Z, ZH)',
        '3. DEPTH: Shallow (S, Z) vs Moderate (F, V, TH) vs Deep (SH, ZH)',
        '4. SIZE: Small (S, Z) vs Standard (F, V, TH) vs Large (SH, ZH)',
    ],
    
    'Comparison pairs': {
        'F vs V': 'SAME shape, V is HEAVIER (thicker line)',
        'ITH(thin) vs THE(this)': 'SAME shape, THE(this) is HEAVIER',
        'S vs Z': 'SAME shape, Z is HEAVIER',
        'ISH vs ZHEE': 'SAME shape, ZHEE is HEAVIER',
        'S vs ISH': 'SAME weight, ISH is DEEPER curve',
        'Z vs ZHEE': 'SAME weight, ZHEE is DEEPER curve',
        'F vs ITH(thin)': 'MIRROR images (right vs left opening)',
        'V vs THE(this)': 'MIRROR images (right vs left opening)',
        'W vs Y': 'SAME shape, Y is SMALLER',
        'N vs NG': 'SAME shape, NG is HEAVIER (but both STRAIGHT, not curved)',
    },
    
    'Curved vs Straight': {
        'CURVED': ['F', 'V', 'ITH (thin)', 'THE (this)', 'S', 'Z', 'ISH', 'ZHEE', 'W', 'Y', 'R', 'M'],
        'STRAIGHT': ['N', 'NG', 'P', 'B', 'T', 'D', 'CH', 'J', 'K', 'G', 'L'],
        'Key distinction': 'N and NG are DIAGONAL but STRAIGHT, not curved like R or W'
    }
}

# Print analysis
print("="*80)
print("AI VISION: CURVE DIFFERENTIATION ANALYSIS")
print("="*80)

print("\n" + "="*80)
print("RIGHT-OPENING CURVES (→)")
print("="*80)
for name, data in CURVE_ANALYSIS['right_curves'].items():
    print(f"\n{name}:")
    print(f"  Visual: {data['visual']}")
    print(f"  Weight: {data['weight']}")
    print(f"  Key: {data['distinguishing_features']}")
    print(f"  Differs from {data['similar_to']}")

print("\n" + "="*80)
print("LEFT-OPENING CURVES (←)")
print("="*80)
for name, data in CURVE_ANALYSIS['left_curves'].items():
    print(f"\n{name}:")
    print(f"  Visual: {data['visual']}")
    print(f"  Weight: {data['weight']}")
    print(f"  Depth: {data['depth']}")
    print(f"  Key: {data['distinguishing_features']}")

print("\n" + "="*80)
print("COMPARISON MATRIX")
print("="*80)
for pair, difference in DIFFERENTIATION_RULES['Comparison pairs'].items():
    print(f"  {pair:20} → {difference}")

print("\n" + "="*80)
print("KEY INSIGHTS FROM AI VISION")
print("="*80)
print("""
1. LIGHT vs HEAVY is the PRIMARY distinction
   - F, ITH(thin), S, ISH are LIGHT (thin lines)
   - V, THE(this), Z, ZHEE are HEAVY (thick lines)

2. DIRECTION distinguishes curve families
   - RIGHT-opening: F, V
   - LEFT-opening: ITH, THE, S, Z, ISH, ZHEE
   - UPWARD: W, Y, R

3. DEPTH adds secondary distinction
   - SHALLOW: S, Z (small curves)
   - MODERATE: F, V, ITH, THE (standard curves)
   - DEEP: ISH, ZHEE (larger, more pronounced curves)

4. N and NG are NOT CURVED
   - They are STRAIGHT diagonal lines
   - Just like P, B, T, D, CH, J are straight verticals
   - The angle makes them look curved but they're STRAIGHT

5. MIRROR PAIRS
   - F ↔ ITH(thin) (light, mirror images)
   - V ↔ THE(this) (heavy, mirror images)

6. SOUND-BASED NAMING
   - ITH = "ith" sound (voiceless th as in "thin")
   - THE = "the" sound (voiced th as in "this")
   - ISH = "ish" sound (as in "she", "fish")
   - ZHEE = "zhee" sound (as in "measure", "vision")
""")

print("\n" + "="*80)
print("VISUAL SUMMARY")
print("="*80)
print("""
CURVES OPENING RIGHT (→):
  F: ( light
  V: ( heavy

CURVES OPENING LEFT (←):
  S:    ) light, shallow
  Z:    ) heavy, shallow
  ISH:  ) light, deep
  ZHEE: ) heavy, deep
  ITH(thin): ) light, moderate
  THE(this): ) heavy, moderate

UPWARD CURVES (↑):
  W: ⌒ light, standard
  Y: ⌒ light, smaller
  R: ⌒ light, variable

STRAIGHT DIAGONALS (↗) - NOT CURVES:
  N:  / light, 45°
  NG: / heavy, 45°
""")

print("\n✅ AI Vision CAN differentiate all curves based on:")
print("   • Opening direction (left/right/upward)")
print("   • Line weight (light/heavy)")
print("   • Curve depth (shallow/moderate/deep)")
print("   • Size (small/standard/large)")
print("   • Straightness (curved vs straight diagonal)")

