import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Linking,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { RootStackParamList, MainTabParamList } from '../../types';
import { Skeleton, VideoCardSkeleton } from '../../components';
import { colors, spacing, fontSize, fontFamily, borderRadius, shadows } from '../../constants/theme';
import { api, VideoData, PlaylistData } from '../../services';

const { width, height } = Dimensions.get('window');

type TVScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'TVTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface TVScreenProps {
  navigation: TVScreenNavigationProp;
}

// Couleurs par catégorie de playlist
const playlistColors: Record<string, { gradient: [string, string]; accent: string }> = {
  culte: { gradient: ['#dc2626', '#991b1b'], accent: '#dc2626' },
  jeune: { gradient: ['#16a34a', '#15803d'], accent: '#16a34a' },
  priere: { gradient: ['#2563eb', '#1d4ed8'], accent: '#2563eb' },
  louange: { gradient: ['#9333ea', '#7c3aed'], accent: '#9333ea' },
  enseignement: { gradient: ['#ea580c', '#c2410c'], accent: '#ea580c' },
  default: { gradient: ['#030a7f', '#020866'], accent: '#030a7f' },
};

const getPlaylistColors = (category: string | null) => {
  if (!category) return playlistColors.default;
  const key = category.toLowerCase();
  return playlistColors[key] || playlistColors.default;
};

export function TVScreen({ navigation }: TVScreenProps) {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [allVideos, setAllVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadData();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (allVideos.length > 0) {
      timerRef.current = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % Math.min(5, allVideos.length));
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [allVideos.length]);

  const loadData = async () => {
    try {
      const [playlistsRes, videosRes] = await Promise.all([
        api.getPlaylists(),
        api.getVideos({ per_page: 20, sort: 'recent' }),
      ]);
      setPlaylists(playlistsRes.data);
      setAllVideos(videosRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = (video: VideoData, playlistId?: string) => {
    navigation.navigate('VideoPlayer', {
      video: {
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        thumbnailHigh: video.thumbnailHigh,
        url: video.url,
        durationFormatted: video.durationFormatted,
        totalViews: video.totalViews,
        likes: video.likes,
        publishedAt: video.publishedAt,
        category: video.category,
      },
      playlistId,
    });
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`;
    if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
    return `Il y a ${Math.floor(diffDays / 365)} an(s)`;
  };

  const openYouTube = () => {
    Linking.openURL('https://youtube.com/@eesimzogona');
  };

  const featuredVideos = allVideos.slice(0, 5);
  const featuredVideo = featuredVideos[featuredIndex];

  const filteredVideos = searchQuery.trim()
    ? allVideos.filter(
        (v) =>
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filters = [
    { id: 'all', label: 'Tout', icon: 'grid-outline' as const },
    { id: 'recent', label: 'Récents', icon: 'time-outline' as const },
    { id: 'popular', label: 'Populaires', icon: 'flame-outline' as const },
  ];

  // Hero Section avec le design moderne
  const renderHero = () => {
    if (!featuredVideo) return null;

    return (
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: featuredVideo.thumbnailHigh || featuredVideo.thumbnail }}
          style={styles.heroImage}
          resizeMode="cover"
        >
          {/* Multi-layer gradient */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', '#000']}
            locations={[0, 0.4, 0.7, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Header avec blur */}
          <View style={styles.heroHeader}>
            <BlurView intensity={30} tint="dark" style={styles.heroHeaderBlur}>
              <LinearGradient
                colors={['#dc2626', '#991b1b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.liveBadge}
              >
                <View style={styles.liveIndicator} />
                <Text style={styles.liveBadgeText}>EE/SIM TV</Text>
              </LinearGradient>
            </BlurView>
            <TouchableOpacity style={styles.youtubeHeaderButton} onPress={openYouTube}>
              <BlurView intensity={30} tint="dark" style={styles.youtubeButtonBlur}>
                <Ionicons name="logo-youtube" size={22} color="#FF0000" />
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* Contenu Hero */}
          <View style={styles.heroContent}>
            {/* Badges */}
            <View style={styles.heroBadges}>
              {featuredVideo.category && (
                <LinearGradient
                  colors={getPlaylistColors(featuredVideo.category).gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.categoryBadge}
                >
                  <Text style={styles.categoryBadgeText}>
                    {featuredVideo.category.toUpperCase()}
                  </Text>
                </LinearGradient>
              )}
              <View style={styles.durationBadge}>
                <Ionicons name="time-outline" size={12} color="#fff" />
                <Text style={styles.durationBadgeText}>{featuredVideo.durationFormatted}</Text>
              </View>
            </View>

            {/* Titre */}
            <Text style={styles.heroTitle} numberOfLines={2}>
              {featuredVideo.title}
            </Text>

            {/* Stats */}
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Ionicons name="eye-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>{formatViews(featuredVideo.totalViews)} vues</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Ionicons name="heart-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>{featuredVideo.likes} likes</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Ionicons name="calendar-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>{formatDate(featuredVideo.publishedAt)}</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handleVideoPress(featuredVideo)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.playButtonGradient}
                >
                  <Ionicons name="play" size={22} color="#fff" />
                  <Text style={styles.playButtonText}>Regarder</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreInfoButton} activeOpacity={0.8}>
                <BlurView intensity={40} tint="dark" style={styles.moreInfoBlur}>
                  <Ionicons name="information-circle-outline" size={20} color="#fff" />
                  <Text style={styles.moreInfoText}>Plus d'infos</Text>
                </BlurView>
              </TouchableOpacity>
            </View>
          </View>

          {/* Thumbnails navigation */}
          <View style={styles.thumbnailsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailsScroll}
            >
              {featuredVideos.map((video, index) => (
                <TouchableOpacity
                  key={video.id}
                  onPress={() => setFeaturedIndex(index)}
                  style={[
                    styles.thumbnailItem,
                    index === featuredIndex && styles.thumbnailItemActive,
                  ]}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: video.thumbnail }} style={styles.thumbnailImage} />
                  {index === featuredIndex && (
                    <LinearGradient
                      colors={['#dc2626', '#b91c1c']}
                      style={styles.thumbnailActiveIndicator}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  };

  // Section de recherche avec filtres
  const renderSearchSection = () => (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconWrap}>
          <Ionicons name="search" size={18} color={colors.primary} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une vidéo..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.text.tertiary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {!searchQuery.trim() && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveFilter(filter.id)}
              activeOpacity={0.8}
            >
              {activeFilter === filter.id ? (
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterChipActive}
                >
                  <Ionicons name={filter.icon} size={16} color="#fff" />
                  <Text style={styles.filterChipTextActive}>{filter.label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterChip}>
                  <Ionicons name={filter.icon} size={16} color={colors.text.secondary} />
                  <Text style={styles.filterChipText}>{filter.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );

  // Carte vidéo améliorée
  const renderVideoCard = (video: VideoData, index: number, playlistId?: string, isLarge?: boolean) => {
    const cardStyle = isLarge ? styles.videoCardLarge : styles.videoCard;
    const imageStyle = isLarge ? styles.videoImageLarge : styles.videoImageRegular;

    return (
      <TouchableOpacity
        key={video.id}
        style={cardStyle}
        onPress={() => handleVideoPress(video, playlistId)}
        activeOpacity={0.9}
      >
        <View style={styles.videoThumbnailContainer}>
          <Image
            source={{ uri: isLarge ? (video.thumbnailHigh || video.thumbnail) : video.thumbnail }}
            style={imageStyle}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.videoGradient}
          />

          {/* Play button overlay */}
          <View style={styles.videoPlayOverlay}>
            <View style={styles.videoPlayButton}>
              <Ionicons name="play" size={isLarge ? 24 : 18} color="#fff" />
            </View>
          </View>

          {/* Duration badge */}
          <View style={styles.videoDurationBadge}>
            <Text style={styles.videoDurationText}>{video.durationFormatted}</Text>
          </View>

          {/* Ranking badge for popular videos */}
          {index < 3 && !playlistId && (
            <LinearGradient
              colors={
                index === 0
                  ? ['#fbbf24', '#d97706']
                  : index === 1
                  ? ['#9ca3af', '#6b7280']
                  : ['#d97706', '#b45309']
              }
              style={styles.rankingBadge}
            >
              <Text style={styles.rankingText}>#{index + 1}</Text>
            </LinearGradient>
          )}
        </View>

        <View style={styles.videoInfo}>
          <Text style={[styles.videoTitle, isLarge && styles.videoTitleLarge]} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.videoMeta}>
            <Text style={styles.videoMetaText}>
              {formatViews(video.totalViews)} vues
            </Text>
            <View style={styles.videoMetaDot} />
            <Text style={styles.videoMetaText}>
              {formatDate(video.publishedAt)}
            </Text>
          </View>
          {video.likes > 0 && (
            <View style={styles.videoLikes}>
              <Ionicons name="heart" size={12} color="#dc2626" />
              <Text style={styles.videoLikesText}>{video.likes}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Section Playlist améliorée
  const renderPlaylistSection = (playlist: PlaylistData, index: number) => {
    const playlistColor = getPlaylistColors(playlist.category);

    return (
      <View key={playlist.id} style={styles.playlistSection}>
        <View style={styles.playlistHeader}>
          <View style={styles.playlistTitleRow}>
            <LinearGradient
              colors={playlistColor.gradient}
              style={styles.playlistIndicator}
            />
            <View style={styles.playlistTitleContainer}>
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
              <Text style={styles.playlistCount}>{playlist.videoCount} vidéos</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.playlistSeeAll}>
            <Text style={[styles.playlistSeeAllText, { color: playlistColor.accent }]}>
              Voir tout
            </Text>
            <Ionicons name="chevron-forward" size={16} color={playlistColor.accent} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.playlistVideos}
        >
          {playlist.videos.slice(0, 6).map((video, vidIndex) =>
            renderVideoCard(video, vidIndex, playlist.id, vidIndex === 0)
          )}
        </ScrollView>
      </View>
    );
  };

  // Section vidéos récentes
  const renderRecentSection = () => (
    <View style={styles.recentSection}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <LinearGradient
            colors={['#dc2626', '#b91c1c']}
            style={styles.sectionIndicator}
          />
          <Text style={styles.sectionTitle}>Vidéos récentes</Text>
        </View>
        <View style={styles.sectionLine} />
      </View>

      <View style={styles.videosGrid}>
        {allVideos.slice(0, 8).map((video, index) => renderVideoCard(video, index))}
      </View>
    </View>
  );

  // Résultats de recherche
  const renderSearchResults = () => (
    <View style={styles.searchResultsContainer}>
      <View style={styles.searchResultsHeader}>
        <Text style={styles.searchResultsTitle}>
          Résultats pour "{searchQuery}"
        </Text>
        <Text style={styles.searchResultsCount}>
          {filteredVideos.length} vidéo{filteredVideos.length > 1 ? 's' : ''}
        </Text>
      </View>

      {filteredVideos.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <View style={styles.noResultsIconWrap}>
            <Ionicons name="search-outline" size={48} color={colors.text.tertiary} />
          </View>
          <Text style={styles.noResultsText}>Aucune vidéo trouvée</Text>
          <Text style={styles.noResultsSubtext}>
            Essayez avec d'autres mots-clés
          </Text>
        </View>
      ) : (
        <View style={styles.searchResultsGrid}>
          {filteredVideos.map((video, index) => renderVideoCard(video, index))}
        </View>
      )}
    </View>
  );

  // CTA YouTube
  const renderYouTubeCTA = () => (
    <TouchableOpacity style={styles.youtubeCTA} onPress={openYouTube} activeOpacity={0.9}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.youtubeCTAGradient}
      >
        <View style={styles.youtubeCTAContent}>
          <View style={styles.youtubeCTAIcon}>
            <Ionicons name="logo-youtube" size={28} color="#fff" />
          </View>
          <View style={styles.youtubeCTAText}>
            <Text style={styles.youtubeCTATitle}>Suivez-nous sur YouTube</Text>
            <Text style={styles.youtubeCTASubtitle}>@eesimzogona</Text>
          </View>
        </View>
        <View style={styles.youtubeCTAButton}>
          <Text style={styles.youtubeCTAButtonText}>S'abonner</Text>
          <Ionicons name="arrow-forward" size={16} color="#dc2626" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Skeleton loading state
  const renderLoadingSkeleton = () => (
    <SafeAreaView style={styles.skeletonContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Skeleton */}
        <View style={styles.heroSkeleton}>
          <Skeleton height={height * 0.45} borderRadius={0} />
        </View>

        {/* Search Skeleton */}
        <View style={styles.skeletonContent}>
          <View style={styles.searchSkeletonWrap}>
            <Skeleton height={52} borderRadius={borderRadius.full} />
          </View>

          {/* Filter chips skeleton */}
          <View style={styles.filterSkeletonRow}>
            <Skeleton width={70} height={36} borderRadius={borderRadius.full} />
            <Skeleton width={85} height={36} borderRadius={borderRadius.full} />
            <Skeleton width={95} height={36} borderRadius={borderRadius.full} />
          </View>

          {/* Section Title Skeleton */}
          <View style={styles.sectionHeaderSkeleton}>
            <Skeleton width={150} height={24} borderRadius={borderRadius.md} />
          </View>

          {/* Videos Grid Skeleton */}
          <View style={styles.videosGridSkeleton}>
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
          </View>

          {/* Another Section */}
          <View style={styles.sectionHeaderSkeleton}>
            <Skeleton width={120} height={24} borderRadius={borderRadius.md} />
            <Skeleton width={70} height={18} borderRadius={borderRadius.md} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.playlistVideos}>
            <VideoCardSkeleton featured />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  if (loading) {
    return renderLoadingSkeleton();
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        {!searchQuery.trim() && renderHero()}

        {/* Search Section */}
        {renderSearchSection()}

        {/* Content */}
        {searchQuery.trim() ? (
          renderSearchResults()
        ) : (
          <>
            {/* Recent Videos */}
            {renderRecentSection()}

            {/* Playlists */}
            <View style={styles.playlistsContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <LinearGradient
                    colors={['#030a7f', '#020866']}
                    style={styles.sectionIndicator}
                  />
                  <Text style={styles.sectionTitle}>Nos playlists</Text>
                </View>
                <View style={styles.sectionLine} />
              </View>

              {playlists.map((playlist, index) => renderPlaylistSection(playlist, index))}
            </View>

            {/* YouTube CTA */}
            {renderYouTubeCTA()}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Skeleton styles
  skeletonContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skeletonContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    marginTop: -spacing.xxl,
    paddingTop: spacing.xl,
  },
  heroSkeleton: {
    height: height * 0.45,
    backgroundColor: '#1f2937',
  },
  searchSkeletonWrap: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  filterSkeletonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  videosGridSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },

  // Hero
  heroContainer: {
    height: height * 0.55,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxl + spacing.lg,
  },
  heroHeaderBlur: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  liveBadgeText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  youtubeHeaderButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  youtubeButtonBlur: {
    padding: spacing.md,
  },
  heroContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  heroBadges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  categoryBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 1,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  durationBadgeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    lineHeight: 32,
    marginBottom: spacing.md,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroStatText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  heroStatDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: spacing.md,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playButton: {
    flex: 1,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  playButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  moreInfoButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  moreInfoBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  moreInfoText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  thumbnailsContainer: {
    paddingBottom: spacing.lg,
  },
  thumbnailsScroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  thumbnailItem: {
    width: 64,
    height: 36,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    opacity: 0.5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailItemActive: {
    opacity: 1,
    borderColor: '#dc2626',
    transform: [{ scale: 1.1 }],
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },

  // Search
  searchSection: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    marginTop: -spacing.xxl,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    height: 52,
    ...shadows.sm,
  },
  searchIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  clearButton: {
    padding: spacing.xs,
  },
  filtersScroll: {
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  filterChipTextActive: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },

  // Recent Section
  recentSection: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  sectionLine: {
    height: 1,
    backgroundColor: colors.border,
  },
  videosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  // Video Card
  videoCard: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  videoCardLarge: {
    width: width * 0.7,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginRight: spacing.md,
    ...shadows.sm,
  },
  videoThumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
  },
  videoImageRegular: {
    width: '100%',
    height: '100%',
  },
  videoImageLarge: {
    width: '100%',
    height: '100%',
  },
  videoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  videoPlayOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(220,38,38,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  videoDurationBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
  },
  videoDurationText: {
    fontSize: 11,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  rankingBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
  },
  rankingText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  videoInfo: {
    padding: spacing.md,
  },
  videoTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  videoTitleLarge: {
    fontSize: fontSize.md,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoMetaText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  videoMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.text.tertiary,
    marginHorizontal: spacing.xs,
  },
  videoLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  videoLikesText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: '#dc2626',
  },

  // Playlists
  playlistsContainer: {
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  playlistSection: {
    marginBottom: spacing.xxl,
  },
  playlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  playlistTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  playlistIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
  playlistTitleContainer: {
    gap: spacing.xs,
  },
  playlistTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  playlistCount: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  playlistSeeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  playlistSeeAllText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
  },
  playlistVideos: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },

  // Search Results
  searchResultsContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  searchResultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  searchResultsTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  searchResultsCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  searchResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxxl,
  },
  noResultsIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  noResultsText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  noResultsSubtext: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },

  // YouTube CTA
  youtubeCTA: {
    marginHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
  },
  youtubeCTAGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  youtubeCTAContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  youtubeCTAIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youtubeCTAText: {
    gap: spacing.xs,
  },
  youtubeCTATitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  youtubeCTASubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.8)',
  },
  youtubeCTAButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  youtubeCTAButtonText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#dc2626',
  },
});
