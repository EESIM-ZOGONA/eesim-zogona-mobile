export interface User {
  id: string;
  phone: string;
  name?: string;
  avatar?: string;
  email?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  category: EventCategory;
}

export type EventCategory = 'culte' | 'reunion' | 'jeune' | 'evangelisation' | 'formation' | 'autre';

export interface Hymn {
  id: string;
  number: number;
  title: string;
  lyrics: string;
  category: HymnCategory;
  author?: string;
}

export type HymnCategory = 'adoration' | 'louange' | 'priere' | 'communion' | 'evangelisation' | 'noel' | 'paques';

export interface Prediction {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  publishedAt: string;
  playlistId: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoCount: number;
  videos: Video[];
}

export interface WeeklyProgramActivity {
  id: string;
  title: string;
  time: string;
  description?: string;
  location?: string;
}

export interface WeeklyProgram {
  id: string;
  day: DayOfWeek;
  activities: WeeklyProgramActivity[];
}

export type DayOfWeek = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface ProgramActivity {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  description?: string;
  location?: string;
  category: ProgramCategory;
  isOnline?: boolean;
  isImportant?: boolean;
  date: Date;
}

export type ProgramCategory = 'culte' | 'reunion' | 'jeune' | 'priere' | 'etude' | 'chorale' | 'autre';

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  route: string;
  color?: string;
}

import { SCREENS } from '../constants/screens';

export type RootStackParamList = {
  [SCREENS.ONBOARDING]: undefined;
  [SCREENS.AUTH]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.OTP]: { phone: string };
  [SCREENS.MAIN]: undefined;
  [SCREENS.HOME]: undefined;
  [SCREENS.HYMNS]: undefined;
  [SCREENS.HYMN_DETAIL]: { hymnId: string };
  [SCREENS.TV]: undefined;
  [SCREENS.VIDEO_PLAYER]: {
    video: {
      id: string;
      title: string;
      description?: string;
      thumbnail: string;
      thumbnailHigh?: string;
      url: string;
      durationFormatted: string;
      totalViews: number;
      likes: number;
      publishedAt: string;
      category?: string | null;
    };
    playlistId?: string;
  };
  [SCREENS.PROGRAM]: undefined;
  [SCREENS.PROGRAM_DETAIL]: { activity: ProgramActivity };
  [SCREENS.EVENTS]: undefined;
  [SCREENS.EVENT_DETAIL]: { event: Event };
  [SCREENS.PROFILE]: undefined;
  [SCREENS.SETTINGS]: undefined;
  [SCREENS.EDIT_PROFILE]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
  [SCREENS.ABOUT]: undefined;
  [SCREENS.HELP_SUPPORT]: undefined;
  [SCREENS.MY_EVENTS]: undefined;
  [SCREENS.MY_DONATIONS]: undefined;
  [SCREENS.MY_CELL]: undefined;
  [SCREENS.MY_FAVORITES]: undefined;
  [SCREENS.MY_LIBRARY]: undefined;
  [SCREENS.SOCIAL_MEDIA]: undefined;
  [SCREENS.MEDITATIONS]: undefined;
  [SCREENS.MEDITATION_LIST]: { category?: MeditationCategory };
  [SCREENS.MEDITATION_DETAIL]: { meditation: Meditation };
  [SCREENS.QUIZ]: undefined;
  [SCREENS.QUIZ_CATEGORY]: { category: QuizCategory };
  [SCREENS.QUIZ_PLAY]: { quiz: Quiz };
  [SCREENS.QUIZ_RESULT]: {
    quiz: Quiz;
    score: number;
    totalQuestions: number;
    userAnswers?: number[];
    questions?: QuizQuestion[];
  };
  [SCREENS.QUIZ_BOOKS]: undefined;
  [SCREENS.QUIZ_BOOK_PLAY]: { bookQuiz: BookQuiz };
  [SCREENS.BIBLE]: undefined;
  [SCREENS.BIBLE_BOOK]: { book: BibleBook };
  [SCREENS.BIBLE_CHAPTER]: { bookId: string; bookName: string; chapter: number; scrollToVerse?: number };
  [SCREENS.VERSE_COMPARE]: { bookId: string; bookName: string; chapter: number; verses: number[] };
  [SCREENS.NOTES]: undefined;
  [SCREENS.NOTE_DETAIL]: { note: Note };
  [SCREENS.NOTE_EDIT]: { note?: Note; linkedVerseRef?: string; prefillTitle?: string; prefillContent?: string };
  [SCREENS.READING_PLANS]: undefined;
  [SCREENS.READING_PLAN_DETAIL]: { plan: ReadingPlan; userPlanId?: string };
  [SCREENS.READING_PLAN_DAY]: { plan: ReadingPlan; day: ReadingPlanDay; userPlanId?: string };
  [SCREENS.READING_PLAN_READER]: {
    plan: ReadingPlan;
    day: ReadingPlanDay;
    userPlanId?: string;
    initialReadingIndex: number;
  };
};

// Meditation types
export type MeditationCategory =
  | 'foi'
  | 'amour'
  | 'pardon'
  | 'priere'
  | 'esperance'
  | 'sagesse'
  | 'paix'
  | 'identite'
  | 'autorite'
  | 'puissance'
  | 'victoire'
  | 'guerison'
  | 'provision'
  | 'protection'
  | 'famille'
  | 'service'
  | 'saintete'
  | 'obeissance'
  | 'louange'
  | 'grace'
  | 'humilite';

export interface Meditation {
  id: string;
  title: string;
  verse: string;
  verseRef: string;
  content: string;
  reflection: string;
  prayer: string;
  date: string;
  author?: string;
  category: MeditationCategory;
}

export interface MeditationCategoryInfo {
  key: MeditationCategory;
  label: string;
  icon: string;
}

export const MEDITATION_CATEGORIES: MeditationCategoryInfo[] = [
  { key: 'foi', label: 'Foi', icon: 'shield-checkmark' },
  { key: 'amour', label: 'Amour', icon: 'heart' },
  { key: 'pardon', label: 'Pardon', icon: 'hand-right' },
  { key: 'priere', label: 'Prière', icon: 'prism' },
  { key: 'esperance', label: 'Espérance', icon: 'sunny' },
  { key: 'sagesse', label: 'Sagesse', icon: 'bulb' },
  { key: 'paix', label: 'Paix', icon: 'leaf' },
  { key: 'identite', label: 'Identité en Christ', icon: 'person' },
  { key: 'autorite', label: 'Autorité spirituelle', icon: 'key' },
  { key: 'puissance', label: 'Puissance de Dieu', icon: 'flash' },
  { key: 'victoire', label: 'Victoire', icon: 'trophy' },
  { key: 'guerison', label: 'Guérison', icon: 'medkit' },
  { key: 'provision', label: 'Provision divine', icon: 'gift' },
  { key: 'protection', label: 'Protection', icon: 'shield' },
  { key: 'famille', label: 'Famille', icon: 'people' },
  { key: 'service', label: 'Service', icon: 'hand-left' },
  { key: 'saintete', label: 'Sainteté', icon: 'sparkles' },
  { key: 'obeissance', label: 'Obéissance', icon: 'checkmark-circle' },
  { key: 'louange', label: 'Louange', icon: 'musical-notes' },
  { key: 'grace', label: 'Grâce', icon: 'water' },
  { key: 'humilite', label: 'Humilité', icon: 'heart-outline' },
];

// Quiz types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimit?: number; // in minutes
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  verseRef?: string;
}

export type QuizCategory = 'ancien_testament' | 'nouveau_testament' | 'personnages' | 'versets' | 'general' | 'livres';

// Book Quiz types
export interface BookQuiz {
  id: string;
  bookId: string;
  bookName: string;
  testament: 'old' | 'new';
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface BookQuizQuestion {
  id: string;
  bookId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  verseRef?: string;
}

export type MainTabParamList = {
  [SCREENS.HOME_TAB]: undefined;
  [SCREENS.HYMNS_TAB]: undefined;
  [SCREENS.TV_TAB]: undefined;
  [SCREENS.PROGRAM_TAB]: undefined;
  [SCREENS.PROFILE_TAB]: undefined;
};

// Bible types
export interface BibleBook {
  id: string;
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'old' | 'new';
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

// Verse Highlight types
export type HighlightColor = 'yellow' | 'green' | 'red' | 'pink' | 'violet';

export const HIGHLIGHT_COLORS: Record<HighlightColor, string> = {
  yellow: '#FACC15',
  green: '#22C55E',
  red: '#EF4444',
  pink: '#EC4899',
  violet: '#8B5CF6',
};

export const HIGHLIGHT_TEXT_COLORS: Record<HighlightColor, string> = {
  yellow: '#000000',
  green: '#FFFFFF',
  red: '#FFFFFF',
  pink: '#FFFFFF',
  violet: '#FFFFFF',
};

export interface VerseHighlight {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  createdAt: string;
}

// Verse Bookmark types
export interface VerseBookmark {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  note?: string;
  createdAt: string;
}

// Parsed Verse Reference
export interface ParsedVerseRef {
  bookId: string;
  bookName: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
}

// User Highlight Preferences
export interface UserHighlightPreferences {
  recentColors: HighlightColor[];
  defaultColor: HighlightColor;
}

export type SyncStatus = 'local' | 'synced' | 'pending' | 'conflict';

export interface Note {
  id: string;
  title: string;
  content: string;
  contentPlain: string;
  category: NoteCategory;
  linkedVerseRef?: string;
  linkedBookId?: string;
  linkedChapter?: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

export type NoteCategory = 'meditation' | 'predication' | 'etude' | 'priere' | 'personnel';

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

export interface ReadingPlanProgressEntry {
  id: string;
  userPlanId: string;
  dayNumber: number;
  completedAt?: string;
  readingsCompleted: number[];
  notes?: string;
}

// Reading Plan types
export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  category: ReadingPlanCategory;
  imageUrl?: string;
  days: ReadingPlanDay[];
  startDate?: string; // ISO date when user started this plan
  completedDays?: string[]; // IDs of completed days
}

export interface ReadingPlanDay {
  id: string;
  day: number;
  title: string;
  readings: ReadingPlanReading[];
  reflection?: string;
}

export interface ReadingPlanReading {
  bookId: string;
  bookName: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
}

export type ReadingPlanCategory = 'debutant' | 'annuel' | 'thematique' | 'livre';
