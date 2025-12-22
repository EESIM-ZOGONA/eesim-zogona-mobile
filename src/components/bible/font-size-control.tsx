import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

export interface FontSizeControlProps {
  visible: boolean;
  currentSize: number;
  canIncrease: boolean;
  canDecrease: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onClose: () => void;
}

function FontSizeControlComponent({
  visible,
  currentSize,
  canIncrease,
  canDecrease,
  onIncrease,
  onDecrease,
  onClose,
}: FontSizeControlProps) {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(100)}
      style={styles.container}
    >
      <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
        <Ionicons name="close" size={18} color={colors.text.tertiary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.sizeButton, !canIncrease && styles.sizeButtonDisabled]}
        onPress={onIncrease}
        disabled={!canIncrease}
        activeOpacity={0.7}
      >
        <Ionicons
          name="add"
          size={22}
          color={canIncrease ? colors.primary : colors.text.tertiary}
        />
      </TouchableOpacity>

      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>{currentSize}</Text>
      </View>

      <TouchableOpacity
        style={[styles.sizeButton, !canDecrease && styles.sizeButtonDisabled]}
        onPress={onDecrease}
        disabled={!canDecrease}
        activeOpacity={0.7}
      >
        <Ionicons
          name="remove"
          size={22}
          color={canDecrease ? colors.primary : colors.text.tertiary}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

export const FontSizeControl = memo(FontSizeControlComponent);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: spacing.lg,
    top: 120,
    backgroundColor: '#fff',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 20,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  sizeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonDisabled: {
    opacity: 0.4,
  },
  indicator: {
    paddingVertical: spacing.xs,
  },
  indicatorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
});
