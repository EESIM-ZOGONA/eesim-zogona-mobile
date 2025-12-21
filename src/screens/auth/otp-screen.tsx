import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../types';
import { OtpInput } from '../../components';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context';

interface OtpScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Otp'>;
  route: RouteProp<RootStackParamList, 'Otp'>;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function OtpScreen({ navigation, route }: OtpScreenProps) {
  const insets = useSafeAreaInsets();
  const { phone } = route.params;
  const [otp, setOtp] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(45);
  const { verifyOtp } = useAuth();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Masquer le numéro pour la sécurité - afficher seulement les 2 derniers chiffres
  const maskedPhone = phone.replace(/\s/g, '').slice(-2);
  const displayPhone = `+226 •• •• •• ${maskedPhone}`;

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Veuillez entrer le code complet');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const success = await verifyOtp(otp);
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        setError('Code incorrect. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(45);
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
            <View style={styles.iconWrap}>
              <Ionicons name="chatbubble-ellipses" size={44} color="#fff" />
            </View>
            <Text style={styles.title}>Vérification SMS</Text>
            <Text style={styles.subtitle}>
              Entrez le code à 6 chiffres envoyé au
            </Text>
            <Text style={styles.phoneDisplay}>{displayPhone}</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* OTP Input */}
            <View style={styles.otpSection}>
              <OtpInput value={otp} onChange={setOtp} length={6} />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            {/* Timer */}
            <View style={styles.timerSection}>
              {resendTimer > 0 ? (
                <Text style={styles.timerText}>
                  Nouveau code disponible dans{' '}
                  <Text style={styles.timerValue}>{formatTime(resendTimer)}</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <View style={styles.resendButton}>
                    <Ionicons name="refresh" size={18} color={colors.primary} />
                    <Text style={styles.resendText}>Renvoyer un nouveau code</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleVerify}
              activeOpacity={0.9}
              disabled={otp.length !== 6 || loading}
            >
              <LinearGradient
                colors={otp.length === 6 ? ['#030a7f', '#020866'] : ['#9ca3af', '#6b7280']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                <Text style={styles.submitText}>
                  {loading ? 'Vérification...' : 'Vérifier'}
                </Text>
                {!loading && <Ionicons name="checkmark" size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color={colors.primary} />
              <Text style={styles.infoText}>Le code expire dans 10 minutes</Text>
            </View>
          </View>

          {/* Help Link */}
          <TouchableOpacity style={styles.helpLink} activeOpacity={0.7}>
            <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.helpText}>Besoin d'aide ?</Text>
          </TouchableOpacity>
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
  iconWrap: {
    width: 90,
    height: 90,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
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
  phoneDisplay: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#fff',
    marginTop: spacing.sm,
    letterSpacing: 1,
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

  // OTP
  otpSection: {
    marginBottom: spacing.lg,
  },
  errorText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  // Timer
  timerSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
  timerValue: {
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
  },
  resendText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },

  // Button
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

  // Help
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
  },
  helpText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
