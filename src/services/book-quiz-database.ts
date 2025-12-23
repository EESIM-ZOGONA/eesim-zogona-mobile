import * as SQLite from 'expo-sqlite';
import { BookQuiz, BookQuizQuestion } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('book_quizzes.db');
  }
  return db;
}

export async function initBookQuizDatabase(): Promise<void> {
  const database = await getDatabase();

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS book_quizzes (
      id TEXT PRIMARY KEY,
      book_id TEXT NOT NULL,
      book_name TEXT NOT NULL,
      testament TEXT NOT NULL,
      question_count INTEGER DEFAULT 0,
      difficulty TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS book_quiz_questions (
      id TEXT PRIMARY KEY,
      book_id TEXT NOT NULL,
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_answer INTEGER NOT NULL,
      explanation TEXT,
      verse_ref TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_questions_book_id ON book_quiz_questions(book_id);
    CREATE INDEX IF NOT EXISTS idx_quizzes_testament ON book_quizzes(testament);
  `);
}

export async function getBookQuizzesCount(): Promise<number> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM book_quizzes');
  return result?.count ?? 0;
}

export async function getBookQuestionsCount(): Promise<number> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM book_quiz_questions');
  return result?.count ?? 0;
}

export async function isBookQuizDataLoaded(): Promise<boolean> {
  const count = await getBookQuestionsCount();
  return count > 0;
}

export async function clearBookQuizData(): Promise<void> {
  const database = await getDatabase();
  await database.execAsync('DELETE FROM book_quiz_questions; DELETE FROM book_quizzes;');
}

export async function importBookQuizFromSQL(sqlContent: string): Promise<{ success: boolean; count: number }> {
  const database = await getDatabase();

  try {
    const sqlWithIgnore = sqlContent.replace(/INSERT INTO/gi, 'INSERT OR IGNORE INTO');
    await database.execAsync(sqlWithIgnore);
  } catch (error) {
    console.error('Error importing book quiz data:', error);
    try {
      await database.execAsync(sqlContent);
    } catch (fallbackError) {
      console.error('Fallback import failed:', fallbackError);
    }
  }

  const count = await getBookQuestionsCount();
  return { success: true, count };
}

export async function getAllBookQuizzes(): Promise<BookQuiz[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(
    'SELECT * FROM book_quizzes ORDER BY testament, book_name'
  );

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    bookName: row.book_name,
    testament: row.testament as 'old' | 'new',
    questionCount: row.question_count,
    difficulty: row.difficulty as 'easy' | 'medium' | 'hard',
  }));
}

export async function getBookQuizzesByTestament(testament: 'old' | 'new'): Promise<BookQuiz[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(
    'SELECT * FROM book_quizzes WHERE testament = ? ORDER BY book_name',
    [testament]
  );

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    bookName: row.book_name,
    testament: row.testament as 'old' | 'new',
    questionCount: row.question_count,
    difficulty: row.difficulty as 'easy' | 'medium' | 'hard',
  }));
}

export async function getBookQuizById(bookId: string): Promise<BookQuiz | null> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<any>(
    'SELECT * FROM book_quizzes WHERE book_id = ?',
    [bookId]
  );

  if (!result) return null;

  return {
    id: result.id,
    bookId: result.book_id,
    bookName: result.book_name,
    testament: result.testament as 'old' | 'new',
    questionCount: result.question_count,
    difficulty: result.difficulty as 'easy' | 'medium' | 'hard',
  };
}

export async function getQuestionsForBook(bookId: string): Promise<BookQuizQuestion[]> {
  const database = await getDatabase();
  const results = await database.getAllAsync<any>(
    'SELECT * FROM book_quiz_questions WHERE book_id = ? ORDER BY id',
    [bookId]
  );

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    question: row.question,
    options: [row.option_a, row.option_b, row.option_c, row.option_d],
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
    verseRef: row.verse_ref,
  }));
}

export async function searchBookQuizzes(query: string): Promise<BookQuiz[]> {
  const database = await getDatabase();
  const searchTerm = `%${query}%`;
  const results = await database.getAllAsync<any>(
    'SELECT * FROM book_quizzes WHERE book_name LIKE ? ORDER BY testament, book_name',
    [searchTerm]
  );

  return results.map(row => ({
    id: row.id,
    bookId: row.book_id,
    bookName: row.book_name,
    testament: row.testament as 'old' | 'new',
    questionCount: row.question_count,
    difficulty: row.difficulty as 'easy' | 'medium' | 'hard',
  }));
}

export async function updateQuestionCounts(): Promise<void> {
  const database = await getDatabase();
  await database.execAsync(`
    UPDATE book_quizzes SET question_count = (
      SELECT COUNT(*) FROM book_quiz_questions WHERE book_quiz_questions.book_id = book_quizzes.book_id
    );
  `);
}
