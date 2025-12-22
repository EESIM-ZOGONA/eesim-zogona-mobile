import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, ReadingPlan, ReadingPlanCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { readingPlans, calculateProgress } from '../../data/reading-plans-data';

const { width } = Dimensions.get('window');

interface ReadingPlansScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlans'>;
}

const categories: { key: ReadingPlanCategory | 'all'; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'debutant', label: 'Débutant', icon: 'leaf' },
  { key: 'thematique', label: 'Thématique', icon: 'bulb' },
  { key: 'livre', label: 'Par Livre', icon: 'book' },
];

// Mock: plan en cours (à remplacer par état persistant)
const activePlanId = 'debutant-7-jours';

export function ReadingPlansScreen({ navigation }: ReadingPlansScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ReadingPlanCategory | 'all'>('all');

  const activePlan = readingPlans.find(p => p.id === activePlanId);

  const filteredPlans = useMemo(() => {
    return readingPlans.filter((plan) => {
      const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || plan.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const otherPlans = filteredPlans.filter(p => p.id !== activePlanId);

  const renderActivePlan = () => {
    if (!activePlan) return null;
    const progress = calculateProgress(activePlan);

    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => navigation.navigate('ReadingPlanDetail', { plan: activePlan })}
        activeOpacity={0.95}
      >
        <Image
          source={{ uri: activePlan.imageUrl || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800' }}
          style={styles.featuredImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.featuredGradient}
        />

        {/* Active badge */}
        <View style={styles.featuredBadge}>
          <Ionicons name="checkmark-circle" size={12} color="#22c55e" />
          <Text style={styles.featuredBadgeText}>EN COURS</Text>
        </View>

        {/* Duration badge */}
        <View style={styles.featuredDateBadge}>
          <Text style={styles.featuredDateMonth}>JOURS</Text>
          <Text style={styles.featuredDateDay}>{activePlan.duration}</Text>
        </View>

        {/* Content */}
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle} numberOfLines={2}>{activePlan.title}</Text>
          <Text style={styles.featuredDesc} numberOfLines={2}>{activePlan.description}</Text>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress.percentage}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress.completed}/{progress.total}</Text>
          </View>

          <View style={styles.featuredAction}>
            <Text style={styles.featuredActionText}>Continuer</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPlanItem = ({ item, index }: { item: ReadingPlan; index: number }) => {
    return (
      <TouchableOpacity
        style={styles.planCard}
        onPress={() => navigation.navigate('ReadingPlanDetail', { plan: item })}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800' }}
          style={styles.planImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          style={styles.planGradient}
        />

        {/* Category badge */}
        <View style={styles.planBadge}>
          <Ionicons
            name={categories.find(c => c.key === item.category)?.icon || 'book'}
            size={10}
            color={colors.primary}
          />
          <Text style={styles.planBadgeText}>
            {categories.find(c => c.key === item.category)?.label || item.category}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.planContent}>
          <Text style={styles.planTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.planMeta}>
            <Ionicons name="calendar-outline" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.planMetaText}>{item.duration} jours</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>Plans de lecture</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color={colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un plan..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesScroll}
      >
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
              name={cat.icon}
              size={16}
              color={selectedCategory === cat.key ? '#fff' : colors.text.secondary}
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

      <FlatList
        data={otherPlans}
        renderItem={renderPlanItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.planRow}
        ListHeaderComponent={() => (
          <>
            {activePlan && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Votre plan en cours</Text>
              </View>
            )}
            {renderActivePlan()}
            {otherPlans.length > 0 && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Découvrir d'autres plans</Text>
              </View>
            )}
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={64} color={colors.text.tertiary} />
            <Text style={styles.emptyTitle}>Aucun plan trouvé</Text>
            <Text style={styles.emptyText}>
              Essayez de modifier vos critères de recherche
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

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
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerRight: {
    width: 44,
  },
  // Search
  searchContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
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
  categoriesScroll: {
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  // List
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  // Featured Card (Active Plan)
  featuredCard: {
    height: 280,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#22c55e',
    letterSpacing: 0.5,
  },
  featuredDateBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    minWidth: 56,
  },
  featuredDateMonth: {
    fontSize: 9,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  featuredDateDay: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: colors.primary,
    marginTop: -2,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  featuredTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  featuredDesc: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
  },
  featuredAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  featuredActionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Plan Card Grid
  planRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  planCard: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  planImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  planGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  planBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  planBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  planContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  planTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  planMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  planMetaText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
  },
  // Empty
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
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
