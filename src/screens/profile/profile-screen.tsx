import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, MainTabParamList } from '../../types';
import { Avatar } from '../../components';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'ProfileTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  iconBg?: string;
  iconColor?: string;
  danger?: boolean;
  badge?: string;
}

const MenuItem = ({ icon, title, subtitle, onPress, iconBg, iconColor, danger, badge }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.menuIcon, { backgroundColor: danger ? '#fee2e2' : iconBg || colors.primaryLight }]}>
      <Ionicons name={icon as any} size={20} color={danger ? '#dc2626' : iconColor || colors.primary} />
    </View>
    <View style={styles.menuContent}>
      <Text style={[styles.menuTitle, danger && styles.menuTitleDanger]}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    {badge && (
      <View style={styles.menuBadge}>
        <Text style={styles.menuBadgeText}>{badge}</Text>
      </View>
    )}
    {!danger && <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />}
  </TouchableOpacity>
);

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.guestContainer}>
          <LinearGradient
            colors={[colors.primaryLight, '#fff']}
            style={styles.guestGradient}
          >
            <View style={styles.guestLogoWrap}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.guestLogo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.guestTitle}>Rejoignez-nous</Text>
            <Text style={styles.guestSubtitle}>
              Connectez-vous pour acceder a toutes les fonctionnalites de l'application
            </Text>

            <View style={styles.guestFeatures}>
              <View style={styles.guestFeature}>
                <View style={[styles.featureIcon, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="heart" size={18} color="#2563eb" />
                </View>
                <Text style={styles.featureText}>Sauvegarder vos favoris</Text>
              </View>
              <View style={styles.guestFeature}>
                <View style={[styles.featureIcon, { backgroundColor: '#dcfce7' }]}>
                  <Ionicons name="notifications" size={18} color="#16a34a" />
                </View>
                <Text style={styles.featureText}>Recevoir des notifications</Text>
              </View>
              <View style={styles.guestFeature}>
                <View style={[styles.featureIcon, { backgroundColor: '#fef3c7' }]}>
                  <Ionicons name="calendar" size={18} color="#d97706" />
                </View>
                <Text style={styles.featureText}>Gerer vos inscriptions</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginGradient}
              >
                <Text style={styles.loginButtonText}>Se connecter</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header simple */}
      <View style={styles.header}>
        <View style={styles.placeholder} />
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Avatar
              source={user?.avatar}
              name={user?.name}
              size={80}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.phone}>{user?.phone}</Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.8}
          >
            <Ionicons name="pencil" size={14} color={colors.primary} />
            <Text style={styles.editProfileText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="heart" size={18} color="#2563eb" />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="calendar" size={18} color="#16a34a" />
            </View>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Evenements</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="gift" size={18} color="#d97706" />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Dons</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Compte</Text>
          </View>
          <View style={styles.menuCard}>
            <MenuItem
              icon="person-outline"
              title="Informations personnelles"
              onPress={() => navigation.navigate('EditProfile')}
              iconBg="#dbeafe"
              iconColor="#2563eb"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Gerer vos preferences"
              onPress={() => navigation.navigate('Notifications')}
              iconBg="#fef3c7"
              iconColor="#d97706"
              badge="3"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="heart-outline"
              title="Mes favoris"
              subtitle="Cantiques et videos sauvegardes"
              onPress={() => navigation.navigate('MyFavorites')}
              iconBg="#fce7f3"
              iconColor="#db2777"
            />
          </View>
        </View>

        {/* Church Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Eglise</Text>
          </View>
          <View style={styles.menuCard}>
            <MenuItem
              icon="people-outline"
              title="Ma cellule"
              subtitle="Groupe de maison"
              onPress={() => navigation.navigate('MyCell')}
              iconBg="#dcfce7"
              iconColor="#16a34a"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="gift-outline"
              title="Mes dons"
              subtitle="Historique des contributions"
              onPress={() => navigation.navigate('MyDonations')}
              iconBg="#ede9fe"
              iconColor="#7c3aed"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="calendar-outline"
              title="Mes evenements"
              subtitle="Inscriptions et rappels"
              onPress={() => navigation.navigate('MyEvents')}
              iconBg="#dbeafe"
              iconColor="#2563eb"
            />
          </View>
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Application</Text>
          </View>
          <View style={styles.menuCard}>
            <MenuItem
              icon="globe-outline"
              title="Nos médias"
              subtitle="Réseaux sociaux et liens"
              onPress={() => navigation.navigate('SocialMedia')}
              iconBg="#dbeafe"
              iconColor="#2563eb"
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="settings-outline"
              title="Parametres"
              onPress={() => navigation.navigate('Settings')}
              iconBg={colors.background}
              iconColor={colors.text.secondary}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="help-circle-outline"
              title="Aide et support"
              onPress={() => navigation.navigate('HelpSupport')}
              iconBg={colors.background}
              iconColor={colors.text.secondary}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="information-circle-outline"
              title="A propos"
              onPress={() => navigation.navigate('About')}
              iconBg={colors.background}
              iconColor={colors.text.secondary}
            />
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.menuCard}>
            <MenuItem
              icon="log-out-outline"
              title="Deconnexion"
              onPress={handleLogout}
              danger
            />
          </View>
        </View>

        {/* Version */}
        <View style={styles.versionWrap}>
          <Text style={styles.versionText}>EE/SIM Zogona</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
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
  // Header simple
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Profile Card
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  name: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  phone: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  editProfileText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
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
    width: 40,
    height: 40,
    borderRadius: 12,
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
  // Section
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Menu Card
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  menuTitleDanger: {
    color: '#dc2626',
  },
  menuSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
  menuBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  menuBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 68,
  },
  // Version
  versionWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  version: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  // Guest
  guestContainer: {
    flex: 1,
  },
  guestGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  guestLogoWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  guestLogo: {
    width: 60,
    height: 60,
  },
  guestTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  guestSubtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  guestFeatures: {
    width: '100%',
    marginBottom: spacing.xxl,
  },
  guestFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },
  loginButton: {
    width: '100%',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  loginGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  loginButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
});
