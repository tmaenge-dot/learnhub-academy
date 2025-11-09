/**
 * Stroke image assets mapping
 * Maps stroke IDs to their corresponding PNG image files (hand-drawn)
 */

// Import all hand-drawn stroke PNG files
const strokeSVGs: Record<string, any> = {
  // Curved strokes
  F: require('../assets/stroke-images/consonants/F.png'),
  V: require('../assets/stroke-images/consonants/V.png'),
  ITH: require('../assets/stroke-images/consonants/ITH.png'),
  THE: require('../assets/stroke-images/consonants/THE.png'),
  S: require('../assets/stroke-images/consonants/S.png'),
  Z: require('../assets/stroke-images/consonants/Z.png'),
  ISH: require('../assets/stroke-images/consonants/ISH.png'),
  ZHEE: require('../assets/stroke-images/consonants/ZHEE.png'),
  
  // Straight strokes
  P: require('../assets/stroke-images/consonants/P.png'),
  B: require('../assets/stroke-images/consonants/B.png'),
  T: require('../assets/stroke-images/consonants/T.png'),
  D: require('../assets/stroke-images/consonants/D.png'),
  CH: require('../assets/stroke-images/consonants/CH.png'),
  J: require('../assets/stroke-images/consonants/J.png'),
  
  // Horizontal strokes
  K: require('../assets/stroke-images/consonants/K.png'),
  G: require('../assets/stroke-images/consonants/G.png'),
  M: require('../assets/stroke-images/consonants/M.png'),
  
  // Upward strokes
  N: require('../assets/stroke-images/consonants/N.png'),
  NG: require('../assets/stroke-images/consonants/NG.png'),
  L: require('../assets/stroke-images/consonants/L.png'),
  W: require('../assets/stroke-images/consonants/W.png'),
  Y: require('../assets/stroke-images/consonants/Y.png'),
  R: require('../assets/stroke-images/consonants/R.png'),
  
  // Special - H variations
  H: require('../assets/stroke-images/consonants/H.png'),  // Dot
  H_DOWN: require('../assets/stroke-images/consonants/H_DOWN.png'),  // Downward tick
  H_UP: require('../assets/stroke-images/consonants/H_UP.png'),  // Upward tick (hay)
};

/**
 * Get SVG source for a stroke by ID
 */
export function getStrokeSVG(strokeId: string): any {
  return strokeSVGs[strokeId];
}

/**
 * Check if a stroke has an SVG available
 */
export function hasStrokeSVG(strokeId: string): boolean {
  return strokeId in strokeSVGs;
}

export default strokeSVGs;
