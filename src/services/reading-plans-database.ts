/**
 * Reading Plans Database Service
 * SQLite-based storage for user reading plans and progress tracking
 */

import * as SQLite from 'expo-sqlite';
import {
  SyncStatus,
  generateId,
  getCurrentTimestamp,
} from './storage/storage-adapter';
import { ReadingPlan, ReadingPlanDay } from '../types';

const DATABASE_NAME = 'eesim_reading_plans.db';

let db: SQLite.SQLiteDatabase | null = null;
let isInitialized = false;

/**
 * User's instance of a reading plan
 */
export interface UserReadingPlan {
  id: string;
  planId: string;
  planType: 'template' | 'annual_chronological' | 'annual_classic' | 'annual_mixed';
  title: string;
  startDate: string;
  status: 'active' | 'paused' | 'completed';
  currentDay: number;
  totalDays: number;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

/**
 * Progress for a single day
 */
export interface ReadingPlanProgress {
  id: string;
  userPlanId: string;
  dayNumber: number;
  completedAt?: string;
  readingsCompleted: number[];
  notes?: string;
}

/**
 * Initialize the reading plans database
 */
export async function initReadingPlansDatabase(): Promise<void> {
  if (isInitialized && db) return;

  db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_reading_plans (
      id TEXT PRIMARY KEY,
      plan_id TEXT NOT NULL,
      plan_type TEXT NOT NULL,
      title TEXT NOT NULL,
      start_date TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      current_day INTEGER DEFAULT 1,
      total_days INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      sync_status TEXT DEFAULT 'local'
    );

    CREATE TABLE IF NOT EXISTS reading_plan_progress (
      id TEXT PRIMARY KEY,
      user_plan_id TEXT NOT NULL,
      day_number INTEGER NOT NULL,
      completed_at TEXT,
      readings_completed TEXT,
      notes TEXT,
      FOREIGN KEY (user_plan_id) REFERENCES user_reading_plans(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_user_plans_status ON user_reading_plans(status);
    CREATE INDEX IF NOT EXISTS idx_user_plans_sync ON user_reading_plans(sync_status);
    CREATE INDEX IF NOT EXISTS idx_progress_plan ON reading_plan_progress(user_plan_id);
    CREATE INDEX IF NOT EXISTS idx_progress_day ON reading_plan_progress(user_plan_id, day_number);
  `);

  isInitialized = true;
}

/**
 * Ensure database is initialized
 */
async function ensureDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db || !isInitialized) {
    await initReadingPlansDatabase();
  }
  return db!;
}

/**
 * Convert database row to UserReadingPlan
 */
function rowToUserPlan(row: any): UserReadingPlan {
  return {
    id: row.id,
    planId: row.plan_id,
    planType: row.plan_type,
    title: row.title,
    startDate: row.start_date,
    status: row.status,
    currentDay: row.current_day,
    totalDays: row.total_days,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncStatus: row.sync_status as SyncStatus,
  };
}

/**
 * Convert database row to ReadingPlanProgress
 */
function rowToProgress(row: any): ReadingPlanProgress {
  return {
    id: row.id,
    userPlanId: row.user_plan_id,
    dayNumber: row.day_number,
    completedAt: row.completed_at || undefined,
    readingsCompleted: row.readings_completed
      ? JSON.parse(row.readings_completed)
      : [],
    notes: row.notes || undefined,
  };
}

// ==================== User Plan Operations ====================

/**
 * Start a new reading plan
 */
export async function startPlan(
  planId: string,
  planType: UserReadingPlan['planType'],
  title: string,
  totalDays: number
): Promise<UserReadingPlan> {
  const database = await ensureDb();
  const id = generateId();
  const now = getCurrentTimestamp();

  await database.runAsync(
    `INSERT INTO user_reading_plans (
      id, plan_id, plan_type, title, start_date, status,
      current_day, total_days, created_at, updated_at, sync_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, planId, planType, title, now, 'active', 1, totalDays, now, now, 'local']
  );

  return {
    id,
    planId,
    planType,
    title,
    startDate: now,
    status: 'active',
    currentDay: 1,
    totalDays,
    createdAt: now,
    updatedAt: now,
    syncStatus: 'local',
  };
}

/**
 * Get all user plans
 */
export async function getUserPlans(
  status?: 'active' | 'paused' | 'completed' | 'all'
): Promise<UserReadingPlan[]> {
  const database = await ensureDb();

  let query = 'SELECT * FROM user_reading_plans';
  const params: any[] = [];

  if (status && status !== 'all') {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY updated_at DESC';

  const rows = await database.getAllAsync(query, params);
  return rows.map(rowToUserPlan);
}

/**
 * Get active plans
 */
export async function getActivePlans(): Promise<UserReadingPlan[]> {
  return getUserPlans('active');
}

/**
 * Get a single user plan by ID
 */
export async function getUserPlanById(id: string): Promise<UserReadingPlan | null> {
  const database = await ensureDb();
  const row = await database.getFirstAsync(
    'SELECT * FROM user_reading_plans WHERE id = ?',
    [id]
  );
  return row ? rowToUserPlan(row) : null;
}

/**
 * Update plan status
 */
export async function updatePlanStatus(
  id: string,
  status: 'active' | 'paused' | 'completed'
): Promise<UserReadingPlan> {
  const database = await ensureDb();
  const now = getCurrentTimestamp();

  await database.runAsync(
    `UPDATE user_reading_plans
     SET status = ?, updated_at = ?, sync_status = 'pending'
     WHERE id = ?`,
    [status, now, id]
  );

  const plan = await getUserPlanById(id);
  if (!plan) throw new Error(`Plan not found: ${id}`);
  return plan;
}

/**
 * Pause a plan
 */
export async function pausePlan(id: string): Promise<UserReadingPlan> {
  return updatePlanStatus(id, 'paused');
}

/**
 * Resume a plan
 */
export async function resumePlan(id: string): Promise<UserReadingPlan> {
  return updatePlanStatus(id, 'active');
}

/**
 * Complete a plan
 */
export async function completePlan(id: string): Promise<UserReadingPlan> {
  return updatePlanStatus(id, 'completed');
}

/**
 * Abandon/delete a plan
 */
export async function abandonPlan(id: string): Promise<void> {
  const database = await ensureDb();
  // Delete progress first (foreign key)
  await database.runAsync(
    'DELETE FROM reading_plan_progress WHERE user_plan_id = ?',
    [id]
  );
  await database.runAsync('DELETE FROM user_reading_plans WHERE id = ?', [id]);
}

/**
 * Update current day
 */
export async function updateCurrentDay(
  id: string,
  dayNumber: number
): Promise<UserReadingPlan> {
  const database = await ensureDb();
  const now = getCurrentTimestamp();

  await database.runAsync(
    `UPDATE user_reading_plans
     SET current_day = ?, updated_at = ?, sync_status = 'pending'
     WHERE id = ?`,
    [dayNumber, now, id]
  );

  const plan = await getUserPlanById(id);
  if (!plan) throw new Error(`Plan not found: ${id}`);
  return plan;
}

// ==================== Progress Operations ====================

/**
 * Get progress for a specific day
 */
export async function getDayProgress(
  userPlanId: string,
  dayNumber: number
): Promise<ReadingPlanProgress | null> {
  const database = await ensureDb();
  const row = await database.getFirstAsync(
    'SELECT * FROM reading_plan_progress WHERE user_plan_id = ? AND day_number = ?',
    [userPlanId, dayNumber]
  );
  return row ? rowToProgress(row) : null;
}

/**
 * Get all progress for a plan
 */
export async function getPlanProgress(
  userPlanId: string
): Promise<ReadingPlanProgress[]> {
  const database = await ensureDb();
  const rows = await database.getAllAsync(
    'SELECT * FROM reading_plan_progress WHERE user_plan_id = ? ORDER BY day_number',
    [userPlanId]
  );
  return rows.map(rowToProgress);
}

/**
 * Mark a reading as complete
 */
export async function markReadingComplete(
  userPlanId: string,
  dayNumber: number,
  readingIndex: number
): Promise<ReadingPlanProgress> {
  const database = await ensureDb();
  let progress = await getDayProgress(userPlanId, dayNumber);

  if (!progress) {
    // Create new progress entry
    const id = generateId();
    const readingsCompleted = [readingIndex];

    await database.runAsync(
      `INSERT INTO reading_plan_progress (
        id, user_plan_id, day_number, readings_completed
      ) VALUES (?, ?, ?, ?)`,
      [id, userPlanId, dayNumber, JSON.stringify(readingsCompleted)]
    );

    progress = {
      id,
      userPlanId,
      dayNumber,
      readingsCompleted,
    };
  } else {
    // Update existing
    const readingsCompleted = progress.readingsCompleted.includes(readingIndex)
      ? progress.readingsCompleted
      : [...progress.readingsCompleted, readingIndex].sort((a, b) => a - b);

    await database.runAsync(
      `UPDATE reading_plan_progress
       SET readings_completed = ?
       WHERE id = ?`,
      [JSON.stringify(readingsCompleted), progress.id]
    );

    progress.readingsCompleted = readingsCompleted;
  }

  return progress;
}

/**
 * Mark a day as complete
 */
export async function markDayComplete(
  userPlanId: string,
  dayNumber: number,
  totalReadings: number
): Promise<ReadingPlanProgress> {
  const database = await ensureDb();
  const now = getCurrentTimestamp();
  let progress = await getDayProgress(userPlanId, dayNumber);

  const readingsCompleted = Array.from({ length: totalReadings }, (_, i) => i);

  if (!progress) {
    const id = generateId();
    await database.runAsync(
      `INSERT INTO reading_plan_progress (
        id, user_plan_id, day_number, completed_at, readings_completed
      ) VALUES (?, ?, ?, ?, ?)`,
      [id, userPlanId, dayNumber, now, JSON.stringify(readingsCompleted)]
    );

    progress = {
      id,
      userPlanId,
      dayNumber,
      completedAt: now,
      readingsCompleted,
    };
  } else {
    await database.runAsync(
      `UPDATE reading_plan_progress
       SET completed_at = ?, readings_completed = ?
       WHERE id = ?`,
      [now, JSON.stringify(readingsCompleted), progress.id]
    );

    progress.completedAt = now;
    progress.readingsCompleted = readingsCompleted;
  }

  // Update plan's current day if needed
  const plan = await getUserPlanById(userPlanId);
  if (plan && dayNumber >= plan.currentDay && dayNumber < plan.totalDays) {
    await updateCurrentDay(userPlanId, dayNumber + 1);
  }

  // Check if plan is completed
  if (plan && dayNumber === plan.totalDays) {
    await completePlan(userPlanId);
  }

  return progress;
}

/**
 * Add notes to a day
 */
export async function addDayNotes(
  userPlanId: string,
  dayNumber: number,
  notes: string
): Promise<ReadingPlanProgress> {
  const database = await ensureDb();
  let progress = await getDayProgress(userPlanId, dayNumber);

  if (!progress) {
    const id = generateId();
    await database.runAsync(
      `INSERT INTO reading_plan_progress (
        id, user_plan_id, day_number, notes, readings_completed
      ) VALUES (?, ?, ?, ?, ?)`,
      [id, userPlanId, dayNumber, notes, '[]']
    );

    progress = {
      id,
      userPlanId,
      dayNumber,
      readingsCompleted: [],
      notes,
    };
  } else {
    await database.runAsync(
      `UPDATE reading_plan_progress SET notes = ? WHERE id = ?`,
      [notes, progress.id]
    );
    progress.notes = notes;
  }

  return progress;
}

// ==================== Statistics ====================

/**
 * Get plan statistics
 */
export async function getPlanStats(userPlanId: string): Promise<{
  completedDays: number;
  totalDays: number;
  percentage: number;
  streak: number;
  lastReadDate: string | null;
}> {
  const database = await ensureDb();
  const plan = await getUserPlanById(userPlanId);

  if (!plan) {
    throw new Error(`Plan not found: ${userPlanId}`);
  }

  const completedRow = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM reading_plan_progress WHERE user_plan_id = ? AND completed_at IS NOT NULL',
    [userPlanId]
  );

  const lastReadRow = await database.getFirstAsync<{ completed_at: string }>(
    'SELECT completed_at FROM reading_plan_progress WHERE user_plan_id = ? AND completed_at IS NOT NULL ORDER BY completed_at DESC LIMIT 1',
    [userPlanId]
  );

  // Calculate streak
  const progressRows = await database.getAllAsync<{ day_number: number; completed_at: string }>(
    'SELECT day_number, completed_at FROM reading_plan_progress WHERE user_plan_id = ? AND completed_at IS NOT NULL ORDER BY day_number DESC',
    [userPlanId]
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const row of progressRows) {
    const completedDate = new Date(row.completed_at);
    completedDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak || diffDays === streak + 1) {
      streak++;
    } else {
      break;
    }
  }

  const completedDays = completedRow?.count || 0;
  const percentage = Math.round((completedDays / plan.totalDays) * 100);

  return {
    completedDays,
    totalDays: plan.totalDays,
    percentage,
    streak,
    lastReadDate: lastReadRow?.completed_at || null,
  };
}

// ==================== Sync Operations ====================

/**
 * Get plans pending sync
 */
export async function getPendingSyncPlans(): Promise<UserReadingPlan[]> {
  const database = await ensureDb();
  const rows = await database.getAllAsync(
    "SELECT * FROM user_reading_plans WHERE sync_status = 'pending' OR sync_status = 'local'"
  );
  return rows.map(rowToUserPlan);
}

/**
 * Mark plans as synced
 */
export async function markPlansSynced(ids: string[]): Promise<void> {
  if (ids.length === 0) return;

  const database = await ensureDb();
  const placeholders = ids.map(() => '?').join(',');
  await database.runAsync(
    `UPDATE user_reading_plans SET sync_status = 'synced' WHERE id IN (${placeholders})`,
    ids
  );
}
