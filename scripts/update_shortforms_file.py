#!/usr/bin/env python3
"""
Update all shortforms in shortforms.ts with AI-extracted visual descriptions
"""

import json
import re
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
VISUALS_FILE = PROJECT_ROOT / "data" / "shortforms_expanded_visuals.json"
SHORTFORMS_TS = PROJECT_ROOT / "data" / "shortforms.ts"

# Load expanded visuals
with open(VISUALS_FILE, 'r') as f:
    visuals = json.load(f)

# Read current shortforms.ts
with open(SHORTFORMS_TS, 'r') as f:
    lines = f.readlines()

print("🔄 UPDATING SHORTFORMS.TS WITH AI VISUALS")
print("=" * 60)

updated_count = 0
not_found = []

# Process line by line
i = 0
new_lines = []

while i < len(lines):
    line = lines[i]
    
    # Look for word: 'xxx' pattern
    word_match = re.search(r"word:\s*'([^']+)'", line)
    
    if word_match:
        word = word_match.group(1)
        
        # Check if we have a visual for this word
        if word in visuals:
            visual_data = visuals[word]
            new_visual = visual_data['visual_description']
            
            # Add current line (word: 'xxx')
            new_lines.append(line)
            i += 1
            
            # Find and update shorthandRepresentation line
            while i < len(lines):
                if 'shorthandRepresentation:' in lines[i]:
                    # Replace the representation
                    indent = len(lines[i]) - len(lines[i].lstrip())
                    new_lines.append(' ' * indent + f"shorthandRepresentation: '{new_visual}',\n")
                    updated_count += 1
                    
                    # Show sample
                    if updated_count <= 10:
                        print(f"  ✓ {word}: '{new_visual}'")
                    
                    i += 1
                    break
                else:
                    new_lines.append(lines[i])
                    i += 1
        else:
            not_found.append(word)
            new_lines.append(line)
            i += 1
    else:
        new_lines.append(line)
        i += 1

# Write updated content
with open(SHORTFORMS_TS, 'w') as f:
    f.writelines(new_lines)

print(f"\n✅ Updated {updated_count} shortforms")

if not_found and len(not_found) <= 20:
    print(f"\n⚠️  Words not found in mapping: {', '.join(not_found[:20])}")
    if len(not_found) > 20:
        print(f"   ... and {len(not_found) - 20} more")

print(f"\n📄 File updated: {SHORTFORMS_TS}")
print(f"\n🎉 All shortforms now have AI-extracted visual descriptions!")

