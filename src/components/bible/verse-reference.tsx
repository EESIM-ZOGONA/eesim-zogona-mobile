import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { parseVerseReference } from '../../utils/verse-parser';
import { colors, fontSize, fontFamily } from '../../constants/theme';

export interface VerseReferenceProps {
  reference: string;
  style?: TextStyle;
  showIcon?: boolean;
  iconSize?: number;
  onPress?: () => void;
  disabled?: boolean;
}

function VerseReferenceComponent({
  reference,
  style,
  showIcon = false,
  iconSize = 14,
  onPress,
  disabled = false,
}: VerseReferenceProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = useCallback(() => {
    if (disabled) return;

    if (onPress) {
      onPress();
      return;
    }

    const parsed = parseVerseReference(reference);
    if (parsed) {
      navigation.navigate('BibleChapter', {
        bookId: parsed.bookId,
        bookName: parsed.bookName,
        chapter: parsed.chapter,
        scrollToVerse: parsed.verseStart,
      });
    }
  }, [reference, onPress, disabled, navigation]);

  const canNavigate = !disabled && !!parseVerseReference(reference);

  if (!canNavigate && !onPress) {
    return <Text style={[styles.textPlain, style]}>{reference}</Text>;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
      style={styles.container}
    >
      <Text style={[styles.text, style]}>{reference}</Text>
      {showIcon && (
        <Ionicons
          name="book-outline"
          size={iconSize}
          color={style?.color || colors.primary}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
}

export const VerseReference = memo(VerseReferenceComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  textPlain: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  icon: {
    marginLeft: 4,
  },
});
