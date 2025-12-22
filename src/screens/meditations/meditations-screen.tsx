import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, MeditationCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useMeditations } from '../../hooks';

// Category icons mapping
const categoryIcons: Record<MeditationCategory, keyof typeof Ionicons.glyphMap> = {
  foi: 'shield-checkmark',
  amour: 'heart',
  pardon: 'hand-right',
  priere: 'prism',
  esperance: 'sunny',
  sagesse: 'bulb',
  paix: 'leaf',
};

interface MeditationsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Meditations'>;
}

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

export function MeditationsScreen({ navigation }: MeditationsScreenProps) {
  const {
    meditations,
    loading,
    todayMeditation,
    categories,
  } = useMeditations({});

  const goToHymns = () => {
    // Navigate back to Main and then to HymnsTab
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [{ name: 'HymnsTab' }],
            },
          },
        ],
      })
    );
  };

  const openBibleReading = () => {
    // Open YouVersion Bible App or website
    Linking.openURL('https://www.bible.com/fr/reading-plans').catch(() => {
      // Fallback to a Bible website if app not installed
      Linking.openURL('https://www.bible.com/fr');
    });
  };

  const handleSeeMore = () => {
    navigation.navigate('MeditationList', {});
  };

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = MONTHS_SHORT[today.getMonth()];

  const renderMeditationCard = ({ item: meditation, index }: { item: typeof meditations[0]; index: number }) => {
    const date = new Date(meditation.date);
    const day = date.getDate().toString();
    const monthIndex = date.getMonth();

    return (
      <TouchableOpacity
        key={meditation.id}
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
      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={styles.categoryChip}
            onPress={() => navigation.navigate('MeditationList', { category: cat.key })}
            activeOpacity={0.8}
          >
            <Ionicons
              name={categoryIcons[cat.key]}
              size={14}
              color={colors.primary}
              style={styles.categoryChipIcon}
            />
            <Text style={styles.categoryChipText}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Today's Meditation Card */}
      {todayMeditation && (
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.todayCard}
        >
          <View style={styles.todayHeader}>
            <View style={styles.todayDateWrap}>
              <Text style={styles.todayDateMonth}>{todayMonth}</Text>
              <Text style={styles.todayDateDay}>{todayDay}</Text>
            </View>
            <View style={styles.todayBadge}>
              <Ionicons name="sparkles" size={12} color="#fbbf24" />
              <Text style={styles.todayBadgeText}>AUJOURD'HUI</Text>
            </View>
          </View>

          <Text style={styles.todayTitle}>{todayMeditation.title}</Text>

          <View style={styles.verseBox}>
            <Text style={styles.verseQuote}>"</Text>
            <Text style={styles.todayVerse}>{todayMeditation.verse}</Text>
            <Text style={styles.todayVerseRef}>{todayMeditation.verseRef}</Text>
          </View>

          <TouchableOpacity
            style={styles.readButton}
            onPress={() => navigation.navigate('MeditationDetail', { meditation: todayMeditation })}
            activeOpacity={0.9}
          >
            <Text style={styles.readButtonText}>Lire la méditation</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.cardAccent} />
        </LinearGradient>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.8}
            onPress={openBibleReading}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="book" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickActionTitle}>Lecture Bible</Text>
            <Text style={styles.quickActionSubtitle}>Plan quotidien</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.8}
            onPress={goToHymns}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="musical-notes" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickActionTitle}>Louange</Text>
            <Text style={styles.quickActionSubtitle}>Cantique du jour</Text>
          </TouchableOpacity>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>Méditations récentes</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleSeeMore}>
          <Text style={styles.seeAllText}>Voir plus</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const ListFooter = () => (
    <View style={styles.tipCard}>
      <View style={styles.tipIconWrap}>
        <Ionicons name="bulb" size={24} color={colors.primary} />
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>Conseil spirituel</Text>
        <Text style={styles.tipText}>
          Commencez votre journée par 10 minutes de méditation et de prière pour bien la démarrer.
        </Text>
      </View>
    </View>
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
          <Text style={styles.headerSubtitle}>Nourriture spirituelle</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.calendarGradient}
          >
            <Ionicons name="calendar" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
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
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  calendarGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
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
  categoryChipIcon: {
    marginRight: spacing.xs,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  // Today Card
  todayCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  todayDateWrap: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  todayDateMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  todayDateDay: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
    marginTop: -2,
  },
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  todayBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 0.5,
  },
  todayTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.md,
  },
  verseBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  verseQuote: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.3)',
    lineHeight: 32,
    marginBottom: -spacing.sm,
  },
  todayVerse: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  todayVerseRef: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.9)',
    marginTop: spacing.sm,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  readButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 40 }, { translateY: 40 }],
  },
  // Quick Actions
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  quickActionSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
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
  seeAllText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
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
