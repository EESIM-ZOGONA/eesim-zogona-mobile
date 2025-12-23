import { useState, useEffect, useMemo, useCallback } from 'react';
import { File } from 'expo-file-system/next';
import { Asset } from 'expo-asset';
import { Meditation, MeditationCategory, MEDITATION_CATEGORIES } from '../types';
import {
  initMeditationsDatabase,
  getAllMeditations,
  getMeditationsByCategory,
  getMeditationOfTheDay,
  searchMeditations,
  isMeditationsDataLoaded,
  getMeditationsCount,
  importMeditationsFromSQL,
  clearMeditationsData,
} from '../services/meditations-database';

export type { Meditation, MeditationCategory } from '../types';

interface UseMeditationsOptions {
  category?: MeditationCategory;
  search?: string;
  page?: number;
  limit?: number;
  showAll?: boolean;
}

interface UseMeditationsReturn {
  meditations: Meditation[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  todayMeditation: Meditation | null;
  categories: { key: MeditationCategory; label: string; icon: string }[];
  totalCount: number;
  isDataLoaded: boolean;
  initialized: boolean;
}

const ITEMS_PER_PAGE = 10;

export function useMeditations(options?: UseMeditationsOptions): UseMeditationsReturn {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [todayMeditation, setTodayMeditation] = useState<Meditation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { category, search, limit = ITEMS_PER_PAGE, showAll = false } = options || {};

  // Initialize database and load data
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await initMeditationsDatabase();

      const count = await getMeditationsCount();
      // Force reload if we don't have all 210 meditations
      const needsReload = count < 200;

      if (needsReload) {
        // Clear existing data before importing all files
        await clearMeditationsData();

        // Load SQL files from assets
        const sqlFiles = [
          require('../../assets/data/meditations.sql'),
          require('../../assets/data/meditations-part2.sql'),
          require('../../assets/data/meditations-part3.sql'),
        ];

        for (const sqlModule of sqlFiles) {
          try {
            const asset = Asset.fromModule(sqlModule);
            await asset.downloadAsync();

            if (asset.localUri) {
              const file = new File(asset.localUri);
              const sqlContent = await file.text();
              await importMeditationsFromSQL(sqlContent);
            }
          } catch (err) {
            console.error('Error loading SQL file:', err);
          }
        }
      }

      const finalCount = await getMeditationsCount();
      setTotalCount(finalCount);
      setIsDataLoaded(finalCount > 0);

      // Load today's meditation
      const today = await getMeditationOfTheDay();
      setTodayMeditation(today);

      setInitialized(true);
    } catch (err) {
      console.error('Error initializing meditations database:', err);
      setError(err instanceof Error ? err : new Error('Failed to initialize database'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Load meditations based on filters
  const loadMeditations = useCallback(async (pageNum: number, append: boolean = false) => {
    if (!initialized) return;

    setLoading(true);
    setError(null);

    try {
      let results: Meditation[] = [];

      if (search && search.trim().length > 0) {
        // Search mode
        results = await searchMeditations(search, showAll ? undefined : pageNum * limit);
      } else if (category) {
        // Category filter mode
        results = await getMeditationsByCategory(
          category,
          showAll ? undefined : limit,
          showAll ? undefined : (pageNum - 1) * limit
        );
      } else {
        // All meditations
        results = await getAllMeditations(
          showAll ? undefined : limit,
          showAll ? undefined : (pageNum - 1) * limit
        );
      }

      if (append) {
        setMeditations(prev => [...prev, ...results]);
      } else {
        setMeditations(results);
      }

      // Check if there are more items
      if (!showAll) {
        const count = await getMeditationsCount();
        setHasMore(pageNum * limit < count);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading meditations:', err);
      setError(err instanceof Error ? err : new Error('Failed to load meditations'));
    } finally {
      setLoading(false);
    }
  }, [category, search, limit, showAll, initialized]);

  // Initial load and filter changes
  useEffect(() => {
    if (initialized) {
      setPage(1);
      loadMeditations(1, false);
    }
  }, [category, search, initialized, loadMeditations]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMeditations(nextPage, true);
    }
  }, [hasMore, loading, page, loadMeditations]);

  const refresh = useCallback(() => {
    setPage(1);
    loadMeditations(1, false);
  }, [loadMeditations]);

  const categories = useMemo(() => {
    return MEDITATION_CATEGORIES;
  }, []);

  return {
    meditations,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    todayMeditation,
    categories,
    totalCount,
    isDataLoaded,
    initialized,
  };
}

// Hook for featured meditations on home screen
export function useFeaturedMeditations(count: number = 5) {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        await initMeditationsDatabase();
        const loaded = await isMeditationsDataLoaded();
        if (loaded) {
          const results = await getAllMeditations(count, 0);
          setMeditations(results);
        }
      } catch (err) {
        console.error('Error loading featured meditations:', err);
        setError(err instanceof Error ? err : new Error('Failed to load meditations'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [count]);

  return { meditations, loading, error };
}
