import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

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
          <Text style={styles.headerSubtitle}>{plan.title}</Text>
          <Text style={styles.headerTitle}>Jour {day.day}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Title */}
        <View style={styles.dayTitleSection}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>JOUR {day.day}</Text>
          </View>
          <Text style={styles.dayTitle}>{day.title}</Text>
        </View>

        {/* Readings */}
        <View style={styles.readingsSection}>
          <Text style={styles.sectionTitle}>Lectures du jour</Text>
          {day.readings.map((reading, index) => {
            const key = `${day.id}-${index}`;
            const isComplete = completedReadings.includes(key);
            return (
              <View key={index} style={styles.readingCard}>
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
                </View>
                <TouchableOpacity
                  style={styles.readingOpenButton}
                  onPress={() => handleOpenReading(reading)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="book-outline" size={18} color={colors.primary} />
                  <Text style={styles.readingOpenText}>Lire</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Reflection */}
        {day.reflection && (
          <View style={styles.reflectionSection}>
            <Text style={styles.sectionTitle}>Réflexion</Text>
            <View style={styles.reflectionCard}>
              <Ionicons name="bulb-outline" size={20} color={colors.primary} style={styles.reflectionIcon} />
              <Text style={styles.reflectionText}>{day.reflection}</Text>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('NoteEdit', {
              note: undefined,
              linkedVerseRef: day.readings[0] ? formatReading(day.readings[0]) : undefined,
            })}
            activeOpacity={0.8}
          >
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Prendre des notes</Text>
          </TouchableOpacity>
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
  headerSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  headerTitle: {
    fontSize: fontSize.lg,
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
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  // Day Title
  dayTitleSection: {
    marginBottom: spacing.xl,
  },
  dayBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  dayBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 1,
  },
  dayTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  // Readings
  readingsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  readingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
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
  },
  readingRefComplete: {
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  readingOpenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
  },
  readingOpenText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Reflection
  reflectionSection: {
    marginBottom: spacing.xl,
  },
  reflectionCard: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  reflectionIcon: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  reflectionText: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
  // Actions
  actionsSection: {
    marginBottom: spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  completeButtonDisabled: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.text.tertiary,
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
