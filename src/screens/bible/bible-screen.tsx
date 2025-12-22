import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDebouncedCallback } from 'use-debounce';
import { RootStackParamList, BibleBook } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { bibleBooks, getDailyVerse, getBooksByTestament } from '../../data/bible-data';

interface BibleScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Bible'>;
}

export function BibleScreen({ navigation }: BibleScreenProps) {
  const [activeTestament, setActiveTestament] = useState<'old' | 'new'>('old');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const dailyVerse = getDailyVerse();

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
  const filteredBooks = searchQuery
    ? bibleBooks.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.abbrev.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getBooksByTestament(activeTestament);

  const renderBookItem = ({ item: book }: { item: BibleBook }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => navigation.navigate('BibleBook', { book })}
      activeOpacity={0.8}
    >
      <View style={styles.bookAbbrev}>
        <Text style={styles.bookAbbrevText}>{book.abbrev}</Text>
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookName}>{book.name}</Text>
        <Text style={styles.bookChapters}>{book.chapters} chapitres</Text>
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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>La Bible</Text>
          <Text style={styles.headerSubtitle}>Louis Segond 1910</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        ListHeaderComponent={() => (
          <>
            {/* Daily Verse Card */}
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dailyVerseCard}
            >
              <View style={styles.dailyVerseHeader}>
                <View style={styles.dailyVerseBadge}>
                  <Ionicons name="sunny" size={14} color="#fbbf24" />
                  <Text style={styles.dailyVerseBadgeText}>VERSET DU JOUR</Text>
                </View>
              </View>
              <Text style={styles.dailyVerseText}>"{dailyVerse.text}"</Text>
              <Text style={styles.dailyVerseRef}>
                {dailyVerse.book} {dailyVerse.chapter}:{dailyVerse.verse}
              </Text>
              <View style={styles.cardAccent} />
            </LinearGradient>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrap}>
                <Ionicons name="search" size={20} color={colors.text.secondary} />
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
                    <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

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
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeTestament === 'new' && styles.tabActive]}
                  onPress={() => setActiveTestament('new')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, activeTestament === 'new' && styles.tabTextActive]}>
                    Nouveau Testament
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
  // Daily Verse
  dailyVerseCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  dailyVerseHeader: {
    marginBottom: spacing.md,
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
    marginBottom: spacing.md,
  },
  dailyVerseRef: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.9)',
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
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
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
  // Book Card
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  bookAbbrev: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  bookAbbrevText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  bookInfo: {
    flex: 1,
  },
  bookName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  bookChapters: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});
