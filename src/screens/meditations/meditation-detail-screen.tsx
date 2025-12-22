import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

interface MeditationDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MeditationDetail'>;
  route: RouteProp<RootStackParamList, 'MeditationDetail'>;
}

const MONTHS_FULL = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export function MeditationDetailScreen({ navigation, route }: MeditationDetailScreenProps) {
  const { meditation } = route.params;
  const date = new Date(meditation.date);
  const formattedDate = `${date.getDate()} ${MONTHS_FULL[date.getMonth()]} ${date.getFullYear()}`;

  const shareMeditation = async () => {
    try {
      await Share.share({
        message: `📖 Méditation du jour: ${meditation.title}\n\n"${meditation.verse}"\n— ${meditation.verseRef}\n\n${meditation.content}\n\n🙏 ${meditation.prayer}\n\n— EE/SIM Zogona`,
        title: meditation.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Méditation</Text>
          <Text style={styles.headerSubtitle}>{formattedDate}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={shareMeditation}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.shareGradient}
          >
            <Ionicons name="share-social" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.titleCard}
        >
          <View style={styles.titleIconWrap}>
            <Ionicons name="book" size={28} color={colors.primary} />
          </View>
          <Text style={styles.meditationTitle}>{meditation.title}</Text>
          {meditation.author && (
            <View style={styles.authorBadge}>
              <Ionicons name="person" size={12} color="#fff" />
              <Text style={styles.authorText}>{meditation.author}</Text>
            </View>
          )}
          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Verse Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Verset du jour</Text>
          </View>
        </View>

        <View style={styles.verseCard}>
          <View style={styles.verseQuoteWrap}>
            <Text style={styles.verseQuote}>"</Text>
          </View>
          <Text style={styles.verseText}>{meditation.verse}</Text>
          <View style={styles.verseRefWrap}>
            <View style={styles.verseRefLine} />
            <Text style={styles.verseRef}>{meditation.verseRef}</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={[styles.sectionDot, { backgroundColor: '#059669' }]} />
            <Text style={styles.sectionTitle}>Méditation</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.contentText}>{meditation.content}</Text>
        </View>

        {/* Reflection Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={[styles.sectionDot, { backgroundColor: '#d97706' }]} />
            <Text style={styles.sectionTitle}>Réflexion</Text>
          </View>
        </View>

        <View style={styles.reflectionCard}>
          <View style={styles.reflectionIconWrap}>
            <Ionicons name="bulb" size={24} color="#d97706" />
          </View>
          <Text style={styles.reflectionText}>{meditation.reflection}</Text>
        </View>

        {/* Prayer Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={[styles.sectionDot, { backgroundColor: '#7c3aed' }]} />
            <Text style={styles.sectionTitle}>Prière</Text>
          </View>
        </View>

        <LinearGradient
          colors={['#7c3aed', '#6d28d9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.prayerCard}
        >
          <View style={styles.prayerIconWrap}>
            <Ionicons name="hand-left" size={24} color="#7c3aed" />
          </View>
          <Text style={styles.prayerText}>{meditation.prayer}</Text>
          <View style={styles.prayerAccent} />
        </LinearGradient>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <View style={styles.actionIcon}>
              <Ionicons name="bookmark-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Sauvegarder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={shareMeditation} activeOpacity={0.8}>
            <View style={styles.actionIcon}>
              <Ionicons name="share-social-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <View style={styles.actionIcon}>
              <Ionicons name="copy-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Copier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  backButton: {
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
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  shareGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Title Card
  titleCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  titleIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  meditationTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  authorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  authorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#fff',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 30 }, { translateY: 30 }],
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  // Verse Card
  verseCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  verseQuoteWrap: {
    marginBottom: -spacing.sm,
  },
  verseQuote: {
    fontSize: 48,
    fontFamily: fontFamily.bold,
    color: colors.primaryLight,
    lineHeight: 48,
  },
  verseText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
    fontStyle: 'italic',
    lineHeight: 28,
  },
  verseRefWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  verseRefLine: {
    width: 24,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  verseRef: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  // Content Card
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  contentText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 26,
  },
  // Reflection Card
  reflectionCard: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  reflectionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reflectionText: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: '#92400e',
    lineHeight: 24,
  },
  // Prayer Card
  prayerCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  prayerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  prayerText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  prayerAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 20 }, { translateY: 20 }],
  },
  // Actions
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  actionButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
});
