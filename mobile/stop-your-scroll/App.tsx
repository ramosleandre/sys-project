import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import './src/i18n';
import { RootNavigator } from './src/navigation/RootNavigator';
import './src/design-system/global.css';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Regular.ttf'),
    KronaOne: require('./assets/fonts/KronaOne-Regular.ttf'),
    'Fraunces-Italic': require('./assets/fonts/Fraunces-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#EFEAE0" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#0A0907',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
