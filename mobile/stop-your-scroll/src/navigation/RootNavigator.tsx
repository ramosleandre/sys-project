import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { LoginScreen } from '../screens/LoginScreen';
import { OnboardingChatScreen } from '../screens/OnboardingChatScreen';
import { MainTabsWrapper } from './MainTabs';
import { HabitDetailScreen } from '../screens/HabitDetailScreen';
import { PrepBlockScreen } from '../screens/PrepBlockScreen';
import { OverLimitScreen } from '../screens/OverLimitScreen';
import { UnblockScreen } from '../screens/UnblockScreen';
import { HabitChatScreen } from '../screens/HabitChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0907' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="OnboardingChat"
        component={OnboardingChatScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen name="Main" component={MainTabsWrapper} />
      <Stack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="PrepBlock"
        component={PrepBlockScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="OverLimit"
        component={OverLimitScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="Unblock"
        component={UnblockScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="HabitChat"
        component={HabitChatScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
