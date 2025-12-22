import React, { memo, useCallback, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BibleVerse, HighlightColor } from '../../types';
import { VerseCard } from './verse-card';
import { spacing } from '../../constants/theme';

export interface VerseListProps {
  verses: BibleVerse[];
  selectedVerses: number[];
  highlights: Map<string, HighlightColor>;
  fontSize: number;
  lineHeight: number;
  bookId: string;
  chapter: number;
  scrollToVerse?: number;
  onSelectVerse: (verse: number) => void;
  onLongPressVerse: (verse: number) => void;
}

function VerseListComponent({
  verses,
  selectedVerses,
  highlights,
  fontSize,
  lineHeight,
  bookId,
  chapter,
  scrollToVerse,
  onSelectVerse,
  onLongPressVerse,
}: VerseListProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const versePositions = useRef<{ [key: number]: number }>({});

  useEffect(() => {
    if (scrollToVerse && verses.length > 0) {
      const timer = setTimeout(() => {
        const position = versePositions.current[scrollToVerse];
        if (position !== undefined && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: position - 100,
            animated: true,
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [scrollToVerse, verses]);

  const handleVerseLayout = useCallback(
    (verseNumber: number) => (event: LayoutChangeEvent) => {
      versePositions.current[verseNumber] = event.nativeEvent.layout.y;
    },
    []
  );

  const getHighlightColor = useCallback(
    (verse: number): HighlightColor | null => {
      const key = `${bookId}-${chapter}-${verse}`;
      return highlights.get(key) || null;
    },
    [bookId, chapter, highlights]
  );

  const handlePress = useCallback(
    (verse: number) => () => {
      onSelectVerse(verse);
    },
    [onSelectVerse]
  );

  const handleLongPress = useCallback(
    (verse: number) => () => {
      onLongPressVerse(verse);
    },
    [onLongPressVerse]
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {verses.map((verse) => (
        <View key={verse.verse} onLayout={handleVerseLayout(verse.verse)}>
          <VerseCard
            verse={verse}
            isSelected={selectedVerses.includes(verse.verse)}
            highlightColor={getHighlightColor(verse.verse)}
            fontSize={fontSize}
            lineHeight={lineHeight}
            onPress={handlePress(verse.verse)}
            onLongPress={handleLongPress(verse.verse)}
          />
        </View>
      ))}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

export const VerseList = memo(VerseListComponent);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  bottomPadding: {
    height: 120,
  },
});
