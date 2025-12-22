import { useCallback } from 'react';
import { Share, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { BibleVerse } from '../types';
import { SCREENS } from '../constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export interface UseVerseActionsProps {
  bookId: string;
  bookName: string;
  chapter: number;
  selectedVerses: number[];
  verses: BibleVerse[];
  version?: string;
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
  onActionComplete?: () => void;
}

export interface UseVerseActionsReturn {
  handleShare: () => Promise<void>;
  handleCopy: () => Promise<void>;
  handleAddNote: () => void;
  handleCompare: () => void;
  handleBookmark: () => void;
  formatVerseRef: () => string;
  getSelectedVersesText: () => string;
}

export function useVerseActions({
  bookId,
  bookName,
  chapter,
  selectedVerses,
  verses,
  version = 'LSG',
  navigation,
  onActionComplete,
}: UseVerseActionsProps): UseVerseActionsReturn {
  // Format verse reference (e.g., "Jean 3:16" or "Jean 3:16-18")
  const formatVerseRef = useCallback(() => {
    if (selectedVerses.length === 0) return '';

    const sorted = [...selectedVerses].sort((a, b) => a - b);

    if (sorted.length === 1) {
      return `${bookName} ${chapter}:${sorted[0]}`;
    }

    // Check if consecutive
    const isConsecutive = sorted.every((v, i) => i === 0 || v === sorted[i - 1] + 1);

    if (isConsecutive) {
      return `${bookName} ${chapter}:${sorted[0]}-${sorted[sorted.length - 1]}`;
    }

    return `${bookName} ${chapter}:${sorted.join(', ')}`;
  }, [bookName, chapter, selectedVerses]);

  // Get selected verses text
  const getSelectedVersesText = useCallback(() => {
    const sorted = [...selectedVerses].sort((a, b) => a - b);
    const selectedVersesData = verses.filter((v) => sorted.includes(v.verse));
    return selectedVersesData.map((v) => `${v.verse}. ${v.text}`).join('\n');
  }, [selectedVerses, verses]);

  // Share verses
  const handleShare = useCallback(async () => {
    if (selectedVerses.length === 0) return;

    const versesText = getSelectedVersesText();
    const verseRef = formatVerseRef();

    try {
      await Share.share({
        message: `${versesText}\n\n— ${verseRef} (${version})`,
      });
      onActionComplete?.();
    } catch (error) {
      console.error('Share error:', error);
    }
  }, [selectedVerses, getSelectedVersesText, formatVerseRef, version, onActionComplete]);

  // Copy verses to clipboard
  const handleCopy = useCallback(async () => {
    if (selectedVerses.length === 0) return;

    const versesText = getSelectedVersesText();
    const verseRef = formatVerseRef();

    try {
      await Clipboard.setStringAsync(`${versesText}\n\n— ${verseRef}`);
      Alert.alert('Copié', 'Les versets ont été copiés dans le presse-papiers.');
      onActionComplete?.();
    } catch (error) {
      console.error('Copy error:', error);
      // Fallback to share if clipboard fails
      await handleShare();
    }
  }, [selectedVerses, getSelectedVersesText, formatVerseRef, onActionComplete, handleShare]);

  // Add note with verses
  const handleAddNote = useCallback(() => {
    if (selectedVerses.length === 0) return;

    const verseRef = formatVerseRef();
    const content = getSelectedVersesText();

    navigation.navigate(SCREENS.NOTE_EDIT, {
      linkedVerseRef: verseRef,
      prefillContent: content,
    });
    onActionComplete?.();
  }, [selectedVerses, formatVerseRef, getSelectedVersesText, navigation, onActionComplete]);

  // Compare verses across versions
  const handleCompare = useCallback(() => {
    if (selectedVerses.length === 0) return;

    navigation.navigate(SCREENS.VERSE_COMPARE, {
      bookId,
      bookName,
      chapter,
      verses: [...selectedVerses].sort((a, b) => a - b),
    });
    onActionComplete?.();
  }, [selectedVerses, bookId, bookName, chapter, navigation, onActionComplete]);

  // Bookmark verses (uses note for now)
  const handleBookmark = useCallback(() => {
    // For now, bookmark uses the note functionality
    handleAddNote();
  }, [handleAddNote]);

  return {
    handleShare,
    handleCopy,
    handleAddNote,
    handleCompare,
    handleBookmark,
    formatVerseRef,
    getSelectedVersesText,
  };
}
