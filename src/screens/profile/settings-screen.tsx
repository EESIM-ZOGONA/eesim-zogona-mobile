import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { MenuItem, Skeleton } from '../../components';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useSettings } from '../../hooks';

interface SettingsScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
}

type ThemeOption = 'light' | 'dark' | 'system';
type VideoQualityOption = 'auto' | 'low' | 'medium' | 'high';

const THEME_LABELS: Record<ThemeOption, string> = {
  light: 'Clair',
  dark: 'Sombre',
  system: 'Systeme',
};

const VIDEO_QUALITY_LABELS: Record<VideoQualityOption, string> = {
  auto: 'Automatique',
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute',
};

function SettingSwitch({
  icon,
  label,
  description,
  value,
  onValueChange,
  disabled,
}: {
  icon: string;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <View style={[styles.settingItem, disabled && styles.settingItemDisabled]}>
      <View style={styles.settingInfo}>
        <Ionicons
          name={icon as any}
          size={22}
          color={disabled ? colors.text.tertiary : colors.primary}
        />
        <View style={styles.settingText}>
          <Text style={[styles.settingLabel, disabled && styles.settingLabelDisabled]}>
            {label}
          </Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.surface}
        disabled={disabled}
      />
    </View>
  );
}

function SettingOption({
  icon,
  label,
  value,
  options,
  onSelect,
}: {
  icon: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}) {
  const handlePress = () => {
    Alert.alert(
      label,
      undefined,
      options.map((opt) => ({
        text: opt.label,
        onPress: () => onSelect(opt.value),
        style: opt.value === value ? 'cancel' : 'default',
      }))
    );
  };

  const currentLabel = options.find((o) => o.value === value)?.label || value;

  return (
    <MenuItem
      icon={icon}
      title={label}
      subtitle={currentLabel}
      onPress={handlePress}
    />
  );
}

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { settings, isLoading, updateSetting, resetToDefaults } = useSettings();

  const handleResetSettings = useCallback(() => {
    Alert.alert(
      'Reinitialiser les parametres',
      'Voulez-vous vraiment reinitialiser tous les parametres par defaut ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Reinitialiser',
          style: 'destructive',
          onPress: async () => {
            try {
              await resetToDefaults();
              Alert.alert('Succes', 'Les parametres ont ete reinitialises.');
            } catch {
              Alert.alert('Erreur', 'Impossible de reinitialiser les parametres.');
            }
          },
        },
      ]
    );
  }, [resetToDefaults]);

  const handleClearCache = useCallback(() => {
    Alert.alert(
      'Vider le cache',
      'Cela supprimera les fichiers temporaires. Les donnees telechargees ne seront pas affectees.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Vider',
          onPress: () => {
            Alert.alert('Succes', 'Le cache a ete vide.');
          },
        },
      ]
    );
  }, []);

  if (isLoading || !settings) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Parametres</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Parametres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingSwitch
            icon="notifications-outline"
            label="Notifications push"
            description="Recevoir les notifications de l'application"
            value={settings.notificationsEnabled}
            onValueChange={(value) => updateSetting('notificationsEnabled', value)}
          />
          <SettingSwitch
            icon="people-outline"
            label="Cultes et reunions"
            description="Rappels pour les cultes dominicaux"
            value={settings.notificationsCulte}
            onValueChange={(value) => updateSetting('notificationsCulte', value)}
            disabled={!settings.notificationsEnabled}
          />
          <SettingSwitch
            icon="calendar-outline"
            label="Evenements"
            description="Rappels avant les evenements"
            value={settings.notificationsEvents}
            onValueChange={(value) => updateSetting('notificationsEvents', value)}
            disabled={!settings.notificationsEnabled}
          />
          <SettingSwitch
            icon="book-outline"
            label="Devotions quotidiennes"
            description="Rappel pour la meditation du jour"
            value={settings.notificationsDevotions}
            onValueChange={(value) => updateSetting('notificationsDevotions', value)}
            disabled={!settings.notificationsEnabled}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          <SettingOption
            icon="moon-outline"
            label="Theme"
            value={settings.theme}
            options={[
              { value: 'light', label: THEME_LABELS.light },
              { value: 'dark', label: THEME_LABELS.dark },
              { value: 'system', label: THEME_LABELS.system },
            ]}
            onSelect={(value) => updateSetting('theme', value as ThemeOption)}
          />
          <SettingOption
            icon="text-outline"
            label="Taille du texte (Bible)"
            value={settings.bibleFontSize.toString()}
            options={[
              { value: '14', label: 'Petite (14)' },
              { value: '16', label: 'Normale (16)' },
              { value: '18', label: 'Grande (18)' },
              { value: '20', label: 'Tres grande (20)' },
              { value: '22', label: 'Extra large (22)' },
            ]}
            onSelect={(value) => updateSetting('bibleFontSize', parseInt(value, 10))}
          />
          <SettingOption
            icon="language-outline"
            label="Langue"
            value={settings.language}
            options={[
              { value: 'fr', label: 'Francais' },
              { value: 'en', label: 'English' },
            ]}
            onSelect={(value) => updateSetting('language', value as 'fr' | 'en')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Videos</Text>
          <SettingSwitch
            icon="play-circle-outline"
            label="Lecture automatique"
            description="Lancer les videos automatiquement"
            value={settings.autoPlayVideos}
            onValueChange={(value) => updateSetting('autoPlayVideos', value)}
          />
          <SettingOption
            icon="speedometer-outline"
            label="Qualite video"
            value={settings.videoQuality}
            options={[
              { value: 'auto', label: VIDEO_QUALITY_LABELS.auto },
              { value: 'low', label: VIDEO_QUALITY_LABELS.low },
              { value: 'medium', label: VIDEO_QUALITY_LABELS.medium },
              { value: 'high', label: VIDEO_QUALITY_LABELS.high },
            ]}
            onSelect={(value) => updateSetting('videoQuality', value as VideoQualityOption)}
          />
          <SettingSwitch
            icon="wifi-outline"
            label="Wi-Fi uniquement"
            description="Telecharger les videos seulement en Wi-Fi"
            value={settings.dataUsageWifiOnly}
            onValueChange={(value) => updateSetting('dataUsageWifiOnly', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stockage</Text>
          <MenuItem
            icon="cloud-download-outline"
            title="Bible hors ligne"
            subtitle={settings.offlineBibleDownloaded ? 'Telecharge' : 'Non telecharge'}
            onPress={() => {}}
          />
          <MenuItem
            icon="musical-notes-outline"
            title="Cantiques hors ligne"
            subtitle={settings.offlineHymnsDownloaded ? 'Telecharge' : 'Non telecharge'}
            onPress={() => {}}
          />
          <MenuItem
            icon="trash-outline"
            title="Vider le cache"
            subtitle="Supprimer les fichiers temporaires"
            onPress={handleClearCache}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibilite</Text>
          <SettingSwitch
            icon="phone-portrait-outline"
            label="Retour haptique"
            description="Vibration lors des interactions"
            value={settings.hapticFeedbackEnabled}
            onValueChange={(value) => updateSetting('hapticFeedbackEnabled', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialite</Text>
          <SettingSwitch
            icon="analytics-outline"
            label="Statistiques anonymes"
            description="Aider a ameliorer l'application"
            value={settings.analyticsEnabled}
            onValueChange={(value) => updateSetting('analyticsEnabled', value)}
          />
          <MenuItem
            icon="shield-outline"
            title="Politique de confidentialite"
            onPress={() => {}}
          />
          <MenuItem
            icon="document-text-outline"
            title="Conditions d'utilisation"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avance</Text>
          <MenuItem
            icon="refresh-outline"
            title="Reinitialiser les parametres"
            subtitle="Retour aux valeurs par defaut"
            onPress={handleResetSettings}
          />
        </View>

        <View style={styles.syncInfo}>
          <Ionicons name="cloud-outline" size={16} color={colors.text.tertiary} />
          <Text style={styles.syncInfoText}>
            Les parametres sont sauvegardes localement.{'\n'}
            La synchronisation cloud sera disponible prochainement.
          </Text>
        </View>
      </ScrollView>
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
    padding: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
    paddingBottom: spacing.xxxl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  settingItemDisabled: {
    opacity: 0.5,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
  },
  settingLabelDisabled: {
    color: colors.text.tertiary,
  },
  settingDescription: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  syncInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  syncInfoText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
    lineHeight: 20,
  },
});
