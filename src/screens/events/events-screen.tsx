import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList, MainTabParamList, EventCategory, Event } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { mockEvents } from '../../utils';

const { width } = Dimensions.get('window');

type EventsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface EventsScreenProps {
  navigation: EventsScreenNavigationProp;
}

const categories: { key: EventCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'culte', label: 'Culte', icon: 'people' },
  { key: 'jeune', label: 'Jeunesse', icon: 'flash' },
  { key: 'reunion', label: 'Reunion', icon: 'calendar' },
];

const MONTHS_SHORT = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

// Color schemes for event cards
const getEventColorScheme = (index: number) => {
  const schemes = [
    { gradient: ['#030a7f', '#020866'], accent: '#818cf8' },
    { gradient: ['#dc2626', '#b91c1c'], accent: '#fca5a5' },
    { gradient: ['#059669', '#047857'], accent: '#6ee7b7' },
    { gradient: ['#d97706', '#b45309'], accent: '#fcd34d' },
    { gradient: ['#7c3aed', '#6d28d9'], accent: '#c4b5fd' },
  ];
  return schemes[index % schemes.length];
};

export function EventsScreen({ navigation }: EventsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetail', { event });
  };

  const parseEventDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const day = parts[0];
    const monthStr = parts[1];
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Fev': 1, 'Mar': 2, 'Avr': 3, 'Mai': 4, 'Jun': 5,
      'Jul': 6, 'Aou': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const monthIndex = monthMap[monthStr] ?? 0;
    return { day, monthIndex };
  };

  // Featured event (first one)
  const featuredEvent = filteredEvents[0];
  const regularEvents = filteredEvents.slice(1);

  const renderFeaturedEvent = () => {
    if (!featuredEvent) return null;
    const { day, monthIndex } = parseEventDate(featuredEvent.date);

    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => handleEventPress(featuredEvent)}
        activeOpacity={0.95}
      >
        <Image
          source={{ uri: featuredEvent.imageUrl || 'https://via.placeholder.com/400x300' }}
          style={styles.featuredImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.featuredGradient}
        />

        {/* Featured badge */}
        <View style={styles.featuredBadge}>
          <Ionicons name="star" size={12} color="#fbbf24" />
          <Text style={styles.featuredBadgeText}>A LA UNE</Text>
        </View>

        {/* Date badge */}
        <View style={styles.featuredDateBadge}>
          <Text style={styles.featuredDateMonth}>{MONTHS_SHORT[monthIndex]}</Text>
          <Text style={styles.featuredDateDay}>{day}</Text>
        </View>

        {/* Content */}
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle} numberOfLines={2}>{featuredEvent.title}</Text>
          <View style={styles.featuredMeta}>
            <View style={styles.featuredMetaItem}>
              <Ionicons name="time" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.featuredMetaText}>{featuredEvent.time}</Text>
            </View>
            <View style={styles.featuredMetaItem}>
              <Ionicons name="location" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.featuredMetaText}>{featuredEvent.location.split(',')[0]}</Text>
            </View>
          </View>
          <View style={styles.featuredAction}>
            <Text style={styles.featuredActionText}>Voir les details</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEventItem = ({ item, index }: { item: Event; index: number }) => {
    const { day, monthIndex } = parseEventDate(item.date);
    const colorScheme = getEventColorScheme(index);

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => handleEventPress(item)}
        activeOpacity={0.9}
      >
        {/* Left: Gradient Date */}
        <LinearGradient
          colors={colorScheme.gradient as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dateGradient}
        >
          <Text style={styles.dateMonth}>{MONTHS_SHORT[monthIndex]}</Text>
          <Text style={styles.dateDay}>{day}</Text>
          <View style={[styles.dateAccent, { backgroundColor: colorScheme.accent }]} />
        </LinearGradient>

        {/* Content */}
        <View style={styles.eventContent}>
          <View style={styles.eventCategoryBadge}>
            <Text style={styles.eventCategoryText}>
              {item.category === 'culte' ? 'Culte' : item.category === 'jeune' ? 'Jeunesse' : 'Reunion'}
            </Text>
          </View>
          <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color={colors.text.secondary} />
              <Text style={styles.metaText}>{item.time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color={colors.text.secondary} />
              <Text style={styles.metaText} numberOfLines={1}>{item.location.split(',')[0]}</Text>
            </View>
          </View>
        </View>

        {/* Arrow with circle */}
        <View style={styles.arrowWrap}>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Evenements</Text>
          <Text style={styles.headerSubtitle}>{filteredEvents.length} evenements</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.calendarGradient}
          >
            <Ionicons name="calendar" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchIconWrap}>
          <Ionicons name="search" size={18} color={colors.text.tertiary} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un evenement..."
          placeholderTextColor={colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                selectedCategory === cat.key && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Ionicons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.key ? '#fff' : colors.text.secondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.key && styles.categoryTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Event */}
      {renderFeaturedEvent()}

      {/* Section Title */}
      {regularEvents.length > 0 && (
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>Autres evenements</Text>
          </View>
        </View>
      )}

      {/* Events List */}
      <FlatList
        data={regularEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          filteredEvents.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="calendar-outline" size={40} color={colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>Aucun evenement trouve</Text>
              <Text style={styles.emptyText}>
                Essayez de modifier votre recherche ou selectionnez une autre categorie
              </Text>
            </View>
          ) : null
        }
      />
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
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  calendarGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.primary,
  },
  clearButton: {
    padding: spacing.xs,
  },
  // Categories
  categoriesWrapper: {
    height: 56,
    marginBottom: spacing.md,
  },
  categories: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.md,
    alignItems: 'center',
    height: 56,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  categoryTextActive: {
    color: colors.text.inverse,
  },
  // Featured Card
  featuredCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    height: 220,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: '#fff',
    letterSpacing: 1,
  },
  featuredDateBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  featuredDateMonth: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  featuredDateDay: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.extrabold,
    color: colors.primary,
    marginTop: -4,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  featuredTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  featuredMetaText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  featuredAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  featuredActionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  // Event Card
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
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
  eventContent: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  eventCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xs,
  },
  eventCategoryText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  eventMeta: {
    flexDirection: 'row',
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
