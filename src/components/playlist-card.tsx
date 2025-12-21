import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Playlist } from '../types';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface PlaylistCardProps {
  playlist: Playlist;
  onPress: () => void;
}

export function PlaylistCard({ playlist, onPress }: PlaylistCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: playlist.thumbnailUrl }}
          style={styles.thumbnail}
        />
        <View style={styles.countBadge}>
          <Ionicons name="list" size={12} color={colors.text.inverse} />
          <Text style={styles.countText}>{playlist.videoCount}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {playlist.title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {playlist.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  thumbnailContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  countBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  countText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.text.inverse,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
});
