import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { BibleSearchResult } from '../../services/bible-database';

interface VerseSearchResultProps {
  item: BibleSearchResult;
  searchQuery: string;
  onPress: (item: BibleSearchResult) => void;
}

function highlightText(text: string, query: string) {
  if (!query) return <Text>{text}</Text>;
  try {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={i} style={styles.highlightedText}>{part}</Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  } catch {
    return <Text>{text}</Text>;
  }
}

export const VerseSearchResult = memo(function VerseSearchResult({
  item,
  searchQuery,
  onPress,
}: VerseSearchResultProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.refBadge}>
          <Text style={styles.refText}>
            {item.bookName} {item.chapter}:{item.verse}
          </Text>
        </View>
      </View>
      <Text style={styles.verseText} numberOfLines={3}>
        {highlightText(item.text, searchQuery)}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  header: {
    marginBottom: spacing.sm,
  },
  refBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  refText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  verseText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 22,
  },
  highlightedText: {
    backgroundColor: '#FEF08A',
    fontFamily: fontFamily.semibold,
  },
});
