import { useState, useEffect, useCallback } from 'react';
import { ReadingPlanProgressEntry } from '../types';
import {
  initReadingPlansDatabase,
  getDayProgress,
  getPlanProgress,
  markReadingComplete as markReadingCompleteDB,
  markDayComplete as markDayCompleteDB,
  addDayNotes,
  getPlanStats,
  getUserPlanById,
} from '../services/reading-plans-database';

export interface ProgressStats {
  completedDays: number;
  totalDays: number;
  percentage: number;
  streak: number;
  lastReadDate: string | null;
}

export interface UseReadingProgressOptions {
  userPlanId: string;
}

export interface UseReadingProgressReturn {
  progress: ProgressStats;
  allProgress: ReadingPlanProgressEntry[];
  currentDay: number;
  todayProgress: ReadingPlanProgressEntry | null;
  loading: boolean;
  error: Error | null;
  markDayComplete: (dayNumber: number, totalReadings: number) => Promise<void>;
  markReadingComplete: (dayNumber: number, readingIndex: number) => Promise<void>;
  isReadingComplete: (dayNumber: number, readingIndex: number) => boolean;
  isDayComplete: (dayNumber: number) => boolean;
  addNotes: (dayNumber: number, notes: string) => Promise<void>;
  getDayProgressData: (dayNumber: number) => ReadingPlanProgressEntry | undefined;
  refresh: () => Promise<void>;
}

export function useReadingProgress(options: UseReadingProgressOptions): UseReadingProgressReturn {
  const { userPlanId } = options;

  const [progress, setProgress] = useState<ProgressStats>({
    completedDays: 0,
    totalDays: 0,
    percentage: 0,
    streak: 0,
    lastReadDate: null,
  });
  const [allProgress, setAllProgress] = useState<ReadingPlanProgressEntry[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [todayProgress, setTodayProgress] = useState<ReadingPlanProgressEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProgress = useCallback(async () => {
    try {
      await initReadingPlansDatabase();

      const plan = await getUserPlanById(userPlanId);
      if (!plan) {
        throw new Error('Plan not found');
      }

      setCurrentDay(plan.currentDay);

      const stats = await getPlanStats(userPlanId);
      setProgress(stats);

      const allProgressData = await getPlanProgress(userPlanId);
      setAllProgress(allProgressData);

      const today = await getDayProgress(userPlanId, plan.currentDay);
      setTodayProgress(today);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load progress'));
    }
  }, [userPlanId]);

  useEffect(() => {
    setLoading(true);
    loadProgress().finally(() => setLoading(false));
  }, [loadProgress]);

  const refresh = useCallback(async () => {
    await loadProgress();
  }, [loadProgress]);

  const markDayComplete = useCallback(async (dayNumber: number, totalReadings: number) => {
    await markDayCompleteDB(userPlanId, dayNumber, totalReadings);
    await loadProgress();
  }, [userPlanId, loadProgress]);

  const markReadingComplete = useCallback(async (dayNumber: number, readingIndex: number) => {
    await markReadingCompleteDB(userPlanId, dayNumber, readingIndex);
    await loadProgress();
  }, [userPlanId, loadProgress]);

  const isReadingComplete = useCallback((dayNumber: number, readingIndex: number): boolean => {
    const dayProgress = allProgress.find(p => p.dayNumber === dayNumber);
    return dayProgress?.readingsCompleted.includes(readingIndex) || false;
  }, [allProgress]);

  const isDayComplete = useCallback((dayNumber: number): boolean => {
    const dayProgress = allProgress.find(p => p.dayNumber === dayNumber);
    return !!dayProgress?.completedAt;
  }, [allProgress]);

  const addNotes = useCallback(async (dayNumber: number, notes: string) => {
    await addDayNotes(userPlanId, dayNumber, notes);
    await loadProgress();
  }, [userPlanId, loadProgress]);

  const getDayProgressData = useCallback((dayNumber: number): ReadingPlanProgressEntry | undefined => {
    return allProgress.find(p => p.dayNumber === dayNumber);
  }, [allProgress]);

  return {
    progress,
    allProgress,
    currentDay,
    todayProgress,
    loading,
    error,
    markDayComplete,
    markReadingComplete,
    isReadingComplete,
    isDayComplete,
    addNotes,
    getDayProgressData,
    refresh,
  };
}
