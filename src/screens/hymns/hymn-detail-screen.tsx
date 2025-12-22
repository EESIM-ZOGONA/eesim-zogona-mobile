import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
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
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { SCREENS } from '../../constants/screens';
import { useHymns } from '../../hooks';
import { HymnWithDetails, Hymn } from '../../services/hymns-database';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const NUM_COLUMNS = 6;
const GRID_PADDING = 16;
const CIRCLE_GAP = 12;
const TOTAL_GAPS = (NUM_COLUMNS - 1) * CIRCLE_GAP + (GRID_PADDING * 2);
const CIRCLE_SIZE = Math.floor((width - TOTAL_GAPS) / NUM_COLUMNS);

interface HymnDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HymnDetail'>;
  route: RouteProp<RootStackParamList, 'HymnDetail'>;
}

const parseLyrics = (lyrics: string) => {
  const sections: { type: 'refrain' | 'couplet' | 'refrain-ref'; title?: string; content: string }[] = [];
  const lines = lyrics.split('\n');
  let currentSection: { type: 'refrain' | 'couplet' | 'refrain-ref'; title?: string; content: string } | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const upperLine = trimmedLine.toUpperCase();

    if (upperLine.startsWith('REFRAIN') || upperLine === 'REFRAIN:' || upperLine === 'REFRAIN') {
      if (currentSection) sections.push(currentSection);
      currentSection = { type: 'refrain', title: 'REFRAIN', content: '' };
    } else if (upperLine.match(/^COUPLET\s*\d+/i) || upperLine.match(/^VERSET\s*\d+/i)) {
      if (currentSection) sections.push(currentSection);
      const num = trimmedLine.match(/\d+/)?.[0] || '';
      currentSection = { type: 'couplet', title: `COUPLET ${num}`, content: '' };
    } else if (trimmedLine === '(Refrain)' || trimmedLine === '(refrain)') {
      if (currentSection) sections.push(currentSection);
      sections.push({ type: 'refrain-ref', content: '(Refrain)' });
      currentSection = null;
    } else if (trimmedLine) {
      if (!currentSection) {
        currentSection = { type: 'couplet', title: 'COUPLET 1', content: '' };
      }
      currentSection.content += (currentSection.content ? '\n' : '') + trimmedLine;
    }
  }

  if (currentSection) sections.push(currentSection);

  if (sections.length === 0) {
    return [{ type: 'couplet' as const, content: lyrics }];
  }

  return sections;
};

const FONT_SIZES = [16, 18, 20, 22, 24, 28];
const LINE_HEIGHTS = [26, 30, 34, 38, 42, 48];
const DEFAULT_SIZE_INDEX = 2;

const ROW_HEIGHT = CIRCLE_SIZE + CIRCLE_GAP;

interface HymnNavItemProps {
  number: number;
  isActive: boolean;
  onPress: () => void;
}

const HymnNavItem = memo(({ number, isActive, onPress }: HymnNavItemProps) => (
  <TouchableOpacity
    style={[styles.hymnNavItem, isActive && styles.hymnNavItemActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.hymnNavItemText, isActive && styles.hymnNavItemTextActive]}>
      {number}
    </Text>
  </TouchableOpacity>
));

export function HymnDetailScreen({ navigation, route }: HymnDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const { hymnId } = route.params;
  const [fontSizeIndex, setFontSizeIndex] = useState(DEFAULT_SIZE_INDEX);
  const [hymn, setHymn] = useState<HymnWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHymnPicker, setShowHymnPicker] = useState(false);
  const [showFontControls, setShowFontControls] = useState(false);

  const { hymns, getHymn, toggleFavorite, addToRecentlyPlayed } = useHymns();

  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const hymnModalY = useSharedValue(-height * 0.6);
  const hymnModalOpacity = useSharedValue(0);

  const currentIndex = hymns.findIndex(h => h.id === hymnId);
  const isFirstHymn = currentIndex <= 0;
  const isLastHymn = currentIndex >= hymns.length - 1;
  const totalHymns = hymns.length;
  const currentFontSize = FONT_SIZES[fontSizeIndex];
  const currentLineHeight = LINE_HEIGHTS[fontSizeIndex];

  useEffect(() => {
    const loadHymn = async () => {
      setLoading(true);
      const hymnData = await getHymn(hymnId);
      setHymn(hymnData);
      setLoading(false);
      if (hymnData) {
        addToRecentlyPlayed(hymnId);
      }
    };
    loadHymn();
  }, [hymnId, getHymn, addToRecentlyPlayed]);

  const handleToggleFavorite = useCallback(async () => {
    if (!hymn) return;
    const newFavoriteState = await toggleFavorite(hymn.id);
    setHymn(prev => prev ? { ...prev, isFavorite: newFavoriteState } : null);
  }, [hymn, toggleFavorite]);

  const goToPrevHymn = useCallback(() => {
    if (isFirstHymn || currentIndex < 0) return;
    const prevHymn = hymns[currentIndex - 1];
    navigation.replace(SCREENS.HYMN_DETAIL, { hymnId: prevHymn.id });
  }, [isFirstHymn, currentIndex, hymns, navigation]);

  const goToNextHymn = useCallback(() => {
    if (isLastHymn || currentIndex < 0) return;
    const nextHymn = hymns[currentIndex + 1];
    navigation.replace(SCREENS.HYMN_DETAIL, { hymnId: nextHymn.id });
  }, [isLastHymn, currentIndex, hymns, navigation]);

  const goToHymn = useCallback((targetHymn: Hymn) => {
    closeHymnModal();
    if (targetHymn.id !== hymnId) {
      setTimeout(() => {
        navigation.replace(SCREENS.HYMN_DETAIL, { hymnId: targetHymn.id });
      }, 150);
    }
  }, [hymnId, navigation]);

  const openHymnModal = () => {
    setShowHymnPicker(true);
    hymnModalY.value = withTiming(0, { duration: 150 });
    hymnModalOpacity.value = withTiming(1, { duration: 100 });
  };

  const closeHymnModal = () => {
    hymnModalY.value = withTiming(-height * 0.6, { duration: 120 });
    hymnModalOpacity.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(setShowHymnPicker)(false);
    });
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onUpdate((event) => {
      if (event.translationX > 0 && isFirstHymn) {
        translateX.value = event.translationX * 0.2;
      } else if (event.translationX < 0 && isLastHymn) {
        translateX.value = event.translationX * 0.2;
      } else {
        translateX.value = event.translationX;
      }

      rotateY.value = interpolate(
        event.translationX,
        [-width, 0, width],
        [45, 0, -45],
        Extrapolation.CLAMP
      );
    })
    .onEnd((event) => {
      const shouldNavigateNext = event.translationX < -SWIPE_THRESHOLD && !isLastHymn;
      const shouldNavigatePrev = event.translationX > SWIPE_THRESHOLD && !isFirstHymn;

      if (shouldNavigateNext) {
        translateX.value = withTiming(-width, { duration: 300 }, () => {
          runOnJS(goToNextHymn)();
        });
        rotateY.value = withTiming(90, { duration: 300 });
      } else if (shouldNavigatePrev) {
        translateX.value = withTiming(width, { duration: 300 }, () => {
          runOnJS(goToPrevHymn)();
        });
        rotateY.value = withTiming(-90, { duration: 300 });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
        rotateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const animatedPageStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { translateX: translateX.value },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const animatedHymnModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: hymnModalY.value }],
  }));

  const animatedHymnOverlayStyle = useAnimatedStyle(() => ({
    opacity: hymnModalOpacity.value,
  }));

  const handleShare = async () => {
    if (!hymn) return;
    try {
      await Share.share({
        title: `Cantique ${hymn.number} - ${hymn.title}`,
        message: `${hymn.title}\n\n${hymn.lyrics}\n\n— Cantique ${hymn.number}, EE/SIM Zogona`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const increaseFontSize = () => {
    setFontSizeIndex(prev => Math.min(prev + 1, FONT_SIZES.length - 1));
  };

  const decreaseFontSize = () => {
    setFontSizeIndex(prev => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!hymn) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.text.tertiary} />
          <Text style={styles.loadingText}>Cantique introuvable</Text>
          <TouchableOpacity
            style={styles.backButtonCenter}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const sections = parseLyrics(hymn.lyrics);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
            style={styles.headerHymnBtn}
            onPress={openHymnModal}
            activeOpacity={0.8}
          >
            <Text style={styles.headerTitle}>Cantique {hymn.number}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.primary} />
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

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.pageContainer, animatedPageStyle]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.hymnHeader}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.hymnAccent}
              />
              <Text style={styles.hymnTitle}>{hymn.title}</Text>
              {(hymn.author || hymn.composer) && (
                <Text style={styles.hymnMeta}>
                  {hymn.author}{hymn.composer && hymn.composer !== hymn.author ? ` • ${hymn.composer}` : ''}
                </Text>
              )}
            </View>

            <View style={styles.lyricsCard}>
              {sections.map((section, index) => (
                <View key={index} style={styles.section}>
                  {section.type === 'refrain' && (
                    <>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <View style={styles.refrainContainer}>
                        <View style={styles.refrainBar} />
                        <Text style={[styles.refrainText, { fontSize: currentFontSize, lineHeight: currentLineHeight }]}>
                          {section.content}
                        </Text>
                      </View>
                    </>
                  )}
                  {section.type === 'couplet' && (
                    <>
                      {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
                      <Text style={[styles.coupletText, { fontSize: currentFontSize, lineHeight: currentLineHeight }]}>
                        {section.content}
                      </Text>
                    </>
                  )}
                  {section.type === 'refrain-ref' && (
                    <View style={styles.refrainRefContainer}>
                      <View style={styles.refrainRefBar} />
                      <Text style={styles.refrainRefText}>(Refrain)</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.swipeHint}>
              <Ionicons name="swap-horizontal" size={16} color={colors.text.tertiary} />
              <Text style={styles.swipeHintText}>Glissez pour changer de cantique</Text>
            </View>

            <View style={{ height: 120 }} />
          </ScrollView>
        </Animated.View>
      </GestureDetector>

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

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || spacing.lg }]}>
        <TouchableOpacity
          style={[styles.navBtn, isFirstHymn && styles.navBtnDisabled]}
          onPress={goToPrevHymn}
          disabled={isFirstHymn}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={isFirstHymn ? colors.text.tertiary : colors.primary}
          />
          {!isFirstHymn && (
            <Text style={styles.navBtnText} numberOfLines={1}>
              N° {hymns[currentIndex - 1]?.number}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.navCenterGroup}>
          <TouchableOpacity
            style={[styles.navActionBtn, hymn.isFavorite && styles.navActionBtnActive]}
            onPress={handleToggleFavorite}
            activeOpacity={0.7}
          >
            <Ionicons
              name={hymn.isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={hymn.isFavorite ? '#dc2626' : colors.text.secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navCenterBtn}
            onPress={openHymnModal}
            activeOpacity={0.8}
          >
            <Ionicons name="musical-notes" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navActionBtn}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social-outline" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.navBtn, styles.navBtnRight, isLastHymn && styles.navBtnDisabled]}
          onPress={goToNextHymn}
          disabled={isLastHymn}
          activeOpacity={0.7}
        >
          {!isLastHymn && (
            <Text style={styles.navBtnText} numberOfLines={1}>
              N° {hymns[currentIndex + 1]?.number}
            </Text>
          )}
          <Ionicons
            name="chevron-forward"
            size={22}
            color={isLastHymn ? colors.text.tertiary : colors.primary}
          />
        </TouchableOpacity>
      </View>

      {showHymnPicker && (
        <>
          <Animated.View style={[styles.modalOverlay, animatedHymnOverlayStyle]}>
            <TouchableOpacity
              style={styles.overlayTouchable}
              activeOpacity={1}
              onPress={closeHymnModal}
            />
          </Animated.View>
          <Animated.View style={[styles.hymnModal, animatedHymnModalStyle]}>
            <View style={styles.navModalHeader}>
              <Text style={styles.navModalTitle}>Choisir un cantique</Text>
              <TouchableOpacity onPress={closeHymnModal}>
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.navModalSubtitle}>{totalHymns} cantiques disponibles</Text>
            <FlatList
              data={hymns}
              keyExtractor={(item) => item.id}
              numColumns={NUM_COLUMNS}
              columnWrapperStyle={styles.navRow}
              contentContainerStyle={styles.navGrid}
              windowSize={5}
              maxToRenderPerBatch={30}
              initialNumToRender={42}
              removeClippedSubviews={true}
              renderItem={({ item }) => (
                <HymnNavItem
                  number={item.number}
                  isActive={item.id === hymnId}
                  onPress={() => goToHymn(item)}
                />
              )}
            />
          </Animated.View>
        </>
      )}
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
  backButtonCenter: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
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
  headerCenterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHymnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  hymnHeader: {
    marginBottom: spacing.xl,
    paddingLeft: spacing.md,
  },
  hymnAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 2,
  },
  hymnTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  hymnMeta: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  lyricsCard: {
    paddingHorizontal: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  refrainContainer: {
    flexDirection: 'row',
  },
  refrainBar: {
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  refrainText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.primary,
  },
  coupletText: {
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  refrainRefContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  refrainRefBar: {
    width: 3,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  refrainRefText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.secondary,
  },
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
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    minWidth: 90,
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
  navCenterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  navCenterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActionBtnActive: {
    backgroundColor: '#fee2e2',
  },
  modalOverlay: {
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
  hymnModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    maxHeight: height * 0.6,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    zIndex: 101,
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
  hymnNavItem: {
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
  hymnNavItemActive: {
    backgroundColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  hymnNavItemText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  hymnNavItemTextActive: {
    color: '#fff',
  },
});
