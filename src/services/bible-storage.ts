import AsyncStorage from '@react-native-async-storage/async-storage';
import { VerseHighlight, VerseBookmark, HighlightColor } from '../types';
import { getVerseKey } from '../utils/verse-parser';

const STORAGE_KEYS = {
  HIGHLIGHTS: '@bible_highlights',
  BOOKMARKS: '@bible_bookmarks',
  FONT_SIZE: '@bible_font_size',
  RECENT_COLORS: '@bible_recent_colors',
  COLOR_USAGE: '@bible_color_usage',
} as const;

const DEFAULT_FONT_SIZE_INDEX = 2;
const ALL_COLORS: HighlightColor[] = ['yellow', 'green', 'red', 'pink', 'violet'];
const DEFAULT_RECENT_COLORS: HighlightColor[] = ['yellow', 'green', 'red', 'pink', 'violet'];

export async function getHighlights(): Promise<VerseHighlight[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting highlights:', error);
    return [];
  }
}

export async function getChapterHighlights(
  bookId: string,
  chapter: number
): Promise<Map<string, HighlightColor>> {
  try {
    const highlights = await getHighlights();
    const chapterHighlights = new Map<string, HighlightColor>();

    highlights
      .filter((h) => h.bookId === bookId && h.chapter === chapter)
      .forEach((h) => {
        const key = getVerseKey(h.bookId, h.chapter, h.verse);
        chapterHighlights.set(key, h.color);
      });

    return chapterHighlights;
  } catch (error) {
    console.error('Error getting chapter highlights:', error);
    return new Map();
  }
}

export async function addHighlights(
  bookId: string,
  chapter: number,
  verses: number[],
  color: HighlightColor
): Promise<void> {
  try {
    const highlights = await getHighlights();
    const now = new Date().toISOString();

    const filtered = highlights.filter(
      (h) => !(h.bookId === bookId && h.chapter === chapter && verses.includes(h.verse))
    );

    const newHighlights: VerseHighlight[] = verses.map((verse) => ({
      id: `${bookId}-${chapter}-${verse}-${Date.now()}`,
      bookId,
      chapter,
      verse,
      color,
      createdAt: now,
    }));

    await AsyncStorage.setItem(
      STORAGE_KEYS.HIGHLIGHTS,
      JSON.stringify([...filtered, ...newHighlights])
    );

    await updateRecentColors(color);
  } catch (error) {
    console.error('Error adding highlights:', error);
    throw error;
  }
}

export async function removeHighlights(
  bookId: string,
  chapter: number,
  verses: number[]
): Promise<void> {
  try {
    const highlights = await getHighlights();
    const filtered = highlights.filter(
      (h) => !(h.bookId === bookId && h.chapter === chapter && verses.includes(h.verse))
    );
    await AsyncStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing highlights:', error);
    throw error;
  }
}

export async function getBookmarks(): Promise<VerseBookmark[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
}

export async function isVerseBookmarked(
  bookId: string,
  chapter: number,
  verse: number
): Promise<boolean> {
  const bookmarks = await getBookmarks();
  return bookmarks.some(
    (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse
  );
}

export async function addBookmark(
  bookmark: Omit<VerseBookmark, 'id' | 'createdAt'>
): Promise<VerseBookmark> {
  try {
    const bookmarks = await getBookmarks();

    const existing = bookmarks.find(
      (b) =>
        b.bookId === bookmark.bookId &&
        b.chapter === bookmark.chapter &&
        b.verse === bookmark.verse
    );

    if (existing) {
      return existing;
    }

    const newBookmark: VerseBookmark = {
      ...bookmark,
      id: `${bookmark.bookId}-${bookmark.chapter}-${bookmark.verse}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      STORAGE_KEYS.BOOKMARKS,
      JSON.stringify([...bookmarks, newBookmark])
    );

    return newBookmark;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
}

export async function removeBookmark(id: string): Promise<void> {
  try {
    const bookmarks = await getBookmarks();
    const filtered = bookmarks.filter((b) => b.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
}

export async function removeBookmarkByVerse(
  bookId: string,
  chapter: number,
  verse: number
): Promise<void> {
  try {
    const bookmarks = await getBookmarks();
    const filtered = bookmarks.filter(
      (b) => !(b.bookId === bookId && b.chapter === chapter && b.verse === verse)
    );
    await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing bookmark by verse:', error);
    throw error;
  }
}

export async function getFontSizeIndex(): Promise<number> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FONT_SIZE);
    return data ? parseInt(data, 10) : DEFAULT_FONT_SIZE_INDEX;
  } catch (error) {
    console.error('Error getting font size:', error);
    return DEFAULT_FONT_SIZE_INDEX;
  }
}

export async function saveFontSizeIndex(index: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FONT_SIZE, index.toString());
  } catch (error) {
    console.error('Error saving font size:', error);
    throw error;
  }
}

export async function getColorUsage(): Promise<Record<HighlightColor, number>> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.COLOR_USAGE);
    if (data) {
      return JSON.parse(data);
    }
    const defaultUsage: Record<HighlightColor, number> = {
      yellow: 0,
      green: 0,
      red: 0,
      pink: 0,
      violet: 0,
    };
    return defaultUsage;
  } catch (error) {
    console.error('Error getting color usage:', error);
    return { yellow: 0, green: 0, red: 0, pink: 0, violet: 0 };
  }
}

export async function getRecentColors(): Promise<HighlightColor[]> {
  try {
    const usage = await getColorUsage();
    const sorted = ALL_COLORS.slice().sort((a, b) => usage[b] - usage[a]);
    return sorted;
  } catch (error) {
    console.error('Error getting recent colors:', error);
    return DEFAULT_RECENT_COLORS;
  }
}

export async function updateRecentColors(color: HighlightColor): Promise<void> {
  try {
    const usage = await getColorUsage();
    usage[color] = (usage[color] || 0) + 1;
    await AsyncStorage.setItem(STORAGE_KEYS.COLOR_USAGE, JSON.stringify(usage));
  } catch (error) {
    console.error('Error updating recent colors:', error);
    throw error;
  }
}

export async function clearAllBibleData(): Promise<void> {
  try {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.HIGHLIGHTS),
      AsyncStorage.removeItem(STORAGE_KEYS.BOOKMARKS),
      AsyncStorage.removeItem(STORAGE_KEYS.FONT_SIZE),
      AsyncStorage.removeItem(STORAGE_KEYS.RECENT_COLORS),
      AsyncStorage.removeItem(STORAGE_KEYS.COLOR_USAGE),
    ]);
  } catch (error) {
    console.error('Error clearing Bible data:', error);
    throw error;
  }
}
