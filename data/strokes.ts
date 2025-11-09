import { Stroke } from '@/types/shorthand';

export const strokesData: Stroke[] = [
  // ==========================================
  // UNIT 1 - STRAIGHT DOWNSTROKES
  // Source: Shorthand Book - 24 Consonants
  // All 6 strokes are STRAIGHT LINES going downward
  // Phonetic names: pee, bee, tee, dee, chay, jay
  // ==========================================
  
  // P and B - Slanting left downward
  {
    id: 'c1',
    name: 'pee',
    symbol: '\\',
    description: 'Light straight line slanting down to the LEFT - represents P sound',
    example: 'pay, cup, pea',
    category: 'consonant',
  },
  {
    id: 'c2',
    name: 'bee',
    symbol: '\\',
    description: 'Heavy straight line slanting down to the LEFT - represents B sound (THICKER than pee)',
    example: 'bee, bay, cab',
    category: 'consonant',
  },
  
  // T and D - Vertical downward
  {
    id: 'c3',
    name: 'tee',
    symbol: '|',
    description: 'Light straight VERTICAL line going down - represents T sound',
    example: 'tea, ate, it',
    category: 'consonant',
  },
  {
    id: 'c4',
    name: 'dee',
    symbol: '|',
    description: 'Heavy straight VERTICAL line going down - represents D sound (THICKER than tee)',
    example: 'dee, day, aid',
    category: 'consonant',
  },
  
  // CH and J - Slanting right downward
  {
    id: 'c5',
    name: 'chay',
    symbol: '/',
    description: 'Light straight line slanting down to the RIGHT - represents CH sound',
    example: 'each, which, etch',
    category: 'consonant',
  },
  {
    id: 'c6',
    name: 'jay',
    symbol: '/',
    description: 'Heavy straight line slanting down to the RIGHT - represents J sound (THICKER than chay)',
    example: 'jay, age, edge',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 2 - CURVED STROKES (CONTINUANTS)
  // Source: Official Lesson 1A - National Shorthand School
  // Continuants: outgoing breath escapes in continuous stream through partially closed barriers
  // All 8 consonants are QUARTER-CIRCLES (shallow curves) written downwards
  // Light strokes: ef, ith, ess, ish
  // Heavy/Thick strokes (tapered at edges, thickened in middle): vee, thee, zee, zhee
  // ==========================================
  
  // F and V - Curves (45° down, left to right)
  {
    id: 'c7',
    name: 'ef',
    symbol: '(',
    description: 'Light quarter-circle curve, 45° down from left to right - represents F sound',
    example: 'feet, life, face',
    category: 'consonant',
  },
  {
    id: 'c8',
    name: 'vee',
    symbol: '(',
    description: 'Heavy quarter-circle curve, 45° down from left to right - represents V sound (THICKER than ef, tapered at edges)',
    example: 'van, move, video',
    category: 'consonant',
  },
  
  // th and TH - Curves (90° down, vertical)
  {
    id: 'c9',
    name: 'ith',
    symbol: ')',
    description: 'Light quarter-circle curve, 90° down (vertical) - represents th sound as in "thin"',
    example: 'thin, bath, thank',
    category: 'consonant',
  },
  {
    id: 'c10',
    name: 'thee',
    symbol: ')',
    description: 'Heavy quarter-circle curve, 90° down (vertical) - represents TH sound as in "this" (THICKER than ith, tapered at edges)',
    example: 'that, breathe, then',
    category: 'consonant',
  },
  
  // S and Z - Curves (90° down, vertical)
  {
    id: 'c11',
    name: 'ess',
    symbol: ')',
    description: 'Light quarter-circle curve, 90° down (vertical) - represents S sound',
    example: 'sale, lace, sign',
    category: 'consonant',
  },
  {
    id: 'c12',
    name: 'zee',
    symbol: ')',
    description: 'Heavy quarter-circle curve, 90° down (vertical) - represents Z sound (THICKER than ess, tapered at edges)',
    example: 'zero, craze, easy',
    category: 'consonant',
  },
  
  // sh and zh - Curves (45° down, right to left)
  {
    id: 'c13',
    name: 'ish',
    symbol: '\\',
    description: 'Light quarter-circle curve, 45° down from right to left - represents sh sound',
    example: 'show, cash, she',
    category: 'consonant',
  },
  {
    id: 'c14',
    name: 'zhee',
    symbol: '\\',
    description: 'Heavy quarter-circle curve, 45° down from right to left - represents zh sound (THICKER than ish, tapered at edges)',
    example: 'pleasure, closure, measure',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 3 - NASALS, LIQUIDS, COALESCENTS
  // Source: Official Lesson 1B - National Shorthand School
  // NASALS (3): Horizontal curves - M, N, NG (air escapes through nose)
  // LIQUIDS (2): L (curved up 45°), R (two forms: ar curved down 45°, ray straight up 30°)
  // COALESCENTS (2): W, Y (initially hooked upstrokes at 30°)
  // ==========================================
  
  // NASALS - Horizontal Curves (left to right)
  {
    id: 'c15',
    name: 'em',
    symbol: '~',
    description: 'Light horizontal curve (left to right) - represents M sound (nasal)',
    example: 'men, him, mail, me, may',
    category: 'consonant',
  },
  {
    id: 'c16',
    name: 'en',
    symbol: '~',
    description: 'Light horizontal curve (left to right) - represents N sound (nasal)',
    example: 'neat, sun, no, nay, nine',
    category: 'consonant',
  },
  {
    id: 'c17',
    name: 'ing',
    symbol: '~',
    description: 'Heavy horizontal curve (left to right) - represents NG sound (nasal, THICKER than en, tapered at edges)',
    example: 'king, bang, ring, sing, thing',
    category: 'consonant',
  },
  
  // K and G - Horizontal STRAIGHT strokes
  {
    id: 'c18',
    name: 'kay',
    symbol: '→',
    description: 'Light horizontal STRAIGHT stroke (left to right) - represents K sound',
    example: 'came, look, key, cake, back',
    category: 'consonant',
  },
  {
    id: 'c19',
    name: 'gay',
    symbol: '⇒',
    description: 'Heavy horizontal STRAIGHT stroke (left to right) - represents G sound (THICKER than kay)',
    example: 'game, fog, go, bag, big',
    category: 'consonant',
  },
  
  // LIQUIDS - Curved strokes at 45°
  {
    id: 'c20',
    name: 'el',
    symbol: '↗',
    description: 'Light curved UPSTROKE at 45° (left to right) - represents L sound (liquid)',
    example: 'like, kill, will, lie',
    category: 'consonant',
  },
  {
    id: 'c21',
    name: 'ar',
    symbol: '↘',
    description: 'Light curved DOWNSTROKE at 45° (left to right) - represents R sound (liquid, first form)',
    example: 'ram, care, run, ran',
    category: 'consonant',
  },
  {
    id: 'c22',
    name: 'ray',
    symbol: '↗',
    description: 'Light STRAIGHT UPSTROKE at 30° (left to right) - represents R sound (liquid, second form - always call it "ray")',
    example: 'ring, carry, are, our, year',
    category: 'consonant',
  },
  
  // COALESCENTS - Initially hooked upstrokes at 30°
  {
    id: 'c23',
    name: 'way',
    symbol: '↗⌐',
    description: 'Light initially hooked UPSTROKE at 30° (left to right) - represents W sound (coalescent)',
    example: 'win, away, we, weigh, will',
    category: 'consonant',
  },
  {
    id: 'c24',
    name: 'yay',
    symbol: '↗⌐',
    description: 'Light initially hooked UPSTROKE at 30° (left to right) - represents Y sound (coalescent)',
    example: 'yes, yoke, youth, yellow',
    category: 'consonant',
  },
  
  // ==========================================
  // 12 VOWELS - SUMMARY
  // Source: Shorthand Book - Vowel positions
  // There are six long vowels represented by a heavy dot or dash and six
  // light vowels represented by a light dot or dash
  // Sentence for long sounds: "Pa May We All Go Too"
  // Sentence for short sounds: "That Pen Is Not Much Good"
  // Vowels help you to remember your vowel place
  // ==========================================
  
  // PLACE 1 VOWELS (1st place)
  {
    id: 'v1',
    name: 'Pa',
    symbol: '—₁',
    description: 'Dash in 1st place - long vowel sound as in "Pa"',
    example: 'pa, day, mate, main, pay',
    category: 'vowel',
  },
  {
    id: 'v2',
    name: 'That',
    symbol: '·₁',
    description: 'Dot in 1st place - short vowel sound as in "That"',
    example: 'that, mat, tap, dad, bat',
    category: 'vowel',
  },
  
  // PLACE 2 VOWELS (2nd place)
  {
    id: 'v3',
    name: 'May',
    symbol: '—₂',
    description: 'Dash in 2nd place - long vowel sound as in "May"',
    example: 'may, mane, pane, way, same',
    category: 'vowel',
  },
  {
    id: 'v4',
    name: 'Pen',
    symbol: '·₂',
    description: 'Dot in 2nd place - short vowel sound as in "Pen"',
    example: 'pen, met, debt, said, get',
    category: 'vowel',
  },
  
  // PLACE 3 VOWELS (3rd place)
  {
    id: 'v5',
    name: 'We',
    symbol: '—₃',
    description: 'Dash in 3rd place - long vowel sound as in "We"',
    example: 'we, bee, tea, me, see',
    category: 'vowel',
  },
  {
    id: 'v6',
    name: 'Is',
    symbol: '·₃',
    description: 'Dot in 3rd place - short vowel sound as in "Is"',
    example: 'is, bit, did, tip, it',
    category: 'vowel',
  },
  
  // ADDITIONAL VOWEL POSITIONS (4th, 5th, 6th place)
  {
    id: 'v7',
    name: 'All',
    symbol: '—₄',
    description: 'Dash - long vowel sound as in "All"',
    example: 'all, call, ball, tall, saw',
    category: 'vowel',
  },
  {
    id: 'v8',
    name: 'Not',
    symbol: '·₄',
    description: 'Dot - short vowel sound as in "Not"',
    example: 'not, dot, got, top, shop',
    category: 'vowel',
  },
  {
    id: 'v9',
    name: 'Go',
    symbol: '—₅',
    description: 'Dash - long vowel sound as in "Go"',
    example: 'go, no, toe, know, so',
    category: 'vowel',
  },
  {
    id: 'v10',
    name: 'Much',
    symbol: '·₅',
    description: 'Dot - short vowel sound as in "Much"',
    example: 'much, but, cut, mud, cup',
    category: 'vowel',
  },
  {
    id: 'v11',
    name: 'Too',
    symbol: '—₆',
    description: 'Dash - long vowel sound as in "Too"',
    example: 'too, who, do, true, shoe',
    category: 'vowel',
  },
  {
    id: 'v12',
    name: 'Good',
    symbol: '·₆',
    description: 'Dot - short vowel sound as in "Good"',
    example: 'good, put, book, could, wood',
    category: 'vowel',
  },
  
  // ==========================================
  // ADDITIONAL CONSONANT FEATURES
  // Advanced stroke techniques and combinations
  // ==========================================
  
  // ==========================================
  // UNIT 11 - HALVING
  // Source: Shorthand Book - Unit 11
  // Strokes are halved to indicate a following T or D
  // In words of one syllable a light stroke may be halved to indicate a following T
  // In words of one syllable a light stroke may be halved to indicate D only following T
  // Note: Each length H when not joined to another stroke is always written upwards
  // Two words: one syllable and darker strokes may be halved to indicate a following D only
  // ==========================================
  
  // Halving for T (light strokes)
  {
    id: 'c25',
    name: 'Halving for T',
    symbol: '½',
    description: 'In words of one syllable a light stroke may be halved to indicate a following T',
    example: 'note, thought, let, melt, hoped, son, sight, stopped, talked, reached, left, checked, fight, part',
    category: 'consonant',
  },
  
  // Halving for D (following T only)
  {
    id: 'c26',
    name: 'Halving for D',
    symbol: '½',
    description: 'In words of one syllable a light stroke may be halved to indicate D only following T. Note: The circle is always read last',
    example: 'bad, dead, field, guide, changed, had, head, bad, goods, nights, leads, goods, thoughts',
    category: 'consonant',
  },
  
  // Halving Notes
  {
    id: 'c27',
    name: 'Halving Usage Notes',
    symbol: 'ℹ️',
    description: 'Each length H when not joined to another stroke is always written upwards. Two words: one syllable and darker strokes may be halved to indicate a following D only. The circle is always read last.',
    example: 'See halving examples for T and D usage',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 12 - R HOOK
  // Source: Shorthand Book - Unit 12
  // Straight strokes written on the non-circle side of straight
  // downstrokes and K and G add R. The small hook is written at the
  // beginning of the stroke to the right (with a clockwise motion).
  // These are called per, ter, etc. though they do not always represent these syllables.
  // ==========================================
  
  // R Hook combinations with straight downstrokes
  {
    id: 'c28',
    name: 'pr (pee + R hook)',
    symbol: '⌐',
    description: 'P stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'April, October, trial, address, weather, manager, increased, progress',
    category: 'consonant',
  },
  {
    id: 'c29',
    name: 'br (bee + R hook)',
    symbol: '⌐',
    description: 'B stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'brother, bring, break',
    category: 'consonant',
  },
  {
    id: 'c30',
    name: 'tr (tee + R hook)',
    symbol: '⌐',
    description: 'T stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'try, tree, true, trade',
    category: 'consonant',
  },
  {
    id: 'c31',
    name: 'dr (dee + R hook)',
    symbol: '⌐',
    description: 'D stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'dry, dream, drive',
    category: 'consonant',
  },
  {
    id: 'c32',
    name: 'chr (chay + R hook)',
    symbol: '⌐',
    description: 'CH stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'chrome, chronic',
    category: 'consonant',
  },
  {
    id: 'c33',
    name: 'jr (jay + R hook)',
    symbol: '⌐',
    description: 'J stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'jar, jury, germ',
    category: 'consonant',
  },
  {
    id: 'c34',
    name: 'kr (kay + R hook)',
    symbol: '⌐',
    description: 'K stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'cry, credit, create',
    category: 'consonant',
  },
  {
    id: 'c47',
    name: 'gr (gay + R hook)',
    symbol: '⌐',
    description: 'G stroke with R hook - small hook written at beginning to the right (clockwise)',
    example: 'grow, great, green, agree',
    category: 'consonant',
  },
  
  // R Hook usage notes
  {
    id: 'c46',
    name: 'R Hook Usage Notes',
    symbol: 'ℹ️',
    description: 'A small initial hook written on the non-circle side of straight downstrokes and K and G adds R. The small hook is written at the beginning of the stroke to the right (with a clockwise motion). These are called per, ter, etc. though they do not always represent these syllables.',
    example: 'See R hook examples: pr, br, tr, dr, chr, jr, kr, gr',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 13 - N HOOK
  // Source: Shorthand Book - Unit 13
  // A small final hook, written on the inside of curves, adds N
  // At the end of all straight strokes the N hook is written to the right (in a clockwise direction)
  // When N hook follows R at the end of a word, the R is usually written upwards
  // ==========================================
  
  // N Hook on curves (inside)
  {
    id: 'c47',
    name: 'N Hook (on curves)',
    symbol: '⌝',
    description: 'A small final hook written on the inside of curves adds N',
    example: 'often, phone, then, machine, salesman, learn',
    category: 'consonant',
  },
  
  // N Hook on straight strokes (right/clockwise)
  {
    id: 'c46',
    name: 'N Hook (on straight strokes)',
    symbol: '⌝',
    description: 'At the end of all straight strokes the N hook is written to the right (in a clockwise direction)',
    example: 'town, done, bulletin, foreign, gone, when',
    category: 'consonant',
  },
  
  // N Hook following R
  {
    id: 'c47',
    name: 'N Hook (following R)',
    symbol: '⌝',
    description: 'When N hook follows R at the end of a word, the R is usually written upwards',
    example: 'turn, return, learn, western, corn, pattern',
    category: 'consonant',
  },
  
  // N Hook usage notes
  {
    id: 'c46',
    name: 'N Hook Usage Notes',
    symbol: 'ℹ️',
    description: 'A small final hook adds N. On curves it is written on the inside. On straight strokes it is written to the right in a clockwise direction. When N hook follows R at the end of a word, the R is usually written upwards.',
    example: 'See N hook examples for curves, straight strokes, and following R',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 14 - WH, Abbreviated W, WL, WHL, and Medial W
  // Source: Shorthand Book - Unit 14
  // The upstroke W is the most common method of representing the
  // consonant WAY as already seen
  // ==========================================
  
  // Abbreviated W
  {
    id: 'c47',
    name: 'Abbreviated W',
    symbol: '˘',
    description: 'A small semicircle written as a short semicircle, followed by a dot vowel',
    example: 'week, wagon, woman, modern, luncheon, workman, worth',
    category: 'consonant',
  },
  
  // WL - Small hook inside upward L
  {
    id: 'c46',
    name: 'WL',
    symbol: '⌙',
    description: 'WL is represented by writing a small hook inside upward L',
    example: 'well, willing, unwilling, welfare, meanwhile',
    category: 'consonant',
  },
  
  // WHL - Variation
  {
    id: 'c47',
    name: 'WHL',
    symbol: '⌙',
    description: 'WHL is represented by writing a large hook inside T upward',
    example: 'whilst, while, whilst, while',
    category: 'consonant',
  },
  
  // Medial W
  {
    id: 'c46',
    name: 'Medial W',
    symbol: '◦',
    description: 'In the middle of a word, where the stroke WAY would be difficult to write, it can be represented by the following vowel, i.e., when it is written in the position of the following vowel',
    example: 'reserve, frequently, subsequent, luncheon, goodwill, between, framework, somewhat',
    category: 'consonant',
  },
  
  // WH, W usage notes
  {
    id: 'c47',
    name: 'W Variations Usage Notes',
    symbol: 'ℹ️',
    description: 'The upstroke W is the most common method. Abbreviated W is a small semicircle. WL is a small hook inside upward L. WHL is a large hook inside T upward. Medial W in the middle of words is represented by the following vowel position.',
    example: 'See W variation examples for different contexts',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 15 - L HOOK
  // Source: Shorthand Book - Unit 15
  // A small initial hook, written on the S circle side of straight consonants
  // These are called pul, bul, etc. though they do not always represent these syllables
  // The circle is written inside the hook, whether itself at the beginning or
  // in the middle of an outline, the hook is always read first
  // ==========================================
  
  // L Hook combinations with straight consonants
  {
    id: 'c46',
    name: 'pl (pee + L hook)',
    symbol: '⌐',
    description: 'P stroke with L hook - small initial hook on S circle side',
    example: 'please, place, split',
    category: 'consonant',
  },
  {
    id: 'c47',
    name: 'bl (bee + L hook)',
    symbol: '⌐',
    description: 'B stroke with L hook - small initial hook on S circle side',
    example: 'blue, black, class',
    category: 'consonant',
  },
  {
    id: 'c48',
    name: 'tl (tee + L hook)',
    symbol: '⌐',
    description: 'T stroke with L hook - small initial hook on S circle side',
    example: 'settle, article, atlas',
    category: 'consonant',
  },
  {
    id: 'c49',
    name: 'dl (dee + L hook)',
    symbol: '⌐',
    description: 'D stroke with L hook - small initial hook on S circle side',
    example: 'middle, riddle',
    category: 'consonant',
  },
  {
    id: 'c50',
    name: 'chl (chay + L hook)',
    symbol: '⌐',
    description: 'CH stroke with L hook - small initial hook on S circle side',
    example: 'child',
    category: 'consonant',
  },
  {
    id: 'c51',
    name: 'jl (jay + L hook)',
    symbol: '⌐',
    description: 'J stroke with L hook - small initial hook on S circle side',
    example: 'gild, glad, rapidly, reasonable',
    category: 'consonant',
  },
  {
    id: 'c52',
    name: 'kl (kay + L hook)',
    symbol: '⌐',
    description: 'K stroke with L hook - small initial hook on S circle side',
    example: 'claim, clock',
    category: 'consonant',
  },
  {
    id: 'c53',
    name: 'gl (gay + L hook)',
    symbol: '⌐',
    description: 'G stroke with L hook - small initial hook on S circle side',
    example: 'glad',
    category: 'consonant',
  },
  {
    id: 'c54',
    name: 'fl (ef + L hook)',
    symbol: '⌐',
    description: 'F stroke with L hook - small initial hook on S circle side',
    example: 'flat',
    category: 'consonant',
  },
  {
    id: 'c55',
    name: 'vl (vee + L hook)',
    symbol: '⌐',
    description: 'V stroke with L hook - small initial hook on S circle side',
    example: 'valuable',
    category: 'consonant',
  },
  
  // L Hook usage notes
  {
    id: 'c56',
    name: 'L Hook Usage Notes',
    symbol: 'ℹ️',
    description: 'A small initial hook written on the S circle side of straight consonants adds L. These are called pul, bul, etc. though they do not always represent these syllables. The circle is written inside the hook, whether itself at the beginning or in the middle of an outline, the hook is always read first. Examples: simply, split, settle, possible, display, disclose.',
    example: 'See L hook examples: pl, bl, tl, dl, chl, jl, kl, gl, fl, vl',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 15 - L HOOK (Special Uses with Vowels)
  // Additional stroke representations and special cases
  // ==========================================
  
  // L Hook with dot vowels replaced by small circle
  {
    id: 'c57',
    name: 'L Hook with Circle (replaces dot vowels)',
    symbol: '○⌐',
    description: 'Dot vowels may be replaced by writing a small circle before or after the stroke hooked for L. To promote writing speed, in some words the L hook is used, even though a distinct vowel comes between the consonant and L.',
    example: 'children, fly, flowers, travel, arrival, final, penalty',
    category: 'consonant',
  },
  
  // Large L hook on curves
  {
    id: 'c58',
    name: 'Large L Hook (on curves)',
    symbol: '⌙',
    description: 'A large initial hook, written on the inside of certain curves, adds the sound of L. The circle S at the beginning of the outline is written inside the hook and is always read first.',
    example: 'fl, vl, thl, ml, nl - examples: fly, flowers, personal, carried',
    category: 'consonant',
  },
  
  // L Hook with vowel signs
  {
    id: 'c59',
    name: 'L Hook with Vowel Signs',
    symbol: '⌐',
    description: 'Where the intervening vowel is the short e, no vowel sign is written. A dash vowel or a diphthong is shown by writing the vowel or diphthong sign at the beginning or at the end of the stroke, or through it.',
    example: 'playful, personal, carried, delicate, delegate, telegraphy, college, fulfill, collect, tolerate, political, nullify',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 16 - F/V HOOK
  // Small final hook with left (anti-clockwise) motion adds F or V
  // ==========================================
  
  {
    id: 'c60',
    name: 'F/V Hook Introduction',
    symbol: 'ℹ️',
    description: 'A small final hook, written with a left (anti-clockwise) motion at the end of a straight stroke, adds F or V. When a vowel follows F or V at the end of a word, it is necessary to show the stroke to indicate the following vowel.',
    example: 'See F/V hook examples: pf, tf, kf, mf, nf, above, rough, tougher, enough',
    category: 'consonant',
  },
  
  {
    id: 'c61',
    name: 'pf',
    symbol: 'ᑭ',
    description: 'P stroke with F hook - small final hook with anti-clockwise motion',
    example: 'Examples using pf combination',
    category: 'consonant',
  },
  
  {
    id: 'c62',
    name: 'tf',
    symbol: '┐',
    description: 'T stroke with F hook - small final hook with anti-clockwise motion',
    example: 'effective - T with F hook',
    category: 'consonant',
  },
  
  {
    id: 'c63',
    name: 'kf',
    symbol: '⌐',
    description: 'K stroke with F hook - small final hook with anti-clockwise motion',
    example: 'Examples using kf combination',
    category: 'consonant',
  },
  
  {
    id: 'c64',
    name: 'mf',
    symbol: '⌐',
    description: 'M stroke with F hook - small final hook with anti-clockwise motion',
    example: 'informative - M with F hook',
    category: 'consonant',
  },
  
  {
    id: 'c65',
    name: 'nf',
    symbol: '⌐',
    description: 'N stroke with F hook - small final hook with anti-clockwise motion',
    example: 'enough - N with F hook',
    category: 'consonant',
  },
  
  {
    id: 'c66',
    name: 'V Hook on straight strokes',
    symbol: '⌐v',
    description: 'Small final hook with anti-clockwise motion adds V sound at end of straight strokes',
    example: 'above, rough, tougher',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 17 - SHUN HOOK, UPWARD SH
  // Large final hook adds the sound of SHUN
  // ==========================================
  
  {
    id: 'c67',
    name: 'SHUN Hook Introduction',
    symbol: 'ℹ️',
    description: 'A large final hook to a stroke adds the sound of SHUN. One SHUN hook is written inside a curve, small curl written in the same direction (a continuation of the circle). The SHUN hook can also be used in the middle of an outline if it gives an easier joining.',
    example: 'nation, positions, possession, musician, taxation',
    category: 'consonant',
  },
  
  {
    id: 'c68',
    name: 'SHUN Hook with vowels',
    symbol: '⌙○',
    description: 'A third-place vowel between the S and the SHUN is placed outside the curl. Any other vowel is not indicated. A final S circle can be written inside the curl.',
    example: 'nations, positions, proposition, dispensation',
    category: 'consonant',
  },
  
  {
    id: 'c69',
    name: 'SHUN with derivatives',
    symbol: '⌙L',
    description: 'L may be added for derivatives. Example: sensational',
    example: 'sensational',
    category: 'consonant',
  },
  
  {
    id: 'c70',
    name: 'S-SHUN',
    symbol: 'S⌙',
    description: 'When SHUN follows the S circle or the NG stroke, it is represented by a small curl written in the same direction (a continuation of the circle)',
    example: 'accusations, sensations',
    category: 'consonant',
  },
  
  {
    id: 'c71',
    name: 'UTION words',
    symbol: 'SH-N',
    description: 'In words ending in -UTION or -UTION: the stroke SH and N hook are written',
    example: 'tuition, situation',
    category: 'consonant',
  },
  
  {
    id: 'c72',
    name: 'Upward SH',
    symbol: '↑SH',
    description: 'Upward SH is generally written downwards. In certain cases it is easier to write and to join an outline that is easier to write and to read. Where it would be shaded, the stroke SHUN is replaced by SH and N hook.',
    example: 'finish, shift, shun, ship, shark, shack, flash, fish, shoulder, flesh, foolish',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 18 - COMPOUND CONSONANTS AND OMISSION
  // Compound consonants: KW, GW, MP/MB, LR, RR
  // ==========================================
  
  {
    id: 'c73',
    name: 'Compound Consonants Introduction',
    symbol: 'ℹ️',
    description: 'The compound consonants are: KW (kwa), GW (gwa), MP/MB (emp/emb), LR (ler), RR (rer). These special strokes represent common consonant combinations.',
    example: 'quick, quicker, admirer, clearer, question',
    category: 'consonant',
  },
  
  {
    id: 'c74',
    name: 'KW (kwa)',
    symbol: 'KW',
    description: 'KW compound consonant stroke - represents the "kwa" sound',
    example: 'quick, quicker, question',
    category: 'consonant',
  },
  
  {
    id: 'c75',
    name: 'GW (gwa)',
    symbol: 'GW',
    description: 'GW compound consonant stroke - represents the "gwa" sound',
    example: 'language, linguist',
    category: 'consonant',
  },
  
  {
    id: 'c76',
    name: 'MP, MB (emp/emb)',
    symbol: 'MP/MB',
    description: 'MP/MB compound consonant stroke - represents "emp" or "emb" sounds',
    example: 'impose, embassy, ambition, campaign, ambassador, stamp, imperative, embark, camp',
    category: 'consonant',
  },
  
  {
    id: 'c77',
    name: 'LR (ler)',
    symbol: 'LR',
    description: 'LR compound consonant stroke - represents "ler" sound. Note: When M is immediately followed by PR, BR, PL or BL, the hook is used.',
    example: 'ruler, fall and ruler, council and councillor, scholar',
    category: 'consonant',
  },
  
  {
    id: 'c78',
    name: 'RR (rer)',
    symbol: 'RR',
    description: 'RR compound consonant stroke - represents "rer" sound',
    example: 'admirer, clearer, filter, tribunal, chancellor',
    category: 'consonant',
  },
  
  {
    id: 'c79',
    name: 'Consonant Omission',
    symbol: '⊘T',
    description: 'A lightly sounded T in the middle of a word, if following a circle, may sometimes be omitted',
    example: 'postcard, postpone, firstly, substitute',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 19 - DOUBLING
  // Curved strokes doubled to indicate TER, DER, THER
  // Stroke T doubled for TEN only
  // ==========================================
  
  {
    id: 'c80',
    name: 'Doubling Introduction',
    symbol: 'ℹ️',
    description: 'Curved strokes are doubled in length to indicate a following syllable TER, DER, THER (heavy sound), and, in a few common words.',
    example: 'after, father, order, sister, voter, mother, nature',
    category: 'consonant',
  },
  
  {
    id: 'c81',
    name: 'Doubled Curved Strokes (TER/DER/THER)',
    symbol: '══',
    description: 'All double length downstrokes are written through the line. Curved strokes doubled for TER, DER, THER sounds.',
    example: 'after, father, judge, voter, sister, importer, orders, later, calendars, mother, remainder, nature, natural',
    category: 'consonant',
  },
  
  {
    id: 'c82',
    name: 'Stroke T Doubled (TEN only)',
    symbol: 'T═',
    description: 'Stroke T, standing alone or with only a final S circle, is doubled for TEN only',
    example: 'ten, tens, liter, alters, latter, older, letter',
    category: 'consonant',
  },
  
  // ==========================================
  // UNIT 20 - PREFIXES, SUFFIXES AND WORD ENDINGS
  // Various prefixes and suffixes to enhance writing efficiency
  // ==========================================
  
  {
    id: 'c83',
    name: 'CON/COM Prefix',
    symbol: '·',
    description: 'A light dot written at the beginning of a stroke adds the sound of CON/COM. The first vowel after this prefix decides the outline\'s position. Two special outlines to memorize: compact, commission. CON-, COM-, CUM- or COG- may be shown in the middle of a word by writing two parts of the word separately (disjoined), but close.',
    example: 'compact, conference, commence, consider, complain, commences, compared, combined',
    category: 'consonant',
  },
  
  {
    id: 'c84',
    name: 'INTRO- Prefix',
    symbol: 'VTR',
    description: 'INTRO- is represented by VTR, WTR- written in the third position (for vowel i)',
    example: 'introduce, introvern',
    category: 'consonant',
  },
  
  {
    id: 'c85',
    name: 'MAGN- Prefix',
    symbol: 'M',
    description: 'MAGNA-, MAGNE-, or MAGNU- is represented by disjoined M, written in first position (for vowel a)',
    example: 'magnificent, magnanimous, magnitude',
    category: 'consonant',
  },
  
  {
    id: 'c86',
    name: 'SELF- Prefix',
    symbol: 'S○',
    description: 'SELF- is represented by a disjoined S circle written in second place and position of the CON- dot. All these outlines are written in the second position (for vowel e)',
    example: 'self-evident, self-interest, self-contained',
    category: 'consonant',
  },
  
  {
    id: 'c87',
    name: '-ING Suffix (after downward R)',
    symbol: 'NG',
    description: 'After downward R, after light straight simple downstrokes, after light short forms (once stroke VG would not join easily), after most short forms (once stroke VG is required, as with giving), distinguishing outline is required, as with giving',
    example: 'covering, shipping, replying, going, interesting, entering, giving, mornings, bearings, hearings, comings',
    category: 'consonant',
  },
  
  {
    id: 'c88',
    name: '-MENT Suffix',
    symbol: 'M/MNT',
    description: '-MEN is represented by VT, where the sign MNT cannot be easily joined. The suffix -MENT- is represented by easily joined M',
    example: 'meeting, consignment, commencement, announcement, government, sentimental, department, experimental, governmental, settlement',
    category: 'consonant',
  },
  
  {
    id: 'c89',
    name: '-FULLY and -LESSLY Suffixes',
    symbol: 'disjoined SY',
    description: 'The suffixes FULLYEN and LESSWEN are written by disjoining SY',
    example: 'thoughtfulness, carefulness, thoughtlessness',
    category: 'consonant',
  },
  
  {
    id: 'c90',
    name: '-SHIP Suffix',
    symbol: 'SH',
    description: 'The suffix -SHIP is represented by a joined or disjoined SH, whenever is easiest to write and nearest to read back',
    example: 'ownership, membership, hardship, citizenship, friendship',
    category: 'consonant',
  },
];
