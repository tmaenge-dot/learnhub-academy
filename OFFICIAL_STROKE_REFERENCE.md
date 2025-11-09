# Pitman Shorthand Stroke Reference (OCR Extracted from Official Textbook)

**Source:** Pitman Shorthand Book (OCR Extraction)  
**Status:** AI-Recognizable Reference  
**Purpose:** Provide accurate stroke data for the app

---

## UNIT 1 - STRAIGHT DOWNSTROKES (Pages 9-11)

### Official Description from Textbook:
"The first six consonants are represented by light or darker straight strokes written downwards. Arrows indicate the direction in which strokes are written; they are never written in any other direction."

### Stroke Pairs (P, B, T, D, CH, J):

**P - "pee"**
- Type: Light straight stroke slanting LEFT downward
- Weight: Light
- Example: tape

**B - "bee"**
- Type: Heavy straight stroke slanting LEFT downward  
- Weight: Heavy/Darker
- Example: rebate

**T - "tee"**
- Type: Light straight VERTICAL stroke downward
- Weight: Light
- Example: ate

**D - "dee"**
- Type: Heavy straight VERTICAL stroke downward
- Weight: Heavy/Darker
- Example: edit

**CH - "chay"**
- Type: Light straight stroke slanting RIGHT downward
- Weight: Light
- Example: etch

**J - "jay"**
- Type: Heavy straight stroke slanting RIGHT downward
- Weight: Heavy/Darker
- Example: edge

**Note from textbook:** "These consonants form pairs; P and B, T and D, CH and J. In each pair a light sound is represented by a light stroke, and a corresponding heavy sound is represented by a darker stroke."

---

## UNIT 2 - CURVED STROKES (Pages 16-19)

### Official Description from Textbook:
"The next four pairs of consonants are all curves and are written downwards"

### Curved Stroke Pairs (F, V, Th, TH, S, Z, Sh, ZH):

**F - "ef"**
- Type: Light CURVE
- Weight: Light
- Examples: (from textbook exercises: fade, fed)

**V - "vee"**
- Type: Heavy CURVE
- Weight: Heavy/Darker
- Examples: (from textbook exercises: vote, votes)

**Th - "ith" (voiceless, as in "think")**
- Type: Light CURVE
- Weight: Light
- Examples: thud

**TH - "thee" (voiced, as in "this")**
- Type: Heavy CURVE
- Weight: Heavy/Darker
- Examples: (the voiced th sound)

**S - "ess"**
- Type: Light CURVE
- Weight: Light
- Examples: essay, shape

**Z - "zee"**
- Type: Heavy CURVE
- Weight: Heavy/Darker
- Examples: (from exercises: measure, leisure, usual mentioned in original data)

**Sh - "ish"**
- Type: Light CURVE
- Weight: Light
- Examples: show, shape

**Zh - "zhee"**
- Type: Heavy CURVE
- Weight: Heavy/Darker
- Examples: measure, leisure, usual

**Note:** All curved strokes in Unit 2 are written downwards and come in light/heavy pairs.

---

## UNIT 3 - HORIZONTAL & UPWARD STROKES (Pages 20-21)

### Official Description from Textbook:
From OCR page 21: "Horizontal strokes; upward strokes"  
From table of contents: "Horizontal strokes K, G, M, N, NG; upward strokes L, W, Y"

### Horizontal Strokes:

**K - "kay"**
- Type: Light horizontal STRAIGHT stroke
- Weight: Light
- Examples: (K sound words - not "mail, we, yes" which are wrong!)

**G - "gay"**
- Type: Heavy horizontal STRAIGHT stroke
- Weight: Heavy/Darker (darker than K)
- Examples: (G sound words)

**M - "em"**
- Type: Light CURVE (horizontal direction)
- Weight: Light
- Direction: Curve with inside ON the line
- Examples: From OCR page 21: "mail"

**N - "en"**
- Type: Light CURVE (horizontal direction)
- Weight: Light
- Direction: Curve AWAY from the line
- Examples: (N sound words)

**NG - "ing"**
- Type: Heavy CURVE (horizontal direction)
- Weight: Heavy/Darker (heavy version of N)
- Examples: (NG sound words like ring, king, sing)

**Note:** M and N curve in opposite directions. M has inside curve ON the line, N curves AWAY from line.

### Upward Strokes:

**L - "el"**
- Type: Upward stroke
- Weight: Light
- Examples: From OCR: "will"

**W - "way"**
- Type: Upward stroke
- Weight: Light
- Examples: From OCR: "we, weigh, aware, will"

**Y - "yay"**
- Type: Upward stroke
- Weight: Light
- Examples: From OCR: "yes, youth, yellow"

**Note from textbook (page 21):** "Upstrokes are placed to the left when they come before a consonant and to the right when they follow a consonant"

---

## CORRECTIONS NEEDED IN strokes.ts:

### CONFIRMED ERRORS:

1. **F and V** - ✓ FIXED - Now correctly shown as curves
2. **K** - WRONG examples ("mail, we, yes" have no K sound!)
   - Should be: Examples with K sound like "key, cake, back, ache"
3. **G** - WRONG examples ("weigh, way" have no G sound, "gay" is OK)
   - Should be: Examples with G sound like "go, bag, game, big"
4. **M** - WRONG examples ("lie, weigh, youth" have no M sound!)
   - From textbook: "mail" is mentioned
   - Should be: "mail, me, may, aim, come"
5. **N** - WRONG examples ("el, way, kay" have no N sound!)
   - Should be: "nay, knee, no, nine, none"
6. **NG** - WRONG examples ("yellow, aware, will" have no NG sound!)
   - Should be: "ring, king, sing, thing, wing"

### STROKE WEIGHTS/TYPES VERIFIED:
- All Unit 1 (P, B, T, D, CH, J) = STRAIGHT lines ✓
- All Unit 2 (F, V, Th, TH, S, Z, Sh, Zh) = CURVES ✓
- Unit 3: K, G = STRAIGHT horizontal ✓
- Unit 3: M, N, NG = CURVES ✓

---

## SUMMARY FOR AI INTEGRATION:

**This reference is now AI-readable!** The OCR extraction provides:

1. ✓ Accurate stroke descriptions from official textbook
2. ✓ Confirmed curve vs. straight classifications
3. ✓ Light vs. heavy stroke pairings
4. ✓ Direction information (downward, horizontal, upward)
5. ✓ Some example words (though incomplete)

**Next Step:** Use this reference to update `data/strokes.ts` with 100% accurate information.

---

**Extraction Date:** November 3, 2025  
**Pages Extracted:** 1-40 (OCR)  
**Quality:** Medium-High (some OCR artifacts, but structure is clear)
