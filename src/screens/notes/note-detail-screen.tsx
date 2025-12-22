import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, NoteCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';
import { useNotes } from '../../hooks';
import { RichTextRenderer } from '../../components/notes';

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
  const initialNote = route.params.note;
  const { notes, deleteNote, toggleFavorite, refresh, loading } = useNotes();

  const note = notes.find(n => n.id === initialNote.id) || initialNote;
  const [isDeleting, setIsDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

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
    const plainContent = note.contentPlain || note.content;
    let message = `${note.title}\n\n${plainContent}`;
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
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteNote(note.id);
              navigation.goBack();
            } catch (error) {
              setIsDeleting(false);
              Alert.alert('Erreur', 'Impossible de supprimer la note');
            }
          },
        },
      ]
    );
  };

  const handleToggleFavorite = async () => {
    await toggleFavorite(note.id);
  };

  if (isDeleting) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Suppression...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
            onPress={handleToggleFavorite}
            activeOpacity={0.7}
          >
            <Ionicons
              name={note.isFavorite ? 'star' : 'star-outline'}
              size={22}
              color={note.isFavorite ? '#fbbf24' : colors.text.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate(SCREENS.NOTE_EDIT, { note })}
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
        <View style={[styles.categoryBadge, { backgroundColor: `${config.color}15` }]}>
          <Ionicons name={config.icon} size={14} color={config.color} />
          <Text style={[styles.categoryText, { color: config.color }]}>{config.label}</Text>
        </View>

        <Text style={styles.title}>{note.title}</Text>

        <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>

        {note.linkedVerseRef && (
          <View style={styles.verseRefCard}>
            <Ionicons name="book" size={20} color={colors.primary} />
            <Text style={styles.verseRefText}>{note.linkedVerseRef}</Text>
          </View>
        )}

        <View style={styles.contentCard}>
          <RichTextRenderer html={note.content} baseFontSize={fontSize.md} />
        </View>
      </ScrollView>

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
          onPress={() => navigation.navigate(SCREENS.NOTE_EDIT, { note })}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
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
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
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
