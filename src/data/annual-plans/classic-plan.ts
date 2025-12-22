import { ReadingPlan, ReadingPlanDay, ReadingPlanReading } from '../../types';
import { bibleBooks } from './bible-structure';

function generateClassicPlan(): ReadingPlan {
  const days: ReadingPlanDay[] = [];
  let dayNumber = 1;
  let currentBookIndex = 0;
  let currentChapter = 1;

  const chaptersPerDay = Math.ceil(1189 / 365);

  while (dayNumber <= 365 && currentBookIndex < bibleBooks.length) {
    const readings: ReadingPlanReading[] = [];
    let chaptersToday = 0;

    while (chaptersToday < chaptersPerDay && currentBookIndex < bibleBooks.length) {
      const book = bibleBooks[currentBookIndex];
      const remainingInBook = book.chapters - currentChapter + 1;
      const chaptersNeeded = chaptersPerDay - chaptersToday;

      if (remainingInBook <= chaptersNeeded) {
        if (remainingInBook === 1) {
          readings.push({
            bookId: book.id,
            bookName: book.name,
            chapter: currentChapter,
          });
        } else {
          for (let ch = currentChapter; ch <= book.chapters; ch++) {
            readings.push({
              bookId: book.id,
              bookName: book.name,
              chapter: ch,
            });
          }
        }
        chaptersToday += remainingInBook;
        currentBookIndex++;
        currentChapter = 1;
      } else {
        const endChapter = currentChapter + chaptersNeeded - 1;
        for (let ch = currentChapter; ch <= endChapter; ch++) {
          readings.push({
            bookId: book.id,
            bookName: book.name,
            chapter: ch,
          });
        }
        currentChapter = endChapter + 1;
        chaptersToday += chaptersNeeded;
      }
    }

    const consolidatedReadings = consolidateReadings(readings);

    const firstReading = consolidatedReadings[0];
    const dayTitle = consolidatedReadings.length === 1
      ? `${firstReading.bookName} ${formatChapterRange(firstReading)}`
      : `${firstReading.bookName} - ${consolidatedReadings[consolidatedReadings.length - 1].bookName}`;

    days.push({
      id: `classic-day-${dayNumber}`,
      day: dayNumber,
      title: dayTitle,
      readings: consolidatedReadings,
    });

    dayNumber++;
  }

  return {
    id: 'annual-classic',
    title: 'Bible en 1 an - Classique',
    description: 'Lisez la Bible de Genèse à Apocalypse en suivant l\'ordre canonique traditionnel.',
    duration: 365,
    category: 'annuel',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    days,
  };
}

function consolidateReadings(readings: ReadingPlanReading[]): ReadingPlanReading[] {
  if (readings.length === 0) return [];

  const consolidated: ReadingPlanReading[] = [];
  let current = { ...readings[0] };
  let startChapter = current.chapter;
  let endChapter = current.chapter;

  for (let i = 1; i < readings.length; i++) {
    const reading = readings[i];
    if (reading.bookId === current.bookId && reading.chapter === endChapter + 1) {
      endChapter = reading.chapter;
    } else {
      consolidated.push({
        ...current,
        chapter: startChapter,
        verseStart: startChapter !== endChapter ? undefined : undefined,
        verseEnd: startChapter !== endChapter ? undefined : undefined,
      });

      if (startChapter !== endChapter) {
        consolidated[consolidated.length - 1] = {
          bookId: current.bookId,
          bookName: current.bookName,
          chapter: startChapter,
          chapterEnd: endChapter,
        } as ReadingPlanReading;
      }

      current = { ...reading };
      startChapter = reading.chapter;
      endChapter = reading.chapter;
    }
  }

  if (startChapter !== endChapter) {
    consolidated.push({
      bookId: current.bookId,
      bookName: current.bookName,
      chapter: startChapter,
      chapterEnd: endChapter,
    } as ReadingPlanReading);
  } else {
    consolidated.push({
      ...current,
      chapter: startChapter,
    });
  }

  return consolidated;
}

function formatChapterRange(reading: ReadingPlanReading): string {
  const r = reading as ReadingPlanReading & { chapterEnd?: number };
  if (r.chapterEnd && r.chapterEnd !== r.chapter) {
    return `${r.chapter}-${r.chapterEnd}`;
  }
  return `${r.chapter}`;
}

export const classicPlan = generateClassicPlan();
