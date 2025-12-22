import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { RootStackParamList, BibleVerse } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';
import {
  getChapterVerses,
  getBookById,
  BIBLE_BOOKS,
  BIBLE_VERSIONS,
  BibleVersionCode,
  getCurrentVersion,
  setCurrentVersion,
  getCurrentVersionInfo,
} from '../../services/bible-database';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

// Calculate circle size for 6 columns with equal spacing
const NUM_COLUMNS = 6;
const GRID_PADDING = 16; // spacing.md
const CIRCLE_GAP = 12; // spacing.sm
const TOTAL_GAPS = (NUM_COLUMNS - 1) * CIRCLE_GAP + (GRID_PADDING * 2);
const CIRCLE_SIZE = Math.floor((width - TOTAL_GAPS) / NUM_COLUMNS);

interface BibleChapterScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BibleChapter'>;
  route: RouteProp<RootStackParamList, 'BibleChapter'>;
}

// Font size levels
const FONT_SIZES = [16, 18, 20, 22, 24, 28];
const LINE_HEIGHTS = [26, 30, 34, 38, 42, 48];
const DEFAULT_SIZE_INDEX = 2;

export function BibleChapterScreen({ navigation, route }: BibleChapterScreenProps) {
  const { bookId, bookName, chapter, scrollToVerse } = route.params;
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [fontSizeIndex, setFontSizeIndex] = useState(DEFAULT_SIZE_INDEX);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [totalChapters, setTotalChapters] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerseNav, setShowVerseNav] = useState(false);
  const [showChapterNav, setShowChapterNav] = useState(false);
  const [showVersionNav, setShowVersionNav] = useState(false);
  const [showFontControls, setShowFontControls] = useState(false);
  const [currentVersion, setCurrentVersionState] = useState<BibleVersionCode>('LSG');

  // Animation for chapter modal sliding from top
  const chapterModalY = useSharedValue(-height * 0.5);
  const chapterModalOpacity = useSharedValue(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const versePositions = useRef<{ [key: number]: number }>({});

  // Animation values for page flip
  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  // Navigation info
  const currentBookIndex = BIBLE_BOOKS.findIndex(b => b.id === bookId);
  const isFirstChapter = chapter === 1 && currentBookIndex === 0;
  const isLastChapter = chapter >= totalChapters && currentBookIndex === BIBLE_BOOKS.length - 1;
  const prevBook = currentBookIndex > 0 ? BIBLE_BOOKS[currentBookIndex - 1] : null;
  const nextBook = currentBookIndex < BIBLE_BOOKS.length - 1 ? BIBLE_BOOKS[currentBookIndex + 1] : null;

  useEffect(() => {
    const version = getCurrentVersion();
    setCurrentVersionState(version);
  }, []);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setSelectedVerses([]);
      try {
        const [bookData, versesData] = await Promise.all([
          getBookById(bookId),
          getChapterVerses(bookId, chapter, currentVersion),
        ]);
        setTotalChapters(bookData?.chapters || 1);
        setVerses(versesData);
      } catch (error) {
        console.error('Error loading chapter:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [bookId, chapter, currentVersion]);

  useEffect(() => {
    if (!isLoading && scrollToVerse && verses.length > 0) {
      setTimeout(() => {
        scrollToVerseNumber(scrollToVerse);
      }, 300);
    }
  }, [isLoading, scrollToVerse, verses]);

  const scrollToVerseNumber = useCallback((verseNum: number) => {
    const position = versePositions.current[verseNum];
    if (position !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: position - 100, animated: true });
      setSelectedVerses([verseNum]);
      setTimeout(() => setSelectedVerses([]), 2000);
    }
    setShowVerseNav(false);
  }, []);

  const handleVerseLayout = (verseNum: number, y: number) => {
    versePositions.current[verseNum] = y;
  };

  const toggleVerseSelection = (verseNum: number) => {
    setSelectedVerses(prev =>
      prev.includes(verseNum)
        ? prev.filter(v => v !== verseNum)
        : [...prev, verseNum]
    );
  };

  const handleShare = async () => {
    const versesToShare = selectedVerses.length > 0
      ? verses.filter(v => selectedVerses.includes(v.verse))
      : [];

    if (versesToShare.length === 0) return;

    const text = versesToShare
      .map(v => `${v.verse}. ${v.text}`)
      .join('\n');

    const reference = `${bookName} ${chapter}:${selectedVerses.sort((a, b) => a - b).join(', ')}`;

    await Share.share({
      message: `${text}\n\n— ${reference} (LSG)`,
    });
  };

  const handleAddNote = () => {
    if (selectedVerses.length === 0) return;

    const sortedVerses = selectedVerses.sort((a, b) => a - b);
    const verseRef = `${bookName} ${chapter}:${sortedVerses.join(', ')}`;
    const selectedTexts = verses
      .filter(v => sortedVerses.includes(v.verse))
      .map(v => `${v.verse}. ${v.text}`)
      .join('\n');

    navigation.navigate(SCREENS.NOTE_EDIT, {
      note: undefined,
      linkedVerseRef: verseRef,
      prefillTitle: `Réflexion sur ${verseRef}`,
      prefillContent: `"${selectedTexts}"\n\n`,
    });
  };

  const goToPrevChapter = useCallback(() => {
    if (isFirstChapter) return;

    if (chapter > 1) {
      navigation.replace(SCREENS.BIBLE_CHAPTER, { bookId, bookName, chapter: chapter - 1 });
    } else if (prevBook) {
      navigation.replace(SCREENS.BIBLE_CHAPTER, {
        bookId: prevBook.id,
        bookName: prevBook.name,
        chapter: prevBook.chapters,
      });
    }
  }, [isFirstChapter, chapter, bookId, bookName, prevBook, navigation]);

  const goToNextChapter = useCallback(() => {
    if (isLastChapter) return;

    if (chapter < totalChapters) {
      navigation.replace(SCREENS.BIBLE_CHAPTER, { bookId, bookName, chapter: chapter + 1 });
    } else if (nextBook) {
      navigation.replace(SCREENS.BIBLE_CHAPTER, {
        bookId: nextBook.id,
        bookName: nextBook.name,
        chapter: 1,
      });
    }
  }, [isLastChapter, chapter, totalChapters, bookId, bookName, nextBook, navigation]);

  // Page flip gesture
  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onUpdate((event) => {
      // Limit the drag based on navigation availability
      if (event.translationX > 0 && isFirstChapter) {
        translateX.value = event.translationX * 0.2; // Resistance effect
      } else if (event.translationX < 0 && isLastChapter) {
        translateX.value = event.translationX * 0.2; // Resistance effect
      } else {
        translateX.value = event.translationX;
      }

      // Rotate based on drag position (like turning a page)
      rotateY.value = interpolate(
        event.translationX,
        [-width, 0, width],
        [45, 0, -45],
        Extrapolation.CLAMP
      );
    })
    .onEnd((event) => {
      const shouldNavigateNext = event.translationX < -SWIPE_THRESHOLD && !isLastChapter;
      const shouldNavigatePrev = event.translationX > SWIPE_THRESHOLD && !isFirstChapter;

      if (shouldNavigateNext) {
        // Animate page flip to the left
        translateX.value = withTiming(-width, { duration: 300 }, () => {
          runOnJS(goToNextChapter)();
        });
        rotateY.value = withTiming(90, { duration: 300 });
      } else if (shouldNavigatePrev) {
        // Animate page flip to the right
        translateX.value = withTiming(width, { duration: 300 }, () => {
          runOnJS(goToPrevChapter)();
        });
        rotateY.value = withTiming(-90, { duration: 300 });
      } else {
        // Spring back to original position
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
        rotateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const animatedPageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { translateX: translateX.value },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  // Chapter modal animated styles
  const animatedChapterModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: chapterModalY.value }],
    };
  });

  const animatedChapterOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: chapterModalOpacity.value,
    };
  });

  const openChapterModal = () => {
    setShowChapterNav(true);
    chapterModalY.value = withTiming(0, { duration: 150 });
    chapterModalOpacity.value = withTiming(1, { duration: 100 });
  };

  const closeChapterModal = () => {
    chapterModalY.value = withTiming(-height * 0.5, { duration: 120 });
    chapterModalOpacity.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(setShowChapterNav)(false);
    });
  };

  const increaseFontSize = () => {
    setFontSizeIndex(prev => Math.min(prev + 1, FONT_SIZES.length - 1));
  };

  const decreaseFontSize = () => {
    setFontSizeIndex(prev => Math.max(prev - 1, 0));
  };

  const handleVersionChange = async (version: BibleVersionCode) => {
    setCurrentVersionState(version);
    await setCurrentVersion(version);
    setShowVersionNav(false);
  };

  const handleCompareVerses = () => {
    if (selectedVerses.length === 0) return;
    navigation.navigate(SCREENS.VERSE_COMPARE, {
      bookId,
      bookName,
      chapter,
      verses: selectedVerses.sort((a, b) => a - b),
    });
  };

  const currentVersionInfo = BIBLE_VERSIONS.find(v => v.code === currentVersion) || BIBLE_VERSIONS[0];

  const currentFontSize = FONT_SIZES[fontSizeIndex];
  const currentLineHeight = LINE_HEIGHTS[fontSizeIndex];
  const hasVerses = verses.length > 0;
  const hasSelection = selectedVerses.length > 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenterWrap}>
          <TouchableOpacity
            style={styles.headerChapterBtn}
            onPress={openChapterModal}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerDivider} />
          <TouchableOpacity
            style={styles.headerVersionBtn}
            onPress={() => setShowVersionNav(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.headerVersionText}>{currentVersionInfo.shortName}</Text>
            <Ionicons name="chevron-down" size={12} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowFontControls(!showFontControls)}
          activeOpacity={0.7}
        >
          <Ionicons name="text" size={20} color={showFontControls ? colors.primary : colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Page Content with Gesture */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.pageContainer, animatedPageStyle]}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Chapter Title */}
            <View style={styles.chapterHeader}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.chapterAccent}
              />
              <Text style={styles.chapterTitle}>Chapitre {chapter}</Text>
              <Text style={styles.chapterMeta}>{verses.length} versets</Text>
            </View>

            {/* Verses */}
            {hasVerses ? (
              <>
                {verses.map((verse) => (
                  <TouchableOpacity
                    key={verse.verse}
                    onLayout={(e) => handleVerseLayout(verse.verse, e.nativeEvent.layout.y)}
                    onPress={() => toggleVerseSelection(verse.verse)}
                    onLongPress={() => {
                      setSelectedVerses([verse.verse]);
                      handleShare();
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.verseRow,
                      selectedVerses.includes(verse.verse) && styles.verseRowSelected,
                    ]}
                  >
                    <Text style={[
                      styles.verseNumber,
                      selectedVerses.includes(verse.verse) && styles.verseNumberSelected,
                    ]}>
                      {verse.verse}
                    </Text>
                    <Text
                      style={[
                        styles.verseText,
                        { fontSize: currentFontSize, lineHeight: currentLineHeight },
                        selectedVerses.includes(verse.verse) && styles.verseTextSelected,
                      ]}
                    >
                      {verse.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="book-outline" size={48} color={colors.text.tertiary} />
                <Text style={styles.emptyStateText}>Aucun verset disponible</Text>
              </View>
            )}

            {/* Swipe hint */}
            <View style={styles.swipeHint}>
              <Ionicons name="swap-horizontal" size={16} color={colors.text.tertiary} />
              <Text style={styles.swipeHintText}>Glissez pour changer de chapitre</Text>
            </View>

            {/* Bottom Spacing */}
            <View style={{ height: 120 }} />
          </ScrollView>
        </Animated.View>
      </GestureDetector>

      {/* Font Size Floating Controls */}
      {showFontControls && (
        <View style={styles.fontFloating}>
          <TouchableOpacity
            style={styles.fontFloatingClose}
            onPress={() => setShowFontControls(false)}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={colors.text.tertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontFloatingBtn, fontSizeIndex === FONT_SIZES.length - 1 && styles.fontFloatingBtnDisabled]}
            onPress={increaseFontSize}
            disabled={fontSizeIndex === FONT_SIZES.length - 1}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={22} color={fontSizeIndex === FONT_SIZES.length - 1 ? colors.text.tertiary : colors.primary} />
          </TouchableOpacity>
          <View style={styles.fontFloatingIndicator}>
            <Text style={styles.fontFloatingText}>{currentFontSize}</Text>
          </View>
          <TouchableOpacity
            style={[styles.fontFloatingBtn, fontSizeIndex === 0 && styles.fontFloatingBtnDisabled]}
            onPress={decreaseFontSize}
            disabled={fontSizeIndex === 0}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={22} color={fontSizeIndex === 0 ? colors.text.tertiary : colors.primary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Selection Actions (floating) */}
      {hasSelection && (
        <View style={styles.floatingActions}>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={handleCompareVerses}
            activeOpacity={0.8}
          >
            <Ionicons name="git-compare-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons name="share-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={handleAddNote}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingBtn, styles.floatingBtnCancel]}
            onPress={() => setSelectedVerses([])}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navBtn, isFirstChapter && styles.navBtnDisabled]}
          onPress={goToPrevChapter}
          disabled={isFirstChapter}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={isFirstChapter ? colors.text.tertiary : colors.primary}
          />
          {!isFirstChapter && (
            <Text style={styles.navBtnText} numberOfLines={1}>
              {chapter > 1 ? `Chap. ${chapter - 1}` : prevBook?.abbrev}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navCenterBtn}
          onPress={() => setShowVerseNav(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="list" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, styles.navBtnRight, isLastChapter && styles.navBtnDisabled]}
          onPress={goToNextChapter}
          disabled={isLastChapter}
          activeOpacity={0.7}
        >
          {!isLastChapter && (
            <Text style={styles.navBtnText} numberOfLines={1}>
              {chapter < totalChapters ? `Chap. ${chapter + 1}` : nextBook?.abbrev}
            </Text>
          )}
          <Ionicons
            name="chevron-forward"
            size={22}
            color={isLastChapter ? colors.text.tertiary : colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Chapter Navigation - Slides from top */}
      {showChapterNav && (
        <>
          <Animated.View
            style={[styles.modalOverlayTop, animatedChapterOverlayStyle]}
          >
            <TouchableOpacity
              style={styles.overlayTouchable}
              activeOpacity={1}
              onPress={closeChapterModal}
            />
          </Animated.View>
          <Animated.View style={[styles.chapterModal, animatedChapterModalStyle]}>
            <View style={styles.navModalHeader}>
              <Text style={styles.navModalTitle}>Aller au chapitre</Text>
              <TouchableOpacity onPress={closeChapterModal}>
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.navModalSubtitle}>{bookName}</Text>
            <FlatList
              data={Array.from({ length: totalChapters }, (_, i) => i + 1)}
              keyExtractor={(item) => item.toString()}
              numColumns={6}
              columnWrapperStyle={styles.navRow}
              contentContainerStyle={styles.navGrid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.chapterNavItem,
                    item === chapter && styles.chapterNavItemActive,
                  ]}
                  onPress={() => {
                    if (item !== chapter) {
                      setShowChapterNav(false);
                      navigation.replace('BibleChapter', { bookId, bookName, chapter: item });
                    } else {
                      closeChapterModal();
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.chapterNavItemText,
                    item === chapter && styles.chapterNavItemTextActive,
                  ]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </>
      )}

      {/* Verse Navigation Modal - Monte du bas */}
      <Modal
        visible={showVerseNav}
        transparent
        animationType="slide"
        onRequestClose={() => setShowVerseNav(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlayBottom}
          activeOpacity={1}
          onPress={() => setShowVerseNav(false)}
        >
          <View style={styles.verseModal}>
            <View style={styles.navModalHeader}>
              <Text style={styles.navModalTitle}>Aller au verset</Text>
              <TouchableOpacity onPress={() => setShowVerseNav(false)}>
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.navModalSubtitle}>{bookName} {chapter}</Text>
            <FlatList
              data={verses}
              keyExtractor={(item) => item.verse.toString()}
              numColumns={6}
              columnWrapperStyle={styles.navRow}
              contentContainerStyle={styles.navGrid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.chapterNavItem}
                  onPress={() => scrollToVerseNumber(item.verse)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chapterNavItemText}>{item.verse}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Version Navigation Modal */}
      <Modal
        visible={showVersionNav}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVersionNav(false)}
      >
        <TouchableOpacity
          style={styles.versionModalOverlay}
          activeOpacity={1}
          onPress={() => setShowVersionNav(false)}
        >
          <View style={styles.versionModalContent}>
            <View style={styles.navModalHeader}>
              <Text style={styles.navModalTitle}>Version de la Bible</Text>
              <TouchableOpacity onPress={() => setShowVersionNav(false)}>
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={BIBLE_VERSIONS}
              keyExtractor={(item) => item.code}
              contentContainerStyle={styles.versionList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.versionItem,
                    currentVersion === item.code && styles.versionItemActive,
                  ]}
                  onPress={() => handleVersionChange(item.code)}
                  activeOpacity={0.7}
                >
                  <View style={styles.versionItemInfo}>
                    <Text style={[
                      styles.versionItemName,
                      currentVersion === item.code && styles.versionItemNameActive,
                    ]}>
                      {item.name}
                    </Text>
                    <Text style={styles.versionItemCode}>{item.shortName}</Text>
                  </View>
                  {currentVersion === item.code && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  // Page Container
  pageContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  // Font Floating Controls
  fontFloating: {
    position: 'absolute',
    right: spacing.lg,
    top: 120,
    backgroundColor: '#fff',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 20,
  },
  fontFloatingClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  fontFloatingBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontFloatingBtnDisabled: {
    opacity: 0.4,
  },
  fontFloatingIndicator: {
    paddingVertical: spacing.xs,
  },
  fontFloatingText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  // Chapter Header
  chapterHeader: {
    marginBottom: spacing.xl,
    paddingLeft: spacing.md,
  },
  chapterAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
  },
  chapterTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  chapterMeta: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  // Verses
  verseRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xs,
  },
  verseRowSelected: {
    backgroundColor: colors.primaryLight,
  },
  verseNumber: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    width: 32,
    marginRight: spacing.sm,
    marginTop: 3,
  },
  verseNumberSelected: {
    color: colors.primaryDark,
  },
  verseText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  verseTextSelected: {
    color: colors.primaryDark,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyStateText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
  },
  // Swipe Hint
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
  },
  swipeHintText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  // Floating Actions
  floatingActions: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 100,
    flexDirection: 'column',
    gap: spacing.sm,
    zIndex: 20,
  },
  floatingBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  floatingBtnCancel: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
    zIndex: 10,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    minWidth: 100,
  },
  navBtnRight: {
    justifyContent: 'flex-end',
  },
  navBtnDisabled: {
    backgroundColor: 'transparent',
  },
  navBtnText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  navCenterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Navigation Modals
  modalOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  overlayTouchable: {
    flex: 1,
  },
  modalOverlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  chapterModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    maxHeight: height * 0.55,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    zIndex: 101,
  },
  verseModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: height * 0.5,
    paddingBottom: spacing.xl,
  },
  navModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  navModalTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  navModalSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  navGrid: {
    paddingHorizontal: GRID_PADDING,
    paddingVertical: spacing.md,
  },
  navRow: {
    justifyContent: 'flex-start',
    gap: CIRCLE_GAP,
    marginBottom: CIRCLE_GAP,
  },
  navItem: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: colors.primaryLight,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: colors.primary,
  },
  navItemText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  navItemTextActive: {
    color: '#fff',
  },
  // Chapter nav items (white bg, primary text - actif: primary bg, white text)
  chapterNavItem: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: '#fff',
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chapterNavItemActive: {
    backgroundColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  chapterNavItemText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  chapterNavItemTextActive: {
    color: '#fff',
  },
  headerCenterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  headerChapterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  headerDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  headerVersionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  headerVersionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  versionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  versionModalContent: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.xxl,
    width: '100%',
    maxWidth: 400,
    maxHeight: height * 0.6,
  },
  versionList: {
    padding: spacing.md,
  },
  versionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  versionItemActive: {
    backgroundColor: colors.primaryLight,
  },
  versionItemInfo: {
    flex: 1,
  },
  versionItemName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  versionItemNameActive: {
    color: colors.primary,
  },
  versionItemCode: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});
