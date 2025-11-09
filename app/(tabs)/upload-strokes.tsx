import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface StrokeImage {
  id: string;
  word: string;
  unit: string;
  uri: string;
  timestamp: string;
}

export default function UploadStrokesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [word, setWord] = useState('');
  const [unit, setUnit] = useState('1');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadedStrokes, setUploadedStrokes] = useState<StrokeImage[]>([]);

  const units = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveStrokeImage = async () => {
    if (!word.trim()) {
      Alert.alert('Error', 'Please enter the word this stroke represents');
      return;
    }

    if (!imageUri) {
      Alert.alert('Error', 'Please select or capture an image');
      return;
    }

    try {
      // Create filename
      const filename = `${word.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
      // Store in app's cache directory - fallback to empty string for web
      const baseDir = (FileSystem as typeof FileSystem & { documentDirectory?: string }).documentDirectory || '';
      const destinationPath = `${baseDir}stroke-images/unit${unit}/${filename}`;
      
      // Ensure directory exists
      const dirPath = `${baseDir}stroke-images/unit${unit}`;
      const dirInfo = await FileSystem.getInfoAsync(dirPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
      }

      // Copy image to app directory
      await FileSystem.copyAsync({
        from: imageUri,
        to: destinationPath,
      });

      const newStroke: StrokeImage = {
        id: `stroke_${Date.now()}`,
        word: word.trim(),
        unit: unit,
        uri: destinationPath,
        timestamp: new Date().toISOString(),
      };

      setUploadedStrokes([newStroke, ...uploadedStrokes]);
      
      // Save metadata to file
      await saveMetadata([newStroke, ...uploadedStrokes]);
      
      // Clear form
      setWord('');
      setImageUri(null);
      
      Alert.alert('Success', `Stroke image for "${newStroke.word}" saved to Unit ${unit}!`);
    } catch (error) {
      console.error('Error saving stroke image:', error);
      Alert.alert('Error', 'Failed to save stroke image');
    }
  };

  const saveMetadata = async (strokes: StrokeImage[]) => {
    try {
      const baseDir = (FileSystem as typeof FileSystem & { documentDirectory?: string }).documentDirectory || '';
      const metadataPath = `${baseDir}stroke-images/metadata.json`;
      await FileSystem.writeAsStringAsync(metadataPath, JSON.stringify(strokes, null, 2));
    } catch (error) {
      console.error('Error saving metadata:', error);
    }
  };

  const renderStrokeItem = ({ item }: { item: StrokeImage }) => (
    <View style={styles.strokeItem}>
      <Image source={{ uri: item.uri }} style={styles.strokeThumbnail} />
      <View style={styles.strokeInfo}>
        <ThemedText style={styles.strokeWord}>{item.word}</ThemedText>
        <ThemedText style={styles.strokeMeta}>Unit {item.unit}</ThemedText>
        <ThemedText style={styles.strokeMeta}>
          {new Date(item.timestamp).toLocaleDateString()}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={isDark ? ['#1a1a2e', '#16213e'] : ['#e3f2fd', '#bbdefb']}
          style={styles.header}
        >
          <ThemedText type="title" style={styles.headerTitle}>
            Upload Stroke Images
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            For AI Training & Recognition
          </ThemedText>
        </LinearGradient>

        <View style={styles.content}>
          <LinearGradient
            colors={isDark ? ['#2d2d44', '#3a3a5a'] : ['#ffffff', '#f5f5f5']}
            style={styles.card}
          >
            <ThemedText type="subtitle" style={styles.cardTitle}>
              📸 Upload Shortform Image
            </ThemedText>

            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Word/Phrase:</ThemedText>
              <TextInput
                style={[styles.input, { color: isDark ? '#fff' : '#000' }]}
                value={word}
                onChangeText={setWord}
                placeholder="e.g., be, it, for, are"
                placeholderTextColor={isDark ? '#888' : '#666'}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Unit Number:</ThemedText>
              <View style={styles.unitSelector}>
                {units.map((u) => (
                  <TouchableOpacity
                    key={u}
                    style={[
                      styles.unitButton,
                      unit === u && styles.unitButtonActive,
                    ]}
                    onPress={() => setUnit(u)}
                  >
                    <ThemedText
                      style={[
                        styles.unitButtonText,
                        unit === u && styles.unitButtonTextActive,
                      ]}
                    >
                      {u}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.imageSection}>
              {imageUri ? (
                <View style={styles.imagePreview}>
                  <Image source={{ uri: imageUri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => setImageUri(null)}
                  >
                    <IconSymbol name="xmark.circle.fill" size={32} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <IconSymbol name="photo" size={48} color="#888" />
                  <ThemedText style={styles.placeholderText}>
                    No image selected
                  </ThemedText>
                </View>
              )}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                <IconSymbol name="photo.on.rectangle" size={20} color="#fff" />
                <ThemedText style={styles.pickButtonText}>Gallery</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.pickButton} onPress={takePhoto}>
                <IconSymbol name="camera.fill" size={20} color="#fff" />
                <ThemedText style={styles.pickButtonText}>Camera</ThemedText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveStrokeImage}>
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.saveButtonGradient}
              >
                <IconSymbol name="checkmark.circle.fill" size={24} color="#fff" />
                <ThemedText style={styles.saveButtonText}>Save Stroke Image</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>

          {uploadedStrokes.length > 0 && (
            <LinearGradient
              colors={isDark ? ['#2d2d44', '#3a3a5a'] : ['#ffffff', '#f5f5f5']}
              style={[styles.card, styles.listCard]}
            >
              <ThemedText type="subtitle" style={styles.cardTitle}>
                📚 Uploaded Strokes ({uploadedStrokes.length})
              </ThemedText>
              <FlatList
                data={uploadedStrokes}
                renderItem={renderStrokeItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </LinearGradient>
          )}

          <LinearGradient
            colors={isDark ? ['#2d2d44', '#3a3a5a'] : ['#ffffff', '#f5f5f5']}
            style={styles.card}
          >
            <ThemedText type="subtitle" style={styles.cardTitle}>
              💡 Instructions
            </ThemedText>
            <ThemedText style={styles.instructionText}>
              1. Screenshot individual shortforms from the textbook{'\n'}
              2. Enter the word it represents{'\n'}
              3. Select the unit number{'\n'}
              4. Upload or capture the stroke image{'\n'}
              5. Save to build the AI training dataset{'\n\n'}
              Images are organized by unit in:{'\n'}
              assets/stroke-images/unit1/ through unit12/
            </ThemedText>
          </LinearGradient>
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
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  unitSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  unitButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  imageSection: {
    marginBottom: 20,
  },
  imagePreview: {
    position: 'relative',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  imagePlaceholder: {
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 8,
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  pickButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  pickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listCard: {
    marginTop: 8,
  },
  strokeItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  strokeThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  strokeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  strokeWord: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  strokeMeta: {
    fontSize: 14,
    opacity: 0.7,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
});
