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

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Login: undefined;
  Otp: { phone: string };
  Main: undefined;
  Home: undefined;
  Hymns: undefined;
  HymnDetail: { hymn: Hymn };
  TV: undefined;
  VideoPlayer: {
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
  Program: undefined;
  ProgramDetail: { activity: ProgramActivity };
  Events: undefined;
  EventDetail: { event: Event };
  Profile: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  About: undefined;
  HelpSupport: undefined;
  MyEvents: undefined;
  MyDonations: undefined;
  MyCell: undefined;
  MyFavorites: undefined;
  SocialMedia: undefined;
  Meditations: undefined;
  MeditationList: { category?: MeditationCategory };
  MeditationDetail: { meditation: Meditation };
  Quiz: undefined;
  QuizCategory: { category: QuizCategory };
  QuizPlay: { quiz: Quiz };
  QuizResult: {
    quiz: Quiz;
    score: number;
    totalQuestions: number;
    userAnswers?: number[];
    questions?: QuizQuestion[];
  };
};

// Meditation types
export type MeditationCategory = 'foi' | 'amour' | 'pardon' | 'priere' | 'esperance' | 'sagesse' | 'paix';

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
  imageUrl?: string;
  category: MeditationCategory;
  relatedHymnId?: string;
}

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

export type QuizCategory = 'ancien_testament' | 'nouveau_testament' | 'personnages' | 'versets' | 'general';

export type MainTabParamList = {
  HomeTab: undefined;
  HymnsTab: undefined;
  TVTab: undefined;
  ProgramTab: undefined;
  ProfileTab: undefined;
};
