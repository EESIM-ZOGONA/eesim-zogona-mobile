import { ReadingPlan } from '../types';

// Plans de lecture prédéfinis
export const readingPlans: ReadingPlan[] = [
  {
    id: 'debutant-7-jours',
    title: 'Premiers pas',
    description: 'Un plan de 7 jours pour découvrir les passages essentiels de la Bible',
    duration: 7,
    category: 'debutant',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    days: [
      {
        id: 'd1',
        day: 1,
        title: 'La Création',
        readings: [
          { bookId: 'gen', bookName: 'Genèse', chapter: 1 },
        ],
        reflection: 'Dieu a créé toutes choses bonnes. Comment voyez-vous la création de Dieu dans votre vie quotidienne?',
      },
      {
        id: 'd2',
        day: 2,
        title: 'L\'amour de Dieu',
        readings: [
          { bookId: 'jhn', bookName: 'Jean', chapter: 3, verseStart: 1, verseEnd: 21 },
        ],
        reflection: 'Jean 3:16 est l\'un des versets les plus connus. Comment Dieu vous a-t-il montré son amour?',
      },
      {
        id: 'd3',
        day: 3,
        title: 'Le Bon Berger',
        readings: [
          { bookId: 'psa', bookName: 'Psaumes', chapter: 23 },
        ],
        reflection: 'Le Seigneur est notre berger. Dans quels domaines avez-vous besoin de sa guidance?',
      },
      {
        id: 'd4',
        day: 4,
        title: 'La Sagesse',
        readings: [
          { bookId: 'pro', bookName: 'Proverbes', chapter: 3, verseStart: 1, verseEnd: 18 },
        ],
        reflection: 'La sagesse vient de Dieu. Comment pouvez-vous chercher sa sagesse aujourd\'hui?',
      },
      {
        id: 'd5',
        day: 5,
        title: 'Le Sermon sur la Montagne',
        readings: [
          { bookId: 'mat', bookName: 'Matthieu', chapter: 5, verseStart: 1, verseEnd: 16 },
        ],
        reflection: 'Jésus nous appelle à être le sel et la lumière. Comment pouvez-vous briller là où vous êtes?',
      },
      {
        id: 'd6',
        day: 6,
        title: 'L\'Amour',
        readings: [
          { bookId: '1co', bookName: '1 Corinthiens', chapter: 13 },
        ],
        reflection: 'L\'amour est la plus grande vertu. Quel aspect de l\'amour devez-vous développer?',
      },
      {
        id: 'd7',
        day: 7,
        title: 'La Foi',
        readings: [
          { bookId: 'heb', bookName: 'Hébreux', chapter: 11, verseStart: 1, verseEnd: 16 },
        ],
        reflection: 'Les héros de la foi nous inspirent. Qu\'avez-vous appris cette semaine?',
      },
    ],
  },
  {
    id: 'evangile-jean-21-jours',
    title: 'L\'Évangile de Jean',
    description: 'Découvrez la vie de Jésus à travers l\'Évangile de Jean en 21 jours',
    duration: 21,
    category: 'livre',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    days: Array.from({ length: 21 }, (_, i) => ({
      id: `jean-d${i + 1}`,
      day: i + 1,
      title: `Jean ${i + 1}`,
      readings: [
        { bookId: 'jhn', bookName: 'Jean', chapter: i + 1 },
      ],
    })),
  },
  {
    id: 'psaumes-30-jours',
    title: 'Les Psaumes de louange',
    description: 'Un mois dans les Psaumes pour grandir dans la louange et l\'adoration',
    duration: 30,
    category: 'thematique',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
    days: [
      { id: 'ps-d1', day: 1, title: 'Psaume 1', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 1 }] },
      { id: 'ps-d2', day: 2, title: 'Psaume 8', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 8 }] },
      { id: 'ps-d3', day: 3, title: 'Psaume 16', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 16 }] },
      { id: 'ps-d4', day: 4, title: 'Psaume 19', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 19 }] },
      { id: 'ps-d5', day: 5, title: 'Psaume 23', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 23 }] },
      { id: 'ps-d6', day: 6, title: 'Psaume 24', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 24 }] },
      { id: 'ps-d7', day: 7, title: 'Psaume 27', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 27 }] },
      { id: 'ps-d8', day: 8, title: 'Psaume 32', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 32 }] },
      { id: 'ps-d9', day: 9, title: 'Psaume 34', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 34 }] },
      { id: 'ps-d10', day: 10, title: 'Psaume 37', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 37 }] },
      { id: 'ps-d11', day: 11, title: 'Psaume 40', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 40 }] },
      { id: 'ps-d12', day: 12, title: 'Psaume 46', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 46 }] },
      { id: 'ps-d13', day: 13, title: 'Psaume 51', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 51 }] },
      { id: 'ps-d14', day: 14, title: 'Psaume 63', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 63 }] },
      { id: 'ps-d15', day: 15, title: 'Psaume 84', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 84 }] },
      { id: 'ps-d16', day: 16, title: 'Psaume 90', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 90 }] },
      { id: 'ps-d17', day: 17, title: 'Psaume 91', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 91 }] },
      { id: 'ps-d18', day: 18, title: 'Psaume 95', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 95 }] },
      { id: 'ps-d19', day: 19, title: 'Psaume 100', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 100 }] },
      { id: 'ps-d20', day: 20, title: 'Psaume 103', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 103 }] },
      { id: 'ps-d21', day: 21, title: 'Psaume 118', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 118 }] },
      { id: 'ps-d22', day: 22, title: 'Psaume 119:1-48', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 119, verseStart: 1, verseEnd: 48 }] },
      { id: 'ps-d23', day: 23, title: 'Psaume 119:49-104', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 119, verseStart: 49, verseEnd: 104 }] },
      { id: 'ps-d24', day: 24, title: 'Psaume 119:105-176', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 119, verseStart: 105, verseEnd: 176 }] },
      { id: 'ps-d25', day: 25, title: 'Psaume 121', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 121 }] },
      { id: 'ps-d26', day: 26, title: 'Psaume 139', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 139 }] },
      { id: 'ps-d27', day: 27, title: 'Psaume 145', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 145 }] },
      { id: 'ps-d28', day: 28, title: 'Psaume 146', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 146 }] },
      { id: 'ps-d29', day: 29, title: 'Psaume 148', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 148 }] },
      { id: 'ps-d30', day: 30, title: 'Psaume 150', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 150 }] },
    ],
  },
  {
    id: 'priere-14-jours',
    title: 'Apprendre à prier',
    description: 'Un parcours de 14 jours pour approfondir votre vie de prière',
    duration: 14,
    category: 'thematique',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    days: [
      { id: 'pr-d1', day: 1, title: 'Le Notre Père', readings: [{ bookId: 'mat', bookName: 'Matthieu', chapter: 6, verseStart: 5, verseEnd: 15 }], reflection: 'Jésus nous enseigne comment prier. Que retenez-vous de ce modèle?' },
      { id: 'pr-d2', day: 2, title: 'Prier avec foi', readings: [{ bookId: 'mat', bookName: 'Matthieu', chapter: 7, verseStart: 7, verseEnd: 11 }] },
      { id: 'pr-d3', day: 3, title: 'La prière persévérante', readings: [{ bookId: 'luk', bookName: 'Luc', chapter: 18, verseStart: 1, verseEnd: 8 }] },
      { id: 'pr-d4', day: 4, title: 'L\'humilité dans la prière', readings: [{ bookId: 'luk', bookName: 'Luc', chapter: 18, verseStart: 9, verseEnd: 14 }] },
      { id: 'pr-d5', day: 5, title: 'La prière de Daniel', readings: [{ bookId: 'dan', bookName: 'Daniel', chapter: 9, verseStart: 1, verseEnd: 19 }] },
      { id: 'pr-d6', day: 6, title: 'Anne prie', readings: [{ bookId: '1sa', bookName: '1 Samuel', chapter: 1, verseStart: 1, verseEnd: 20 }] },
      { id: 'pr-d7', day: 7, title: 'La prière d\'Élie', readings: [{ bookId: '1ki', bookName: '1 Rois', chapter: 18, verseStart: 36, verseEnd: 46 }] },
      { id: 'pr-d8', day: 8, title: 'Prier ensemble', readings: [{ bookId: 'act', bookName: 'Actes', chapter: 4, verseStart: 23, verseEnd: 31 }] },
      { id: 'pr-d9', day: 9, title: 'L\'intercession', readings: [{ bookId: 'rom', bookName: 'Romains', chapter: 8, verseStart: 26, verseEnd: 34 }] },
      { id: 'pr-d10', day: 10, title: 'Prier sans cesse', readings: [{ bookId: '1th', bookName: '1 Thessaloniciens', chapter: 5, verseStart: 16, verseEnd: 28 }] },
      { id: 'pr-d11', day: 11, title: 'La prière de Jésus', readings: [{ bookId: 'jhn', bookName: 'Jean', chapter: 17 }] },
      { id: 'pr-d12', day: 12, title: 'Psaume de prière', readings: [{ bookId: 'psa', bookName: 'Psaumes', chapter: 86 }] },
      { id: 'pr-d13', day: 13, title: 'Demander selon sa volonté', readings: [{ bookId: '1jn', bookName: '1 Jean', chapter: 5, verseStart: 13, verseEnd: 21 }] },
      { id: 'pr-d14', day: 14, title: 'La prière efficace', readings: [{ bookId: 'jas', bookName: 'Jacques', chapter: 5, verseStart: 13, verseEnd: 20 }] },
    ],
  },
];

// Fonction pour obtenir le plan actif de l'utilisateur
export function getActivePlan(planId: string): ReadingPlan | undefined {
  return readingPlans.find(p => p.id === planId);
}

// Fonction pour calculer la progression
export function calculateProgress(plan: ReadingPlan): { completed: number; total: number; percentage: number } {
  const completedCount = plan.completedDays?.length || 0;
  const total = plan.days.length;
  return {
    completed: completedCount,
    total,
    percentage: Math.round((completedCount / total) * 100),
  };
}

// Fonction pour obtenir le jour actuel du plan
export function getCurrentDayIndex(plan: ReadingPlan): number {
  if (!plan.startDate) return 0;

  const start = new Date(plan.startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return Math.min(diffDays, plan.days.length - 1);
}
