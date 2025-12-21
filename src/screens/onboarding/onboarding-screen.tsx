import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Button } from '../../components';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
}

const slides = [
  {
    id: '1',
    title: 'Bienvenue a EESIM Zogona',
    description: 'Rejoignez notre communaute de foi et vivez une experience spirituelle enrichissante.',
    image: require('../../assets/images/church-2.jpeg'),
  },
  {
    id: '2',
    title: 'Cultes et Evenements',
    description: 'Restez informe des cultes, reunions de priere et evenements speciaux de l\'eglise.',
    image: require('../../assets/images/culte.jpg'),
  },
  {
    id: '3',
    title: 'Cantiques et Louanges',
    description: 'Accedez a notre recueil de cantiques et chantez a la gloire de Dieu.',
    image: require('../../assets/images/louange.webp'),
  },
  {
    id: '4',
    title: 'EESIM TV',
    description: 'Regardez nos predications, enseignements et moments de louange en video.',
    image: require('../../assets/images/pasteur.jpg'),
  },
];

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { completeOnboarding } = useAuth();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
      navigation.replace('Auth');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigation.replace('Auth');
  };

  const renderSlide = ({ item }: { item: typeof slides[0] }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        {renderDots()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
          <Button
            title={currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slide: {
    width,
    height,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 10, 127, 0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xxl,
    paddingBottom: 180,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.inverse,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.lg,
    color: colors.text.inverse,
    opacity: 0.9,
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xxl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: spacing.xs,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.text.inverse,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  skipText: {
    fontSize: fontSize.md,
    color: colors.text.inverse,
    fontWeight: fontWeight.medium,
  },
  nextButton: {
    minWidth: 140,
  },
});
