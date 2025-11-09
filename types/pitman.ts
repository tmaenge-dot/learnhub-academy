// Pitman Shorthand Type Definitions

export interface PitmanStroke {
  id: string;
  name: string;
  type: 'consonant' | 'vowel' | 'diphthong' | 'blend';
  strokeDirection: 'downward' | 'upward' | 'horizontal' | 'curved';
  thickness: 'light' | 'heavy';
  sound: string;
  examples: string[];
  imageReference?: string;
  variations?: string[];
}

export interface PitmanRule {
  id: string;
  title: string;
  category: 'stroke' | 'vowel' | 'position' | 'prefix' | 'suffix' | 'special';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  imageReference?: string;
}

export interface PitmanVowel {
  id: string;
  vowel: string;
  position: 'beginning' | 'middle' | 'end';
  placement: 'before' | 'after' | 'above' | 'below' | 'through';
  mark: 'light-dot' | 'heavy-dot' | 'light-dash' | 'heavy-dash' | 'tick' | 'curve';
  examples: string[];
  imageReference?: string;
}

export interface PitmanWord {
  id: string;
  word: string;
  outline: string; // Text representation of the outline
  imageUrl?: string; // Image of the actual shorthand
  breakdown: {
    stroke: string;
    type: string;
    description: string;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface RecognitionResult {
  confidence: number;
  word: string;
  alternates?: {
    word: string;
    confidence: number;
  }[];
  strokes: {
    type: string;
    position: { x: number; y: number };
    confidence: number;
  }[];
}

export interface TrainingData {
  id: string;
  imageUrl: string;
  label: string;
  strokes: string[];
  verified: boolean;
  createdAt: Date;
}

export interface AIModel {
  name: string;
  version: string;
  accuracy: number;
  trainingDataCount: number;
  lastTrained: Date;
}
