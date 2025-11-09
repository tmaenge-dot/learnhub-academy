import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function RecognizeScreen() {
  const colorScheme = useColorScheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<{
    word: string;
    confidence: number;
  } | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setRecognitionResult(null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setRecognitionResult(null);
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing (replace with actual AI model later)
    setTimeout(() => {
      setRecognitionResult({
        word: 'Example recognized text',
        confidence: 0.85
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#667eea', '#764ba2', '#f093fb']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ThemedView style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <IconSymbol name="camera.fill" size={28} color="#fff" />
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>AI Recognition</ThemedText>
              <ThemedText style={styles.subtitle}>
                Upload or capture shorthand
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <ThemedView style={styles.infoCard}>
          <IconSymbol name="info.circle.fill" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedView style={styles.infoText}>
            <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
              AI Feature Coming Soon
            </ThemedText>
            <ThemedText style={styles.infoDescription}>
              Upload reference materials and training data to help the AI learn Pitman shorthand recognition.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Upload Shorthand Image
        </ThemedText>

        <View style={styles.uploadButtons}>
          <TouchableOpacity onPress={pickImage} style={{ flex: 1 }}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.uploadButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="photo.fill" size={32} color="#fff" />
              <ThemedText style={styles.uploadButtonText}>
                From Gallery
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePhoto} style={{ flex: 1 }}>
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              style={styles.uploadButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <IconSymbol name="camera.fill" size={32} color="#fff" />
              <ThemedText style={styles.uploadButtonText}>
                Take Photo
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <TouchableOpacity 
              onPress={processImage}
              disabled={isProcessing}
            >
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.processButton}
              >
                <ThemedText style={styles.processButtonText}>
                  {isProcessing ? 'Processing...' : 'Recognize Shorthand'}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {recognitionResult && (
          <LinearGradient
            colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
            style={styles.resultCard}
          >
            <ThemedText type="defaultSemiBold" style={styles.resultTitle}>
              Recognition Result
            </ThemedText>
            <ThemedText style={styles.resultWord}>
              &quot;{recognitionResult.word}&quot;
            </ThemedText>
            <ThemedText style={styles.resultConfidence}>
              Confidence: {(recognitionResult.confidence * 100).toFixed(1)}%
            </ThemedText>
          </LinearGradient>
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Training Materials Needed
        </ThemedText>

        <LinearGradient
          colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
          style={styles.guideCard}
        >
          <ThemedText type="defaultSemiBold" style={styles.guideTitle}>
            📚 Reference Materials to Upload:
          </ThemedText>
          
          <View style={styles.checklistItem}>
            <ThemedText style={styles.bullet}>✓</ThemedText>
            <ThemedText style={styles.checklistText}>
              Pitman shorthand stroke charts
            </ThemedText>
          </View>
          
          <View style={styles.checklistItem}>
            <ThemedText style={styles.bullet}>✓</ThemedText>
            <ThemedText style={styles.checklistText}>
              Individual stroke examples (consonants, vowels, blends)
            </ThemedText>
          </View>
          
          <View style={styles.checklistItem}>
            <ThemedText style={styles.bullet}>✓</ThemedText>
            <ThemedText style={styles.checklistText}>
              Complete word outlines with labels
            </ThemedText>
          </View>
          
          <View style={styles.checklistItem}>
            <ThemedText style={styles.bullet}>✓</ThemedText>
            <ThemedText style={styles.checklistText}>
              Phrase representations
            </ThemedText>
          </View>
          
          <View style={styles.checklistItem}>
            <ThemedText style={styles.bullet}>✓</ThemedText>
            <ThemedText style={styles.checklistText}>
              Handwritten samples for training
            </ThemedText>
          </View>
        </LinearGradient>

        <ThemedText style={styles.footerNote}>
          💡 Place your reference materials in the{' '}
          <ThemedText type="defaultSemiBold">
            assets/reference-materials/pitman
          </ThemedText>
          {' '}folder. The AI model will be trained using these materials to recognize Pitman shorthand accurately.
        </ThemedText>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  uploadButton: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  imagePreview: {
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 16,
  },
  processButton: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  processButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  resultWord: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultConfidence: {
    fontSize: 14,
    opacity: 0.7,
  },
  guideCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  guideTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    marginRight: 12,
    color: '#4CAF50',
  },
  checklistText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  footerNote: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 8,
  },
});
