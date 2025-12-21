import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuickAction as QuickActionType } from '../types';
import { colors, borderRadius, spacing, fontSize, fontFamily } from '../constants/theme';

interface QuickActionProps {
  action: QuickActionType;
  onPress: () => void;
}

export function QuickAction({ action, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={action.icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color={colors.primary}
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {action.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
