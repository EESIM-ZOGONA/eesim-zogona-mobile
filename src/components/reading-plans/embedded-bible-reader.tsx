import React, { useState, useEffect, useCallback, useRef } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { colors, spacing, fontSize as themeFontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useFontSize } from '../../hooks';
import { getChapterVerses } from '../../services/bible-database';
import { BibleVerse } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Temps minimum de lecture en secondes
const MIN_READING_TIME_PER_VERSE = 2;
const MIN_TOTAL_READING_TIME = 10;

export interface EmbeddedBibleReaderProps {
  bookId: string;
  bookName: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
  onComplete: () => void;
  onClose: () => void;
  planTitle?: string;
  dayNumber?: number;
  isAlreadyComplete?: boolean;
}

export function EmbeddedBibleReader({
  bookId,
  bookName,
  chapter,
  verseStart,
  verseEnd,
  onComplete,
  onClose,
  planTitle,
  dayNumber,
  isAlreadyComplete = false,
}: EmbeddedBibleReaderProps) {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fontSize: currentFontSize, increase, decrease, canIncrease, canDecrease } = useFontSize();

  // État pour la détection de fin de lecture
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(isAlreadyComplete);
  const readingStartTime = useRef(Date.now());

  // Refs pour les callbacks
  const onCompleteRef = useRef(onComplete);
  const onCloseRef = useRef(onClose);
  onCompleteRef.current = onComplete;
  onCloseRef.current = onClose;

  // Animation pour l'overlay de célébration
  const celebrationOpacity = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.5)).current;

  // Référence pour le confetti
  const confettiRef = useRef<ConfettiCannon>(null);

  // Track des versets visibles
  const lastThreeVersesRef = useRef<number[]>([]);

  const loadVerses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allVerses = await getChapterVerses(bookId, chapter);

      if (!allVerses || allVerses.length === 0) {
        setError(`Chapitre ${chapter} non trouvé dans ${bookName}`);
        return;
      }

      const start = verseStart || 1;
      const end = verseEnd || allVerses.length;

      const filteredVerses = allVerses.filter(
        (v) => v.verse >= start && v.verse <= end
      );

      setVerses(filteredVerses);

      // Stocker les 3 derniers versets pour la détection de fin
      const lastThree = filteredVerses.slice(-3).map(v => v.verse);
      lastThreeVersesRef.current = lastThree;
    } catch (err) {
      setError('Erreur lors du chargement des versets');
      console.error('Bible load error:', err);
    } finally {
      setLoading(false);
    }
  }, [bookId, bookName, chapter, verseStart, verseEnd]);

  useEffect(() => {
    loadVerses();
  }, [loadVerses]);

  // Calcul du temps minimum requis
  const getMinReadingTime = useCallback(() => {
    const verseBasedTime = verses.length * MIN_READING_TIME_PER_VERSE;
    return Math.max(verseBasedTime, MIN_TOTAL_READING_TIME);
  }, [verses.length]);

  // Vérifier si l'utilisateur a passé assez de temps
  const hasSpentEnoughTime = useCallback(() => {
    const timeSpent = (Date.now() - readingStartTime.current) / 1000;
    return timeSpent >= getMinReadingTime();
  }, [getMinReadingTime]);

  // Déclencher la célébration
  const triggerCelebration = useCallback(() => {
    if (hasCompleted || showCelebration) return;

    setShowCelebration(true);
    setHasCompleted(true);

    // Appeler onComplete immédiatement
    onCompleteRef.current();

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
  }, [hasCompleted, showCelebration, celebrationOpacity, celebrationScale]);

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

  // Vérifier automatiquement si on peut compléter
  useEffect(() => {
    if (hasReachedEnd && !hasCompleted && !showCelebration && hasSpentEnoughTime()) {
      triggerCelebration();
    }
  }, [hasReachedEnd, hasCompleted, showCelebration, hasSpentEnoughTime, triggerCelebration]);

  // Fermer l'overlay et passer à la suite
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
      onCloseRef.current();
    });
  }, [celebrationOpacity, celebrationScale]);

  // Fermer (bouton X)
  const handleClose = useCallback(() => {
    if (showCelebration) {
      // Si célébration en cours, utiliser handleContinue
      handleContinue();
      return;
    }

    // Vérifier si on peut compléter avant de fermer
    if (!hasCompleted && hasReachedEnd && hasSpentEnoughTime()) {
      triggerCelebration();
    } else {
      onCloseRef.current();
    }
  }, [showCelebration, hasCompleted, hasReachedEnd, hasSpentEnoughTime, triggerCelebration, handleContinue]);

  const renderVerse = useCallback(({ item }: { item: BibleVerse }) => (
    <View style={styles.verseContainer}>
      <Text style={[styles.verseNumber, { fontSize: currentFontSize * 0.75 }]}>
        {item.verse}
      </Text>
      <Text style={[styles.verseText, { fontSize: currentFontSize, lineHeight: currentFontSize * 1.6 }]}>
        {item.text}
      </Text>
    </View>
  ), [currentFontSize]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={colors.text.tertiary} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
          {verseStart && verseEnd && (
            <Text style={styles.headerSubtitle}>
              Versets {verseStart}-{verseEnd}
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

      {planTitle && dayNumber && (
        <View style={styles.contextBanner}>
          <Ionicons name="book" size={14} color={colors.primary} />
          <Text style={styles.contextText}>
            {planTitle} • Jour {dayNumber}
          </Text>
          {(hasCompleted || isAlreadyComplete) && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
              <Text style={styles.completedBadgeText}>Lu</Text>
            </View>
          )}
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
      />

      {/* Indicateur de progression */}
      {!hasCompleted && !isAlreadyComplete && (
        <View style={styles.progressHint}>
          <Text style={styles.progressHintText}>
            {hasReachedEnd
              ? (hasSpentEnoughTime() ? 'Lecture terminée !' : 'Continuez votre lecture...')
              : 'Faites défiler jusqu\'à la fin'
            }
          </Text>
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
              {bookName} {chapter}
              {verseStart && verseEnd ? `:${verseStart}-${verseEnd}` : ''}
            </Text>
            <TouchableOpacity
              style={styles.celebrationButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.celebrationButtonText}>Continuer</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
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
  progressHint: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  progressHintText: {
    fontSize: themeFontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    textAlign: 'center',
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
    marginBottom: spacing.xl,
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
});
