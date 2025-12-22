import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { HighlightColor, HIGHLIGHT_COLORS } from '../../types';
import { colors, spacing, borderRadius } from '../../constants/theme';

export interface VerseHighlightPickerProps {
  visible: boolean;
  recentColors: HighlightColor[];
  currentColor?: HighlightColor | null;
  onSelectColor: (color: HighlightColor) => void;
  onRemoveHighlight: () => void;
  onClose: () => void;
}

const ALL_COLORS: HighlightColor[] = ['yellow', 'green', 'blue', 'pink', 'orange'];

function VerseHighlightPickerComponent({
  visible,
  recentColors,
  currentColor,
  onSelectColor,
  onRemoveHighlight,
  onClose,
}: VerseHighlightPickerProps) {
  if (!visible) return null;

  const sortedColors = [
    ...recentColors,
    ...ALL_COLORS.filter((c) => !recentColors.includes(c)),
  ];

  return (
    <Animated.View
      entering={SlideInDown.duration(150)}
      exiting={SlideOutDown.duration(100)}
      style={styles.container}
    >
      <View style={styles.colorsRow}>
        {sortedColors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: HIGHLIGHT_COLORS[color] },
              currentColor === color && styles.colorButtonActive,
            ]}
            onPress={() => {
              onSelectColor(color);
              onClose();
            }}
            activeOpacity={0.7}
          >
            {currentColor === color && (
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => {
            onRemoveHighlight();
            onClose();
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={18} color={colors.text.tertiary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

export const VerseHighlightPicker = memo(VerseHighlightPickerComponent);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: '#fff',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  colorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  colorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: colors.primary,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: spacing.xs,
  },
  removeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
  },
});
