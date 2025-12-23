# Schéma API - EE/SIM Zogona Mobile App

## Résumé des Données Mock/Hardcodées

### 1. Données actuellement mock (à migrer vers API)

| Section | Fichier Source | Données | Priorité |
|---------|----------------|---------|----------|
| Events | `mock-data.ts` | `mockEvents` | Haute |
| Programme | `mock-data.ts` | `mockProgramActivities`, `mockWeeklyProgram` | Haute |
| Prédications | `mock-data.ts` | `mockPredications` | Moyenne |
| Cantiques | `mock-data.ts` | `mockHymns` (backup, SQLite prioritaire) | Basse |
| Infos Église | `mock-data.ts` | `churchInfo`, `scheduleHighlights` | Basse |
| Quick Actions | `mock-data.ts` | `mockQuickActions` | Basse |
| Auth | `auth-context.tsx` | OTP verification (hardcoded '123456') | Haute |
| Profil Stats | `profile-screen.tsx` | Favoris: 12, Events: 5, Dons: 3 | Moyenne |

### 2. Données stockées localement (SQLite)

| Section | Base de données | Tables |
|---------|-----------------|--------|
| Bible | `eesim-bible.db` | `verses`, `bookmarks`, `highlights` |
| Notes | `eesim-notes.db` | `notes` |
| Plans de lecture | `eesim-reading-plans.db` | `user_reading_plans`, `reading_progress` |
| Cantiques | `eesim-hymns.db` | `hymns` |
| Méditations | `eesim-meditations.db` | `meditations` |
| Quiz Livres | `eesim-book-quiz.db` | `book_quizzes`, `book_quiz_questions` |
| Settings | `eesim-settings.db` | `app_settings`, `user_preferences` |

### 3. Données via API existante

| Endpoint | Données |
|----------|---------|
| `GET /api/videos` | Vidéos YouTube |
| `GET /api/videos/playlists` | Playlists |
| `GET /api/videos/:id` | Détail vidéo |

---

## Schéma API Proposé

### Base URL
```
https://api.eesimzogona.org/v1
```

### Authentification

#### POST /auth/request-otp
```typescript
// Request
{
  phone: string;        // Format: "+226XXXXXXXX"
}

// Response
{
  success: boolean;
  message: string;
  expiresIn: number;    // Seconds until OTP expires
}
```

#### POST /auth/verify-otp
```typescript
// Request
{
  phone: string;
  otp: string;
}

// Response
{
  success: boolean;
  user: User;
  token: string;        // JWT token
  refreshToken: string;
}
```

#### POST /auth/refresh
```typescript
// Request
{
  refreshToken: string;
}

// Response
{
  token: string;
  refreshToken: string;
}
```

---

### Types Communs

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

type SyncStatus = 'local' | 'synced' | 'pending' | 'conflict';
```

---

### Utilisateurs

#### GET /users/me
```typescript
// Response
interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  avatar?: string;
  cellGroup?: CellGroup;
  createdAt: string;
  updatedAt: string;
}
```

#### PATCH /users/me
```typescript
// Request
{
  name?: string;
  email?: string;
  avatar?: string;  // Base64 or URL
}

// Response: User
```

---

### Événements

#### GET /events
```typescript
// Query params
{
  page?: number;
  perPage?: number;
  category?: EventCategory;
  startDate?: string;  // ISO date
  endDate?: string;
}

// Response: PaginatedResponse<Event>

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;           // ISO datetime
  endDate?: string;
  time: string;
  location: string;
  imageUrl?: string;
  category: EventCategory;
  isRecurring: boolean;
  registrationRequired: boolean;
  registrationUrl?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  createdAt: string;
  updatedAt: string;
}

type EventCategory =
  | 'culte'
  | 'reunion'
  | 'jeune'
  | 'evangelisation'
  | 'formation'
  | 'autre';
```

#### GET /events/:id
```typescript
// Response: Event
```

#### POST /events/:id/register
```typescript
// Response
{
  success: boolean;
  registration: {
    id: string;
    eventId: string;
    userId: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    createdAt: string;
  };
}
```

---

### Programme Hebdomadaire

#### GET /program
```typescript
// Query params
{
  weekOffset?: number;  // 0 = current week, 1 = next week, etc.
}

// Response
interface WeeklyProgram {
  weekStart: string;    // ISO date
  weekEnd: string;
  activities: ProgramActivity[];
}

interface ProgramActivity {
  id: string;
  title: string;
  date: string;         // ISO datetime
  startTime: string;    // "HH:mm"
  endTime?: string;
  description?: string;
  location?: string;
  category: ProgramCategory;
  isOnline: boolean;
  onlineUrl?: string;
  isImportant: boolean;
  isCancelled: boolean;
  createdAt: string;
  updatedAt: string;
}

type ProgramCategory =
  | 'culte'
  | 'reunion'
  | 'jeune'
  | 'priere'
  | 'etude'
  | 'chorale'
  | 'autre';
```

---

### Prédications / Messages

#### GET /messages
```typescript
// Query params
{
  page?: number;
  perPage?: number;
  authorId?: string;
  search?: string;
}

// Response: PaginatedResponse<Message>

interface Message {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  imageUrl?: string;
  audioUrl?: string;
  videoId?: string;     // Link to video
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
```

---

### Cellules de Maison

#### GET /cells
```typescript
// Response: CellGroup[]

interface CellGroup {
  id: string;
  name: string;
  leader: {
    id: string;
    name: string;
    phone: string;
  };
  location: string;
  meetingDay: string;
  meetingTime: string;
  memberCount: number;
  zone: string;
}
```

#### GET /cells/:id
```typescript
// Response
interface CellGroupDetail extends CellGroup {
  members: CellMember[];
  nextMeeting?: {
    date: string;
    topic?: string;
  };
}

interface CellMember {
  id: string;
  name: string;
  phone?: string;
  role: 'leader' | 'assistant' | 'member';
  joinedAt: string;
}
```

---

### Dons

#### GET /donations/me
```typescript
// Query params
{
  page?: number;
  perPage?: number;
  startDate?: string;
  endDate?: string;
}

// Response: PaginatedResponse<Donation>

interface Donation {
  id: string;
  amount: number;
  currency: 'XOF' | 'EUR' | 'USD';
  type: DonationType;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: PaymentMethod;
  reference: string;
  date: string;
  receiptUrl?: string;
}

type DonationType =
  | 'dime'
  | 'offrande'
  | 'projet'
  | 'mission'
  | 'autre';

type PaymentMethod =
  | 'orange_money'
  | 'moov_money'
  | 'card'
  | 'bank_transfer';
```

#### POST /donations
```typescript
// Request
{
  amount: number;
  type: DonationType;
  paymentMethod: PaymentMethod;
  projectId?: string;   // For project donations
  isAnonymous?: boolean;
}

// Response
{
  donation: Donation;
  paymentUrl?: string;  // For mobile money redirect
}
```

---

### Synchronisation

#### POST /sync/push
```typescript
// Request - Push local changes to server
{
  settings?: AppSettings;
  preferences?: UserPreferences;
  notes?: Note[];
  highlights?: VerseHighlight[];
  bookmarks?: VerseBookmark[];
  readingProgress?: ReadingPlanProgress[];
}

// Response
{
  success: boolean;
  syncedAt: string;
  conflicts?: SyncConflict[];
}

interface SyncConflict {
  entityType: string;
  entityId: string;
  localVersion: any;
  serverVersion: any;
  resolvedAt?: string;
}
```

#### GET /sync/pull
```typescript
// Query params
{
  lastSyncAt?: string;  // ISO datetime
}

// Response
{
  settings?: AppSettings;
  preferences?: UserPreferences;
  notes?: Note[];
  highlights?: VerseHighlight[];
  bookmarks?: VerseBookmark[];
  readingProgress?: ReadingPlanProgress[];
  syncedAt: string;
}
```

---

### Notifications Push

#### POST /notifications/register
```typescript
// Request
{
  token: string;        // FCM/APNs token
  platform: 'ios' | 'android';
}

// Response
{
  success: boolean;
}
```

#### GET /notifications/preferences
```typescript
// Response
{
  enabled: boolean;
  culte: boolean;
  events: boolean;
  devotions: boolean;
  reminders: boolean;
}
```

#### PATCH /notifications/preferences
```typescript
// Request
{
  enabled?: boolean;
  culte?: boolean;
  events?: boolean;
  devotions?: boolean;
  reminders?: boolean;
}
```

---

### Infos Église

#### GET /church/info
```typescript
// Response
interface ChurchInfo {
  name: string;
  address: string;
  postalAddress: string;
  phones: string[];
  email: string;
  website: string;
  socialMedia: {
    youtube: string;
    facebook?: string;
    instagram?: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  bankDetails?: {
    bank: string;
    accountNumber: string;
    iban?: string;
  };
}
```

#### GET /church/schedule
```typescript
// Response
{
  highlights: ScheduleHighlight[];
  regularSchedule: WeeklyProgram;
}

interface ScheduleHighlight {
  id: string;
  title: string;
  day: string;
  time: string;
  icon: string;
}
```

---

### Types de Settings (pour sync)

```typescript
interface AppSettings {
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

interface UserPreferences {
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
```

---

## Prochaines Étapes

1. **Phase 1 - Auth & Profil**
   - Implémenter l'API d'authentification OTP
   - Endpoint profil utilisateur
   - Gestion du token JWT

2. **Phase 2 - Contenu Dynamique**
   - API Events (priorité haute)
   - API Programme hebdomadaire
   - API Messages/Prédications

3. **Phase 3 - Sync Cloud**
   - Push/Pull settings et préférences
   - Sync des notes et highlights
   - Résolution des conflits

4. **Phase 4 - Fonctionnalités Avancées**
   - Système de dons
   - Gestion des cellules
   - Notifications push
