import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SCREENS } from '../constants';
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
  MyLibraryScreen,
  SocialMediaScreen,
} from '../screens/profile';
import { MeditationsScreen, MeditationDetailScreen, MeditationListScreen } from '../screens/meditations';
import { QuizScreen, QuizCategoryScreen, QuizPlayScreen, QuizResultScreen } from '../screens/quiz';
import { BibleScreen, BibleBookScreen, BibleChapterScreen, VerseCompareScreen } from '../screens/bible';
import { NotesScreen, NoteDetailScreen, NoteEditScreen } from '../screens/notes';
import { ReadingPlansScreen, ReadingPlanDetailScreen, ReadingPlanDayScreen, ReadingPlanReaderScreen } from '../screens/reading-plans';
import { TabNavigator } from './tab-navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { hasSeenOnboarding, isAuthenticated } = useAuth();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const initialRoute = !hasSeenOnboarding
    ? SCREENS.ONBOARDING
    : isAuthenticated
    ? SCREENS.MAIN
    : SCREENS.AUTH;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name={SCREENS.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={SCREENS.AUTH} component={LoginScreen} />
        <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREENS.OTP} component={OtpScreen} />
        <Stack.Screen name={SCREENS.MAIN} component={TabNavigator} />
        <Stack.Screen name={SCREENS.HYMN_DETAIL} component={HymnDetailScreen} />
        <Stack.Screen
          name={SCREENS.VIDEO_PLAYER}
          component={VideoPlayerScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name={SCREENS.EVENTS} component={EventsScreen} />
        <Stack.Screen name={SCREENS.EVENT_DETAIL} component={EventDetailScreen} />
        <Stack.Screen name={SCREENS.PROGRAM_DETAIL} component={ProgramDetailScreen} />
        <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
        <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfileScreen} />
        <Stack.Screen name={SCREENS.NOTIFICATIONS} component={NotificationsScreen} />
        <Stack.Screen name={SCREENS.ABOUT} component={AboutScreen} />
        <Stack.Screen name={SCREENS.HELP_SUPPORT} component={HelpSupportScreen} />
        <Stack.Screen name={SCREENS.MY_EVENTS} component={MyEventsScreen} />
        <Stack.Screen name={SCREENS.MY_DONATIONS} component={MyDonationsScreen} />
        <Stack.Screen name={SCREENS.MY_CELL} component={MyCellScreen} />
        <Stack.Screen name={SCREENS.MY_FAVORITES} component={MyFavoritesScreen} />
        <Stack.Screen name={SCREENS.MY_LIBRARY} component={MyLibraryScreen} />
        <Stack.Screen name={SCREENS.SOCIAL_MEDIA} component={SocialMediaScreen} />
        <Stack.Screen name={SCREENS.MEDITATIONS} component={MeditationsScreen} />
        <Stack.Screen name={SCREENS.MEDITATION_LIST} component={MeditationListScreen} />
        <Stack.Screen name={SCREENS.MEDITATION_DETAIL} component={MeditationDetailScreen} />
        <Stack.Screen name={SCREENS.QUIZ} component={QuizScreen} />
        <Stack.Screen name={SCREENS.QUIZ_CATEGORY} component={QuizCategoryScreen} />
        <Stack.Screen name={SCREENS.QUIZ_PLAY} component={QuizPlayScreen} />
        <Stack.Screen name={SCREENS.QUIZ_RESULT} component={QuizResultScreen} />
        <Stack.Screen name={SCREENS.BIBLE} component={BibleScreen} />
        <Stack.Screen name={SCREENS.BIBLE_BOOK} component={BibleBookScreen} />
        <Stack.Screen name={SCREENS.BIBLE_CHAPTER} component={BibleChapterScreen} />
        <Stack.Screen name={SCREENS.VERSE_COMPARE} component={VerseCompareScreen} />
        <Stack.Screen name={SCREENS.NOTES} component={NotesScreen} />
        <Stack.Screen name={SCREENS.NOTE_DETAIL} component={NoteDetailScreen} />
        <Stack.Screen name={SCREENS.NOTE_EDIT} component={NoteEditScreen} />
        <Stack.Screen name={SCREENS.READING_PLANS} component={ReadingPlansScreen} />
        <Stack.Screen name={SCREENS.READING_PLAN_DETAIL} component={ReadingPlanDetailScreen} />
        <Stack.Screen name={SCREENS.READING_PLAN_DAY} component={ReadingPlanDayScreen} />
        <Stack.Screen
          name={SCREENS.READING_PLAN_READER}
          component={ReadingPlanReaderScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
