import { useState, useEffect, useCallback, useMemo } from 'react';
import { ReadingPlan, UserReadingPlan } from '../types';
import {
  initReadingPlansDatabase,
  getUserPlans,
  getActivePlans,
  startPlan as startPlanDB,
  pausePlan as pausePlanDB,
  resumePlan as resumePlanDB,
  abandonPlan as abandonPlanDB,
} from '../services/reading-plans-database';
import { readingPlans as templatePlans } from '../data/reading-plans-data';
import { annualPlans as annualPlansData } from '../data/annual-plans';

export interface UseReadingPlansReturn {
  availablePlans: ReadingPlan[];
  annualPlans: ReadingPlan[];
  templatePlans: ReadingPlan[];
  activePlans: UserReadingPlan[];
  completedPlans: UserReadingPlan[];
  loading: boolean;
  error: Error | null;
  startPlan: (plan: ReadingPlan) => Promise<UserReadingPlan>;
  pausePlan: (userPlanId: string) => Promise<void>;
  resumePlan: (userPlanId: string) => Promise<void>;
  abandonPlan: (userPlanId: string) => Promise<void>;
  getPlanById: (planId: string) => ReadingPlan | undefined;
  refresh: () => Promise<void>;
}

export function useReadingPlans(): UseReadingPlansReturn {
  const [activePlans, setActivePlans] = useState<UserReadingPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<UserReadingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const annualPlans = useMemo<ReadingPlan[]>(() => {
    return annualPlansData;
  }, []);

  const availablePlans = useMemo(() => {
    return [...templatePlans, ...annualPlans];
  }, [annualPlans]);

  const loadUserPlans = useCallback(async () => {
    try {
      await initReadingPlansDatabase();
      const active = await getUserPlans('active');
      const paused = await getUserPlans('paused');
      const completed = await getUserPlans('completed');

      setActivePlans([...active, ...paused]);
      setCompletedPlans(completed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load plans'));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadUserPlans().finally(() => setLoading(false));
  }, [loadUserPlans]);

  const refresh = useCallback(async () => {
    await loadUserPlans();
  }, [loadUserPlans]);

  const startPlan = useCallback(async (plan: ReadingPlan): Promise<UserReadingPlan> => {
    const planType = plan.category === 'annuel'
      ? `annual_${plan.id.split('-')[1]}` as UserReadingPlan['planType']
      : 'template';

    const userPlan = await startPlanDB(
      plan.id,
      planType,
      plan.title,
      plan.duration
    );
    await loadUserPlans();
    return userPlan;
  }, [loadUserPlans]);

  const pausePlan = useCallback(async (userPlanId: string): Promise<void> => {
    await pausePlanDB(userPlanId);
    await loadUserPlans();
  }, [loadUserPlans]);

  const resumePlan = useCallback(async (userPlanId: string): Promise<void> => {
    await resumePlanDB(userPlanId);
    await loadUserPlans();
  }, [loadUserPlans]);

  const abandonPlan = useCallback(async (userPlanId: string): Promise<void> => {
    await abandonPlanDB(userPlanId);
    await loadUserPlans();
  }, [loadUserPlans]);

  const getPlanById = useCallback((planId: string): ReadingPlan | undefined => {
    return availablePlans.find(p => p.id === planId);
  }, [availablePlans]);

  return {
    availablePlans,
    annualPlans,
    templatePlans,
    activePlans,
    completedPlans,
    loading,
    error,
    startPlan,
    pausePlan,
    resumePlan,
    abandonPlan,
    getPlanById,
    refresh,
  };
}
