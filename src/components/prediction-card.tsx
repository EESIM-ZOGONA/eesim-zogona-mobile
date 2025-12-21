import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Prediction } from '../types';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface PredictionCardProps {
  prediction: Prediction;
  onPress: () => void;
}

export function PredictionCard({ prediction, onPress }: PredictionCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {prediction.imageUrl && (
        <Image
          source={{ uri: prediction.imageUrl }}
          style={styles.image}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {prediction.title}
        </Text>
        <Text style={styles.excerpt} numberOfLines={3}>
          {prediction.content}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.author}>{prediction.author}</Text>
          <Text style={styles.date}>{prediction.date}</Text>
        </View>
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
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  excerpt: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
  },
});
