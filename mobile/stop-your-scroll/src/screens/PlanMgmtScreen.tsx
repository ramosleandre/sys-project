import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Button } from '../design-system/components/Button';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type Event = {
  d: number;
  label: string;
  s: number;
  e: number;
  current?: boolean;
};

export function PlanMgmtScreen({ navigation }: Props) {
  const { t } = useTranslation();

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
    { d: 6, label: 'marche', s: 7.25, e: 7.5 },
    { d: 6, label: 'lecture', s: 20.5, e: 23.33 },
  ];

  const top = 18;
  const bot = 24;
  const pct = (h: number) => ((h - top) / (bot - top)) * 100;
  const calH = 260;

  const habits = [
    { title: t('habit.readingFull'), sched: t('plan.scheduleEvening'), struggling: true },
    { title: t('habit.walkingFull'), sched: t('plan.scheduleSat') },
    { title: t('habit.appsBlocked'), sched: t('plan.scheduleApps') },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>{t('plan.title').toUpperCase()}</Text>
            <Text style={styles.title}>{t('plan.weekOf')}</Text>
          </View>
          <View style={styles.addBtn}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.section}>
          <Card style={{ padding: 14, paddingHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', height: calH }}>
              {/* Time labels */}
              <View style={styles.timeCol}>
                {[18, 20, 22, 24].map(h => (
                  <Text key={h} style={styles.timeLabel}>{h}h</Text>
                ))}
              </View>
              {/* Grid */}
              <View style={{ flex: 1 }}>
                {/* Grid lines */}
                {[18, 20, 22, 24].map(h => (
                  <View
                    key={h}
                    style={[styles.gridLine, { top: `${pct(h)}%` }]}
                  />
                ))}
                {/* Days columns */}
                <View style={styles.daysGrid}>
                  {days.map((_, di) => (
                    <View key={di} style={styles.dayCol}>
                      {events
                        .filter(ev => ev.d === di)
                        .map((ev, i) => (
                          <View
                            key={i}
                            style={[
                              styles.event,
                              {
                                top: `${pct(ev.s)}%`,
                                height: `${pct(ev.e) - pct(ev.s)}%`,
                                backgroundColor: ev.current
                                  ? tokens.color.primary
                                  : '#2A2722',
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.eventLabel,
                                { color: ev.current ? tokens.color.ink : tokens.color.fg },
                              ]}
                              numberOfLines={1}
                            >
                              {ev.label}
                            </Text>
                          </View>
                        ))}
                    </View>
                  ))}
                </View>
                {/* Day headers */}
                <View style={styles.dayHeaders}>
                  {days.map((d, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.dayHeader,
                        { color: i === 2 ? tokens.color.fg : tokens.color.faint,
                          fontWeight: i === 2 ? '600' : '400' },
                      ]}
                    >
                      {d}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Habits */}
        <View style={{ paddingHorizontal: 22, paddingTop: 18 }}>
          <Eye action={t('common.edit')} style={{ marginBottom: 10 }}>
            {t('plan.habitsOn')}
          </Eye>
          {habits.map((h, i) => (
            <Pressable
              key={i}
              onPress={() => navigation.navigate('HabitDetail')}
              style={styles.habitRow}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.habitTitle}>{h.title}</Text>
                <Text style={styles.habitSched}>{h.sched}</Text>
              </View>
              {h.struggling && (
                <View style={styles.strugglingPill}>
                  <Text style={styles.strugglingText}>{t('plan.struggling')}</Text>
                </View>
              )}
              <Text style={styles.chevron}>{'\u203A'}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCta}>
        <Button
          label={t('plan.editPlan')}
          variant="primary"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
  },
  title: {
    fontFamily: tokens.font.sans,
    fontSize: 24,
    lineHeight: 24 * 1.1,
    letterSpacing: -0.4,
    color: tokens.color.fg,
    marginTop: 6,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: { color: tokens.color.sub, fontSize: 18, lineHeight: 20 },
  section: { paddingHorizontal: 16, paddingTop: 14 },
  timeCol: {
    width: 22,
    justifyContent: 'space-between',
    paddingBottom: 22,
  },
  timeLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 9,
    color: tokens.color.faint,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: tokens.color.line,
  },
  daysGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 22,
    flexDirection: 'row',
    gap: 3,
  },
  dayCol: { flex: 1, position: 'relative' as const },
  event: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 4,
  },
  eventLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 8.5,
    fontStyle: 'italic',
  },
  dayHeaders: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 3,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
  },
  habitRow: {
    paddingVertical: 12,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  habitTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.fg,
  },
  habitSched: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    marginTop: 2,
  },
  strugglingPill: {
    borderWidth: tokens.border.hairline,
    borderColor: 'rgba(201, 165, 122, 0.35)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  strugglingText: {
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    color: tokens.color.warm,
    fontStyle: 'italic',
  },
  chevron: {
    color: tokens.color.faint,
    fontSize: 16,
    lineHeight: 18,
  },
  bottomCta: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
});
