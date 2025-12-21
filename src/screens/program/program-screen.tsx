import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, MainTabParamList, ProgramActivity, ProgramCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { mockProgramActivities } from '../../utils';

const { width } = Dimensions.get('window');

type ProgramScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'ProgramTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProgramScreenProps {
  navigation: ProgramScreenNavigationProp;
}

const categories: { key: ProgramCategory | 'all'; label: string; icon: string; color: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps', color: colors.primary },
  { key: 'culte', label: 'Cultes', icon: 'people', color: '#2563eb' },
  { key: 'reunion', label: 'Reunions', icon: 'chatbubbles', color: '#7c3aed' },
  { key: 'jeune', label: 'Jeune', icon: 'flash', color: '#059669' },
  { key: 'priere', label: 'Priere', icon: 'heart', color: '#dc2626' },
];

const DAYS_SHORT = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const DAYS_FULL = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const MONTHS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

// Color schemes for activity cards
const getActivityColorScheme = (category: string, index: number) => {
  const schemes: Record<string, { gradient: [string, string]; light: string }> = {
    culte: { gradient: ['#2563eb', '#1d4ed8'], light: '#dbeafe' },
    reunion: { gradient: ['#7c3aed', '#6d28d9'], light: '#ede9fe' },
    jeune: { gradient: ['#059669', '#047857'], light: '#dcfce7' },
    priere: { gradient: ['#dc2626', '#b91c1c'], light: '#fef2f2' },
    default: { gradient: [colors.primary, colors.primaryDark], light: colors.primaryLight },
  };
  return schemes[category] || schemes.default;
};

export function ProgramScreen({ navigation }: ProgramScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'all'>('all');
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  // Calculate week dates
  const weekDates = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push(day);
    }

    return days;
  }, [weekOffset]);

  // Format week range
  const weekRangeText = useMemo(() => {
    const startDay = weekDates[0].getDate();
    const endDay = weekDates[6].getDate();
    const startMonth = MONTHS[weekDates[0].getMonth()];
    const endMonth = MONTHS[weekDates[6].getMonth()];

    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${startMonth}`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }, [weekDates]);

  // Check if a day is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Filter activities
  const filteredActivities = useMemo(() => {
    return mockProgramActivities
      .filter((activity) => {
        const activityDate = new Date(activity.date);
        const inWeek = activityDate >= weekDates[0] && activityDate <= weekDates[6];
        const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
        const matchesDay = selectedDayIndex === null ||
          activityDate.toDateString() === weekDates[selectedDayIndex].toDateString();
        return inWeek && matchesCategory && matchesDay;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedCategory, weekDates, selectedDayIndex]);

  // Group activities by date
  const groupedActivities = useMemo(() => {
    const groups: Record<string, ProgramActivity[]> = {};
    filteredActivities.forEach((activity) => {
      const dateKey = new Date(activity.date).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });
    return groups;
  }, [filteredActivities]);

  const handleActivityPress = (activity: ProgramActivity) => {
    navigation.navigate('ProgramDetail', { activity });
  };

  const formatTime = (start: string, end?: string) => {
    if (end) {
      return `${start} - ${end}`;
    }
    return start;
  };

  const getDayInfo = (date: Date) => {
    const dayIndex = date.getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    return {
      short: DAYS_SHORT[adjustedIndex],
      full: DAYS_FULL[adjustedIndex],
      number: date.getDate(),
    };
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Programme</Text>
          <Text style={styles.headerSubtitle}>{filteredActivities.length} activites</Text>
        </View>
        <TouchableOpacity style={styles.todayButton} onPress={() => setWeekOffset(0)}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.todayGradient}
          >
            <Text style={styles.todayText}>Aujourd'hui</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Week Selector with Calendar Strip */}
      <View style={styles.weekSection}>
        <View style={styles.weekHeader}>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)} style={styles.weekArrow}>
            <Ionicons name="chevron-back" size={20} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.weekInfo}>
            <Text style={styles.weekLabel}>
              {weekOffset === 0 ? 'CETTE SEMAINE' : weekOffset > 0 ? `+${weekOffset} SEMAINE${weekOffset > 1 ? 'S' : ''}` : `${weekOffset} SEMAINE${weekOffset < -1 ? 'S' : ''}`}
            </Text>
            <Text style={styles.weekRange}>{weekRangeText}</Text>
          </View>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)} style={styles.weekArrow}>
            <Ionicons name="chevron-forward" size={20} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Calendar Strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarStrip}
        >
          {weekDates.map((date, index) => {
            const dayInfo = getDayInfo(date);
            const today = isToday(date);
            const selected = selectedDayIndex === index;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  today && styles.calendarDayToday,
                  selected && styles.calendarDaySelected,
                ]}
                onPress={() => setSelectedDayIndex(selected ? null : index)}
              >
                <Text style={[
                  styles.calendarDayName,
                  (today || selected) && styles.calendarDayNameActive,
                ]}>
                  {dayInfo.short}
                </Text>
                <Text style={[
                  styles.calendarDayNumber,
                  (today || selected) && styles.calendarDayNumberActive,
                ]}>
                  {dayInfo.number}
                </Text>
                {today && <View style={styles.todayDot} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                selectedCategory === cat.key && { backgroundColor: cat.color },
              ]}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Ionicons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.key ? '#fff' : cat.color}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === cat.key ? '#fff' : colors.text.secondary },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Activities List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {Object.keys(groupedActivities).length > 0 ? (
          Object.entries(groupedActivities).map(([dateKey, activities]) => {
            const date = new Date(dateKey);
            const dayInfo = getDayInfo(date);
            const today = isToday(date);

            return (
              <View key={dateKey} style={styles.dayGroup}>
                {/* Day Header */}
                <View style={styles.dayHeader}>
                  <View style={[styles.dayBadge, today && styles.dayBadgeToday]}>
                    <Text style={[styles.dayBadgeText, today && styles.dayBadgeTextToday]}>
                      {today ? "Aujourd'hui" : `${dayInfo.full} ${dayInfo.number}`}
                    </Text>
                  </View>
                  <View style={styles.dayLine} />
                </View>

                {/* Activities */}
                {activities.map((activity, index) => {
                  const colorScheme = getActivityColorScheme(activity.category, index);

                  return (
                    <TouchableOpacity
                      key={activity.id}
                      style={styles.activityCard}
                      onPress={() => handleActivityPress(activity)}
                      activeOpacity={0.9}
                    >
                      {/* Time indicator */}
                      <View style={styles.timeColumn}>
                        <LinearGradient
                          colors={colorScheme.gradient}
                          style={styles.timeIndicator}
                        />
                        <Text style={styles.timeText}>{activity.startTime}</Text>
                        {activity.endTime && (
                          <Text style={styles.timeTextEnd}>{activity.endTime}</Text>
                        )}
                      </View>

                      {/* Card Content */}
                      <View style={styles.activityCardContent}>
                        {/* Badges */}
                        <View style={styles.badgesRow}>
                          <View style={[styles.categoryBadge, { backgroundColor: colorScheme.light }]}>
                            <Text style={[styles.categoryBadgeText, { color: colorScheme.gradient[0] }]}>
                              {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                            </Text>
                          </View>
                          {activity.isOnline && (
                            <View style={styles.onlineBadge}>
                              <Ionicons name="wifi" size={10} color="#059669" />
                              <Text style={styles.onlineBadgeText}>En ligne</Text>
                            </View>
                          )}
                          {activity.isImportant && (
                            <View style={styles.importantBadge}>
                              <Ionicons name="star" size={10} color="#fbbf24" />
                            </View>
                          )}
                        </View>

                        {/* Title */}
                        <Text style={styles.activityTitle} numberOfLines={2}>{activity.title}</Text>

                        {/* Meta */}
                        {activity.location && (
                          <View style={styles.locationRow}>
                            <Ionicons name="location" size={14} color={colors.text.secondary} />
                            <Text style={styles.locationText} numberOfLines={1}>{activity.location}</Text>
                          </View>
                        )}
                      </View>

                      {/* Arrow */}
                      <View style={styles.arrowWrap}>
                        <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="calendar-outline" size={40} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Aucune activite</Text>
            <Text style={styles.emptyText}>
              {selectedDayIndex !== null
                ? 'Aucune activite ce jour'
                : 'Aucune activite cette semaine'}
            </Text>
            {selectedDayIndex !== null && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => setSelectedDayIndex(null)}
              >
                <Text style={styles.emptyButtonText}>Voir toute la semaine</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* End of list */}
        {Object.keys(groupedActivities).length > 0 && (
          <View style={styles.endOfList}>
            <View style={styles.endOfListLine} />
            <Text style={styles.endOfListText}>Fin du programme</Text>
            <View style={styles.endOfListLine} />
          </View>
        )}
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  headerLeft: {},
  headerTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  todayButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  todayGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  todayText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  // Week Section
  weekSection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.xxl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  weekArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekInfo: {
    alignItems: 'center',
  },
  weekLabel: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.text.tertiary,
    letterSpacing: 1,
    marginBottom: 2,
  },
  weekRange: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  // Calendar Strip
  calendarStrip: {
    paddingHorizontal: spacing.xs,
  },
  calendarDay: {
    width: (width - spacing.xl * 2 - spacing.md * 2 - spacing.xs * 2) / 7,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  calendarDayToday: {
    backgroundColor: colors.primaryLight,
  },
  calendarDaySelected: {
    backgroundColor: colors.primary,
  },
  calendarDayName: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  calendarDayNameActive: {
    color: colors.primary,
  },
  calendarDayNumber: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  calendarDayNumberActive: {
    color: colors.primary,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  // Categories
  categoriesWrapper: {
    height: 52,
    marginBottom: spacing.md,
  },
  categories: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.md,
    alignItems: 'center',
    height: 52,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
  },
  // List
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  // Day Group
  dayGroup: {
    marginBottom: spacing.lg,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dayBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  dayBadgeToday: {
    backgroundColor: colors.primary,
  },
  dayBadgeText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.secondary,
  },
  dayBadgeTextToday: {
    color: '#fff',
  },
  dayLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md,
  },
  // Activity Card
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  timeColumn: {
    width: 64,
    alignItems: 'center',
    paddingVertical: spacing.md,
    position: 'relative',
  },
  timeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: borderRadius.xl,
    borderBottomLeftRadius: borderRadius.xl,
  },
  timeText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  timeTextEnd: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  activityCardContent: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingRight: spacing.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dcfce7',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  onlineBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: '#059669',
  },
  importantBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    flex: 1,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  arrowWrap: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxxl,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  emptyButtonText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  // End of list
  endOfList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  endOfListLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  endOfListText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    paddingHorizontal: spacing.md,
  },
});
