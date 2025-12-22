import React, { memo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useReadingTime } from '../../hooks';
import { BibleVerse } from '../../types';

export interface ReadingTimeBadgeProps {
  verses?: BibleVerse[];
  verseCount?: number;
  visible?: boolean;
  style?: ViewStyle;
}

function ReadingTimeBadgeComponent({
  verses,
  verseCount,
  visible = true,
  style,
}: ReadingTimeBadgeProps) {
  const { formatted } = useReadingTime({ verses, verseCount });

  if (!visible) return null;
  if (!verses?.length && !verseCount) return null;

  return (
    <View style={[styles.badge, style]}>
      <Ionicons name="time-outline" size={14} color={colors.primary} />
      <Text style={styles.text}>{formatted}</Text>
    </View>
  );
}

export const ReadingTimeBadge = memo(ReadingTimeBadgeComponent);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 80,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
});
