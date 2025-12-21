import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeeklyProgramActivity } from '../types';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface ProgramItemProps {
  activity: WeeklyProgramActivity;
  isLast?: boolean;
}

export function ProgramItem({ activity, isLast }: ProgramItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.timelineContainer}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.content}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <Text style={styles.time}>{activity.time}</Text>
        </View>
        <Text style={styles.title}>{activity.title}</Text>
        {activity.description && (
          <Text style={styles.description}>{activity.description}</Text>
        )}
        {activity.location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={colors.text.tertiary} />
            <Text style={styles.location}>{activity.location}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  time: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  location: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
});
