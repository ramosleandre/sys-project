import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Numeric } from '../design-system/components/Numeric';
import { Button } from '../design-system/components/Button';

export function PrepBlockScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [s, setS] = useState(523);

  useEffect(() => {
    const id = setInterval(() => setS(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = Math.floor(s / 60);
  const ss = s % 60;
  const pct = 1 - s / 600;
  const r = 118;
  const circumference = 2 * Math.PI * r;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-5">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center gap-[10px]">
          <Text className="text-[18px] leading-5 text-sub">‹</Text>
          <Text className="font-sans text-[11px] font-medium text-sub" style={{ letterSpacing: 2 }}>
            {t('prep.kicker').toUpperCase()}
          </Text>
        </Pressable>
        <Text className="font-sans text-[11px] text-faint" style={{ letterSpacing: 0.4 }}>20:50 — 23:20</Text>
      </View>

      {/* Center */}
      <View className="flex-1 items-center justify-center gap-[26px] px-8">
        {/* Ring */}
        <View className="h-[240px] w-[240px]">
          <Svg width={240} height={240} viewBox="0 0 240 240">
            <SvgCircle cx={120} cy={120} r={r} fill="none" stroke={tokens.color.line} strokeWidth={0.75} />
            <SvgCircle
              cx={120} cy={120} r={r} fill="none"
              stroke={tokens.color.primary} strokeWidth={0.75}
              strokeDasharray={`${pct * circumference} ${circumference}`}
              rotation={-90}
              origin="120,120"
            />
          </Svg>
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
            <Text className="font-sans text-[10px] text-faint" style={{ letterSpacing: 2.5 }}>
              {t('prep.beforeBlock').toUpperCase()}
            </Text>
            <Numeric size={56} style={{ marginTop: 8 }}>
              {mm}:{String(ss).padStart(2, '0')}
            </Numeric>
            <Text className="mt-[6px] font-sans text-[11px] text-faint" style={{ letterSpacing: 0.3 }}>
              {t('prep.appsCount')}
            </Text>
          </View>
        </View>

        {/* Message */}
        <View className="max-w-[280px] items-center">
          <Text className="text-center font-sans text-[22px] leading-[27.5px] text-fg" style={{ letterSpacing: -0.3 }}>
            {t('prep.heroLine1')}{'\n'}{t('prep.heroLine2')}
          </Text>
          <Text className="mt-2 text-center font-sans text-[13px] leading-[19.5px] text-sub">
            {t('prep.silentIn')} {mm}:{String(ss).padStart(2, '0')}.
          </Text>
        </View>

        <Button
          label={t('prep.cantTonight')}
          variant="ghost"
          className="rounded-full px-[22px]"
        />
      </View>

      {/* Footer */}
      <Text className="px-6 pb-7 text-center font-sans text-[10.5px] text-faint" style={{ letterSpacing: 0.3 }}>
        {t('prep.cantCancel')}
      </Text>
    </SafeAreaView>
  );
}
