import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, Meditation, MeditationCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useMeditations } from '../../hooks';

interface MeditationListScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MeditationList'>;
  route: RouteProp<RootStackParamList, 'MeditationList'>;
}

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

export function MeditationListScreen({ navigation, route }: MeditationListScreenProps) {
  const initialCategory = route.params?.category;
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MeditationCategory | undefined>(initialCategory);

  // Debounced search
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSearchChange = useCallback((text: string) => {
    setSearchInput(text);
    debouncedSearch(text);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearchQuery('');
  }, []);

  const {
    meditations,
    loading,
    hasMore,
    loadMore,
    categories,
  } = useMeditations({
    category: selectedCategory,
    search: searchQuery,
    showAll: true,
  });

  const renderMeditationCard = ({ item: meditation }: { item: Meditation }) => {
    const date = new Date(meditation.date);
    const day = date.getDate().toString();
    const monthIndex = date.getMonth();

    return (
      <TouchableOpacity
        style={styles.meditationCard}
        onPress={() => navigation.navigate('MeditationDetail', { meditation })}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.meditationDate}
        >
          <Text style={styles.meditationMonth}>{MONTHS_SHORT[monthIndex]}</Text>
          <Text style={styles.meditationDay}>{day}</Text>
          <View style={styles.dateAccent} />
        </LinearGradient>
        <View style={styles.meditationInfo}>
          <Text style={styles.meditationTitle}>{meditation.title}</Text>
          <Text style={styles.meditationVerseRef}>{meditation.verseRef}</Text>
          <View style={styles.meditationMeta}>
            <Ionicons name="person-outline" size={12} color={colors.text.secondary} />
            <Text style={styles.meditationAuthor}>{meditation.author}</Text>
          </View>
        </View>
        <View style={styles.arrowWrap}>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrap}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une méditation..."
            placeholderTextColor={colors.text.tertiary}
            value={searchInput}
            onChangeText={handleSearchChange}
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchInput.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(undefined)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.categoryChipText,
              !selectedCategory && styles.categoryChipTextActive,
            ]}
          >
            Toutes
          </Text>
        </TouchableOpacity>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryChip,
              selectedCategory === cat.key && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={cat.icon as keyof typeof Ionicons.glyphMap}
              size={14}
              color={selectedCategory === cat.key ? '#fff' : colors.primary}
              style={styles.categoryChipIcon}
            />
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === cat.key && styles.categoryChipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Résultats' : 'Toutes les méditations'}
          </Text>
        </View>
        <Text style={styles.resultCount}>{meditations.length}</Text>
      </View>
    </>
  );

  const ListFooter = () => (
    <>
      {hasMore && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={loadMore}
          activeOpacity={0.8}
        >
          <Text style={styles.loadMoreText}>Charger plus</Text>
          <Ionicons name="chevron-down" size={18} color={colors.primary} />
        </TouchableOpacity>
      )}
    </>
  );

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={48} color={colors.text.tertiary} />
      <Text style={styles.emptyTitle}>Aucune méditation trouvée</Text>
      <Text style={styles.emptyText}>
        Essayez de modifier vos critères de recherche
      </Text>
    </View>
  );

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
          <Text style={styles.headerTitle}>Méditations</Text>
          <Text style={styles.headerSubtitle}>Toutes les méditations</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {loading && meditations.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={meditations}
          renderItem={renderMeditationCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={EmptyList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  // Header
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
  headerRight: {
    width: 44,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Search
  searchContainer: {
    marginBottom: spacing.md,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  // Categories
  categoriesContainer: {
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipIcon: {
    marginRight: spacing.xs,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  resultCount: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  // Meditation Card
  meditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  meditationDate: {
    width: 72,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  meditationMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  meditationDay: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
    marginTop: -2,
  },
  dateAccent: {
    position: 'absolute',
    bottom: 8,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  meditationInfo: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  meditationTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  meditationVerseRef: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  meditationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meditationAuthor: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  arrowWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  // Load More
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  loadMoreText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
