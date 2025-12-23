import { useState, useEffect, useCallback } from 'react';
import { File } from 'expo-file-system/next';
import { Asset } from 'expo-asset';
import { BookQuiz, BookQuizQuestion } from '../types';
import {
  initBookQuizDatabase,
  getAllBookQuizzes,
  getBookQuizzesByTestament,
  getQuestionsForBook,
  getBookQuestionsCount,
  importBookQuizFromSQL,
  clearBookQuizData,
  searchBookQuizzes,
  updateQuestionCounts,
} from '../services/book-quiz-database';

interface UseBookQuizzesReturn {
  bookQuizzes: BookQuiz[];
  loading: boolean;
  error: Error | null;
  initialized: boolean;
  totalQuestions: number;
  refresh: () => void;
  getQuizzesByTestament: (testament: 'old' | 'new') => Promise<BookQuiz[]>;
  getQuestions: (bookId: string) => Promise<BookQuizQuestion[]>;
  searchBooks: (query: string) => Promise<BookQuiz[]>;
}

export function useBookQuizzes(): UseBookQuizzesReturn {
  const [bookQuizzes, setBookQuizzes] = useState<BookQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await initBookQuizDatabase();

      const count = await getBookQuestionsCount();
      const needsReload = count < 1800; // We have 1800+ questions now

      if (needsReload) {
        await clearBookQuizData();

        const sqlFiles = [
          // Pentateuque (Ancien Testament)
          require('../../assets/data/book-quiz-genesis.sql'),
          require('../../assets/data/book-quiz-genesis-2.sql'),
          require('../../assets/data/book-quiz-genesis-3.sql'),
          require('../../assets/data/book-quiz-exodus.sql'),
          require('../../assets/data/book-quiz-leviticus.sql'),
          require('../../assets/data/book-quiz-numbers.sql'),
          require('../../assets/data/book-quiz-deuteronomy.sql'),
          // Évangiles et Actes (Nouveau Testament)
          require('../../assets/data/book-quiz-matthew.sql'),
          require('../../assets/data/book-quiz-john.sql'),
          require('../../assets/data/book-quiz-acts.sql'),
          // Épîtres (Nouveau Testament)
          require('../../assets/data/book-quiz-romans.sql'),
          require('../../assets/data/book-quiz-1corinthians.sql'),
          // Apocalypse
          require('../../assets/data/book-quiz-revelation.sql'),
          // Autres livres (base)
          require('../../assets/data/book-quizzes.sql'),
          require('../../assets/data/book-quizzes-nt.sql'),
        ];

        for (const sqlModule of sqlFiles) {
          try {
            const asset = Asset.fromModule(sqlModule);
            await asset.downloadAsync();

            if (asset.localUri) {
              const file = new File(asset.localUri);
              const sqlContent = await file.text();
              await importBookQuizFromSQL(sqlContent);
            }
          } catch (err) {
            console.error('Error loading SQL file:', err);
          }
        }

        // Update question counts after import
        await updateQuestionCounts();
      }

      const finalCount = await getBookQuestionsCount();
      setTotalQuestions(finalCount);

      const quizzes = await getAllBookQuizzes();
      setBookQuizzes(quizzes);

      setInitialized(true);
    } catch (err) {
      console.error('Error initializing book quiz database:', err);
      setError(err instanceof Error ? err : new Error('Failed to initialize database'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const refresh = useCallback(() => {
    loadInitialData();
  }, [loadInitialData]);

  const getQuizzesByTestament = useCallback(async (testament: 'old' | 'new') => {
    return getBookQuizzesByTestament(testament);
  }, []);

  const getQuestions = useCallback(async (bookId: string) => {
    return getQuestionsForBook(bookId);
  }, []);

  const searchBooks = useCallback(async (query: string) => {
    return searchBookQuizzes(query);
  }, []);

  return {
    bookQuizzes,
    loading,
    error,
    initialized,
    totalQuestions,
    refresh,
    getQuizzesByTestament,
    getQuestions,
    searchBooks,
  };
}

// Hook for playing a book quiz
interface UseBookQuizPlayReturn {
  questions: BookQuizQuestion[];
  loading: boolean;
  error: Error | null;
}

export function useBookQuizPlay(bookId: string): UseBookQuizPlayReturn {
  const [questions, setQuestions] = useState<BookQuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const results = await getQuestionsForBook(bookId);
        setQuestions(results);
      } catch (err) {
        console.error('Error loading questions:', err);
        setError(err instanceof Error ? err : new Error('Failed to load questions'));
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      loadQuestions();
    }
  }, [bookId]);

  return { questions, loading, error };
}
