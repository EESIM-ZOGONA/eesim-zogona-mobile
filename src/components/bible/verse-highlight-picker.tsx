import React, { memo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { HighlightColor, HIGHLIGHT_COLORS, HIGHLIGHT_TEXT_COLORS } from '../../types';
import { colors, spacing, borderRadius, fontFamily, fontSize } from '../../constants/theme';

export interface VerseHighlightPickerProps {
  visible: boolean;
  recentColors: HighlightColor[];
  currentColor?: HighlightColor | null;
  onSelectColor: (color: HighlightColor) => void;
  onRemoveHighlight: () => void;
  onClose: () => void;
}

const ALL_COLORS: HighlightColor[] = ['yellow', 'green', 'red', 'pink', 'violet'];

const COLOR_NAMES: Record<HighlightColor, string> = {
  yellow: 'Jaune',
  green: 'Vert',
  red: 'Rouge',
  pink: 'Rose',
  violet: 'Violet',
};

function VerseHighlightPickerComponent({
  visible,
  recentColors,
  currentColor,
  onSelectColor,
  onRemoveHighlight,
  onClose,
}: VerseHighlightPickerProps) {
  const [showFullPicker, setShowFullPicker] = useState(false);

  if (!visible) return null;

  const sortedColors = [
    ...recentColors,
    ...ALL_COLORS.filter((c) => !recentColors.includes(c)),
  ];

  return (
    <>
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
                <Ionicons name="checkmark" size={18} color={HIGHLIGHT_TEXT_COLORS[color]} />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setShowFullPicker(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

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

      <Modal
        visible={showFullPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFullPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFullPicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir une couleur</Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setShowFullPicker(false)}
              >
                <Ionicons name="close" size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.colorGrid}>
              {ALL_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={styles.colorGridItem}
                  onPress={() => {
                    onSelectColor(color);
                    setShowFullPicker(false);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.colorGridCircle,
                      { backgroundColor: HIGHLIGHT_COLORS[color] },
                      currentColor === color && styles.colorGridCircleActive,
                    ]}
                  >
                    {currentColor === color && (
                      <Ionicons name="checkmark" size={24} color={HIGHLIGHT_TEXT_COLORS[color]} />
                    )}
                  </View>
                  <Text style={styles.colorGridLabel}>{COLOR_NAMES[color]}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.removeFullButton}
              onPress={() => {
                onRemoveHighlight();
                setShowFullPicker(false);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
              <Text style={styles.removeFullText}>Supprimer le surlignage</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
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
  moreButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.xxl,
    width: '100%',
    maxWidth: 320,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  colorGridItem: {
    alignItems: 'center',
    width: '30%',
  },
  colorGridCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorGridCircleActive: {
    borderColor: colors.primary,
  },
  colorGridLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  removeFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  removeFullText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.error,
  },
});
