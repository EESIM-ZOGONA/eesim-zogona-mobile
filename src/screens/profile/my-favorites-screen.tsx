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
import { RootStackParamList, Hymn } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface MyFavoritesScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyFavorites'>;
}

type FavoriteTab = 'hymns' | 'videos' | 'sermons';

// Mock favorite hymns
const mockFavoriteHymns: Hymn[] = [
  {
    id: '1',
    number: 42,
    title: 'À toi la gloire',
    lyrics: 'À toi la gloire, Ô Ressuscité!\nÀ toi la victoire pour l\'éternité!',
    category: 'louange',
    author: 'Edmond Budry',
  },
  {
    id: '2',
    number: 156,
    title: 'Quel ami fidèle et tendre',
    lyrics: 'Quel ami fidèle et tendre\nNous avons en Jésus-Christ!',
    category: 'communion',
    author: 'Joseph Scriven',
  },
  {
    id: '3',
    number: 89,
    title: 'Oui, Dieu est bon',
    lyrics: 'Oui, Dieu est bon, son amour est sans mesure\nSa grâce abonde en tout temps.',
    category: 'adoration',
  },
];

// Mock favorite videos
const mockFavoriteVideos = [
  {
    id: '1',
    title: 'Culte du 15 décembre 2024',
    thumbnail: '',
    duration: '1:45:32',
    date: '2024-12-15',
    views: 1250,
  },
  {
    id: '2',
    title: 'Prédication - La foi qui déplace les montagnes',
    thumbnail: '',
    duration: '52:18',
    date: '2024-12-08',
    views: 890,
  },
];

// Mock favorite sermons
const mockFavoriteSermons = [
  {
    id: '1',
    title: 'La puissance de la prière',
    preacher: 'Pasteur Ouédraogo',
    date: '2024-12-01',
    duration: '45:00',
  },
  {
    id: '2',
    title: 'Vivre par la foi',
    preacher: 'Pasteur Sawadogo',
    date: '2024-11-24',
    duration: '38:22',
  },
];

const tabs: { key: FavoriteTab; label: string; icon: string }[] = [
  { key: 'hymns', label: 'Cantiques', icon: 'musical-notes' },
  { key: 'videos', label: 'Vidéos', icon: 'videocam' },
  { key: 'sermons', label: 'Prédications', icon: 'mic' },
];

export function MyFavoritesScreen({ navigation }: MyFavoritesScreenProps) {
  const [activeTab, setActiveTab] = useState<FavoriteTab>('hymns');

  const renderHymn = ({ item, index }: { item: Hymn; index: number }) => (
    <TouchableOpacity
      style={styles.hymnCard}
      onPress={() => navigation.navigate('HymnDetail', { hymnId: item.id })}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hymnNumberBadge}
      >
        <Text style={styles.hymnNumberText}>{item.number}</Text>
      </LinearGradient>
      <View style={styles.hymnContent}>
        <Text style={styles.hymnTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.hymnMeta}>
          {item.author && (
            <Text style={styles.hymnAuthor} numberOfLines={1}>{item.author}</Text>
          )}
          <View style={styles.hymnCategoryBadge}>
            <Text style={styles.hymnCategoryText}>{item.category}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <Ionicons name="heart" size={22} color="#dc2626" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderVideo = ({ item, index }: { item: typeof mockFavoriteVideos[0]; index: number }) => (
    <TouchableOpacity style={styles.videoCard} activeOpacity={0.9}>
      <View style={styles.videoThumbWrap}>
        <LinearGradient
          colors={['#dc2626', '#991b1b']}
          style={styles.videoThumbPlaceholder}
        >
          <Ionicons name="play-circle" size={32} color="#fff" />
        </LinearGradient>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.videoContent}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.videoMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="eye-outline" size={12} color={colors.text.tertiary} />
            <Text style={styles.metaText}>{item.views} vues</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color={colors.text.tertiary} />
            <Text style={styles.metaText}>
              {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <Ionicons name="heart" size={22} color="#dc2626" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSermon = ({ item, index }: { item: typeof mockFavoriteSermons[0]; index: number }) => (
    <TouchableOpacity style={styles.sermonCard} activeOpacity={0.9}>
      <View style={styles.sermonIcon}>
        <Ionicons name="mic" size={20} color={colors.primary} />
      </View>
      <View style={styles.sermonContent}>
        <Text style={styles.sermonTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.sermonMeta}>
          <Text style={styles.sermonPreacher}>{item.preacher}</Text>
          <Text style={styles.sermonDot}>•</Text>
          <Text style={styles.sermonDuration}>{item.duration}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <Ionicons name="heart" size={22} color="#dc2626" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const EmptyState = () => {
    const getEmptyConfig = () => {
      switch (activeTab) {
        case 'hymns':
          return { icon: 'musical-notes-outline', text: 'Aucun cantique favori', desc: 'Appuyez sur le cœur pour ajouter des cantiques à vos favoris' };
        case 'videos':
          return { icon: 'videocam-outline', text: 'Aucune vidéo favorite', desc: 'Appuyez sur le cœur pour ajouter des vidéos à vos favoris' };
        case 'sermons':
          return { icon: 'mic-outline', text: 'Aucune prédication favorite', desc: 'Appuyez sur le cœur pour ajouter des prédications à vos favoris' };
      }
    };
    const config = getEmptyConfig();

    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name={config.icon as any} size={48} color={colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>{config.text}</Text>
        <Text style={styles.emptyText}>{config.desc}</Text>
      </View>
    );
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
          <Text style={styles.headerTitle}>Mes Favoris</Text>
          <Text style={styles.headerSubtitle}>
            {activeTab === 'hymns' ? mockFavoriteHymns.length :
             activeTab === 'videos' ? mockFavoriteVideos.length :
             mockFavoriteSermons.length} éléments
          </Text>
        </View>
        <View style={styles.placeholder} />
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
                    <Ionicons name={tab.icon as any} size={16} color="#fff" />
                    <Text style={styles.tabTextActive}>{tab.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.tabChipInner}>
                    <Ionicons name={tab.icon as any} size={16} color={colors.text.secondary} />
                    <Text style={styles.tabText}>{tab.label}</Text>
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
            {activeTab === 'hymns' ? 'Cantiques favoris' :
             activeTab === 'videos' ? 'Vidéos favorites' :
             'Prédications favorites'}
          </Text>
        </View>
      </View>

      {/* Favorites List */}
      {activeTab === 'hymns' && (
        <FlatList
          data={mockFavoriteHymns}
          renderItem={renderHymn}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      )}
      {activeTab === 'videos' && (
        <FlatList
          data={mockFavoriteVideos}
          renderItem={renderVideo}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      )}
      {activeTab === 'sermons' && (
        <FlatList
          data={mockFavoriteSermons}
          renderItem={renderSermon}
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
  placeholder: {
    width: 44,
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
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tabChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
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
  // Hymn Card
  hymnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  hymnNumberBadge: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  hymnNumberText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: '#fff',
  },
  hymnContent: {
    flex: 1,
  },
  hymnTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  hymnMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  hymnAuthor: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    flex: 1,
  },
  hymnCategoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  hymnCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Video Card
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  videoThumbWrap: {
    width: 100,
    height: 70,
    position: 'relative',
  },
  videoThumbPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  durationText: {
    fontSize: 10,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  videoContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  videoTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  videoMeta: {
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
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
  },
  // Sermon Card
  sermonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sermonIcon: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sermonContent: {
    flex: 1,
  },
  sermonTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sermonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sermonPreacher: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  sermonDot: {
    marginHorizontal: spacing.xs,
    color: colors.text.tertiary,
  },
  sermonDuration: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.tertiary,
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
  },
});
