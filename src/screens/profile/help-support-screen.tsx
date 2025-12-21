import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { colors, spacing, fontSize, fontFamily, borderRadius } from '../../constants/theme';

interface HelpSupportScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HelpSupport'>;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Comment puis-je accéder aux cantiques hors ligne ?',
    answer: 'Les cantiques sont disponibles hors ligne une fois téléchargés. Allez dans Paramètres > Téléchargements pour gérer vos fichiers hors ligne.',
  },
  {
    id: '2',
    question: 'Comment activer les notifications de rappel ?',
    answer: 'Allez dans Paramètres > Notifications et activez "Rappels d\'événements" pour recevoir des notifications avant chaque événement.',
  },
  {
    id: '3',
    question: 'Comment modifier mes informations de profil ?',
    answer: 'Depuis l\'écran Profil, appuyez sur "Modifier le profil" pour mettre à jour votre nom, photo et autres informations.',
  },
  {
    id: '4',
    question: 'Comment rejoindre une cellule de prière ?',
    answer: 'Consultez la section "Ma Cellule" dans votre profil pour voir les cellules disponibles et en rejoindre une près de chez vous.',
  },
  {
    id: '5',
    question: 'Comment faire un don à l\'église ?',
    answer: 'Allez dans "Mes Dons" depuis votre profil pour voir les options de don disponibles (Mobile Money, virement bancaire, etc.).',
  },
];

export function HelpSupportScreen({ navigation }: HelpSupportScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const contactSupport = (method: 'whatsapp' | 'email' | 'call') => {
    switch (method) {
      case 'whatsapp':
        Linking.openURL('https://wa.me/22670000000');
        break;
      case 'email':
        Linking.openURL('mailto:support@eesimzogona.org?subject=Aide%20Application');
        break;
      case 'call':
        Linking.openURL('tel:+22670000000');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aide & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Besoin d'aide ?</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => contactSupport('whatsapp')}
              activeOpacity={0.7}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="logo-whatsapp" size={24} color="#25d366" />
              </View>
              <Text style={styles.contactLabel}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => contactSupport('email')}
              activeOpacity={0.7}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#dbeafe' }]}>
                <Ionicons name="mail" size={24} color="#2563eb" />
              </View>
              <Text style={styles.contactLabel}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => contactSupport('call')}
              activeOpacity={0.7}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#fef3c7' }]}>
                <Ionicons name="call" size={24} color="#d97706" />
              </View>
              <Text style={styles.contactLabel}>Appeler</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          {faqData.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleFAQ(faq.id)}
              activeOpacity={0.8}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.text.secondary}
                />
              </View>
              {expandedId === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ressources</Text>
          <TouchableOpacity style={styles.resourceItem} activeOpacity={0.7}>
            <View style={[styles.resourceIcon, { backgroundColor: '#ede9fe' }]}>
              <Ionicons name="book-outline" size={20} color="#7c3aed" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Guide d'utilisation</Text>
              <Text style={styles.resourceSubtitle}>Apprenez à utiliser l'application</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem} activeOpacity={0.7}>
            <View style={[styles.resourceIcon, { backgroundColor: '#fce7f3' }]}>
              <Ionicons name="videocam-outline" size={20} color="#db2777" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Tutoriels vidéo</Text>
              <Text style={styles.resourceSubtitle}>Regardez nos guides vidéo</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem} activeOpacity={0.7}>
            <View style={[styles.resourceIcon, { backgroundColor: '#cffafe' }]}>
              <Ionicons name="chatbubbles-outline" size={20} color="#0891b2" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Forum communautaire</Text>
              <Text style={styles.resourceSubtitle}>Échangez avec d'autres membres</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Report Issue */}
        <TouchableOpacity style={styles.reportButton} activeOpacity={0.8}>
          <Ionicons name="bug-outline" size={20} color={colors.primary} />
          <Text style={styles.reportText}>Signaler un problème</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    color: colors.text.primary,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
  },
  contactGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  contactCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  contactIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  faqItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  faqQuestion: {
    flex: 1,
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  faqAnswer: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: 22,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  resourceIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },
  resourceSubtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
    marginTop: 2,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  reportText: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },
});
