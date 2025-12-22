import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BibleBook, BibleVerse } from '../types';

import lsgData from '../../assets/bible/lsg-bible.json';
import pdvData from '../../assets/bible/pdv-bible.json';
import semData from '../../assets/bible/sem-bible.json';
import bfcData from '../../assets/bible/bfc-bible.json';
import ostData from '../../assets/bible/ost-bible.json';
import drbData from '../../assets/bible/drb-bible.json';
import mrtData from '../../assets/bible/mrt-bible.json';

export type BibleVersionCode = 'LSG' | 'PDV' | 'SEM' | 'BFC' | 'OST' | 'DRB' | 'MRT';

export interface BibleVersion {
  code: BibleVersionCode;
  name: string;
  shortName: string;
}

export const BIBLE_VERSIONS: BibleVersion[] = [
  { code: 'LSG', name: 'Louis Segond 1910', shortName: 'LSG' },
  { code: 'OST', name: 'Ostervald 1996', shortName: 'OST' },
  { code: 'DRB', name: 'Darby', shortName: 'DRB' },
  { code: 'MRT', name: 'Martin 1744', shortName: 'MRT' },
  { code: 'SEM', name: 'Bible du Semeur', shortName: 'SEM' },
  { code: 'PDV', name: 'Parole de Vie', shortName: 'PDV' },
  { code: 'BFC', name: 'Français Courant', shortName: 'BFC' },
];

type BibleData = {
  books: Array<{
    id: string;
    chapters: Array<{
      chapter: number;
      verses: Array<{ v: number; t: string }>;
    }>;
  }>;
};

const VERSION_DATA: Record<BibleVersionCode, BibleData> = {
  LSG: lsgData as BibleData,
  PDV: pdvData as BibleData,
  SEM: semData as BibleData,
  BFC: bfcData as BibleData,
  OST: ostData as BibleData,
  DRB: drbData as BibleData,
  MRT: mrtData as BibleData,
};

const DATABASE_NAME = 'bible_multi.db';
const STORAGE_KEY_VERSION = '@bible_selected_version';

let db: SQLite.SQLiteDatabase | null = null;
let isInitialized = false;
let initPromise: Promise<void> | null = null;
let currentVersion: BibleVersionCode = 'LSG';

export interface BibleSearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

const BIBLE_BOOKS: Array<{
  id: string;
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'old' | 'new';
  order: number;
}> = [
  { id: 'gen', name: 'Genèse', abbrev: 'Gen', chapters: 50, testament: 'old', order: 1 },
  { id: 'exo', name: 'Exode', abbrev: 'Exo', chapters: 40, testament: 'old', order: 2 },
  { id: 'lev', name: 'Lévitique', abbrev: 'Lév', chapters: 27, testament: 'old', order: 3 },
  { id: 'num', name: 'Nombres', abbrev: 'Nom', chapters: 36, testament: 'old', order: 4 },
  { id: 'deu', name: 'Deutéronome', abbrev: 'Deu', chapters: 34, testament: 'old', order: 5 },
  { id: 'jos', name: 'Josué', abbrev: 'Jos', chapters: 24, testament: 'old', order: 6 },
  { id: 'jdg', name: 'Juges', abbrev: 'Jug', chapters: 21, testament: 'old', order: 7 },
  { id: 'rut', name: 'Ruth', abbrev: 'Rut', chapters: 4, testament: 'old', order: 8 },
  { id: '1sa', name: '1 Samuel', abbrev: '1Sa', chapters: 31, testament: 'old', order: 9 },
  { id: '2sa', name: '2 Samuel', abbrev: '2Sa', chapters: 24, testament: 'old', order: 10 },
  { id: '1ki', name: '1 Rois', abbrev: '1Ro', chapters: 22, testament: 'old', order: 11 },
  { id: '2ki', name: '2 Rois', abbrev: '2Ro', chapters: 25, testament: 'old', order: 12 },
  { id: '1ch', name: '1 Chroniques', abbrev: '1Ch', chapters: 29, testament: 'old', order: 13 },
  { id: '2ch', name: '2 Chroniques', abbrev: '2Ch', chapters: 36, testament: 'old', order: 14 },
  { id: 'ezr', name: 'Esdras', abbrev: 'Esd', chapters: 10, testament: 'old', order: 15 },
  { id: 'neh', name: 'Néhémie', abbrev: 'Néh', chapters: 13, testament: 'old', order: 16 },
  { id: 'est', name: 'Esther', abbrev: 'Est', chapters: 10, testament: 'old', order: 17 },
  { id: 'job', name: 'Job', abbrev: 'Job', chapters: 42, testament: 'old', order: 18 },
  { id: 'psa', name: 'Psaumes', abbrev: 'Ps', chapters: 150, testament: 'old', order: 19 },
  { id: 'pro', name: 'Proverbes', abbrev: 'Prov', chapters: 31, testament: 'old', order: 20 },
  { id: 'ecc', name: 'Ecclésiaste', abbrev: 'Ecc', chapters: 12, testament: 'old', order: 21 },
  { id: 'sng', name: 'Cantique des Cantiques', abbrev: 'Cant', chapters: 8, testament: 'old', order: 22 },
  { id: 'isa', name: 'Ésaïe', abbrev: 'Esa', chapters: 66, testament: 'old', order: 23 },
  { id: 'jer', name: 'Jérémie', abbrev: 'Jér', chapters: 52, testament: 'old', order: 24 },
  { id: 'lam', name: 'Lamentations', abbrev: 'Lam', chapters: 5, testament: 'old', order: 25 },
  { id: 'ezk', name: 'Ézéchiel', abbrev: 'Ezé', chapters: 48, testament: 'old', order: 26 },
  { id: 'dan', name: 'Daniel', abbrev: 'Dan', chapters: 12, testament: 'old', order: 27 },
  { id: 'hos', name: 'Osée', abbrev: 'Osé', chapters: 14, testament: 'old', order: 28 },
  { id: 'jol', name: 'Joël', abbrev: 'Joë', chapters: 3, testament: 'old', order: 29 },
  { id: 'amo', name: 'Amos', abbrev: 'Amo', chapters: 9, testament: 'old', order: 30 },
  { id: 'oba', name: 'Abdias', abbrev: 'Abd', chapters: 1, testament: 'old', order: 31 },
  { id: 'jon', name: 'Jonas', abbrev: 'Jon', chapters: 4, testament: 'old', order: 32 },
  { id: 'mic', name: 'Michée', abbrev: 'Mic', chapters: 7, testament: 'old', order: 33 },
  { id: 'nam', name: 'Nahum', abbrev: 'Nah', chapters: 3, testament: 'old', order: 34 },
  { id: 'hab', name: 'Habacuc', abbrev: 'Hab', chapters: 3, testament: 'old', order: 35 },
  { id: 'zep', name: 'Sophonie', abbrev: 'Sop', chapters: 3, testament: 'old', order: 36 },
  { id: 'hag', name: 'Aggée', abbrev: 'Agg', chapters: 2, testament: 'old', order: 37 },
  { id: 'zec', name: 'Zacharie', abbrev: 'Zac', chapters: 14, testament: 'old', order: 38 },
  { id: 'mal', name: 'Malachie', abbrev: 'Mal', chapters: 4, testament: 'old', order: 39 },
  { id: 'mat', name: 'Matthieu', abbrev: 'Matt', chapters: 28, testament: 'new', order: 40 },
  { id: 'mrk', name: 'Marc', abbrev: 'Marc', chapters: 16, testament: 'new', order: 41 },
  { id: 'luk', name: 'Luc', abbrev: 'Luc', chapters: 24, testament: 'new', order: 42 },
  { id: 'jhn', name: 'Jean', abbrev: 'Jean', chapters: 21, testament: 'new', order: 43 },
  { id: 'act', name: 'Actes', abbrev: 'Act', chapters: 28, testament: 'new', order: 44 },
  { id: 'rom', name: 'Romains', abbrev: 'Rom', chapters: 16, testament: 'new', order: 45 },
  { id: '1co', name: '1 Corinthiens', abbrev: '1Co', chapters: 16, testament: 'new', order: 46 },
  { id: '2co', name: '2 Corinthiens', abbrev: '2Co', chapters: 13, testament: 'new', order: 47 },
  { id: 'gal', name: 'Galates', abbrev: 'Gal', chapters: 6, testament: 'new', order: 48 },
  { id: 'eph', name: 'Éphésiens', abbrev: 'Éph', chapters: 6, testament: 'new', order: 49 },
  { id: 'php', name: 'Philippiens', abbrev: 'Phi', chapters: 4, testament: 'new', order: 50 },
  { id: 'col', name: 'Colossiens', abbrev: 'Col', chapters: 4, testament: 'new', order: 51 },
  { id: '1th', name: '1 Thessaloniciens', abbrev: '1Th', chapters: 5, testament: 'new', order: 52 },
  { id: '2th', name: '2 Thessaloniciens', abbrev: '2Th', chapters: 3, testament: 'new', order: 53 },
  { id: '1ti', name: '1 Timothée', abbrev: '1Ti', chapters: 6, testament: 'new', order: 54 },
  { id: '2ti', name: '2 Timothée', abbrev: '2Ti', chapters: 4, testament: 'new', order: 55 },
  { id: 'tit', name: 'Tite', abbrev: 'Tit', chapters: 3, testament: 'new', order: 56 },
  { id: 'phm', name: 'Philémon', abbrev: 'Phm', chapters: 1, testament: 'new', order: 57 },
  { id: 'heb', name: 'Hébreux', abbrev: 'Héb', chapters: 13, testament: 'new', order: 58 },
  { id: 'jas', name: 'Jacques', abbrev: 'Jac', chapters: 5, testament: 'new', order: 59 },
  { id: '1pe', name: '1 Pierre', abbrev: '1Pi', chapters: 5, testament: 'new', order: 60 },
  { id: '2pe', name: '2 Pierre', abbrev: '2Pi', chapters: 3, testament: 'new', order: 61 },
  { id: '1jn', name: '1 Jean', abbrev: '1Jn', chapters: 5, testament: 'new', order: 62 },
  { id: '2jn', name: '2 Jean', abbrev: '2Jn', chapters: 1, testament: 'new', order: 63 },
  { id: '3jn', name: '3 Jean', abbrev: '3Jn', chapters: 1, testament: 'new', order: 64 },
  { id: 'jud', name: 'Jude', abbrev: 'Jud', chapters: 1, testament: 'new', order: 65 },
  { id: 'rev', name: 'Apocalypse', abbrev: 'Apo', chapters: 22, testament: 'new', order: 66 },
];

const bookMap = new Map<string, typeof BIBLE_BOOKS[0]>();
BIBLE_BOOKS.forEach(book => bookMap.set(book.id, book));

export async function loadSavedVersion(): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY_VERSION);
    if (saved && BIBLE_VERSIONS.some(v => v.code === saved)) {
      currentVersion = saved as BibleVersionCode;
    }
  } catch (error) {
    console.error('Error loading saved version:', error);
  }
}

export async function setCurrentVersion(version: BibleVersionCode): Promise<void> {
  currentVersion = version;
  try {
    await AsyncStorage.setItem(STORAGE_KEY_VERSION, version);
  } catch (error) {
    console.error('Error saving version:', error);
  }
}

export function getCurrentVersion(): BibleVersionCode {
  return currentVersion;
}

export function getCurrentVersionInfo(): BibleVersion {
  return BIBLE_VERSIONS.find(v => v.code === currentVersion) || BIBLE_VERSIONS[0];
}

export async function initBibleDatabase(): Promise<void> {
  if (isInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    console.log('Initializing Bible database...');
    await loadSavedVersion();

    db = await SQLite.openDatabaseAsync(DATABASE_NAME);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        abbrev TEXT NOT NULL,
        chapters INTEGER NOT NULL,
        testament TEXT NOT NULL,
        book_order INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS verses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version TEXT NOT NULL,
        book_id TEXT NOT NULL,
        chapter INTEGER NOT NULL,
        verse INTEGER NOT NULL,
        text TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_verses_version_book_chapter
        ON verses(version, book_id, chapter);

      CREATE INDEX IF NOT EXISTS idx_verses_version_text
        ON verses(version, text);
    `);

    for (const version of BIBLE_VERSIONS) {
      const result = await db.getFirstAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM verses WHERE version = ?',
        [version.code]
      );

      if (!result || result.count === 0) {
        console.log(`Loading ${version.name}...`);
        await loadVersionData(version.code);
      }
    }

    const booksResult = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM books'
    );
    if (!booksResult || booksResult.count === 0) {
      for (const book of BIBLE_BOOKS) {
        await db.runAsync(
          'INSERT OR REPLACE INTO books (id, name, abbrev, chapters, testament, book_order) VALUES (?, ?, ?, ?, ?, ?)',
          [book.id, book.name, book.abbrev, book.chapters, book.testament, book.order]
        );
      }
    }

    isInitialized = true;
    console.log('Bible database ready!');
  })();

  return initPromise;
}

async function loadVersionData(versionCode: BibleVersionCode): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  const data = VERSION_DATA[versionCode];
  if (!data) return;

  await db.execAsync('BEGIN TRANSACTION');

  try {
    const stmt = await db.prepareAsync(
      'INSERT INTO verses (version, book_id, chapter, verse, text) VALUES ($version, $book_id, $chapter, $verse, $text)'
    );

    try {
      for (const book of data.books) {
        for (const chapter of book.chapters) {
          for (const verse of chapter.verses) {
            await stmt.executeAsync({
              $version: versionCode,
              $book_id: book.id,
              $chapter: chapter.chapter,
              $verse: verse.v,
              $text: verse.t,
            });
          }
        }
      }
    } finally {
      await stmt.finalizeAsync();
    }

    await db.execAsync('COMMIT');
    console.log(`${versionCode} loaded successfully`);
  } catch (error) {
    await db.execAsync('ROLLBACK');
    console.error(`Error loading ${versionCode}:`, error);
    throw error;
  }
}

export async function getAllBooks(): Promise<BibleBook[]> {
  return BIBLE_BOOKS.map(b => ({
    id: b.id,
    name: b.name,
    abbrev: b.abbrev,
    chapters: b.chapters,
    testament: b.testament,
  }));
}

export async function getBooksByTestament(testament: 'old' | 'new'): Promise<BibleBook[]> {
  return BIBLE_BOOKS
    .filter(b => b.testament === testament)
    .map(b => ({
      id: b.id,
      name: b.name,
      abbrev: b.abbrev,
      chapters: b.chapters,
      testament: b.testament,
    }));
}

export async function getBookById(bookId: string): Promise<BibleBook | null> {
  const book = bookMap.get(bookId);
  if (!book) return null;

  return {
    id: book.id,
    name: book.name,
    abbrev: book.abbrev,
    chapters: book.chapters,
    testament: book.testament,
  };
}

export async function getChapterVerses(
  bookId: string,
  chapter: number,
  version?: BibleVersionCode
): Promise<BibleVerse[]> {
  await initBibleDatabase();

  const v = version || currentVersion;
  const verses = await db!.getAllAsync<{
    verse: number;
    text: string;
  }>(
    'SELECT verse, text FROM verses WHERE version = ? AND book_id = ? AND chapter = ? ORDER BY verse',
    [v, bookId, chapter]
  );

  const book = bookMap.get(bookId);
  return verses.map(row => ({
    book: book?.name || bookId,
    chapter,
    verse: row.verse,
    text: row.text,
  }));
}

export async function searchVerses(query: string, limit: number = 50): Promise<BibleSearchResult[]> {
  await initBibleDatabase();

  const results = await db!.getAllAsync<{
    book_id: string;
    chapter: number;
    verse: number;
    text: string;
  }>(
    `SELECT book_id, chapter, verse, text FROM verses
     WHERE version = ? AND text LIKE ?
     LIMIT ?`,
    [currentVersion, `%${query}%`, limit]
  );

  return results.map(r => {
    const book = bookMap.get(r.book_id);
    return {
      bookId: r.book_id,
      bookName: book?.name || r.book_id,
      chapter: r.chapter,
      verse: r.verse,
      text: r.text,
    };
  });
}

export async function getRandomVerse(): Promise<BibleSearchResult | null> {
  await initBibleDatabase();

  const result = await db!.getFirstAsync<{
    book_id: string;
    chapter: number;
    verse: number;
    text: string;
  }>(
    `SELECT book_id, chapter, verse, text FROM verses
     WHERE version = ?
     ORDER BY RANDOM()
     LIMIT 1`,
    [currentVersion]
  );

  if (!result) return null;

  const book = bookMap.get(result.book_id);
  return {
    bookId: result.book_id,
    bookName: book?.name || result.book_id,
    chapter: result.chapter,
    verse: result.verse,
    text: result.text,
  };
}

export async function getDailyVerse(): Promise<BibleSearchResult> {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );

  const popularVerses = [
    { bookId: 'jhn', chapter: 3, verse: 16 },
    { bookId: 'psa', chapter: 23, verse: 1 },
    { bookId: 'php', chapter: 4, verse: 13 },
    { bookId: 'jer', chapter: 29, verse: 11 },
    { bookId: 'pro', chapter: 3, verse: 5 },
    { bookId: 'rom', chapter: 8, verse: 28 },
    { bookId: 'isa', chapter: 41, verse: 10 },
    { bookId: 'mat', chapter: 11, verse: 28 },
    { bookId: 'psa', chapter: 46, verse: 1 },
    { bookId: 'jos', chapter: 1, verse: 9 },
    { bookId: 'rom', chapter: 12, verse: 2 },
    { bookId: 'gal', chapter: 5, verse: 22 },
    { bookId: 'eph', chapter: 2, verse: 8 },
    { bookId: '1co', chapter: 13, verse: 4 },
    { bookId: 'heb', chapter: 11, verse: 1 },
    { bookId: 'psa', chapter: 119, verse: 105 },
    { bookId: 'mat', chapter: 6, verse: 33 },
    { bookId: 'col', chapter: 3, verse: 23 },
    { bookId: '2ti', chapter: 1, verse: 7 },
    { bookId: 'jas', chapter: 1, verse: 5 },
  ];

  const selectedVerse = popularVerses[dayOfYear % popularVerses.length];

  await initBibleDatabase();

  const result = await db!.getFirstAsync<{ text: string }>(
    'SELECT text FROM verses WHERE version = ? AND book_id = ? AND chapter = ? AND verse = ?',
    [currentVersion, selectedVerse.bookId, selectedVerse.chapter, selectedVerse.verse]
  );

  const book = bookMap.get(selectedVerse.bookId);

  return {
    bookId: selectedVerse.bookId,
    bookName: book?.name || selectedVerse.bookId,
    chapter: selectedVerse.chapter,
    verse: selectedVerse.verse,
    text: result?.text || 'Verset non disponible',
  };
}

export async function getVerseCount(version?: BibleVersionCode): Promise<number> {
  await initBibleDatabase();

  const v = version || currentVersion;
  const result = await db!.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM verses WHERE version = ?',
    [v]
  );
  return result?.count || 0;
}

export { BIBLE_BOOKS };
