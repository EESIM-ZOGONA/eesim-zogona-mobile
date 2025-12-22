import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontFamily, fontSize } from '../../constants/theme';

export interface FormattingToolbarProps {
  onFormat: (command: string, value?: string) => void;
  activeFormats?: string[];
}

interface ToolButton {
  command: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

export function FormattingToolbar({
  onFormat,
  activeFormats = [],
}: FormattingToolbarProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const isActive = (format: string) => activeFormats.includes(format);

  const handleLinkSubmit = useCallback(() => {
    if (linkUrl.trim()) {
      let url = linkUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      onFormat('link', url);
      setLinkUrl('');
      setShowLinkModal(false);
    }
  }, [linkUrl, onFormat]);

  const textButtons: ToolButton[] = [
    { command: 'bold', icon: 'text', label: 'B' },
    { command: 'italic', icon: 'text-outline', label: 'I' },
    { command: 'underline', icon: 'remove-outline', label: 'U' },
  ];

  const headingButtons: ToolButton[] = [
    { command: 'h1', icon: 'text', label: 'H1' },
    { command: 'h2', icon: 'text', label: 'H2' },
  ];

  const listButtons: ToolButton[] = [
    { command: 'ul', icon: 'list', label: 'Puces' },
    { command: 'ol', icon: 'reorder-three', label: 'Numéros' },
    { command: 'quote', icon: 'chatbox-outline', label: 'Citation' },
  ];

  const renderTextButton = (button: ToolButton, index: number) => {
    const active = isActive(button.command);
    return (
      <TouchableOpacity
        key={index}
        style={[styles.textButton, active && styles.buttonActive]}
        onPress={() => onFormat(button.command)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.textButtonLabel,
          button.command === 'bold' && styles.boldLabel,
          button.command === 'italic' && styles.italicLabel,
          button.command === 'underline' && styles.underlineLabel,
          active && styles.labelActive,
        ]}>
          {button.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeadingButton = (button: ToolButton, index: number) => {
    const active = isActive(button.command);
    return (
      <TouchableOpacity
        key={index}
        style={[styles.headingButton, active && styles.buttonActive]}
        onPress={() => onFormat(button.command)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.headingLabel,
          button.command === 'h2' && styles.h2Label,
          active && styles.labelActive,
        ]}>
          {button.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderIconButton = (button: ToolButton, index: number) => {
    const active = isActive(button.command);
    return (
      <TouchableOpacity
        key={index}
        style={[styles.iconButton, active && styles.buttonActive]}
        onPress={() => onFormat(button.command)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={button.icon}
          size={20}
          color={active ? '#fff' : colors.text.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.group}>
          {textButtons.map((btn, i) => renderTextButton(btn, i))}
        </View>

        <View style={styles.divider} />

        <View style={styles.group}>
          {headingButtons.map((btn, i) => renderHeadingButton(btn, i))}
        </View>

        <View style={styles.divider} />

        <View style={styles.group}>
          {listButtons.map((btn, i) => renderIconButton(btn, i))}
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowLinkModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="link" size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showLinkModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLinkModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLinkModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Insérer un lien</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="https://exemple.com"
              placeholderTextColor={colors.text.tertiary}
              value={linkUrl}
              onChangeText={setLinkUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setLinkUrl('');
                  setShowLinkModal(false);
                }}
              >
                <Text style={styles.modalButtonCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleLinkSubmit}
              >
                <Text style={styles.modalButtonConfirmText}>Insérer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: spacing.md,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginHorizontal: spacing.sm,
  },
  textButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  headingButton: {
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  buttonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textButtonLabel: {
    fontSize: 18,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  boldLabel: {
    fontWeight: '800',
  },
  italicLabel: {
    fontStyle: 'italic',
    fontFamily: fontFamily.regular,
  },
  underlineLabel: {
    textDecorationLine: 'underline',
  },
  headingLabel: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  h2Label: {
    fontSize: 14,
  },
  labelActive: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  modalInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: colors.background,
  },
  modalButtonConfirm: {
    backgroundColor: colors.primary,
  },
  modalButtonCancelText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },
  modalButtonConfirmText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: '#fff',
  },
});
