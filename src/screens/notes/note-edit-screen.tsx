import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, NoteCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface NoteEditScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NoteEdit'>;
  route: RouteProp<RootStackParamList, 'NoteEdit'>;
}

const categoryOptions: { key: NoteCategory; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'meditation', label: 'Méditation', icon: 'heart' },
  { key: 'predication', label: 'Prédication', icon: 'mic' },
  { key: 'etude', label: 'Étude', icon: 'book' },
  { key: 'priere', label: 'Prière', icon: 'hand-right' },
  { key: 'personnel', label: 'Personnel', icon: 'person' },
];

export function NoteEditScreen({ navigation, route }: NoteEditScreenProps) {
  const existingNote = route.params?.note;
  const isEditing = !!existingNote;

  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [category, setCategory] = useState<NoteCategory>(existingNote?.category || 'meditation');
  const [linkedVerseRef, setLinkedVerseRef] = useState(existingNote?.linkedVerseRef || '');

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour la note.');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer du contenu pour la note.');
      return;
    }

    // TODO: Save to storage/API
    const noteData = {
      id: existingNote?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      linkedVerseRef: linkedVerseRef.trim() || undefined,
      createdAt: existingNote?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: existingNote?.isFavorite || false,
    };

    console.log('Saving note:', noteData);

    // Go back after save
    navigation.goBack();
  };

  const handleCancel = () => {
    if (title || content) {
      Alert.alert(
        'Annuler',
        'Êtes-vous sûr de vouloir annuler ? Les modifications seront perdues.',
        [
          { text: 'Continuer', style: 'cancel' },
          { text: 'Annuler', style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Modifier' : 'Nouvelle note'}
        </Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Category Selection */}
          <Text style={styles.label}>Catégorie</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categoryOptions.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryChip,
                  category === cat.key && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat.key)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={cat.icon}
                  size={16}
                  color={category === cat.key ? '#fff' : colors.text.secondary}
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat.key && styles.categoryChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Title Input */}
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Titre de la note..."
            placeholderTextColor={colors.text.tertiary}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          {/* Verse Reference Input */}
          <Text style={styles.label}>Référence biblique (optionnel)</Text>
          <View style={styles.verseInputWrap}>
            <Ionicons name="book-outline" size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.verseInput}
              placeholder="Ex: Jean 3:16"
              placeholderTextColor={colors.text.tertiary}
              value={linkedVerseRef}
              onChangeText={setLinkedVerseRef}
              maxLength={50}
            />
          </View>

          {/* Content Input */}
          <Text style={styles.label}>Contenu</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Écrivez votre note ici..."
            placeholderTextColor={colors.text.tertiary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  cancelButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  },
  saveButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  // Categories
  categoriesContainer: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  // Title Input
  titleInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  // Verse Input
  verseInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  verseInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  // Content Input
  contentInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    minHeight: 200,
    lineHeight: 24,
  },
});
