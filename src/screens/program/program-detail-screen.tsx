import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, shadows } from '../../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ProgramDetail'>;

const DAYS_FULL = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Couleurs par catégorie
const categoryColors: Record<string, { gradient: [string, string]; light: string; icon: string }> = {
  culte: { gradient: ['#dc2626', '#b91c1c'], light: '#fee2e2', icon: 'people' },
  reunion: { gradient: ['#2563eb', '#1d4ed8'], light: '#dbeafe', icon: 'business' },
  jeune: { gradient: ['#16a34a', '#15803d'], light: '#dcfce7', icon: 'leaf' },
  priere: { gradient: ['#9333ea', '#7c3aed'], light: '#f3e8ff', icon: 'hand-left' },
  etude: { gradient: ['#ea580c', '#c2410c'], light: '#ffedd5', icon: 'book' },
  chorale: { gradient: ['#0891b2', '#0e7490'], light: '#cffafe', icon: 'musical-notes' },
  autre: { gradient: ['#030a7f', '#020866'], light: '#eef0ff', icon: 'calendar' },
};

const getCategoryStyle = (category: string) => {
  return categoryColors[category] || categoryColors.autre;
};

export function ProgramDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { activity } = route.params;
  const activityDate = new Date(activity.date);
  const categoryStyle = getCategoryStyle(activity.category);

  const formatFullDate = (date: Date) => {
    const dayName = DAYS_FULL[date.getDay()];
    const dayNumber = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName} ${dayNumber} ${month} ${year}`;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      culte: 'Culte',
      reunion: 'Réunion',
      jeune: 'Jeûne',
      priere: 'Prière',
      etude: 'Étude biblique',
      chorale: 'Chorale',
      autre: 'Autre',
    };
    return labels[category] || category;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: activity.title,
        message: `${activity.title}\n\n📅 ${formatFullDate(activityDate)}\n⏰ ${activity.startTime}${activity.endTime ? ` - ${activity.endTime}` : ''}\n📍 ${activity.location || 'EE/SIM Zogona'}\n\n— EE/SIM Zogona`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openMaps = () => {
    if (activity.location) {
      const url = `https://maps.google.com/?q=${encodeURIComponent(activity.location)}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={categoryStyle.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + spacing.md }]}
      >
        {/* Navigation */}
        <View style={styles.headerNav}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Activity Info */}
        <View style={styles.activityInfo}>
          <View style={styles.iconBadge}>
            <Ionicons name={categoryStyle.icon as any} size={32} color="#fff" />
          </View>
          <Text style={styles.title} numberOfLines={2}>{activity.title}</Text>

          {/* Badges */}
          <View style={styles.badgesRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{getCategoryLabel(activity.category)}</Text>
            </View>
            {activity.isOnline && (
              <View style={styles.onlineBadge}>
                <Ionicons name="videocam" size={12} color="#fff" />
                <Text style={styles.onlineText}>En ligne</Text>
              </View>
            )}
            {activity.isImportant && (
              <View style={styles.importantBadge}>
                <Ionicons name="star" size={12} color="#fbbf24" />
                <Text style={styles.importantText}>Important</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Cards */}
        <View style={styles.infoCard}>
          {/* Date */}
          <View style={styles.infoRow}>
            <LinearGradient
              colors={categoryStyle.gradient}
              style={styles.infoIconWrap}
            >
              <Ionicons name="calendar" size={20} color="#fff" />
            </LinearGradient>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{formatFullDate(activityDate)}</Text>
            </View>
          </View>

          <View style={styles.infoDivider} />

          {/* Time */}
          <View style={styles.infoRow}>
            <LinearGradient
              colors={['#16a34a', '#15803d']}
              style={styles.infoIconWrap}
            >
              <Ionicons name="time" size={20} color="#fff" />
            </LinearGradient>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Horaires</Text>
              <Text style={styles.infoValue}>
                {activity.startTime}
                {activity.endTime ? ` - ${activity.endTime}` : ''}
              </Text>
            </View>
          </View>

          {/* Location */}
          {activity.location && (
            <>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <LinearGradient
                  colors={['#2563eb', '#1d4ed8']}
                  style={styles.infoIconWrap}
                >
                  <Ionicons name="location" size={20} color="#fff" />
                </LinearGradient>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Lieu</Text>
                  <Text style={styles.infoValue}>{activity.location}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Description Card */}
        {activity.description && (
          <View style={styles.descriptionCard}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={categoryStyle.gradient}
                style={styles.sectionIndicator}
              />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.descriptionText}>{activity.description}</Text>
          </View>
        )}

        {/* Actions Grid */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <LinearGradient
              colors={['#9333ea', '#7c3aed']}
              style={styles.actionIconWrap}
            >
              <Ionicons name="notifications" size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionLabel}>Rappel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <LinearGradient
              colors={['#16a34a', '#15803d']}
              style={styles.actionIconWrap}
            >
              <Ionicons name="calendar" size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionLabel}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2563eb', '#1d4ed8']}
              style={styles.actionIconWrap}
            >
              <Ionicons name="share-social" size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionLabel}>Partager</Text>
          </TouchableOpacity>

          {activity.isOnline ? (
            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                style={styles.actionIconWrap}
              >
                <Ionicons name="videocam" size={22} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionLabel}>Rejoindre</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionCard}
              onPress={openMaps}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ea580c', '#c2410c']}
                style={styles.actionIconWrap}
              >
                <Ionicons name="navigate" size={22} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionLabel}>Itinéraire</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Map Card */}
        {activity.location && !activity.isOnline && (
          <TouchableOpacity
            style={styles.mapCard}
            onPress={openMaps}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#2563eb', '#1d4ed8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mapGradient}
            >
              <View style={styles.mapContent}>
                <View style={styles.mapIconWrap}>
                  <Ionicons name="map" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={styles.mapTitle}>Voir sur la carte</Text>
                  <Text style={styles.mapSubtitle}>{activity.location}</Text>
                </View>
              </View>
              <Ionicons name="open-outline" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Activity Info
  activityInfo: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  onlineText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#fff',
  },
  importantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(251,191,36,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  importantText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: '#fbbf24',
  },

  // Content
  scrollView: {
    flex: 1,
    marginTop: -spacing.lg,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 100,
  },

  // Info Card
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
    marginLeft: 56,
  },

  // Description Card
  descriptionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  descriptionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 26,
  },

  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  actionCard: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  actionLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },

  // Map Card
  mapCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  mapGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  mapContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  mapIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  mapSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.8)',
  },
});
