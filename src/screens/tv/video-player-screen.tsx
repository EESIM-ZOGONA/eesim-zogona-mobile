import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  Linking,
  StatusBar,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { api, VideoData } from '../../services';

interface VideoPlayerScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VideoPlayer'>;
  route: RouteProp<RootStackParamList, 'VideoPlayer'>;
}

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = (width * 9) / 16;

export function VideoPlayerScreen({ navigation, route }: VideoPlayerScreenProps) {
  const insets = useSafeAreaInsets();
  const { video, playlistId } = route.params;
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [playing, setPlaying] = useState(true); // Autoplay activé
  const [loading, setLoading] = useState(true);
  const [playlistVideos, setPlaylistVideos] = useState<VideoData[]>([]);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);

  // Charger les vidéos de la playlist
  useEffect(() => {
    if (playlistId) {
      loadPlaylistVideos();
    } else {
      loadRecentVideos();
    }
  }, [playlistId]);

  const loadPlaylistVideos = async () => {
    if (!playlistId) return;
    setLoadingPlaylist(true);
    try {
      const response = await api.getVideos({ playlist_id: playlistId, per_page: 20 });
      // Filtrer la vidéo actuelle
      const otherVideos = response.data.filter(v => v.id !== video.id);
      setPlaylistVideos(otherVideos);
    } catch (error) {
      console.error('Error loading playlist:', error);
    } finally {
      setLoadingPlaylist(false);
    }
  };

  const loadRecentVideos = async () => {
    setLoadingPlaylist(true);
    try {
      const response = await api.getVideos({ per_page: 10, sort: 'recent' });
      // Filtrer la vidéo actuelle
      const otherVideos = response.data.filter(v => v.id !== video.id);
      setPlaylistVideos(otherVideos);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoadingPlaylist(false);
    }
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`;
    if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
    return `Il y a ${Math.floor(diffDays / 365)} an(s)`;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: video.title,
        message: `${video.title}\n\n${video.url}`,
        url: video.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openOnYouTube = () => {
    Linking.openURL(video.url);
  };

  const handleVideoPress = (v: VideoData) => {
    navigation.replace('VideoPlayer', {
      video: {
        id: v.id,
        title: v.title,
        description: v.description,
        thumbnail: v.thumbnail,
        thumbnailHigh: v.thumbnailHigh,
        url: v.url,
        durationFormatted: v.durationFormatted,
        totalViews: v.totalViews,
        likes: v.likes,
        publishedAt: v.publishedAt,
        category: v.category,
      },
      playlistId,
    });
  };

  // Extraire l'ID YouTube de l'URL
  const getYouTubeId = (url: string): string => {
    if (!url) return video.id;
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];
    return video.id;
  };

  const youtubeId = getYouTubeId(video.url);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      // Auto-play next video
      if (playlistVideos.length > 0) {
        handleVideoPress(playlistVideos[0]);
      }
    }
  }, [playlistVideos]);

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  const renderVideoItem = ({ item }: { item: VideoData }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => handleVideoPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.videoThumbWrap}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.videoThumb}
          resizeMode="cover"
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.durationFormatted}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoItemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.videoMeta}>
          {formatViews(item.totalViews)} vues • {getRelativeTime(item.publishedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />

      {/* Video Player Container with Safe Area */}
      <View style={[styles.videoWrapper, { paddingTop: insets.top }]}>
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={VIDEO_HEIGHT}
            width={width}
            play={playing}
            videoId={youtubeId}
            onChangeState={onStateChange}
            onReady={onReady}
            webViewProps={{
              allowsInlineMediaPlayback: true,
              mediaPlaybackRequiresUserAction: false,
            }}
          />

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title & Stats */}
        <View style={styles.videoInfoSection}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.statsText}>
            {formatViews(video.totalViews)} vues • {getRelativeTime(video.publishedAt)}
          </Text>
        </View>

        {/* Actions Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={24} color={colors.text.primary} />
            <Text style={styles.actionText}>{video.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare} activeOpacity={0.7}>
            <Ionicons name="share-social-outline" size={24} color={colors.text.primary} />
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={24} color={colors.text.primary} />
            <Text style={styles.actionText}>Télécharger</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="bookmark-outline" size={24} color={colors.text.primary} />
            <Text style={styles.actionText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>

        {/* Channel Info */}
        <TouchableOpacity style={styles.channelRow} onPress={openOnYouTube} activeOpacity={0.8}>
          <LinearGradient
            colors={['#dc2626', '#991b1b']}
            style={styles.channelAvatar}
          >
            <Text style={styles.channelInitial}>EE</Text>
          </LinearGradient>
          <View style={styles.channelInfo}>
            <Text style={styles.channelName}>Église Évangélique SIM Zogona</Text>
            <Text style={styles.channelHandle}>@EgliseEvangeliqueSIMZogona</Text>
          </View>
          <TouchableOpacity style={styles.youtubeButton} onPress={openOnYouTube}>
            <Ionicons name="logo-youtube" size={22} color="#FF0000" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Description Card */}
        {video.description && (
          <TouchableOpacity
            style={styles.descriptionCard}
            onPress={() => setDescriptionExpanded(!descriptionExpanded)}
            activeOpacity={0.8}
          >
            <Text
              style={styles.descriptionText}
              numberOfLines={descriptionExpanded ? undefined : 3}
            >
              {video.description}
            </Text>
            {video.description.length > 150 && (
              <Text style={styles.expandText}>
                {descriptionExpanded ? 'Afficher moins' : '...plus'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Meta badges */}
        <View style={styles.metaRow}>
          <View style={styles.metaBadge}>
            <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.metaText}>{video.durationFormatted}</Text>
          </View>
          {video.category && (
            <View style={[styles.metaBadge, styles.categoryBadge]}>
              <Text style={styles.categoryText}>{video.category}</Text>
            </View>
          )}
        </View>

        {/* Related Videos Section */}
        <View style={styles.relatedSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>
              {playlistId ? 'Dans cette playlist' : 'Vidéos récentes'}
            </Text>
          </View>

          {loadingPlaylist ? (
            <View style={styles.loadingVideos}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>Chargement...</Text>
            </View>
          ) : playlistVideos.length > 0 ? (
            playlistVideos.map((v) => (
              <View key={v.id}>
                {renderVideoItem({ item: v })}
              </View>
            ))
          ) : (
            <Text style={styles.noVideosText}>Aucune autre vidéo</Text>
          )}
        </View>

        {/* Open in YouTube CTA */}
        <TouchableOpacity style={styles.youtubeCTA} onPress={openOnYouTube} activeOpacity={0.9}>
          <View style={styles.youtubeCTAContent}>
            <Ionicons name="logo-youtube" size={28} color="#FF0000" />
            <View>
              <Text style={styles.youtubeCTATitle}>Regarder sur YouTube</Text>
              <Text style={styles.youtubeCTASubtitle}>Meilleure qualité & commentaires</Text>
            </View>
          </View>
          <Ionicons name="open-outline" size={22} color={colors.text.secondary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Video Player
  videoWrapper: {
    backgroundColor: '#000',
  },
  videoContainer: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Video Info
  videoInfoSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  videoTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    lineHeight: 28,
    marginBottom: spacing.sm,
  },
  statsText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },

  // Actions Row
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  actionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },

  // Channel Row
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  channelAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelInitial: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  channelHandle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  youtubeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Description Card
  descriptionCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  descriptionText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 24,
  },
  expandText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    marginTop: spacing.sm,
  },

  // Meta Row
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  metaText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    textTransform: 'capitalize',
  },

  // Related Videos Section
  relatedSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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
  loadingVideos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  loadingText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  noVideosText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },

  // Video Card
  videoCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  videoThumbWrap: {
    width: 140,
    height: 80,
    position: 'relative',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
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
  videoInfo: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  videoItemTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  videoMeta: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },

  // YouTube CTA
  youtubeCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  youtubeCTAContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  youtubeCTATitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  youtubeCTASubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});
