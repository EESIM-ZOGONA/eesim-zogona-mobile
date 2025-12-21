import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, Event } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface MyEventsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyEvents'>;
}

type EventTab = 'upcoming' | 'past';

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

// Color schemes for event cards
const getEventColorScheme = (index: number) => {
  const schemes = [
    { gradient: ['#030a7f', '#020866'] as [string, string], accent: '#818cf8' },
    { gradient: ['#dc2626', '#b91c1c'] as [string, string], accent: '#fca5a5' },
    { gradient: ['#059669', '#047857'] as [string, string], accent: '#6ee7b7' },
    { gradient: ['#d97706', '#b45309'] as [string, string], accent: '#fcd34d' },
    { gradient: ['#7c3aed', '#6d28d9'] as [string, string], accent: '#c4b5fd' },
  ];
  return schemes[index % schemes.length];
};

// Mock data - événements auxquels l'utilisateur s'est inscrit
const mockUserEvents: (Event & { status: 'confirmed' | 'pending' })[] = [
  {
    id: '1',
    title: 'Culte de Noël',
    description: 'Célébration spéciale de la naissance de Jésus',
    date: '25 Dec 2024',
    time: '09:00',
    location: 'Temple principal',
    category: 'culte',
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Veillée de prière',
    description: 'Nuit de louange et intercession',
    date: '31 Dec 2024',
    time: '22:00',
    location: 'Temple principal',
    category: 'culte',
    status: 'confirmed',
  },
  {
    id: '3',
    title: 'Camp de jeunes 2025',
    description: 'Camp annuel des jeunes de l\'église',
    date: '15 Jan 2025',
    time: '08:00',
    location: 'Koudougou',
    category: 'jeune',
    status: 'pending',
  },
];

const mockPastEvents: (Event & { status: 'attended' | 'missed' })[] = [
  {
    id: '4',
    title: 'Séminaire sur la prière',
    description: 'Formation sur la vie de prière',
    date: '20 Nov 2024',
    time: '14:00',
    location: 'Salle annexe',
    category: 'formation',
    status: 'attended',
  },
  {
    id: '5',
    title: 'Concert de louange',
    description: 'Soirée de louange avec la chorale',
    date: '10 Nov 2024',
    time: '18:00',
    location: 'Temple principal',
    category: 'culte',
    status: 'attended',
  },
];

const tabs: { key: EventTab; label: string; count: number }[] = [
  { key: 'upcoming', label: 'À venir', count: mockUserEvents.length },
  { key: 'past', label: 'Passés', count: mockPastEvents.length },
];

const parseEventDate = (dateStr: string) => {
  const parts = dateStr.split(' ');
  const day = parts[0];
  const monthStr = parts[1];
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Fev': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Jun': 5,
    'Jul': 6, 'Aou': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  const monthIndex = monthMap[monthStr] ?? 0;
  return { day, monthIndex };
};

export function MyEventsScreen({ navigation }: MyEventsScreenProps) {
  const [activeTab, setActiveTab] = useState<EventTab>('upcoming');

  const renderUpcomingEvent = ({ item, index }: { item: typeof mockUserEvents[0]; index: number }) => {
    const { day, monthIndex } = parseEventDate(item.date);
    const colorScheme = getEventColorScheme(index);

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetail', { event: item })}
        activeOpacity={0.9}
      >
        {/* Left: Gradient Date */}
        <LinearGradient
          colors={colorScheme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dateGradient}
        >
          <Text style={styles.dateMonth}>{MONTHS_SHORT[monthIndex]}</Text>
          <Text style={styles.dateDay}>{day}</Text>
          <View style={[styles.dateAccent, { backgroundColor: colorScheme.accent }]} />
        </LinearGradient>

        {/* Content */}
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <View style={styles.eventCategoryBadge}>
              <Text style={styles.eventCategoryText}>
                {item.category === 'culte' ? 'Culte' : item.category === 'jeune' ? 'Jeunesse' : 'Autre'}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              item.status === 'confirmed' ? styles.statusConfirmed : styles.statusPending
            ]}>
              <Ionicons
                name={item.status === 'confirmed' ? 'checkmark-circle' : 'time'}
                size={12}
                color={item.status === 'confirmed' ? '#16a34a' : '#d97706'}
              />
              <Text style={[
                styles.statusText,
                item.status === 'confirmed' ? styles.statusTextConfirmed : styles.statusTextPending
              ]}>
                {item.status === 'confirmed' ? 'Confirmé' : 'En attente'}
              </Text>
            </View>
          </View>
          <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color={colors.text.secondary} />
              <Text style={styles.metaText} numberOfLines={1}>{item.location.split(',')[0]}</Text>
            </View>
          </View>
        </View>

        {/* Arrow */}
        <View style={styles.arrowWrap}>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderPastEvent = ({ item, index }: { item: typeof mockPastEvents[0]; index: number }) => {
    const { day, monthIndex } = parseEventDate(item.date);

    return (
      <View style={[styles.eventCard, styles.pastEventCard]}>
        {/* Left: Date */}
        <View style={styles.pastDateWrap}>
          <Text style={styles.pastDateMonth}>{MONTHS_SHORT[monthIndex]}</Text>
          <Text style={styles.pastDateDay}>{day}</Text>
        </View>

        {/* Content */}
        <View style={styles.eventContent}>
          <Text style={[styles.eventTitle, styles.pastTitle]} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.eventMeta}>
            <View style={[
              styles.attendedBadge,
              item.status === 'attended' ? styles.attendedYes : styles.attendedNo
            ]}>
              <Ionicons
                name={item.status === 'attended' ? 'checkmark-circle' : 'close-circle'}
                size={14}
                color={item.status === 'attended' ? '#16a34a' : '#dc2626'}
              />
              <Text style={[
                styles.attendedText,
                item.status === 'attended' ? styles.attendedTextYes : styles.attendedTextNo
              ]}>
                {item.status === 'attended' ? 'Participé' : 'Manqué'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="calendar-outline" size={48} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>
        {activeTab === 'upcoming' ? 'Aucune inscription' : 'Aucun événement passé'}
      </Text>
      <Text style={styles.emptyText}>
        {activeTab === 'upcoming'
          ? "Vous n'êtes inscrit à aucun événement à venir. Consultez le calendrier pour découvrir les prochains événements."
          : "Vous n'avez pas encore participé à des événements."}
      </Text>
      {activeTab === 'upcoming' && (
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Events')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.exploreButtonGradient}
          >
            <Ionicons name="calendar" size={18} color="#fff" />
            <Text style={styles.exploreButtonText}>Voir les événements</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );

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
          <Text style={styles.headerTitle}>Mes Événements</Text>
          <Text style={styles.headerSubtitle}>
            {activeTab === 'upcoming' ? mockUserEvents.length : mockPastEvents.length} événements
          </Text>
        </View>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => navigation.navigate('Events')}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.calendarGradient}
          >
            <Ionicons name="calendar" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabChip}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.8}
              >
                {isActive ? (
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    style={styles.tabChipGradient}
                  >
                    <Text style={styles.tabTextActive}>{tab.label} ({tab.count})</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tabChipInner}>
                    <Text style={styles.tabText}>{tab.label} ({tab.count})</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleWrap}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>
            {activeTab === 'upcoming' ? 'Inscriptions à venir' : 'Événements passés'}
          </Text>
        </View>
      </View>

      {/* Events List */}
      {activeTab === 'upcoming' ? (
        <FlatList
          data={mockUserEvents}
          renderItem={renderUpcomingEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      ) : (
        <FlatList
          data={mockPastEvents}
          renderItem={renderPastEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
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
  // Tabs
  tabsWrapper: {
    height: 48,
    marginBottom: spacing.md,
  },
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    height: 48,
  },
  tabChip: {
    marginRight: spacing.sm,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  tabChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  tabChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  tabTextActive: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
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
  // List
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  // Event Card
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  pastEventCard: {
    opacity: 0.85,
  },
  dateGradient: {
    width: 72,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dateMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  dateDay: {
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
  pastDateWrap: {
    width: 72,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border,
  },
  pastDateMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.text.tertiary,
    letterSpacing: 1,
  },
  pastDateDay: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.secondary,
  },
  eventContent: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  eventCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  eventCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  statusConfirmed: {
    backgroundColor: '#dcfce7',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 10,
    fontFamily: fontFamily.semibold,
  },
  statusTextConfirmed: {
    color: '#16a34a',
  },
  statusTextPending: {
    color: '#d97706',
  },
  eventTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  pastTitle: {
    color: colors.text.secondary,
  },
  eventMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
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
  attendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  attendedYes: {
    backgroundColor: '#dcfce7',
  },
  attendedNo: {
    backgroundColor: '#fee2e2',
  },
  attendedText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
  },
  attendedTextYes: {
    color: '#16a34a',
  },
  attendedTextNo: {
    color: '#dc2626',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxxl,
    paddingHorizontal: spacing.xxl,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  exploreButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  exploreButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  exploreButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
