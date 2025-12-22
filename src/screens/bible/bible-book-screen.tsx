import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

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
      onPress={() => navigation.navigate('BibleChapter', {
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
          <Text style={styles.headerTitle}>{book.name}</Text>
          <Text style={styles.headerSubtitle}>{book.chapters} chapitres</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={chapters}
        renderItem={renderChapterItem}
        keyExtractor={(item) => item.toString()}
        numColumns={5}
        ListHeaderComponent={() => (
          <>
            {/* Book Info Card */}
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bookInfoCard}
            >
              <View style={styles.bookIconWrap}>
                <Ionicons name="book" size={32} color={colors.primary} />
              </View>
              <Text style={styles.bookInfoName}>{book.name}</Text>
              <Text style={styles.bookInfoTestament}>
                {book.testament === 'old' ? 'Ancien Testament' : 'Nouveau Testament'}
              </Text>
              <View style={styles.bookInfoStats}>
                <View style={styles.bookInfoStat}>
                  <Text style={styles.bookInfoStatValue}>{book.chapters}</Text>
                  <Text style={styles.bookInfoStatLabel}>Chapitres</Text>
                </View>
              </View>
              <View style={styles.cardAccent} />
            </LinearGradient>

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleWrap}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionTitle}>Chapitres</Text>
              </View>
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
  headerRight: {
    width: 44,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  // Book Info Card
  bookInfoCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
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
  bookInfoName: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  bookInfoTestament: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.lg,
  },
  bookInfoStats: {
    flexDirection: 'row',
  },
  bookInfoStat: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  bookInfoStatValue: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  bookInfoStatLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: 'rgba(255,255,255,0.8)',
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
  // Chapters Grid
  chaptersRow: {
    justifyContent: 'flex-start',
    gap: spacing.sm,
  },
  chapterCard: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  chapterNumber: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
});
