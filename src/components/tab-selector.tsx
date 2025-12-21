import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, borderRadius, spacing, fontSize, fontWeight } from '../constants/theme';

interface TabSelectorProps<T extends string> {
  tabs: { key: T; label: string }[];
  selectedTab: T;
  onSelectTab: (tab: T) => void;
}

export function TabSelector<T extends string>({
  tabs,
  selectedTab,
  onSelectTab,
}: TabSelectorProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            selectedTab === tab.key && styles.selectedTab,
          ]}
          onPress={() => onSelectTab(tab.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.key && styles.selectedTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text.secondary,
  },
  selectedTabText: {
    color: colors.text.inverse,
  },
});
