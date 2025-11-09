import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getAllProfessionalStrokes, professionalStrokes } from '@/data/stroke-professional';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// Hand-drawn strokes not currently available
// This comparison view shows professional strokes only
const handDrawnStrokes: Record<string, any> = {};

interface StrokeComparisonProps {
  strokeName: string;
  professional: any;
  handDrawn?: any;
}

const StrokeComparison: React.FC<StrokeComparisonProps> = ({ strokeName, professional, handDrawn }) => {
  const [showProfessional, setShowProfessional] = useState(true);
  const hasHandDrawn = !!handDrawn;

  return (
    <View style={styles.comparisonCard}>
      <View style={styles.cardHeader}>
        <ThemedText style={styles.strokeName}>{strokeName}</ThemedText>
        {hasHandDrawn && (
          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleLabel, !showProfessional && styles.toggleLabelActive]}>
              Hand-drawn
            </Text>
            <Switch
              value={showProfessional}
              onValueChange={setShowProfessional}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={showProfessional ? '#fff' : '#f4f3f4'}
            />
            <Text style={[styles.toggleLabel, showProfessional && styles.toggleLabelActive]}>
              Professional
            </Text>
          </View>
        )}
        {!hasHandDrawn && (
          <View style={styles.professionalOnlyBadge}>
            <Text style={styles.professionalOnlyText}>✨ Professional Only</Text>
          </View>
        )}
      </View>

      <View style={styles.imageContainer}>
        {showProfessional || !hasHandDrawn ? (
          <View style={styles.imageWrapper}>
            <Image
              source={professional}
              style={styles.strokeImage}
              resizeMode="contain"
            />
            <View style={styles.qualityBadge}>
              <Text style={styles.badgeText}>✨ Book Quality</Text>
            </View>
          </View>
        ) : (
          <View style={styles.imageWrapper}>
            <Image
              source={handDrawn}
              style={styles.strokeImage}
              resizeMode="contain"
            />
            <View style={[styles.qualityBadge, styles.handDrawnBadge]}>
              <Text style={styles.badgeText}>✏️ Hand-drawn</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Source:</Text>
        <Text style={styles.infoValue}>
          Official Textbook (300 DPI)
        </Text>
      </View>
    </View>
  );
};

export default function StrokeComparisonView() {
  const router = useRouter();
  const [selectedUnit, setSelectedUnit] = useState<'all' | 1 | 2 | 3>('all');
  const allStrokes = getAllProfessionalStrokes();

  // Group strokes by unit
  const unit1Strokes = ['P', 'B', 'T', 'D', 'CH', 'J'];
  const unit2Strokes = ['F', 'V', 'TH', 'THE', 'ITH', 'S', 'Z', 'SH', 'ZH', 'ISH', 'ZHEE'];
  const unit3Strokes = ['K', 'G', 'M', 'N', 'NG', 'L', 'W', 'Y', 'H'];

  const getFilteredStrokes = () => {
    switch (selectedUnit) {
      case 1: return unit1Strokes;
      case 2: return unit2Strokes;
      case 3: return unit3Strokes;
      default: return allStrokes;
    }
  };

  const filteredStrokes = getFilteredStrokes();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Back Button Header */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={24} color="#4CAF50" />
            <Text style={styles.backButtonText}>Back to Strokes</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Professional Strokes</ThemedText>
          <ThemedText style={styles.subtitle}>
            Book-quality strokes from official textbook
          </ThemedText>
        </View>

        {/* Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>26</Text>
            <Text style={styles.statLabel}>Total Strokes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Extracted</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>300</Text>
            <Text style={styles.statLabel}>DPI Quality</Text>
          </View>
        </View>

        {/* Unit Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedUnit === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedUnit('all')}
          >
            <Text style={[styles.filterText, selectedUnit === 'all' && styles.filterTextActive]}>
              All ({allStrokes.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedUnit === 1 && styles.filterButtonActive]}
            onPress={() => setSelectedUnit(1)}
          >
            <Text style={[styles.filterText, selectedUnit === 1 && styles.filterTextActive]}>
              Unit 1 ({unit1Strokes.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedUnit === 2 && styles.filterButtonActive]}
            onPress={() => setSelectedUnit(2)}
          >
            <Text style={[styles.filterText, selectedUnit === 2 && styles.filterTextActive]}>
              Unit 2 ({unit2Strokes.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedUnit === 3 && styles.filterButtonActive]}
            onPress={() => setSelectedUnit(3)}
          >
            <Text style={[styles.filterText, selectedUnit === 3 && styles.filterTextActive]}>
              Unit 3 ({unit3Strokes.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Comparison Grid */}
        <View style={styles.grid}>
          {filteredStrokes.map((strokeName) => (
            <StrokeComparison
              key={strokeName}
              strokeName={strokeName}
              professional={professionalStrokes[strokeName as keyof typeof professionalStrokes]}
              handDrawn={handDrawnStrokes[strokeName as keyof typeof handDrawnStrokes]}
            />
          ))}
        </View>

        {/* Info Footer */}
        <View style={styles.footer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>✨ Quality Improvements</Text>
            <Text style={styles.infoBoxText}>
              • Book-quality strokes from official textbook{'\n'}
              • 300 DPI resolution for crystal-clear display{'\n'}
              • Optimized SVG for large strokes (99% size reduction){'\n'}
              • Professional appearance for learners
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>📊 File Optimization</Text>
            <Text style={styles.infoBoxText}>
              • P, V, K, F converted to SVG (4-5KB each){'\n'}
              • Saved ~2.4 MB total size{'\n'}
              • Infinitely scalable vector graphics{'\n'}
              • Faster loading and smoother performance
            </Text>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  grid: {
    paddingHorizontal: 20,
    gap: 20,
  },
  comparisonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  strokeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 12,
    color: '#999',
  },
  toggleLabelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  professionalOnlyBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  professionalOnlyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  imageContainer: {
    minHeight: 300,
    maxHeight: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  strokeImage: {
    width: '100%',
    maxHeight: 300,
    minHeight: 150,
  },
  qualityBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  handDrawnBadge: {
    backgroundColor: '#FF9800',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  placeholderWrapper: {
    padding: 40,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 12,
    color: '#333',
  },
  footer: {
    padding: 20,
    gap: 16,
    marginTop: 20,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoBoxText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});
