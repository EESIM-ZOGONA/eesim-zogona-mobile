import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Event } from '../types';
import { colors, borderRadius, spacing, fontSize, fontWeight, fontFamily } from '../constants/theme';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  variant?: 'horizontal' | 'vertical';
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export function EventCard({ event, onPress, variant = 'horizontal' }: EventCardProps) {
  if (variant === 'vertical') {
    return (
      <TouchableOpacity
        style={styles.verticalCard}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: event.imageUrl || 'https://via.placeholder.com/400x200' }}
          style={styles.verticalImage}
        />
        <View style={styles.verticalContent}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.metaText}>{event.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.metaText}>{event.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.horizontalCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: event.imageUrl || 'https://via.placeholder.com/400x200' }}
        style={styles.horizontalImage}
      />
      <View style={styles.overlay} />
      <View style={styles.horizontalContent}>
        <Text style={styles.categoryLight}>{event.category.toUpperCase()}</Text>
        <Text style={styles.titleLight} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={styles.metaRowLight}>
          <Ionicons name="calendar-outline" size={14} color={colors.text.inverse} />
          <Text style={styles.metaTextLight}>{event.date} - {event.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  horizontalCard: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  horizontalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  categoryLight: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.text.inverse,
    opacity: 0.8,
    marginBottom: spacing.xs,
  },
  titleLight: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
  },
  metaRowLight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaTextLight: {
    fontSize: fontSize.sm,
    color: colors.text.inverse,
    opacity: 0.9,
  },
  verticalCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  verticalImage: {
    width: '100%',
    height: 150,
  },
  verticalContent: {
    padding: spacing.lg,
  },
  category: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
});
