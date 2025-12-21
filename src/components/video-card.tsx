import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from '../types';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface VideoCardProps {
  video: Video;
  onPress: () => void;
  variant?: 'horizontal' | 'vertical' | 'compact';
}

const { width } = Dimensions.get('window');

export function VideoCard({ video, onPress, variant = 'vertical' }: VideoCardProps) {
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.compactThumbnailContainer}>
          <Image
            source={{ uri: video.thumbnailUrl }}
            style={styles.compactThumbnail}
          />
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>
        </View>
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.compactMeta}>
            {formatViews(video.views)} vues
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'horizontal') {
    return (
      <TouchableOpacity
        style={styles.horizontalContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.horizontalThumbnailContainer}>
          <Image
            source={{ uri: video.thumbnailUrl }}
            style={styles.horizontalThumbnail}
          />
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={20} color={colors.text.inverse} />
          </View>
        </View>
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="eye-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.statText}>{formatViews(video.views)}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="heart-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.statText}>{formatViews(video.likes)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.verticalContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: video.thumbnailUrl }}
          style={styles.thumbnail}
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        <View style={styles.playButtonLarge}>
          <Ionicons name="play" size={32} color={colors.text.inverse} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={14} color={colors.text.secondary} />
            <Text style={styles.statText}>{formatViews(video.views)} vues</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart-outline" size={14} color={colors.text.secondary} />
            <Text style={styles.statText}>{formatViews(video.likes)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  verticalContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  thumbnailContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  durationText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.text.inverse,
  },
  playButtonLarge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -28 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(3,10,127,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(3,10,127,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  horizontalThumbnailContainer: {
    width: 160,
    height: 100,
    position: 'relative',
  },
  horizontalThumbnail: {
    width: '100%',
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  compactContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    padding: spacing.sm,
  },
  compactThumbnailContainer: {
    width: 100,
    height: 60,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  compactThumbnail: {
    width: '100%',
    height: '100%',
  },
  compactContent: {
    flex: 1,
    paddingLeft: spacing.md,
    justifyContent: 'center',
  },
  compactTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  compactMeta: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
  },
});
