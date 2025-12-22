import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, Note, NoteCategory } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface NotesScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notes'>;
}

// Mock notes data
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Réflexion sur Jean 3:16',
    content: 'Ce verset nous rappelle l\'amour infini de Dieu pour l\'humanité...',
    category: 'meditation',
    createdAt: '2024-12-22T10:00:00Z',
    updatedAt: '2024-12-22T10:00:00Z',
    linkedVerseRef: 'Jean 3:16',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Prédication du dimanche',
    content: 'Points clés de la prédication du Pasteur sur la foi...',
    category: 'predication',
    createdAt: '2024-12-21T09:00:00Z',
    updatedAt: '2024-12-21T09:00:00Z',
  },
  {
    id: '3',
    title: 'Étude: Les fruits de l\'Esprit',
    content: 'Galates 5:22-23 nous enseigne les neuf fruits de l\'Esprit...',
    category: 'etude',
    createdAt: '2024-12-20T14:00:00Z',
    updatedAt: '2024-12-20T14:00:00Z',
    linkedVerseRef: 'Galates 5:22-23',
  },
  {
    id: '4',
    title: 'Sujets de prière',
    content: '1. La famille\n2. L\'église\n3. Les malades...',
    category: 'priere',
    createdAt: '2024-12-19T08:00:00Z',
    updatedAt: '2024-12-19T08:00:00Z',
    isFavorite: true,
  },
  {
    id: '5',
    title: 'Pensées personnelles',
    content: 'Aujourd\'hui, j\'ai ressenti la présence de Dieu de manière particulière...',
    category: 'personnel',
    createdAt: '2024-12-18T20:00:00Z',
    updatedAt: '2024-12-18T20:00:00Z',
  },
];

const categoryConfig: Record<NoteCategory, { label: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  meditation: { label: 'Méditation', icon: 'heart', color: colors.primary },
  predication: { label: 'Prédication', icon: 'mic', color: '#d97706' },
  etude: { label: 'Étude', icon: 'book', color: '#059669' },
  priere: { label: 'Prière', icon: 'hand-right', color: '#7c3aed' },
  personnel: { label: 'Personnel', icon: 'person', color: '#dc2626' },
};

const categories: { key: NoteCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'meditation', label: 'Méditation' },
  { key: 'predication', label: 'Prédication' },
  { key: 'etude', label: 'Étude' },
  { key: 'priere', label: 'Prière' },
  { key: 'personnel', label: 'Personnel' },
];

export function NotesScreen({ navigation }: NotesScreenProps) {
  const [notes] = useState<Note[]>(mockNotes);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSearchChange = useCallback((text: string) => {
    setSearchInput(text);
    debouncedSearch(text);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearchQuery('');
  }, []);

  // Filtrer les notes
  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Supprimer la note',
      'Êtes-vous sûr de vouloir supprimer cette note ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => {
          // TODO: Implement delete
        }},
      ]
    );
  };

  const renderNoteCard = ({ item: note }: { item: Note }) => {
    const config = categoryConfig[note.category];

    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate('NoteDetail', { note })}
        activeOpacity={0.8}
      >
        <View style={styles.noteHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: `${config.color}15` }]}>
            <Ionicons name={config.icon} size={12} color={config.color} />
            <Text style={[styles.categoryText, { color: config.color }]}>{config.label}</Text>
          </View>
          {note.isFavorite && (
            <Ionicons name="star" size={16} color="#fbbf24" />
          )}
        </View>
        <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
        <Text style={styles.noteContent} numberOfLines={2}>{note.content}</Text>
        <View style={styles.noteFooter}>
          <Text style={styles.noteDate}>{formatDate(note.updatedAt)}</Text>
          {note.linkedVerseRef && (
            <View style={styles.verseRefBadge}>
              <Ionicons name="book-outline" size={12} color={colors.primary} />
              <Text style={styles.verseRefText}>{note.linkedVerseRef}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mes Notes</Text>
          <Text style={styles.headerSubtitle}>{notes.length} notes</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NoteEdit', {})}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotes}
        renderItem={renderNoteCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            {/* Stats Card */}
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsCard}
            >
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{notes.length}</Text>
                  <Text style={styles.statLabel}>Notes</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{notes.filter(n => n.isFavorite).length}</Text>
                  <Text style={styles.statLabel}>Favoris</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{notes.filter(n => n.linkedVerseRef).length}</Text>
                  <Text style={styles.statLabel}>Avec versets</Text>
                </View>
              </View>
              <View style={styles.cardAccent} />
            </LinearGradient>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrap}>
                <Ionicons name="search" size={20} color={colors.text.secondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Rechercher une note..."
                  placeholderTextColor={colors.text.tertiary}
                  value={searchInput}
                  onChangeText={handleSearchChange}
                  autoCorrect={false}
                  returnKeyType="search"
                />
                {searchInput.length > 0 && (
                  <TouchableOpacity onPress={clearSearch}>
                    <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Category Chips */}
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.categoriesContainer}
              renderItem={({ item: cat }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    selectedCategory === cat.key && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.key)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === cat.key && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleWrap}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionTitle}>
                  {searchQuery ? 'Résultats' : 'Toutes les notes'}
                </Text>
              </View>
              <Text style={styles.noteCount}>{filteredNotes.length}</Text>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={colors.text.tertiary} />
            <Text style={styles.emptyTitle}>Aucune note</Text>
            <Text style={styles.emptyText}>
              Commencez à prendre des notes pour enrichir votre vie spirituelle
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('NoteEdit', {})}
              activeOpacity={0.8}
            >
              <Text style={styles.emptyButtonText}>Créer une note</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Stats Card
  statsCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  statLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 30 }, { translateY: 30 }],
  },
  // Search
  searchContainer: {
    marginBottom: spacing.md,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  // Categories
  categoriesContainer: {
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  noteCount: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  // Note Card
  noteCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
  },
  noteTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  noteContent: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  noteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteDate: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
  },
  verseRefBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verseRefText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  emptyButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
