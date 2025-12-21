import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, MainTabParamList, HymnCategory, Hymn } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { mockHymns } from '../../utils';

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

const categories: { key: HymnCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'musical-notes' },
  { key: 'louange', label: 'Louange', icon: 'megaphone' },
  { key: 'adoration', label: 'Adoration', icon: 'heart' },
  { key: 'communion', label: 'Communion', icon: 'people' },
  { key: 'paques', label: 'Paques', icon: 'sunny' },
  { key: 'noel', label: 'Noel', icon: 'star' },
];

// Schéma de couleur primaire unique
const hymnColorScheme = {
  bg: colors.primaryLight,
  text: colors.primary,
  gradient: primaryGradient,
};

export function HymnsScreen({ navigation }: HymnsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HymnCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredHymns = useMemo(() => {
    return mockHymns.filter((hymn) => {
      const matchesSearch =
        hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.number.toString().includes(searchQuery);
      const matchesCategory =
        selectedCategory === 'all' || hymn.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleHymnPress = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', { hymn });
  };

  // Popular hymns (first 5)
  const popularHymns = mockHymns.slice(0, 5);

  const renderHymnItem = ({ item, index }: { item: Hymn; index: number }) => {
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
            <View style={[styles.hymnGridCategory, { backgroundColor: colorScheme.bg }]}>
              <Text style={[styles.hymnGridCategoryText, { color: colorScheme.text }]}>
                {item.category}
              </Text>
            </View>
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
        {/* Number badge with gradient */}
        <LinearGradient
          colors={colorScheme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hymnNumberBadge}
        >
          <Text style={styles.hymnNumberText}>{item.number}</Text>
        </LinearGradient>

        {/* Content */}
        <View style={styles.hymnContent}>
          <Text style={styles.hymnTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.hymnMeta}>
            {item.author && (
              <Text style={styles.hymnAuthor} numberOfLines={1}>{item.author}</Text>
            )}
            <View style={[styles.hymnCategoryBadge, { backgroundColor: colorScheme.bg }]}>
              <Text style={[styles.hymnCategoryText, { color: colorScheme.text }]}>
                {item.category}
              </Text>
            </View>
          </View>
        </View>

        {/* Play button */}
        <TouchableOpacity style={[styles.playButton, { backgroundColor: colorScheme.bg }]}>
          <Ionicons name="play" size={16} color={colorScheme.text} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Cantiques</Text>
          <Text style={styles.headerSubtitle}>{filteredHymns.length} cantiques</Text>
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

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIconWrap}>
          <Ionicons name="search" size={18} color={colors.text.tertiary} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un cantique..."
          placeholderTextColor={colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={styles.categoryChip}
                onPress={() => setSelectedCategory(cat.key)}
              >
                {isActive ? (
                  <LinearGradient
                    colors={primaryGradient}
                    style={styles.categoryChipGradient}
                  >
                    <Ionicons name={cat.icon as any} size={14} color="#fff" />
                    <Text style={styles.categoryTextActive}>{cat.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.categoryChipInner}>
                    <Ionicons name={cat.icon as any} size={14} color={colors.primary} />
                    <Text style={[styles.categoryText, { color: colors.text.secondary }]}>{cat.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Popular Section (when not searching) */}
      {!searchQuery && selectedCategory === 'all' && (
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={styles.sectionIcon}>
                <Ionicons name="flame" size={14} color="#dc2626" />
              </View>
              <Text style={styles.sectionTitle}>Populaires</Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
          >
            {popularHymns.map((hymn, index) => {
              return (
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
                    <View style={styles.popularBadge}>
                      <Ionicons name="flame" size={10} color="#fff" />
                      <Text style={styles.popularBadgeText}>#{index + 1}</Text>
                    </View>
                    <Text style={styles.popularNumber}>{hymn.number}</Text>
                    <Text style={styles.popularTitle} numberOfLines={2}>{hymn.title}</Text>
                    <View style={styles.popularPlayButton}>
                      <Ionicons name="play" size={14} color="#fff" />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Section Header */}
      <View style={styles.listSectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Resultats' : selectedCategory === 'all' ? 'Tous les cantiques' : `Cantiques de ${selectedCategory}`}
          </Text>
        </View>
      </View>

      {/* Hymns List */}
      <FlatList
        data={filteredHymns}
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
            <Text style={styles.emptyTitle}>Aucun cantique trouve</Text>
            <Text style={styles.emptyText}>
              Modifiez votre recherche ou selectionnez une autre categorie
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
