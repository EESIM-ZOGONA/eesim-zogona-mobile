import { useState, useEffect, useCallback, useMemo } from 'react';
import { VerseBookmark } from '../types';
import {
  getBookmarks,
  addBookmark as addBookmarkStorage,
  removeBookmark as removeBookmarkStorage,
  removeBookmarkByVerse,
} from '../services/bible-storage';

export interface UseVerseBookmarksReturn {
  bookmarks: VerseBookmark[];
  addBookmark: (bookmark: Omit<VerseBookmark, 'id' | 'createdAt'>) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  toggleBookmark: (bookmark: Omit<VerseBookmark, 'id' | 'createdAt'>) => Promise<boolean>;
  isBookmarked: (bookId: string, chapter: number, verse: number) => boolean;
  getBookmark: (bookId: string, chapter: number, verse: number) => VerseBookmark | undefined;
  loading: boolean;
  refreshBookmarks: () => Promise<void>;
}

export function useVerseBookmarks(): UseVerseBookmarksReturn {
  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const bookmarkMap = useMemo(() => {
    const map = new Map<string, VerseBookmark>();
    bookmarks.forEach((b) => {
      const key = `${b.bookId}-${b.chapter}-${b.verse}`;
      map.set(key, b);
    });
    return map;
  }, [bookmarks]);

  const loadBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const addBookmark = useCallback(
    async (bookmark: Omit<VerseBookmark, 'id' | 'createdAt'>) => {
      try {
        const newBookmark = await addBookmarkStorage(bookmark);
        setBookmarks((prev) => [...prev, newBookmark]);
      } catch (error) {
        console.error('Error adding bookmark:', error);
        throw error;
      }
    },
    []
  );

  const removeBookmark = useCallback(async (id: string) => {
    try {
      await removeBookmarkStorage(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }, []);

  const toggleBookmark = useCallback(
    async (bookmark: Omit<VerseBookmark, 'id' | 'createdAt'>): Promise<boolean> => {
      const key = `${bookmark.bookId}-${bookmark.chapter}-${bookmark.verse}`;
      const existing = bookmarkMap.get(key);

      if (existing) {
        await removeBookmarkByVerse(bookmark.bookId, bookmark.chapter, bookmark.verse);
        setBookmarks((prev) =>
          prev.filter(
            (b) =>
              !(
                b.bookId === bookmark.bookId &&
                b.chapter === bookmark.chapter &&
                b.verse === bookmark.verse
              )
          )
        );
        return false; // Was bookmarked, now removed
      } else {
        const newBookmark = await addBookmarkStorage(bookmark);
        setBookmarks((prev) => [...prev, newBookmark]);
        return true; // Was not bookmarked, now added
      }
    },
    [bookmarkMap]
  );

  const isBookmarked = useCallback(
    (bookId: string, chapter: number, verse: number): boolean => {
      const key = `${bookId}-${chapter}-${verse}`;
      return bookmarkMap.has(key);
    },
    [bookmarkMap]
  );

  const getBookmark = useCallback(
    (bookId: string, chapter: number, verse: number): VerseBookmark | undefined => {
      const key = `${bookId}-${chapter}-${verse}`;
      return bookmarkMap.get(key);
    },
    [bookmarkMap]
  );

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    getBookmark,
    loading,
    refreshBookmarks: loadBookmarks,
  };
}
