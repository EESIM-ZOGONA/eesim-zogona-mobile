import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, BookQuiz } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useBookQuizzes } from '../../hooks';

interface QuizBooksScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuizBooks'>;
}

const difficultyConfig = {
  easy: { label: 'Facile', color: '#16a34a' },
  medium: { label: 'Moyen', color: '#d97706' },
  hard: { label: 'Difficile', color: '#dc2626' },
};

type TestamentFilter = 'all' | 'old' | 'new';

export function QuizBooksScreen({ navigation }: QuizBooksScreenProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<TestamentFilter>('all');

  const { bookQuizzes, loading, initialized, totalQuestions } = useBookQuizzes();

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

  // Filter quizzes
  const filteredQuizzes = useMemo(() => {
    let result = bookQuizzes;

    if (selectedTestament !== 'all') {
      result = result.filter((quiz) => quiz.testament === selectedTestament);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((quiz) => quiz.bookName.toLowerCase().includes(query));
    }

    return result;
  }, [bookQuizzes, selectedTestament, searchQuery]);

  const oldTestamentQuizzes = useMemo(() =>
    bookQuizzes.filter(q => q.testament === 'old'), [bookQuizzes]);
  const newTestamentQuizzes = useMemo(() =>
    bookQuizzes.filter(q => q.testament === 'new'), [bookQuizzes]);

  const renderBookCard = ({ item: quiz }: { item: BookQuiz }) => {
    const diffConfig = difficultyConfig[quiz.difficulty];
    const isOldTestament = quiz.testament === 'old';

    return (
      <TouchableOpacity
        style={styles.bookCard}
        onPress={() => navigation.navigate('QuizBookPlay', { bookQuiz: quiz })}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={isOldTestament ? ['#d97706', '#b45309'] : ['#dc2626', '#b91c1c']}
          style={styles.bookIconWrap}
        >
          <Text style={styles.bookAbbrev}>{quiz.bookId.substring(0, 2)}</Text>
        </LinearGradient>
        <View style={styles.bookInfo}>
          <Text style={styles.bookName}>{quiz.bookName}</Text>
          <View style={styles.bookMeta}>
            <View style={styles.bookMetaItem}>
              <Ionicons name="help-circle-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.bookMetaText}>{quiz.questionCount} questions</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: `${diffConfig.color}20` }]}>
              <Text style={[styles.difficultyText, { color: diffConfig.color }]}>
                {diffConfig.label}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.arrowWrap}>
          <Ionicons name="play" size={16} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <>
      {/* Hero Card */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroIconWrap}>
          <Ionicons name="library" size={32} color={colors.primary} />
        </View>
        <Text style={styles.heroTitle}>Quiz par Livre</Text>
        <Text style={styles.heroSubtitle}>
          {bookQuizzes.length} livres • {totalQuestions} questions
        </Text>
        <View style={styles.cardAccent} />
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrap}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un livre..."
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

      {/* Testament Filters */}
      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterChip, selectedTestament === 'all' && styles.filterChipActive]}
          onPress={() => setSelectedTestament('all')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedTestament === 'all' && styles.filterChipTextActive]}>
            Tous ({bookQuizzes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedTestament === 'old' && styles.filterChipActiveOld]}
          onPress={() => setSelectedTestament('old')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="book"
            size={14}
            color={selectedTestament === 'old' ? '#fff' : '#d97706'}
            style={styles.filterIcon}
          />
          <Text style={[styles.filterChipText, selectedTestament === 'old' && styles.filterChipTextActive]}>
            AT ({oldTestamentQuizzes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedTestament === 'new' && styles.filterChipActiveNew]}
          onPress={() => setSelectedTestament('new')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="heart"
            size={14}
            color={selectedTestament === 'new' ? '#fff' : '#dc2626'}
            style={styles.filterIcon}
          />
          <Text style={[styles.filterChipText, selectedTestament === 'new' && styles.filterChipTextActive]}>
            NT ({newTestamentQuizzes.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Résultats' : 'Livres disponibles'}
          </Text>
        </View>
        <Text style={styles.resultCount}>{filteredQuizzes.length}</Text>
      </View>
    </>
  );

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={48} color={colors.text.tertiary} />
      <Text style={styles.emptyTitle}>Aucun livre trouvé</Text>
      <Text style={styles.emptyText}>
        Essayez de modifier vos critères de recherche
      </Text>
    </View>
  );

  if (loading && !initialized) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement des quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Quiz par Livre</Text>
          <Text style={styles.headerSubtitle}>Testez vos connaissances</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={filteredQuizzes}
        renderItem={renderBookCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    gap: spacing.md,
  },
  loadingText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
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
  // Hero Card
  heroCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  heroIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 30 }, { translateY: 30 }],
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
  // Filters
  filtersRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipActiveOld: {
    backgroundColor: '#d97706',
  },
  filterChipActiveNew: {
    backgroundColor: '#dc2626',
  },
  filterIcon: {
    marginRight: spacing.xs,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  filterChipTextActive: {
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
  // Book Card
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  bookIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookAbbrev: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
    textTransform: 'uppercase',
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  bookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bookMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookMetaText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
  },
  arrowWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
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
