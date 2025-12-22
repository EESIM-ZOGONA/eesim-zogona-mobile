import { useMemo } from 'react';
import { BibleVerse } from '../types';

// Constantes pour le calcul du temps de lecture
// Moyenne de lecture : ~180-200 mots/min
// Pour une lecture méditative de la Bible : ~150 mots/min
const WORDS_PER_MINUTE = 180;
const AVG_WORDS_PER_VERSE = 25; // Estimation moyenne

export interface UseReadingTimeOptions {
  verses?: BibleVerse[];
  verseCount?: number;
  wordsPerMinute?: number;
}

export interface UseReadingTimeReturn {
  /** Temps de lecture estimé en minutes */
  minutes: number;
  /** Temps de lecture formaté (ex: "3 min", "< 1 min") */
  formatted: string;
  /** Temps de lecture formaté court (ex: "3", "1") */
  shortFormatted: string;
  /** Nombre total de mots */
  wordCount: number;
}

/**
 * Hook pour calculer le temps de lecture estimé
 * @param options - Options contenant les versets ou le nombre de versets
 * @returns Objet avec le temps estimé en minutes et formaté
 */
export function useReadingTime(options: UseReadingTimeOptions): UseReadingTimeReturn {
  const { verses, verseCount, wordsPerMinute = WORDS_PER_MINUTE } = options;

  return useMemo(() => {
    let totalWords = 0;

    if (verses && verses.length > 0) {
      // Calculer le nombre réel de mots à partir du texte des versets
      totalWords = verses.reduce((acc, verse) => {
        const words = verse.text.trim().split(/\s+/).length;
        return acc + words;
      }, 0);
    } else if (verseCount && verseCount > 0) {
      // Estimation basée sur le nombre de versets
      totalWords = verseCount * AVG_WORDS_PER_VERSE;
    }

    const minutes = Math.max(1, Math.ceil(totalWords / wordsPerMinute));

    return {
      minutes,
      formatted: minutes === 1 ? '1 min' : `${minutes} min`,
      shortFormatted: minutes.toString(),
      wordCount: totalWords,
    };
  }, [verses, verseCount, wordsPerMinute]);
}

/**
 * Fonction utilitaire pour calculer le temps de lecture sans hook
 * Utile pour les calculs ponctuels hors composants
 */
export function calculateReadingTime(
  versesOrCount: BibleVerse[] | number,
  wordsPerMinute: number = WORDS_PER_MINUTE
): UseReadingTimeReturn {
  let totalWords = 0;

  if (typeof versesOrCount === 'number') {
    totalWords = versesOrCount * AVG_WORDS_PER_VERSE;
  } else if (Array.isArray(versesOrCount) && versesOrCount.length > 0) {
    totalWords = versesOrCount.reduce((acc, verse) => {
      const words = verse.text.trim().split(/\s+/).length;
      return acc + words;
    }, 0);
  }

  const minutes = Math.max(1, Math.ceil(totalWords / wordsPerMinute));

  return {
    minutes,
    formatted: minutes === 1 ? '1 min' : `${minutes} min`,
    shortFormatted: minutes.toString(),
    wordCount: totalWords,
  };
}
