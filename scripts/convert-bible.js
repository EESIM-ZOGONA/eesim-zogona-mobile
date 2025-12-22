const fs = require('fs');
const path = require('path');

const BOOK_IDS = [
  'gen', 'exo', 'lev', 'num', 'deu', 'jos', 'jdg', 'rut', '1sa', '2sa',
  '1ki', '2ki', '1ch', '2ch', 'ezr', 'neh', 'est', 'job', 'psa', 'pro',
  'ecc', 'sng', 'isa', 'jer', 'lam', 'ezk', 'dan', 'hos', 'jol', 'amo',
  'oba', 'jon', 'mic', 'nam', 'hab', 'zep', 'hag', 'zec', 'mal',
  'mat', 'mrk', 'luk', 'jhn', 'act', 'rom', '1co', '2co', 'gal', 'eph',
  'php', 'col', '1th', '2th', '1ti', '2ti', 'tit', 'phm', 'heb', 'jas',
  '1pe', '2pe', '1jn', '2jn', '3jn', 'jud', 'rev'
];

function convertVideoPsalm(inputPath, outputPath, versionCode, versionName) {
  console.log(`\nConverting ${versionCode}: ${inputPath}...`);

  let content = fs.readFileSync(inputPath, 'utf8');
  content = content.replace(/^\uFEFF/, '');
  content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ');
  content = content.replace(/\r\n|\n|\r/g, ' ');

  const output = {
    version: versionCode,
    language: 'fr',
    name: versionName,
    books: []
  };

  const bookChunks = content.split(/Chapters:\[/);

  if (bookChunks.length < 2) {
    console.log('  Error: No Chapters found');
    return false;
  }

  for (let bookIndex = 0; bookIndex < BOOK_IDS.length; bookIndex++) {
    const bookId = BOOK_IDS[bookIndex];
    const bookChunk = bookChunks[bookIndex + 1];

    if (!bookChunk) continue;

    const bookData = {
      id: bookId,
      chapters: []
    };

    const verseSections = bookChunk.split(/Verses:\[/);

    for (let chapterIdx = 1; chapterIdx < verseSections.length; chapterIdx++) {
      const verseContent = verseSections[chapterIdx];

      if (verseContent.includes('Books:[')) break;

      const chapterData = {
        chapter: chapterIdx,
        verses: []
      };

      const seenVerses = new Set();

      const verseRegex = /\{(?:\s*ID:(\d+)\s*,)?\s*Text:"([^"]*)"/g;
      let verseMatch;
      let autoId = 1;

      while ((verseMatch = verseRegex.exec(verseContent)) !== null) {
        const verseNum = verseMatch[1] ? parseInt(verseMatch[1]) : autoId;
        let text = verseMatch[2]
          .replace(/\\n/g, ' ')
          .replace(/\\"/g, '"')
          .replace(/\s+/g, ' ')
          .trim();

        if (text && !seenVerses.has(verseNum)) {
          seenVerses.add(verseNum);
          chapterData.verses.push({ v: verseNum, t: text });
        }
        autoId++;
      }

      chapterData.verses.sort((a, b) => a.v - b.v);

      if (chapterData.verses.length > 0) {
        bookData.chapters.push(chapterData);
      }

      const closingMatch = verseContent.match(/\]\}/g);
      if (closingMatch && closingMatch.length >= 2) break;
    }

    if (bookData.chapters.length > 0) {
      output.books.push(bookData);
    }
  }

  let totalVerses = 0;
  for (const book of output.books) {
    const bookVerses = book.chapters.reduce((acc, ch) => acc + ch.verses.length, 0);
    totalVerses += bookVerses;
  }

  console.log(`  Books: ${output.books.length}, Verses: ${totalVerses}`);

  fs.writeFileSync(outputPath, JSON.stringify(output));

  const stats = fs.statSync(outputPath);
  console.log(`  Output: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

  return output.books.length === 66;
}

const assetsDir = path.join(__dirname, '..', 'assets', 'bible');
const downloadsDir = path.join(assetsDir, 'downloads');

const conversions = [
  {
    input: path.join(downloadsDir, 'French Parole de Vie.json'),
    output: path.join(assetsDir, 'pdv-bible.json'),
    code: 'PDV',
    name: 'Parole de Vie'
  },
  {
    input: path.join(downloadsDir, 'French Semeur.json'),
    output: path.join(assetsDir, 'sem-bible.json'),
    code: 'SEM',
    name: 'Bible du Semeur'
  },
  {
    input: path.join(downloadsDir, 'francais_courant.json'),
    output: path.join(assetsDir, 'bfc-bible.json'),
    code: 'BFC',
    name: 'Français Courant'
  },
  {
    input: path.join(downloadsDir, 'French Bible Ostervald 1996.json'),
    output: path.join(assetsDir, 'ost-bible.json'),
    code: 'OST',
    name: 'Ostervald 1996'
  },
  {
    input: path.join(downloadsDir, 'French Darby.json'),
    output: path.join(assetsDir, 'drb-bible.json'),
    code: 'DRB',
    name: 'Darby'
  },
  {
    input: path.join(downloadsDir, 'French Bible Martin 1744.json'),
    output: path.join(assetsDir, 'mrt-bible.json'),
    code: 'MRT',
    name: 'Martin 1744'
  }
];

console.log('=== Bible Conversion Tool ===\n');

let successCount = 0;
for (const conv of conversions) {
  if (fs.existsSync(conv.input)) {
    if (convertVideoPsalm(conv.input, conv.output, conv.code, conv.name)) {
      successCount++;
    }
  } else {
    console.log(`\nFile not found: ${path.basename(conv.input)}`);
  }
}

console.log(`\n=== Done! ${successCount}/${conversions.length} versions OK ===`);
