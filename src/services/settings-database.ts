import * as SQLite from 'expo-sqlite';
import { generateId, getCurrentTimestamp, SyncStatus } from './storage/storage-adapter';

export interface AppSettings {
  id: string;
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  notificationsEnabled: boolean;
  notificationsCulte: boolean;
  notificationsEvents: boolean;
  notificationsDevotions: boolean;
  notificationsReminders: boolean;
  bibleFontSize: number;
  bibleLineSpacing: number;
  offlineBibleDownloaded: boolean;
  offlineHymnsDownloaded: boolean;
  autoPlayVideos: boolean;
  videoQuality: 'auto' | 'low' | 'medium' | 'high';
  dataUsageWifiOnly: boolean;
  hapticFeedbackEnabled: boolean;
  analyticsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

export interface UserPreferences {
  id: string;
  userId?: string;
  favoriteHymnIds: string[];
  favoriteVerseIds: string[];
  recentSearches: string[];
  lastReadBibleBook?: string;
  lastReadBibleChapter?: number;
  quizHighScores: Record<string, number>;
  completedReadingPlanIds: string[];
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

const DEFAULT_SETTINGS: Omit<AppSettings, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'> = {
  theme: 'system',
  language: 'fr',
  notificationsEnabled: true,
  notificationsCulte: true,
  notificationsEvents: true,
  notificationsDevotions: true,
  notificationsReminders: true,
  bibleFontSize: 16,
  bibleLineSpacing: 1.6,
  offlineBibleDownloaded: false,
  offlineHymnsDownloaded: false,
  autoPlayVideos: true,
  videoQuality: 'auto',
  dataUsageWifiOnly: false,
  hapticFeedbackEnabled: true,
  analyticsEnabled: true,
};

const DEFAULT_PREFERENCES: Omit<UserPreferences, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'> = {
  favoriteHymnIds: [],
  favoriteVerseIds: [],
  recentSearches: [],
  quizHighScores: {},
  completedReadingPlanIds: [],
};

let db: SQLite.SQLiteDatabase | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('eesim-settings.db');
    await initDatabase();
  }
  return db;
}

async function initDatabase(): Promise<void> {
  if (!db) return;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS app_settings (
      id TEXT PRIMARY KEY NOT NULL,
      theme TEXT NOT NULL DEFAULT 'system',
      language TEXT NOT NULL DEFAULT 'fr',
      notifications_enabled INTEGER NOT NULL DEFAULT 1,
      notifications_culte INTEGER NOT NULL DEFAULT 1,
      notifications_events INTEGER NOT NULL DEFAULT 1,
      notifications_devotions INTEGER NOT NULL DEFAULT 1,
      notifications_reminders INTEGER NOT NULL DEFAULT 1,
      bible_font_size INTEGER NOT NULL DEFAULT 16,
      bible_line_spacing REAL NOT NULL DEFAULT 1.6,
      offline_bible_downloaded INTEGER NOT NULL DEFAULT 0,
      offline_hymns_downloaded INTEGER NOT NULL DEFAULT 0,
      auto_play_videos INTEGER NOT NULL DEFAULT 1,
      video_quality TEXT NOT NULL DEFAULT 'auto',
      data_usage_wifi_only INTEGER NOT NULL DEFAULT 0,
      haptic_feedback_enabled INTEGER NOT NULL DEFAULT 1,
      analytics_enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      sync_status TEXT NOT NULL DEFAULT 'local'
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT,
      favorite_hymn_ids TEXT NOT NULL DEFAULT '[]',
      favorite_verse_ids TEXT NOT NULL DEFAULT '[]',
      recent_searches TEXT NOT NULL DEFAULT '[]',
      last_read_bible_book TEXT,
      last_read_bible_chapter INTEGER,
      quiz_high_scores TEXT NOT NULL DEFAULT '{}',
      completed_reading_plan_ids TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      sync_status TEXT NOT NULL DEFAULT 'local'
    );
  `);
}

function rowToSettings(row: Record<string, unknown>): AppSettings {
  return {
    id: row.id as string,
    theme: row.theme as AppSettings['theme'],
    language: row.language as AppSettings['language'],
    notificationsEnabled: Boolean(row.notifications_enabled),
    notificationsCulte: Boolean(row.notifications_culte),
    notificationsEvents: Boolean(row.notifications_events),
    notificationsDevotions: Boolean(row.notifications_devotions),
    notificationsReminders: Boolean(row.notifications_reminders),
    bibleFontSize: row.bible_font_size as number,
    bibleLineSpacing: row.bible_line_spacing as number,
    offlineBibleDownloaded: Boolean(row.offline_bible_downloaded),
    offlineHymnsDownloaded: Boolean(row.offline_hymns_downloaded),
    autoPlayVideos: Boolean(row.auto_play_videos),
    videoQuality: row.video_quality as AppSettings['videoQuality'],
    dataUsageWifiOnly: Boolean(row.data_usage_wifi_only),
    hapticFeedbackEnabled: Boolean(row.haptic_feedback_enabled),
    analyticsEnabled: Boolean(row.analytics_enabled),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    syncStatus: row.sync_status as SyncStatus,
  };
}

function rowToPreferences(row: Record<string, unknown>): UserPreferences {
  return {
    id: row.id as string,
    userId: row.user_id as string | undefined,
    favoriteHymnIds: JSON.parse((row.favorite_hymn_ids as string) || '[]'),
    favoriteVerseIds: JSON.parse((row.favorite_verse_ids as string) || '[]'),
    recentSearches: JSON.parse((row.recent_searches as string) || '[]'),
    lastReadBibleBook: row.last_read_bible_book as string | undefined,
    lastReadBibleChapter: row.last_read_bible_chapter as number | undefined,
    quizHighScores: JSON.parse((row.quiz_high_scores as string) || '{}'),
    completedReadingPlanIds: JSON.parse((row.completed_reading_plan_ids as string) || '[]'),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    syncStatus: row.sync_status as SyncStatus,
  };
}

export async function getSettings(): Promise<AppSettings> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM app_settings LIMIT 1'
  );

  if (rows.length > 0) {
    return rowToSettings(rows[0]);
  }

  const now = getCurrentTimestamp();
  const newSettings: AppSettings = {
    id: generateId(),
    ...DEFAULT_SETTINGS,
    createdAt: now,
    updatedAt: now,
    syncStatus: 'local',
  };

  await database.runAsync(
    `INSERT INTO app_settings (
      id, theme, language, notifications_enabled, notifications_culte,
      notifications_events, notifications_devotions, notifications_reminders,
      bible_font_size, bible_line_spacing, offline_bible_downloaded,
      offline_hymns_downloaded, auto_play_videos, video_quality,
      data_usage_wifi_only, haptic_feedback_enabled, analytics_enabled,
      created_at, updated_at, sync_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newSettings.id,
      newSettings.theme,
      newSettings.language,
      newSettings.notificationsEnabled ? 1 : 0,
      newSettings.notificationsCulte ? 1 : 0,
      newSettings.notificationsEvents ? 1 : 0,
      newSettings.notificationsDevotions ? 1 : 0,
      newSettings.notificationsReminders ? 1 : 0,
      newSettings.bibleFontSize,
      newSettings.bibleLineSpacing,
      newSettings.offlineBibleDownloaded ? 1 : 0,
      newSettings.offlineHymnsDownloaded ? 1 : 0,
      newSettings.autoPlayVideos ? 1 : 0,
      newSettings.videoQuality,
      newSettings.dataUsageWifiOnly ? 1 : 0,
      newSettings.hapticFeedbackEnabled ? 1 : 0,
      newSettings.analyticsEnabled ? 1 : 0,
      newSettings.createdAt,
      newSettings.updatedAt,
      newSettings.syncStatus,
    ]
  );

  return newSettings;
}

export async function updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
  const database = await getDatabase();
  const current = await getSettings();
  const now = getCurrentTimestamp();

  const updated: AppSettings = {
    ...current,
    ...updates,
    updatedAt: now,
    syncStatus: 'pending',
  };

  await database.runAsync(
    `UPDATE app_settings SET
      theme = ?,
      language = ?,
      notifications_enabled = ?,
      notifications_culte = ?,
      notifications_events = ?,
      notifications_devotions = ?,
      notifications_reminders = ?,
      bible_font_size = ?,
      bible_line_spacing = ?,
      offline_bible_downloaded = ?,
      offline_hymns_downloaded = ?,
      auto_play_videos = ?,
      video_quality = ?,
      data_usage_wifi_only = ?,
      haptic_feedback_enabled = ?,
      analytics_enabled = ?,
      updated_at = ?,
      sync_status = ?
    WHERE id = ?`,
    [
      updated.theme,
      updated.language,
      updated.notificationsEnabled ? 1 : 0,
      updated.notificationsCulte ? 1 : 0,
      updated.notificationsEvents ? 1 : 0,
      updated.notificationsDevotions ? 1 : 0,
      updated.notificationsReminders ? 1 : 0,
      updated.bibleFontSize,
      updated.bibleLineSpacing,
      updated.offlineBibleDownloaded ? 1 : 0,
      updated.offlineHymnsDownloaded ? 1 : 0,
      updated.autoPlayVideos ? 1 : 0,
      updated.videoQuality,
      updated.dataUsageWifiOnly ? 1 : 0,
      updated.hapticFeedbackEnabled ? 1 : 0,
      updated.analyticsEnabled ? 1 : 0,
      updated.updatedAt,
      updated.syncStatus,
      updated.id,
    ]
  );

  return updated;
}

export async function getUserPreferences(): Promise<UserPreferences> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    'SELECT * FROM user_preferences LIMIT 1'
  );

  if (rows.length > 0) {
    return rowToPreferences(rows[0]);
  }

  const now = getCurrentTimestamp();
  const newPrefs: UserPreferences = {
    id: generateId(),
    ...DEFAULT_PREFERENCES,
    createdAt: now,
    updatedAt: now,
    syncStatus: 'local',
  };

  await database.runAsync(
    `INSERT INTO user_preferences (
      id, user_id, favorite_hymn_ids, favorite_verse_ids, recent_searches,
      last_read_bible_book, last_read_bible_chapter, quiz_high_scores,
      completed_reading_plan_ids, created_at, updated_at, sync_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newPrefs.id,
      newPrefs.userId || null,
      JSON.stringify(newPrefs.favoriteHymnIds),
      JSON.stringify(newPrefs.favoriteVerseIds),
      JSON.stringify(newPrefs.recentSearches),
      newPrefs.lastReadBibleBook || null,
      newPrefs.lastReadBibleChapter || null,
      JSON.stringify(newPrefs.quizHighScores),
      JSON.stringify(newPrefs.completedReadingPlanIds),
      newPrefs.createdAt,
      newPrefs.updatedAt,
      newPrefs.syncStatus,
    ]
  );

  return newPrefs;
}

export async function updateUserPreferences(updates: Partial<UserPreferences>): Promise<UserPreferences> {
  const database = await getDatabase();
  const current = await getUserPreferences();
  const now = getCurrentTimestamp();

  const updated: UserPreferences = {
    ...current,
    ...updates,
    updatedAt: now,
    syncStatus: 'pending',
  };

  await database.runAsync(
    `UPDATE user_preferences SET
      user_id = ?,
      favorite_hymn_ids = ?,
      favorite_verse_ids = ?,
      recent_searches = ?,
      last_read_bible_book = ?,
      last_read_bible_chapter = ?,
      quiz_high_scores = ?,
      completed_reading_plan_ids = ?,
      updated_at = ?,
      sync_status = ?
    WHERE id = ?`,
    [
      updated.userId || null,
      JSON.stringify(updated.favoriteHymnIds),
      JSON.stringify(updated.favoriteVerseIds),
      JSON.stringify(updated.recentSearches),
      updated.lastReadBibleBook || null,
      updated.lastReadBibleChapter || null,
      JSON.stringify(updated.quizHighScores),
      JSON.stringify(updated.completedReadingPlanIds),
      updated.updatedAt,
      updated.syncStatus,
      updated.id,
    ]
  );

  return updated;
}

export async function addFavoriteHymn(hymnId: string): Promise<void> {
  const prefs = await getUserPreferences();
  if (!prefs.favoriteHymnIds.includes(hymnId)) {
    await updateUserPreferences({
      favoriteHymnIds: [...prefs.favoriteHymnIds, hymnId],
    });
  }
}

export async function removeFavoriteHymn(hymnId: string): Promise<void> {
  const prefs = await getUserPreferences();
  await updateUserPreferences({
    favoriteHymnIds: prefs.favoriteHymnIds.filter(id => id !== hymnId),
  });
}

export async function addRecentSearch(query: string): Promise<void> {
  const prefs = await getUserPreferences();
  const searches = prefs.recentSearches.filter(s => s !== query);
  searches.unshift(query);
  await updateUserPreferences({
    recentSearches: searches.slice(0, 10),
  });
}

export async function updateQuizHighScore(quizId: string, score: number): Promise<void> {
  const prefs = await getUserPreferences();
  const currentHigh = prefs.quizHighScores[quizId] || 0;
  if (score > currentHigh) {
    await updateUserPreferences({
      quizHighScores: {
        ...prefs.quizHighScores,
        [quizId]: score,
      },
    });
  }
}

export async function updateLastReadBible(bookId: string, chapter: number): Promise<void> {
  await updateUserPreferences({
    lastReadBibleBook: bookId,
    lastReadBibleChapter: chapter,
  });
}

export async function getPendingSyncSettings(): Promise<AppSettings[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM app_settings WHERE sync_status = 'pending'`
  );
  return rows.map(rowToSettings);
}

export async function getPendingSyncPreferences(): Promise<UserPreferences[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM user_preferences WHERE sync_status = 'pending'`
  );
  return rows.map(rowToPreferences);
}

export async function markSettingsSynced(id: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    `UPDATE app_settings SET sync_status = 'synced' WHERE id = ?`,
    [id]
  );
}

export async function markPreferencesSynced(id: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    `UPDATE user_preferences SET sync_status = 'synced' WHERE id = ?`,
    [id]
  );
}

export async function resetSettings(): Promise<AppSettings> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM app_settings');
  return getSettings();
}

export async function resetPreferences(): Promise<UserPreferences> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM user_preferences');
  return getUserPreferences();
}
