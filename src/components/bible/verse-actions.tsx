import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

export interface VerseActionsProps {
  visible: boolean;
  selectedCount: number;
  onShare: () => void;
  onAddNote: () => void;
  onHighlight: () => void;
  onBookmark: () => void;
  onCopy: () => void;
  onClear: () => void;
}

interface ActionButton {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
}

function VerseActionsComponent({
  visible,
  selectedCount,
  onShare,
  onAddNote,
  onHighlight,
  onBookmark,
  onCopy,
  onClear,
}: VerseActionsProps) {
  if (!visible) return null;

  const actions: ActionButton[] = [
    { icon: 'share-outline', onPress: onShare },
    { icon: 'create-outline', onPress: onAddNote },
    { icon: 'color-palette-outline', onPress: onHighlight },
    { icon: 'bookmark-outline', onPress: onBookmark },
    { icon: 'copy-outline', onPress: onCopy },
  ];

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(100)}
      style={styles.container}
    >
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{selectedCount}</Text>
      </View>

      <View style={styles.actionsRow}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.icon}
            style={styles.actionButton}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={action.icon}
              size={22}
              color={action.color || colors.primary}
            />
          </TouchableOpacity>
        ))}

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClear}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={20} color={colors.text.tertiary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

export const VerseActions = memo(VerseActionsComponent);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: '#fff',
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  countBadge: {
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  countText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
  },
  actionsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: spacing.xs,
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
  },
});
