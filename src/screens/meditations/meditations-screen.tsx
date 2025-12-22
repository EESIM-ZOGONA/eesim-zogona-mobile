import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, Meditation } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface MeditationsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Meditations'>;
}

// Méditations quotidiennes (rotate based on day)
const meditations: Meditation[] = [
  {
    id: '1',
    title: 'La confiance en Dieu',
    verse: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse.',
    verseRef: 'Proverbes 3:5',
    content: 'Dans un monde rempli d\'incertitudes, la confiance en Dieu reste notre ancre. Aujourd\'hui, nous sommes invités à déposer nos soucis, nos projets et nos craintes entre les mains de Celui qui connaît la fin depuis le commencement.',
    reflection: 'Sur quoi ou sur qui as-tu tendance à t\'appuyer dans les moments difficiles ? Prends un moment pour identifier ces béquilles humaines et choisis consciemment de te tourner vers Dieu.',
    prayer: 'Seigneur, je reconnais que ma sagesse est limitée. Aide-moi à Te faire confiance pleinement, même quand je ne comprends pas Ton plan. Dirige mes pas aujourd\'hui. Amen.',
    date: '2024-12-21',
    author: 'Pasteur Jean',
  },
  {
    id: '2',
    title: 'La paix qui surpasse toute intelligence',
    verse: 'Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.',
    verseRef: 'Philippiens 4:6',
    content: 'L\'anxiété est l\'un des plus grands défis de notre époque. Pourtant, Dieu nous offre une alternative : la prière accompagnée de gratitude. Cette combinaison puissante transforme notre perspective.',
    reflection: 'Quelles sont les choses qui te causent de l\'anxiété en ce moment ? Prends le temps de les nommer devant Dieu, puis remercie-Le pour au moins trois bénédictions dans ta vie.',
    prayer: 'Père céleste, je dépose devant Toi mes inquiétudes. Je choisis de Te remercier pour Ta fidélité. Remplis mon cœur de Ta paix qui dépasse ma compréhension. Amen.',
    date: '2024-12-22',
    author: 'Pasteur Marie',
  },
  {
    id: '3',
    title: 'La force dans la faiblesse',
    verse: 'Ma grâce te suffit, car ma puissance s\'accomplit dans la faiblesse.',
    verseRef: '2 Corinthiens 12:9',
    content: 'Paradoxalement, c\'est dans nos moments de plus grande faiblesse que la puissance de Dieu peut se manifester le plus clairement. Notre insuffisance devient le terrain où Sa suffisance brille.',
    reflection: 'Y a-t-il une faiblesse ou une limitation que tu essaies de cacher ? Comment cette faiblesse pourrait-elle devenir une opportunité pour la grâce de Dieu ?',
    prayer: 'Seigneur, je reconnais mes faiblesses devant Toi. Que Ta force se manifeste à travers mes limitations. Aide-moi à me glorifier de mes faiblesses pour que Ta puissance repose sur moi. Amen.',
    date: '2024-12-23',
    author: 'Pasteur Jean',
  },
  {
    id: '4',
    title: 'L\'amour inconditionnel',
    verse: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.',
    verseRef: 'Jean 3:16',
    content: 'L\'amour de Dieu n\'est pas basé sur nos performances. Il nous a aimés alors que nous étions encore pécheurs. Cet amour transformateur nous invite à aimer les autres de la même manière.',
    reflection: 'Comment as-tu expérimenté l\'amour inconditionnel de Dieu récemment ? Y a-t-il quelqu\'un dans ta vie qui a besoin de recevoir cet amour à travers toi ?',
    prayer: 'Merci Père pour Ton amour inépuisable. Aide-moi à recevoir pleinement cet amour et à le partager avec ceux qui m\'entourent. Que mon amour pour les autres soit le reflet du Tien. Amen.',
    date: '2024-12-24',
    author: 'Pasteur Marie',
  },
  {
    id: '5',
    title: 'Lumière du monde',
    verse: 'Je suis la lumière du monde; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.',
    verseRef: 'Jean 8:12',
    content: 'En cette période de Noël, nous célébrons la venue de la Lumière dans notre monde. Jésus dissipe les ténèbres de nos vies et nous appelle à refléter cette lumière autour de nous.',
    reflection: 'Dans quels domaines de ta vie as-tu besoin que la lumière de Christ vienne éclairer ? Comment peux-tu être lumière pour quelqu\'un aujourd\'hui ?',
    prayer: 'Seigneur Jésus, Lumière du monde, viens illuminer les recoins sombres de ma vie. Fais de moi un porteur de Ta lumière dans un monde qui en a tant besoin. Amen.',
    date: '2024-12-25',
    author: 'Pasteur Jean',
  },
  {
    id: '6',
    title: 'Nouveaux départs',
    verse: 'Si quelqu\'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées; voici, toutes choses sont devenues nouvelles.',
    verseRef: '2 Corinthiens 5:17',
    content: 'Chaque jour est une opportunité de nouveau départ avec Dieu. Peu importe ce qui s\'est passé hier, Sa miséricorde se renouvelle chaque matin. Tu peux avancer sans être enchaîné par ton passé.',
    reflection: 'De quelles "choses anciennes" as-tu besoin de te libérer ? Quelles nouvelles choses Dieu veut-Il faire dans ta vie ?',
    prayer: 'Père, merci pour les nouveaux départs que Tu offres. Aide-moi à laisser derrière moi ce qui m\'empêche d\'avancer et à embrasser la nouveauté de vie en Christ. Amen.',
    date: '2024-12-26',
    author: 'Pasteur Marie',
  },
  {
    id: '7',
    title: 'La prière persévérante',
    verse: 'Demandez, et l\'on vous donnera; cherchez, et vous trouverez; frappez, et l\'on vous ouvrira.',
    verseRef: 'Matthieu 7:7',
    content: 'Dieu nous invite à persévérer dans la prière. Ce n\'est pas parce que nous devons Le convaincre, mais parce que la prière transforme notre cœur et aligne notre volonté sur la Sienne.',
    reflection: 'Pour quelle situation pries-tu depuis longtemps ? Qu\'est-ce que cette attente t\'apprend sur toi-même et sur Dieu ?',
    prayer: 'Seigneur, donne-moi la persévérance dans la prière. Que je ne me décourage pas mais que je continue à frapper à Ta porte avec foi, sachant que Tu entends et que Tu réponds. Amen.',
    date: '2024-12-27',
    author: 'Pasteur Jean',
  },
];

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

// Get today's meditation
const getTodayMeditation = (): Meditation => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return meditations[dayOfYear % meditations.length];
};

export function MeditationsScreen({ navigation }: MeditationsScreenProps) {
  const todayMeditation = useMemo(() => getTodayMeditation(), []);
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = MONTHS_SHORT[today.getMonth()];

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
          <Text style={styles.headerTitle}>Méditations</Text>
          <Text style={styles.headerSubtitle}>Nourriture spirituelle</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.calendarGradient}
          >
            <Ionicons name="calendar" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today's Meditation Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.todayCard}
        >
          <View style={styles.todayHeader}>
            <View style={styles.todayDateWrap}>
              <Text style={styles.todayDateMonth}>{todayMonth}</Text>
              <Text style={styles.todayDateDay}>{todayDay}</Text>
            </View>
            <View style={styles.todayBadge}>
              <Ionicons name="sparkles" size={12} color="#fbbf24" />
              <Text style={styles.todayBadgeText}>AUJOURD'HUI</Text>
            </View>
          </View>

          <Text style={styles.todayTitle}>{todayMeditation.title}</Text>

          <View style={styles.verseBox}>
            <Text style={styles.verseQuote}>"</Text>
            <Text style={styles.todayVerse}>{todayMeditation.verse}</Text>
            <Text style={styles.todayVerseRef}>{todayMeditation.verseRef}</Text>
          </View>

          <TouchableOpacity
            style={styles.readButton}
            onPress={() => navigation.navigate('MeditationDetail', { meditation: todayMeditation })}
            activeOpacity={0.9}
          >
            <Text style={styles.readButtonText}>Lire la méditation</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="book" size={22} color="#16a34a" />
            </View>
            <Text style={styles.quickActionTitle}>Lecture Bible</Text>
            <Text style={styles.quickActionSubtitle}>Plan quotidien</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="musical-notes" size={22} color="#d97706" />
            </View>
            <Text style={styles.quickActionTitle}>Louange</Text>
            <Text style={styles.quickActionSubtitle}>Cantique du jour</Text>
          </TouchableOpacity>
        </View>

        {/* Previous Meditations */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Méditations récentes</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {meditations.slice(1, 5).map((meditation, index) => {
          const date = new Date(meditation.date);
          const day = date.getDate().toString();
          const monthIndex = date.getMonth();

          const colorSchemes = [
            { gradient: ['#059669', '#047857'] as [string, string], accent: '#6ee7b7' },
            { gradient: ['#7c3aed', '#6d28d9'] as [string, string], accent: '#c4b5fd' },
            { gradient: ['#d97706', '#b45309'] as [string, string], accent: '#fcd34d' },
            { gradient: ['#0891b2', '#0e7490'] as [string, string], accent: '#67e8f9' },
          ];
          const colorScheme = colorSchemes[index % colorSchemes.length];

          return (
            <TouchableOpacity
              key={meditation.id}
              style={styles.meditationCard}
              onPress={() => navigation.navigate('MeditationDetail', { meditation })}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={colorScheme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.meditationDate}
              >
                <Text style={styles.meditationMonth}>{MONTHS_SHORT[monthIndex]}</Text>
                <Text style={styles.meditationDay}>{day}</Text>
                <View style={[styles.dateAccent, { backgroundColor: colorScheme.accent }]} />
              </LinearGradient>
              <View style={styles.meditationInfo}>
                <Text style={styles.meditationTitle}>{meditation.title}</Text>
                <Text style={styles.meditationVerseRef}>{meditation.verseRef}</Text>
                <View style={styles.meditationMeta}>
                  <Ionicons name="person-outline" size={12} color={colors.text.secondary} />
                  <Text style={styles.meditationAuthor}>{meditation.author}</Text>
                </View>
              </View>
              <View style={styles.arrowWrap}>
                <Ionicons name="chevron-forward" size={18} color={colors.primary} />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconWrap}>
            <Ionicons name="bulb" size={24} color="#d97706" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Conseil spirituel</Text>
            <Text style={styles.tipText}>
              Commencez votre journée par 10 minutes de méditation et de prière pour bien la démarrer.
            </Text>
          </View>
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
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  calendarGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Today Card
  todayCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  todayDateWrap: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  todayDateMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  todayDateDay: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
    marginTop: -2,
  },
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  todayBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 0.5,
  },
  todayTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.md,
  },
  verseBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  verseQuote: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.3)',
    lineHeight: 32,
    marginBottom: -spacing.sm,
  },
  todayVerse: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  todayVerseRef: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.9)',
    marginTop: spacing.sm,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  readButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 40 }, { translateY: 40 }],
  },
  // Quick Actions
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  quickActionSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
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
  seeAllText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Meditation Card
  meditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  meditationDate: {
    width: 72,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  meditationMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  meditationDay: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
    marginTop: -2,
  },
  dateAccent: {
    position: 'absolute',
    bottom: 8,
    width: 24,
    height: 3,
    borderRadius: 2,
  },
  meditationInfo: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  meditationTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  meditationVerseRef: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  meditationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meditationAuthor: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  arrowWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  // Tip Card
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  tipIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#92400e',
    marginBottom: spacing.xs,
  },
  tipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: '#b45309',
    lineHeight: 20,
  },
});
