import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { colors, borderRadius, spacing, fontSize, fontWeight, fontFamily } from '../constants/theme';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const result = newValue.join('');
    onChange(result);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (result.length === length) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            focusedIndex === index && styles.focused,
            value[index] && styles.filled,
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text.slice(-1), index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus={true}
          placeholder=""
          caretHidden={true}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  input: {
    width: 48,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    textAlign: 'center',
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  focused: {
    backgroundColor: colors.primaryLight,
  },
  filled: {
    backgroundColor: colors.primaryLight,
  },
});
