import * as SQLite from 'expo-sqlite';
import { Meditation, MeditationCategory } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('meditations.db');
  }
  return db;
}

export async function initMeditationsDatabase(): Promise<void> {
  const database = await getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS meditations (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      verse TEXT NOT NULL,
      verse_ref TEXT NOT NULL,
      content TEXT NOT NULL,
      reflection TEXT NOT NULL,
      prayer TEXT NOT NULL,
      date TEXT,
      author TEXT,
      category TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_meditations_category ON meditations(category);
    CREATE INDEX IF NOT EXISTS idx_meditations_date ON meditations(date);
  `);
}

export async function getMeditationsCount(): Promise<number> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM meditations');
  return result?.count ?? 0;
}

export async function isMeditationsDataLoaded(): Promise<boolean> {
  const count = await getMeditationsCount();
  return count > 0;
}

export async function clearMeditationsData(): Promise<void> {
  const database = await getDatabase();
  await database.execAsync('DELETE FROM meditations;');
}

export async function importMeditationsFromSQL(sqlContent: string): Promise<{ success: boolean; count: number }> {
  const database = await getDatabase();

  try {
    // Use INSERT OR IGNORE to avoid duplicates when importing multiple files
    const sqlWithIgnore = sqlContent.replace(/INSERT INTO/gi, 'INSERT OR IGNORE INTO');
    await database.execAsync(sqlWithIgnore);
  } catch (error) {
    console.error('Error importing meditations:', error);
    try {
      // Try original SQL as fallback
      await database.execAsync(sqlContent);
    } catch (fallbackError) {
      console.error('Fallback import failed:', fallbackError);
    }
  }

  const count = await getMeditationsCount();
  return { success: true, count };
}

export async function getAllMeditations(limit?: number, offset?: number): Promise<Meditation[]> {
  const database = await getDatabase();
  let sql = 'SELECT * FROM meditations ORDER BY id';
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
    title: row.title,
    verse: row.verse,
    verseRef: row.verse_ref,
    content: row.content,
    reflection: row.reflection,
    prayer: row.prayer,
    date: row.date,
    author: row.author,
    category: row.category as MeditationCategory,
  }));
}

export async function getMeditationsByCategory(category: MeditationCategory, limit?: number, offset?: number): Promise<Meditation[]> {
  const database = await getDatabase();
  let sql = 'SELECT * FROM meditations WHERE category = ? ORDER BY id';
  const params: any[] = [category];

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
    title: row.title,
    verse: row.verse,
    verseRef: row.verse_ref,
    content: row.content,
    reflection: row.reflection,
    prayer: row.prayer,
    date: row.date,
    author: row.author,
    category: row.category as MeditationCategory,
  }));
}

export async function getMeditationById(id: string): Promise<Meditation | null> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<any>('SELECT * FROM meditations WHERE id = ?', [id]);

  if (!result) return null;

  return {
    id: result.id,
    title: result.title,
    verse: result.verse,
    verseRef: result.verse_ref,
    content: result.content,
    reflection: result.reflection,
    prayer: result.prayer,
    date: result.date,
    author: result.author,
    category: result.category as MeditationCategory,
  };
}

export async function getMeditationOfTheDay(): Promise<Meditation | null> {
  const database = await getDatabase();
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  const count = await getMeditationsCount();
  if (count === 0) return null;

  const index = dayOfYear % count;
  const result = await database.getFirstAsync<any>('SELECT * FROM meditations LIMIT 1 OFFSET ?', [index]);

  if (!result) return null;

  return {
    id: result.id,
    title: result.title,
    verse: result.verse,
    verseRef: result.verse_ref,
    content: result.content,
    reflection: result.reflection,
    prayer: result.prayer,
    date: result.date,
    author: result.author,
    category: result.category as MeditationCategory,
  };
}

export async function searchMeditations(query: string, limit?: number): Promise<Meditation[]> {
  const database = await getDatabase();
  const searchTerm = `%${query}%`;
  let sql = `
    SELECT * FROM meditations
    WHERE title LIKE ? OR verse LIKE ? OR verse_ref LIKE ? OR content LIKE ?
    ORDER BY id
  `;
  const params: any[] = [searchTerm, searchTerm, searchTerm, searchTerm];

  if (limit !== undefined) {
    sql += ' LIMIT ?';
    params.push(limit);
  }

  const results = await database.getAllAsync<any>(sql, params);

  return results.map(row => ({
    id: row.id,
    title: row.title,
    verse: row.verse,
    verseRef: row.verse_ref,
    content: row.content,
    reflection: row.reflection,
    prayer: row.prayer,
    date: row.date,
    author: row.author,
    category: row.category as MeditationCategory,
  }));
}

export async function getCategoryStats(): Promise<{ category: MeditationCategory; count: number }[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<{ category: string; count: number }>(
    'SELECT category, COUNT(*) as count FROM meditations GROUP BY category ORDER BY count DESC'
  );

  return results.map(row => ({
    category: row.category as MeditationCategory,
    count: row.count,
  }));
}
