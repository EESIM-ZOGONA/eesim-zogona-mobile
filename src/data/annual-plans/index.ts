export { classicPlan } from './classic-plan';
export { mixedPlan } from './mixed-plan';
export { chronologicalPlan } from './chronological-plan';
export { bibleBooks, otBooks, ntBooks, totalChapters, totalOTChapters, totalNTChapters } from './bible-structure';

import { classicPlan } from './classic-plan';
import { mixedPlan } from './mixed-plan';
import { chronologicalPlan } from './chronological-plan';
import { ReadingPlan } from '../../types';

export const annualPlans: ReadingPlan[] = [
  chronologicalPlan,
  classicPlan,
  mixedPlan,
];
