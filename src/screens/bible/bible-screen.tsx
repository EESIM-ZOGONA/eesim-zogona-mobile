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
  Keyboard,
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
  getDailyVerse as getDailyVerseDB,
  searchVerses,
  BibleSearchResult,
  BIBLE_VERSIONS,
  BibleVersionCode,
  getCurrentVersion,
  setCurrentVersion,
} from '../../services/bible-database';
import { BibleVersionPicker, VerseSearchList } from '../../components/bible';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.md) / 2;

interface BibleScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Bible'>;
}

type SearchMode = 'books' | 'verses';

export function BibleScreen({ navigation }: BibleScreenProps) {
  const [activeTestament, setActiveTestament] = useState<'old' | 'new'>('old');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('books');
  const [verseResults, setVerseResults] = useState<BibleSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
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

  const performVerseSearch = useCallback(async (query: string) => {
    if (query.length < 3) {
      setVerseResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchVerses(query, 100);
      setVerseResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setVerseResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    if (searchMode === 'verses') {
      performVerseSearch(value);
    }
  }, 300);

  const handleSearchChange = useCallback((text: string) => {
    setSearchInput(text);
    debouncedSearch(text);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearchQuery('');
    setVerseResults([]);
    Keyboard.dismiss();
  }, []);

  const handleSearchModeChange = useCallback((mode: SearchMode) => {
    setSearchMode(mode);
    if (mode === 'verses' && searchQuery.length >= 3) {
      performVerseSearch(searchQuery);
    } else if (mode === 'books') {
      setVerseResults([]);
    }
  }, [searchQuery, performVerseSearch]);

  const handleVersePress = useCallback((result: BibleSearchResult) => {
    navigation.navigate(SCREENS.BIBLE_CHAPTER, {
      bookId: result.bookId,
      bookName: result.bookName,
      chapter: result.chapter,
      scrollToVerse: result.verse,
    });
  }, [navigation]);

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

  const isShowingVerseResults = searchMode === 'verses' && searchQuery.length >= 3;

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
      {/* Header amélioré */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.versionButton}
          onPress={() => setShowVersionModal(true)}
          activeOpacity={0.7}
        >
          <View style={styles.versionBadge}>
            <Text style={styles.versionCode}>{selectedVersion}</Text>
          </View>
          <Ionicons name="chevron-down" size={16} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookmarkButton}
          activeOpacity={0.7}
        >
          <Ionicons name="bookmark-outline" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar améliorée */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputWrap}>
          <Ionicons name="search" size={20} color={colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder={searchMode === 'books' ? "Rechercher un livre..." : "Rechercher dans les versets..."}
            placeholderTextColor={colors.text.tertiary}
            value={searchInput}
            onChangeText={handleSearchChange}
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchInput.length > 0 && (
            <TouchableOpacity onPress={clearSearch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Mode de recherche */}
        <View style={styles.searchModeContainer}>
          <TouchableOpacity
            style={[styles.searchModeBtn, searchMode === 'books' && styles.searchModeBtnActive]}
            onPress={() => handleSearchModeChange('books')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="book-outline"
              size={16}
              color={searchMode === 'books' ? colors.primary : colors.text.tertiary}
            />
            <Text style={[styles.searchModeText, searchMode === 'books' && styles.searchModeTextActive]}>
              Livres
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.searchModeBtn, searchMode === 'verses' && styles.searchModeBtnActive]}
            onPress={() => handleSearchModeChange('verses')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="text-outline"
              size={16}
              color={searchMode === 'verses' ? colors.primary : colors.text.tertiary}
            />
            <Text style={[styles.searchModeText, searchMode === 'verses' && styles.searchModeTextActive]}>
              Versets
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Résultats de recherche de versets */}
      {isShowingVerseResults ? (
        <VerseSearchList
          results={verseResults}
          searchQuery={searchQuery}
          isSearching={isSearching}
          onVersePress={handleVersePress}
        />
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookListItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              {/* Daily Verse Hero */}
              {dailyVerse && !searchQuery && (
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
      )}

      <BibleVersionPicker
        visible={showVersionModal}
        currentVersion={selectedVersion}
        onSelectVersion={handleVersionChange}
        onClose={() => setShowVersionModal(false)}
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  versionBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  versionCode: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  bookmarkButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
  searchSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
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
  searchModeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  searchModeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  searchModeBtnActive: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  searchModeText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
  },
  searchModeTextActive: {
    color: colors.primary,
    fontFamily: fontFamily.semibold,
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
});
