import React, { useCallback } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Card } from '../design-system/components/Card';
import { HoldButton } from '../design-system/components/HoldButton';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Unblock'>;
};

export function UnblockScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const options = [
    'x = (e+3) / (e−1)',
    'x = (e−3) / (e−1)',
    'x = (e+3) / (e+1)',
    'x = e − 4',
  ];

  const onComplete = useCallback(() => {
    Alert.alert('Unlocked', 'App unblocked for this session.');
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="flex-row justify-between px-6 pt-5">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center gap-[10px]">
          <Text className="text-[18px] leading-5 text-sub">‹</Text>
          <Text className="font-sans text-[11px] font-medium text-warm" style={{ letterSpacing: 2 }}>
            {t('unblock.kicker').toUpperCase()}
          </Text>
        </Pressable>
        <Text className="font-sans text-[11px] text-faint" style={{ letterSpacing: 0.3 }}>
          {t('unblock.step')}
        </Text>
      </View>

      {/* Problem */}
      <View className="px-[26px] pt-6">
        <Text className="font-sans text-[10.5px] font-medium text-faint" style={{ letterSpacing: 1.6 }}>
          {t('unblock.problem').toUpperCase()}
        </Text>
        <Text className="mt-[10px] font-sans text-[26px] leading-[32.5px] text-fg" style={{ letterSpacing: -0.3 }}>
          {t('unblock.solveFor')}
        </Text>

        <Card className="mt-4 items-center px-[18px] py-[22px]">
          <Text className="text-center font-sans text-[28px] italic text-fg" style={{ letterSpacing: -0.2 }}>
            ln(x + 3) {'−'} ln(x {'−'} 1) = 1
          </Text>
        </Card>

        {/* Options grid */}
        <View className="mt-5 flex-row flex-wrap gap-[10px]">
          {options.map((opt, i) => (
            <View
              key={i}
              className={`w-[48%] items-center rounded-xl border-[0.5px] px-3 py-4 ${i === 0 ? 'border-primary bg-[rgba(239,234,224,0.04)]' : 'border-line'}`}
            >
              <Text className="font-sans text-[13px] italic" style={{ color: i === 0 ? tokens.color.fg : tokens.color.sub, letterSpacing: 0.1 }}>
                {opt}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex-1" />

      {/* Hold to unlock */}
      <View className="px-6 pb-7">
        <Text className="mb-[10px] font-sans text-[10.5px] font-medium text-faint" style={{ letterSpacing: 1.6 }}>
          {t('unblock.holdTitle').toUpperCase()}
        </Text>
        <HoldButton
          durationMs={60000}
          idleLabel={t('unblock.holdHint')}
          holdingLabel={`${t('unblock.holding')} · {s}s`}
          onComplete={onComplete}
        />
        <Text className="mt-3 text-center font-sans text-[11px] text-faint" style={{ letterSpacing: 0.2 }}>
          {t('unblock.releaseWarn')}
        </Text>
      </View>
    </SafeAreaView>
  );
}
