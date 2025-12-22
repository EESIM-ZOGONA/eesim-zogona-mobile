import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context';

import { SplashScreen } from '../screens/splash';
import { OnboardingScreen } from '../screens/onboarding';
import { LoginScreen, OtpScreen } from '../screens/auth';
import { HymnDetailScreen } from '../screens/hymns';
import { VideoPlayerScreen } from '../screens/tv';
import { EventsScreen, EventDetailScreen } from '../screens/events';
import { ProgramDetailScreen } from '../screens/program';
import {
  SettingsScreen,
  EditProfileScreen,
  NotificationsScreen,
  AboutScreen,
  HelpSupportScreen,
  MyEventsScreen,
  MyDonationsScreen,
  MyCellScreen,
  MyFavoritesScreen,
  SocialMediaScreen,
} from '../screens/profile';
import { MeditationsScreen, MeditationDetailScreen } from '../screens/meditations';
import { QuizScreen, QuizPlayScreen, QuizResultScreen } from '../screens/quiz';
import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { hasSeenOnboarding, isAuthenticated } = useAuth();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const initialRoute = !hasSeenOnboarding
    ? 'Onboarding'
    : isAuthenticated
    ? 'Main'
    : 'Auth';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="HymnDetail" component={HymnDetailScreen} />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="MyEvents" component={MyEventsScreen} />
        <Stack.Screen name="MyDonations" component={MyDonationsScreen} />
        <Stack.Screen name="MyCell" component={MyCellScreen} />
        <Stack.Screen name="MyFavorites" component={MyFavoritesScreen} />
        <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
        <Stack.Screen name="Meditations" component={MeditationsScreen} />
        <Stack.Screen name="MeditationDetail" component={MeditationDetailScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="QuizPlay" component={QuizPlayScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
