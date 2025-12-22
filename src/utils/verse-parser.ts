import { ParsedVerseRef } from '../types';

const BOOK_NAME_TO_ID: Record<string, string> = {
  'genèse': 'gen', 'genese': 'gen', 'gen': 'gen',
  'exode': 'exo', 'exo': 'exo',
  'lévitique': 'lev', 'levitique': 'lev', 'lev': 'lev',
  'nombres': 'num', 'num': 'num',
  'deutéronome': 'deu', 'deuteronome': 'deu', 'deu': 'deu', 'dt': 'deu',
  'josué': 'jos', 'josue': 'jos', 'jos': 'jos',
  'juges': 'jdg', 'jug': 'jdg', 'jg': 'jdg',
  'ruth': 'rut', 'rut': 'rut', 'rt': 'rut',
  '1 samuel': '1sa', '1samuel': '1sa', '1sa': '1sa', '1 sam': '1sa',
  '2 samuel': '2sa', '2samuel': '2sa', '2sa': '2sa', '2 sam': '2sa',
  '1 rois': '1ki', '1rois': '1ki', '1ki': '1ki', '1 r': '1ki',
  '2 rois': '2ki', '2rois': '2ki', '2ki': '2ki', '2 r': '2ki',
  '1 chroniques': '1ch', '1chroniques': '1ch', '1ch': '1ch', '1 chr': '1ch',
  '2 chroniques': '2ch', '2chroniques': '2ch', '2ch': '2ch', '2 chr': '2ch',
  'esdras': 'ezr', 'esd': 'ezr', 'ezr': 'ezr',
  'néhémie': 'neh', 'nehemie': 'neh', 'neh': 'neh', 'né': 'neh',
  'esther': 'est', 'est': 'est',
  'job': 'job', 'jb': 'job',
  'psaumes': 'psa', 'psaume': 'psa', 'ps': 'psa', 'psa': 'psa',
  'proverbes': 'pro', 'prov': 'pro', 'pr': 'pro', 'pro': 'pro',
  'ecclésiaste': 'ecc', 'ecclesiaste': 'ecc', 'ecc': 'ecc', 'ec': 'ecc', 'qohélet': 'ecc',
  'cantique des cantiques': 'sng', 'cantique': 'sng', 'ct': 'sng', 'sng': 'sng',
  'ésaïe': 'isa', 'esaie': 'isa', 'isaïe': 'isa', 'isaie': 'isa', 'isa': 'isa', 'es': 'isa',
  'jérémie': 'jer', 'jeremie': 'jer', 'jer': 'jer', 'jr': 'jer',
  'lamentations': 'lam', 'lam': 'lam', 'la': 'lam',
  'ézéchiel': 'ezk', 'ezechiel': 'ezk', 'ezk': 'ezk', 'ez': 'ezk',
  'daniel': 'dan', 'dan': 'dan', 'dn': 'dan',
  'osée': 'hos', 'osee': 'hos', 'hos': 'hos', 'os': 'hos',
  'joël': 'jol', 'joel': 'jol', 'jol': 'jol', 'jl': 'jol',
  'amos': 'amo', 'amo': 'amo', 'am': 'amo',
  'abdias': 'oba', 'oba': 'oba', 'ab': 'oba',
  'jonas': 'jon', 'jon': 'jon',
  'michée': 'mic', 'michee': 'mic', 'mic': 'mic', 'mi': 'mic',
  'nahum': 'nam', 'nam': 'nam', 'na': 'nam',
  'habacuc': 'hab', 'habakuk': 'hab', 'hab': 'hab', 'ha': 'hab',
  'sophonie': 'zep', 'zep': 'zep', 'so': 'zep',
  'aggée': 'hag', 'aggee': 'hag', 'hag': 'hag', 'ag': 'hag',
  'zacharie': 'zec', 'zec': 'zec', 'za': 'zec',
  'malachie': 'mal', 'mal': 'mal', 'ml': 'mal',
  'matthieu': 'mat', 'mat': 'mat', 'mt': 'mat',
  'marc': 'mrk', 'mrk': 'mrk', 'mc': 'mrk',
  'luc': 'luk', 'luk': 'luk', 'lc': 'luk',
  'jean': 'jhn', 'jhn': 'jhn', 'jn': 'jhn',
  'actes': 'act', 'actes des apôtres': 'act', 'act': 'act', 'ac': 'act',
  'romains': 'rom', 'rom': 'rom', 'rm': 'rom',
  '1 corinthiens': '1co', '1corinthiens': '1co', '1co': '1co', '1 cor': '1co',
  '2 corinthiens': '2co', '2corinthiens': '2co', '2co': '2co', '2 cor': '2co',
  'galates': 'gal', 'gal': 'gal', 'ga': 'gal',
  'éphésiens': 'eph', 'ephesiens': 'eph', 'eph': 'eph', 'ep': 'eph',
  'philippiens': 'php', 'php': 'php', 'ph': 'php',
  'colossiens': 'col', 'col': 'col',
  '1 thessaloniciens': '1th', '1thessaloniciens': '1th', '1th': '1th', '1 th': '1th',
  '2 thessaloniciens': '2th', '2thessaloniciens': '2th', '2th': '2th', '2 th': '2th',
  '1 timothée': '1ti', '1timothée': '1ti', '1timothee': '1ti', '1ti': '1ti', '1 tim': '1ti',
  '2 timothée': '2ti', '2timothée': '2ti', '2timothee': '2ti', '2ti': '2ti', '2 tim': '2ti',
  'tite': 'tit', 'tit': 'tit', 'tt': 'tit',
  'philémon': 'phm', 'philemon': 'phm', 'phm': 'phm',
  'hébreux': 'heb', 'hebreux': 'heb', 'heb': 'heb', 'he': 'heb',
  'jacques': 'jas', 'jas': 'jas', 'jc': 'jas',
  '1 pierre': '1pe', '1pierre': '1pe', '1pe': '1pe', '1 pi': '1pe',
  '2 pierre': '2pe', '2pierre': '2pe', '2pe': '2pe', '2 pi': '2pe',
  '1 jean': '1jn', '1jean': '1jn', '1jn': '1jn',
  '2 jean': '2jn', '2jean': '2jn', '2jn': '2jn',
  '3 jean': '3jn', '3jean': '3jn', '3jn': '3jn',
  'jude': 'jud', 'jud': 'jud',
  'apocalypse': 'rev', 'révélation': 'rev', 'revelation': 'rev', 'rev': 'rev', 'ap': 'rev',
};

const BOOK_ID_TO_NAME: Record<string, string> = {
  'gen': 'Genèse',
  'exo': 'Exode',
  'lev': 'Lévitique',
  'num': 'Nombres',
  'deu': 'Deutéronome',
  'jos': 'Josué',
  'jdg': 'Juges',
  'rut': 'Ruth',
  '1sa': '1 Samuel',
  '2sa': '2 Samuel',
  '1ki': '1 Rois',
  '2ki': '2 Rois',
  '1ch': '1 Chroniques',
  '2ch': '2 Chroniques',
  'ezr': 'Esdras',
  'neh': 'Néhémie',
  'est': 'Esther',
  'job': 'Job',
  'psa': 'Psaumes',
  'pro': 'Proverbes',
  'ecc': 'Ecclésiaste',
  'sng': 'Cantique des Cantiques',
  'isa': 'Ésaïe',
  'jer': 'Jérémie',
  'lam': 'Lamentations',
  'ezk': 'Ézéchiel',
  'dan': 'Daniel',
  'hos': 'Osée',
  'jol': 'Joël',
  'amo': 'Amos',
  'oba': 'Abdias',
  'jon': 'Jonas',
  'mic': 'Michée',
  'nam': 'Nahum',
  'hab': 'Habacuc',
  'zep': 'Sophonie',
  'hag': 'Aggée',
  'zec': 'Zacharie',
  'mal': 'Malachie',
  'mat': 'Matthieu',
  'mrk': 'Marc',
  'luk': 'Luc',
  'jhn': 'Jean',
  'act': 'Actes',
  'rom': 'Romains',
  '1co': '1 Corinthiens',
  '2co': '2 Corinthiens',
  'gal': 'Galates',
  'eph': 'Éphésiens',
  'php': 'Philippiens',
  'col': 'Colossiens',
  '1th': '1 Thessaloniciens',
  '2th': '2 Thessaloniciens',
  '1ti': '1 Timothée',
  '2ti': '2 Timothée',
  'tit': 'Tite',
  'phm': 'Philémon',
  'heb': 'Hébreux',
  'jas': 'Jacques',
  '1pe': '1 Pierre',
  '2pe': '2 Pierre',
  '1jn': '1 Jean',
  '2jn': '2 Jean',
  '3jn': '3 Jean',
  'jud': 'Jude',
  'rev': 'Apocalypse',
};

export function parseVerseReference(ref: string): ParsedVerseRef | null {
  if (!ref || typeof ref !== 'string') {
    return null;
  }

  const normalized = ref.trim().toLowerCase();
  const match = normalized.match(
    /^(\d\s+)?([a-zàâäéèêëïîôùûüç\s]+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/i
  );

  if (!match) {
    return null;
  }

  const [, numberPrefix, bookNameRaw, chapterStr, verseStartStr, verseEndStr] = match;
  const bookName = (numberPrefix ? numberPrefix : '') + bookNameRaw.trim();
  const bookId = BOOK_NAME_TO_ID[bookName.toLowerCase()];

  if (!bookId) {
    return null;
  }

  const chapter = parseInt(chapterStr, 10);
  const verseStart = verseStartStr ? parseInt(verseStartStr, 10) : undefined;
  const verseEnd = verseEndStr ? parseInt(verseEndStr, 10) : undefined;
  const properBookName = BOOK_ID_TO_NAME[bookId] || bookName;

  return {
    bookId,
    bookName: properBookName,
    chapter,
    verseStart,
    verseEnd,
  };
}

export function formatVerseReference(parsed: ParsedVerseRef): string {
  let result = `${parsed.bookName} ${parsed.chapter}`;

  if (parsed.verseStart !== undefined) {
    result += `:${parsed.verseStart}`;
    if (parsed.verseEnd !== undefined && parsed.verseEnd !== parsed.verseStart) {
      result += `-${parsed.verseEnd}`;
    }
  }

  return result;
}

export function getBookNameFromId(bookId: string): string | null {
  return BOOK_ID_TO_NAME[bookId] || null;
}

export function getBookIdFromName(bookName: string): string | null {
  return BOOK_NAME_TO_ID[bookName.toLowerCase()] || null;
}

export function getVerseKey(bookId: string, chapter: number, verse: number): string {
  return `${bookId}-${chapter}-${verse}`;
}

export function parseVerseKey(key: string): { bookId: string; chapter: number; verse: number } | null {
  const parts = key.split('-');
  if (parts.length !== 3) return null;

  const [bookId, chapterStr, verseStr] = parts;
  const chapter = parseInt(chapterStr, 10);
  const verse = parseInt(verseStr, 10);

  if (isNaN(chapter) || isNaN(verse)) return null;

  return { bookId, chapter, verse };
}
