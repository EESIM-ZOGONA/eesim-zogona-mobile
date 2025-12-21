import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface MyCellScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyCell'>;
}

interface CellMember {
  id: string;
  name: string;
  role: 'leader' | 'assistant' | 'member';
  phone: string;
  avatar?: string;
}

// Mock data - cellule de l'utilisateur
const userCell = {
  id: '1',
  name: 'Cellule Zogona Centre',
  zone: 'Zogona',
  meetingDay: 'Mercredi',
  meetingTime: '18:30',
  location: 'Domicile du responsable',
  memberCount: 12,
  description: 'Une cellule familiale où nous grandissons ensemble dans la foi à travers la prière, l\'étude de la Bible et la communion fraternelle.',
};

const cellMembers: CellMember[] = [
  { id: '1', name: 'Jean Ouédraogo', role: 'leader', phone: '+226 70 00 00 01' },
  { id: '2', name: 'Marie Kaboré', role: 'assistant', phone: '+226 70 00 00 02' },
  { id: '3', name: 'Paul Sawadogo', role: 'member', phone: '+226 70 00 00 03' },
  { id: '4', name: 'Ruth Compaoré', role: 'member', phone: '+226 70 00 00 04' },
  { id: '5', name: 'David Ouattara', role: 'member', phone: '+226 70 00 00 05' },
];

const upcomingMeetings = [
  { id: '1', date: '2024-12-25', topic: 'La naissance de Jésus', type: 'study' },
  { id: '2', date: '2025-01-01', topic: 'Prière de nouvel an', type: 'prayer' },
  { id: '3', date: '2025-01-08', topic: 'Les dons spirituels', type: 'study' },
];

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

// Color schemes for meeting cards
const getMeetingColorScheme = (type: string, index: number) => {
  if (type === 'prayer') {
    return { gradient: ['#0891b2', '#0e7490'] as [string, string], accent: '#67e8f9' };
  }
  const schemes = [
    { gradient: ['#030a7f', '#020866'] as [string, string], accent: '#818cf8' },
    { gradient: ['#7c3aed', '#6d28d9'] as [string, string], accent: '#c4b5fd' },
    { gradient: ['#059669', '#047857'] as [string, string], accent: '#6ee7b7' },
  ];
  return schemes[index % schemes.length];
};

const getRoleConfig = (role: CellMember['role']) => {
  switch (role) {
    case 'leader':
      return { label: 'Responsable', gradient: ['#030a7f', '#020866'] as [string, string] };
    case 'assistant':
      return { label: 'Assistant', gradient: ['#059669', '#047857'] as [string, string] };
    default:
      return { label: 'Membre', gradient: ['#6b7280', '#4b5563'] as [string, string] };
  }
};

export function MyCellScreen({ navigation }: MyCellScreenProps) {
  const NoCellState = () => (
    <View style={styles.noCellContainer}>
      <View style={styles.noCellIconWrap}>
        <Ionicons name="people-outline" size={48} color={colors.primary} />
      </View>
      <Text style={styles.noCellTitle}>Rejoignez une cellule</Text>
      <Text style={styles.noCellText}>
        Vous n'êtes pas encore membre d'une cellule de maison.
        Les cellules sont des groupes de prière et de partage qui se
        réunissent chaque semaine dans les quartiers.
      </Text>
      <TouchableOpacity style={styles.findCellButton} activeOpacity={0.8}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.findCellGradient}
        >
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.findCellButtonText}>Trouver une cellule</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  // Si l'utilisateur n'a pas de cellule, afficher l'état vide
  const hasCell = true;

  if (!hasCell) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Ma Cellule</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        <NoCellState />
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Ma Cellule</Text>
          <Text style={styles.headerSubtitle}>{userCell.memberCount} membres</Text>
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.infoGradient}
          >
            <Ionicons name="information" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cell Info Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cellCard}
        >
          <View style={styles.cellHeader}>
            <View style={styles.cellIconWrap}>
              <Ionicons name="people" size={28} color={colors.primary} />
            </View>
            <View style={styles.cellHeaderInfo}>
              <Text style={styles.cellName}>{userCell.name}</Text>
              <View style={styles.zoneBadge}>
                <Ionicons name="location" size={12} color="#fff" />
                <Text style={styles.zoneText}>{userCell.zone}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.cellDescription}>{userCell.description}</Text>

          <View style={styles.cellMeta}>
            <View style={styles.cellMetaItem}>
              <View style={styles.metaIconWrap}>
                <Ionicons name="calendar" size={16} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.metaLabel}>Jour</Text>
                <Text style={styles.metaValue}>{userCell.meetingDay}</Text>
              </View>
            </View>
            <View style={styles.cellMetaItem}>
              <View style={styles.metaIconWrap}>
                <Ionicons name="time" size={16} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.metaLabel}>Heure</Text>
                <Text style={styles.metaValue}>{userCell.meetingTime}</Text>
              </View>
            </View>
            <View style={styles.cellMetaItem}>
              <View style={styles.metaIconWrap}>
                <Ionicons name="people" size={16} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.metaLabel}>Membres</Text>
                <Text style={styles.metaValue}>{userCell.memberCount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Upcoming Meetings */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Prochaines réunions</Text>
          </View>
        </View>

        {upcomingMeetings.map((meeting, index) => {
          const date = new Date(meeting.date);
          const day = date.getDate().toString();
          const monthIndex = date.getMonth();
          const colorScheme = getMeetingColorScheme(meeting.type, index);

          return (
            <TouchableOpacity key={meeting.id} style={styles.meetingCard} activeOpacity={0.9}>
              <LinearGradient
                colors={colorScheme.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.meetingDate}
              >
                <Text style={styles.meetingMonth}>{MONTHS_SHORT[monthIndex]}</Text>
                <Text style={styles.meetingDay}>{day}</Text>
                <View style={[styles.dateAccent, { backgroundColor: colorScheme.accent }]} />
              </LinearGradient>
              <View style={styles.meetingInfo}>
                <View style={styles.meetingTypeBadge}>
                  <Ionicons
                    name={meeting.type === 'study' ? 'book' : 'hand-left'}
                    size={10}
                    color={colors.primary}
                  />
                  <Text style={styles.meetingTypeText}>
                    {meeting.type === 'study' ? 'Étude biblique' : 'Prière'}
                  </Text>
                </View>
                <Text style={styles.meetingTopic}>{meeting.topic}</Text>
                <View style={styles.meetingMeta}>
                  <Ionicons name="time-outline" size={12} color={colors.text.secondary} />
                  <Text style={styles.meetingMetaText}>{userCell.meetingTime}</Text>
                </View>
              </View>
              <View style={styles.arrowWrap}>
                <Ionicons name="chevron-forward" size={18} color={colors.primary} />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Members */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Membres ({cellMembers.length})</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {cellMembers.map((member) => {
          const roleConfig = getRoleConfig(member.role);
          return (
            <View key={member.id} style={styles.memberCard}>
              <LinearGradient
                colors={roleConfig.gradient}
                style={styles.memberAvatar}
              >
                <Text style={styles.memberInitial}>
                  {member.name.charAt(0)}
                </Text>
              </LinearGradient>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleText}>{roleConfig.label}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
                <Ionicons name="call" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Actions */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Actions rapides</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.actionGradient}
            >
              <Ionicons name="chatbubbles" size={22} color="#fff" />
              <Text style={styles.actionText}>Discussion</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={styles.actionGradient}
            >
              <Ionicons name="location" size={22} color="#fff" />
              <Text style={styles.actionText}>Itinéraire</Text>
            </LinearGradient>
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
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  infoGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Cell Card
  cellCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  cellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cellIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellHeaderInfo: {
    flex: 1,
  },
  cellName: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  zoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  zoneText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#fff',
  },
  cellDescription: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  cellMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: spacing.lg,
  },
  cellMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.7)',
  },
  metaValue: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
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
  seeAllText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Meeting Card
  meetingCard: {
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
  meetingDate: {
    width: 72,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  meetingMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  meetingDay: {
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
  meetingInfo: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  meetingTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xs,
    gap: 4,
  },
  meetingTypeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  meetingTopic: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  meetingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meetingMetaText: {
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
  // Members
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInitial: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  roleText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Actions
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  actionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // No Cell State
  noCellContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  noCellIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  noCellTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  noCellText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  findCellButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  findCellGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  findCellButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
