import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius, SCREENS } from '../../constants';
import {
  BIBLE_VERSIONS,
  BibleVersionCode,
  getChapterVerses,
} from '../../services/bible-database';

interface VerseCompareScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VerseCompare'>;
  route: RouteProp<RootStackParamList, 'VerseCompare'>;
}

interface VersionVerses {
  version: BibleVersionCode;
  versionName: string;
  verses: { verse: number; text: string | null }[];
}

export function VerseCompareScreen({ navigation, route }: VerseCompareScreenProps) {
  const { bookId, bookName, chapter, verses: selectedVerses } = route.params;
  const [versions, setVersions] = useState<VersionVerses[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format verse reference (e.g., "1-3" or "1, 3, 5")
  const formatVerseRef = () => {
    if (selectedVerses.length === 1) return selectedVerses[0].toString();

    // Check if consecutive
    const isConsecutive = selectedVerses.every((v, i) =>
      i === 0 || v === selectedVerses[i - 1] + 1
    );

    if (isConsecutive) {
      return `${selectedVerses[0]}-${selectedVerses[selectedVerses.length - 1]}`;
    }

    return selectedVerses.join(', ');
  };

  const verseRef = formatVerseRef();

  useEffect(() => {
    async function loadAllVersions() {
      setIsLoading(true);
      try {
        const results: VersionVerses[] = [];

        for (const version of BIBLE_VERSIONS) {
          const chapterVerses = await getChapterVerses(bookId, chapter, version.code);

          const foundVerses = selectedVerses.map(verseNum => {
            const found = chapterVerses.find(v => v.verse === verseNum);
            return {
              verse: verseNum,
              text: found?.text || null,
            };
          });

          results.push({
            version: version.code,
            versionName: version.name,
            verses: foundVerses,
          });
        }

        setVersions(results);
      } catch (error) {
        console.error('Error loading versions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAllVersions();
  }, [bookId, chapter, selectedVerses]);

  const handleShare = async () => {
    const reference = `${bookName} ${chapter}:${verseRef}`;

    const versionsText = versions
      .map(v => {
        const versesText = v.verses
          .filter(verse => verse.text)
          .map(verse => `${verse.verse}. ${verse.text}`)
          .join(' ');
        return versesText ? `[${v.version}]\n${versesText}` : null;
      })
      .filter(Boolean)
      .join('\n\n');

    await Share.share({
      message: `${reference}\n\n${versionsText}`,
    });
  };

  const handleShareSingle = async (versionVerses: VersionVerses) => {
    const hasText = versionVerses.verses.some(v => v.text);
    if (!hasText) return;

    const reference = `${bookName} ${chapter}:${verseRef}`;

    const versesText = versionVerses.verses
      .filter(v => v.text)
      .map(v => `${v.verse}. ${v.text}`)
      .join(' ');

    await Share.share({
      message: `"${versesText}"\n\n— ${reference} (${versionVerses.version})`,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement des versions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Comparer</Text>
          <Text style={styles.headerSubtitle}>{bookName} {chapter}:{verseRef}</Text>
        </View>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Ionicons name="share-outline" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.referenceCard}>
          <Ionicons name="git-compare" size={24} color={colors.primary} />
          <Text style={styles.referenceText}>{bookName} {chapter}:{verseRef}</Text>
          <Text style={styles.versionCount}>
            {selectedVerses.length} verset{selectedVerses.length > 1 ? 's' : ''} • {versions.filter(v => v.verses.some(verse => verse.text)).length} versions
          </Text>
        </View>

        {versions.map((item) => {
          const hasText = item.verses.some(v => v.text);
          const allVersesAvailable = item.verses.every(v => v.text);

          return (
            <TouchableOpacity
              key={item.version}
              style={[styles.versionCard, !hasText && styles.versionCardUnavailable]}
              onPress={() => handleShareSingle(item)}
              activeOpacity={hasText ? 0.8 : 1}
            >
              <View style={styles.versionHeader}>
                <View style={styles.versionBadge}>
                  <Text style={styles.versionCode}>{item.version}</Text>
                </View>
                <Text style={styles.versionName}>{item.versionName}</Text>
                {hasText && (
                  <Ionicons name="share-outline" size={18} color={colors.text.tertiary} />
                )}
              </View>
              {hasText ? (
                <View>
                  {item.verses.map((verse) => (
                    <View key={verse.verse} style={styles.verseRow}>
                      {selectedVerses.length > 1 && (
                        <Text style={styles.verseNumber}>{verse.verse}</Text>
                      )}
                      {verse.text ? (
                        <Text style={styles.verseText}>{verse.text}</Text>
                      ) : (
                        <Text style={styles.unavailableText}>Non disponible</Text>
                      )}
                    </View>
                  ))}
                  {!allVersesAvailable && (
                    <Text style={styles.partialNote}>* Certains versets non disponibles</Text>
                  )}
                </View>
              ) : (
                <Text style={styles.unavailableText}>Versets non disponibles dans cette version</Text>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  referenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  referenceText: {
    flex: 1,
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  versionCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  versionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  versionCardUnavailable: {
    opacity: 0.6,
  },
  versionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  versionBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  versionCode: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  versionName: {
    flex: 1,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  verseRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  verseNumber: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    marginRight: spacing.sm,
    minWidth: 24,
  },
  verseText: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 26,
  },
  unavailableText: {
    flex: 1,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.tertiary,
  },
  partialNote: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
});
