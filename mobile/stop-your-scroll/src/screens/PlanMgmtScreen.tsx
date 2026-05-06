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
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.title}>{t('plan.weekLabel')}</Text>
        </View>

        {/* Calendar */}
        <View style={s.section}>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {/* Day headers */}
            <View style={s.dayHeaderBar}>
              <View style={{ width: 30 }} />
              {days.map((d, i) => (
                <Text key={i} style={[s.dayHeader, { color: i === 2 ? tokens.color.fg : tokens.color.faint, fontWeight: i === 2 ? '600' : '400' }]}>
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
                            <Text style={[s.eventLabel, { color: ev.current ? tokens.color.ink : tokens.color.fg }]} numberOfLines={2}>
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
        <View style={{ paddingHorizontal: 22, paddingTop: 18 }}>
          <Eye>{t('plan.habitsOn')}</Eye>
          {habits.map((h, i) => (
            <Pressable key={i} onPress={() => navigation.navigate('HabitDetail')} style={s.habitRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.habitTitle}>{h.title}</Text>
                <Text style={s.habitSched}>{h.sched}</Text>
              </View>
              <Text style={s.chevron}>›</Text>
            </Pressable>
          ))}
        </View>

        {/* Apps bloquées */}
        <View style={{ paddingHorizontal: 22, paddingTop: 22 }}>
          <Eye>{t('habit.appsBlocked')}</Eye>
          <Pressable onPress={() => navigation.navigate('BlockedApps')} style={s.categoryRow}>
            <View style={s.categoryBadge}>
              <Text style={s.categoryIcon}>📱</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.habitTitle}>{t('plan.appsCategory')}</Text>
              <Text style={s.habitSched}>Instagram, TikTok, Snapchat</Text>
            </View>
            <Text style={s.chevron}>›</Text>
          </Pressable>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      <View style={s.bottomCta}>
        <Button label={t('plan.editPlan')} variant="primary" fullWidth />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  header: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 8 },
  title: { fontFamily: tokens.font.sans, fontSize: 24, letterSpacing: -0.4, color: tokens.color.fg, fontWeight: '600' },
  section: { paddingHorizontal: 16, paddingTop: 14 },
  dayHeaderBar: {
    flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8,
    borderBottomWidth: tokens.border.hairline, borderBottomColor: tokens.color.line,
  },
  dayHeader: { flex: 1, textAlign: 'center', fontFamily: tokens.font.sans, fontSize: 10 },
  timeLabel: { fontFamily: tokens.font.sans, fontSize: 8.5, color: tokens.color.faint },
  gridLine: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth, backgroundColor: tokens.color.line },
  event: { position: 'absolute', left: 1, right: 1, borderRadius: 4, paddingHorizontal: 3, paddingVertical: 3 },
  eventLabel: { fontFamily: tokens.font.sans, fontSize: 8, fontStyle: 'italic' },
  habitRow: {
    paddingVertical: 12, borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  habitTitle: { fontFamily: tokens.font.sans, fontSize: 13.5, color: tokens.color.fg },
  habitSched: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint, marginTop: 2 },
  chevron: { color: tokens.color.faint, fontSize: 16, lineHeight: 18 },
  categoryRow: {
    paddingVertical: 12, borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  categoryBadge: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#2A2722', alignItems: 'center', justifyContent: 'center' },
  categoryIcon: { fontSize: 16 },
  bottomCta: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
});
