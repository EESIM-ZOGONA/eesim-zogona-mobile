import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BibleVerse, HIGHLIGHT_COLORS, HIGHLIGHT_TEXT_COLORS, HighlightColor } from '../../types';
import { colors, spacing, fontFamily, borderRadius } from '../../constants/theme';

export interface VerseCardProps {
  verse: BibleVerse;
  isSelected?: boolean;
  highlightColor?: HighlightColor | null;
  fontSize: number;
  lineHeight: number;
  onPress?: () => void;
  onLongPress?: () => void;
}

function VerseCardComponent({
  verse,
  isSelected = false,
  highlightColor,
  fontSize,
  lineHeight,
  onPress,
  onLongPress,
}: VerseCardProps) {
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  const handleLongPress = useCallback(() => {
    onLongPress?.();
  }, [onLongPress]);

  let backgroundColor = 'transparent';
  let textColor: string | undefined;

  if (isSelected) {
    backgroundColor = colors.primaryLight;
  } else if (highlightColor) {
    backgroundColor = HIGHLIGHT_COLORS[highlightColor];
    textColor = HIGHLIGHT_TEXT_COLORS[highlightColor];
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      delayLongPress={300}
    >
      <Text
        style={[
          styles.verseNumber,
          isSelected && styles.verseNumberSelected,
          { marginTop: (lineHeight - fontSize) / 2 },
          textColor && { color: textColor },
        ]}
      >
        {verse.verse}
      </Text>
      <Text
        style={[
          styles.verseText,
          isSelected && styles.verseTextSelected,
          { fontSize, lineHeight },
          textColor && { color: textColor },
        ]}
      >
        {verse.text}
      </Text>
    </TouchableOpacity>
  );
}

export const VerseCard = memo(VerseCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.verse.verse === nextProps.verse.verse &&
    prevProps.verse.text === nextProps.verse.text &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.highlightColor === nextProps.highlightColor &&
    prevProps.fontSize === nextProps.fontSize &&
    prevProps.lineHeight === nextProps.lineHeight
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  verseNumber: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    width: 32,
    marginRight: spacing.sm,
  },
  verseNumberSelected: {
    color: colors.primaryDark,
  },
  verseText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  verseTextSelected: {
    color: colors.primaryDark,
  },
});
