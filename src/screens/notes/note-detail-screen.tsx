import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, NoteCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface NoteDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NoteDetail'>;
  route: RouteProp<RootStackParamList, 'NoteDetail'>;
}

const categoryConfig: Record<NoteCategory, { label: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  meditation: { label: 'Méditation', icon: 'heart', color: colors.primary },
  predication: { label: 'Prédication', icon: 'mic', color: '#d97706' },
  etude: { label: 'Étude', icon: 'book', color: '#059669' },
  priere: { label: 'Prière', icon: 'hand-right', color: '#7c3aed' },
  personnel: { label: 'Personnel', icon: 'person', color: '#dc2626' },
};

export function NoteDetailScreen({ navigation, route }: NoteDetailScreenProps) {
  const { note } = route.params;
  const [isFavorite, setIsFavorite] = useState(note.isFavorite || false);

  const config = categoryConfig[note.category];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShare = async () => {
    let message = `${note.title}\n\n${note.content}`;
    if (note.linkedVerseRef) {
      message += `\n\n📖 ${note.linkedVerseRef}`;
    }
    await Share.share({ message });
  };

  const handleDelete = () => {
    Alert.alert(
      'Supprimer la note',
      'Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete
            navigation.goBack();
          },
        },
      ]
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Persist favorite state
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleFavorite}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite ? 'star' : 'star-outline'}
              size={22}
              color={isFavorite ? '#fbbf24' : colors.text.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('NoteEdit', { note })}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={22} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={22} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Badge */}
        <View style={[styles.categoryBadge, { backgroundColor: `${config.color}15` }]}>
          <Ionicons name={config.icon} size={14} color={config.color} />
          <Text style={[styles.categoryText, { color: config.color }]}>{config.label}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{note.title}</Text>

        {/* Date */}
        <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>

        {/* Linked Verse */}
        {note.linkedVerseRef && (
          <View style={styles.verseRefCard}>
            <Ionicons name="book" size={20} color={colors.primary} />
            <Text style={styles.verseRefText}>{note.linkedVerseRef}</Text>
          </View>
        )}

        {/* Content */}
        <View style={styles.contentCard}>
          <Text style={styles.content}>{note.content}</Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Ionicons name="share-outline" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Partager</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonPrimary]}
          onPress={() => navigation.navigate('NoteEdit', { note })}
          activeOpacity={0.8}
        >
          <Ionicons name="create" size={20} color="#fff" />
          <Text style={styles.actionButtonTextPrimary}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  // Category
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
  },
  // Title
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  // Date
  date: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  // Verse Reference
  verseRefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  verseRefText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Content
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  content: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 28,
  },
  // Bottom Bar
  bottomBar: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  actionButtonTextPrimary: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
