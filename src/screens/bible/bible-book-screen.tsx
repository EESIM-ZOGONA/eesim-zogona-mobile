import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';

const { width } = Dimensions.get('window');
const CHAPTER_SIZE = (width - spacing.lg * 2 - spacing.sm * 4) / 5;

interface BibleBookScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BibleBook'>;
  route: RouteProp<RootStackParamList, 'BibleBook'>;
}

export function BibleBookScreen({ navigation, route }: BibleBookScreenProps) {
  const { book } = route.params;

  // Générer la liste des chapitres
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  const renderChapterItem = ({ item: chapter }: { item: number }) => (
    <TouchableOpacity
      style={styles.chapterCard}
      onPress={() => navigation.navigate(SCREENS.BIBLE_CHAPTER, {
        bookId: book.id,
        bookName: book.name,
        chapter,
      })}
      activeOpacity={0.8}
    >
      <Text style={styles.chapterNumber}>{chapter}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={chapters}
        renderItem={renderChapterItem}
        keyExtractor={(item) => item.toString()}
        numColumns={5}
        ListHeaderComponent={() => (
          <>
            {/* Hero Header */}
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <View style={styles.heroContent}>
                <View style={styles.bookIconWrap}>
                  <Ionicons name="book" size={32} color={colors.primary} />
                </View>

                <Text style={styles.bookName}>{book.name}</Text>
                <Text style={styles.bookTestament}>
                  {book.testament === 'old' ? 'Ancien Testament' : 'Nouveau Testament'}
                </Text>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{book.chapters}</Text>
                    <Text style={styles.statLabel}>Chapitres</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{book.abbrev}</Text>
                    <Text style={styles.statLabel}>Abréviation</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardAccent} />
              <View style={styles.cardAccent2} />
            </LinearGradient>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.quickAction}
                onPress={() => navigation.navigate(SCREENS.BIBLE_CHAPTER, {
                  bookId: book.id,
                  bookName: book.name,
                  chapter: 1,
                })}
                activeOpacity={0.8}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name="play" size={18} color={colors.primary} />
                </View>
                <Text style={styles.quickActionText}>Commencer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickAction}
                activeOpacity={0.8}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name="bookmark-outline" size={18} color={colors.primary} />
                </View>
                <Text style={styles.quickActionText}>Favoris</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickAction}
                activeOpacity={0.8}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name="share-outline" size={18} color={colors.primary} />
                </View>
                <Text style={styles.quickActionText}>Partager</Text>
              </TouchableOpacity>
            </View>

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleWrap}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionTitle}>Chapitres</Text>
              </View>
              <Text style={styles.sectionSubtitle}>{book.chapters} au total</Text>
            </View>
          </>
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.chaptersRow}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Hero Card
  heroCard: {
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  heroContent: {
    alignItems: 'center',
  },
  bookIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  bookName: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  bookTestament: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  statLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardAccent: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cardAccent2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
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
  sectionSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  // Chapters Grid
  chaptersRow: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  chapterCard: {
    width: CHAPTER_SIZE,
    height: CHAPTER_SIZE,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumber: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
});
