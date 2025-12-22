export const SCREENS = {
  ONBOARDING: 'Onboarding',
  AUTH: 'Auth',
  LOGIN: 'Login',
  OTP: 'Otp',
  MAIN: 'Main',

  HOME: 'Home',
  HOME_TAB: 'HomeTab',

  HYMNS: 'Hymns',
  HYMNS_TAB: 'HymnsTab',
  HYMN_DETAIL: 'HymnDetail',

  TV: 'TV',
  TV_TAB: 'TVTab',
  VIDEO_PLAYER: 'VideoPlayer',

  PROGRAM: 'Program',
  PROGRAM_TAB: 'ProgramTab',
  PROGRAM_DETAIL: 'ProgramDetail',

  PROFILE: 'Profile',
  PROFILE_TAB: 'ProfileTab',
  SETTINGS: 'Settings',
  EDIT_PROFILE: 'EditProfile',
  NOTIFICATIONS: 'Notifications',
  ABOUT: 'About',
  HELP_SUPPORT: 'HelpSupport',
  MY_EVENTS: 'MyEvents',
  MY_DONATIONS: 'MyDonations',
  MY_CELL: 'MyCell',
  MY_FAVORITES: 'MyFavorites',
  SOCIAL_MEDIA: 'SocialMedia',

  EVENTS: 'Events',
  EVENT_DETAIL: 'EventDetail',

  MEDITATIONS: 'Meditations',
  MEDITATION_LIST: 'MeditationList',
  MEDITATION_DETAIL: 'MeditationDetail',

  QUIZ: 'Quiz',
  QUIZ_CATEGORY: 'QuizCategory',
  QUIZ_PLAY: 'QuizPlay',
  QUIZ_RESULT: 'QuizResult',

  BIBLE: 'Bible',
  BIBLE_BOOK: 'BibleBook',
  BIBLE_CHAPTER: 'BibleChapter',
  VERSE_COMPARE: 'VerseCompare',

  NOTES: 'Notes',
  NOTE_DETAIL: 'NoteDetail',
  NOTE_EDIT: 'NoteEdit',

  READING_PLANS: 'ReadingPlans',
  READING_PLAN_DETAIL: 'ReadingPlanDetail',
  READING_PLAN_DAY: 'ReadingPlanDay',
} as const;

export type ScreenName = typeof SCREENS[keyof typeof SCREENS];
