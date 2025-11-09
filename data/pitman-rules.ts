import { PitmanRule } from '@/types/pitman';

/**
 * Pitman Shorthand Rules and Principles
 * Based on the Pitman New Era system
 */

export const pitmanRules: PitmanRule[] = [
  // Stroke Rules
  {
    id: 'pr1',
    title: 'Light and Heavy Strokes',
    category: 'stroke',
    description: 'Consonants are represented by straight or curved strokes. Light strokes for voiceless sounds (p, t, k), heavy strokes for voiced sounds (b, d, g).',
    examples: [
      {
        input: 'p',
        output: 'Light downward curve',
        explanation: 'P is voiceless, so uses a light stroke'
      },
      {
        input: 'b',
        output: 'Heavy downward curve',
        explanation: 'B is voiced, so uses a heavy stroke'
      }
    ]
  },
  {
    id: 'pr2',
    title: 'Stroke Direction Matters',
    category: 'stroke',
    description: 'The direction of a stroke determines which consonant it represents. Downward, upward, and horizontal strokes all have different meanings.',
    examples: [
      {
        input: 't',
        output: 'Downward straight stroke',
        explanation: 'T uses a straight downward stroke'
      },
      {
        input: 'd',
        output: 'Upward straight stroke',
        explanation: 'D uses a straight upward stroke'
      }
    ]
  },
  {
    id: 'pr3',
    title: 'Joining Strokes',
    category: 'stroke',
    description: 'Strokes are joined together to form words. Join smoothly without lifting the pen when possible.',
    examples: [
      {
        input: 'pet',
        output: 'p-e-t joined',
        explanation: 'P curve flows into the vowel position and then the T stroke'
      }
    ]
  },
  
  // Vowel Rules
  {
    id: 'pr4',
    title: 'Vowel Position System',
    category: 'vowel',
    description: 'Vowels are shown by light or heavy dots and dashes placed in three positions: beginning, middle, or end of a stroke.',
    examples: [
      {
        input: 'a (as in "cat")',
        output: 'Light dot at beginning',
        explanation: 'Short A vowel marked by a light dot'
      },
      {
        input: 'ah (as in "father")',
        output: 'Heavy dot at beginning',
        explanation: 'Long A vowel marked by a heavy dot'
      }
    ]
  },
  {
    id: 'pr5',
    title: 'Vowel Omission',
    category: 'vowel',
    description: 'In rapid writing, vowels may be omitted when the meaning is clear from context. Always include vowels when learning.',
    examples: [
      {
        input: 'book',
        output: 'b-k (vowel omitted)',
        explanation: 'The "oo" can be omitted in context'
      }
    ]
  },
  
  // Position Rules
  {
    id: 'pr6',
    title: 'Line Position',
    category: 'position',
    description: 'Words are positioned on, above, or below the writing line to indicate the first vowel sound.',
    examples: [
      {
        input: 'Words starting with A or O',
        output: 'Written on the line',
        explanation: 'First position vowels'
      },
      {
        input: 'Words starting with E',
        output: 'Written above the line',
        explanation: 'Second position vowels'
      },
      {
        input: 'Words starting with I/U',
        output: 'Written below/through the line',
        explanation: 'Third position vowels'
      }
    ]
  },
  
  // Prefix/Suffix Rules
  {
    id: 'pr7',
    title: 'Common Prefixes',
    category: 'prefix',
    description: 'Certain prefixes have special abbreviated forms for speed.',
    examples: [
      {
        input: 'con-, com-',
        output: 'Small hook',
        explanation: 'CON/COM prefix shown by a small hook'
      },
      {
        input: 'un-',
        output: 'Small tick',
        explanation: 'UN prefix shown by a small tick'
      }
    ]
  },
  {
    id: 'pr8',
    title: 'Common Suffixes',
    category: 'suffix',
    description: 'Common word endings have special representations.',
    examples: [
      {
        input: '-ing',
        output: 'Dot or small circle',
        explanation: 'ING suffix represented by a dot'
      },
      {
        input: '-ed',
        output: 'Disjoined tick',
        explanation: 'ED suffix shown by a disjoined tick'
      },
      {
        input: '-tion, -sion',
        output: 'SH + N',
        explanation: 'TION/SION shown by shun sound'
      }
    ]
  },
  
  // Special Forms
  {
    id: 'pr9',
    title: 'Halving Principle',
    category: 'special',
    description: 'A stroke can be halved to add final -t or -d sound.',
    examples: [
      {
        input: 'act',
        output: 'Half k stroke',
        explanation: 'K stroke halved to include the T'
      },
      {
        input: 'bed',
        output: 'Half b stroke',
        explanation: 'B stroke halved to include the D'
      }
    ]
  },
  {
    id: 'pr10',
    title: 'Doubling Principle',
    category: 'special',
    description: 'A stroke can be doubled in length to add -ter, -der, -ture, etc.',
    examples: [
      {
        input: 'better',
        output: 'Doubled b stroke',
        explanation: 'B stroke doubled to represent -ter ending'
      }
    ]
  },
  {
    id: 'pr11',
    title: 'Circles for S',
    category: 'special',
    description: 'Small circles add S sounds before or after strokes.',
    examples: [
      {
        input: 'speak',
        output: 'Small circle + p-k',
        explanation: 'Initial S shown by small circle'
      },
      {
        input: 'books',
        output: 'b-k + small circle',
        explanation: 'Final S shown by small circle'
      }
    ]
  },
  {
    id: 'pr12',
    title: 'Loops for ST/STR',
    category: 'special',
    description: 'Loops represent -st or -str combinations.',
    examples: [
      {
        input: 'best',
        output: 'b + loop',
        explanation: 'ST shown by loop'
      },
      {
        input: 'master',
        output: 'm + large loop',
        explanation: 'STR shown by larger loop'
      }
    ]
  },
  {
    id: 'pr13',
    title: 'Hooks for N, F, V',
    category: 'special',
    description: 'Small hooks on strokes add N, F, or V sounds.',
    examples: [
      {
        input: 'pen',
        output: 'p + small hook',
        explanation: 'N added by hook to P'
      },
      {
        input: 'give',
        output: 'g + hook',
        explanation: 'V added by hook to G'
      }
    ]
  },
  {
    id: 'pr14',
    title: 'Tick H',
    category: 'special',
    description: 'Initial H sound is shown by a small tick.',
    examples: [
      {
        input: 'hat',
        output: 'Tick + a-t',
        explanation: 'H represented by small tick before stroke'
      }
    ]
  },
  {
    id: 'pr15',
    title: 'Diphthongs',
    category: 'vowel',
    description: 'Combinations of vowel sounds use special marks.',
    examples: [
      {
        input: 'oi (as in "oil")',
        output: 'Heavy dash through stroke',
        explanation: 'OI diphthong has its own sign'
      },
      {
        input: 'ow (as in "how")',
        output: 'Light curve',
        explanation: 'OW diphthong represented by light curve'
      }
    ]
  }
];

// Pitman Shorthand Principles Summary
export const pitmanPrinciples = {
  title: 'Pitman Shorthand Core Principles',
  principles: [
    'Write by sound, not spelling',
    'Light strokes for voiceless consonants, heavy for voiced',
    'Stroke direction and angle matter',
    'Vowels positioned relative to consonants',
    'Use circles, loops, hooks for common combinations',
    'Join strokes smoothly when possible',
    'Position on line indicates first vowel',
    'Special forms for speed (halving, doubling, etc.)'
  ]
};
