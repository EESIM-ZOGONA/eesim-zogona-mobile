import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface SocialMediaScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SocialMedia'>;
}

interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: [string, string];
  followers?: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 'website',
    name: 'Site Web',
    handle: 'eesimzogona.org',
    url: 'https://eesimzogona.org',
    icon: 'globe-outline',
    gradient: ['#030a7f', '#020866'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@EgliseEvangeliqueSIMZogona',
    url: 'https://youtube.com/@EgliseEvangeliqueSIMZogona',
    icon: 'logo-youtube',
    gradient: ['#ff0000', '#cc0000'],
    followers: '2.5K',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'EE SIM Zogona',
    url: 'https://facebook.com/eesimzogona',
    icon: 'logo-facebook',
    gradient: ['#1877f2', '#0d65d9'],
    followers: '5.2K',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@eesimzogona',
    url: 'https://instagram.com/eesimzogona',
    icon: 'logo-instagram',
    gradient: ['#e4405f', '#c13584'],
    followers: '1.8K',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@eesimzogona',
    url: 'https://tiktok.com/@eesimzogona',
    icon: 'logo-tiktok',
    gradient: ['#000000', '#333333'],
    followers: '850',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: 'Groupe de prière',
    url: 'https://chat.whatsapp.com/invite-link',
    icon: 'logo-whatsapp',
    gradient: ['#25d366', '#128c7e'],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    handle: 'Canal EE SIM Zogona',
    url: 'https://t.me/eesimzogona',
    icon: 'paper-plane',
    gradient: ['#0088cc', '#006699'],
  },
];

const quickActions = [
  {
    id: 'share',
    icon: 'share-social' as const,
    label: 'Partager l\'app',
    color: '#059669',
  },
  {
    id: 'invite',
    icon: 'person-add' as const,
    label: 'Inviter un ami',
    color: '#7c3aed',
  },
  {
    id: 'contact',
    icon: 'mail' as const,
    label: 'Nous contacter',
    color: '#d97706',
  },
];

export function SocialMediaScreen({ navigation }: SocialMediaScreenProps) {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Error opening link:', err);
    });
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: 'Téléchargez l\'application EE/SIM Zogona pour rester connecté avec notre église ! 🙏\n\nhttps://eesimzogona.org/app',
        title: 'EE/SIM Zogona',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'share':
        shareApp();
        break;
      case 'invite':
        shareApp();
        break;
      case 'contact':
        openLink('mailto:contact@eesimzogona.org');
        break;
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
          <Text style={styles.headerTitle}>Nos Médias</Text>
          <Text style={styles.headerSubtitle}>Restez connectés</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={shareApp}>
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
        {/* Hero Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroIconWrap}>
            <Ionicons name="globe" size={32} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Suivez-nous partout</Text>
          <Text style={styles.heroSubtitle}>
            Retrouvez nos prédications, actualités et moments de partage sur toutes nos plateformes
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>10K+</Text>
              <Text style={styles.heroStatLabel}>Communauté</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>7</Text>
              <Text style={styles.heroStatLabel}>Plateformes</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>500+</Text>
              <Text style={styles.heroStatLabel}>Vidéos</Text>
            </View>
          </View>
          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Links */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Nos réseaux</Text>
          </View>
        </View>

        {socialLinks.map((social, index) => (
          <TouchableOpacity
            key={social.id}
            style={styles.socialCard}
            onPress={() => openLink(social.url)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={social.gradient}
              style={styles.socialIcon}
            >
              <Ionicons name={social.icon} size={24} color="#fff" />
            </LinearGradient>
            <View style={styles.socialInfo}>
              <Text style={styles.socialName}>{social.name}</Text>
              <Text style={styles.socialHandle}>{social.handle}</Text>
            </View>
            {social.followers && (
              <View style={styles.followersBadge}>
                <Ionicons name="people" size={12} color={colors.primary} />
                <Text style={styles.followersText}>{social.followers}</Text>
              </View>
            )}
            <View style={styles.arrowWrap}>
              <Ionicons name="open-outline" size={18} color={colors.primary} />
            </View>
          </TouchableOpacity>
        ))}

        {/* App Promotion */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Partagez l'app</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.promoCard} onPress={shareApp} activeOpacity={0.9}>
          <LinearGradient
            colors={['#059669', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.promoGradient}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoIconWrap}>
                <Ionicons name="heart" size={24} color="#fff" />
              </View>
              <View style={styles.promoText}>
                <Text style={styles.promoTitle}>Invitez vos proches</Text>
                <Text style={styles.promoSubtitle}>
                  Partagez cette application avec votre famille et vos amis
                </Text>
              </View>
            </View>
            <View style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Partager</Text>
              <Ionicons name="arrow-forward" size={16} color="#059669" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Église Évangélique SIM de Zogona
          </Text>
          <Text style={styles.footerSubtext}>
            Ensemble, grandissons dans la foi
          </Text>
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
  // Hero Card
  heroCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  heroIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  heroStatLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
    textAlign: 'center',
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
  // Social Card
  socialCard: {
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
  socialIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialInfo: {
    flex: 1,
  },
  socialName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  socialHandle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
  followersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  followersText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
  arrowWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Promo Card
  promoCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  promoGradient: {
    padding: spacing.lg,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  promoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  promoSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  promoButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#059669',
  },
  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  footerSubtext: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
    marginTop: 2,
  },
});
