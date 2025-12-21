import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface HymnDetailScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HymnDetail'>;
  route: RouteProp<RootStackParamList, 'HymnDetail'>;
}

// Parse lyrics into sections (REFRAIN, COUPLET 1, etc.)
const parseLyrics = (lyrics: string) => {
  const sections: { type: 'refrain' | 'couplet' | 'refrain-ref'; title?: string; content: string }[] = [];

  // Split by common section markers
  const lines = lyrics.split('\n');
  let currentSection: { type: 'refrain' | 'couplet' | 'refrain-ref'; title?: string; content: string } | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const upperLine = trimmedLine.toUpperCase();

    // Check for section headers
    if (upperLine.startsWith('REFRAIN') || upperLine === 'REFRAIN:' || upperLine === 'REFRAIN') {
      if (currentSection) sections.push(currentSection);
      currentSection = { type: 'refrain', title: 'REFRAIN', content: '' };
    } else if (upperLine.match(/^COUPLET\s*\d+/i) || upperLine.match(/^VERSET\s*\d+/i)) {
      if (currentSection) sections.push(currentSection);
      const num = trimmedLine.match(/\d+/)?.[0] || '';
      currentSection = { type: 'couplet', title: `COUPLET ${num}`, content: '' };
    } else if (trimmedLine === '(Refrain)' || trimmedLine === '(refrain)') {
      if (currentSection) sections.push(currentSection);
      sections.push({ type: 'refrain-ref', content: '(Refrain)' });
      currentSection = null;
    } else if (trimmedLine) {
      if (!currentSection) {
        // Start with couplet 1 if no header
        currentSection = { type: 'couplet', title: 'COUPLET 1', content: '' };
      }
      currentSection.content += (currentSection.content ? '\n' : '') + trimmedLine;
    }
  }

  if (currentSection) sections.push(currentSection);

  // If no sections found, treat as single block
  if (sections.length === 0) {
    return [{ type: 'couplet' as const, content: lyrics }];
  }

  return sections;
};

export function HymnDetailScreen({ navigation, route }: HymnDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const { hymn } = route.params;
  const [textSize, setTextSize] = useState(18);
  const [isFavorite, setIsFavorite] = useState(false);

  const sections = parseLyrics(hymn.lyrics);

  const handleShare = async () => {
    try {
      await Share.share({
        title: `Cantique ${hymn.number} - ${hymn.title}`,
        message: `${hymn.title}\n\n${hymn.lyrics}\n\n— Cantique ${hymn.number}, EE/SIM Zogona`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const increaseTextSize = () => {
    if (textSize < 28) setTextSize(textSize + 2);
  };

  const decreaseTextSize = () => {
    if (textSize > 14) setTextSize(textSize - 2);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header - Style paramètres */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{hymn.title}</Text>
          <Text style={styles.headerSubtitle}>Cantique {hymn.number}</Text>
        </View>
        <TouchableOpacity
          style={[styles.headerButton, isFavorite && styles.headerButtonActive]}
          onPress={() => setIsFavorite(!isFavorite)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? '#dc2626' : colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Category & Author */}
      <View style={styles.metaRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{hymn.category}</Text>
        </View>
        {hymn.author && (
          <Text style={styles.authorText}>{hymn.author}</Text>
        )}
      </View>

      {/* Lyrics */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.lyricsCard}>
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              {section.type === 'refrain' && (
                <>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <View style={styles.refrainContainer}>
                    <View style={styles.refrainBar} />
                    <Text style={[styles.refrainText, { fontSize: textSize, lineHeight: textSize * 1.6 }]}>
                      {section.content}
                    </Text>
                  </View>
                </>
              )}
              {section.type === 'couplet' && (
                <>
                  {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
                  <Text style={[styles.coupletText, { fontSize: textSize, lineHeight: textSize * 1.6 }]}>
                    {section.content}
                  </Text>
                </>
              )}
              {section.type === 'refrain-ref' && (
                <View style={styles.refrainRefContainer}>
                  <View style={styles.refrainRefBar} />
                  <Text style={styles.refrainRefText}>(Refrain)</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View style={[styles.floatingBar, { paddingBottom: insets.bottom || spacing.md }]}>
        <View style={styles.floatingBarContent}>
          {/* Play Button */}
          <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
            <Ionicons name="play" size={28} color="#fff" style={{ marginLeft: 3 }} />
          </TouchableOpacity>

          {/* Audio Info */}
          <View style={styles.audioInfo}>
            <Text style={styles.audioTitle}>Melodie</Text>
            <Text style={styles.audioSubtitle}>Piano - 3:45</Text>
          </View>

          {/* Divider */}
          <View style={styles.barDivider} />

          {/* Actions */}
          <TouchableOpacity
            style={styles.barActionButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social-outline" size={22} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.barActionButton}
            activeOpacity={0.7}
          >
            <Ionicons name="options-outline" size={22} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Size Controls Row */}
        <View style={styles.sizeControlsRow}>
          <TouchableOpacity
            style={styles.sizeControlButton}
            onPress={decreaseTextSize}
            activeOpacity={0.7}
          >
            <Text style={styles.sizeControlText}>A-</Text>
          </TouchableOpacity>
          <View style={styles.sizeIndicator}>
            <Text style={styles.sizeIndicatorText}>{textSize}px</Text>
          </View>
          <TouchableOpacity
            style={styles.sizeControlButton}
            onPress={increaseTextSize}
            activeOpacity={0.7}
          >
            <Text style={styles.sizeControlTextLarge}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
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
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonActive: {
    backgroundColor: '#fee2e2',
  },
  // Controls Row
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    textTransform: 'capitalize',
  },
  authorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  textSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  sizeButton: {
    width: 44,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  sizeButtonTextLarge: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  sizeDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  // Lyrics
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 120,
  },
  lyricsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  refrainContainer: {
    flexDirection: 'row',
  },
  refrainBar: {
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  refrainText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.primary,
  },
  coupletText: {
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
  },
  refrainRefContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  refrainRefBar: {
    width: 3,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  refrainRefText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: colors.text.secondary,
  },
  // Audio Bar
  audioBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  audioBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    padding: spacing.sm,
    paddingRight: spacing.md,
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  audioInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  audioTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  audioSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  audioActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  audioActionButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Meta Row
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  // Floating Bar
  floatingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  floatingBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    padding: spacing.sm,
    paddingRight: spacing.md,
  },
  barDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  barActionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Size Controls
  sizeControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  sizeControlButton: {
    width: 44,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
  },
  sizeControlText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
  },
  sizeControlTextLarge: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  sizeIndicator: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.full,
  },
  sizeIndicatorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
});
