import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { PlanMgmtScreen } from '../screens/PlanMgmtScreen';
import { JourneyScreen } from '../screens/JourneyScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { Dock, DockId } from '../design-system/components/Dock';
import { RootStackParamList } from './types';

export function MainTabsWrapper() {
  const [activeTab, setActiveTab] = React.useState<DockId>('plan');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 bg-surface">
      <View className="flex-1">
        {activeTab === 'plan' && <DashboardScreen />}
        {activeTab === 'gestion' && <PlanMgmtScreen navigation={navigation} />}
        {activeTab === 'parcours' && <JourneyScreen />}
        {activeTab === 'compte' && <AccountScreen navigation={navigation} />}
      </View>
      <Dock active={activeTab} onChange={setActiveTab} />
    </View>
  );
}
