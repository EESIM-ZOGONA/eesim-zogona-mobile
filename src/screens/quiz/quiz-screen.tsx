import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, Quiz } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface QuizScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
}

const quizzes: Quiz[] = [
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
];

const categoryConfig = {
  personnages: { icon: 'people' as const, color: '#2563eb', bg: '#dbeafe' },
  ancien_testament: { icon: 'book' as const, color: '#d97706', bg: '#fef3c7' },
  nouveau_testament: { icon: 'heart' as const, color: '#dc2626', bg: '#fee2e2' },
  versets: { icon: 'document-text' as const, color: '#7c3aed', bg: '#ede9fe' },
  general: { icon: 'star' as const, color: '#059669', bg: '#dcfce7' },
};

const difficultyConfig = {
  easy: { label: 'Facile', color: '#16a34a' },
  medium: { label: 'Moyen', color: '#d97706' },
  hard: { label: 'Difficile', color: '#dc2626' },
};

export function QuizScreen({ navigation }: QuizScreenProps) {
  // Mock user stats
  const userStats = {
    totalQuizzes: 12,
    totalPoints: 850,
    streak: 5,
  };

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
          <Text style={styles.headerTitle}>Quiz Biblique</Text>
          <Text style={styles.headerSubtitle}>Testez vos connaissances</Text>
        </View>
        <TouchableOpacity style={styles.leaderboardButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.leaderboardGradient}
          >
            <Ionicons name="trophy" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsCard}
        >
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{userStats.totalQuizzes}</Text>
              <Text style={styles.statLabel}>Quiz terminés</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="star" size={22} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{userStats.totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <Ionicons name="flame" size={22} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Série</Text>
            </View>
          </View>
          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Daily Challenge */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Défi du jour</Text>
          </View>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NOUVEAU</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.dailyChallengeCard}
          onPress={() => navigation.navigate('QuizPlay', { quiz: quizzes[0] })}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#059669', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.dailyChallengeGradient}
          >
            <View style={styles.dailyChallengeContent}>
              <View style={styles.dailyChallengeIcon}>
                <Ionicons name="flash" size={28} color="#059669" />
              </View>
              <View style={styles.dailyChallengeInfo}>
                <Text style={styles.dailyChallengeTitle}>Quiz rapide</Text>
                <Text style={styles.dailyChallengeSubtitle}>5 questions en 2 minutes</Text>
              </View>
            </View>
            <View style={styles.dailyChallengeArrow}>
              <Ionicons name="play" size={20} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quiz Categories */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Catégories</Text>
          </View>
        </View>

        <View style={styles.categoriesGrid}>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TouchableOpacity
              key={key}
              style={styles.categoryCard}
              activeOpacity={0.8}
            >
              <View style={[styles.categoryIcon, { backgroundColor: config.bg }]}>
                <Ionicons name={config.icon} size={24} color={config.color} />
              </View>
              <Text style={styles.categoryLabel}>
                {key === 'ancien_testament' ? 'AT' :
                 key === 'nouveau_testament' ? 'NT' :
                 key === 'personnages' ? 'Personnages' :
                 key === 'versets' ? 'Versets' : 'Général'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* All Quizzes */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Tous les quiz</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {quizzes.map((quiz, index) => {
          const catConfig = categoryConfig[quiz.category];
          const diffConfig = difficultyConfig[quiz.difficulty];

          const gradientColors = [
            ['#030a7f', '#020866'] as [string, string],
            ['#d97706', '#b45309'] as [string, string],
            ['#dc2626', '#b91c1c'] as [string, string],
            ['#7c3aed', '#6d28d9'] as [string, string],
            ['#059669', '#047857'] as [string, string],
          ];

          return (
            <TouchableOpacity
              key={quiz.id}
              style={styles.quizCard}
              onPress={() => navigation.navigate('QuizPlay', { quiz })}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={gradientColors[index % gradientColors.length]}
                style={styles.quizIconWrap}
              >
                <Ionicons name={catConfig.icon} size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.quizDescription} numberOfLines={1}>
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
        })}

        {/* Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Astuce</Text>
            <Text style={styles.tipText}>
              Jouez chaque jour pour maintenir votre série et gagner des points bonus !
            </Text>
          </View>
        </View>
      </ScrollView>
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
  leaderboardButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  leaderboardGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Stats Card
  statsCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
  newBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  newBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Daily Challenge
  dailyChallengeCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  dailyChallengeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  dailyChallengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dailyChallengeIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyChallengeInfo: {},
  dailyChallengeTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  dailyChallengeSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  dailyChallengeArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Categories Grid
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  categoryLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    textAlign: 'center',
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
  // Tip Card
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  tipIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.primaryDark,
    lineHeight: 20,
  },
});
