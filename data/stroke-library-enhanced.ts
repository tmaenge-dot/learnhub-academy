/**
 * Enhanced Stroke Library with Professional Stroke Integration
 * 
 * This module augments the stroke library with professional book-quality images
 * and provides a unified interface for accessing both hand-drawn and professional strokes.
 */

import { STROKE_LIBRARY, Stroke } from './stroke-library';
import { getProfessionalStroke, hasProfessionalStroke } from './stroke-professional';

export interface EnhancedStroke extends Stroke {
  hasProfessional: boolean;
  professionalImage?: any;
  handDrawnImage?: any;
  imageSource: any; // The actual image to display (professional if available, else hand-drawn)
  quality: 'professional' | 'hand-drawn';
  fileSize?: string;
  optimization?: 'svg' | 'png';
}

/**
 * Enhance strokes with professional images where available
 */
export function getEnhancedStrokeLibrary(useProfessional: boolean = true): EnhancedStroke[] {
  return STROKE_LIBRARY.map(stroke => {
    const professionalImage = getProfessionalStroke(stroke.id);
    const hasPro = hasProfessionalStroke(stroke.id);
    
    // Determine which image to use
    const imageSource = useProfessional && professionalImage ? professionalImage : stroke.svgPath;
    const quality = useProfessional && hasPro ? 'professional' : 'hand-drawn';
    
    // Check if this is an optimized SVG (P, V, K, F)
    const isOptimizedSVG = ['P', 'V', 'K', 'F'].includes(stroke.id);
    
    return {
      ...stroke,
      hasProfessional: hasPro,
      professionalImage: professionalImage,
      handDrawnImage: stroke.svgPath,
      imageSource: imageSource,
      quality: quality,
      optimization: hasPro && isOptimizedSVG ? 'svg' : 'png',
      fileSize: hasPro && isOptimizedSVG ? '~5KB' : hasPro ? '~50KB' : undefined,
    };
  });
}

/**
 * Get a single enhanced stroke by ID
 */
export function getEnhancedStroke(strokeId: string, useProfessional: boolean = true): EnhancedStroke | undefined {
  const library = getEnhancedStrokeLibrary(useProfessional);
  return library.find(s => s.id === strokeId);
}

/**
 * Get statistics about professional stroke coverage
 */
export function getProfessionalStrokeStats() {
  const totalStrokes = STROKE_LIBRARY.length;
  const professionalCount = STROKE_LIBRARY.filter(s => hasProfessionalStroke(s.id)).length;
  const optimizedCount = ['P', 'V', 'K', 'F'].filter(id => hasProfessionalStroke(id)).length;
  
  return {
    total: totalStrokes,
    professional: professionalCount,
    handDrawn: totalStrokes - professionalCount,
    optimizedSVG: optimizedCount,
    coverage: Math.round((professionalCount / totalStrokes) * 100),
  };
}

/**
 * Filter strokes by category with professional preference
 */
export function getStrokesByCategory(
  category: Stroke['category'] | 'ALL',
  useProfessional: boolean = true
): EnhancedStroke[] {
  const library = getEnhancedStrokeLibrary(useProfessional);
  
  if (category === 'ALL') {
    return library;
  }
  
  return library.filter(stroke => stroke.category === category);
}

/**
 * Search strokes with professional preference
 */
export function searchStrokes(
  query: string,
  useProfessional: boolean = true
): EnhancedStroke[] {
  const library = getEnhancedStrokeLibrary(useProfessional);
  const lowerQuery = query.toLowerCase();
  
  return library.filter(stroke =>
    stroke.name.toLowerCase().includes(lowerQuery) ||
    stroke.sound.toLowerCase().includes(lowerQuery) ||
    stroke.description.toLowerCase().includes(lowerQuery) ||
    stroke.examples.some(ex => ex.toLowerCase().includes(lowerQuery))
  );
}

// Export for backwards compatibility
export { STROKE_LIBRARY } from './stroke-library';
export type { Stroke } from './stroke-library';

