import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, BookQuizQuestion, Quiz } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useBookQuizPlay } from '../../hooks';

interface QuizBookPlayScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuizBookPlay'>;
  route: RouteProp<RootStackParamList, 'QuizBookPlay'>;
}

export function QuizBookPlayScreen({ navigation, route }: QuizBookPlayScreenProps) {
  const { bookQuiz } = route.params;
  const { questions, loading, error } = useBookQuizPlay(bookQuiz.bookId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progressAnim] = useState(new Animated.Value(0));
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  useEffect(() => {
    if (totalQuestions > 0) {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentIndex, totalQuestions]);

  useEffect(() => {
    if (isAnswered || loading || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, loading, currentQuestion]);

  const handleTimeout = useCallback(() => {
    if (!isAnswered && currentQuestion) {
      setIsAnswered(true);
      setUserAnswers((prev) => [...prev, -1]);
      setTimeout(() => goToNextQuestion(), 2000);
    }
  }, [isAnswered, currentQuestion]);

  const handleSelectAnswer = (index: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(index);
    setIsAnswered(true);
    setUserAnswers((prev) => [...prev, index]);

    if (index === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => goToNextQuestion(), 2000);
  };

  const goToNextQuestion = () => {
    if (currentIndex + 1 >= totalQuestions) {
      const finalScore = selectedAnswer === currentQuestion?.correctAnswer ? score + 1 : score;
      const finalAnswers = [...userAnswers];
      if (selectedAnswer !== null && !finalAnswers.includes(selectedAnswer)) {
        finalAnswers.push(selectedAnswer);
      }

      // Convert BookQuiz to Quiz format for result screen
      const quizForResult: Quiz = {
        id: bookQuiz.id,
        title: bookQuiz.bookName,
        description: `Quiz sur le livre de ${bookQuiz.bookName}`,
        category: 'livres',
        difficulty: bookQuiz.difficulty,
        questionCount: bookQuiz.questionCount,
      };

      // Convert BookQuizQuestion to QuizQuestion format
      const questionsForResult = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        verseRef: q.verseRef,
      }));

      navigation.navigate('QuizResult', {
        quiz: quizForResult,
        score: finalScore,
        totalQuestions,
        userAnswers: finalAnswers,
        questions: questionsForResult,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered || !currentQuestion) {
      return selectedAnswer === index ? styles.optionSelected : styles.option;
    }

    if (index === currentQuestion.correctAnswer) {
      return styles.optionCorrect;
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return styles.optionWrong;
    }

    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    if (!isAnswered || !currentQuestion) {
      return selectedAnswer === index ? styles.optionTextSelected : styles.optionText;
    }

    if (index === currentQuestion.correctAnswer || selectedAnswer === index) {
      return styles.optionTextSelected;
    }

    return styles.optionText;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement des questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={colors.text.tertiary} />
          <Text style={styles.errorTitle}>Aucune question disponible</Text>
          <Text style={styles.errorText}>
            Les questions pour ce livre ne sont pas encore disponibles.
          </Text>
          <TouchableOpacity
            style={styles.backHomeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backHomeButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.bookName}>{bookQuiz.bookName}</Text>
          <Text style={styles.questionCounter}>
            Question {currentIndex + 1}/{totalQuestions}
          </Text>
        </View>
        <View style={styles.timerWrap}>
          <LinearGradient
            colors={timeLeft <= 10 ? ['#dc2626', '#b91c1c'] : [colors.primary, colors.primaryDark]}
            style={styles.timerGradient}
          >
            <Ionicons name="time" size={14} color="#fff" />
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.scoreWrap}>
          <Ionicons name="star" size={16} color="#fbbf24" />
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <LinearGradient
          colors={bookQuiz.testament === 'old' ? ['#d97706', '#b45309'] : ['#dc2626', '#b91c1c']}
          style={styles.questionCard}
        >
          <View style={styles.questionIconWrap}>
            <Ionicons name="help" size={28} color={bookQuiz.testament === 'old' ? '#d97706' : '#dc2626'} />
          </View>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <View style={styles.questionAccent} />
        </LinearGradient>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleSelectAnswer(index)}
            activeOpacity={0.8}
            disabled={isAnswered}
          >
            <View style={styles.optionLetter}>
              <Text style={styles.optionLetterText}>
                {String.fromCharCode(65 + index)}
              </Text>
            </View>
            <Text style={getOptionTextStyle(index)}>{option}</Text>
            {isAnswered && index === currentQuestion.correctAnswer && (
              <View style={styles.correctIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
              </View>
            )}
            {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
              <View style={styles.wrongIcon}>
                <Ionicons name="close-circle" size={24} color="#dc2626" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Explanation */}
      {isAnswered && currentQuestion.explanation && (
        <View style={styles.explanationCard}>
          <View style={styles.explanationIcon}>
            <Ionicons name="bulb" size={20} color="#d97706" />
          </View>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            {currentQuestion.verseRef && (
              <Text style={styles.verseRef}>{currentQuestion.verseRef}</Text>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  errorText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  backHomeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  backHomeButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  bookName: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  questionCounter: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  timerWrap: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  timerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  timerText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  scoreWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#fef3c7',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  scoreText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#d97706',
  },
  // Question
  questionContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  questionCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  questionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  questionText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
  },
  questionAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 20 }, { translateY: 20 }],
  },
  // Options
  optionsContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  optionCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  optionWrong: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: '#dc2626',
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  optionLetterText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  optionText: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },
  optionTextSelected: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  correctIcon: {
    marginLeft: spacing.sm,
  },
  wrongIcon: {
    marginLeft: spacing.sm,
  },
  // Explanation
  explanationCard: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  explanationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationContent: {
    flex: 1,
  },
  explanationText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#92400e',
    lineHeight: 20,
  },
  verseRef: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#b45309',
    marginTop: spacing.xs,
  },
});
