import { useState, useEffect, useCallback } from 'react';
import {
  AppSettings,
  UserPreferences,
  getSettings,
  updateSettings,
  getUserPreferences,
  updateUserPreferences,
  addFavoriteHymn,
  removeFavoriteHymn,
  addRecentSearch,
  updateQuizHighScore,
  updateLastReadBible,
  resetSettings,
  resetPreferences,
} from '../services/settings-database';

interface UseSettingsReturn {
  settings: AppSettings | null;
  isLoading: boolean;
  error: Error | null;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;
  updateMultipleSettings: (updates: Partial<AppSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await getSettings();
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = useCallback(async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    try {
      const updated = await updateSettings({ [key]: value });
      setSettings(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update setting'));
      throw err;
    }
  }, []);

  const updateMultipleSettings = useCallback(async (updates: Partial<AppSettings>) => {
    try {
      const updated = await updateSettings(updates);
      setSettings(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update settings'));
      throw err;
    }
  }, []);

  const resetToDefaults = useCallback(async () => {
    try {
      const defaultSettings = await resetSettings();
      setSettings(defaultSettings);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to reset settings'));
      throw err;
    }
  }, []);

  return {
    settings,
    isLoading,
    error,
    updateSetting,
    updateMultipleSettings,
    resetToDefaults,
  };
}

interface UseUserPreferencesReturn {
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: Error | null;
  toggleFavoriteHymn: (hymnId: string) => Promise<void>;
  isFavoriteHymn: (hymnId: string) => boolean;
  addSearch: (query: string) => Promise<void>;
  updateHighScore: (quizId: string, score: number) => Promise<void>;
  getHighScore: (quizId: string) => number;
  updateLastRead: (bookId: string, chapter: number) => Promise<void>;
  resetPrefs: () => Promise<void>;
}

export function useUserPreferences(): UseUserPreferencesReturn {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setIsLoading(true);
      const data = await getUserPreferences();
      setPreferences(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load preferences'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavoriteHymn = useCallback(async (hymnId: string) => {
    if (!preferences) return;
    try {
      if (preferences.favoriteHymnIds.includes(hymnId)) {
        await removeFavoriteHymn(hymnId);
        setPreferences(prev => prev ? {
          ...prev,
          favoriteHymnIds: prev.favoriteHymnIds.filter(id => id !== hymnId),
        } : null);
      } else {
        await addFavoriteHymn(hymnId);
        setPreferences(prev => prev ? {
          ...prev,
          favoriteHymnIds: [...prev.favoriteHymnIds, hymnId],
        } : null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to toggle favorite'));
      throw err;
    }
  }, [preferences]);

  const isFavoriteHymn = useCallback((hymnId: string): boolean => {
    return preferences?.favoriteHymnIds.includes(hymnId) ?? false;
  }, [preferences?.favoriteHymnIds]);

  const addSearch = useCallback(async (query: string) => {
    try {
      await addRecentSearch(query);
      setPreferences(prev => {
        if (!prev) return null;
        const searches = prev.recentSearches.filter(s => s !== query);
        searches.unshift(query);
        return {
          ...prev,
          recentSearches: searches.slice(0, 10),
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add search'));
    }
  }, []);

  const updateHighScore = useCallback(async (quizId: string, score: number) => {
    try {
      await updateQuizHighScore(quizId, score);
      setPreferences(prev => {
        if (!prev) return null;
        const currentHigh = prev.quizHighScores[quizId] || 0;
        if (score > currentHigh) {
          return {
            ...prev,
            quizHighScores: {
              ...prev.quizHighScores,
              [quizId]: score,
            },
          };
        }
        return prev;
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update high score'));
    }
  }, []);

  const getHighScore = useCallback((quizId: string): number => {
    return preferences?.quizHighScores[quizId] ?? 0;
  }, [preferences?.quizHighScores]);

  const updateLastRead = useCallback(async (bookId: string, chapter: number) => {
    try {
      await updateLastReadBible(bookId, chapter);
      setPreferences(prev => prev ? {
        ...prev,
        lastReadBibleBook: bookId,
        lastReadBibleChapter: chapter,
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update last read'));
    }
  }, []);

  const resetPrefs = useCallback(async () => {
    try {
      const defaultPrefs = await resetPreferences();
      setPreferences(defaultPrefs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to reset preferences'));
      throw err;
    }
  }, []);

  return {
    preferences,
    isLoading,
    error,
    toggleFavoriteHymn,
    isFavoriteHymn,
    addSearch,
    updateHighScore,
    getHighScore,
    updateLastRead,
    resetPrefs,
  };
}
