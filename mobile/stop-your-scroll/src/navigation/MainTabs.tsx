import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { PlanMgmtScreen } from '../screens/PlanMgmtScreen';
import { JourneyScreen } from '../screens/JourneyScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { Dock, DockId } from '../design-system/components/Dock';
import { tokens } from '../design-system/tokens';
import { RootStackParamList } from './types';

export function MainTabsWrapper() {
  const [activeTab, setActiveTab] = React.useState<DockId>('plan');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'plan' && <DashboardScreen />}
        {activeTab === 'gestion' && <PlanMgmtScreen navigation={navigation} />}
        {activeTab === 'parcours' && <JourneyScreen />}
        {activeTab === 'compte' && <AccountScreen navigation={navigation} />}
      </View>
      <Dock active={activeTab} onChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.color.surface },
  content: { flex: 1 },
});
