import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, ReadingPlanDay } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { calculateProgress } from '../../data/reading-plans-data';

interface ReadingPlanDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlanDetail'>;
  route: RouteProp<RootStackParamList, 'ReadingPlanDetail'>;
}

export function ReadingPlanDetailScreen({ navigation, route }: ReadingPlanDetailScreenProps) {
  const { plan } = route.params;
  const [completedDays, setCompletedDays] = useState<string[]>(plan.completedDays || []);

  const progress = calculateProgress({ ...plan, completedDays });

  const handleStartPlan = () => {
    Alert.alert(
      'Commencer le plan',
      `Voulez-vous commencer "${plan.title}" ? Vous recevrez un rappel quotidien.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Commencer',
          onPress: () => {
            // TODO: Persist start date and setup notifications
            console.log('Starting plan:', plan.id);
          },
        },
      ]
    );
  };

  const handleDayPress = (day: ReadingPlanDay) => {
    navigation.navigate('ReadingPlanDay', { plan, day });
  };

  const toggleDayComplete = (dayId: string) => {
    setCompletedDays(prev =>
      prev.includes(dayId) ? prev.filter(id => id !== dayId) : [...prev, dayId]
    );
    // TODO: Persist to storage
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: plan.imageUrl }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{plan.title}</Text>
            <Text style={styles.heroDesc}>{plan.description}</Text>
            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <Ionicons name="calendar-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroMetaText}>{plan.duration} jours</Text>
              </View>
              <View style={styles.heroMetaItem}>
                <Ionicons name="book-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroMetaText}>{plan.days.length} lectures</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Votre progression</Text>
            <Text style={styles.progressPercentage}>{progress.percentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress.percentage}%` }]} />
          </View>
          <Text style={styles.progressSubtext}>
            {progress.completed} sur {progress.total} jours complétés
          </Text>
        </View>

        {/* Start Button */}
        {!plan.startDate && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartPlan}
            activeOpacity={0.9}
          >
            <Ionicons name="play" size={20} color="#fff" />
            <Text style={styles.startButtonText}>Commencer ce plan</Text>
          </TouchableOpacity>
        )}

        {/* Days List */}
        <View style={styles.daysSection}>
          <Text style={styles.daysSectionTitle}>Programme</Text>
          {plan.days.map((day) => {
            const isCompleted = completedDays.includes(day.id);
            return (
              <TouchableOpacity
                key={day.id}
                style={[styles.dayCard, isCompleted && styles.dayCardCompleted]}
                onPress={() => handleDayPress(day)}
                activeOpacity={0.8}
              >
                <View style={styles.dayLeft}>
                  <TouchableOpacity
                    style={[styles.dayCheckbox, isCompleted && styles.dayCheckboxCompleted]}
                    onPress={() => toggleDayComplete(day.id)}
                    activeOpacity={0.8}
                  >
                    {isCompleted && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                  <View style={styles.dayInfo}>
                    <Text style={[styles.dayNumber, isCompleted && styles.dayNumberCompleted]}>
                      Jour {day.day}
                    </Text>
                    <Text style={[styles.dayTitle, isCompleted && styles.dayTitleCompleted]}>
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
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={isCompleted ? colors.text.tertiary : colors.text.secondary}
                />
              </TouchableOpacity>
            );
          })}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  // Hero
  heroContainer: {
    height: 280,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  heroTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.sm,
  },
  heroDesc: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.md,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroMetaText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
  },
  // Progress
  progressSection: {
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
  progressBar: {
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
  // Start Button
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  startButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Days
  daysSection: {
    paddingHorizontal: spacing.xl,
  },
  daysSectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  dayCardCompleted: {
    backgroundColor: colors.primaryLight,
  },
  dayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
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
