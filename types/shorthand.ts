export interface Stroke {
  id: string;
  name: string;
  symbol: string;
  description: string;
  example: string;
  category: 'consonant' | 'vowel' | 'blend';
  // Visual recognition fields
  visualPattern?: {
    shape: 'line' | 'curve' | 'hook' | 'circle' | 'loop' | 'dot' | 'dash';
    direction?: 'downward' | 'upward' | 'horizontal' | 'left-slant' | 'right-slant' | 'vertical';
    weight?: 'light' | 'heavy';
    angle?: number; // degrees from vertical
    openingDirection?: 'left' | 'right' | 'up' | 'down';
  };
}

export interface Shortform {
  id: string;
  word: string;
  shorthandRepresentation: string;
  description: string;
  category: 'common' | 'pronouns' | 'verbs' | 'business' | 'legal' | 'medical' | 'special';
  source?: string; // Optional: Unit number or page reference
  // Visual recognition fields
  visualPattern?: {
    strokes: Array<{
      strokeId: string; // Reference to Stroke.id
      position: 'on-line' | 'above-line' | 'below-line' | 'through-line';
      variant?: string; // e.g., 'shortened', 'opposite-direction', 'piece-of'
    }>;
    modifier?: 'circle-s' | 'stroke-s' | 'circle-st' | null;
  };
  imagePath?: string; // Path to extracted stroke image for training
}

export interface Phrase {
  id: string;
  phrase: string;
  shorthandRepresentation: string;
  description: string;
  usage: string;
  source?: string; // Unit number or source reference
}

export interface Outline {
  id: string;
  word: string;
  shorthandRepresentation: string;
  breakdown: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: 'basics' | 'rules' | 'practice' | 'tips';
}

export interface FigureRepresentation {
  id: string;
  value: string;
  representation: string;
  description: string;
  category: 'digit' | 'round-number' | 'fraction' | 'percentage' | 'currency';
  example?: string;
}

export interface Intersection {
  id: string;
  word: string;
  intersectedStroke: string;
  strokeName: string;
  description: string;
  usage: string;
  examples: string[];
  position: string;
  category: 'primary' | 'extended' | 'combination' | 'info';
  source?: string; // Unit number or source reference
}
