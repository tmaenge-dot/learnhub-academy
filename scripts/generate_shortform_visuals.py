#!/usr/bin/env python3
"""
Update data/shortforms.ts with AI-extracted visual descriptions
This replaces generic descriptions like 'B stroke' with actual visual descriptions
"""

import json
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
MAPPING_FILE = PROJECT_ROOT / "data" / "shortform_stroke_mappings.json"
SHORTFORMS_TS = PROJECT_ROOT / "data" / "shortforms.ts"
STROKE_LIB_FILE = PROJECT_ROOT / "data" / "ai_analyzed_strokes.json"

# Load the mapping
with open(MAPPING_FILE, 'r') as f:
    mapping_data = json.load(f)

# Load stroke library for full visual descriptions
with open(STROKE_LIB_FILE, 'r') as f:
    stroke_lib = json.load(f)

consonants = stroke_lib.get('consonants', {})

def get_stroke_visual(stroke_id):
    """Get full visual description for a stroke"""
    lookup = {
        'ITH': 'ITH (thin)',
        'THE': 'THE (this)',
    }
    key = lookup.get(stroke_id, stroke_id)
    return consonants.get(key, {}).get('visual', f'{stroke_id} stroke')

def generate_visual_description(stroke_combo):
    """Generate complete visual description from stroke combination"""
    # Handle special cases
    if 'Dot above' in stroke_combo:
        return stroke_combo
    if 'Large hook' in stroke_combo:
        return stroke_combo
    if 'Stroke I' in stroke_combo:
        return 'Stroke I'
    if 'halved' in stroke_combo or 'disjoined' in stroke_combo:
        # Extract the base stroke
        parts = stroke_combo.split('(')
        if parts:
            base = parts[0].strip()
            modifier = '(' + parts[1] if len(parts) > 1 else ''
            base_visual = get_stroke_visual(base) if base in consonants or base in ['ITH', 'THE', 'ISH', 'ZHEE'] else base
            return f"{base_visual} {modifier}".strip()
        return stroke_combo
    
    # Handle combinations with +
    if '+' in stroke_combo:
        parts = [p.strip() for p in stroke_combo.split('+')]
        visuals = []
        for part in parts:
            # Handle modifiers in parentheses
            if '(' in part:
                base_parts = part.split('(')
                base = base_parts[0].strip()
                modifier = '(' + base_parts[1] if len(base_parts) > 1 else ''
                base_visual = get_stroke_visual(base)
                visuals.append(f"{base_visual} {modifier}".strip())
            else:
                visuals.append(get_stroke_visual(part))
        return ' + '.join(visuals)
    
    # Single stroke
    return get_stroke_visual(stroke_combo.strip())

# Read current shortforms.ts
with open(SHORTFORMS_TS, 'r') as f:
    content = f.read()

# Parse the mappings
mappings = mapping_data['mappings']

print("🔄 UPDATING SHORTFORMS WITH AI-EXTRACTED VISUALS")
print("=" * 60)
print(f"\n📊 Total mappings: {len(mappings)}")

# Generate updated entries
updated_count = 0
sample_updates = []

for word, stroke_combo in mappings.items():
    visual_desc = generate_visual_description(stroke_combo)
    
    # Store samples
    if updated_count < 10:
        sample_updates.append(f"  '{word}': {stroke_combo}")
        sample_updates.append(f"    → {visual_desc}")
    
    updated_count += 1

print(f"\n✨ Sample Visual Descriptions:")
for sample in sample_updates[:20]:
    print(sample)

print(f"\n✅ Generated {updated_count} visual descriptions")
print(f"\n💡 Visual description examples:")
print(f"  • 'be' → {generate_visual_description(mappings['be'])}")
print(f"  • 'been' → {generate_visual_description(mappings['been'])}")
print(f"  • 'with' → {generate_visual_description(mappings['with'])}")
print(f"  • 'them' → {generate_visual_description(mappings['them'])}")
print(f"  • 'should' → {generate_visual_description(mappings['should'])}")

print(f"\n📄 Ready to update: {SHORTFORMS_TS}")
print(f"\n🎯 Next: Apply these descriptions to shortforms.ts file")

# Save the expanded visual descriptions for reference
expanded_mappings = {
    word: {
        "stroke_combo": stroke_combo,
        "visual_description": generate_visual_description(stroke_combo)
    }
    for word, stroke_combo in mappings.items()
}

output_file = PROJECT_ROOT / "data" / "shortforms_expanded_visuals.json"
with open(output_file, 'w') as f:
    json.dump(expanded_mappings, f, indent=2)

print(f"\n💾 Saved expanded visuals to: {output_file}")

if __name__ == "__main__":
    pass
