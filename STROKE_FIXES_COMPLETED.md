# STROKE FIXES COMPLETED
**Date:** November 3, 2025  
**Source:** Official Lesson PDFs from National Shorthand School

---

## FIXES APPLIED TO data/strokes.ts

### ✅ UNIT 1 - EXPLODENTS (Already Correct)
**P, B, T, D, CH, J, K, G** - No changes needed (user confirmed these were correct)

### ✅ UNIT 2 - CONTINUANTS (FIXED - All 8 Curved Strokes)

**What was wrong:**
- Incorrect symbols (⌢, ⌣, ~, ≈, ⊢, ⊣ instead of proper curve symbols)
- Missing orientation details (45°, 90°, left-to-right, right-to-left)
- Missing information about tapering for heavy strokes
- Some incorrect examples

**What was fixed:**
1. **F (ef)** - Now: Light quarter-circle curve, 45° down left-to-right
   - Examples: feet, life, face ✅

2. **V (vee)** - Now: Heavy quarter-circle curve, 45° down left-to-right, tapered edges
   - Examples: van, move, video ✅

3. **th (ith)** - Now: Light quarter-circle curve, 90° down (vertical)
   - Examples: thin, bath, thank ✅

4. **TH (thee)** - Now: Heavy quarter-circle curve, 90° down (vertical), tapered edges
   - Examples: that, breathe, then ✅

5. **S (ess)** - Now: Light quarter-circle curve, 90° down (vertical)
   - Examples: sale, lace, sign ✅

6. **Z (zee)** - Now: Heavy quarter-circle curve, 90° down (vertical), tapered edges
   - Examples: zero, craze, easy ✅

7. **sh (ish)** - Now: Light quarter-circle curve, 45° down right-to-left
   - Examples: show, cash, she ✅

8. **zh (zhee)** - Now: Heavy quarter-circle curve, 45° down right-to-left, tapered edges
   - Examples: pleasure, closure, measure ✅

### ✅ UNIT 3 - NASALS, LIQUIDS, COALESCENTS (FIXED - Reorganized)

**What was wrong:**
- M, N, NG had incorrect examples (no M/N/NG sounds in examples!)
- K, G were in wrong position (should come after M, N, NG)
- L, R, W, Y were missing or duplicated elsewhere
- No clear categorization (nasals, liquids, coalescents)

**What was fixed:**

#### NASALS (Horizontal Curves)
1. **M (em)** - Now: Light horizontal curve
   - OLD WRONG: lie, weigh, youth ❌
   - NEW CORRECT: men, him, mail, me, may ✅

2. **N (en)** - Now: Light horizontal curve
   - OLD WRONG: el, way, kay ❌
   - NEW CORRECT: neat, sun, no, nay, nine ✅

3. **NG (ing)** - Now: Heavy horizontal curve, tapered edges
   - OLD WRONG: yellow, aware, will ❌
   - NEW CORRECT: king, bang, ring, sing, thing ✅

#### K and G (Horizontal Straight Strokes)
4. **K (kay)** - Already had correct examples ✅

5. **G (gay)** - Already had correct examples ✅

#### LIQUIDS (Curved strokes at 45°)
6. **L (el)** - Now: Light curved upstroke at 45°
   - Examples: like, kill, will, lie ✅

7. **R form 1 (ar)** - Now: Light curved downstroke at 45°
   - Examples: ram, care, run, ran ✅

8. **R form 2 (ray)** - Now: Light straight upstroke at 30° (always call it "ray")
   - Examples: ring, carry, are, our, year ✅

#### COALESCENTS (Initially hooked upstrokes)
9. **W (way)** - Now: Light initially hooked upstroke at 30°
   - Examples: win, away, we, weigh, will ✅

10. **Y (yay)** - Now: Light initially hooked upstroke at 30°
   - Examples: yes, yoke, youth, yellow ✅

---

## STRUCTURAL CHANGES

### Removed Duplicates:
- **Deleted:** UNIT 7 duplicate R entries (c20, c21, c22) - these were duplicating the R strokes already defined in Unit 3
- **Reason:** R strokes belong in Unit 3 with the basic consonants, not in Unit 7

### Fixed IDs:
- All stroke IDs are now sequential: c1-c90 (no gaps, no duplicates)
- Adjusted all IDs after the removed section to maintain continuity

### Updated Comments:
- Added proper categorization headers (EXPLODENTS, CONTINUANTS, NASALS, LIQUIDS, COALESCENTS)
- Included source attribution to official lesson PDFs
- Added technical details about stroke types (quarter-circles, tapering, orientations)

---

## VERIFICATION

✅ **TypeScript Compilation:** No errors  
✅ **All 24 consonants present:** P, B, T, D, CH, J, K, G, F, V, th, TH, S, Z, sh, zh, M, N, NG, L, R(ar), R(ray), W, Y  
✅ **All examples use correct sounds:** Every example word now contains the sound it represents  
✅ **Source documented:** All information verified against official National Shorthand School lessons  

---

## NEXT STEPS

The app should now display:
- ✅ Correct stroke descriptions with orientation and angles
- ✅ Accurate examples (all examples actually contain the sound they represent!)
- ✅ Proper categorization (explodents, continuants, nasals, liquids, coalescents)
- ✅ Technical details (quarter-circles, tapering, stroke weights)

**Reload the app to see the corrections!** 🎉
