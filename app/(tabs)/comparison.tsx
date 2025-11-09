import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Import all stroke data
import { strokesData } from '@/data/strokes';
import { svgStrokeData } from '@/data/svg-stroke-data';
import { Stroke } from '@/types/shorthand';

// Map stroke IDs to consonant names for file lookup
const strokeIdToName: Record<string, string> = {
  'c1': 'P', 'c2': 'B', 'c3': 'T', 'c4': 'D', 'c5': 'CH', 'c6': 'J',
  'c7': 'F', 'c8': 'V', 'c9': 'ITH', 'c10': 'THE', 'c11': 'S', 'c12': 'Z',
  'c13': 'ISH', 'c14': 'ZHEE', 'c15': 'K', 'c16': 'G', 'c17': 'M', 'c18': 'N',
  'c19': 'NG', 'c20': 'L', 'c21': 'R', 'c22': 'W', 'c23': 'Y', 'c24': 'H',
  'c25': 'H_DOWN', 'c26': 'H_UP',
};

// Import PNG strokes
const pngStrokes: Record<string, any> = {
  P: require('@/assets/stroke-images/consonants/P.png'),
  B: require('@/assets/stroke-images/consonants/B.png'),
  T: require('@/assets/stroke-images/consonants/T.png'),
  D: require('@/assets/stroke-images/consonants/D.png'),
  CH: require('@/assets/stroke-images/consonants/CH.png'),
  J: require('@/assets/stroke-images/consonants/J.png'),
  F: require('@/assets/stroke-images/consonants/F.png'),
  V: require('@/assets/stroke-images/consonants/V.png'),
  ITH: require('@/assets/stroke-images/consonants/ITH.png'),
  THE: require('@/assets/stroke-images/consonants/THE.png'),
  S: require('@/assets/stroke-images/consonants/S.png'),
  Z: require('@/assets/stroke-images/consonants/Z.png'),
  ISH: require('@/assets/stroke-images/consonants/ISH.png'),
  ZHEE: require('@/assets/stroke-images/consonants/ZHEE.png'),
  K: require('@/assets/stroke-images/consonants/K.png'),
  G: require('@/assets/stroke-images/consonants/G.png'),
  M: require('@/assets/stroke-images/consonants/M.png'),
  N: require('@/assets/stroke-images/consonants/N.png'),
  NG: require('@/assets/stroke-images/consonants/NG.png'),
  L: require('@/assets/stroke-images/consonants/L.png'),
  R: require('@/assets/stroke-images/consonants/R.png'),
  W: require('@/assets/stroke-images/consonants/W.png'),
  Y: require('@/assets/stroke-images/consonants/Y.png'),
  H: require('@/assets/stroke-images/consonants/H.png'),
  H_DOWN: require('@/assets/stroke-images/consonants/H_DOWN.png'),
  H_UP: require('@/assets/stroke-images/consonants/H_UP.png'),
};

export default function StrokeComparisonScreen() {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'png' | 'svg'>('side-by-side');

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🔬 Stroke Comparison</Text>
        <Text style={styles.headerSubtitle}>Hand-Drawn PNG vs Vectorized SVG</Text>
      </LinearGradient>

      {/* View Mode Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'side-by-side' && styles.toggleButtonActive]}
          onPress={() => setViewMode('side-by-side')}
        >
          <Text style={[styles.toggleText, viewMode === 'side-by-side' && styles.toggleTextActive]}>
            Side-by-Side
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'png' && styles.toggleButtonActive]}
          onPress={() => setViewMode('png')}
        >
          <Text style={[styles.toggleText, viewMode === 'png' && styles.toggleTextActive]}>
            PNG Only
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'svg' && styles.toggleButtonActive]}
          onPress={() => setViewMode('svg')}
        >
          <Text style={[styles.toggleText, viewMode === 'svg' && styles.toggleTextActive]}>
            SVG Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>PNG Size</Text>
          <Text style={styles.statValue}>233 KB</Text>
          <Text style={styles.statDetail}>9 KB avg</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>SVG Size</Text>
          <Text style={styles.statValue}>45 KB</Text>
          <Text style={styles.statDetail}>1.8 KB avg</Text>
        </View>
        <View style={[styles.statCard, styles.statCardHighlight]}>
          <Text style={styles.statLabel}>Savings</Text>
          <Text style={[styles.statValue, styles.statValueHighlight]}>80%</Text>
          <Text style={styles.statDetail}>188 KB smaller</Text>
        </View>
      </View>

      {/* Stroke Grid */}
      <View style={styles.gridContainer}>
        {strokesData.filter(s => s.category === 'consonant').map((stroke: Stroke) => {
          const consonantName = strokeIdToName[stroke.id];
          if (!consonantName || !pngStrokes[consonantName]) return null;
          
          return (
          <View key={stroke.id} style={styles.strokeCard}>
            <Text style={styles.strokeName}>{consonantName}</Text>
            <Text style={styles.strokeLabel}>{stroke.name}</Text>

            {viewMode === 'side-by-side' && (
              <View style={styles.comparisonRow}>
                {/* PNG Version */}
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>PNG</Text>
                  <View style={styles.strokeDisplay}>
                    {pngStrokes[consonantName] && (
                      <Image
                        source={pngStrokes[consonantName]}
                        style={styles.strokeImage}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text style={styles.sizeLabel}>~9KB</Text>
                </View>

                {/* SVG Version */}
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>SVG</Text>
                  <View style={styles.strokeDisplay}>
                    {svgStrokeData[consonantName] ? (
                      <SvgXml 
                        xml={svgStrokeData[consonantName]} 
                        width={60} 
                        height={60}
                      />
                    ) : (
                      <Text style={styles.svgPlaceholder}>N/A</Text>
                    )}
                  </View>
                  <Text style={styles.sizeLabel}>~2KB</Text>
                </View>
              </View>
            )}

            {viewMode === 'png' && (
              <View style={styles.singleView}>
                <View style={styles.strokeDisplayLarge}>
                  {pngStrokes[consonantName] && (
                    <Image
                      source={pngStrokes[consonantName]}
                      style={styles.strokeImageLarge}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <Text style={styles.formatBadge}>PNG Format</Text>
              </View>
            )}

            {viewMode === 'svg' && (
              <View style={styles.singleView}>
                <View style={styles.strokeDisplayLarge}>
                  {svgStrokeData[consonantName] ? (
                    <SvgXml 
                      xml={svgStrokeData[consonantName]} 
                      width={80} 
                      height={80}
                    />
                  ) : (
                    <Text style={styles.svgPlaceholder}>N/A</Text>
                  )}
                </View>
                <Text style={styles.formatBadge}>SVG Format</Text>
              </View>
            )}
          </View>
          );
        })}
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>📊 Technical Comparison</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>✅ PNG Advantages</Text>
          <Text style={styles.infoText}>• Simple implementation (no extra libraries)</Text>
          <Text style={styles.infoText}>• Guaranteed exact appearance</Text>
          <Text style={styles.infoText}>• Already working in app</Text>
          <Text style={styles.infoText}>• Hand-drawn authenticity</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>✅ SVG Advantages</Text>
          <Text style={styles.infoText}>• 80% smaller file size (45 KB vs 233 KB)</Text>
          <Text style={styles.infoText}>• Infinite scalability without pixelation</Text>
          <Text style={styles.infoText}>• Professional vector graphics</Text>
          <Text style={styles.infoText}>• Perfect for responsive design</Text>
        </View>

        <View style={[styles.infoCard, styles.infoCardRecommendation]}>
          <Text style={styles.infoCardTitle}>🎯 Recommendation</Text>
          <Text style={styles.infoText}>Keep PNG for now (working perfectly!)</Text>
          <Text style={styles.infoText}>Upgrade to SVG before production release</Text>
          <Text style={styles.infoText}>Both versions traced from your hand drawings</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 8,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  statCardHighlight: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statValueHighlight: {
    color: '#4caf50',
  },
  statDetail: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  gridContainer: {
    padding: 16,
    gap: 16,
  },
  strokeCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  strokeName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 4,
  },
  strokeLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  strokeDisplay: {
    width: '100%',
    height: 80,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeImage: {
    width: 60,
    height: 60,
  },
  svgPlaceholder: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  sizeLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  singleView: {
    alignItems: 'center',
  },
  strokeDisplayLarge: {
    width: '100%',
    height: 120,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeImageLarge: {
    width: 80,
    height: 80,
  },
  formatBadge: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
    marginTop: 8,
  },
  infoSection: {
    padding: 16,
    paddingTop: 8,
    gap: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  infoCardRecommendation: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
});
