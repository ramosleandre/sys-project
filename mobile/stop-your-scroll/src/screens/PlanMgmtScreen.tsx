import React, { useRef } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Button } from '../design-system/components/Button';

type Props = {
  navigation: { navigate: (s: string, p?: any) => void };
};

type Event = { d: number; label: string; s: number; e: number; current?: boolean };

export function PlanMgmtScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const calScrollRef = useRef<ScrollView>(null);

  const days = [
    t('days.short.mon'), t('days.short.tue'), t('days.short.wed'),
    t('days.short.thu'), t('days.short.fri'), t('days.short.sat'),
    t('days.short.sun'),
  ];

  const events: Event[] = [
    { d: 0, label: 'lecture', s: 20.83, e: 23.33 },
    { d: 1, label: 'lecture', s: 20.83, e: 23.33 },
    { d: 2, label: 'lecture', s: 21.5, e: 23.33, current: true },
    { d: 3, label: 'lecture', s: 20.83, e: 23.33 },
    { d: 4, label: 'film', s: 22.0, e: 23.5 },
    { d: 5, label: 'lecture', s: 23.0, e: 24.0 },
    { d: 6, label: 'marche', s: 7.25, e: 7.75 },
    { d: 6, label: 'lecture', s: 20.5, e: 23.33 },
  ];

  // Calendar spans 0-24h, each hour = 50px
  const hourH = 50;
  const totalH = 24 * hourH;
  const yForH = (h: number) => h * hourH;
  const hForEvent = (s: number, e: number) => (e - s) * hourH;

  // Auto-scroll to ~18h area on mount
  const onCalLayout = () => {
    calScrollRef.current?.scrollTo({ y: 18 * hourH, animated: false });
  };

  const habits = [
    { title: t('habit.readingFull'), sched: t('plan.scheduleEvening') },
    { title: t('habit.walkingFull'), sched: t('plan.scheduleSat') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-[22px] pb-2 pt-[14px]">
          <Text className="font-sans text-[24px] font-semibold text-fg" style={{ letterSpacing: -0.4 }}>{t('plan.weekLabel')}</Text>
        </View>

        {/* Calendar */}
        <View className="px-4 pt-[14px]">
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {/* Day headers */}
            <View className="flex-row border-b-[0.5px] border-line px-2 py-[10px]">
              <View style={{ width: 30 }} />
              {days.map((d, i) => (
                <Text key={i} className="flex-1 text-center font-sans text-[10px]" style={{ color: i === 2 ? tokens.color.fg : tokens.color.faint, fontWeight: i === 2 ? '600' : '400' }}>
                  {d}
                </Text>
              ))}
            </View>
            {/* Scrollable grid */}
            <ScrollView
              ref={calScrollRef}
              style={{ height: 300 }}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              onLayout={onCalLayout}
            >
              <View style={{ height: totalH, flexDirection: 'row', paddingHorizontal: 8 }}>
                {/* Hour labels */}
                <View style={{ width: 30 }}>
                  {Array.from({ length: 25 }, (_, h) => (
                    h % 2 === 0 ? (
                      <Text key={h} style={[s.timeLabel, { position: 'absolute', top: yForH(h) - 6 }]}>{h}h</Text>
                    ) : null
                  ))}
                </View>
                {/* Grid + events */}
                <View style={{ flex: 1, position: 'relative' }}>
                  {/* Hour lines */}
                  {Array.from({ length: 25 }, (_, h) => (
                    <View key={h} style={[s.gridLine, { top: yForH(h) }]} />
                  ))}
                  {/* Day columns */}
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', gap: 2 }}>
                    {days.map((_, di) => (
                      <View key={di} style={{ flex: 1, position: 'relative' }}>
                        {events.filter(ev => ev.d === di).map((ev, i) => (
                          <View
                            key={i}
                            style={[s.event, {
                              top: yForH(ev.s),
                              height: hForEvent(ev.s, ev.e),
                              backgroundColor: ev.current ? tokens.color.primary : '#2A2722',
                            }]}
                          >
                            <Text className="font-sans text-[8px] italic" style={{ color: ev.current ? tokens.color.ink : tokens.color.fg }} numberOfLines={2}>
                              {ev.label}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          </Card>
        </View>

        {/* Habits */}
        <View className="px-[22px] pt-[18px]">
          <Eye>{t('plan.habitsOn')}</Eye>
          {habits.map((h, i) => (
            <Pressable key={i} onPress={() => navigation.navigate('HabitDetail')} className="flex-row items-center gap-3 border-t-[0.5px] border-line py-3">
              <View className="flex-1">
                <Text className="font-sans text-[13.5px] text-fg">{h.title}</Text>
                <Text className="mt-0.5 font-sans text-[11px] text-faint">{h.sched}</Text>
              </View>
              <Text className="text-[16px] leading-[18px] text-faint">›</Text>
            </Pressable>
          ))}
        </View>

        {/* Catégories */}
        <View className="px-[22px] pt-[22px]">
          <Eye>{t('plan.categories')}</Eye>
          <Pressable className="flex-row items-center gap-3 border-t-[0.5px] border-line py-3">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-toneA"><Text className="text-[16px]">📱</Text></View>
            <View className="flex-1">
              <Text className="font-sans text-[13.5px] text-fg">{t('plan.categorySocial')}</Text>
              <Text className="mt-0.5 font-sans text-[11px] text-faint">Instagram, TikTok, Snapchat</Text>
            </View>
            <Text className="text-[16px] leading-[18px] text-faint">›</Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-3 border-t-[0.5px] border-line py-3">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-toneA"><Text className="text-[16px]">🎮</Text></View>
            <View className="flex-1">
              <Text className="font-sans text-[13.5px] text-fg">{t('plan.categoryGames')}</Text>
              <Text className="mt-0.5 font-sans text-[11px] text-faint">Brawl Stars, Clash Royale</Text>
            </View>
            <Text className="text-[16px] leading-[18px] text-faint">›</Text>
          </Pressable>
        </View>

        <View className="h-6" />
      </ScrollView>

      <View className="px-4 pb-2 pt-3">
        <Button label={t('plan.editPlan')} variant="primary" fullWidth onPress={() => navigation.navigate('EditPlan')} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  timeLabel: { fontFamily: tokens.font.sans, fontSize: 8.5, color: tokens.color.faint },
  gridLine: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth, backgroundColor: tokens.color.line },
  event: { position: 'absolute', left: 1, right: 1, borderRadius: 4, paddingHorizontal: 3, paddingVertical: 3 },
});
