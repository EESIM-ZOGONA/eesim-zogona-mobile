import { ReadingPlan, ReadingPlanDay, ReadingPlanReading } from '../../types';
import { bibleBooks, otBooks, ntBooks } from './bible-structure';

function generateMixedPlan(): ReadingPlan {
  const days: ReadingPlanDay[] = [];

  let otBookIndex = 0;
  let otChapter = 1;
  let ntBookIndex = 0;
  let ntChapter = 1;

  const otChaptersPerDay = Math.ceil(929 / 365);
  const ntChaptersPerDay = Math.ceil(260 / 365);

  for (let dayNumber = 1; dayNumber <= 365; dayNumber++) {
    const readings: ReadingPlanReading[] = [];

    let otRead = 0;
    while (otRead < otChaptersPerDay && otBookIndex < otBooks.length) {
      const book = otBooks[otBookIndex];
      readings.push({
        bookId: book.id,
        bookName: book.name,
        chapter: otChapter,
      });
      otRead++;
      otChapter++;
      if (otChapter > book.chapters) {
        otBookIndex++;
        otChapter = 1;
      }
    }

    let ntRead = 0;
    while (ntRead < ntChaptersPerDay && ntBookIndex < ntBooks.length) {
      const book = ntBooks[ntBookIndex];
      readings.push({
        bookId: book.id,
        bookName: book.name,
        chapter: ntChapter,
      });
      ntRead++;
      ntChapter++;
      if (ntChapter > book.chapters) {
        ntBookIndex++;
        ntChapter = 1;
      }
    }

    const otReadings = readings.filter(r => otBooks.some(b => b.id === r.bookId));
    const ntReadings = readings.filter(r => ntBooks.some(b => b.id === r.bookId));

    let dayTitle = '';
    if (otReadings.length > 0 && ntReadings.length > 0) {
      dayTitle = `${otReadings[0].bookName} + ${ntReadings[0].bookName}`;
    } else if (otReadings.length > 0) {
      dayTitle = otReadings[0].bookName;
    } else if (ntReadings.length > 0) {
      dayTitle = ntReadings[0].bookName;
    }

    days.push({
      id: `mixed-day-${dayNumber}`,
      day: dayNumber,
      title: dayTitle,
      readings,
    });
  }

  return {
    id: 'annual-mixed',
    title: 'Bible en 1 an - Mixte',
    description: 'Lisez l\'Ancien et le Nouveau Testament chaque jour pour une perspective équilibrée.',
    duration: 365,
    category: 'annuel',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    days,
  };
}

export const mixedPlan = generateMixedPlan();
