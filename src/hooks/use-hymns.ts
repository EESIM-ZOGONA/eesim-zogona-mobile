import { useState, useEffect, useCallback } from 'react';
import { File } from 'expo-file-system/next';
import { Asset } from 'expo-asset';
import {
  initHymnsDatabase,
  getAllHymns,
  getHymnById,
  searchHymns,
  getFavoriteHymns,
  toggleHymnFavorite,
  getRecentlyPlayedHymns,
  addToHistory,
  isHymnsDataLoaded,
  importHymnsFromSQL,
  type Hymn,
  type HymnWithDetails,
  type HymnSearchResult,
} from '../services/hymns-database';

export type { Hymn, HymnWithDetails, HymnSearchResult };

export interface UseHymnsReturn {
  hymns: Hymn[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  search: (query: string) => Promise<void>;
  searchResults: HymnSearchResult[];
  isSearching: boolean;
  getHymn: (id: string) => Promise<HymnWithDetails | null>;
  favorites: Hymn[];
  toggleFavorite: (hymnId: string) => Promise<boolean>;
  recentlyPlayed: Hymn[];
  addToRecentlyPlayed: (hymnId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export function useHymns(): UseHymnsReturn {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [favorites, setFavorites] = useState<Hymn[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Hymn[]>([]);
  const [searchResults, setSearchResults] = useState<HymnSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await initHymnsDatabase();

      const dataLoaded = await isHymnsDataLoaded();

      if (!dataLoaded) {
        const asset = Asset.fromModule(require('../../assets/data/cantiques_eesim_complet.sql'));
        await asset.downloadAsync();

        if (asset.localUri) {
          const file = new File(asset.localUri);
          const sqlContent = await file.text();
          await importHymnsFromSQL(sqlContent);
        }
      }

      const [allHymns, favHymns, recent] = await Promise.all([
        getAllHymns(),
        getFavoriteHymns(),
        getRecentlyPlayedHymns(10),
      ]);

      setHymns(allHymns);
      setFavorites(favHymns);
      setRecentlyPlayed(recent);
      setInitialized(true);
    } catch (err) {
      console.error('Error loading hymns:', err);
      setError('Erreur lors du chargement des cantiques');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await searchHymns(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const getHymn = useCallback(async (id: string): Promise<HymnWithDetails | null> => {
    try {
      return await getHymnById(id);
    } catch (err) {
      console.error('Error getting hymn:', err);
      return null;
    }
  }, []);

  const toggleFavorite = useCallback(async (hymnId: string): Promise<boolean> => {
    try {
      const isFavorite = await toggleHymnFavorite(hymnId);
      const updatedFavorites = await getFavoriteHymns();
      setFavorites(updatedFavorites);
      return isFavorite;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      return false;
    }
  }, []);

  const addToRecentlyPlayed = useCallback(async (hymnId: string) => {
    try {
      await addToHistory(hymnId);
      const recent = await getRecentlyPlayedHymns(10);
      setRecentlyPlayed(recent);
    } catch (err) {
      console.error('Error adding to history:', err);
    }
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const [allHymns, favHymns, recent] = await Promise.all([
        getAllHymns(),
        getFavoriteHymns(),
        getRecentlyPlayedHymns(10),
      ]);

      setHymns(allHymns);
      setFavorites(favHymns);
      setRecentlyPlayed(recent);
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  }, []);

  return {
    hymns,
    loading,
    error,
    initialized,
    search,
    searchResults,
    isSearching,
    getHymn,
    favorites,
    toggleFavorite,
    recentlyPlayed,
    addToRecentlyPlayed,
    refreshData,
  };
}
