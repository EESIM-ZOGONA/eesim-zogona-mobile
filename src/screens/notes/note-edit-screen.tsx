import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  Dimensions,
  ActivityIndicator,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, NoteCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useNotes } from '../../hooks';
import { RichTextEditor, RichTextEditorRef, FormattingToolbar } from '../../components/notes';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const insets = useSafeAreaInsets();
  const existingNote = route.params?.note;
  const initialVerseRef = route.params?.linkedVerseRef;
  const prefillTitle = route.params?.prefillTitle;
  const prefillContent = route.params?.prefillContent;
  const isEditing = !!existingNote;

  const { createNote, updateNote } = useNotes();

  const [title, setTitle] = useState(existingNote?.title || prefillTitle || '');
  const [htmlContent, setHtmlContent] = useState(existingNote?.content || prefillContent || '');
  const [plainContent, setPlainContent] = useState(existingNote?.contentPlain || prefillContent || '');
  const [category, setCategory] = useState<NoteCategory>(existingNote?.category || 'meditation');
  const [linkedVerseRef, setLinkedVerseRef] = useState(existingNote?.linkedVerseRef || initialVerseRef || '');
  const [showOptions, setShowOptions] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  const editorRef = useRef<RichTextEditorRef>(null);
  // Base position includes safe area bottom inset
  const baseToolbarPosition = insets.bottom;
  const toolbarPosition = useRef(new Animated.Value(baseToolbarPosition)).current;

  useEffect(() => {
    // Update initial position when insets change
    toolbarPosition.setValue(baseToolbarPosition);
  }, [baseToolbarPosition, toolbarPosition]);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
      Animated.timing(toolbarPosition, {
        toValue: e.endCoordinates.height,
        duration: Platform.OS === 'ios' ? e.duration : 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, (e) => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
      Animated.timing(toolbarPosition, {
        toValue: baseToolbarPosition,
        duration: Platform.OS === 'ios' ? (e?.duration || 250) : 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [toolbarPosition, baseToolbarPosition]);

  const handleContentChange = useCallback((html: string, plain: string) => {
    setHtmlContent(html);
    setPlainContent(plain);
  }, []);

  const handleFormatChange = useCallback((formats: string[]) => {
    setActiveFormats(formats);
  }, []);

  const handleFormat = useCallback((command: string, value?: string) => {
    editorRef.current?.executeCommand(command, value);
  }, []);

  const handleDismissKeyboard = useCallback(() => {
    editorRef.current?.dismissKeyboard();
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour la note.');
      return;
    }

    if (!plainContent.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer du contenu pour la note.');
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && existingNote) {
        await updateNote(existingNote.id, {
          title: title.trim(),
          content: htmlContent,
          contentPlain: plainContent.trim(),
          category,
          linkedVerseRef: linkedVerseRef.trim() || undefined,
        });
      } else {
        await createNote({
          title: title.trim(),
          content: htmlContent,
          contentPlain: plainContent.trim(),
          category,
          linkedVerseRef: linkedVerseRef.trim() || undefined,
        });
      }
      navigation.goBack();
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Erreur', 'Impossible de sauvegarder la note');
    }
  };

  const handleCancel = () => {
    if (title || plainContent) {
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

  if (isSaving) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Sauvegarde...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
            onPress={() => {
              handleDismissKeyboard();
              setShowOptions(!showOptions);
            }}
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

          <View style={[styles.optionSection, { marginBottom: 0 }]}>
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

      <View style={[styles.editorContainer, { marginBottom: isKeyboardVisible ? 56 : 56 + insets.bottom }]}>
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

        <TextInput
          style={styles.titleInput}
          placeholder="Titre"
          placeholderTextColor={colors.text.tertiary}
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          returnKeyType="next"
        />

        <RichTextEditor
          ref={editorRef}
          initialContent={htmlContent}
          onChange={handleContentChange}
          onFormatChange={handleFormatChange}
          placeholder="Commencez à écrire..."
        />
      </View>

      <Animated.View style={[styles.floatingToolbar, { bottom: toolbarPosition }]}>
        <View style={styles.toolbarContent}>
          <FormattingToolbar
            onFormat={handleFormat}
            activeFormats={activeFormats}
          />
          <View style={styles.toolbarBottom}>
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={() => {
                handleDismissKeyboard();
                setShowOptions(!showOptions);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="options-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>

            <Text style={styles.wordCountText}>
              {plainContent.length} caractères
            </Text>

            {isKeyboardVisible && (
              <TouchableOpacity
                style={styles.toolbarButton}
                onPress={handleDismissKeyboard}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-down" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
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
  editorContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
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
  titleInput: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  floatingToolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  toolbarContent: {},
  toolbarBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.background,
  },
  toolbarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordCountText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
});
