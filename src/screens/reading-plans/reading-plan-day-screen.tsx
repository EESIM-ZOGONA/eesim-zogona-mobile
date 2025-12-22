import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';
import { useReadingProgress } from '../../hooks';

interface ReadingPlanDayScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlanDay'>;
  route: RouteProp<RootStackParamList, 'ReadingPlanDay'>;
}

export function ReadingPlanDayScreen({ navigation, route }: ReadingPlanDayScreenProps) {
  const { plan, day, userPlanId } = route.params;

  const hasUserPlan = !!userPlanId;

  const {
    isReadingComplete,
    isDayComplete,
    markReadingComplete,
    markDayComplete,
    refresh
  } = useReadingProgress({ userPlanId: userPlanId || '' });

  useFocusEffect(
    useCallback(() => {
      if (userPlanId) {
        refresh();
      }
    }, [userPlanId, refresh])
  );

  const completedReadingsCount = hasUserPlan
    ? day.readings.filter((_, i) => isReadingComplete(day.day, i)).length
    : 0;

  const allReadingsComplete = completedReadingsCount === day.readings.length;
  const dayAlreadyComplete = hasUserPlan && isDayComplete(day.day);

  const toggleReading = async (readingIndex: number) => {
    if (!hasUserPlan) {
      Alert.alert(
        'Plan non démarré',
        'Vous devez d\'abord commencer ce plan pour suivre votre progression.'
      );
      return;
    }

    if (!isReadingComplete(day.day, readingIndex)) {
      await markReadingComplete(day.day, readingIndex);
    }
  };

  const handleMarkComplete = async () => {
    if (!hasUserPlan) {
      Alert.alert(
        'Plan non démarré',
        'Vous devez d\'abord commencer ce plan pour suivre votre progression.'
      );
      return;
    }

    await markDayComplete(day.day, day.readings.length);
    navigation.goBack();
  };

  const handleOpenReading = (index: number) => {
    navigation.navigate(SCREENS.READING_PLAN_READER, {
      plan,
      day,
      userPlanId,
      initialReadingIndex: index,
    });
  };

  const formatReading = (reading: typeof day.readings[0]) => {
    if (reading.verseStart && reading.verseEnd) {
      return `${reading.bookName} ${reading.chapter}:${reading.verseStart}-${reading.verseEnd}`;
    }
    return `${reading.bookName} ${reading.chapter}`;
  };

  // Trouver la prochaine lecture non complétée
  const getNextUncompletedReading = useCallback(() => {
    if (!hasUserPlan) return null;

    for (let i = 0; i < day.readings.length; i++) {
      if (!isReadingComplete(day.day, i)) {
        return { reading: day.readings[i], index: i };
      }
    }
    return null;
  }, [hasUserPlan, day.readings, day.day, isReadingComplete]);

  const nextUncompleted = getNextUncompletedReading();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <Text style={styles.heroPlanTitle} numberOfLines={1}>{plan.title}</Text>
            <View style={styles.heroDayBadge}>
              <Ionicons name="calendar" size={14} color={colors.primary} />
              <Text style={styles.heroDayBadgeText}>JOUR {day.day}</Text>
            </View>
            <Text style={styles.heroDayTitle}>{day.title}</Text>

            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Ionicons name="book-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>{day.readings.length} lecture{day.readings.length > 1 ? 's' : ''}</Text>
              </View>
              {hasUserPlan && (
                <View style={styles.heroStat}>
                  <Ionicons name="checkmark-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.heroStatText}>{completedReadingsCount}/{day.readings.length}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.cardAccent} />
        </LinearGradient>

        <View style={styles.readingsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Lectures du jour</Text>
            </View>
            <Text style={styles.readingsCount}>{day.readings.length} passage{day.readings.length > 1 ? 's' : ''}</Text>
          </View>

          {day.readings.map((reading, index) => {
            const isComplete = hasUserPlan && isReadingComplete(day.day, index);
            const isNext = nextUncompleted?.index === index;

            return (
              <View
                key={index}
                style={[
                  styles.readingCard,
                  isComplete && styles.readingCardComplete,
                  isNext && styles.readingCardNext,
                ]}
              >
                <TouchableOpacity
                  style={[styles.readingCheckbox, isComplete && styles.readingCheckboxComplete]}
                  onPress={() => toggleReading(index)}
                  activeOpacity={0.8}
                >
                  {isComplete && <Ionicons name="checkmark" size={18} color="#fff" />}
                </TouchableOpacity>
                <View style={styles.readingInfo}>
                  <View style={styles.readingTitleRow}>
                    <Text style={[styles.readingRef, isComplete && styles.readingRefComplete]}>
                      {formatReading(reading)}
                    </Text>
                    {isNext && (
                      <View style={styles.nextBadge}>
                        <Text style={styles.nextBadgeText}>Suivant</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.readingHint}>
                    {isComplete ? 'Lecture terminée' : 'Appuyez sur Lire pour ouvrir'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.readingOpenButton, isComplete && styles.readingOpenButtonComplete]}
                  onPress={() => handleOpenReading(index)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isComplete ? "book" : "book-outline"}
                    size={18}
                    color={isComplete ? colors.text.secondary : colors.primary}
                  />
                  <Text style={[styles.readingOpenText, isComplete && styles.readingOpenTextComplete]}>
                    {isComplete ? 'Relire' : 'Lire'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {day.reflection && (
          <View style={styles.reflectionSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleWrap}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionTitle}>Réflexion</Text>
              </View>
            </View>
            <View style={styles.reflectionCard}>
              <View style={styles.reflectionIconWrap}>
                <Ionicons name="bulb" size={20} color={colors.primary} />
              </View>
              <Text style={styles.reflectionText}>{day.reflection}</Text>
            </View>
          </View>
        )}

        <View style={styles.actionsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Actions</Text>
            </View>
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate(SCREENS.NOTE_EDIT, {
                note: undefined,
                linkedVerseRef: day.readings[0] ? formatReading(day.readings[0]) : undefined,
              })}
              activeOpacity={0.8}
            >
              <View style={styles.actionIconWrap}>
                <Ionicons name="document-text-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionCardTitle}>Notes</Text>
              <Text style={styles.actionCardSubtitle}>Prendre des notes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, nextUncompleted && styles.actionCardHighlight]}
              onPress={() => {
                if (nextUncompleted) {
                  handleOpenReading(nextUncompleted.index);
                } else if (day.readings[0]) {
                  handleOpenReading(0);
                }
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconWrap, nextUncompleted && styles.actionIconWrapHighlight]}>
                <Ionicons name="book-outline" size={24} color={nextUncompleted ? '#fff' : colors.primary} />
              </View>
              <Text style={styles.actionCardTitle}>Bible</Text>
              <Text style={styles.actionCardSubtitle}>
                {nextUncompleted ? 'Continuer la lecture' : 'Commencer la lecture'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {dayAlreadyComplete ? (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.completedBannerText}>Jour terminé</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.completeButton,
              !allReadingsComplete && styles.completeButtonDisabled,
            ]}
            onPress={handleMarkComplete}
            disabled={!allReadingsComplete}
            activeOpacity={0.9}
          >
            <Ionicons
              name={allReadingsComplete ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={20}
              color={allReadingsComplete ? '#fff' : colors.text.tertiary}
            />
            <Text
              style={[
                styles.completeButtonText,
                !allReadingsComplete && styles.completeButtonTextDisabled,
              ]}
            >
              {allReadingsComplete ? 'Marquer comme terminé' : 'Terminez toutes les lectures'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
    paddingBottom: 120,
  },
  heroCard: {
    margin: spacing.lg,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  heroContent: {},
  heroPlanTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.sm,
  },
  heroDayBadge: {
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
  heroDayBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  heroDayTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.lg,
  },
  heroStats: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroStatText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  cardAccent: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
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
  readingsCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  readingsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  readingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  readingCardComplete: {
    backgroundColor: colors.primaryLight,
  },
  readingCardNext: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  readingCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.text.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readingCheckboxComplete: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  readingInfo: {
    flex: 1,
  },
  readingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  readingRef: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  readingRefComplete: {
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  nextBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  nextBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  readingHint: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  readingOpenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
  },
  readingOpenButtonComplete: {
    backgroundColor: colors.surface,
  },
  readingOpenText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  readingOpenTextComplete: {
    color: colors.text.secondary,
  },
  reflectionSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  reflectionCard: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
  },
  reflectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  reflectionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
  actionsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionCard: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  actionCardHighlight: {
    backgroundColor: colors.primaryLight,
  },
  actionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionIconWrapHighlight: {
    backgroundColor: colors.primary,
  },
  actionCardTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  actionCardSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: '#22c55e15',
    borderRadius: borderRadius.xl,
  },
  completedBannerText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#22c55e',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
  },
  completeButtonDisabled: {
    backgroundColor: colors.surface,
  },
  completeButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  completeButtonTextDisabled: {
    color: colors.text.tertiary,
  },
});
