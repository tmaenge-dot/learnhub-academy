import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { STROKE_LIBRARY } from '@/data/stroke-library';
import { getStrokeSVG } from '@/data/stroke-svgs';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function StrokesScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'STRAIGHT_DOWN' | 'CURVED' | 'HORIZONTAL' | 'UPWARD' | 'SPECIAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStrokes = STROKE_LIBRARY.filter(stroke => {
    const matchesCategory = selectedCategory === 'ALL' || stroke.category === selectedCategory;
    const matchesSearch = stroke.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stroke.sound.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stroke.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { key: 'ALL' as const, label: 'All', icon: 'star.fill' },
    { key: 'STRAIGHT_DOWN' as const, label: 'Straight ↓', icon: 'arrow.down' },
    { key: 'CURVED' as const, label: 'Curved', icon: 'arrow.turn.down.right' },
    { key: 'HORIZONTAL' as const, label: 'Horizontal →', icon: 'arrow.right' },
    { key: 'UPWARD' as const, label: 'Upward ↑', icon: 'arrow.up' },
    { key: 'SPECIAL' as const, label: 'Special', icon: 'sparkle' },
  ];

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#667eea', '#764ba2', '#f093fb']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <IconSymbol name="pencil.line" size={28} color="#fff" />
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>Stroke Library</ThemedText>
              <ThemedText style={styles.subtitle}>
                ✨ AI-Extracted Visual Descriptions
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>24</ThemedText>
              <ThemedText style={styles.statLabel}>Total</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{filteredStrokes.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Showing</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>8</ThemedText>
              <ThemedText style={styles.statLabel}>Curved</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>6</ThemedText>
              <ThemedText style={styles.statLabel}>Straight</ThemedText>
            </View>
          </View>

          {/* AI Extraction Info */}
          <View style={styles.aiInfoBox}>
            <IconSymbol name="sparkles" size={16} color="#FFD700" />
            <ThemedText style={styles.aiInfoText}>
              From Pitman Reference • Page 9 & 17 • AI Vision Analyzed
            </ThemedText>
          </View>

          {/* PNG vs SVG Comparison Button */}
          <TouchableOpacity 
            style={styles.comparisonButton}
            onPress={() => router.push('/(tabs)/comparison')}
          >
            <IconSymbol name="square.split.2x1.fill" size={18} color="#fff" />
            <ThemedText style={styles.comparisonButtonText}>
              Compare PNG vs SVG Formats
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#fff" />
          </TouchableOpacity>

          {/* Professional Strokes Comparison Button - NEW */}
          <TouchableOpacity 
            style={[styles.comparisonButton, styles.professionalButton]}
            onPress={() => router.push('/(tabs)/professional-comparison')}
          >
            <IconSymbol name="sparkles" size={18} color="#fff" />
            <ThemedText style={styles.comparisonButtonText}>
              ✨ View Professional Book-Quality Strokes
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ThemedView style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <IconSymbol name="magnifyingglass" size={20} color={Colors[colorScheme ?? 'light'].tabIconDefault} style={styles.searchIcon} />
          <TextInput
            style={[
              styles.searchInput,
              {
                color: Colors[colorScheme ?? 'light'].text,
                backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              }
            ]}
            placeholder="Search by name, sound, or description..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.key}
              onPress={() => setSelectedCategory(category.key)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedCategory === category.key 
                  ? (colorScheme === 'dark' ? ['#667eea', '#764ba2'] : ['#667eea', '#764ba2'])
                  : ['rgba(128, 128, 128, 0.15)', 'rgba(128, 128, 128, 0.15)']}
                style={styles.categoryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <IconSymbol 
                  name={category.icon as any} 
                  size={14} 
                  color={selectedCategory === category.key ? '#fff' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 6 }}
                />
                <ThemedText
                  style={[
                    styles.categoryText,
                    selectedCategory === category.key && styles.categoryTextActive
                  ]}
                >
                  {category.label}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {filteredStrokes.map((stroke) => (
          <TouchableOpacity key={stroke.id} activeOpacity={0.9}>
            <LinearGradient
              colors={colorScheme === 'dark' 
                ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] 
                : ['#ffffff', '#f8f9fa']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* AI Vision Badge */}
              <View style={styles.aiBadgeContainer}>
                <View style={styles.aiBadge}>
                  <IconSymbol name="eye" size={10} color="#FFD700" />
                  <ThemedText style={styles.aiBadgeText}>AI Vision</ThemedText>
                </View>
              </View>

              <View style={styles.cardHeader}>
                <View style={styles.strokeInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <ThemedText type="defaultSemiBold" style={styles.strokeName}>
                      {stroke.name}
                    </ThemedText>
                    {stroke.phonetic && (
                      <View style={styles.phoneticBadge}>
                        <ThemedText style={styles.phoneticText}>{stroke.phonetic}</ThemedText>
                      </View>
                    )}
                  </View>
                  
                  <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                    <View style={[styles.categoryBadge, { 
                      backgroundColor: stroke.category === 'STRAIGHT_DOWN' ? '#667eea20' : 
                                     stroke.category === 'CURVED' ? '#f093fb20' :
                                     stroke.category === 'HORIZONTAL' ? '#764ba220' :
                                     stroke.category === 'UPWARD' ? '#00d4aa20' : '#FFD70020'
                    }]}>
                      <ThemedText style={[styles.categoryBadgeText, {
                        color: stroke.category === 'STRAIGHT_DOWN' ? '#667eea' : 
                               stroke.category === 'CURVED' ? '#f093fb' :
                               stroke.category === 'HORIZONTAL' ? '#764ba2' :
                               stroke.category === 'UPWARD' ? '#00d4aa' : '#FFD700'
                      }]}>
                        {stroke.category.replace('_', ' ')}
                      </ThemedText>
                    </View>

                    {stroke.weight && (
                      <View style={[styles.weightBadge, { 
                        backgroundColor: stroke.weight.includes('Heavy') ? '#ff6b6b20' : '#51cf6620'
                      }]}>
                        <ThemedText style={[styles.weightText, {
                          color: stroke.weight.includes('Heavy') ? '#ff6b6b' : '#51cf66'
                        }]}>
                          {stroke.weight}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>
                
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.soundContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <ThemedText style={styles.soundText}>{stroke.sound}</ThemedText>
                </LinearGradient>

                {/* Stroke Symbol - The actual shorthand representation! */}
                <View style={styles.strokeSymbolContainer}>
                  <Image 
                    source={getStrokeSVG(stroke.id)} 
                    style={styles.strokeSvg}
                    resizeMode="contain"
                  />
                </View>
              </View>
              
              {/* Visual Description - The Key AI-Extracted Part! */}
              <View style={styles.visualSection}>
                <View style={styles.visualHeader}>
                  <IconSymbol name="eye.fill" size={16} color="#667eea" />
                  <ThemedText style={styles.visualLabel}>Visual:</ThemedText>
                </View>
                <ThemedText style={styles.visualText}>{stroke.visual}</ThemedText>
              </View>

              {/* Direction */}
              {stroke.direction && (
                <View style={styles.directionSection}>
                  <IconSymbol name="arrow.up.and.down.and.arrow.left.and.right" size={14} color="#764ba2" />
                  <ThemedText style={styles.directionText}>{stroke.direction}</ThemedText>
                </View>
              )}
              
              {/* Full Description */}
              <ThemedText style={styles.description}>{stroke.description}</ThemedText>
              
              {/* Examples */}
              <View style={styles.exampleContainer}>
                <IconSymbol name="lightbulb.fill" size={16} color={Colors[colorScheme ?? 'light'].tint} style={styles.exampleIcon} />
                <View style={{ flex: 1 }}>
                  <ThemedText style={styles.exampleLabel}>Example Words:</ThemedText>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                    {stroke.examples.map((example, i) => (
                      <View key={i} style={styles.exampleTag}>
                        <ThemedText style={styles.exampleText}>{example}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Source Reference */}
              <View style={styles.sourceRef}>
                <IconSymbol name="book.closed.fill" size={12} color="#999" />
                <ThemedText style={styles.sourceText}>Source: {stroke.sourceReference}</ThemedText>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {filteredStrokes.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="magnifyingglass" size={48} color="#999" />
            <ThemedText style={styles.emptyText}>No strokes found</ThemedText>
            <ThemedText style={styles.emptyHint}>Try adjusting your search or category filter</ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aiInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  aiInfoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.95)',
    flex: 1,
  },
  comparisonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  comparisonButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  professionalButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderColor: 'rgba(76, 175, 80, 0.5)',
  },
  aiBadgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    gap: 4,
  },
  aiBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 16,
    zIndex: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 48,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  strokeInfo: {
    flex: 1,
  },
  strokeName: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  symbolContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  symbol: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
    opacity: 0.8,
  },
  exampleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  exampleIcon: {
    marginTop: 2,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  example: {
    fontSize: 15,
    fontWeight: '500',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    opacity: 0.6,
  },
  emptyHint: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.4,
  },
  phoneticBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  phoneticText: {
    fontSize: 11,
    color: '#667eea',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  weightBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  weightText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  soundContainer: {
    minWidth: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  soundText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  strokeSymbolContainer: {
    minWidth: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderWidth: 2,
    borderColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  strokeSymbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#667eea',
  },
  strokeSvg: {
    width: 60,
    height: 60,
    tintColor: '#667eea',
  },
  visualSection: {
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#667eea',
  },
  visualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  visualLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#667eea',
  },
  visualText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  directionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingLeft: 4,
  },
  directionText: {
    fontSize: 13,
    fontStyle: 'italic',
    opacity: 0.75,
  },
  exampleTag: {
    backgroundColor: 'rgba(118, 75, 162, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sourceRef: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  sourceText: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
});
