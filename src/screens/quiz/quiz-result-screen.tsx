import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
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
  const { quiz, score, totalQuestions } = route.params;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultConfig = () => {
    if (percentage >= 80) {
      return {
        icon: 'trophy' as const,
        title: 'Excellent !',
        subtitle: 'Vous êtes un expert biblique !',
        gradient: ['#059669', '#047857'] as [string, string],
        iconColor: '#059669',
      };
    } else if (percentage >= 60) {
      return {
        icon: 'thumbs-up' as const,
        title: 'Bien joué !',
        subtitle: 'Vous avez de bonnes connaissances !',
        gradient: ['#2563eb', '#1d4ed8'] as [string, string],
        iconColor: '#2563eb',
      };
    } else if (percentage >= 40) {
      return {
        icon: 'book' as const,
        title: 'Pas mal !',
        subtitle: 'Continuez à apprendre !',
        gradient: ['#d97706', '#b45309'] as [string, string],
        iconColor: '#d97706',
      };
    } else {
      return {
        icon: 'school' as const,
        title: 'Courage !',
        subtitle: 'La pratique rend parfait !',
        gradient: ['#7c3aed', '#6d28d9'] as [string, string],
        iconColor: '#7c3aed',
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
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
            <View style={[styles.statIcon, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="star" size={22} color="#d97706" />
            </View>
            <Text style={styles.statValue}>+{score * 10}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

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

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.7}
        >
          <Ionicons name="grid" size={18} color={colors.text.secondary} />
          <Text style={styles.homeText}>Voir tous les quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
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
    marginBottom: spacing.xl,
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
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  homeText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
});
