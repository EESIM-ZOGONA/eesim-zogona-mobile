import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, VerseHighlight, VerseBookmark, HighlightColor, BibleBook } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { getHighlights, getBookmarks } from '../../services/bible-storage';
import { useNotes, useReadingPlans } from '../../hooks';
import { BIBLE_BOOKS } from '../../services/bible-database';

interface MyLibraryScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyLibrary'>;
}

type LibraryTab = 'verses' | 'notes' | 'plans';

interface GroupedVerses {
  bookId: string;
  bookName: string;
  totalVerses: number;
  chapters: {
    chapter: number;
    verses: (VerseHighlight | VerseBookmark)[];
  }[];
}

const HIGHLIGHT_BG_COLORS: Record<HighlightColor, string> = {
  yellow: '#fef9c3',
  green: '#dcfce7',
  red: '#fee2e2',
  pink: '#fce7f3',
  violet: '#ede9fe',
};

const HIGHLIGHT_TEXT_COLORS: Record<HighlightColor, string> = {
  yellow: '#a16207',
  green: '#15803d',
  red: '#dc2626',
  pink: '#db2777',
  violet: '#7c3aed',
};

export function MyLibraryScreen({ navigation }: MyLibraryScreenProps) {
  const [activeTab, setActiveTab] = useState<LibraryTab>('verses');
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);
  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());

  const { notes, loading: loadingNotes } = useNotes();
  const { activePlans, loading: loadingPlans, getPlanById } = useReadingPlans();

  useEffect(() => {
    loadVerseData();
  }, []);

  const loadVerseData = async () => {
    try {
      setLoading(true);
      const [h, b] = await Promise.all([getHighlights(), getBookmarks()]);
      setHighlights(h);
      setBookmarks(b);
    } catch (error) {
      console.error('Error loading verse data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVerseData();
    setRefreshing(false);
  };

  const toggleBookExpanded = (bookId: string) => {
    setExpandedBooks(prev => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      return next;
    });
  };

  // Group all verses (highlights + bookmarks) by book and chapter
  const groupedVerses = useMemo(() => {
    const allVerses: (VerseHighlight | VerseBookmark)[] = [
      ...highlights,
      ...bookmarks.map(b => ({ ...b, color: undefined as unknown as HighlightColor })),
    ];

    // Remove duplicates (same book, chapter, verse)
    const uniqueVerses = allVerses.filter((verse, index, self) =>
      index === self.findIndex(v =>
        v.bookId === verse.bookId && v.chapter === verse.chapter && v.verse === verse.verse
      )
    );

    const bookMap = new Map<string, Map<number, (VerseHighlight | VerseBookmark)[]>>();

    uniqueVerses.forEach(verse => {
      if (!bookMap.has(verse.bookId)) {
        bookMap.set(verse.bookId, new Map());
      }
      const chapterMap = bookMap.get(verse.bookId)!;
      if (!chapterMap.has(verse.chapter)) {
        chapterMap.set(verse.chapter, []);
      }
      chapterMap.get(verse.chapter)!.push(verse);
    });

    const result: GroupedVerses[] = [];
    const bookOrder = BIBLE_BOOKS.map((b: BibleBook) => b.id);
    const sortedBookIds = Array.from(bookMap.keys()).sort(
      (a: string, b: string) => bookOrder.indexOf(a) - bookOrder.indexOf(b)
    );

    sortedBookIds.forEach(bookId => {
      const book = BIBLE_BOOKS.find((b: BibleBook) => b.id === bookId);
      if (!book) return;

      const chapterMap = bookMap.get(bookId)!;
      const chapters = Array.from(chapterMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([chapter, verses]) => ({
          chapter,
          verses: verses.sort((a, b) => a.verse - b.verse),
        }));

      const totalVerses = chapters.reduce((sum, c) => sum + c.verses.length, 0);

      result.push({
        bookId,
        bookName: book.name,
        totalVerses,
        chapters,
      });
    });

    return result;
  }, [highlights, bookmarks]);

  const totalVerses = highlights.length + bookmarks.length;

  const renderVerseChip = (verse: VerseHighlight | VerseBookmark, bookId: string, bookName: string) => {
    const hasColor = 'color' in verse && verse.color;
    const bgColor = hasColor ? HIGHLIGHT_BG_COLORS[verse.color as HighlightColor] : colors.primaryLight;
    const textColor = hasColor ? HIGHLIGHT_TEXT_COLORS[verse.color as HighlightColor] : colors.primary;

    return (
      <TouchableOpacity
        key={verse.id}
        style={[styles.verseChip, { backgroundColor: bgColor }]}
        onPress={() => navigation.navigate('BibleChapter', {
          bookId,
          bookName,
          chapter: verse.chapter,
          scrollToVerse: verse.verse,
        })}
        activeOpacity={0.7}
      >
        <Text style={[styles.verseChipText, { color: textColor }]}>{verse.verse}</Text>
      </TouchableOpacity>
    );
  };

  const renderBookCard = ({ item }: { item: GroupedVerses }) => {
    const isExpanded = expandedBooks.has(item.bookId);

    return (
      <View style={styles.bookCard}>
        <TouchableOpacity
          style={styles.bookHeader}
          onPress={() => toggleBookExpanded(item.bookId)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.bookIcon}
          >
            <Ionicons name="book" size={16} color="#fff" />
          </LinearGradient>
          <View style={styles.bookInfo}>
            <Text style={styles.bookName}>{item.bookName}</Text>
            <Text style={styles.bookMeta}>
              {item.totalVerses} verset{item.totalVerses > 1 ? 's' : ''} • {item.chapters.length} chapitre{item.chapters.length > 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.text.tertiary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.chaptersContainer}>
            {item.chapters.map(chapterData => (
              <View key={chapterData.chapter} style={styles.chapterSection}>
                <TouchableOpacity
                  style={styles.chapterHeader}
                  onPress={() => navigation.navigate('BibleChapter', {
                    bookId: item.bookId,
                    bookName: item.bookName,
                    chapter: chapterData.chapter,
                  })}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chapterTitle}>Chapitre {chapterData.chapter}</Text>
                  <Ionicons name="open-outline" size={14} color={colors.primary} />
                </TouchableOpacity>
                <View style={styles.versesGrid}>
                  {chapterData.verses.map(verse =>
                    renderVerseChip(verse, item.bookId, item.bookName)
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderNoteCard = ({ item }: { item: typeof notes[0] }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteDetail', { note: item })}
      activeOpacity={0.9}
    >
      <View style={styles.noteCardHeader}>
        <View style={styles.noteCategoryBadge}>
          <Ionicons name="document-text" size={12} color={colors.primary} />
          <Text style={styles.noteCategoryText}>{item.category}</Text>
        </View>
        {item.isFavorite && (
          <Ionicons name="heart" size={16} color="#ef4444" />
        )}
      </View>
      <Text style={styles.noteTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.notePreview} numberOfLines={2}>{item.contentPlain}</Text>
      <View style={styles.noteFooter}>
        {item.linkedVerseRef && (
          <View style={styles.noteVerseRef}>
            <Ionicons name="bookmark" size={12} color={colors.primary} />
            <Text style={styles.noteVerseRefText}>{item.linkedVerseRef}</Text>
          </View>
        )}
        <Text style={styles.noteDate}>
          {new Date(item.updatedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderPlanCard = ({ item }: { item: typeof activePlans[0] }) => {
    const progress = item.totalDays > 0 ? (item.currentDay / item.totalDays) * 100 : 0;
    const plan = getPlanById(item.planId);

    const handlePress = () => {
      if (plan) {
        navigation.navigate('ReadingPlanDetail', { plan, userPlanId: item.id });
      }
    };

    return (
      <TouchableOpacity
        style={styles.planCard}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.planGradient}
        >
          <View style={styles.planHeader}>
            <View style={styles.planDayBadge}>
              <Text style={styles.planDayLabel}>JOUR</Text>
              <Text style={styles.planDayNumber}>{item.currentDay}</Text>
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.planMeta}>
                {item.currentDay} / {item.totalDays} jours
              </Text>
            </View>
            <View style={[
              styles.planStatusBadge,
              item.status === 'active' ? styles.planStatusActive : styles.planStatusPaused
            ]}>
              <Text style={styles.planStatusText}>
                {item.status === 'active' ? 'En cours' : 'Pause'}
              </Text>
            </View>
          </View>
          <View style={styles.planProgressContainer}>
            <View style={styles.planProgressBar}>
              <View style={[styles.planProgressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.planProgressText}>{Math.round(progress)}%</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const EmptyState = ({ type }: { type: LibraryTab }) => {
    const configs = {
      verses: {
        icon: 'book-outline' as const,
        title: 'Aucun verset sauvegarde',
        desc: 'Surlignez ou marquez des versets dans la Bible pour les retrouver ici',
        action: 'Ouvrir la Bible',
        onPress: () => navigation.navigate('Bible'),
      },
      notes: {
        icon: 'document-text-outline' as const,
        title: 'Aucune note',
        desc: 'Creez des notes pour capturer vos reflexions spirituelles',
        action: 'Creer une note',
        onPress: () => navigation.navigate('NoteEdit', {}),
      },
      plans: {
        icon: 'calendar-outline' as const,
        title: 'Aucun plan en cours',
        desc: 'Commencez un plan de lecture pour suivre votre progression',
        action: 'Voir les plans',
        onPress: () => navigation.navigate('ReadingPlans'),
      },
    };
    const config = configs[type];

    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name={config.icon} size={48} color={colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>{config.title}</Text>
        <Text style={styles.emptyDesc}>{config.desc}</Text>
        <TouchableOpacity style={styles.emptyAction} onPress={config.onPress} activeOpacity={0.9}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.emptyActionGradient}
          >
            <Text style={styles.emptyActionText}>{config.action}</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const tabs: { key: LibraryTab; label: string; icon: string; count: number }[] = [
    { key: 'verses', label: 'Versets', icon: 'book', count: totalVerses },
    { key: 'notes', label: 'Notes', icon: 'document-text', count: notes.length },
    { key: 'plans', label: 'Plans', icon: 'calendar', count: activePlans.length },
  ];

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
        <Text style={styles.headerTitle}>Ma Bibliotheque</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.tabIconWrap, isActive && styles.tabIconWrapActive]}>
                <Ionicons
                  name={tab.icon as any}
                  size={20}
                  color={isActive ? '#fff' : colors.text.secondary}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
              <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      {activeTab === 'verses' && (
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : groupedVerses.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.emptyScrollContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
            }
          >
            <EmptyState type="verses" />
          </ScrollView>
        ) : (
          <FlatList
            data={groupedVerses}
            renderItem={renderBookCard}
            keyExtractor={item => item.bookId}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
            }
          />
        )
      )}

      {activeTab === 'notes' && (
        loadingNotes ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : notes.length === 0 ? (
          <ScrollView contentContainerStyle={styles.emptyScrollContent}>
            <EmptyState type="notes" />
          </ScrollView>
        ) : (
          <FlatList
            data={notes}
            renderItem={renderNoteCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )
      )}

      {activeTab === 'plans' && (
        loadingPlans ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : activePlans.length === 0 ? (
          <ScrollView contentContainerStyle={styles.emptyScrollContent}>
            <EmptyState type="plans" />
          </ScrollView>
        ) : (
          <FlatList
            data={activePlans}
            renderItem={renderPlanCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header
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
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  tabIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  tabIconWrapActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabBadge: {
    minWidth: 24,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeActive: {
    backgroundColor: colors.primary,
  },
  tabBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.text.secondary,
  },
  tabBadgeTextActive: {
    color: '#fff',
  },
  // Loading & Empty
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyScrollContent: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyDesc: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  emptyAction: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  emptyActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  emptyActionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // List
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  // Book Card (Verses)
  bookCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  bookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  bookIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  bookMeta: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  chaptersContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chapterSection: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  chapterTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  versesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  verseChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    minWidth: 36,
    alignItems: 'center',
  },
  verseChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
  },
  // Note Card
  noteCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  noteCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  noteCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  noteCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  noteTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  notePreview: {
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
  noteVerseRef: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  noteVerseRefText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  noteDate: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  // Plan Card
  planCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  planGradient: {
    padding: spacing.lg,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  planDayBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  planDayLabel: {
    fontSize: 9,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  planDayNumber: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
    marginTop: -2,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: 2,
  },
  planMeta: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  planStatusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  planStatusActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  planStatusPaused: {
    backgroundColor: 'rgba(251,191,36,0.3)',
  },
  planStatusText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  planProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  planProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  planProgressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  planProgressText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
    minWidth: 40,
    textAlign: 'right',
  },
});
