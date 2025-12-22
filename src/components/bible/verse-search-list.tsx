import React, { memo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { BibleSearchResult } from '../../services/bible-database';
import { VerseSearchResult } from './verse-search-result';

interface VerseSearchListProps {
  results: BibleSearchResult[];
  searchQuery: string;
  isSearching: boolean;
  onVersePress: (item: BibleSearchResult) => void;
}

const ListHeader = memo(function ListHeader({
  count,
  isSearching,
}: {
  count: number;
  isSearching: boolean;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.titleWrap}>
        <View style={styles.dot} />
        <Text style={styles.title}>Résultats</Text>
      </View>
      {isSearching ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <Text style={styles.count}>
          {count} verset{count > 1 ? 's' : ''}
        </Text>
      )}
    </View>
  );
});

const EmptyState = memo(function EmptyState({ isSearching }: { isSearching: boolean }) {
  if (isSearching) {
    return (
      <View style={styles.emptyState}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={48} color={colors.text.tertiary} />
      <Text style={styles.emptyTitle}>Aucun verset trouvé</Text>
      <Text style={styles.emptySubtitle}>Essayez avec d'autres mots-clés</Text>
    </View>
  );
});

export const VerseSearchList = memo(function VerseSearchList({
  results,
  searchQuery,
  isSearching,
  onVersePress,
}: VerseSearchListProps) {
  return (
    <FlatList
      data={results}
      renderItem={({ item }) => (
        <VerseSearchResult
          item={item}
          searchQuery={searchQuery}
          onPress={onVersePress}
        />
      )}
      keyExtractor={(item, index) => `${item.bookId}-${item.chapter}-${item.verse}-${index}`}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <ListHeader count={results.length} isSearching={isSearching} />
      }
      ListEmptyComponent={<EmptyState isSearching={isSearching} />}
    />
  );
});

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  count: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
