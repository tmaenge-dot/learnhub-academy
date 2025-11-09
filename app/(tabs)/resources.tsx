import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'image' | 'exercise';
  filePath: string;
  icon: any;
  gradient: [string, string];
  category: 'textbook' | 'exercises' | 'answers' | 'reference';
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Shorthand Textbook',
    description: 'Complete Pitman Shorthand reference book with exercises and practical dictation material',
    type: 'pdf',
    filePath: 'Shorthand-Book.pdf',
    icon: 'book.fill',
    gradient: ['#667eea', '#764ba2'],
    category: 'textbook',
  },
  {
    id: '2',
    title: 'Exercise Answer Key',
    description: 'Solutions and answers to all exercises from the textbook (33 pages)',
    type: 'doc',
    filePath: 'Shorthand-Key.doc',
    icon: 'checkmark.seal.fill',
    gradient: ['#f093fb', '#f5576c'],
    category: 'answers',
  },
];

export default function ResourcesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleResourcePress = async (resource: Resource) => {
    // Show resource information
    Alert.alert(
      resource.title,
      `${resource.description}\n\nFile: ${resource.filePath}\nLocation: assets/reference-materials/pitman/\n\nThis material is available for AI processing and learning.`,
      [
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  const renderResourceCard = (resource: Resource) => (
    <TouchableOpacity
      key={resource.id}
      onPress={() => handleResourcePress(resource)}
      activeOpacity={0.7}
    >
      <View style={[styles.card, isDark && styles.cardDark]}>
        <LinearGradient
          colors={resource.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <IconSymbol name={resource.icon} size={32} color="#ffffff" />
        </LinearGradient>
        
        <View style={styles.cardContent}>
          <ThemedText style={styles.cardTitle}>{resource.title}</ThemedText>
          <ThemedText style={styles.cardDescription}>
            {resource.description}
          </ThemedText>
          
          <View style={styles.metaContainer}>
            <View style={[styles.badge, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
              <ThemedText style={styles.badgeText}>
                {resource.type.toUpperCase()}
              </ThemedText>
            </View>
            <View style={[styles.badge, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
              <ThemedText style={styles.badgeText}>
                {resource.category}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <IconSymbol name="chevron.right" size={20} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={isDark ? ['#1a1a2e', '#16213e'] : ['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <IconSymbol name="books.vertical.fill" size={40} color="#ffffff" />
          <ThemedText style={styles.headerTitle}>Reference Materials</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Textbooks, exercises, and answer keys
          </ThemedText>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            📚 Available Resources
          </ThemedText>
          <ThemedText style={[styles.sectionSubtitle, { color: '#666' }]}>
            {resources.length} reference materials uploaded
          </ThemedText>
        </View>

        <View style={styles.resourcesList}>
          {resources.map(renderResourceCard)}
        </View>

        {/* AI Integration Info */}
        <View style={[styles.infoCard, isDark && styles.infoDark]}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.infoIcon}
          >
            <IconSymbol name="brain.head.profile" size={24} color="#ffffff" />
          </LinearGradient>
          
          <View style={styles.infoContent}>
            <ThemedText style={styles.infoTitle}>AI Integration Ready</ThemedText>
            <ThemedText style={styles.infoText}>
              These materials are being processed for AI-powered shorthand recognition. 
              The system will learn from the textbook exercises and answer key to help 
              you recognize and practice Pitman shorthand.
            </ThemedText>
          </View>
        </View>

        {/* Content Overview */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            📖 Content Overview
          </ThemedText>
        </View>

        <View style={[styles.overviewCard, isDark && styles.cardDark]}>
          <ThemedText style={styles.overviewTitle}>Shorthand Textbook</ThemedText>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#667eea" />
            <ThemedText style={styles.overviewText}>Complete Pitman shorthand theory</ThemedText>
          </View>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#667eea" />
            <ThemedText style={styles.overviewText}>Practical exercises and drills</ThemedText>
          </View>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#667eea" />
            <ThemedText style={styles.overviewText}>Dictation material at various speeds</ThemedText>
          </View>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#667eea" />
            <ThemedText style={styles.overviewText}>Progressive difficulty levels</ThemedText>
          </View>
        </View>

        <View style={[styles.overviewCard, isDark && styles.cardDark]}>
          <ThemedText style={styles.overviewTitle}>Exercise Answer Key</ThemedText>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#f5576c" />
            <ThemedText style={styles.overviewText}>33 pages of detailed solutions</ThemedText>
          </View>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#f5576c" />
            <ThemedText style={styles.overviewText}>Step-by-step explanations</ThemedText>
          </View>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#f5576c" />
            <ThemedText style={styles.overviewText}>Complete answer reference</ThemedText>
          </View>
          <View style={styles.overviewItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#f5576c" />
            <ThemedText style={styles.overviewText}>Perfect for self-study validation</ThemedText>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  resourcesList: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoDark: {
    backgroundColor: '#1e1e1e',
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  overviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  overviewText: {
    fontSize: 14,
    flex: 1,
  },
});
