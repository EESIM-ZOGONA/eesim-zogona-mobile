import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, MainTabParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { SCREENS } from '../../constants/screens';
import { useHymns, type Hymn, type HymnSearchResult } from '../../hooks';

const { width } = Dimensions.get('window');

type HymnsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'HymnsTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HymnsScreenProps {
  navigation: HymnsScreenNavigationProp;
}

// Couleur primaire unique
const primaryGradient: [string, string] = [colors.primary, colors.primaryDark];

const hymnColorScheme = {
  bg: colors.primaryLight,
  text: colors.primary,
  gradient: primaryGradient,
};

export function HymnsScreen({ navigation }: HymnsScreenProps) {
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const {
    hymns,
    loading,
    error,
    search,
    searchResults,
    isSearching,
    recentlyPlayed,
  } = useHymns();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    search(value);
  }, 300);

  const handleSearchChange = useCallback((text: string) => {
    setSearchInput(text);
    debouncedSearch(text);
  }, [debouncedSearch]);

  const displayedHymns = searchInput.trim() ? searchResults : hymns;

  const handleHymnPress = (hymn: Hymn) => {
    navigation.navigate(SCREENS.HYMN_DETAIL, { hymnId: hymn.id });
  };

  const popularHymns = recentlyPlayed.length > 0 ? recentlyPlayed : hymns.slice(0, 5);
  const isSearchActive = searchInput.trim().length > 0;

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <Text>{text}</Text>;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase()
            ? <Text key={i} style={styles.highlightedText}>{part}</Text>
            : part
        )}
      </Text>
    );
  };

  const renderSearchResultItem = ({ item }: { item: HymnSearchResult }) => {
    const colorScheme = hymnColorScheme;

    return (
      <TouchableOpacity
        style={styles.searchResultCard}
        onPress={() => handleHymnPress(item)}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colorScheme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hymnNumberBadge}
        >
          <Text style={styles.hymnNumberText}>{item.number}</Text>
        </LinearGradient>

        <View style={styles.searchResultContent}>
          <Text style={styles.hymnTitle} numberOfLines={1}>
            {highlightText(item.title, searchInput)}
          </Text>
          {item.matchType === 'content' && item.matchContext && (
            <View style={styles.matchContextRow}>
              <Text style={styles.matchLabel}>
                {item.verseType === 'chorus' ? 'Refrain' : `Couplet ${item.verseNumber}`}:
              </Text>
              <Text style={styles.matchContext} numberOfLines={2}>
                {highlightText(item.matchContext, searchInput)}
              </Text>
            </View>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
      </TouchableOpacity>
    );
  };

  const renderHymnItem = ({ item }: { item: Hymn }) => {
    const colorScheme = hymnColorScheme;

    if (viewMode === 'grid') {
      return (
        <TouchableOpacity
          style={styles.hymnGridCard}
          onPress={() => handleHymnPress(item)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={colorScheme.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hymnGridGradient}
          >
            <Text style={styles.hymnGridNumber}>{item.number}</Text>
            <View style={styles.hymnGridMusicIcon}>
              <Ionicons name="musical-note" size={14} color="rgba(255,255,255,0.9)" />
            </View>
          </LinearGradient>
          <View style={styles.hymnGridContent}>
            <Text style={styles.hymnGridTitle} numberOfLines={2}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.hymnListCard}
        onPress={() => handleHymnPress(item)}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colorScheme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hymnNumberBadge}
        >
          <Text style={styles.hymnNumberText}>{item.number}</Text>
        </LinearGradient>

        <View style={styles.hymnContent}>
          <Text style={styles.hymnTitle} numberOfLines={1}>{item.title}</Text>
        </View>

        <TouchableOpacity style={[styles.playButton, { backgroundColor: colorScheme.bg }]}>
          <Ionicons name="chevron-forward" size={20} color={colorScheme.text} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement des cantiques...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Cantiques</Text>
          <Text style={styles.headerSubtitle}>{displayedHymns.length} cantiques</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list" size={20} color={viewMode === 'list' ? colors.primary : colors.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeActive]}
            onPress={() => setViewMode('grid')}
          >
            <Ionicons name="grid" size={20} color={viewMode === 'grid' ? colors.primary : colors.text.tertiary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchIconWrap}>
          <Ionicons name="search" size={18} color={colors.text.tertiary} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par numéro ou titre..."
          placeholderTextColor={colors.text.tertiary}
          value={searchInput}
          onChangeText={handleSearchChange}
        />
        {isSearching && (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginRight: spacing.sm }} />
        )}
        {searchInput.length > 0 && !isSearching && (
          <TouchableOpacity onPress={() => { setSearchInput(''); search(''); }} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {!searchInput && popularHymns.length > 0 && (
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={styles.sectionIcon}>
                <Ionicons name="time" size={14} color={colors.primary} />
              </View>
              <Text style={styles.sectionTitle}>
                {recentlyPlayed.length > 0 ? 'Récemment écoutés' : 'Premiers cantiques'}
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
          >
            {popularHymns.map((hymn) => (
              <TouchableOpacity
                key={hymn.id}
                style={styles.popularCard}
                onPress={() => handleHymnPress(hymn)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={primaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.popularGradient}
                >
                  <Text style={styles.popularNumber}>{hymn.number}</Text>
                  <Text style={styles.popularTitle} numberOfLines={2}>{hymn.title}</Text>
                  <View style={styles.popularPlayButton}>
                    <Ionicons name="musical-note" size={14} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.listSectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>
            {searchInput ? 'Résultats' : 'Tous les cantiques'}
          </Text>
        </View>
      </View>

      {isSearchActive ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResultItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="search-outline" size={40} color={colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>Aucun résultat</Text>
              <Text style={styles.emptyText}>
                Essayez avec un autre mot ou numéro de cantique
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={hymns}
          renderItem={renderHymnItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={viewMode === 'grid' ? styles.gridContent : styles.listContent}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="musical-notes-outline" size={40} color={colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>Aucun cantique</Text>
              <Text style={styles.emptyText}>
                Les cantiques seront disponibles après le chargement
              </Text>
            </View>
          }
        />
      )}
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
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewModeActive: {
    backgroundColor: colors.primaryLight,
  },
  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },
  clearButton: {
    padding: spacing.xs,
  },
  // Categories
  categoriesWrapper: {
    height: 48,
    marginBottom: spacing.md,
  },
  categories: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.md,
    alignItems: 'center',
    height: 48,
  },
  categoryChip: {
    marginRight: spacing.sm,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  categoryChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
  },
  categoryTextActive: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Popular Section
  popularSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  popularList: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.md,
  },
  popularCard: {
    width: 140,
    height: 160,
    marginRight: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  popularGradient: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  popularBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  popularNumber: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
  },
  popularTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
    lineHeight: 18,
  },
  popularPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  // List Section Header
  listSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  // List
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  gridContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  // List Card
  hymnListCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  hymnNumberBadge: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  hymnNumberText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
  },
  hymnContent: {
    flex: 1,
  },
  hymnTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  hymnMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  hymnAuthor: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    flex: 1,
  },
  hymnCategoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  hymnCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  // Grid Card
  hymnGridCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    margin: spacing.xs,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  hymnGridGradient: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  hymnGridNumber: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
  },
  hymnGridMusicIcon: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hymnGridContent: {
    padding: spacing.md,
  },
  hymnGridTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    height: 36,
  },
  hymnGridCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  hymnGridCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Search Results
  searchResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  searchResultContent: {
    flex: 1,
    marginRight: spacing.sm,
  },
  matchContextRow: {
    marginTop: spacing.xs,
  },
  matchLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    marginBottom: 2,
  },
  matchContext: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  highlightedText: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    fontFamily: fontFamily.bold,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxxl,
    paddingHorizontal: spacing.xl,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
