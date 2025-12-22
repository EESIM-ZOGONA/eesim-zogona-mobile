import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { BIBLE_VERSIONS, BibleVersionCode } from '../../services/bible-database';

const { height } = Dimensions.get('window');

export interface BibleVersionPickerProps {
  visible: boolean;
  currentVersion: BibleVersionCode;
  onSelectVersion: (version: BibleVersionCode) => void;
  onClose: () => void;
}

export function BibleVersionPicker({
  visible,
  currentVersion,
  onSelectVersion,
  onClose,
}: BibleVersionPickerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Version de la Bible</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={BIBLE_VERSIONS}
            keyExtractor={(item) => item.code}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const isActive = currentVersion === item.code;
              return (
                <TouchableOpacity
                  style={[styles.item, isActive && styles.itemActive]}
                  onPress={() => onSelectVersion(item.code)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemCode, isActive && styles.itemCodeActive]}>
                      {item.code}
                    </Text>
                    <Text style={[styles.itemName, isActive && styles.itemNameActive]}>
                      {item.name}
                    </Text>
                  </View>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xxl,
    width: '100%',
    maxWidth: 360,
    maxHeight: height * 0.65,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  itemActive: {
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  itemInfo: {
    flex: 1,
  },
  itemCode: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  itemCodeActive: {
    color: colors.primary,
  },
  itemName: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  itemNameActive: {
    color: colors.primary,
  },
});
