import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle, DimensionValue } from 'react-native';
import { colors, borderRadius, spacing } from '../constants/theme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius: radius = borderRadius.md,
  style
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius: radius, opacity },
        style,
      ]}
    />
  );
}

// Skeleton pour une card vidéo
export function VideoCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <View style={[styles.videoCard, featured && styles.videoCardFeatured]}>
      <View style={styles.videoCardInner}>
        <Skeleton
          height={featured ? 140 : 95}
          borderRadius={borderRadius.lg}
        />
        <View style={styles.videoInfo}>
          <Skeleton height={14} width="95%" style={{ marginBottom: 6 }} />
          <Skeleton height={12} width="60%" />
        </View>
      </View>
    </View>
  );
}

// Skeleton pour une card programme
export function ProgramCardSkeleton() {
  return (
    <View style={styles.programCard}>
      <Skeleton width={48} height={48} borderRadius={borderRadius.lg} />
      <Skeleton height={16} width="80%" style={{ marginTop: spacing.sm }} />
      <Skeleton height={12} width="60%" style={{ marginTop: spacing.sm }} />
    </View>
  );
}

// Skeleton pour une card event
export function EventCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <View style={[styles.eventCard, featured && styles.eventCardFeatured]}>
      <Skeleton
        height={featured ? 200 : 160}
        borderRadius={borderRadius.xl}
      />
    </View>
  );
}

// Skeleton pour une card cantique
export function HymnCardSkeleton() {
  return (
    <View style={styles.hymnCard}>
      <Skeleton width={56} height={56} borderRadius={borderRadius.lg} />
      <Skeleton height={14} width="90%" style={{ marginTop: spacing.md }} />
      <Skeleton height={14} width="70%" style={{ marginTop: 4 }} />
      <View style={styles.hymnFooter}>
        <Skeleton width={60} height={20} borderRadius={borderRadius.full} />
        <Skeleton width={24} height={24} borderRadius={12} />
      </View>
    </View>
  );
}

// Skeleton pour le verset
export function VerseSkeleton() {
  return (
    <View style={styles.verseCard}>
      <Skeleton height={16} width={120} style={{ marginBottom: spacing.md }} />
      <Skeleton height={18} width="100%" style={{ marginBottom: 8 }} />
      <Skeleton height={18} width="95%" style={{ marginBottom: 8 }} />
      <Skeleton height={18} width="80%" style={{ marginBottom: spacing.lg }} />
      <Skeleton height={14} width={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e5e7eb',
  },
  videoCard: {
    width: '48%',
  },
  videoCardFeatured: {
    width: 260,
    marginRight: spacing.md,
  },
  videoCardInner: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  videoInfo: {
    padding: spacing.md,
  },
  programCard: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginRight: spacing.md,
  },
  eventCard: {
    width: 200,
    marginRight: spacing.md,
  },
  eventCardFeatured: {
    width: 280,
  },
  hymnCard: {
    width: 150,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginRight: spacing.md,
  },
  hymnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  verseCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
  },
});
