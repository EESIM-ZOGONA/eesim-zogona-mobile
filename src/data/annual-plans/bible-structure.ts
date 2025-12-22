export interface BibleBookInfo {
  id: string;
  name: string;
  chapters: number;
  testament: 'OT' | 'NT';
}

export const bibleBooks: BibleBookInfo[] = [
  { id: 'gen', name: 'Genèse', chapters: 50, testament: 'OT' },
  { id: 'exod', name: 'Exode', chapters: 40, testament: 'OT' },
  { id: 'lev', name: 'Lévitique', chapters: 27, testament: 'OT' },
  { id: 'num', name: 'Nombres', chapters: 36, testament: 'OT' },
  { id: 'deut', name: 'Deutéronome', chapters: 34, testament: 'OT' },
  { id: 'josh', name: 'Josué', chapters: 24, testament: 'OT' },
  { id: 'judg', name: 'Juges', chapters: 21, testament: 'OT' },
  { id: 'ruth', name: 'Ruth', chapters: 4, testament: 'OT' },
  { id: '1sam', name: '1 Samuel', chapters: 31, testament: 'OT' },
  { id: '2sam', name: '2 Samuel', chapters: 24, testament: 'OT' },
  { id: '1kgs', name: '1 Rois', chapters: 22, testament: 'OT' },
  { id: '2kgs', name: '2 Rois', chapters: 25, testament: 'OT' },
  { id: '1chr', name: '1 Chroniques', chapters: 29, testament: 'OT' },
  { id: '2chr', name: '2 Chroniques', chapters: 36, testament: 'OT' },
  { id: 'ezra', name: 'Esdras', chapters: 10, testament: 'OT' },
  { id: 'neh', name: 'Néhémie', chapters: 13, testament: 'OT' },
  { id: 'esth', name: 'Esther', chapters: 10, testament: 'OT' },
  { id: 'job', name: 'Job', chapters: 42, testament: 'OT' },
  { id: 'ps', name: 'Psaumes', chapters: 150, testament: 'OT' },
  { id: 'prov', name: 'Proverbes', chapters: 31, testament: 'OT' },
  { id: 'eccl', name: 'Ecclésiaste', chapters: 12, testament: 'OT' },
  { id: 'song', name: 'Cantique', chapters: 8, testament: 'OT' },
  { id: 'isa', name: 'Ésaïe', chapters: 66, testament: 'OT' },
  { id: 'jer', name: 'Jérémie', chapters: 52, testament: 'OT' },
  { id: 'lam', name: 'Lamentations', chapters: 5, testament: 'OT' },
  { id: 'ezek', name: 'Ézéchiel', chapters: 48, testament: 'OT' },
  { id: 'dan', name: 'Daniel', chapters: 12, testament: 'OT' },
  { id: 'hos', name: 'Osée', chapters: 14, testament: 'OT' },
  { id: 'joel', name: 'Joël', chapters: 3, testament: 'OT' },
  { id: 'amos', name: 'Amos', chapters: 9, testament: 'OT' },
  { id: 'obad', name: 'Abdias', chapters: 1, testament: 'OT' },
  { id: 'jonah', name: 'Jonas', chapters: 4, testament: 'OT' },
  { id: 'mic', name: 'Michée', chapters: 7, testament: 'OT' },
  { id: 'nah', name: 'Nahum', chapters: 3, testament: 'OT' },
  { id: 'hab', name: 'Habacuc', chapters: 3, testament: 'OT' },
  { id: 'zeph', name: 'Sophonie', chapters: 3, testament: 'OT' },
  { id: 'hag', name: 'Aggée', chapters: 2, testament: 'OT' },
  { id: 'zech', name: 'Zacharie', chapters: 14, testament: 'OT' },
  { id: 'mal', name: 'Malachie', chapters: 4, testament: 'OT' },
  { id: 'matt', name: 'Matthieu', chapters: 28, testament: 'NT' },
  { id: 'mark', name: 'Marc', chapters: 16, testament: 'NT' },
  { id: 'luke', name: 'Luc', chapters: 24, testament: 'NT' },
  { id: 'john', name: 'Jean', chapters: 21, testament: 'NT' },
  { id: 'acts', name: 'Actes', chapters: 28, testament: 'NT' },
  { id: 'rom', name: 'Romains', chapters: 16, testament: 'NT' },
  { id: '1cor', name: '1 Corinthiens', chapters: 16, testament: 'NT' },
  { id: '2cor', name: '2 Corinthiens', chapters: 13, testament: 'NT' },
  { id: 'gal', name: 'Galates', chapters: 6, testament: 'NT' },
  { id: 'eph', name: 'Éphésiens', chapters: 6, testament: 'NT' },
  { id: 'phil', name: 'Philippiens', chapters: 4, testament: 'NT' },
  { id: 'col', name: 'Colossiens', chapters: 4, testament: 'NT' },
  { id: '1thess', name: '1 Thessaloniciens', chapters: 5, testament: 'NT' },
  { id: '2thess', name: '2 Thessaloniciens', chapters: 3, testament: 'NT' },
  { id: '1tim', name: '1 Timothée', chapters: 6, testament: 'NT' },
  { id: '2tim', name: '2 Timothée', chapters: 4, testament: 'NT' },
  { id: 'titus', name: 'Tite', chapters: 3, testament: 'NT' },
  { id: 'phlm', name: 'Philémon', chapters: 1, testament: 'NT' },
  { id: 'heb', name: 'Hébreux', chapters: 13, testament: 'NT' },
  { id: 'jas', name: 'Jacques', chapters: 5, testament: 'NT' },
  { id: '1pet', name: '1 Pierre', chapters: 5, testament: 'NT' },
  { id: '2pet', name: '2 Pierre', chapters: 3, testament: 'NT' },
  { id: '1john', name: '1 Jean', chapters: 5, testament: 'NT' },
  { id: '2john', name: '2 Jean', chapters: 1, testament: 'NT' },
  { id: '3john', name: '3 Jean', chapters: 1, testament: 'NT' },
  { id: 'jude', name: 'Jude', chapters: 1, testament: 'NT' },
  { id: 'rev', name: 'Apocalypse', chapters: 22, testament: 'NT' },
];

export const otBooks = bibleBooks.filter(b => b.testament === 'OT');
export const ntBooks = bibleBooks.filter(b => b.testament === 'NT');

export const totalOTChapters = otBooks.reduce((sum, b) => sum + b.chapters, 0);
export const totalNTChapters = ntBooks.reduce((sum, b) => sum + b.chapters, 0);
export const totalChapters = totalOTChapters + totalNTChapters;
