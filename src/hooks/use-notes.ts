import { useState, useEffect, useCallback, useMemo } from 'react';
import { Note, NoteCategory } from '../types';
import {
  initNotesDatabase,
  getAllNotes,
  createNote as createNoteDB,
  updateNote as updateNoteDB,
  deleteNote as deleteNoteDB,
  searchNotes,
  toggleNoteFavorite,
  getNotesStats,
  getPendingSyncNotes,
} from '../services/notes-database';

export interface CreateNoteInput {
  title: string;
  content: string;
  contentPlain: string;
  category: NoteCategory;
  linkedVerseRef?: string;
  linkedBookId?: string;
  linkedChapter?: number;
  isFavorite?: boolean;
}

export interface UseNotesOptions {
  category?: NoteCategory | 'all';
  searchQuery?: string;
  favoritesOnly?: boolean;
  limit?: number;
}

export interface NotesStats {
  total: number;
  favorites: number;
  withVerses: number;
  byCategory: Record<NoteCategory, number>;
}

export interface UseNotesReturn {
  notes: Note[];
  loading: boolean;
  error: Error | null;
  refreshing: boolean;
  stats: NotesStats;
  pendingSync: number;
  createNote: (input: CreateNoteInput) => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCategory: (category: NoteCategory | 'all') => void;
}

export function useNotes(options?: UseNotesOptions): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState(options?.searchQuery || '');
  const [category, setCategory] = useState<NoteCategory | 'all'>(options?.category || 'all');
  const [stats, setStats] = useState<NotesStats>({
    total: 0,
    favorites: 0,
    withVerses: 0,
    byCategory: {
      meditation: 0,
      predication: 0,
      etude: 0,
      priere: 0,
      personnel: 0,
    },
  });
  const [pendingSync, setPendingSync] = useState(0);

  const loadNotes = useCallback(async () => {
    try {
      await initNotesDatabase();

      let result: Note[];
      if (searchQuery.trim()) {
        result = await searchNotes(searchQuery, {
          filters: category !== 'all' ? { category } : undefined,
          limit: options?.limit,
        });
      } else {
        result = await getAllNotes({
          filters: {
            category: category !== 'all' ? category : undefined,
            isFavorite: options?.favoritesOnly ? true : undefined,
          },
          limit: options?.limit,
        });
      }

      setNotes(result);

      const statsData = await getNotesStats();
      setStats(statsData);

      const pending = await getPendingSyncNotes();
      setPendingSync(pending.length);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load notes'));
    }
  }, [searchQuery, category, options?.limit, options?.favoritesOnly]);

  useEffect(() => {
    setLoading(true);
    loadNotes().finally(() => setLoading(false));
  }, [loadNotes]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  }, [loadNotes]);

  const createNote = useCallback(async (input: CreateNoteInput): Promise<Note> => {
    const note = await createNoteDB({
      ...input,
      isFavorite: input.isFavorite || false,
    });
    await loadNotes();
    return note;
  }, [loadNotes]);

  const updateNote = useCallback(async (id: string, updates: Partial<Note>): Promise<Note> => {
    const note = await updateNoteDB(id, updates);
    await loadNotes();
    return note;
  }, [loadNotes]);

  const deleteNoteHandler = useCallback(async (id: string): Promise<void> => {
    await deleteNoteDB(id);
    await loadNotes();
  }, [loadNotes]);

  const toggleFavoriteHandler = useCallback(async (id: string): Promise<void> => {
    await toggleNoteFavorite(id);
    await loadNotes();
  }, [loadNotes]);

  return {
    notes,
    loading,
    error,
    refreshing,
    stats,
    pendingSync,
    createNote,
    updateNote,
    deleteNote: deleteNoteHandler,
    toggleFavorite: toggleFavoriteHandler,
    refresh,
    setSearchQuery,
    setCategory,
  };
}
