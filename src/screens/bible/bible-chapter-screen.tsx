import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, BibleVerse } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { getChapterVerses, getBookById } from '../../data/bible-data';

interface BibleChapterScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BibleChapter'>;
  route: RouteProp<RootStackParamList, 'BibleChapter'>;
}

export function BibleChapterScreen({ navigation, route }: BibleChapterScreenProps) {
  const { bookId, bookName, chapter } = route.params;
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [fontSizeLevel, setFontSizeLevel] = useState<'small' | 'medium' | 'large'>('medium');

  const book = getBookById(bookId);
  const totalChapters = book?.chapters || 1;
  const verses = getChapterVerses(bookId, chapter);

  const fontSizes = {
    small: fontSize.md,
    medium: fontSize.lg,
    large: fontSize.xl,
  };

  const lineHeights = {
    small: 24,
    medium: 30,
    large: 36,
  };

  const toggleVerseSelection = (verseNum: number) => {
    setSelectedVerses(prev =>
      prev.includes(verseNum)
        ? prev.filter(v => v !== verseNum)
        : [...prev, verseNum]
    );
  };

  const handleShare = async () => {
    const versesToShare = selectedVerses.length > 0
      ? verses.filter(v => selectedVerses.includes(v.verse))
      : verses;

    const text = versesToShare
      .map(v => `${v.verse}. ${v.text}`)
      .join('\n');

    const reference = selectedVerses.length > 0
      ? `${bookName} ${chapter}:${selectedVerses.sort((a, b) => a - b).join(', ')}`
      : `${bookName} ${chapter}`;

    await Share.share({
      message: `${text}\n\n— ${reference}`,
    });
  };

  const goToPrevChapter = () => {
    if (chapter > 1) {
      navigation.replace('BibleChapter', { bookId, bookName, chapter: chapter - 1 });
    }
  };

  const goToNextChapter = () => {
    if (chapter < totalChapters) {
      navigation.replace('BibleChapter', { bookId, bookName, chapter: chapter + 1 });
    }
  };

  const cycleFontSize = () => {
    setFontSizeLevel(prev => {
      if (prev === 'small') return 'medium';
      if (prev === 'medium') return 'large';
      return 'small';
    });
  };

  // Afficher un message si pas de versets disponibles
  const hasVerses = verses.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
          <Text style={styles.headerSubtitle}>
            {hasVerses ? `${verses.length} versets` : 'Chapitre'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.fontSizeButton}
          onPress={cycleFontSize}
          activeOpacity={0.7}
        >
          <Ionicons name="text" size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {hasVerses ? (
          <View style={styles.versesContainer}>
            {verses.map((verse) => (
              <TouchableOpacity
                key={verse.verse}
                onPress={() => toggleVerseSelection(verse.verse)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.verseText,
                    { fontSize: fontSizes[fontSizeLevel], lineHeight: lineHeights[fontSizeLevel] },
                    selectedVerses.includes(verse.verse) && styles.verseTextSelected,
                  ]}
                >
                  <Text style={styles.verseNumber}>{verse.verse} </Text>
                  {verse.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.noVersesContainer}>
            <Ionicons name="book-outline" size={64} color={colors.text.tertiary} />
            <Text style={styles.noVersesTitle}>Chapitre non disponible</Text>
            <Text style={styles.noVersesText}>
              Ce chapitre n'est pas encore disponible dans l'application.
              Les versets seront ajoutés prochainement.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, chapter <= 1 && styles.navButtonDisabled]}
            onPress={goToPrevChapter}
            disabled={chapter <= 1}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={chapter <= 1 ? colors.text.tertiary : colors.primary}
            />
            <Text style={[styles.navButtonText, chapter <= 1 && styles.navButtonTextDisabled]}>
              Chap. {chapter - 1}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons name="share-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, chapter >= totalChapters && styles.navButtonDisabled]}
            onPress={goToNextChapter}
            disabled={chapter >= totalChapters}
            activeOpacity={0.7}
          >
            <Text style={[styles.navButtonText, chapter >= totalChapters && styles.navButtonTextDisabled]}>
              Chap. {chapter + 1}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={chapter >= totalChapters ? colors.text.tertiary : colors.primary}
            />
          </TouchableOpacity>
        </View>

        {selectedVerses.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {selectedVerses.length} verset{selectedVerses.length > 1 ? 's' : ''} sélectionné{selectedVerses.length > 1 ? 's' : ''}
            </Text>
            <TouchableOpacity onPress={() => setSelectedVerses([])}>
              <Text style={styles.clearSelection}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  fontSizeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  versesContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  verseText: {
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  verseTextSelected: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    borderRadius: borderRadius.sm,
  },
  verseNumber: {
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  // No verses
  noVersesContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  noVersesTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  noVersesText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  // Bottom Bar
  bottomBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  navButtonTextDisabled: {
    color: colors.text.tertiary,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  selectionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  clearSelection: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
});
