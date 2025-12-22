import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, BibleBook } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';
import {
  initBibleDatabase,
  getAllBooks,
  getBooksByTestament as getBooksByTestamentDB,
  getDailyVerse as getDailyVerseDB,
  BIBLE_BOOKS,
  BibleSearchResult,
  BIBLE_VERSIONS,
  BibleVersionCode,
  getCurrentVersion,
  setCurrentVersion,
  getCurrentVersionInfo,
} from '../../services/bible-database';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.md) / 2;

interface BibleScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Bible'>;
}

export function BibleScreen({ navigation }: BibleScreenProps) {
  const [activeTestament, setActiveTestament] = useState<'old' | 'new'>('old');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyVerse, setDailyVerse] = useState<BibleSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allBooks, setAllBooks] = useState<BibleBook[]>([]);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<BibleVersionCode>('LSG');

  useEffect(() => {
    async function init() {
      try {
        await initBibleDatabase();
        const currentVer = getCurrentVersion();
        setSelectedVersion(currentVer);
        const [books, verse] = await Promise.all([
          getAllBooks(),
          getDailyVerseDB(),
        ]);
        setAllBooks(books);
        setDailyVerse(verse);
      } catch (error) {
        console.error('Error initializing Bible:', error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const handleVersionChange = async (version: BibleVersionCode) => {
    setSelectedVersion(version);
    await setCurrentVersion(version);
    setShowVersionModal(false);
    const verse = await getDailyVerseDB();
    setDailyVerse(verse);
  };

  const currentVersionInfo = useMemo(() => {
    return BIBLE_VERSIONS.find(v => v.code === selectedVersion) || BIBLE_VERSIONS[0];
  }, [selectedVersion]);

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

  // Filtrer les livres
  const filteredBooks = useMemo(() => {
    if (searchQuery) {
      return allBooks.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.abbrev.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return allBooks.filter(book => book.testament === activeTestament);
  }, [searchQuery, activeTestament, allBooks]);

  // Quick access books
  const quickAccessBooks = useMemo(() => {
    return [
      allBooks.find(b => b.abbrev === 'Gen'),
      allBooks.find(b => b.abbrev === 'Ps'),
      allBooks.find(b => b.abbrev === 'Prov'),
      allBooks.find(b => b.abbrev === 'Matt'),
      allBooks.find(b => b.abbrev === 'Jean'),
      allBooks.find(b => b.abbrev === 'Rom'),
    ].filter(Boolean) as BibleBook[];
  }, [allBooks]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement de la Bible...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderBookCard = ({ item: book, index }: { item: BibleBook; index: number }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => navigation.navigate(SCREENS.BIBLE_BOOK, { book })}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bookCardGradient}
      >
        <View style={styles.bookCardContent}>
          <Text style={styles.bookAbbrev}>{book.abbrev}</Text>
          <Text style={styles.bookName} numberOfLines={2}>{book.name}</Text>
          <Text style={styles.bookChapters}>{book.chapters} chap.</Text>
        </View>
        <View style={styles.bookCardAccent} />
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderBookListItem = ({ item: book }: { item: BibleBook }) => (
    <TouchableOpacity
      style={styles.bookListItem}
      onPress={() => navigation.navigate(SCREENS.BIBLE_BOOK, { book })}
      activeOpacity={0.8}
    >
      <View style={styles.bookListAbbrev}>
        <Text style={styles.bookListAbbrevText}>{book.abbrev}</Text>
      </View>
      <View style={styles.bookListInfo}>
        <Text style={styles.bookListName}>{book.name}</Text>
        <Text style={styles.bookListChapters}>{book.chapters} chapitres</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    </TouchableOpacity>
  );

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
        <TouchableOpacity
          style={styles.headerCenter}
          onPress={() => setShowVersionModal(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.headerTitle}>La Bible</Text>
          <View style={styles.versionSelector}>
            <Text style={styles.headerSubtitle}>{currentVersionInfo.name}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          activeOpacity={0.7}
        >
          <Ionicons name="bookmark-outline" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookListItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            {/* Daily Verse Hero */}
            {dailyVerse && (
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  navigation.navigate(SCREENS.BIBLE_CHAPTER, {
                    bookId: dailyVerse.bookId,
                    bookName: dailyVerse.bookName,
                    chapter: dailyVerse.chapter,
                  });
                }}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.dailyVerseCard}
                >
                  <View style={styles.dailyVerseBadge}>
                    <Ionicons name="sunny" size={14} color="#fbbf24" />
                    <Text style={styles.dailyVerseBadgeText}>VERSET DU JOUR</Text>
                  </View>
                  <Text style={styles.dailyVerseText}>"{dailyVerse.text}"</Text>
                  <View style={styles.dailyVerseFooter}>
                    <Text style={styles.dailyVerseRef}>
                      {dailyVerse.bookName} {dailyVerse.chapter}:{dailyVerse.verse}
                    </Text>
                    <View style={styles.dailyVerseAction}>
                      <Text style={styles.dailyVerseActionText}>Lire</Text>
                      <Ionicons name="arrow-forward" size={14} color="#fff" />
                    </View>
                  </View>
                  <View style={styles.cardAccent} />
                </LinearGradient>
              </TouchableOpacity>
            )}

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrap}>
                <Ionicons name="search" size={20} color={colors.text.tertiary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Rechercher un livre..."
                  placeholderTextColor={colors.text.tertiary}
                  value={searchInput}
                  onChangeText={handleSearchChange}
                  autoCorrect={false}
                  returnKeyType="search"
                />
                {searchInput.length > 0 && (
                  <TouchableOpacity onPress={clearSearch}>
                    <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Quick Access */}
            {!searchQuery && (
              <>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleWrap}>
                    <View style={styles.sectionDot} />
                    <Text style={styles.sectionTitle}>Accès rapide</Text>
                  </View>
                </View>

                <FlatList
                  horizontal
                  data={quickAccessBooks}
                  renderItem={renderBookCard}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.quickAccessList}
                  style={styles.quickAccessScroll}
                />
              </>
            )}

            {/* Testament Tabs */}
            {!searchQuery && (
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  style={[styles.tab, activeTestament === 'old' && styles.tabActive]}
                  onPress={() => setActiveTestament('old')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, activeTestament === 'old' && styles.tabTextActive]}>
                    Ancien Testament
                  </Text>
                  <Text style={[styles.tabCount, activeTestament === 'old' && styles.tabCountActive]}>
                    39
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeTestament === 'new' && styles.tabActive]}
                  onPress={() => setActiveTestament('new')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, activeTestament === 'new' && styles.tabTextActive]}>
                    Nouveau Testament
                  </Text>
                  <Text style={[styles.tabCount, activeTestament === 'new' && styles.tabCountActive]}>
                    27
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleWrap}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionTitle}>
                  {searchQuery ? 'Résultats' : activeTestament === 'old' ? 'Ancien Testament' : 'Nouveau Testament'}
                </Text>
              </View>
              <Text style={styles.bookCount}>{filteredBooks.length} livres</Text>
            </View>
          </>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={showVersionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVersionModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowVersionModal(false)}
        >
          <View style={styles.versionModalContent}>
            <View style={styles.versionModalHeader}>
              <Text style={styles.versionModalTitle}>Version de la Bible</Text>
              <TouchableOpacity onPress={() => setShowVersionModal(false)}>
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            {BIBLE_VERSIONS.map((version) => (
              <TouchableOpacity
                key={version.code}
                style={[
                  styles.versionOption,
                  selectedVersion === version.code && styles.versionOptionActive,
                ]}
                onPress={() => handleVersionChange(version.code)}
                activeOpacity={0.7}
              >
                <View style={styles.versionOptionInfo}>
                  <Text style={[
                    styles.versionOptionName,
                    selectedVersion === version.code && styles.versionOptionNameActive,
                  ]}>
                    {version.name}
                  </Text>
                  <Text style={styles.versionOptionCode}>{version.shortName}</Text>
                </View>
                {selectedVersion === version.code && (
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Daily Verse Hero
  dailyVerseCard: {
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  dailyVerseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  dailyVerseBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 0.5,
  },
  dailyVerseText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.medium,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: spacing.lg,
  },
  dailyVerseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dailyVerseRef: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.9)',
  },
  dailyVerseAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  dailyVerseActionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  cardAccent: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  // Search
  searchContainer: {
    marginBottom: spacing.lg,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
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
  // Quick Access
  quickAccessScroll: {
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.lg,
  },
  quickAccessList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  bookCard: {
    width: 120,
    height: 140,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  bookCardGradient: {
    flex: 1,
    padding: spacing.md,
    position: 'relative',
  },
  bookCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookAbbrev: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  bookName: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
    marginTop: spacing.xs,
  },
  bookChapters: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
  },
  bookCardAccent: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: '#fff',
    fontFamily: fontFamily.semibold,
  },
  tabCount: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.text.tertiary,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tabCountActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
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
  bookCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  // Book List Item
  bookListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  bookListAbbrev: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  bookListAbbrevText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  bookListInfo: {
    flex: 1,
  },
  bookListName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  bookListChapters: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
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
  versionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  versionModalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  versionModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  versionModalTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  versionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  versionOptionActive: {
    backgroundColor: colors.primaryLight,
  },
  versionOptionInfo: {
    flex: 1,
  },
  versionOptionName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  versionOptionNameActive: {
    color: colors.primary,
  },
  versionOptionCode: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});
