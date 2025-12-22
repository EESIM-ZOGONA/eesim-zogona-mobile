import { ReadingPlan, ReadingPlanDay, ReadingPlanReading } from '../../types';

const chronologicalOrder: { bookId: string; bookName: string; chapters: number[] }[] = [
  { bookId: 'gen', bookName: 'Genèse', chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { bookId: 'job', bookName: 'Job', chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42] },
  { bookId: 'gen', bookName: 'Genèse', chapters: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50] },
  { bookId: 'exod', bookName: 'Exode', chapters: Array.from({ length: 40 }, (_, i) => i + 1) },
  { bookId: 'lev', bookName: 'Lévitique', chapters: Array.from({ length: 27 }, (_, i) => i + 1) },
  { bookId: 'num', bookName: 'Nombres', chapters: Array.from({ length: 36 }, (_, i) => i + 1) },
  { bookId: 'deut', bookName: 'Deutéronome', chapters: Array.from({ length: 34 }, (_, i) => i + 1) },
  { bookId: 'josh', bookName: 'Josué', chapters: Array.from({ length: 24 }, (_, i) => i + 1) },
  { bookId: 'judg', bookName: 'Juges', chapters: Array.from({ length: 21 }, (_, i) => i + 1) },
  { bookId: 'ruth', bookName: 'Ruth', chapters: [1, 2, 3, 4] },
  { bookId: '1sam', bookName: '1 Samuel', chapters: Array.from({ length: 31 }, (_, i) => i + 1) },
  { bookId: 'ps', bookName: 'Psaumes', chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41] },
  { bookId: '2sam', bookName: '2 Samuel', chapters: Array.from({ length: 24 }, (_, i) => i + 1) },
  { bookId: 'ps', bookName: 'Psaumes', chapters: Array.from({ length: 109 }, (_, i) => i + 42) },
  { bookId: '1kgs', bookName: '1 Rois', chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { bookId: 'prov', bookName: 'Proverbes', chapters: Array.from({ length: 31 }, (_, i) => i + 1) },
  { bookId: 'eccl', bookName: 'Ecclésiaste', chapters: Array.from({ length: 12 }, (_, i) => i + 1) },
  { bookId: 'song', bookName: 'Cantique', chapters: Array.from({ length: 8 }, (_, i) => i + 1) },
  { bookId: '1kgs', bookName: '1 Rois', chapters: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
  { bookId: '2kgs', bookName: '2 Rois', chapters: Array.from({ length: 25 }, (_, i) => i + 1) },
  { bookId: '1chr', bookName: '1 Chroniques', chapters: Array.from({ length: 29 }, (_, i) => i + 1) },
  { bookId: '2chr', bookName: '2 Chroniques', chapters: Array.from({ length: 36 }, (_, i) => i + 1) },
  { bookId: 'obad', bookName: 'Abdias', chapters: [1] },
  { bookId: 'joel', bookName: 'Joël', chapters: [1, 2, 3] },
  { bookId: 'jonah', bookName: 'Jonas', chapters: [1, 2, 3, 4] },
  { bookId: 'amos', bookName: 'Amos', chapters: Array.from({ length: 9 }, (_, i) => i + 1) },
  { bookId: 'hos', bookName: 'Osée', chapters: Array.from({ length: 14 }, (_, i) => i + 1) },
  { bookId: 'isa', bookName: 'Ésaïe', chapters: Array.from({ length: 66 }, (_, i) => i + 1) },
  { bookId: 'mic', bookName: 'Michée', chapters: Array.from({ length: 7 }, (_, i) => i + 1) },
  { bookId: 'nah', bookName: 'Nahum', chapters: [1, 2, 3] },
  { bookId: 'zeph', bookName: 'Sophonie', chapters: [1, 2, 3] },
  { bookId: 'hab', bookName: 'Habacuc', chapters: [1, 2, 3] },
  { bookId: 'jer', bookName: 'Jérémie', chapters: Array.from({ length: 52 }, (_, i) => i + 1) },
  { bookId: 'lam', bookName: 'Lamentations', chapters: [1, 2, 3, 4, 5] },
  { bookId: 'ezek', bookName: 'Ézéchiel', chapters: Array.from({ length: 48 }, (_, i) => i + 1) },
  { bookId: 'dan', bookName: 'Daniel', chapters: Array.from({ length: 12 }, (_, i) => i + 1) },
  { bookId: 'ezra', bookName: 'Esdras', chapters: Array.from({ length: 10 }, (_, i) => i + 1) },
  { bookId: 'neh', bookName: 'Néhémie', chapters: Array.from({ length: 13 }, (_, i) => i + 1) },
  { bookId: 'esth', bookName: 'Esther', chapters: Array.from({ length: 10 }, (_, i) => i + 1) },
  { bookId: 'hag', bookName: 'Aggée', chapters: [1, 2] },
  { bookId: 'zech', bookName: 'Zacharie', chapters: Array.from({ length: 14 }, (_, i) => i + 1) },
  { bookId: 'mal', bookName: 'Malachie', chapters: [1, 2, 3, 4] },
  { bookId: 'matt', bookName: 'Matthieu', chapters: Array.from({ length: 28 }, (_, i) => i + 1) },
  { bookId: 'mark', bookName: 'Marc', chapters: Array.from({ length: 16 }, (_, i) => i + 1) },
  { bookId: 'luke', bookName: 'Luc', chapters: Array.from({ length: 24 }, (_, i) => i + 1) },
  { bookId: 'john', bookName: 'Jean', chapters: Array.from({ length: 21 }, (_, i) => i + 1) },
  { bookId: 'acts', bookName: 'Actes', chapters: Array.from({ length: 28 }, (_, i) => i + 1) },
  { bookId: 'jas', bookName: 'Jacques', chapters: [1, 2, 3, 4, 5] },
  { bookId: 'gal', bookName: 'Galates', chapters: [1, 2, 3, 4, 5, 6] },
  { bookId: '1thess', bookName: '1 Thessaloniciens', chapters: [1, 2, 3, 4, 5] },
  { bookId: '2thess', bookName: '2 Thessaloniciens', chapters: [1, 2, 3] },
  { bookId: '1cor', bookName: '1 Corinthiens', chapters: Array.from({ length: 16 }, (_, i) => i + 1) },
  { bookId: '2cor', bookName: '2 Corinthiens', chapters: Array.from({ length: 13 }, (_, i) => i + 1) },
  { bookId: 'rom', bookName: 'Romains', chapters: Array.from({ length: 16 }, (_, i) => i + 1) },
  { bookId: 'eph', bookName: 'Éphésiens', chapters: [1, 2, 3, 4, 5, 6] },
  { bookId: 'phil', bookName: 'Philippiens', chapters: [1, 2, 3, 4] },
  { bookId: 'col', bookName: 'Colossiens', chapters: [1, 2, 3, 4] },
  { bookId: 'phlm', bookName: 'Philémon', chapters: [1] },
  { bookId: '1tim', bookName: '1 Timothée', chapters: [1, 2, 3, 4, 5, 6] },
  { bookId: 'titus', bookName: 'Tite', chapters: [1, 2, 3] },
  { bookId: '2tim', bookName: '2 Timothée', chapters: [1, 2, 3, 4] },
  { bookId: '1pet', bookName: '1 Pierre', chapters: [1, 2, 3, 4, 5] },
  { bookId: '2pet', bookName: '2 Pierre', chapters: [1, 2, 3] },
  { bookId: 'heb', bookName: 'Hébreux', chapters: Array.from({ length: 13 }, (_, i) => i + 1) },
  { bookId: 'jude', bookName: 'Jude', chapters: [1] },
  { bookId: '1john', bookName: '1 Jean', chapters: [1, 2, 3, 4, 5] },
  { bookId: '2john', bookName: '2 Jean', chapters: [1] },
  { bookId: '3john', bookName: '3 Jean', chapters: [1] },
  { bookId: 'rev', bookName: 'Apocalypse', chapters: Array.from({ length: 22 }, (_, i) => i + 1) },
];

function generateChronologicalPlan(): ReadingPlan {
  const allReadings: ReadingPlanReading[] = [];

  for (const section of chronologicalOrder) {
    for (const chapter of section.chapters) {
      allReadings.push({
        bookId: section.bookId,
        bookName: section.bookName,
        chapter,
      });
    }
  }

  const days: ReadingPlanDay[] = [];
  const chaptersPerDay = Math.ceil(allReadings.length / 365);

  for (let dayNumber = 1; dayNumber <= 365; dayNumber++) {
    const startIndex = (dayNumber - 1) * chaptersPerDay;
    const endIndex = Math.min(startIndex + chaptersPerDay, allReadings.length);
    const dayReadings = allReadings.slice(startIndex, endIndex);

    if (dayReadings.length === 0) continue;

    const firstReading = dayReadings[0];
    const lastReading = dayReadings[dayReadings.length - 1];

    let dayTitle = '';
    if (firstReading.bookId === lastReading.bookId) {
      if (dayReadings.length === 1) {
        dayTitle = `${firstReading.bookName} ${firstReading.chapter}`;
      } else {
        dayTitle = `${firstReading.bookName} ${firstReading.chapter}-${lastReading.chapter}`;
      }
    } else {
      dayTitle = `${firstReading.bookName} - ${lastReading.bookName}`;
    }

    days.push({
      id: `chrono-day-${dayNumber}`,
      day: dayNumber,
      title: dayTitle,
      readings: dayReadings,
    });
  }

  return {
    id: 'annual-chronological',
    title: 'Bible en 1 an - Chronologique',
    description: 'Découvrez la Bible dans l\'ordre historique des événements, de la Création à l\'Apocalypse.',
    duration: 365,
    category: 'annuel',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    days,
  };
}

export const chronologicalPlan = generateChronologicalPlan();
