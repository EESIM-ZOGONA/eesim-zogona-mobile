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

interface MyDonationsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyDonations'>;
}

interface Donation {
  id: string;
  amount: number;
  type: 'dime' | 'offering' | 'special' | 'project';
  date: string;
  status: 'completed' | 'pending';
  reference: string;
}

const donationTypes = {
  dime: { label: 'Dîme', icon: 'gift' as const },
  offering: { label: 'Offrande', icon: 'heart' as const },
  special: { label: 'Don spécial', icon: 'star' as const },
  project: { label: 'Projet', icon: 'construct' as const },
};

// Color schemes for donation cards (matching events-screen style)
const getDonationColorScheme = (index: number) => {
  const schemes = [
    { gradient: ['#030a7f', '#020866'] as [string, string], accent: '#818cf8' },
    { gradient: ['#059669', '#047857'] as [string, string], accent: '#6ee7b7' },
    { gradient: ['#d97706', '#b45309'] as [string, string], accent: '#fcd34d' },
    { gradient: ['#7c3aed', '#6d28d9'] as [string, string], accent: '#c4b5fd' },
  ];
  return schemes[index % schemes.length];
};

const mockDonations: Donation[] = [
  {
    id: '1',
    amount: 50000,
    type: 'dime',
    date: '2024-12-15',
    status: 'completed',
    reference: 'DON-2024-001',
  },
  {
    id: '2',
    amount: 25000,
    type: 'offering',
    date: '2024-12-10',
    status: 'completed',
    reference: 'DON-2024-002',
  },
  {
    id: '3',
    amount: 100000,
    type: 'project',
    date: '2024-12-01',
    status: 'completed',
    reference: 'DON-2024-003',
  },
  {
    id: '4',
    amount: 15000,
    type: 'special',
    date: '2024-11-25',
    status: 'completed',
    reference: 'DON-2024-004',
  },
];

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

const formatAmount = (amount: number) => {
  return amount.toLocaleString('fr-FR') + ' FCFA';
};

export function MyDonationsScreen({ navigation }: MyDonationsScreenProps) {
  const totalDonations = mockDonations.reduce((sum, d) => sum + d.amount, 0);
  const thisMonthDonations = mockDonations
    .filter(d => new Date(d.date).getMonth() === new Date().getMonth())
    .reduce((sum, d) => sum + d.amount, 0);

  const renderDonation = (item: Donation, index: number) => {
    const typeConfig = donationTypes[item.type];
    const colorScheme = getDonationColorScheme(index);
    const date = new Date(item.date);
    const day = date.getDate().toString();
    const monthIndex = date.getMonth();

    return (
      <TouchableOpacity key={item.id} style={styles.donationCard} activeOpacity={0.9}>
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
        <View style={styles.donationContent}>
          <View style={styles.donationCategoryBadge}>
            <Ionicons name={typeConfig.icon} size={10} color={colors.primary} />
            <Text style={styles.donationCategoryText}>{typeConfig.label}</Text>
          </View>
          <Text style={styles.donationAmount}>{formatAmount(item.amount)}</Text>
          <View style={styles.donationMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="document-text-outline" size={13} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.reference}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              item.status === 'completed' ? styles.statusCompleted : styles.statusPending
            ]}>
              <Ionicons
                name={item.status === 'completed' ? 'checkmark-circle' : 'time'}
                size={10}
                color={item.status === 'completed' ? '#16a34a' : '#d97706'}
              />
              <Text style={[
                styles.statusText,
                item.status === 'completed' ? styles.statusTextCompleted : styles.statusTextPending
              ]}>
                {item.status === 'completed' ? 'Reçu' : 'En cours'}
              </Text>
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

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="gift-outline" size={40} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>Aucun don</Text>
      <Text style={styles.emptyText}>
        Vous n'avez pas encore effectué de don. Contribuez à l'œuvre de Dieu.
      </Text>
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
          <Text style={styles.headerTitle}>Mes Dons</Text>
          <Text style={styles.headerSubtitle}>{mockDonations.length} dons effectués</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.addGradient}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statCardMain}
          >
            <View style={styles.statIconWrap}>
              <Ionicons name="wallet-outline" size={24} color="rgba(255,255,255,0.9)" />
            </View>
            <Text style={styles.statLabel}>Total des dons</Text>
            <Text style={styles.statValue}>{formatAmount(totalDonations)}</Text>
            <View style={styles.statAccent} />
          </LinearGradient>

          <View style={styles.statCardSecondary}>
            <View style={styles.statIconWrapSecondary}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statLabelSecondary}>Ce mois</Text>
            <Text style={styles.statValueSecondary}>{formatAmount(thisMonthDonations)}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Faire un don</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          {Object.entries(donationTypes).map(([key, config], index) => {
            const colorScheme = getDonationColorScheme(index);
            return (
              <TouchableOpacity
                key={key}
                style={styles.quickActionButton}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colorScheme.gradient}
                  style={styles.quickActionIcon}
                >
                  <Ionicons name={config.icon} size={22} color="#fff" />
                </LinearGradient>
                <Text style={styles.quickActionLabel}>{config.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Methods */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Méthodes de paiement</Text>
          </View>
        </View>

        <View style={styles.paymentMethods}>
          <TouchableOpacity style={styles.paymentMethod} activeOpacity={0.7}>
            <LinearGradient
              colors={['#d97706', '#b45309']}
              style={styles.paymentIcon}
            >
              <Ionicons name="phone-portrait" size={18} color="#fff" />
            </LinearGradient>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Mobile Money</Text>
              <Text style={styles.paymentSubtitle}>Orange, Moov, Coris</Text>
            </View>
            <View style={styles.arrowWrapSmall}>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethod} activeOpacity={0.7}>
            <LinearGradient
              colors={['#030a7f', '#020866']}
              style={styles.paymentIcon}
            >
              <Ionicons name="card" size={18} color="#fff" />
            </LinearGradient>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Carte bancaire</Text>
              <Text style={styles.paymentSubtitle}>Visa, Mastercard</Text>
            </View>
            <View style={styles.arrowWrapSmall}>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentMethod} activeOpacity={0.7}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={styles.paymentIcon}
            >
              <Ionicons name="business" size={18} color="#fff" />
            </LinearGradient>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>Virement bancaire</Text>
              <Text style={styles.paymentSubtitle}>Coordonnées bancaires</Text>
            </View>
            <View style={styles.arrowWrapSmall}>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Donation History */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Historique</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {mockDonations.length > 0 ? (
          mockDonations.map((donation, index) => renderDonation(donation, index))
        ) : (
          <EmptyState />
        )}
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  addGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCardMain: {
    flex: 2,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  statAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [{ translateX: 20 }, { translateY: 20 }],
  },
  statCardSecondary: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconWrapSecondary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statLabelSecondary: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  statValueSecondary: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
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
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  // Payment Methods
  paymentMethods: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  paymentMethod: {
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
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  paymentSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
  arrowWrapSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Donation Card
  donationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
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
  donationContent: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  donationCategoryBadge: {
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
  donationCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  donationAmount: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  donationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  statusCompleted: {
    backgroundColor: '#dcfce7',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 10,
    fontFamily: fontFamily.semibold,
  },
  statusTextCompleted: {
    color: '#16a34a',
  },
  statusTextPending: {
    color: '#d97706',
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
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxxl,
    paddingHorizontal: spacing.xl,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
