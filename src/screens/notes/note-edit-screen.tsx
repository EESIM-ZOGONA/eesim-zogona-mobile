import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, NoteCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

const { height } = Dimensions.get('window');

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
  const initialVerseRef = route.params?.linkedVerseRef;
  const prefillTitle = route.params?.prefillTitle;
  const prefillContent = route.params?.prefillContent;
  const isEditing = !!existingNote;

  const [title, setTitle] = useState(existingNote?.title || prefillTitle || '');
  const [content, setContent] = useState(existingNote?.content || prefillContent || '');
  const [category, setCategory] = useState<NoteCategory>(existingNote?.category || 'meditation');
  const [linkedVerseRef, setLinkedVerseRef] = useState(existingNote?.linkedVerseRef || initialVerseRef || '');
  const [showOptions, setShowOptions] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const contentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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

  const currentCategory = categoryOptions.find(c => c.key === category);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setShowOptions(!showOptions)}
            activeOpacity={0.7}
          >
            <Ionicons name={currentCategory?.icon || 'folder'} size={18} color={colors.primary} />
            <Text style={styles.categoryButtonText}>{currentCategory?.label}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <Ionicons name="checkmark" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Options Dropdown */}
      {showOptions && (
        <View style={styles.optionsPanel}>
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Catégorie</Text>
            <View style={styles.categoryGrid}>
              {categoryOptions.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryOption,
                    category === cat.key && styles.categoryOptionActive,
                  ]}
                  onPress={() => {
                    setCategory(cat.key);
                    setShowOptions(false);
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={cat.icon}
                    size={18}
                    color={category === cat.key ? '#fff' : colors.primary}
                  />
                  <Text
                    style={[
                      styles.categoryOptionText,
                      category === cat.key && styles.categoryOptionTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Référence biblique</Text>
            <View style={styles.verseInputWrap}>
              <Ionicons name="book-outline" size={18} color={colors.text.tertiary} />
              <TextInput
                style={styles.verseInput}
                placeholder="Ex: Jean 3:16"
                placeholderTextColor={colors.text.tertiary}
                value={linkedVerseRef}
                onChangeText={setLinkedVerseRef}
                maxLength={50}
              />
            </View>
          </View>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        {/* Verse Reference Badge (if set) */}
        {linkedVerseRef && !showOptions && (
          <TouchableOpacity
            style={styles.verseBadge}
            onPress={() => setShowOptions(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="book" size={14} color={colors.primary} />
            <Text style={styles.verseBadgeText}>{linkedVerseRef}</Text>
          </TouchableOpacity>
        )}

        {/* Title Input - Large and prominent */}
        <TextInput
          style={styles.titleInput}
          placeholder="Titre"
          placeholderTextColor={colors.text.tertiary}
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          returnKeyType="next"
          onSubmitEditing={() => contentInputRef.current?.focus()}
        />

        {/* Content Input - Maximum space */}
        <TextInput
          ref={contentInputRef}
          style={[
            styles.contentInput,
            { minHeight: height - 280 - keyboardHeight },
          ]}
          placeholder="Commencez à écrire..."
          placeholderTextColor={colors.text.tertiary}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          autoFocus={!isEditing}
        />
      </KeyboardAvoidingView>

      {/* Bottom Toolbar */}
      <View style={[styles.toolbar, { marginBottom: keyboardHeight > 0 ? 0 : 0 }]}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowOptions(!showOptions)}
          activeOpacity={0.7}
        >
          <Ionicons name="options-outline" size={22} color={colors.text.secondary} />
        </TouchableOpacity>

        <View style={styles.wordCount}>
          <Text style={styles.wordCountText}>
            {content.length} caractères
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header - Minimal
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.full,
  },
  categoryButtonText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Options Panel
  optionsPanel: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  optionSection: {
    marginBottom: spacing.lg,
  },
  optionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
  },
  categoryOptionActive: {
    backgroundColor: colors.primary,
  },
  categoryOptionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  categoryOptionTextActive: {
    color: '#fff',
  },
  verseInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
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
  // Keyboard View
  keyboardView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  // Verse Badge
  verseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  verseBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  // Title Input - Large
  titleInput: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  // Content Input - Maximum space
  contentInput: {
    flex: 1,
    fontSize: fontSize.lg,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 28,
    paddingBottom: spacing.xl,
  },
  // Toolbar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
  toolbarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordCount: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  wordCountText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
});
