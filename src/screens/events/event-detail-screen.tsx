import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface EventDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;
  route: RouteProp<RootStackParamList, 'EventDetail'>;
}

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.45;

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

export function EventDetailScreen({ navigation, route }: EventDetailScreenProps) {
  const { event } = route.params;

  const parseEventDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const day = parts[0];
    const monthStr = parts[1];
    const year = parts[2] || '2025';
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Fev': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Jun': 5,
      'Jul': 6, 'Aou': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const monthIndex = monthMap[monthStr] ?? 0;
    return { day, monthIndex, year };
  };

  const { day, monthIndex, year } = parseEventDate(event.date);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${event.title}\n\nDate: ${event.date}\nHeure: ${event.time}\nLieu: ${event.location}\n\nEE/SIM Zogona`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hero Image with overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageUrl || 'https://via.placeholder.com/400x300' }}
          style={styles.image}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.7)']}
          locations={[0, 0.3, 1]}
          style={styles.imageGradient}
        />

        {/* Header buttons */}
        <SafeAreaView style={styles.headerOverlay} edges={['top']}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <BlurView intensity={80} tint="dark" style={styles.blurButton}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </BlurView>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <BlurView intensity={80} tint="dark" style={styles.blurButton}>
                <Ionicons name="bookmark-outline" size={22} color="#fff" />
              </BlurView>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
              <BlurView intensity={80} tint="dark" style={styles.blurButton}>
                <Ionicons name="share-outline" size={22} color="#fff" />
              </BlurView>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Date badge floating */}
        <View style={styles.dateBadgeWrap}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeMonth}>{MONTHS_SHORT[monthIndex]}</Text>
            <Text style={styles.dateBadgeDay}>{day}</Text>
            <Text style={styles.dateBadgeYear}>{year}</Text>
          </View>
        </View>

        {/* Bottom content */}
        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <Ionicons name="star" size={12} color="#fbbf24" />
            <Text style={styles.categoryBadgeText}>
              {event.category === 'culte' ? 'CULTE' : event.category === 'jeune' ? 'JEUNESSE' : 'EVENEMENT'}
            </Text>
          </View>
          <Text style={styles.heroTitle} numberOfLines={2}>{event.title}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {/* Quick Info Pills */}
        <View style={styles.quickInfo}>
          <View style={styles.quickInfoItem}>
            <View style={[styles.quickInfoIcon, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="time" size={16} color="#2563eb" />
            </View>
            <Text style={styles.quickInfoText}>{event.time}</Text>
          </View>
          <View style={styles.quickInfoDivider} />
          <View style={styles.quickInfoItem}>
            <View style={[styles.quickInfoIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="location" size={16} color="#16a34a" />
            </View>
            <Text style={styles.quickInfoText} numberOfLines={1}>{event.location.split(',')[0]}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>A propos</Text>
          </View>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIconWrap}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.detailIconGradient}
              >
                <Ionicons name="calendar" size={18} color="#fff" />
              </LinearGradient>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
            </View>
            <TouchableOpacity style={styles.detailAction}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconWrap}>
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.detailIconGradient}
              >
                <Ionicons name="time" size={18} color="#fff" />
              </LinearGradient>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Heure</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>
            <TouchableOpacity style={styles.detailAction}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconWrap}>
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                style={styles.detailIconGradient}
              >
                <Ionicons name="location" size={18} color="#fff" />
              </LinearGradient>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Lieu</Text>
              <Text style={styles.detailValue}>{event.location}</Text>
            </View>
            <TouchableOpacity style={styles.detailAction}>
              <Ionicons name="navigate-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions Grid */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconWrap, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="notifications" size={22} color="#d97706" />
            </View>
            <Text style={styles.actionTitle}>Rappel</Text>
            <Text style={styles.actionSubtitle}>Me notifier</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconWrap, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="calendar" size={22} color="#2563eb" />
            </View>
            <Text style={styles.actionTitle}>Calendrier</Text>
            <Text style={styles.actionSubtitle}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleShare}>
            <View style={[styles.actionIconWrap, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="share-social" size={22} color="#16a34a" />
            </View>
            <Text style={styles.actionTitle}>Partager</Text>
            <Text style={styles.actionSubtitle}>Inviter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer with Register button */}
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerLabel}>Inscription</Text>
            <Text style={styles.footerValue}>Gratuite</Text>
          </View>
          <TouchableOpacity style={styles.registerButton} activeOpacity={0.9}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerGradient}
            >
              <Text style={styles.registerButtonText}>S'inscrire</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Image
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  blurButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dateBadgeWrap: {
    position: 'absolute',
    top: IMAGE_HEIGHT - 50,
    right: spacing.xl,
    zIndex: 10,
  },
  dateBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  dateBadgeMonth: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 1,
  },
  dateBadgeDay: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.extrabold,
    color: colors.primary,
    marginTop: -4,
    marginBottom: -4,
  },
  dateBadgeYear: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 100,
    padding: spacing.xl,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    lineHeight: 32,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  // Scroll
  scrollView: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: 140,
  },
  // Quick Info
  quickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quickInfoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickInfoText: {
    flex: 1,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  quickInfoDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
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
  description: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 26,
  },
  // Details Card
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIconWrap: {
    marginRight: spacing.md,
  },
  detailIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  detailAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
    marginLeft: 60,
  },
  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionCard: {
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
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  actionSubtitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  footerInfo: {
    flex: 1,
  },
  footerLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footerValue: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  registerButton: {
    flex: 2,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  registerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  registerButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
});
