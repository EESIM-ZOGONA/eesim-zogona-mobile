import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, QuizQuestion } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface QuizPlayScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuizPlay'>;
  route: RouteProp<RootStackParamList, 'QuizPlay'>;
}

// Mock questions - in real app, fetch based on quiz.id
const mockQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Qui a construit l\'arche selon les instructions de Dieu ?',
    options: ['Abraham', 'Noé', 'Moïse', 'David'],
    correctAnswer: 1,
    explanation: 'Noé a construit l\'arche pour sauver sa famille et les animaux du déluge.',
    verseRef: 'Genèse 6:14',
  },
  {
    id: '2',
    question: 'Combien de disciples Jésus a-t-il choisis ?',
    options: ['7', '10', '12', '14'],
    correctAnswer: 2,
    explanation: 'Jésus a choisi 12 disciples pour le suivre et répandre son message.',
    verseRef: 'Matthieu 10:1-4',
  },
  {
    id: '3',
    question: 'Dans quelle ville Jésus est-il né ?',
    options: ['Nazareth', 'Jérusalem', 'Bethléem', 'Capernaüm'],
    correctAnswer: 2,
    explanation: 'Jésus est né à Bethléem, comme prophétisé par le prophète Michée.',
    verseRef: 'Matthieu 2:1',
  },
  {
    id: '4',
    question: 'Qui a été avalé par un grand poisson ?',
    options: ['Pierre', 'Jonas', 'Élie', 'Daniel'],
    correctAnswer: 1,
    explanation: 'Jonas a été avalé par un grand poisson après avoir fui l\'appel de Dieu.',
    verseRef: 'Jonas 1:17',
  },
  {
    id: '5',
    question: 'Quel est le premier livre de la Bible ?',
    options: ['Exode', 'Psaumes', 'Genèse', 'Matthieu'],
    correctAnswer: 2,
    explanation: 'La Genèse est le premier livre de la Bible, racontant la création.',
    verseRef: 'Genèse 1:1',
  },
];

export function QuizPlayScreen({ navigation, route }: QuizPlayScreenProps) {
  const { quiz } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progressAnim] = useState(new Animated.Value(0));
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const currentQuestion = mockQuestions[currentIndex];
  const totalQuestions = mockQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  useEffect(() => {
    if (isAnswered) return;

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
  }, [currentIndex, isAnswered]);

  const handleTimeout = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setUserAnswers((prev) => [...prev, -1]); // -1 indicates timeout/no answer
      setTimeout(() => goToNextQuestion(), 2000);
    }
  }, [isAnswered]);

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;

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
      const finalScore = selectedAnswer === currentQuestion.correctAnswer ? score + 1 : score;
      const finalAnswers = [...userAnswers];
      if (selectedAnswer !== null && !finalAnswers.includes(selectedAnswer)) {
        finalAnswers.push(selectedAnswer);
      }
      navigation.navigate('QuizResult', {
        quiz,
        score: finalScore,
        totalQuestions,
        userAnswers: finalAnswers,
        questions: mockQuestions,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
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
    if (!isAnswered) {
      return selectedAnswer === index ? styles.optionTextSelected : styles.optionText;
    }

    if (index === currentQuestion.correctAnswer || selectedAnswer === index) {
      return styles.optionTextSelected;
    }

    return styles.optionText;
  };

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
          colors={[colors.primary, colors.primaryDark]}
          style={styles.questionCard}
        >
          <View style={styles.questionIconWrap}>
            <Ionicons name="help" size={28} color={colors.primary} />
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
      {isAnswered && (
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
