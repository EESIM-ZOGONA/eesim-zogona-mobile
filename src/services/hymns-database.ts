import * as SQLite from 'expo-sqlite';

const DB_NAME = 'eesim_hymns.db';

let db: SQLite.SQLiteDatabase | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
  }
  return db;
}

export async function initHymnsDatabase(): Promise<void> {
  const database = await getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS hymn_books (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      language TEXT DEFAULT 'fr',
      total_hymns INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hymns (
      id TEXT PRIMARY KEY,
      book_id TEXT NOT NULL,
      number INTEGER NOT NULL,
      title TEXT NOT NULL,
      author TEXT,
      composer TEXT,
      year INTEGER,
      key_signature TEXT,
      time_signature TEXT,
      tempo TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (book_id) REFERENCES hymn_books(id)
    );

    CREATE TABLE IF NOT EXISTS hymn_verses (
      id TEXT PRIMARY KEY,
      hymn_id TEXT NOT NULL,
      verse_number INTEGER NOT NULL,
      verse_type TEXT DEFAULT 'verse',
      content TEXT NOT NULL,
      FOREIGN KEY (hymn_id) REFERENCES hymns(id)
    );

    CREATE TABLE IF NOT EXISTS hymn_audio (
      id TEXT PRIMARY KEY,
      hymn_id TEXT NOT NULL,
      audio_type TEXT NOT NULL,
      url TEXT NOT NULL,
      duration_seconds INTEGER,
      file_size_bytes INTEGER,
      created_at TEXT NOT NULL,
      FOREIGN KEY (hymn_id) REFERENCES hymns(id)
    );

    CREATE TABLE IF NOT EXISTS hymn_favorites (
      id TEXT PRIMARY KEY,
      hymn_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (hymn_id) REFERENCES hymns(id)
    );

    CREATE TABLE IF NOT EXISTS hymn_history (
      id TEXT PRIMARY KEY,
      hymn_id TEXT NOT NULL,
      played_at TEXT NOT NULL,
      duration_played_seconds INTEGER,
      FOREIGN KEY (hymn_id) REFERENCES hymns(id)
    );

    CREATE TABLE IF NOT EXISTS playlists (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      cover_image_url TEXT,
      is_default INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS playlist_hymns (
      id TEXT PRIMARY KEY,
      playlist_id TEXT NOT NULL,
      hymn_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      added_at TEXT NOT NULL,
      FOREIGN KEY (playlist_id) REFERENCES playlists(id),
      FOREIGN KEY (hymn_id) REFERENCES hymns(id)
    );

    CREATE INDEX IF NOT EXISTS idx_hymns_book ON hymns(book_id);
    CREATE INDEX IF NOT EXISTS idx_hymns_number ON hymns(book_id, number);
    CREATE INDEX IF NOT EXISTS idx_hymns_title ON hymns(title);
    CREATE INDEX IF NOT EXISTS idx_hymn_verses_hymn ON hymn_verses(hymn_id);
    CREATE INDEX IF NOT EXISTS idx_hymn_audio_hymn ON hymn_audio(hymn_id);
    CREATE INDEX IF NOT EXISTS idx_hymn_favorites_hymn ON hymn_favorites(hymn_id);
    CREATE INDEX IF NOT EXISTS idx_hymn_history_hymn ON hymn_history(hymn_id);
    CREATE INDEX IF NOT EXISTS idx_hymn_history_date ON hymn_history(played_at DESC);
    CREATE INDEX IF NOT EXISTS idx_playlist_hymns_playlist ON playlist_hymns(playlist_id);
    CREATE INDEX IF NOT EXISTS idx_playlist_hymns_position ON playlist_hymns(playlist_id, position);
  `);
}

export interface HymnBook {
  id: string;
  name: string;
  description?: string;
  language: string;
  totalHymns: number;
  createdAt: string;
  updatedAt: string;
}

export interface Hymn {
  id: string;
  bookId: string;
  number: number;
  title: string;
  author?: string;
  composer?: string;
  year?: number;
  keySignature?: string;
  timeSignature?: string;
  tempo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HymnVerse {
  id: string;
  hymnId: string;
  verseNumber: number;
  verseType: 'verse' | 'chorus' | 'bridge' | 'intro' | 'outro';
  content: string;
}

export interface HymnAudio {
  id: string;
  hymnId: string;
  audioType: 'instrumental' | 'vocal' | 'choir' | 'organ';
  url: string;
  durationSeconds?: number;
  fileSizeBytes?: number;
  createdAt: string;
}

export interface HymnFavorite {
  id: string;
  hymnId: string;
  createdAt: string;
}

export interface HymnHistory {
  id: string;
  hymnId: string;
  playedAt: string;
  durationPlayedSeconds?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlaylistHymn {
  id: string;
  playlistId: string;
  hymnId: string;
  position: number;
  addedAt: string;
}

export interface HymnSearchResult extends Hymn {
  matchType: 'title' | 'number' | 'content';
  matchContext?: string;
  verseNumber?: number;
  verseType?: string;
}

export interface HymnWithDetails extends Hymn {
  verses: HymnVerse[];
  audioFiles: HymnAudio[];
  isFavorite: boolean;
  lyrics: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function getHymnBooks(): Promise<HymnBook[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(`
    SELECT * FROM hymn_books ORDER BY name
  `);

  return results.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    language: row.language,
    totalHymns: row.total_hymns,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function createHymnBook(book: Omit<HymnBook, 'id' | 'createdAt' | 'updatedAt'>): Promise<HymnBook> {
  const database = await getDatabase();
  const id = generateId();
  const now = new Date().toISOString();

  await database.runAsync(`
    INSERT INTO hymn_books (id, name, description, language, total_hymns, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, book.name, book.description || null, book.language, book.totalHymns, now, now]);

  return {
    id,
    ...book,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getHymnsByBook(bookId: string): Promise<Hymn[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(`
    SELECT * FROM hymns WHERE book_id = ? ORDER BY number
  `, [bookId]);

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    number: row.number,
    title: row.title,
    author: row.author,
    composer: row.composer,
    year: row.year,
    keySignature: row.key_signature,
    timeSignature: row.time_signature,
    tempo: row.tempo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function getHymnById(hymnId: string): Promise<HymnWithDetails | null> {
  const database = await getDatabase();

  const hymnRow = await database.getFirstAsync<any>(`
    SELECT * FROM hymns WHERE id = ?
  `, [hymnId]);

  if (!hymnRow) return null;

  const versesRows = await database.getAllAsync<any>(`
    SELECT * FROM hymn_verses WHERE hymn_id = ? ORDER BY verse_number
  `, [hymnId]);

  const audioRows = await database.getAllAsync<any>(`
    SELECT * FROM hymn_audio WHERE hymn_id = ?
  `, [hymnId]);

  const favoriteRow = await database.getFirstAsync<any>(`
    SELECT * FROM hymn_favorites WHERE hymn_id = ?
  `, [hymnId]);

  const verses = versesRows.map(row => ({
    id: row.id,
    hymnId: row.hymn_id,
    verseNumber: row.verse_number,
    verseType: row.verse_type as HymnVerse['verseType'],
    content: row.content,
  }));

  const lyrics = verses
    .map(v => {
      const label = v.verseType === 'chorus' ? 'REFRAIN' : `COUPLET ${v.verseNumber}`;
      return `${label}\n${v.content}`;
    })
    .join('\n\n');

  return {
    id: hymnRow.id,
    bookId: hymnRow.book_id,
    number: hymnRow.number,
    title: hymnRow.title,
    author: hymnRow.author,
    composer: hymnRow.composer,
    year: hymnRow.year,
    keySignature: hymnRow.key_signature,
    timeSignature: hymnRow.time_signature,
    tempo: hymnRow.tempo,
    createdAt: hymnRow.created_at,
    updatedAt: hymnRow.updated_at,
    verses,
    audioFiles: audioRows.map(row => ({
      id: row.id,
      hymnId: row.hymn_id,
      audioType: row.audio_type as HymnAudio['audioType'],
      url: row.url,
      durationSeconds: row.duration_seconds,
      fileSizeBytes: row.file_size_bytes,
      createdAt: row.created_at,
    })),
    isFavorite: !!favoriteRow,
    lyrics,
  };
}

export async function searchHymns(query: string, bookId?: string): Promise<HymnSearchResult[]> {
  const database = await getDatabase();
  const searchTerm = `%${query}%`;
  const queryNumber = parseInt(query) || -1;
  const queryLower = query.toLowerCase();

  let sql = `
    SELECT h.*, v.content as verse_content, v.verse_number, v.verse_type
    FROM hymns h
    LEFT JOIN hymn_verses v ON h.id = v.hymn_id
    WHERE (h.title LIKE ? OR h.number = ? OR v.content LIKE ?)
  `;
  const params: any[] = [searchTerm, queryNumber, searchTerm];

  if (bookId) {
    sql += ` AND h.book_id = ?`;
    params.push(bookId);
  }

  sql += ` ORDER BY h.number, v.verse_number`;

  const results = await database.getAllAsync<any>(sql, params);

  const hymnMap = new Map<string, HymnSearchResult>();

  for (const row of results) {
    if (hymnMap.has(row.id)) continue;

    let matchType: 'title' | 'number' | 'content' = 'title';
    let matchContext: string | undefined;
    let verseNumber: number | undefined;
    let verseType: string | undefined;

    if (row.number === queryNumber) {
      matchType = 'number';
    } else if (row.title.toLowerCase().includes(queryLower)) {
      matchType = 'title';
    } else if (row.verse_content?.toLowerCase().includes(queryLower)) {
      matchType = 'content';
      verseNumber = row.verse_number;
      verseType = row.verse_type;

      const content = row.verse_content as string;
      const index = content.toLowerCase().indexOf(queryLower);
      const start = Math.max(0, index - 30);
      const end = Math.min(content.length, index + query.length + 30);
      matchContext = (start > 0 ? '...' : '') +
                     content.slice(start, end).trim() +
                     (end < content.length ? '...' : '');
    }

    hymnMap.set(row.id, {
      id: row.id,
      bookId: row.book_id,
      number: row.number,
      title: row.title,
      author: row.author,
      composer: row.composer,
      year: row.year,
      keySignature: row.key_signature,
      timeSignature: row.time_signature,
      tempo: row.tempo,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      matchType,
      matchContext,
      verseNumber,
      verseType,
    });
  }

  return Array.from(hymnMap.values());
}

export async function createHymn(hymn: Omit<Hymn, 'id' | 'createdAt' | 'updatedAt'>, verses: Omit<HymnVerse, 'id' | 'hymnId'>[]): Promise<Hymn> {
  const database = await getDatabase();
  const hymnId = generateId();
  const now = new Date().toISOString();

  await database.runAsync(`
    INSERT INTO hymns (id, book_id, number, title, author, composer, year, key_signature, time_signature, tempo, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [hymnId, hymn.bookId, hymn.number, hymn.title, hymn.author || null, hymn.composer || null, hymn.year || null, hymn.keySignature || null, hymn.timeSignature || null, hymn.tempo || null, now, now]);

  for (const verse of verses) {
    const verseId = generateId();
    await database.runAsync(`
      INSERT INTO hymn_verses (id, hymn_id, verse_number, verse_type, content)
      VALUES (?, ?, ?, ?, ?)
    `, [verseId, hymnId, verse.verseNumber, verse.verseType, verse.content]);
  }

  await database.runAsync(`
    UPDATE hymn_books SET total_hymns = total_hymns + 1, updated_at = ? WHERE id = ?
  `, [now, hymn.bookId]);

  return {
    id: hymnId,
    ...hymn,
    createdAt: now,
    updatedAt: now,
  };
}

export async function toggleHymnFavorite(hymnId: string): Promise<boolean> {
  const database = await getDatabase();

  const existing = await database.getFirstAsync<any>(`
    SELECT id FROM hymn_favorites WHERE hymn_id = ?
  `, [hymnId]);

  if (existing) {
    await database.runAsync(`DELETE FROM hymn_favorites WHERE hymn_id = ?`, [hymnId]);
    return false;
  } else {
    const id = generateId();
    const now = new Date().toISOString();
    await database.runAsync(`
      INSERT INTO hymn_favorites (id, hymn_id, created_at) VALUES (?, ?, ?)
    `, [id, hymnId, now]);
    return true;
  }
}

export async function getFavoriteHymns(): Promise<Hymn[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(`
    SELECT h.* FROM hymns h
    INNER JOIN hymn_favorites f ON h.id = f.hymn_id
    ORDER BY f.created_at DESC
  `);

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    number: row.number,
    title: row.title,
    author: row.author,
    composer: row.composer,
    year: row.year,
    keySignature: row.key_signature,
    timeSignature: row.time_signature,
    tempo: row.tempo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function addToHistory(hymnId: string, durationPlayedSeconds?: number): Promise<void> {
  const database = await getDatabase();
  const id = generateId();
  const now = new Date().toISOString();

  await database.runAsync(`
    INSERT INTO hymn_history (id, hymn_id, played_at, duration_played_seconds)
    VALUES (?, ?, ?, ?)
  `, [id, hymnId, now, durationPlayedSeconds || null]);
}

export async function getRecentlyPlayedHymns(limit: number = 20): Promise<Hymn[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(`
    SELECT DISTINCT h.* FROM hymns h
    INNER JOIN hymn_history hist ON h.id = hist.hymn_id
    ORDER BY hist.played_at DESC
    LIMIT ?
  `, [limit]);

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    number: row.number,
    title: row.title,
    author: row.author,
    composer: row.composer,
    year: row.year,
    keySignature: row.key_signature,
    timeSignature: row.time_signature,
    tempo: row.tempo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function getPlaylists(): Promise<Playlist[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(`
    SELECT * FROM playlists ORDER BY is_default DESC, name
  `);

  return results.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    coverImageUrl: row.cover_image_url,
    isDefault: row.is_default === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function createPlaylist(playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): Promise<Playlist> {
  const database = await getDatabase();
  const id = generateId();
  const now = new Date().toISOString();

  await database.runAsync(`
    INSERT INTO playlists (id, name, description, cover_image_url, is_default, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, playlist.name, playlist.description || null, playlist.coverImageUrl || null, playlist.isDefault ? 1 : 0, now, now]);

  return {
    id,
    ...playlist,
    createdAt: now,
    updatedAt: now,
  };
}

export async function addHymnToPlaylist(playlistId: string, hymnId: string): Promise<void> {
  const database = await getDatabase();

  const maxPosition = await database.getFirstAsync<any>(`
    SELECT MAX(position) as max_pos FROM playlist_hymns WHERE playlist_id = ?
  `, [playlistId]);

  const position = (maxPosition?.max_pos || 0) + 1;
  const id = generateId();
  const now = new Date().toISOString();

  await database.runAsync(`
    INSERT INTO playlist_hymns (id, playlist_id, hymn_id, position, added_at)
    VALUES (?, ?, ?, ?, ?)
  `, [id, playlistId, hymnId, position, now]);

  await database.runAsync(`
    UPDATE playlists SET updated_at = ? WHERE id = ?
  `, [now, playlistId]);
}

export async function removeHymnFromPlaylist(playlistId: string, hymnId: string): Promise<void> {
  const database = await getDatabase();
  const now = new Date().toISOString();

  await database.runAsync(`
    DELETE FROM playlist_hymns WHERE playlist_id = ? AND hymn_id = ?
  `, [playlistId, hymnId]);

  await database.runAsync(`
    UPDATE playlists SET updated_at = ? WHERE id = ?
  `, [now, playlistId]);
}

export async function getPlaylistHymns(playlistId: string): Promise<Hymn[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(`
    SELECT h.* FROM hymns h
    INNER JOIN playlist_hymns ph ON h.id = ph.hymn_id
    WHERE ph.playlist_id = ?
    ORDER BY ph.position
  `, [playlistId]);

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    number: row.number,
    title: row.title,
    author: row.author,
    composer: row.composer,
    year: row.year,
    keySignature: row.key_signature,
    timeSignature: row.time_signature,
    tempo: row.tempo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function deletePlaylist(playlistId: string): Promise<void> {
  const database = await getDatabase();

  await database.runAsync(`DELETE FROM playlist_hymns WHERE playlist_id = ?`, [playlistId]);
  await database.runAsync(`DELETE FROM playlists WHERE id = ?`, [playlistId]);
}

export async function addHymnAudio(audio: Omit<HymnAudio, 'id' | 'createdAt'>): Promise<HymnAudio> {
  const database = await getDatabase();
  const id = generateId();
  const now = new Date().toISOString();

  await database.runAsync(`
    INSERT INTO hymn_audio (id, hymn_id, audio_type, url, duration_seconds, file_size_bytes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [id, audio.hymnId, audio.audioType, audio.url, audio.durationSeconds || null, audio.fileSizeBytes || null, now]);

  return {
    id,
    ...audio,
    createdAt: now,
  };
}

export async function getHymnsCount(): Promise<number> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM hymns');
  return result?.count || 0;
}

export async function isHymnsDataLoaded(): Promise<boolean> {
  try {
    const count = await getHymnsCount();
    return count > 0;
  } catch {
    return false;
  }
}

export async function resetHymnsDatabase(): Promise<void> {
  const database = await getDatabase();
  await database.execAsync(`
    DELETE FROM playlist_hymns;
    DELETE FROM playlists;
    DELETE FROM hymn_history;
    DELETE FROM hymn_favorites;
    DELETE FROM hymn_audio;
    DELETE FROM hymn_verses;
    DELETE FROM hymns;
    DELETE FROM hymn_books;
  `);
}

export async function importHymnsFromSQL(sqlContent: string): Promise<{ success: boolean; hymnsCount: number }> {
  const database = await getDatabase();

  try {
    // Clear existing data to avoid UNIQUE constraint errors
    await database.execAsync(`
      DELETE FROM hymn_verses;
      DELETE FROM hymns;
      DELETE FROM hymn_books;
    `);

    // Execute the SQL import
    await database.execAsync(sqlContent);
  } catch (error) {
    console.error('Error importing SQL:', error);
    // If import fails, try with INSERT OR IGNORE as fallback
    try {
      const sqlWithIgnore = sqlContent.replace(/INSERT INTO/gi, 'INSERT OR IGNORE INTO');
      await database.execAsync(sqlWithIgnore);
    } catch (fallbackError) {
      console.error('Fallback import also failed:', fallbackError);
    }
  }

  const count = await getHymnsCount();
  return { success: true, hymnsCount: count };
}

export async function getAllHymns(limit?: number, offset?: number): Promise<Hymn[]> {
  const database = await getDatabase();
  let sql = 'SELECT * FROM hymns ORDER BY number';
  const params: any[] = [];

  if (limit !== undefined) {
    sql += ' LIMIT ?';
    params.push(limit);
    if (offset !== undefined) {
      sql += ' OFFSET ?';
      params.push(offset);
    }
  }

  const results = await database.getAllAsync<any>(sql, params);

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    number: row.number,
    title: row.title,
    author: row.author,
    composer: row.composer,
    year: row.year,
    keySignature: row.key_signature,
    timeSignature: row.time_signature,
    tempo: row.tempo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}
