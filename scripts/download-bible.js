/**
 * Script to download and format Louis Segond Bible data
 * Run with: node scripts/download-bible.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const BIBLE_URL = 'https://raw.githubusercontent.com/juliend2/data-bible/master/db/seed_data/louis-segond-formatted.json';
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'bible');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'lsg-bible.json');

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    console.log('Downloading Bible data...');

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location).then(resolve).catch(reject);
      }

      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        console.log('Download complete!');
        resolve(data);
      });
      response.on('error', reject);
    }).on('error', reject);
  });
}

function processVerse(text) {
  // Clean up verse text
  return text
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  try {
    // Create output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Download the Bible data
    const rawData = await downloadFile(BIBLE_URL);
    const bibleData = JSON.parse(rawData);

    console.log('Processing Bible data...');

    // Book ID mapping
    const bookIds = [
      // Old Testament
      'gen', 'exo', 'lev', 'num', 'deu', 'jos', 'jdg', 'rut', '1sa', '2sa',
      '1ki', '2ki', '1ch', '2ch', 'ezr', 'neh', 'est', 'job', 'psa', 'pro',
      'ecc', 'sng', 'isa', 'jer', 'lam', 'ezk', 'dan', 'hos', 'jol', 'amo',
      'oba', 'jon', 'mic', 'nam', 'hab', 'zep', 'hag', 'zec', 'mal',
      // New Testament
      'mat', 'mrk', 'luk', 'jhn', 'act', 'rom', '1co', '2co', 'gal', 'eph',
      'php', 'col', '1th', '2th', '1ti', '2ti', 'tit', 'phm', 'heb', 'jas',
      '1pe', '2pe', '1jn', '2jn', '3jn', 'jud', 'rev'
    ];

    const result = {
      version: 'LSG',
      language: 'fr',
      name: 'Louis Segond 1910',
      books: []
    };

    let totalVerses = 0;
    let bookIndex = 0;

    // Process testaments
    for (const testament of bibleData.Testaments) {
      for (const book of testament.Books) {
        const bookId = bookIds[bookIndex];
        const bookData = {
          id: bookId,
          chapters: []
        };

        let chapterNum = 1;
        for (const chapter of book.Chapters) {
          const chapterData = {
            chapter: chapterNum,
            verses: []
          };

          let verseNum = 1;
          for (const verse of chapter.Verses) {
            const verseId = verse.ID !== undefined ? verse.ID : verseNum;
            chapterData.verses.push({
              v: verseId,
              t: processVerse(verse.Text)
            });
            verseNum++;
            totalVerses++;
          }

          bookData.chapters.push(chapterData);
          chapterNum++;
        }

        result.books.push(bookData);
        bookIndex++;
        console.log(`Processed: ${bookId} - ${book.Chapters.length} chapters`);
      }
    }

    // Write the output file
    console.log(`\nWriting output file...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result));

    // Also create a minified version for production
    const minifiedFile = OUTPUT_FILE.replace('.json', '.min.json');
    fs.writeFileSync(minifiedFile, JSON.stringify(result));

    const stats = fs.statSync(OUTPUT_FILE);
    const minStats = fs.statSync(minifiedFile);

    console.log('\n=== Bible Data Summary ===');
    console.log(`Total books: ${result.books.length}`);
    console.log(`Total verses: ${totalVerses}`);
    console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Minified size: ${(minStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log('=========================\n');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
