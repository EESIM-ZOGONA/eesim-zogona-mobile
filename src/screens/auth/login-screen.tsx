import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function LoginScreen({ navigation }: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('70 12 34 56');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!phone.trim()) {
      setError('Veuillez entrer votre numéro de téléphone');
      return;
    }

    if (phone.length < 8) {
      setError('Numéro de téléphone invalide');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(phone);
      navigation.navigate('Otp', { phone });
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient - Full screen with fade to white */}
      <LinearGradient
        colors={['#030a7f', '#020866', '#1a1f6e', '#4a4e99', '#9a9cc4', '#ffffff', '#ffffff']}
        locations={[0, 0.15, 0.3, 0.45, 0.55, 0.65, 1]}
        style={styles.backgroundGradient}
      />

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerContent}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>
              Accédez à votre espace EE/SIM Zogona
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.phoneField}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇧🇫</Text>
                <Text style={styles.codeText}>+226</Text>
              </View>
              <View style={styles.divider} />
              <TextInput
                style={styles.phoneInput}
                placeholder="70 00 00 00"
                placeholderTextColor={colors.text.tertiary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={loading}
            >
              <LinearGradient
                colors={['#030a7f', '#020866']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                <Text style={styles.submitText}>
                  {loading ? 'Envoi en cours...' : 'Continuer'}
                </Text>
                {!loading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
              <Text style={styles.infoText}>Connexion sécurisée par SMS</Text>
            </View>
          </View>

          {/* Terms */}
          <Text style={styles.terms}>
            En continuant, vous acceptez nos{' '}
            <Text style={styles.termsLink}>Conditions</Text> et{' '}
            <Text style={styles.termsLink}>Politique de confidentialité</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.65,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },

  // Back Button
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },

  // Header
  headerContent: {
    alignItems: 'center',
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxxl,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },

  // Form Card
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  phoneField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    height: 60,
    marginBottom: spacing.lg,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.xl,
    paddingRight: spacing.md,
  },
  flag: {
    fontSize: 22,
  },
  codeText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.xl,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  errorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.error,
    marginBottom: spacing.md,
    marginLeft: spacing.md,
  },
  submitButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 60,
  },
  submitText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text.secondary,
  },

  // Terms
  terms: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingVertical: spacing.xxl,
  },
  termsLink: {
    color: colors.primary,
    fontFamily: fontFamily.semibold,
  },
});
