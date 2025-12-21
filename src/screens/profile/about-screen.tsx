import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface AboutScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'About'>;
}

const socialLinks = [
  { id: 'facebook', icon: 'logo-facebook' as const, color: '#1877f2', url: 'https://facebook.com' },
  { id: 'youtube', icon: 'logo-youtube' as const, color: '#ff0000', url: 'https://youtube.com/@EgliseEvangeliqueSIMZogona' },
  { id: 'instagram', icon: 'logo-instagram' as const, color: '#e4405f', url: 'https://instagram.com' },
  { id: 'whatsapp', icon: 'logo-whatsapp' as const, color: '#25d366', url: 'https://wa.me/22670000000' },
];

export function AboutScreen({ navigation }: AboutScreenProps) {
  const openLink = (url: string) => {
    Linking.openURL(url);
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
          <Text style={styles.headerTitle}>À propos</Text>
          <Text style={styles.headerSubtitle}>EE/SIM Zogona</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo & Church Info Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.churchCard}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.churchName}>EE/SIM Zogona</Text>
          <Text style={styles.churchFullName}>
            Église Évangélique SIM de Zogona
          </Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
          <View style={styles.cardAccent} />
        </LinearGradient>

        {/* About Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Notre Église</Text>
          </View>
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            L'Église Évangélique SIM de Zogona est une communauté chrétienne
            basée à Ouagadougou, Burkina Faso. Fondée sur les principes de
            l'Évangile, notre église s'engage à proclamer la Bonne Nouvelle
            et à servir notre communauté.
          </Text>
          <Text style={styles.aboutText}>
            Notre mission est d'amener les gens à connaître Jésus-Christ et
            à grandir dans leur foi à travers l'enseignement biblique, la
            communion fraternelle et le service.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Contact</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('tel:+22670000000')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#059669', '#047857']}
            style={styles.contactIcon}
          >
            <Ionicons name="call" size={20} color="#fff" />
          </LinearGradient>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Téléphone</Text>
            <Text style={styles.contactValue}>+226 70 00 00 00</Text>
          </View>
          <View style={styles.arrowWrap}>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('mailto:contact@eesimzogona.org')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#030a7f', '#020866']}
            style={styles.contactIcon}
          >
            <Ionicons name="mail" size={20} color="#fff" />
          </LinearGradient>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>contact@eesimzogona.org</Text>
          </View>
          <View style={styles.arrowWrap}>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('https://maps.google.com')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#d97706', '#b45309']}
            style={styles.contactIcon}
          >
            <Ionicons name="location" size={20} color="#fff" />
          </LinearGradient>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Adresse</Text>
            <Text style={styles.contactValue}>Zogona, Ouagadougou, Burkina Faso</Text>
          </View>
          <View style={styles.arrowWrap}>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Social Media */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Réseaux sociaux</Text>
          </View>
        </View>

        <View style={styles.socialRow}>
          {socialLinks.map((social) => (
            <TouchableOpacity
              key={social.id}
              style={styles.socialButton}
              onPress={() => openLink(social.url)}
              activeOpacity={0.8}
            >
              <View style={[styles.socialIconWrap, { backgroundColor: `${social.color}15` }]}>
                <Ionicons name={social.icon} size={26} color={social.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Credits */}
        <View style={styles.credits}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.creditsBadge}
          >
            <Ionicons name="heart" size={14} color="#fff" />
            <Text style={styles.creditsText}>
              Développé avec amour pour EE/SIM Zogona
            </Text>
          </LinearGradient>
          <Text style={styles.copyrightText}>
            © 2024 EE/SIM Zogona. Tous droits réservés.
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
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Church Card
  churchCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 60,
    height: 60,
  },
  churchName: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  churchFullName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  versionBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  versionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#fff',
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
  // About Card
  aboutCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
  // Contact Card
  contactCard: {
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
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  contactValue: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginTop: 2,
  },
  arrowWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Social Row
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  socialButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  // Credits
  credits: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  creditsText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#fff',
  },
  copyrightText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
});
