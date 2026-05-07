import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Button } from '../design-system/components/Button';
import { Numeric } from '../design-system/components/Numeric';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string, p?: any) => void };
};

function Tag({ label }: { label: string }) {
  return (
    <View className="self-start rounded-[10px] border-[0.5px] border-lineStrong bg-fill px-[14px] py-2">
      <Text className="font-sans text-[13px] text-fg">{label}</Text>
    </View>
  );
}

export function EditPlanScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [habits, setHabits] = useState([
    { name: t('habit.readingFull'), active: true },
    { name: t('habit.walkingFull'), active: true },
  ]);
  const [weeks, setWeeks] = useState(10);
  const [categories, setCategories] = useState([
    { name: t('plan.categorySocial'), apps: 'Instagram, TikTok, Snapchat', current: '6.8 h', target: '4.4 h' },
  ]);

  const addHabit = () => setHabits(h => [...h, { name: `Habitude ${h.length + 1}`, active: true }]);
  const removeHabit = (idx: number) => setHabits(h => h.filter((_, i) => i !== idx));

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <View className="px-[18px] py-3">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center gap-[10px]">
          <Text className="text-[18px] leading-5 text-sub">‹</Text>
          <Text className="font-sans text-[11px] font-medium text-sub" style={{ letterSpacing: 2 }}>MODIFIER LE PLAN</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* Eye label */}
        <View className="px-[22px] pb-[10px]">
          <Eye>Objectif temps d'écran</Eye>
        </View>

        {/* Each category = its own card */}
        {categories.map((cat, ci) => (
          <View key={ci} className="px-4 pb-[14px]">
            <Card>
              <View className="flex-row items-center justify-between">
                <View className="gap-[6px]">
                  <Text className="font-sans text-[9.5px] font-medium text-faint" style={{ letterSpacing: 1.2 }}>ACTUEL</Text>
                  <Tag label={cat.current} />
                </View>
                <View className="items-center px-3">
                  <Svg width={32} height={16} viewBox="0 0 32 16">
                    <Line x1={0} y1={8} x2={26} y2={8} stroke={tokens.color.primary} strokeWidth={1.2} />
                    <Path d="M22 3 L29 8 L22 13" stroke={tokens.color.primary} strokeWidth={1.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
                <View className="items-end gap-[6px]">
                  <Text className="font-sans text-[9.5px] font-medium text-faint" style={{ letterSpacing: 1.2 }}>OBJECTIF</Text>
                  <Tag label={cat.target} />
                </View>
              </View>
              <View className="mt-3 gap-0.5">
                <Text className="font-sans text-[14px] font-medium text-fg">{cat.name}</Text>
                <Text className="font-sans text-[11px] italic text-faint">{cat.apps}</Text>
              </View>
            </Card>
          </View>
        ))}

        {/* Add category — standalone between cards */}
        <View className="px-4 pb-[14px]">
          <Pressable className="mt-4 flex-row items-center gap-2 rounded-xl border-[0.5px] border-dashed border-lineStrong px-[14px] py-[10px]" onPress={() => {
            setCategories(c => [...c, { name: t('plan.categoryGames'), apps: 'Brawl Stars, Clash Royale', current: '2.1 h', target: '1.0 h' }]);
          }}>
            <Text className="font-sans text-[16px] text-sub">+</Text>
            <Text className="font-sans text-[13px] text-sub">{t('plan.addCategory')}</Text>
          </Pressable>
        </View>

        {/* Duration */}
        <View className="px-4 pb-[14px]">
          <Card>
            <Eye>Durée du programme</Eye>
            <View className="mt-3 flex-row items-center justify-between">
              <Pressable onPress={() => setWeeks(w => Math.max(1, w - 1))} className="h-11 w-11 items-center justify-center rounded-full border-[0.5px] border-lineStrong">
                <Text className="text-[22px] leading-6 text-fg">−</Text>
              </Pressable>
              <View className="items-center">
                <Numeric size={36}>{weeks}</Numeric>
                <Text className="mt-0.5 font-sans text-[12px] text-sub">semaines</Text>
              </View>
              <Pressable onPress={() => setWeeks(w => Math.min(52, w + 1))} className="h-11 w-11 items-center justify-center rounded-full border-[0.5px] border-lineStrong">
                <Text className="text-[22px] leading-6 text-fg">+</Text>
              </Pressable>
            </View>
            <View className="mt-4 h-[3px] overflow-hidden rounded-sm bg-fill">
              <View className="h-[3px] rounded-sm bg-primary" style={{ width: `${(4 / weeks) * 100}%` }} />
            </View>
            <Text className="mt-[6px] font-sans text-[11px] text-faint">Semaine 4 / {weeks}</Text>
          </Card>
        </View>

        {/* Habits */}
        <View className="px-4 pb-[14px]">
          <Card padded={false}>
            <View className="flex-row items-center justify-between px-[18px] pb-2 pt-4">
              <Eye>Habitudes</Eye>
              <Pressable onPress={addHabit} hitSlop={12}>
                <View className="h-[26px] w-[26px] items-center justify-center rounded-full bg-primary"><Text className="text-[16px] font-semibold leading-[18px] text-ink">+</Text></View>
              </Pressable>
            </View>
            {habits.map((h, i) => (
              <View key={i} className="flex-row items-center border-t-[0.5px] border-line px-[18px] py-3">
                <Text className="flex-1 font-sans text-[13.5px] text-fg">{h.name}</Text>
                <Pressable onPress={() => removeHabit(i)} hitSlop={8}>
                  <View className="h-[26px] w-[26px] items-center justify-center rounded-full border-[0.5px] border-warmLine"><Text className="text-[16px] leading-[18px] text-warm">−</Text></View>
                </Pressable>
              </View>
            ))}
          </Card>
        </View>

        {/* Chat assist */}
        <View className="px-4 pb-[14px]">
          <Card padded={false}>
            <Pressable className="flex-row items-center gap-3 px-[18px] py-4" onPress={() => navigation.navigate('HabitChat', { habitName: 'Mon plan' })}>
              <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary"><Text className="font-sans text-[16px] italic text-ink">s</Text></View>
              <View className="flex-1">
                <Text className="font-sans text-[13.5px] text-fg">Besoin d'aide ?</Text>
                <Text className="mt-0.5 font-sans text-[11px] text-faint">Discute avec l'assistant pour ajuster ton plan</Text>
              </View>
              <Text className="text-[16px] text-faint">›</Text>
            </Pressable>
          </Card>
        </View>

        <View className="h-4" />
      </ScrollView>

      <View className="px-4 pb-2 pt-3">
        <Button label="Mettre à jour" variant="primary" fullWidth onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}
