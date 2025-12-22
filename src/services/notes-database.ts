/**
 * Notes Database Service
 * SQLite-based storage for notes with rich text support
 */

import * as SQLite from 'expo-sqlite';
import {
  StorageAdapter,
  QueryOptions,
  SearchOptions,
  SyncStatus,
  generateId,
  getCurrentTimestamp,
} from './storage/storage-adapter';
import { Note, NoteCategory } from '../types';

const DATABASE_NAME = 'eesim_notes.db';

let db: SQLite.SQLiteDatabase | null = null;
let isInitialized = false;

/**
 * Initialize the notes database
 */
export async function initNotesDatabase(): Promise<void> {
  if (isInitialized && db) return;

  db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      content_plain TEXT NOT NULL,
      category TEXT NOT NULL,
      linked_verse_ref TEXT,
      linked_book_id TEXT,
      linked_chapter INTEGER,
      is_favorite INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      sync_status TEXT DEFAULT 'local'
    );

    CREATE INDEX IF NOT EXISTS idx_notes_content_plain ON notes(content_plain);
    CREATE INDEX IF NOT EXISTS idx_notes_category ON notes(category);
    CREATE INDEX IF NOT EXISTS idx_notes_updated ON notes(updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_notes_sync ON notes(sync_status);
    CREATE INDEX IF NOT EXISTS idx_notes_favorite ON notes(is_favorite);
  `);

  isInitialized = true;
}

/**
 * Ensure database is initialized
 */
async function ensureDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db || !isInitialized) {
    await initNotesDatabase();
  }
  return db!;
}

/**
 * Convert database row to Note object
 */
function rowToNote(row: any): Note {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    contentPlain: row.content_plain,
    category: row.category as NoteCategory,
    linkedVerseRef: row.linked_verse_ref || undefined,
    linkedBookId: row.linked_book_id || undefined,
    linkedChapter: row.linked_chapter || undefined,
    isFavorite: row.is_favorite === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncStatus: row.sync_status as SyncStatus,
  };
}

/**
 * Create a new note
 */
export async function createNote(
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'>
): Promise<Note> {
  const database = await ensureDb();
  const id = generateId();
  const now = getCurrentTimestamp();

  await database.runAsync(
    `INSERT INTO notes (
      id, title, content, content_plain, category,
      linked_verse_ref, linked_book_id, linked_chapter,
      is_favorite, created_at, updated_at, sync_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      note.title,
      note.content,
      note.contentPlain,
      note.category,
      note.linkedVerseRef || null,
      note.linkedBookId || null,
      note.linkedChapter || null,
      note.isFavorite ? 1 : 0,
      now,
      now,
      'local',
    ]
  );

  return {
    ...note,
    id,
    createdAt: now,
    updatedAt: now,
    syncStatus: 'local',
  };
}

/**
 * Get a note by ID
 */
export async function getNoteById(id: string): Promise<Note | null> {
  const database = await ensureDb();
  const row = await database.getFirstAsync('SELECT * FROM notes WHERE id = ?', [id]);
  return row ? rowToNote(row) : null;
}

/**
 * Get all notes with optional filtering and pagination
 */
export async function getAllNotes(options?: QueryOptions): Promise<Note[]> {
  const database = await ensureDb();

  let query = 'SELECT * FROM notes';
  const params: any[] = [];
  const conditions: string[] = [];

  if (options?.filters) {
    if (options.filters.category && options.filters.category !== 'all') {
      conditions.push('category = ?');
      params.push(options.filters.category);
    }
    if (options.filters.isFavorite !== undefined) {
      conditions.push('is_favorite = ?');
      params.push(options.filters.isFavorite ? 1 : 0);
    }
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  const orderBy = options?.orderBy || 'updated_at';
  const orderDir = options?.orderDirection || 'desc';
  query += ` ORDER BY ${orderBy} ${orderDir.toUpperCase()}`;

  if (options?.limit) {
    query += ' LIMIT ?';
    params.push(options.limit);
  }

  if (options?.offset) {
    query += ' OFFSET ?';
    params.push(options.offset);
  }

  const rows = await database.getAllAsync(query, params);
  return rows.map(rowToNote);
}

/**
 * Update a note
 */
export async function updateNote(id: string, updates: Partial<Note>): Promise<Note> {
  const database = await ensureDb();
  const now = getCurrentTimestamp();

  const setClauses: string[] = ['updated_at = ?', 'sync_status = ?'];
  const params: any[] = [now, 'pending'];

  if (updates.title !== undefined) {
    setClauses.push('title = ?');
    params.push(updates.title);
  }
  if (updates.content !== undefined) {
    setClauses.push('content = ?');
    params.push(updates.content);
  }
  if (updates.contentPlain !== undefined) {
    setClauses.push('content_plain = ?');
    params.push(updates.contentPlain);
  }
  if (updates.category !== undefined) {
    setClauses.push('category = ?');
    params.push(updates.category);
  }
  if (updates.linkedVerseRef !== undefined) {
    setClauses.push('linked_verse_ref = ?');
    params.push(updates.linkedVerseRef || null);
  }
  if (updates.linkedBookId !== undefined) {
    setClauses.push('linked_book_id = ?');
    params.push(updates.linkedBookId || null);
  }
  if (updates.linkedChapter !== undefined) {
    setClauses.push('linked_chapter = ?');
    params.push(updates.linkedChapter || null);
  }
  if (updates.isFavorite !== undefined) {
    setClauses.push('is_favorite = ?');
    params.push(updates.isFavorite ? 1 : 0);
  }

  params.push(id);

  await database.runAsync(
    `UPDATE notes SET ${setClauses.join(', ')} WHERE id = ?`,
    params
  );

  const updated = await getNoteById(id);
  if (!updated) {
    throw new Error(`Note not found: ${id}`);
  }
  return updated;
}

/**
 * Delete a note
 */
export async function deleteNote(id: string): Promise<void> {
  const database = await ensureDb();
  await database.runAsync('DELETE FROM notes WHERE id = ?', [id]);
}

/**
 * Search notes by content
 */
export async function searchNotes(
  query: string,
  options?: SearchOptions
): Promise<Note[]> {
  const database = await ensureDb();

  const searchPattern = `%${query.toLowerCase()}%`;
  let sql = `
    SELECT * FROM notes
    WHERE LOWER(title) LIKE ? OR LOWER(content_plain) LIKE ?
  `;
  const params: any[] = [searchPattern, searchPattern];

  if (options?.filters?.category && options.filters.category !== 'all') {
    sql += ' AND category = ?';
    params.push(options.filters.category);
  }

  sql += ' ORDER BY updated_at DESC';

  if (options?.limit) {
    sql += ' LIMIT ?';
    params.push(options.limit);
  }

  const rows = await database.getAllAsync(sql, params);
  return rows.map(rowToNote);
}

/**
 * Get notes by category
 */
export async function getNotesByCategory(category: NoteCategory): Promise<Note[]> {
  return getAllNotes({ filters: { category } });
}

/**
 * Get notes linked to a specific verse reference
 */
export async function getNotesByVerseRef(
  bookId: string,
  chapter: number
): Promise<Note[]> {
  const database = await ensureDb();
  const rows = await database.getAllAsync(
    `SELECT * FROM notes
     WHERE linked_book_id = ? AND linked_chapter = ?
     ORDER BY updated_at DESC`,
    [bookId, chapter]
  );
  return rows.map(rowToNote);
}

/**
 * Toggle favorite status
 */
export async function toggleNoteFavorite(id: string): Promise<Note> {
  const note = await getNoteById(id);
  if (!note) {
    throw new Error(`Note not found: ${id}`);
  }
  return updateNote(id, { isFavorite: !note.isFavorite });
}

/**
 * Get notes statistics
 */
export async function getNotesStats(): Promise<{
  total: number;
  favorites: number;
  withVerses: number;
  byCategory: Record<NoteCategory, number>;
}> {
  const database = await ensureDb();

  const totalRow = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM notes'
  );
  const favRow = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM notes WHERE is_favorite = 1'
  );
  const verseRow = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM notes WHERE linked_verse_ref IS NOT NULL'
  );

  const categoryRows = await database.getAllAsync<{ category: string; count: number }>(
    'SELECT category, COUNT(*) as count FROM notes GROUP BY category'
  );

  const byCategory: Record<NoteCategory, number> = {
    meditation: 0,
    predication: 0,
    etude: 0,
    priere: 0,
    personnel: 0,
  };

  for (const row of categoryRows) {
    if (row.category in byCategory) {
      byCategory[row.category as NoteCategory] = row.count;
    }
  }

  return {
    total: totalRow?.count || 0,
    favorites: favRow?.count || 0,
    withVerses: verseRow?.count || 0,
    byCategory,
  };
}

/**
 * Get notes pending sync
 */
export async function getPendingSyncNotes(): Promise<Note[]> {
  const database = await ensureDb();
  const rows = await database.getAllAsync(
    "SELECT * FROM notes WHERE sync_status = 'pending' OR sync_status = 'local'"
  );
  return rows.map(rowToNote);
}

/**
 * Mark notes as synced
 */
export async function markNotesSynced(ids: string[]): Promise<void> {
  if (ids.length === 0) return;

  const database = await ensureDb();
  const placeholders = ids.map(() => '?').join(',');
  await database.runAsync(
    `UPDATE notes SET sync_status = 'synced' WHERE id IN (${placeholders})`,
    ids
  );
}

/**
 * Storage adapter implementation for Notes
 */
export const notesStorageAdapter: StorageAdapter<Note> = {
  getById: getNoteById,
  getAll: getAllNotes,
  create: createNote as any,
  update: updateNote,
  delete: deleteNote,
  search: searchNotes,
  getPendingSync: getPendingSyncNotes,
  markSynced: markNotesSynced,
};
