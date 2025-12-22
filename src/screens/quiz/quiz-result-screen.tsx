import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface QuizResultScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuizResult'>;
  route: RouteProp<RootStackParamList, 'QuizResult'>;
}

export function QuizResultScreen({ navigation, route }: QuizResultScreenProps) {
  const { quiz, score, totalQuestions, userAnswers, questions } = route.params;
  const percentage = Math.round((score / totalQuestions) * 100);
  const [showErrors, setShowErrors] = useState(false);

  const wrongAnswers = questions && userAnswers
    ? questions.filter((q, index) => userAnswers[index] !== q.correctAnswer)
    : [];

  const getResultConfig = () => {
    if (percentage >= 80) {
      return {
        icon: 'trophy' as const,
        title: 'Excellent !',
        subtitle: 'Vous êtes un expert biblique !',
        gradient: [colors.primary, colors.primaryDark] as [string, string],
        iconColor: colors.primary,
      };
    } else if (percentage >= 60) {
      return {
        icon: 'thumbs-up' as const,
        title: 'Bien joué !',
        subtitle: 'Vous avez de bonnes connaissances !',
        gradient: [colors.primary, colors.primaryDark] as [string, string],
        iconColor: colors.primary,
      };
    } else if (percentage >= 40) {
      return {
        icon: 'book' as const,
        title: 'Pas mal !',
        subtitle: 'Continuez à apprendre !',
        gradient: [colors.primary, colors.primaryDark] as [string, string],
        iconColor: colors.primary,
      };
    } else {
      return {
        icon: 'school' as const,
        title: 'Courage !',
        subtitle: 'La pratique rend parfait !',
        gradient: [colors.primary, colors.primaryDark] as [string, string],
        iconColor: colors.primary,
      };
    }
  };

  const resultConfig = getResultConfig();

  const shareResult = async () => {
    try {
      await Share.share({
        message: `🎯 J'ai obtenu ${score}/${totalQuestions} (${percentage}%) au quiz "${quiz.title}" sur l'application EE/SIM Zogona ! Pouvez-vous faire mieux ? 📖`,
        title: 'Résultat du Quiz',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderErrorsModal = () => (
    <Modal
      visible={showErrors}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowErrors(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Revue des erreurs</Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowErrors(false)}
          >
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalContent}
          contentContainerStyle={styles.modalScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {wrongAnswers.length === 0 ? (
            <View style={styles.noErrorsContainer}>
              <View style={styles.noErrorsIcon}>
                <Ionicons name="checkmark-circle" size={64} color="#16a34a" />
              </View>
              <Text style={styles.noErrorsTitle}>Parfait !</Text>
              <Text style={styles.noErrorsText}>
                Vous n'avez fait aucune erreur. Félicitations !
              </Text>
            </View>
          ) : (
            wrongAnswers.map((question, index) => {
              const questionIndex = questions?.indexOf(question) ?? 0;
              const userAnswer = userAnswers?.[questionIndex] ?? -1;

              return (
                <View key={question.id} style={styles.errorCard}>
                  <View style={styles.errorHeader}>
                    <View style={styles.errorBadge}>
                      <Text style={styles.errorBadgeText}>Question {questionIndex + 1}</Text>
                    </View>
                  </View>

                  <Text style={styles.errorQuestion}>{question.question}</Text>

                  <View style={styles.answersContainer}>
                    {/* User's wrong answer */}
                    <View style={styles.answerRow}>
                      <View style={styles.answerIconWrong}>
                        <Ionicons name="close" size={16} color="#fff" />
                      </View>
                      <View style={styles.answerContent}>
                        <Text style={styles.answerLabel}>Votre réponse</Text>
                        <Text style={styles.answerTextWrong}>
                          {userAnswer === -1
                            ? 'Temps écoulé'
                            : question.options[userAnswer] ?? 'Non répondu'}
                        </Text>
                      </View>
                    </View>

                    {/* Correct answer */}
                    <View style={styles.answerRow}>
                      <View style={styles.answerIconCorrect}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      </View>
                      <View style={styles.answerContent}>
                        <Text style={styles.answerLabel}>Bonne réponse</Text>
                        <Text style={styles.answerTextCorrect}>
                          {question.options[question.correctAnswer]}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Explanation */}
                  {question.explanation && (
                    <View style={styles.explanationBox}>
                      <View style={styles.explanationIcon}>
                        <Ionicons name="bulb" size={18} color={colors.primary} />
                      </View>
                      <View style={styles.explanationContent}>
                        <Text style={styles.explanationText}>{question.explanation}</Text>
                        {question.verseRef && (
                          <Text style={styles.verseRef}>{question.verseRef}</Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Result Card */}
        <LinearGradient
          colors={resultConfig.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.resultCard}
        >
          <View style={styles.iconWrap}>
            <Ionicons name={resultConfig.icon} size={48} color={resultConfig.iconColor} />
          </View>
          <Text style={styles.resultTitle}>{resultConfig.title}</Text>
          <Text style={styles.resultSubtitle}>{resultConfig.subtitle}</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreLabel}>{score}/{totalQuestions} correct</Text>
          </View>

          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="checkmark-circle" size={22} color="#16a34a" />
            </View>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Correctes</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#fee2e2' }]}>
              <Ionicons name="close-circle" size={22} color="#dc2626" />
            </View>
            <Text style={styles.statValue}>{totalQuestions - score}</Text>
            <Text style={styles.statLabel}>Incorrectes</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="star" size={22} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>+{score * 10}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* View Errors Button */}
        {questions && userAnswers && wrongAnswers.length > 0 && (
          <TouchableOpacity
            style={styles.viewErrorsButton}
            onPress={() => setShowErrors(true)}
            activeOpacity={0.8}
          >
            <View style={styles.viewErrorsIcon}>
              <Ionicons name="eye" size={20} color={colors.primary} />
            </View>
            <View style={styles.viewErrorsContent}>
              <Text style={styles.viewErrorsTitle}>Voir mes erreurs</Text>
              <Text style={styles.viewErrorsSubtitle}>
                {wrongAnswers.length} question{wrongAnswers.length > 1 ? 's' : ''} à revoir
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Quiz Info */}
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizDescription}>{quiz.description}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.replace('QuizPlay', { quiz })}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.retryGradient}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.retryText}>Rejouer</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={shareResult}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social" size={20} color={colors.primary} />
            <Text style={styles.shareText}>Partager</Text>
          </TouchableOpacity>
        </View>

        {/* Nouveau Quiz Button */}
        <TouchableOpacity
          style={styles.newQuizButton}
          onPress={() => navigation.reset({
            index: 1,
            routes: [
              { name: 'Quiz' },
              { name: 'QuizPlay', params: { quiz } },
            ],
          })}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.newQuizGradient}
          >
            <Ionicons name="play-circle" size={22} color="#fff" />
            <Text style={styles.newQuizText}>Nouveau Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Voir tous les quiz Button */}
        <TouchableOpacity
          style={styles.allQuizzesButton}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Quiz' }],
          })}
          activeOpacity={0.8}
        >
          <Ionicons name="grid" size={20} color={colors.primary} />
          <Text style={styles.allQuizzesText}>Voir tous les quiz</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderErrorsModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  // Result Card
  resultCard: {
    borderRadius: borderRadius.xxl,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  resultTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  resultSubtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.xl,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePercentage: {
    fontSize: 36,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
  },
  scoreLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 50 }, { translateY: 50 }],
  },
  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  // View Errors Button
  viewErrorsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  viewErrorsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewErrorsContent: {
    flex: 1,
  },
  viewErrorsTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  viewErrorsSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.primaryDark,
    marginTop: 2,
  },
  // Quiz Info
  quizInfo: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  quizTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  quizDescription: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  // Actions
  actionsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  retryButton: {
    flex: 2,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  retryText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  shareText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  newQuizButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  newQuizGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  newQuizText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  allQuizzesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  allQuizzesText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  modalCloseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
  },
  modalScrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // No Errors
  noErrorsContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  noErrorsIcon: {
    marginBottom: spacing.lg,
  },
  noErrorsTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  noErrorsText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  // Error Card
  errorCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  errorHeader: {
    marginBottom: spacing.md,
  },
  errorBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  errorBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  errorQuestion: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  answersContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  answerIconWrong: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerIconCorrect: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerContent: {
    flex: 1,
  },
  answerLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  answerTextWrong: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: '#dc2626',
  },
  answerTextCorrect: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: '#16a34a',
  },
  explanationBox: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  explanationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationContent: {
    flex: 1,
  },
  explanationText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.primaryDark,
    lineHeight: 20,
  },
  verseRef: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
