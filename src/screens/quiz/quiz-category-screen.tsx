import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, Quiz, QuizCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface QuizCategoryScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuizCategory'>;
  route: RouteProp<RootStackParamList, 'QuizCategory'>;
}

// Mock quizzes - same as quiz-screen but will be filtered
const allQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Les personnages de la Bible',
    description: 'Testez vos connaissances sur les grandes figures bibliques',
    category: 'personnages',
    difficulty: 'easy',
    questionCount: 10,
    timeLimit: 5,
  },
  {
    id: '2',
    title: 'L\'Ancien Testament',
    description: 'Questions sur la Genèse, l\'Exode et les prophètes',
    category: 'ancien_testament',
    difficulty: 'medium',
    questionCount: 15,
    timeLimit: 10,
  },
  {
    id: '3',
    title: 'Les Évangiles',
    description: 'Découvrez combien vous connaissez la vie de Jésus',
    category: 'nouveau_testament',
    difficulty: 'easy',
    questionCount: 12,
    timeLimit: 8,
  },
  {
    id: '4',
    title: 'Versets à compléter',
    description: 'Complétez les versets bibliques célèbres',
    category: 'versets',
    difficulty: 'hard',
    questionCount: 20,
    timeLimit: 15,
  },
  {
    id: '5',
    title: 'Quiz général',
    description: 'Un mélange de questions sur toute la Bible',
    category: 'general',
    difficulty: 'medium',
    questionCount: 15,
    timeLimit: 10,
  },
  {
    id: '6',
    title: 'Les miracles de Jésus',
    description: 'Testez vos connaissances sur les miracles',
    category: 'nouveau_testament',
    difficulty: 'medium',
    questionCount: 10,
    timeLimit: 8,
  },
  {
    id: '7',
    title: 'Les paraboles',
    description: 'Connaissez-vous les paraboles de Jésus?',
    category: 'nouveau_testament',
    difficulty: 'easy',
    questionCount: 12,
    timeLimit: 10,
  },
  {
    id: '8',
    title: 'Les rois d\'Israël',
    description: 'De Saül à la captivité',
    category: 'ancien_testament',
    difficulty: 'hard',
    questionCount: 15,
    timeLimit: 12,
  },
  {
    id: '9',
    title: 'Les prophètes majeurs',
    description: 'Ésaïe, Jérémie, Ézéchiel et Daniel',
    category: 'ancien_testament',
    difficulty: 'hard',
    questionCount: 20,
    timeLimit: 15,
  },
  {
    id: '10',
    title: 'Les femmes de la Bible',
    description: 'Figures féminines importantes',
    category: 'personnages',
    difficulty: 'medium',
    questionCount: 12,
    timeLimit: 10,
  },
];

const categoryConfig: Record<QuizCategory, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
  personnages: { icon: 'people', label: 'Personnages' },
  ancien_testament: { icon: 'book', label: 'Ancien Testament' },
  nouveau_testament: { icon: 'heart', label: 'Nouveau Testament' },
  versets: { icon: 'document-text', label: 'Versets' },
  general: { icon: 'star', label: 'Général' },
};

const difficultyConfig = {
  easy: { label: 'Facile', color: '#16a34a' },
  medium: { label: 'Moyen', color: '#d97706' },
  hard: { label: 'Difficile', color: '#dc2626' },
};

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

export function QuizCategoryScreen({ navigation, route }: QuizCategoryScreenProps) {
  const { category } = route.params;
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');

  const categoryInfo = categoryConfig[category];

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
    let result = allQuizzes.filter((quiz) => quiz.category === category);

    if (selectedDifficulty !== 'all') {
      result = result.filter((quiz) => quiz.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(query) ||
          quiz.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [category, selectedDifficulty, searchQuery]);

  const renderQuizCard = ({ item: quiz }: { item: Quiz }) => {
    const diffConfig = difficultyConfig[quiz.difficulty];

    return (
      <TouchableOpacity
        style={styles.quizCard}
        onPress={() => navigation.navigate('QuizPlay', { quiz })}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.quizIconWrap}
        >
          <Ionicons name={categoryInfo.icon} size={24} color="#fff" />
        </LinearGradient>
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizDescription} numberOfLines={2}>
            {quiz.description}
          </Text>
          <View style={styles.quizMeta}>
            <View style={styles.quizMetaItem}>
              <Ionicons name="help-circle-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.quizMetaText}>{quiz.questionCount} questions</Text>
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
          <Ionicons name={categoryInfo.icon} size={32} color={colors.primary} />
        </View>
        <Text style={styles.heroTitle}>{categoryInfo.label}</Text>
        <Text style={styles.heroSubtitle}>
          {filteredQuizzes.length} quiz disponible{filteredQuizzes.length > 1 ? 's' : ''}
        </Text>
        <View style={styles.cardAccent} />
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrap}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un quiz..."
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

      {/* Difficulty Filters */}
      <View style={styles.filtersRow}>
        {(['all', 'easy', 'medium', 'hard'] as DifficultyFilter[]).map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty;
          const label = difficulty === 'all' ? 'Tous' : difficultyConfig[difficulty].label;

          return (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.filterChip,
                isSelected && styles.filterChipActive,
              ]}
              onPress={() => setSelectedDifficulty(difficulty)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isSelected && styles.filterChipTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Results Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Résultats' : 'Quiz disponibles'}
          </Text>
        </View>
        <Text style={styles.resultCount}>{filteredQuizzes.length}</Text>
      </View>
    </>
  );

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={48} color={colors.text.tertiary} />
      <Text style={styles.emptyTitle}>Aucun quiz trouvé</Text>
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
          <Text style={styles.headerTitle}>{categoryInfo.label}</Text>
          <Text style={styles.headerSubtitle}>Quiz par catégorie</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={filteredQuizzes}
        renderItem={renderQuizCard}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
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
  // Quiz Card
  quizCard: {
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
  quizIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  quizDescription: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  quizMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quizMetaText: {
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
