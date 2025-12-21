import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
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
import { Avatar, VideoCardSkeleton, ProgramCardSkeleton, EventCardSkeleton, HymnCardSkeleton } from '../../components';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context';
import { mockEvents, mockProgramActivities, mockHymns } from '../../utils';
import { api, VideoData } from '../../services';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'HomeTab'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const DAYS_SHORT = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

// Versets du jour - rotate based on day of year
const dailyVerses = [
  { text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", ref: "Jean 3:16" },
  { text: "L'Éternel est mon berger: je ne manquerai de rien.", ref: "Psaume 23:1" },
  { text: "Je puis tout par celui qui me fortifie.", ref: "Philippiens 4:13" },
  { text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.", ref: "Proverbes 3:5" },
  { text: "Ne crains point, car je suis avec toi; ne sois pas effrayé, car je suis ton Dieu.", ref: "Ésaïe 41:10" },
  { text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", ref: "Jérémie 29:11" },
  { text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", ref: "Matthieu 11:28" },
  { text: "L'Éternel est ma lumière et mon salut: de qui aurais-je crainte?", ref: "Psaume 27:1" },
  { text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.", ref: "Ésaïe 40:31" },
  { text: "Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance.", ref: "Galates 5:22" },
  { text: "Demandez, et l'on vous donnera; cherchez, et vous trouverez; frappez, et l'on vous ouvrira.", ref: "Matthieu 7:7" },
  { text: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.", ref: "Éphésiens 2:8" },
  { text: "L'amour est patient, il est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point.", ref: "1 Corinthiens 13:4" },
  { text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.", ref: "Psaume 119:105" },
  { text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.", ref: "Psaume 91:1" },
  { text: "Ayez confiance, j'ai vaincu le monde.", ref: "Jean 16:33" },
  { text: "Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.", ref: "Jean 14:6" },
  { text: "L'Éternel est bon, un refuge au jour de la détresse; il connaît ceux qui se confient en lui.", ref: "Nahum 1:7" },
  { text: "Recommande ton sort à l'Éternel, mets en lui ta confiance, et il agira.", ref: "Psaume 37:5" },
  { text: "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort.", ref: "Jean 11:25" },
  { text: "Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde.", ref: "Matthieu 28:20" },
  { text: "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux.", ref: "Matthieu 18:20" },
  { text: "Le Seigneur est fidèle, il vous affermira et vous préservera du malin.", ref: "2 Thessaloniciens 3:3" },
  { text: "Si quelqu'un a soif, qu'il vienne à moi, et qu'il boive.", ref: "Jean 7:37" },
  { text: "Béni soit l'homme qui se confie dans l'Éternel, et dont l'Éternel est l'espérance!", ref: "Jérémie 17:7" },
  { text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.", ref: "Psaume 46:2" },
  { text: "Approchez-vous de Dieu, et il s'approchera de vous.", ref: "Jacques 4:8" },
  { text: "L'Éternel combattra pour vous; et vous, gardez le silence.", ref: "Exode 14:14" },
  { text: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu!", ref: "Matthieu 5:9" },
  { text: "En vérité, en vérité, je vous le dis, celui qui croit en moi a la vie éternelle.", ref: "Jean 6:47" },
  { text: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui.", ref: "Apocalypse 3:20" },
];

const getDailyVerse = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dailyVerses[dayOfYear % dailyVerses.length];
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { user, isAuthenticated } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const dailyVerse = getDailyVerse();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await api.getVideos({ per_page: 5, sort: 'recent' });
      setVideos(response.data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoadingVideos(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVideos();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon apres-midi';
    return 'Bonsoir';
  };

  const getDayInfo = (date: Date) => ({
    day: DAYS_SHORT[date.getDay()],
    number: date.getDate(),
  });

  const parseEventDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const day = parts[0];
    const monthStr = parts[1];
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Fev': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Jun': 5,
      'Jul': 6, 'Aou': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return { day, month: MONTHS_SHORT[monthMap[monthStr] ?? 0] };
  };

  const formatViews = (views: number): string => {
    if (views >= 1000) return `${(views / 1000).toFixed(0)}k`;
    return views.toString();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>
              {isAuthenticated ? user?.name?.split(' ')[0] || 'Fidele' : 'Bienvenue'}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Notifications')}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.text.primary} />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
              <Avatar source={user?.avatar} name={user?.name} size={44} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Verset du Jour - Premium Card with Pattern */}
        <TouchableOpacity style={styles.verseCard} activeOpacity={0.95}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800' }}
            style={styles.verseBackground}
            imageStyle={styles.verseBackgroundImage}
          >
            <LinearGradient
              colors={['rgba(3,10,127,0.92)', 'rgba(2,8,102,0.98)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.verseGradient}
            >
              {/* Decorative elements */}
              <View style={styles.verseDecor}>
                <View style={styles.verseDecorCircle} />
                <View style={[styles.verseDecorCircle, styles.verseDecorCircle2]} />
              </View>

              <View style={styles.verseHeader}>
                <View style={styles.verseLabelWrap}>
                  <Ionicons name="sparkles" size={14} color="#fbbf24" />
                  <Text style={styles.verseLabel}>VERSET DU JOUR</Text>
                </View>
                <TouchableOpacity style={styles.verseBookmark}>
                  <Ionicons name="bookmark-outline" size={18} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
              </View>

              <View style={styles.verseQuoteIcon}>
                <Text style={styles.quoteSymbol}>"</Text>
              </View>

              <Text style={styles.verseText}>
                {dailyVerse.text}
              </Text>

              <View style={styles.verseFooter}>
                <View style={styles.verseRefWrap}>
                  <View style={styles.verseRefLine} />
                  <Text style={styles.verseRef}>{dailyVerse.ref}</Text>
                </View>
                <View style={styles.verseActions}>
                  <TouchableOpacity style={styles.verseActionBtn}>
                    <Ionicons name="copy-outline" size={16} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.verseActionBtn}>
                    <Ionicons name="share-outline" size={16} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>

        {/* TV Section - Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={styles.sectionIcon}>
                <Ionicons name="tv" size={16} color={colors.primary} />
              </View>
              <Text style={styles.sectionTitle}>TV</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('TVTab')} style={styles.seeAllBtn}>
              <Text style={styles.seeAll}>Voir tout</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {loadingVideos ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              <VideoCardSkeleton featured />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
            </ScrollView>
          ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {videos.map((video, index) => (
              <TouchableOpacity
                key={video.id}
                style={[styles.videoCard, index === 0 && styles.videoCardFeatured]}
                onPress={() => navigation.navigate('VideoPlayer', {
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
                })}
                activeOpacity={0.9}
              >
                <View style={[styles.videoThumbnailWrap, index === 0 && styles.videoThumbnailFeatured]}>
                  <Image source={{ uri: index === 0 ? video.thumbnailHigh : video.thumbnail }} style={styles.videoThumbnail} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.videoGradient}
                  />
                  {/* Play button with pulse effect */}
                  <View style={styles.playButtonWrap}>
                    <View style={styles.playButtonOuter} />
                    <View style={styles.playButton}>
                      <Ionicons name="play" size={index === 0 ? 24 : 18} color="#fff" style={{ marginLeft: 2 }} />
                    </View>
                  </View>
                  {/* Duration badge */}
                  <View style={styles.videoBadges}>
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{video.durationFormatted}</Text>
                    </View>
                  </View>
                  {/* Title overlay for featured */}
                  {index === 0 && (
                    <View style={styles.videoOverlayContent}>
                      <Text style={styles.videoOverlayTitle} numberOfLines={2}>{video.title}</Text>
                      <View style={styles.videoOverlayMeta}>
                        <View style={styles.viewsBadge}>
                          <Ionicons name="eye-outline" size={12} color="rgba(255,255,255,0.8)" />
                          <Text style={styles.viewsText}>{formatViews(video.totalViews)}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
                {index !== 0 && (
                  <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                    <Text style={styles.videoMeta}>{formatViews(video.totalViews)} vues</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          )}
        </View>

        {/* Prochaines Rencontres */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={[styles.sectionIcon, { backgroundColor: '#f0fdf4' }]}>
                <Ionicons name="calendar" size={16} color="#22c55e" />
              </View>
              <Text style={styles.sectionTitle}>Prochaines rencontres</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ProgramTab')} style={styles.seeAllBtn}>
              <Text style={styles.seeAll}>Voir tout</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {mockProgramActivities.slice(0, 5).map((program) => {
              const dayInfo = getDayInfo(new Date(program.date));
              return (
                <TouchableOpacity
                  key={program.id}
                  style={styles.programCard}
                  onPress={() => navigation.navigate('ProgramDetail', { activity: program })}
                  activeOpacity={0.8}
                >
                  <View style={styles.programHeader}>
                    <View style={styles.programDateCircle}>
                      <Text style={styles.programDateDay}>{dayInfo.day}</Text>
                      <Text style={styles.programDateNumber}>{dayInfo.number}</Text>
                    </View>
                    {program.isImportant && (
                      <View style={styles.importantBadge}>
                        <Ionicons name="star" size={10} color="#fff" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.programTitle} numberOfLines={2}>{program.title}</Text>
                  <View style={styles.programMetaWrap}>
                    <View style={styles.programMeta}>
                      <Ionicons name="time-outline" size={12} color={colors.text.secondary} />
                      <Text style={styles.programMetaText}>{program.startTime}</Text>
                    </View>
                    {program.location && (
                      <View style={styles.programMeta}>
                        <Ionicons name="location-outline" size={12} color={colors.text.secondary} />
                        <Text style={styles.programMetaText} numberOfLines={1}>{program.location}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Prochains Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={[styles.sectionIcon, { backgroundColor: '#fef2f2' }]}>
                <Ionicons name="star" size={16} color="#ef4444" />
              </View>
              <Text style={styles.sectionTitle}>Prochains events</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.seeAllBtn}>
              <Text style={styles.seeAll}>Voir tout</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {mockEvents.slice(0, 5).map((event, index) => {
              const { day, month } = parseEventDate(event.date);
              const isFirst = index === 0;
              return (
                <TouchableOpacity
                  key={event.id}
                  style={[styles.eventCard, isFirst && styles.eventCardFeatured]}
                  onPress={() => navigation.navigate('EventDetail', { event })}
                  activeOpacity={0.9}
                >
                  <View style={[styles.eventImageWrap, isFirst && styles.eventImageFeatured]}>
                    <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
                    <LinearGradient
                      colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.75)']}
                      style={styles.eventGradient}
                    />
                    {/* Category tag */}
                    <View style={styles.eventCategoryTag}>
                      <Ionicons name="star" size={10} color={colors.primary} />
                      <Text style={styles.eventCategoryText}>
                        {event.category === 'culte' ? 'Culte' : event.category === 'jeune' ? 'Jeunesse' : 'Special'}
                      </Text>
                    </View>
                    {/* Date badge */}
                    <View style={styles.eventDateBadge}>
                      <Text style={styles.eventDateMonth}>{month}</Text>
                      <Text style={styles.eventDateDay}>{day}</Text>
                    </View>
                    {/* Bottom content */}
                    <View style={styles.eventOverlayContent}>
                      <Text style={[styles.eventOverlayTitle, isFirst && styles.eventOverlayTitleLarge]} numberOfLines={2}>
                        {event.title}
                      </Text>
                      <View style={styles.eventOverlayMeta}>
                        <View style={styles.eventMetaItem}>
                          <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
                          <Text style={styles.eventMetaTextWhite}>{event.time}</Text>
                        </View>
                        <View style={styles.eventMetaItem}>
                          <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.8)" />
                          <Text style={styles.eventMetaTextWhite} numberOfLines={1}>
                            {event.location.split(',')[0]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Dernieres Activites (Cantiques) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <View style={[styles.sectionIcon, { backgroundColor: '#fefce8' }]}>
                <Ionicons name="musical-notes" size={16} color="#eab308" />
              </View>
              <Text style={styles.sectionTitle}>Cantiques populaires</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('HymnsTab')} style={styles.seeAllBtn}>
              <Text style={styles.seeAll}>Voir tout</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {mockHymns.slice(0, 6).map((hymn, index) => {
              const hymnColors = [
                { bg: '#fef3c7', text: '#d97706', accent: '#fbbf24' },
                { bg: '#dbeafe', text: '#2563eb', accent: '#60a5fa' },
                { bg: '#dcfce7', text: '#16a34a', accent: '#4ade80' },
                { bg: '#fce7f3', text: '#db2777', accent: '#f472b6' },
                { bg: '#e0e7ff', text: '#4f46e5', accent: '#818cf8' },
                { bg: '#fed7d7', text: '#c53030', accent: '#f87171' },
              ];
              const colorScheme = hymnColors[index % hymnColors.length];
              return (
                <TouchableOpacity
                  key={hymn.id}
                  style={styles.hymnCard}
                  onPress={() => navigation.navigate('HymnDetail', { hymn })}
                  activeOpacity={0.9}
                >
                  <View style={[styles.hymnNumberWrap, { backgroundColor: colorScheme.bg }]}>
                    <Text style={[styles.hymnNumber, { color: colorScheme.text }]}>{hymn.number}</Text>
                    <View style={[styles.hymnMusicIcon, { backgroundColor: colorScheme.accent }]}>
                      <Ionicons name="musical-note" size={10} color="#fff" />
                    </View>
                  </View>
                  <Text style={styles.hymnTitle} numberOfLines={2}>{hymn.title}</Text>
                  <View style={styles.hymnFooter}>
                    <View style={[styles.hymnCategoryWrap, { backgroundColor: colorScheme.bg }]}>
                      <Text style={[styles.hymnCategory, { color: colorScheme.text }]}>{hymn.category}</Text>
                    </View>
                    <Ionicons name="play-circle" size={24} color={colorScheme.accent} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
  scrollContent: {
    paddingBottom: 100,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  greeting: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  userName: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  // Verse Card - Premium Design
  verseCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  verseBackground: {
    width: '100%',
  },
  verseBackgroundImage: {
    borderRadius: borderRadius.xxl,
    opacity: 0.15,
  },
  verseGradient: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  verseDecor: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    overflow: 'hidden',
  },
  verseDecorCircle: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  verseDecorCircle2: {
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  verseLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  verseLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1.5,
  },
  verseBookmark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseQuoteIcon: {
    marginBottom: spacing.xs,
  },
  quoteSymbol: {
    fontSize: 48,
    fontFamily: fontFamily.bold,
    color: 'rgba(255,255,255,0.2)',
    lineHeight: 48,
    marginTop: -8,
  },
  verseText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.medium,
    color: '#fff',
    lineHeight: 28,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  verseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verseRefWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  verseRefLine: {
    width: 24,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1,
  },
  verseRef: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  verseActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  verseActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAll: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  horizontalList: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.md,
  },
  // Video Card - Netflix/YouTube Style
  videoCard: {
    width: 180,
    marginRight: spacing.md,
  },
  videoCardFeatured: {
    width: width - spacing.xl * 2,
    maxWidth: 340,
  },
  videoThumbnailWrap: {
    width: '100%',
    height: 110,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  videoThumbnailFeatured: {
    height: 190,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  playButtonWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -24,
    marginLeft: -24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonOuter: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(3, 10, 127, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  videoBadges: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  liveText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 0.5,
  },
  durationBadge: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  durationText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  videoOverlayContent: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
  },
  videoOverlayTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  videoOverlayMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  viewsText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  videoInfo: {
    paddingTop: spacing.sm,
  },
  videoTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  videoMeta: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  // Program Card
  programCard: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginRight: spacing.md,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  programDateCircle: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programDateDay: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  programDateNumber: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    marginTop: -2,
  },
  importantBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  programTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  programMetaWrap: {
    gap: spacing.xs,
  },
  programMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  programMetaText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    flex: 1,
  },
  // Event Card - Modern Design
  eventCard: {
    width: 200,
    marginRight: spacing.md,
  },
  eventCardFeatured: {
    width: 280,
  },
  eventImageWrap: {
    width: '100%',
    height: 160,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  eventImageFeatured: {
    height: 200,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  eventCategoryTag: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  eventDateBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minWidth: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  eventDateMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  eventDateDay: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.extrabold,
    color: colors.primary,
    marginTop: -2,
  },
  eventOverlayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  eventOverlayTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  eventOverlayTitleLarge: {
    fontSize: fontSize.md,
  },
  eventOverlayMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  eventMetaTextWhite: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  // Hymn Card - Colorful Design
  hymnCard: {
    width: 150,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  hymnNumberWrap: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    position: 'relative',
  },
  hymnNumber: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.extrabold,
  },
  hymnMusicIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hymnTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: 18,
    height: 36,
  },
  hymnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hymnCategoryWrap: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  hymnCategory: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
