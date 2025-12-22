import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface ReadingPlanDayScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlanDay'>;
  route: RouteProp<RootStackParamList, 'ReadingPlanDay'>;
}

export function ReadingPlanDayScreen({ navigation, route }: ReadingPlanDayScreenProps) {
  const { plan, day } = route.params;
  const [completedReadings, setCompletedReadings] = useState<string[]>([]);

  const allReadingsComplete = completedReadings.length === day.readings.length;

  const toggleReading = (readingIndex: number) => {
    const key = `${day.id}-${readingIndex}`;
    setCompletedReadings(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleMarkComplete = () => {
    // TODO: Persist completion and go back
    navigation.goBack();
  };

  const handleOpenReading = (reading: typeof day.readings[0]) => {
    navigation.navigate('BibleChapter', {
      bookId: reading.bookId,
      bookName: reading.bookName,
      chapter: reading.chapter,
    });
  };

  const formatReading = (reading: typeof day.readings[0]) => {
    if (reading.verseStart && reading.verseEnd) {
      return `${reading.bookName} ${reading.chapter}:${reading.verseStart}-${reading.verseEnd}`;
    }
    return `${reading.bookName} ${reading.chapter}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
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
              <View style={styles.heroStat}>
                <Ionicons name="checkmark-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>{completedReadings.length}/{day.readings.length}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Readings Section */}
        <View style={styles.readingsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Lectures du jour</Text>
            </View>
            <Text style={styles.readingsCount}>{day.readings.length} passage{day.readings.length > 1 ? 's' : ''}</Text>
          </View>

          {day.readings.map((reading, index) => {
            const key = `${day.id}-${index}`;
            const isComplete = completedReadings.includes(key);
            return (
              <View key={index} style={[styles.readingCard, isComplete && styles.readingCardComplete]}>
                <TouchableOpacity
                  style={[styles.readingCheckbox, isComplete && styles.readingCheckboxComplete]}
                  onPress={() => toggleReading(index)}
                  activeOpacity={0.8}
                >
                  {isComplete && <Ionicons name="checkmark" size={18} color="#fff" />}
                </TouchableOpacity>
                <View style={styles.readingInfo}>
                  <Text style={[styles.readingRef, isComplete && styles.readingRefComplete]}>
                    {formatReading(reading)}
                  </Text>
                  <Text style={styles.readingHint}>Appuyez sur Lire pour ouvrir</Text>
                </View>
                <TouchableOpacity
                  style={[styles.readingOpenButton, isComplete && styles.readingOpenButtonComplete]}
                  onPress={() => handleOpenReading(reading)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="book-outline" size={18} color={isComplete ? colors.text.secondary : colors.primary} />
                  <Text style={[styles.readingOpenText, isComplete && styles.readingOpenTextComplete]}>Lire</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Reflection */}
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

        {/* Quick Actions */}
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
              onPress={() => navigation.navigate('NoteEdit', {
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
              style={styles.actionCard}
              onPress={() => {
                if (day.readings[0]) {
                  handleOpenReading(day.readings[0]);
                }
              }}
              activeOpacity={0.8}
            >
              <View style={styles.actionIconWrap}>
                <Ionicons name="book-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionCardTitle}>Bible</Text>
              <Text style={styles.actionCardSubtitle}>Commencer la lecture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
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
  // Hero Card
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
  heroContent: {
    // Content styling
  },
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
  readingsCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  // Readings
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
  readingRef: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  readingRefComplete: {
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  readingHint: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
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
  // Reflection
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
  // Actions
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
  actionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
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
  // Bottom Bar
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
