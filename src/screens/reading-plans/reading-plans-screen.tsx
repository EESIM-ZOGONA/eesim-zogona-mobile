import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

const categoryLabels: Record<ReadingPlanCategory, string> = {
  debutant: 'Débutant',
  annuel: 'Annuel',
  thematique: 'Thématique',
  livre: 'Par Livre',
};

const categoryIcons: Record<ReadingPlanCategory, keyof typeof Ionicons.glyphMap> = {
  debutant: 'leaf',
  annuel: 'calendar',
  thematique: 'bulb',
  livre: 'book',
};

export function ReadingPlansScreen({ navigation }: ReadingPlansScreenProps) {
  const [activeCategory, setActiveCategory] = useState<ReadingPlanCategory | 'all'>('all');

  // Mock: plan en cours (à remplacer par état persistant)
  const activePlanId = 'debutant-7-jours';
  const activePlan = readingPlans.find(p => p.id === activePlanId);

  const filteredPlans = activeCategory === 'all'
    ? readingPlans
    : readingPlans.filter(p => p.category === activeCategory);

  const categories: (ReadingPlanCategory | 'all')[] = ['all', 'debutant', 'thematique', 'livre', 'annuel'];

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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Plan actif */}
        {activePlan && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Votre plan en cours</Text>
            <TouchableOpacity
              style={styles.activePlanCard}
              onPress={() => navigation.navigate('ReadingPlanDetail', { plan: activePlan })}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: activePlan.imageUrl }}
                style={styles.activePlanImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.activePlanGradient}
              />
              <View style={styles.activePlanContent}>
                <View style={styles.activePlanBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
                  <Text style={styles.activePlanBadgeText}>En cours</Text>
                </View>
                <Text style={styles.activePlanTitle}>{activePlan.title}</Text>
                <Text style={styles.activePlanDesc} numberOfLines={2}>
                  {activePlan.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${calculateProgress(activePlan).percentage}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {calculateProgress(activePlan).completed}/{calculateProgress(activePlan).total} jours
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Catégories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat === 'all' ? 'Tous' : categoryLabels[cat]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Liste des plans */}
        <View style={styles.plansGrid}>
          {filteredPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={styles.planCard}
              onPress={() => navigation.navigate('ReadingPlanDetail', { plan })}
              activeOpacity={0.9}
            >
              <Image source={{ uri: plan.imageUrl }} style={styles.planImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.planGradient}
              />
              <View style={styles.planBadge}>
                <Ionicons name={categoryIcons[plan.category]} size={12} color={colors.primary} />
                <Text style={styles.planBadgeText}>{categoryLabels[plan.category]}</Text>
              </View>
              <View style={styles.planContent}>
                <Text style={styles.planTitle} numberOfLines={2}>{plan.title}</Text>
                <View style={styles.planMeta}>
                  <Ionicons name="calendar-outline" size={12} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.planMetaText}>{plan.duration} jours</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  // Active Plan
  activePlanCard: {
    height: 200,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  activePlanImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  activePlanGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  activePlanContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  activePlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  activePlanBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: '#22c55e',
  },
  activePlanTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  activePlanDesc: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
  },
  // Categories
  categoriesScroll: {
    marginBottom: spacing.lg,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  categoryChip: {
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
  // Plans Grid
  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  planCard: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
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
});
