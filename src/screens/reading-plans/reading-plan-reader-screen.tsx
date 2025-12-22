import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  ViewToken,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { RootStackParamList, BibleVerse, ReadingPlanReading, HighlightColor } from '../../types';
import { colors, spacing, fontSize as themeFontSize, fontFamily, borderRadius } from '../../constants';
import { useFontSize, useReadingProgress, useVerseHighlights, useVerseActions } from '../../hooks';
import {
  getChapterVerses,
  BibleVersionCode,
  getCurrentVersion,
  setCurrentVersion,
} from '../../services/bible-database';
import { VerseHighlightPicker, VerseCard, VerseActions, ReadingTimeBadge, BibleVersionPicker } from '../../components/bible';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ReadingPlanReaderScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReadingPlanReader'>;
  route: RouteProp<RootStackParamList, 'ReadingPlanReader'>;
}

export function ReadingPlanReaderScreen({ navigation, route }: ReadingPlanReaderScreenProps) {
  const { plan, day, userPlanId, initialReadingIndex } = route.params;
  const hasUserPlan = !!userPlanId;

  const [currentReadingIndex, setCurrentReadingIndex] = useState(initialReadingIndex);
  const currentReading = day.readings[currentReadingIndex];

  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fontSize: currentFontSize, increase, decrease, canIncrease, canDecrease } = useFontSize();

  // Version Bible
  const [selectedVersion, setSelectedVersion] = useState<BibleVersionCode>(() => getCurrentVersion());
  const [showVersionPicker, setShowVersionPicker] = useState(false);

  // Sélection de versets
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const {
    isReadingComplete,
    markReadingComplete,
    refresh,
  } = useReadingProgress({ userPlanId: userPlanId || '' });

  // Hook pour les highlights
  const {
    recentColors,
    addHighlight,
    removeHighlight,
    getHighlightColor,
    refreshHighlights,
  } = useVerseHighlights({
    bookId: currentReading?.bookId || '',
    chapter: currentReading?.chapter || 1,
  });

  // État pour la détection de fin de lecture
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTooFastWarning, setShowTooFastWarning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(
    hasUserPlan && isReadingComplete(day.day, currentReadingIndex)
  );
  const readingStartTime = useRef(Date.now());
  const [suggestedReadingTime, setSuggestedReadingTime] = useState(0);

  // Animation pour l'overlay de célébration
  const celebrationOpacity = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.5)).current;

  // Référence pour le confetti
  const confettiRef = useRef<ConfettiCannon>(null);

  // Track des versets visibles
  const lastThreeVersesRef = useRef<number[]>([]);

  // Reset quand on change de lecture
  useEffect(() => {
    setHasReachedEnd(false);
    setShowCelebration(false);
    setShowTooFastWarning(false);
    setHasCompleted(hasUserPlan && isReadingComplete(day.day, currentReadingIndex));
    readingStartTime.current = Date.now();
    celebrationOpacity.setValue(0);
    celebrationScale.setValue(0.5);
    setSelectedVerses([]);
    setShowHighlightPicker(false);
    refreshHighlights();
  }, [currentReadingIndex, hasUserPlan, day.day, isReadingComplete, refreshHighlights]);

  const loadVerses = useCallback(async () => {
    if (!currentReading) return;

    setLoading(true);
    setError(null);

    try {
      const allVerses = await getChapterVerses(currentReading.bookId, currentReading.chapter, selectedVersion);

      if (!allVerses || allVerses.length === 0) {
        setError(`Chapitre ${currentReading.chapter} non trouvé dans ${currentReading.bookName}`);
        return;
      }

      const start = currentReading.verseStart || 1;
      const end = currentReading.verseEnd || allVerses.length;

      const filteredVerses = allVerses.filter(
        (v) => v.verse >= start && v.verse <= end
      );

      setVerses(filteredVerses);

      // Calculer le temps de lecture suggéré (200 mots/min en moyenne)
      const totalWords = filteredVerses.reduce((sum, v) => sum + v.text.split(/\s+/).length, 0);
      const suggestedMinutes = Math.max(1, Math.ceil(totalWords / 200));
      setSuggestedReadingTime(suggestedMinutes * 60);

      // Stocker les 3 derniers versets pour la détection de fin
      const lastThree = filteredVerses.slice(-3).map(v => v.verse);
      lastThreeVersesRef.current = lastThree;
    } catch (err) {
      setError('Erreur lors du chargement des versets');
      console.error('Bible load error:', err);
    } finally {
      setLoading(false);
    }
  }, [currentReading, selectedVersion]);

  useEffect(() => {
    loadVerses();
  }, [loadVerses]);

  // Changer de version
  const handleVersionChange = useCallback(async (version: BibleVersionCode) => {
    setSelectedVersion(version);
    await setCurrentVersion(version);
    setShowVersionPicker(false);
  }, []);

  // Sélection de versets
  const handleVerseSelect = useCallback((verseNum: number) => {
    setSelectedVerses(prev => {
      if (prev.includes(verseNum)) {
        return prev.filter(v => v !== verseNum);
      }
      return [...prev, verseNum].sort((a, b) => a - b);
    });
  }, []);

  const handleVerseLongPress = useCallback((verseNum: number) => {
    setSelectedVerses([verseNum]);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedVerses([]);
    setShowHighlightPicker(false);
  }, []);

  // Hook pour les actions sur les versets (partage, copie, notes, etc.)
  const {
    handleShare,
    handleCopy,
    handleAddNote,
    handleCompare,
    handleBookmark,
  } = useVerseActions({
    bookId: currentReading?.bookId || '',
    bookName: currentReading?.bookName || '',
    chapter: currentReading?.chapter || 1,
    selectedVerses,
    verses,
    version: selectedVersion,
    navigation,
    onActionComplete: clearSelection,
  });

  // Surlignage
  const handleHighlight = useCallback(async (color: HighlightColor) => {
    if (selectedVerses.length === 0) return;
    await addHighlight(selectedVerses, color);
    clearSelection();
  }, [selectedVerses, addHighlight, clearSelection]);

  const handleRemoveHighlight = useCallback(async () => {
    if (selectedVerses.length === 0) return;
    await removeHighlight(selectedVerses);
    clearSelection();
  }, [selectedVerses, removeHighlight, clearSelection]);

  // Vérifier si l'utilisateur a lu trop vite (moins de la moitié du temps suggéré)
  const isReadingTooFast = useCallback(() => {
    const timeSpent = (Date.now() - readingStartTime.current) / 1000;
    return timeSpent < suggestedReadingTime / 2;
  }, [suggestedReadingTime]);

  // Déclencher la célébration
  const triggerCelebration = useCallback(async () => {
    if (hasCompleted || showCelebration) return;

    setShowCelebration(true);
    setHasCompleted(true);

    // Marquer comme terminé
    if (hasUserPlan) {
      await markReadingComplete(day.day, currentReadingIndex);
      refresh();
    }

    // Animation d'entrée
    Animated.parallel([
      Animated.timing(celebrationOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(celebrationScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Déclencher les confetti après l'animation
      setTimeout(() => {
        confettiRef.current?.start();
      }, 100);
    });
  }, [hasCompleted, showCelebration, hasUserPlan, day.day, currentReadingIndex, markReadingComplete, refresh, celebrationOpacity, celebrationScale]);

  // Gérer le clic sur "Marquer comme lu"
  const handleMarkAsRead = useCallback(() => {
    if (isReadingTooFast()) {
      setShowTooFastWarning(true);
    } else {
      triggerCelebration();
    }
  }, [isReadingTooFast, triggerCelebration]);

  // Confirmer malgré le warning
  const handleConfirmRead = useCallback(() => {
    setShowTooFastWarning(false);
    triggerCelebration();
  }, [triggerCelebration]);

  // Gestion des versets visibles pour détecter la fin
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const visibleVerseNumbers = new Set(
      viewableItems
        .filter(item => item.isViewable)
        .map(item => (item.item as BibleVerse).verse)
    );

    // Vérifier si les derniers versets sont visibles
    const lastThree = lastThreeVersesRef.current;
    if (lastThree.length > 0) {
      const lastVersesVisible = lastThree.some(v => visibleVerseNumbers.has(v));

      if (lastVersesVisible) {
        setHasReachedEnd(true);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  }).current;

  // Détection de fin via onEndReached
  const handleEndReached = useCallback(() => {
    setHasReachedEnd(true);
  }, []);

  // Passer à la lecture suivante ou fermer
  const handleContinue = useCallback(() => {
    Animated.parallel([
      Animated.timing(celebrationOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationScale, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowCelebration(false);

      // Chercher la prochaine lecture non complétée
      const nextIndex = currentReadingIndex + 1;
      if (nextIndex < day.readings.length) {
        const isNextComplete = hasUserPlan && isReadingComplete(day.day, nextIndex);
        if (!isNextComplete) {
          setCurrentReadingIndex(nextIndex);
          return;
        }
      }

      // Si pas de lecture suivante, retourner à l'écran du jour
      navigation.goBack();
    });
  }, [celebrationOpacity, celebrationScale, currentReadingIndex, day.readings.length, day.day, hasUserPlan, isReadingComplete, navigation]);

  // Fermer (bouton X)
  const handleClose = useCallback(() => {
    if (showCelebration) {
      handleContinue();
      return;
    }
    navigation.goBack();
  }, [showCelebration, handleContinue, navigation]);

  // Navigation entre lectures
  const goToPreviousReading = useCallback(() => {
    if (currentReadingIndex > 0) {
      setCurrentReadingIndex(currentReadingIndex - 1);
    }
  }, [currentReadingIndex]);

  const goToNextReading = useCallback(() => {
    if (currentReadingIndex < day.readings.length - 1) {
      setCurrentReadingIndex(currentReadingIndex + 1);
    }
  }, [currentReadingIndex, day.readings.length]);

  const formatReading = (reading: ReadingPlanReading) => {
    if (reading.verseStart && reading.verseEnd) {
      return `${reading.bookName} ${reading.chapter}:${reading.verseStart}-${reading.verseEnd}`;
    }
    return `${reading.bookName} ${reading.chapter}`;
  };

  const renderVerse = useCallback(({ item }: { item: BibleVerse }) => {
    const highlightColor = getHighlightColor(item.verse);
    const isSelected = selectedVerses.includes(item.verse);

    return (
      <VerseCard
        verse={item}
        isSelected={isSelected}
        highlightColor={highlightColor}
        fontSize={currentFontSize}
        lineHeight={currentFontSize * 1.6}
        onPress={() => handleVerseSelect(item.verse)}
        onLongPress={() => handleVerseLongPress(item.verse)}
      />
    );
  }, [currentFontSize, selectedVerses, getHighlightColor, handleVerseSelect, handleVerseLongPress]);

  if (!currentReading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={colors.text.tertiary} />
          <Text style={styles.errorText}>Lecture non trouvée</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentReading.bookName} {currentReading.chapter}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentReading.bookName} {currentReading.chapter}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={colors.text.tertiary} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCurrentComplete = hasUserPlan && (hasCompleted || isReadingComplete(day.day, currentReadingIndex));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{currentReading.bookName} {currentReading.chapter}</Text>
          {currentReading.verseStart && currentReading.verseEnd && (
            <Text style={styles.headerSubtitle}>
              Versets {currentReading.verseStart}-{currentReading.verseEnd}
            </Text>
          )}
        </View>
        <View style={styles.fontControls}>
          <TouchableOpacity
            style={[styles.fontButton, !canDecrease && styles.fontButtonDisabled]}
            onPress={decrease}
            disabled={!canDecrease}
          >
            <Text style={[styles.fontButtonText, !canDecrease && styles.fontButtonTextDisabled]}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontButton, !canIncrease && styles.fontButtonDisabled]}
            onPress={increase}
            disabled={!canIncrease}
          >
            <Text style={[styles.fontButtonText, !canIncrease && styles.fontButtonTextDisabled]}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contextBanner}>
        <TouchableOpacity
          style={styles.versionButton}
          onPress={() => setShowVersionPicker(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="language" size={14} color={colors.primary} />
          <Text style={styles.versionButtonText}>{selectedVersion}</Text>
          <Ionicons name="chevron-down" size={12} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.contextDivider} />
        <Text style={styles.contextText}>
          {plan.title} - Jour {day.day}
        </Text>
        <Text style={styles.readingCounter}>
          {currentReadingIndex + 1}/{day.readings.length}
        </Text>
        {isCurrentComplete && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
            <Text style={styles.completedBadgeText}>Lu</Text>
          </View>
        )}
      </View>

      {day.readings.length > 1 && (
        <View style={styles.readingNav}>
          <TouchableOpacity
            style={[styles.navButton, currentReadingIndex === 0 && styles.navButtonDisabled]}
            onPress={goToPreviousReading}
            disabled={currentReadingIndex === 0}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={currentReadingIndex === 0 ? colors.text.tertiary : colors.primary}
            />
            <Text style={[styles.navButtonText, currentReadingIndex === 0 && styles.navButtonTextDisabled]}>
              Précédent
            </Text>
          </TouchableOpacity>

          <View style={styles.readingDotsContainer}>
            {day.readings.map((_, index) => {
              const isComplete = hasUserPlan && isReadingComplete(day.day, index);
              const isCurrent = index === currentReadingIndex;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.readingDot,
                    isCurrent && styles.readingDotCurrent,
                    isComplete && styles.readingDotComplete,
                  ]}
                  onPress={() => setCurrentReadingIndex(index)}
                >
                  {isComplete && <Ionicons name="checkmark" size={10} color="#fff" />}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.navButton, currentReadingIndex === day.readings.length - 1 && styles.navButtonDisabled]}
            onPress={goToNextReading}
            disabled={currentReadingIndex === day.readings.length - 1}
          >
            <Text style={[styles.navButtonText, currentReadingIndex === day.readings.length - 1 && styles.navButtonTextDisabled]}>
              Suivant
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentReadingIndex === day.readings.length - 1 ? colors.text.tertiary : colors.primary}
            />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={verses}
        renderItem={renderVerse}
        keyExtractor={(item) => item.verse.toString()}
        contentContainerStyle={styles.versesList}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />

      <VerseActions
        visible={selectedVerses.length > 0 && !showHighlightPicker}
        selectedCount={selectedVerses.length}
        onShare={handleShare}
        onAddNote={handleAddNote}
        onHighlight={() => setShowHighlightPicker(true)}
        onBookmark={handleBookmark}
        onCopy={handleCopy}
        onClear={clearSelection}
      />

      <VerseHighlightPicker
        visible={showHighlightPicker}
        recentColors={recentColors}
        onSelectColor={handleHighlight}
        onRemoveHighlight={handleRemoveHighlight}
        onClose={() => setShowHighlightPicker(false)}
      />

      <ReadingTimeBadge
        verses={verses}
        visible={!loading && verses.length > 0 && selectedVerses.length === 0 && !showHighlightPicker && !hasReachedEnd}
      />

      {!isCurrentComplete && hasReachedEnd && (
        <View style={styles.markAsReadContainer}>
          <TouchableOpacity
            style={styles.markAsReadButton}
            onPress={handleMarkAsRead}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
            <Text style={styles.markAsReadText}>Marquer comme lu</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Overlay de célébration */}
      {showCelebration && (
        <Animated.View
          style={[
            styles.celebrationOverlay,
            { opacity: celebrationOpacity }
          ]}
          pointerEvents="auto"
        >
          <ConfettiCannon
            ref={confettiRef}
            count={80}
            origin={{ x: SCREEN_WIDTH / 2, y: -10 }}
            autoStart={false}
            fadeOut={true}
            explosionSpeed={300}
            fallSpeed={3000}
            colors={[colors.primary, '#22c55e', '#fbbf24', '#ec4899', '#8b5cf6']}
          />

          <Animated.View
            style={[
              styles.celebrationContent,
              { transform: [{ scale: celebrationScale }] }
            ]}
          >
            <View style={styles.celebrationIcon}>
              <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
            </View>
            <Text style={styles.celebrationTitle}>Lecture terminée !</Text>
            <Text style={styles.celebrationSubtitle}>
              {formatReading(currentReading)}
            </Text>

            {currentReadingIndex < day.readings.length - 1 && (
              <Text style={styles.celebrationNextHint}>
                Lecture suivante: {formatReading(day.readings[currentReadingIndex + 1])}
              </Text>
            )}

            <TouchableOpacity
              style={styles.celebrationButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.celebrationButtonText}>
                {currentReadingIndex < day.readings.length - 1 ? 'Continuer' : 'Terminer'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}

      {/* Modal warning lecture trop rapide */}
      <Modal
        visible={showTooFastWarning}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTooFastWarning(false)}
      >
        <View style={styles.warningModalOverlay}>
          <View style={styles.warningModalContent}>
            <View style={styles.warningIcon}>
              <Ionicons name="alert-circle" size={40} color="#f59e0b" />
            </View>
            <Text style={styles.warningTitle}>Lecture rapide détectée</Text>
            <Text style={styles.warningText}>
              Vous semblez avoir terminé très rapidement. Prendre le temps de lire et méditer sur la Parole est important pour votre croissance spirituelle.
            </Text>
            <View style={styles.warningButtons}>
              <TouchableOpacity
                style={styles.warningButtonSecondary}
                onPress={() => setShowTooFastWarning(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.warningButtonSecondaryText}>Continuer à lire</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.warningButtonPrimary}
                onPress={handleConfirmRead}
                activeOpacity={0.8}
              >
                <Text style={styles.warningButtonPrimaryText}>Je confirme avoir lu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal sélection de version */}
      <BibleVersionPicker
        visible={showVersionPicker}
        currentVersion={selectedVersion}
        onSelectVersion={handleVersionChange}
        onClose={() => setShowVersionPicker(false)}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: themeFontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: themeFontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  fontControls: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  fontButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonText: {
    fontSize: themeFontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  fontButtonDisabled: {
    opacity: 0.5,
  },
  fontButtonTextDisabled: {
    color: colors.text.tertiary,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
  },
  contextText: {
    fontSize: themeFontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  readingCounter: {
    fontSize: themeFontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginLeft: spacing.xs,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#22c55e15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  completedBadgeText: {
    fontSize: themeFontSize.xs,
    fontFamily: fontFamily.semibold,
    color: '#22c55e',
  },
  readingNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: themeFontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  navButtonTextDisabled: {
    color: colors.text.tertiary,
  },
  readingDotsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  readingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.text.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readingDotCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  readingDotComplete: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  versesList: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  verseNumber: {
    width: 32,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textAlign: 'right',
    marginRight: spacing.sm,
  },
  verseText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  celebrationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  celebrationContent: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xxl,
    padding: spacing.xxl,
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    maxWidth: 320,
    zIndex: 1001,
  },
  celebrationIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22c55e15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  celebrationTitle: {
    fontSize: themeFontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  celebrationNextHint: {
    fontSize: themeFontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  celebrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  celebrationButtonText: {
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Version picker styles
  versionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  versionButtonText: {
    fontSize: themeFontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  contextDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.primary,
    opacity: 0.3,
    marginHorizontal: spacing.xs,
  },
  versionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  markAsReadContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.background,
    alignItems: 'center',
  },
  markAsReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  markAsReadText: {
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  warningModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  warningModalContent: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    maxWidth: 340,
    width: '100%',
  },
  warningIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  warningTitle: {
    fontSize: themeFontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  warningText: {
    fontSize: themeFontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  warningButtons: {
    width: '100%',
    gap: spacing.sm,
  },
  warningButtonSecondary: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  warningButtonSecondaryText: {
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  warningButtonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  warningButtonPrimaryText: {
    fontSize: themeFontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
