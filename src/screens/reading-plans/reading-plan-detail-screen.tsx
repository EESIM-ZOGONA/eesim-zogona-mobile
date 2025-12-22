import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, ReadingPlanDay } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';
import { useReadingPlans, useReadingProgress } from '../../hooks';

interface ReadingPlanDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlanDetail'>;
  route: RouteProp<RootStackParamList, 'ReadingPlanDetail'>;
}

export function ReadingPlanDetailScreen({ navigation, route }: ReadingPlanDetailScreenProps) {
  const { plan, userPlanId } = route.params;
  const { startPlan, pausePlan, resumePlan, abandonPlan, refresh: refreshPlans } = useReadingPlans();
  const [currentUserPlanId, setCurrentUserPlanId] = useState(userPlanId);
  const [isStarting, setIsStarting] = useState(false);

  const hasUserPlan = !!currentUserPlanId;

  const {
    progress,
    allProgress,
    loading,
    isDayComplete,
    refresh: refreshProgress
  } = useReadingProgress({ userPlanId: currentUserPlanId || '' });

  useFocusEffect(
    useCallback(() => {
      if (currentUserPlanId) {
        refreshProgress();
      }
    }, [currentUserPlanId, refreshProgress])
  );

  const handleStartPlan = async () => {
    Alert.alert(
      'Commencer le plan',
      `Voulez-vous commencer "${plan.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Commencer',
          onPress: async () => {
            setIsStarting(true);
            try {
              const userPlan = await startPlan(plan);
              setCurrentUserPlanId(userPlan.id);
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de démarrer le plan');
            } finally {
              setIsStarting(false);
            }
          }
        },
      ]
    );
  };

  const handlePausePlan = () => {
    if (!currentUserPlanId) return;
    Alert.alert(
      'Mettre en pause',
      'Voulez-vous mettre ce plan en pause ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Mettre en pause',
          onPress: async () => {
            await pausePlan(currentUserPlanId);
            await refreshPlans();
          }
        },
      ]
    );
  };

  const handleResumePlan = async () => {
    if (!currentUserPlanId) return;
    await resumePlan(currentUserPlanId);
    await refreshPlans();
  };

  const handleAbandonPlan = () => {
    if (!currentUserPlanId) return;
    Alert.alert(
      'Abandonner le plan',
      'Êtes-vous sûr de vouloir abandonner ce plan ? Votre progression sera perdue.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Abandonner',
          style: 'destructive',
          onPress: async () => {
            await abandonPlan(currentUserPlanId);
            setCurrentUserPlanId(undefined);
            await refreshPlans();
          }
        },
      ]
    );
  };

  const handleDayPress = (day: ReadingPlanDay) => {
    navigation.navigate(SCREENS.READING_PLAN_DAY, {
      plan,
      day,
      userPlanId: currentUserPlanId
    });
  };

  const renderDayItem = ({ item: day }: { item: ReadingPlanDay }) => {
    const isCompleted = hasUserPlan && isDayComplete(day.day);

    return (
      <TouchableOpacity
        style={[styles.dayCard, isCompleted && styles.dayCardCompleted]}
        onPress={() => handleDayPress(day)}
        activeOpacity={0.8}
      >
        <View style={[styles.dayCheckbox, isCompleted && styles.dayCheckboxCompleted]}>
          {isCompleted && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <View style={styles.dayInfo}>
          <Text style={[styles.dayNumber, isCompleted && styles.dayNumberCompleted]}>
            Jour {day.day}
          </Text>
          <Text style={[styles.dayTitle, isCompleted && styles.dayTitleCompleted]} numberOfLines={1}>
            {day.title}
          </Text>
          <Text style={styles.dayReadings} numberOfLines={1}>
            {day.readings.map(r =>
              r.verseStart
                ? `${r.bookName} ${r.chapter}:${r.verseStart}-${r.verseEnd}`
                : `${r.bookName} ${r.chapter}`
            ).join(', ')}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={isCompleted ? colors.text.tertiary : colors.text.secondary}
        />
      </TouchableOpacity>
    );
  };

  if (isStarting) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Démarrage du plan...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={plan.days}
        renderItem={renderDayItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            <View style={styles.heroContainer}>
              <Image source={{ uri: plan.imageUrl }} style={styles.heroImage} />
              <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
                style={styles.heroGradient}
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              {hasUserPlan && (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => {
                    Alert.alert(
                      'Options',
                      undefined,
                      [
                        { text: 'Annuler', style: 'cancel' },
                        { text: 'Mettre en pause', onPress: handlePausePlan },
                        { text: 'Abandonner', style: 'destructive', onPress: handleAbandonPlan },
                      ]
                    );
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                </TouchableOpacity>
              )}

              <View style={styles.heroContent}>
                <View style={styles.heroBadge}>
                  <Ionicons name="calendar" size={12} color={colors.primary} />
                  <Text style={styles.heroBadgeText}>{plan.duration} jours</Text>
                </View>
                <Text style={styles.heroTitle}>{plan.title}</Text>
                <Text style={styles.heroDesc} numberOfLines={2}>{plan.description}</Text>
              </View>
            </View>

            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>
                  {hasUserPlan ? 'Votre progression' : 'Aperçu du plan'}
                </Text>
                <Text style={styles.progressPercentage}>
                  {hasUserPlan ? `${progress.percentage}%` : `${plan.duration} jours`}
                </Text>
              </View>
              {hasUserPlan && (
                <>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressFill, { width: `${progress.percentage}%` }]} />
                  </View>
                  <Text style={styles.progressSubtext}>
                    {progress.completedDays} sur {progress.totalDays} jours complétés
                  </Text>
                </>
              )}
            </View>

            {!hasUserPlan && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartPlan}
                activeOpacity={0.9}
              >
                <Ionicons name="play" size={20} color="#fff" />
                <Text style={styles.startButtonText}>Commencer ce plan</Text>
              </TouchableOpacity>
            )}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Programme</Text>
              <Text style={styles.sectionSubtitle}>{plan.days.length} lectures</Text>
            </View>
          </>
        )}
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
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  heroContainer: {
    height: 260,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  heroBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  heroDesc: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
  },
  progressCard: {
    margin: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  progressPercentage: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  startButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  dayCardCompleted: {
    backgroundColor: colors.primaryLight,
  },
  dayCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.text.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCheckboxCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayInfo: {
    flex: 1,
  },
  dayNumber: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    marginBottom: 2,
  },
  dayNumberCompleted: {
    color: colors.primaryDark,
  },
  dayTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  dayTitleCompleted: {
    color: colors.text.secondary,
  },
  dayReadings: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});
