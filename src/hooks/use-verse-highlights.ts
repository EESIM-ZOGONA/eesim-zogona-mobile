import { useState, useEffect, useCallback } from 'react';
import { HighlightColor } from '../types';
import {
  getChapterHighlights,
  addHighlights,
  removeHighlights,
  getRecentColors,
} from '../services/bible-storage';
import { getVerseKey } from '../utils/verse-parser';

export interface UseVerseHighlightsOptions {
  bookId: string;
  chapter: number;
}

export interface UseVerseHighlightsReturn {
  highlights: Map<string, HighlightColor>;
  recentColors: HighlightColor[];
  addHighlight: (verses: number[], color: HighlightColor) => Promise<void>;
  removeHighlight: (verses: number[]) => Promise<void>;
  getHighlightColor: (verse: number) => HighlightColor | null;
  loading: boolean;
  refreshHighlights: () => Promise<void>;
}

export function useVerseHighlights({
  bookId,
  chapter,
}: UseVerseHighlightsOptions): UseVerseHighlightsReturn {
  const [highlights, setHighlights] = useState<Map<string, HighlightColor>>(new Map());
  const [recentColors, setRecentColors] = useState<HighlightColor[]>(['yellow', 'green', 'blue']);
  const [loading, setLoading] = useState(true);

  const loadHighlights = useCallback(async () => {
    try {
      setLoading(true);
      const [chapterHighlights, colors] = await Promise.all([
        getChapterHighlights(bookId, chapter),
        getRecentColors(),
      ]);
      setHighlights(chapterHighlights);
      setRecentColors(colors);
    } catch (error) {
      console.error('Error loading highlights:', error);
    } finally {
      setLoading(false);
    }
  }, [bookId, chapter]);

  useEffect(() => {
    loadHighlights();
  }, [loadHighlights]);

  const addHighlight = useCallback(
    async (verses: number[], color: HighlightColor) => {
      try {
        await addHighlights(bookId, chapter, verses, color);

        setHighlights((prev) => {
          const updated = new Map(prev);
          verses.forEach((verse) => {
            const key = getVerseKey(bookId, chapter, verse);
            updated.set(key, color);
          });
          return updated;
        });

        setRecentColors((prev) => {
          const filtered = prev.filter((c) => c !== color);
          return [color, ...filtered].slice(0, 3);
        });
      } catch (error) {
        console.error('Error adding highlight:', error);
        throw error;
      }
    },
    [bookId, chapter]
  );

  const removeHighlight = useCallback(
    async (verses: number[]) => {
      try {
        await removeHighlights(bookId, chapter, verses);

        setHighlights((prev) => {
          const updated = new Map(prev);
          verses.forEach((verse) => {
            const key = getVerseKey(bookId, chapter, verse);
            updated.delete(key);
          });
          return updated;
        });
      } catch (error) {
        console.error('Error removing highlight:', error);
        throw error;
      }
    },
    [bookId, chapter]
  );

  const getHighlightColor = useCallback(
    (verse: number): HighlightColor | null => {
      const key = getVerseKey(bookId, chapter, verse);
      return highlights.get(key) || null;
    },
    [bookId, chapter, highlights]
  );

  return {
    highlights,
    recentColors,
    addHighlight,
    removeHighlight,
    getHighlightColor,
    loading,
    refreshHighlights: loadHighlights,
  };
}
