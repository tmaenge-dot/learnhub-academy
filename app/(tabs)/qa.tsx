import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { qaData } from '@/data/qa';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function QAScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basics' | 'rules' | 'practice' | 'tips'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredQA = qaData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categories = [
    { key: 'all' as const, label: 'All', icon: 'list.bullet' },
    { key: 'basics' as const, label: 'Basics', icon: 'book' },
    { key: 'rules' as const, label: 'Rules', icon: 'checklist' },
    { key: 'practice' as const, label: 'Practice', icon: 'pencil' },
    { key: 'tips' as const, label: 'Tips', icon: 'lightbulb' },
  ];

  const getCategoryCount = (category: typeof selectedCategory) => {
    if (category === 'all') return qaData.length;
    return qaData.filter(q => q.category === category).length;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basics': return '📖';
      case 'rules': return '📋';
      case 'practice': return '✏️';
      case 'tips': return '💡';
      default: return '❓';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Q&A</ThemedText>
        <ThemedText style={styles.subtitle}>
          Guidelines and frequently asked questions
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: Colors[colorScheme ?? 'light'].text,
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              borderColor: Colors[colorScheme ?? 'light'].icon,
            }
          ]}
          placeholder="Search questions..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <ThemedView style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.key}
              onPress={() => setSelectedCategory(category.key)}
              style={[
                styles.categoryButton,
                selectedCategory === category.key && {
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                }
              ]}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.categoryTextActive
                ]}
              >
                {category.label} ({getCategoryCount(category.key)})
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {filteredQA.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleExpand(item.id)}
              activeOpacity={0.7}
            >
              <ThemedView
                style={[
                  styles.card,
                  {
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    borderColor: Colors[colorScheme ?? 'light'].icon,
                  },
                  isExpanded && styles.cardExpanded,
                ]}
              >
                <ThemedView style={styles.questionRow}>
                  <ThemedText style={styles.categoryEmoji}>
                    {getCategoryIcon(item.category)}
                  </ThemedText>
                  <ThemedView style={styles.questionContent}>
                    <ThemedText type="defaultSemiBold" style={styles.question}>
                      {item.question}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.iconContainer}>
                    <ThemedText style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}>
                      ▼
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                {isExpanded && (
                  <ThemedView style={styles.answerContainer}>
                    <ThemedView style={styles.divider} />
                    <ThemedText style={styles.answer}>
                      {item.answer}
                    </ThemedText>
                    <ThemedView style={styles.categoryBadge}>
                      <ThemedText style={styles.categoryBadgeText}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                )}
              </ThemedView>
            </TouchableOpacity>
          );
        })}

        {filteredQA.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No questions found</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Try a different category or search term
            </ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.helpSection}>
          <ThemedText type="defaultSemiBold" style={styles.helpTitle}>
            Need More Help?
          </ThemedText>
          <ThemedText style={styles.helpText}>
            This Q&amp;A section covers the most common questions about learning shorthand. 
            As you practice, you&apos;ll develop your own style and rhythm. Remember:
          </ThemedText>
          <ThemedView style={styles.bulletPoint}>
            <ThemedText style={styles.bullet}>•</ThemedText>
            <ThemedText style={styles.bulletText}>Practice daily for best results</ThemedText>
          </ThemedView>
          <ThemedView style={styles.bulletPoint}>
            <ThemedText style={styles.bullet}>•</ThemedText>
            <ThemedText style={styles.bulletText}>Start slow and focus on accuracy</ThemedText>
          </ThemedView>
          <ThemedView style={styles.bulletPoint}>
            <ThemedText style={styles.bullet}>•</ThemedText>
            <ThemedText style={styles.bulletText}>Read back your notes regularly</ThemedText>
          </ThemedView>
          <ThemedView style={styles.bulletPoint}>
            <ThemedText style={styles.bullet}>•</ThemedText>
            <ThemedText style={styles.bulletText}>Be patient with yourself</ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardExpanded: {
    marginBottom: 16,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  questionContent: {
    flex: 1,
  },
  question: {
    fontSize: 16,
    lineHeight: 22,
  },
  iconContainer: {
    marginLeft: 8,
    marginTop: 4,
  },
  expandIcon: {
    fontSize: 12,
    opacity: 0.5,
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  answerContainer: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginBottom: 12,
  },
  answer: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.4,
  },
  helpSection: {
    backgroundColor: 'rgba(150, 100, 200, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    opacity: 0.6,
  },
  bulletText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
    opacity: 0.8,
  },
});
