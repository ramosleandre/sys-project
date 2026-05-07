import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Numeric } from '../design-system/components/Numeric';
import { Button } from '../design-system/components/Button';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string) => void };
};

export function OverLimitScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const used = 7.23; // 7h14
  const limit = 6;
  const pct = Math.min(used / limit, 1);
  const r = 90;
  const circ = 2 * Math.PI * r;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Back */}
      <Pressable onPress={() => navigation.goBack()} className="absolute left-5 top-[60px] z-10 h-9 w-9 items-center justify-center rounded-full">
        <Text className="text-[22px] leading-6 text-sub">‹</Text>
      </Pressable>

      {/* Center block */}
      <View className="flex-1 items-center justify-center gap-5 px-8">
        {/* Ring gauge — over limit = warm */}
        <View className="h-[200px] w-[200px]">
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <SvgCircle cx={100} cy={100} r={r} fill="none" stroke={tokens.color.line} strokeWidth={3} />
            <SvgCircle
              cx={100} cy={100} r={r} fill="none"
              stroke={tokens.color.warm} strokeWidth={3}
              strokeDasharray={`${pct * circ} ${circ}`}
              strokeLinecap="round"
              rotation={-90} origin="100,100"
            />
          </Svg>
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
            <Numeric size={42} color={tokens.color.warm}>7h14</Numeric>
            <Text className="mt-0.5 font-sans text-[14px] text-faint">/ {limit}h</Text>
          </View>
        </View>

        {/* Message */}
        <Text className="text-center font-sans text-[22px] font-medium text-fg" style={{ letterSpacing: -0.4 }}>
          {t('over.heroLine1')}
        </Text>
        <Text className="max-w-[300px] text-center font-sans text-[13px] leading-[20.15px] text-sub">
          {t('over.body')}
        </Text>

        {/* Single stat */}
        <View className="mt-1 flex-row items-center rounded-[14px] border-[0.5px] border-line px-[6px] py-[14px]">
          <View className="flex-1 items-center gap-1">
            <Text className="font-sans text-[10px] uppercase text-faint" style={{ letterSpacing: 1 }}>{t('over.in1y')}</Text>
            <Text className="font-sans text-[16px] font-semibold text-warm">10 j</Text>
          </View>
          <View className="h-7 w-[0.5px] bg-line" />
          <View className="flex-1 items-center gap-1">
            <Text className="font-sans text-[10px] uppercase text-faint" style={{ letterSpacing: 1 }}>{t('over.in5y')}</Text>
            <Text className="font-sans text-[16px] font-semibold text-warm">52 j</Text>
          </View>
          <View className="h-7 w-[0.5px] bg-line" />
          <View className="flex-1 items-center gap-1">
            <Text className="font-sans text-[10px] uppercase text-faint" style={{ letterSpacing: 1 }}>{t('over.in10y')}</Text>
            <Text className="font-sans text-[16px] font-semibold text-warm">104 j</Text>
          </View>
        </View>

        {/* Lost time warning */}
        <Text className="max-w-[280px] text-center font-sans text-[12px] italic leading-[18.6px] text-faint">
          {t('over.lossDetail')}
        </Text>
      </View>

      {/* Bottom */}
      <View className="gap-3 px-6 pb-7 pt-3">
        <Button
          label={t('over.accept')}
          variant="primary"
          fullWidth
          onPress={() => navigation.goBack()}
        />
        <Pressable onPress={() => navigation.navigate('Unblock')} className="items-center py-[13px]">
          <Text className="font-sans text-[13px] text-warm" style={{ letterSpacing: 0.2 }}>{t('over.emergency')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
