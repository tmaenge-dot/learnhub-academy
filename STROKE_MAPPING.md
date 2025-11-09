# Shortform to Stroke Mapping

This document maps each shortform to its exact stroke representation based on the Pitman Shorthand textbook.

## Unit 1 - Stroke Foundation

### 24 Consonants (from textbook)
The textbook shows **24 consonants** organized by stroke type.

### Straight Downstrokes (6 strokes covered in Unit 1):
1. **P** - Light downward left curve
2. **B** - Heavy downward left curve (thicker than P)
3. **T** - Light straight downward stroke
4. **D** - Heavy straight downward stroke (thicker than T)
5. **CH** - Light deep downward curve
6. **J** - Heavy deep downward curve (thicker than CH)

### 12 Vowels:
- **Dots and dashes** in 3 positions
- **4 Diphthongs** (shown in circle diagram)

### Phonetic Names (from table):
- P, B, T, D, CH, J with corresponding sign/phonetic representations
- Examples: pay, bay, tea, day, chay, jay

---

## Unit 1 Shortforms - Stroke Breakdown

### 1. **be**
- **Stroke Used**: B (Heavy downward left curve)
- **Visual**: ( - Thick curved line going down and to the left
- **From Table**: Row 2 - "bay" sound
- **Stroke ID**: c2

### 2. **it**  
- **Stroke Used**: T (Light straight downward stroke)
- **Visual**: | - Thin straight vertical line
- **From Table**: Row 3 - "tea" sound
- **Stroke ID**: c3

### 3. **do**
- **Stroke Used**: D (Heavy straight downward stroke)
- **Visual**: ‖ - Thick straight vertical line (thicker than T)
- **From Table**: Row 4 - "day" sound  
- **Stroke ID**: c4

### 4. **which**
- **Stroke Used**: CH (Light deep downward curve)
- **Visual**: ⌢ - Light curved line
- **From Table**: Row 5 - "chay" sound
- **Stroke ID**: c5

### 5-7. **to / too / two**
- **Stroke Used**: Disjoined T
- **Visual**: | - Light straight stroke placed above the line (not joined)
- **From Table**: T stroke from row 3, but disjoined
- **Stroke ID**: c3 (disjoined)

### 8. **but**
- **Stroke Used**: B (same as "be")
- **Visual**: ( - Heavy downward left curve
- **From Table**: Row 2 - "bay" sound (context determines meaning)
- **Stroke ID**: c2

### 9. **who**
- **Stroke Used**: W
- **Visual**: Small circle/dot
- **Note**: W is part of the 24 consonants but not in straight downstrokes section
- **Stroke ID**: Special

### 10. **the**
- **Stroke Used**: TH
- **Visual**: Horizontal line
- **Note**: TH is part of the 24 consonants but not in straight downstrokes section
- **Stroke ID**: Special

### 11-12. **is / his**
- **Stroke Used**: S
- **Visual**: Small forward curve
- **Note**: S is part of the 24 consonants but not in straight downstrokes section
- **Stroke ID**: Special

### 13-14. **object / objected**
- **Stroke Used**: Special outline
- **Visual**: Specific combination for "object" family
- **Stroke ID**: Special compound

---

## Stroke Characteristics Guide

### Light vs Heavy Strokes
- **Light strokes** = Thin lines (voiceless consonants: T, P, K, CH, S, TH-thin, SH, F)
- **Heavy strokes** = Thick lines (voiced consonants: D, B, G, J, Z, TH-this, ZH, V)

### Stroke Directions
- **Downward** = | (T, D, P, B)
- **Upward** = ∩ ∪ (K, G, CH, J)
- **Horizontal** = — (TH)
- **Forward curve** = ~ (S, Z)
- **Backward curve** = ⊢ (SH, ZH)

### Special Markings
- **Disjoined** = Stroke written separately from others
- **Positioned above line** = Higher placement indicates special meaning
- **Circle/dot** = W sound or vowel indication

---

## Visual Representation System

For AI recognition, each stroke can be identified by:

1. **Direction** (up/down/horizontal/curved)
2. **Thickness** (light/heavy)
3. **Length** (short/medium/long)
4. **Position** (on line/above line/below line)
5. **Joining** (joined to next stroke / disjoined)

Example for **"it"**:
```
Stroke: T
Direction: Downward vertical
Thickness: Light (thin)
Length: Medium
Position: On the line
Visual: |
```

Example for **"do"**:
```
Stroke: D  
Direction: Downward vertical
Thickness: Heavy (thick)
Length: Medium
Position: On the line
Visual: ‖ (thicker than T)
```

---

This mapping will be used for:
1. **AI training** - Teaching the system to recognize strokes
2. **User learning** - Helping learners understand what each shortform looks like
3. **Recognition validation** - Checking if a written shortform matches the expected stroke
