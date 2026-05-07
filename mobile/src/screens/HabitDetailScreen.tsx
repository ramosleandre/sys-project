import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Numeric } from '../design-system/components/Numeric';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string, p?: any) => void };
};

function PenIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke={tokens.color.sub} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function Pill({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className={`rounded-full border-[0.5px] px-[14px] py-2 ${active ? 'border-primary bg-primary' : 'border-lineStrong bg-transparent'}`}>
      <Text className={`font-sans text-[12.5px] ${active ? 'text-ink' : 'text-fg'}`}>{label}</Text>
    </Pressable>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View className="rounded-[10px] border-[0.5px] border-lineStrong bg-fill px-[14px] py-2">
      <Text className="font-sans text-[13px] text-fg">{label}</Text>
    </View>
  );
}

export function HabitDetailScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [habitName, setHabitName] = useState(t('habit.readingFull'));
  const [isEditingName, setIsEditingName] = useState(false);
  const [startDay, setStartDay] = useState('Lun');
  const [endDay, setEndDay] = useState('Dim');

  const allDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const stats = [
    [t('habitDetail.kept'), '11 / 14'],
    [t('habitDetail.streak'), t('habitDetail.streakDays')],
    [t('habitDetail.avg'), t('habitDetail.avgVal')],
  ];

  const suggestions = [
    t('habitDetail.opt1'),
    t('habitDetail.opt2'),
    t('habitDetail.opt3'),
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <View className="flex-row items-center justify-between px-[18px] py-3">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center gap-[10px]">
          <Text className="text-[18px] leading-5 text-sub">‹</Text>
          <Text className="font-sans text-[11px] font-medium text-sub" style={{ letterSpacing: 2 }}>{t('habitDetail.title').toUpperCase()}</Text>
        </Pressable>
        <Pressable onPress={() => setIsEditingName(!isEditingName)} hitSlop={12}>
          <PenIcon />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View className="px-[22px] pb-[10px] pt-[6px]">
          {isEditingName ? (
            <TextInput
              className="border-b border-lineStrong p-0 pb-1 font-sans text-[28px] italic leading-[30.8px] text-fg"
              style={{ letterSpacing: -0.5 }}
              value={habitName}
              onChangeText={setHabitName}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <Text className="font-sans text-[28px] italic leading-[30.8px] text-fg" style={{ letterSpacing: -0.5 }}>{habitName}</Text>
          )}
        </View>

        {/* Days pills */}
        <View className="gap-4 px-[22px] pb-1">
          <View className="gap-2">
            <Text className="font-sans text-[10px] font-medium text-faint" style={{ letterSpacing: 1.4 }}>JOURS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-[6px]">
              {allDays.map(d => (
                <Pill
                  key={d}
                  label={d}
                  active={allDays.indexOf(d) >= allDays.indexOf(startDay) && allDays.indexOf(d) <= allDays.indexOf(endDay)}
                  onPress={() => {
                    if (allDays.indexOf(d) < allDays.indexOf(startDay)) setStartDay(d);
                    else setEndDay(d);
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Horaire + Apps coupées + Préparation — compact row */}
          <View className="flex-row flex-wrap gap-4">
            <View className="gap-[6px]">
              <Text className="font-sans text-[10px] font-medium text-faint" style={{ letterSpacing: 1.4 }}>HORAIRE</Text>
              <View className="flex-row items-center gap-[6px]">
                <Tag label="20:50" />
                <Text className="font-sans text-[13px] text-faint">→</Text>
                <Tag label="23:20" />
              </View>
            </View>
            <View className="gap-[6px]">
              <Text className="font-sans text-[10px] font-medium text-faint" style={{ letterSpacing: 1.4 }}>APPS COUPÉES</Text>
              <Tag label={t('plan.appsCategory')} />
            </View>
            <View className="gap-[6px]">
              <Text className="font-sans text-[10px] font-medium text-faint" style={{ letterSpacing: 1.4 }}>PRÉPARATION</Text>
              <Tag label={t('habitDetail.prepVal')} />
            </View>
          </View>
        </View>

        {/* Separator */}
        <View className="mx-[22px] my-4 h-[0.5px] bg-line" />

        {/* Stats */}
        <View className="flex-row gap-[10px] px-4 pb-3">
          {stats.map(([k, v], i) => (
            <Card key={i} className="flex-1 p-[14px]">
              <Text className="font-sans text-[9.5px] uppercase text-faint" style={{ letterSpacing: 1.4 }}>{k}</Text>
              <Numeric size={20} style={{ marginTop: 8 }}>{v}</Numeric>
            </Card>
          ))}
        </View>

        {/* Too hard */}
        <View className="px-4 pb-3 pt-[6px]">
          <Card padded={false}>
            <View className="px-[18px] pb-1 pt-4">
              <Eye>{t('habitDetail.tooHard')}</Eye>
              <Text className="mt-2 font-sans text-[13px] leading-[20.15px] text-sub">{t('habitDetail.tooHardSub')}</Text>
            </View>
            <View className="gap-[6px] px-[14px] pb-[14px] pt-2">
              {suggestions.map((sg, i) => (
                <Pressable key={i} className="rounded-full border-[0.5px] border-lineStrong bg-fill px-[14px] py-[10px]">
                  <Text className="font-sans text-[12.5px] text-fg" style={{ letterSpacing: 0.1 }}>{sg}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable className="flex-row items-center gap-[10px] border-t-[0.5px] border-line px-4 py-3" onPress={() => navigation.navigate('HabitChat', { habitName })}>
              <View className="h-[22px] w-[22px] items-center justify-center rounded-md bg-primary">
                <Text className="font-sans text-[12px] italic text-ink">s</Text>
              </View>
              <Text className="flex-1 font-sans text-[12.5px] italic text-faint">{t('habitDetail.compose')}</Text>
              <Text className="text-[16px] text-sub">›</Text>
            </Pressable>
          </Card>
        </View>

        <View className="px-[22px] pb-6 pt-[6px]">
          <Text className="border-t-[0.5px] border-line py-3 font-sans text-[12.5px] text-warm">{t('habitDetail.delete')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
