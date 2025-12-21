import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Hymn } from '../types';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface HymnCardProps {
  hymn: Hymn;
  onPress: () => void;
}

export function HymnCard({ hymn, onPress }: HymnCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{hymn.number}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {hymn.title}
        </Text>
        <Text style={styles.category}>{hymn.category}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  numberContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  number: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
