import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { Polyline } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Bar } from '../design-system/components/Bar';
import { Numeric } from '../design-system/components/Numeric';
import { AppGauge } from '../design-system/components/AppGauge';
import { HabitRow } from '../design-system/components/HabitRow';

export function DashboardScreen() {
  const { t } = useTranslation();

  const apps = [
    { letter: 'i', name: 'Picgram', used: 48, cap: 60, tone: 'a' as const },
    { letter: 't', name: 'Toktik', used: 92, cap: 45, tone: 'b' as const, over: true },
    { letter: 's', name: 'Snapfly', used: 12, cap: 30, tone: 'c' as const },
  ];

  const habits = [
    { name: t('habit.reading'), count: '4 / 5', progress: 0.8, caption: 'hier · 2 h 14' },
    { name: t('habit.walking'), count: '3 / 5', progress: 0.6, caption: "aujourd'hui · 22 min" },
    { name: t('habit.tea'), count: '2 / 7', progress: 0.28, caption: 'lundi' },
  ];

  const weekDots: [string, 'done' | 'today' | 'planned'][] = [
    ['L', 'done'], ['M', 'done'], ['M', 'done'], ['J', 'today'],
    ['V', 'planned'], ['S', 'planned'], ['D', 'planned'],
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.kicker}>{t('dash.kicker').toUpperCase()}</Text>
          <Text style={styles.heroTitle}>
            {t('dash.heroPre')}{'\n'}
            <Text style={styles.heroItalic}>{t('dash.heroValue')}</Text> {t('dash.heroPost')}
          </Text>
        </View>

        {/* Objectif */}
        <View style={styles.section}>
          <Card>
            <Eye action="4 / 7 h">{t('dash.objective')}</Eye>
            <View style={{ marginTop: 12 }}>
              <Bar value={0.57} height={6} />
            </View>
            <View style={styles.weekRow}>
              {weekDots.map(([d, s], i) => (
                <View key={i} style={styles.weekDay}>
                  <View style={[
                    styles.dot,
                    { backgroundColor: s === 'planned' ? '#2A2620' : tokens.color.primary },
                    s === 'today' && styles.dotToday,
                  ]} />
                  <Text style={[
                    styles.dotLabel,
                    { color: s === 'today' ? tokens.color.fg : tokens.color.faint,
                      fontWeight: s === 'today' ? '600' : '400' },
                  ]}>{d}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.objLeft}>
              {t('dash.objLeft1')} <Text style={{ color: tokens.color.fg }}>{t('dash.objLeft2')}</Text> {t('dash.objLeft3')}
            </Text>
          </Card>
        </View>

        {/* Bento row: Temps libéré + Prochain créneau */}
        <View style={styles.bentoRow}>
          <Card style={styles.bentoCard}>
            <Eye>{t('dash.timeFreed')}</Eye>
            <Numeric size={30} style={{ marginTop: 10 }}>32 h</Numeric>
            <Text style={styles.since}>{t('dash.timeFreedSince')}</Text>
            <Svg viewBox="0 0 100 28" width="100%" height={28} style={{ marginTop: 10 }}>
              <Polyline
                points="0,22 14,18 28,20 42,12 56,14 70,8 84,10 100,4"
                fill="none"
                stroke={tokens.color.primary}
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Card>
          <Card style={styles.bentoCard}>
            <Eye>{t('dash.nextSlot')}</Eye>
            <Text style={styles.nextWhen}>{t('dash.nextSlotWhen')}</Text>
            <Numeric size={22} italic style={{ marginTop: 2 }}>20:50</Numeric>
            <Text style={styles.nextAct}>{t('dash.nextSlotAct')}</Text>
            <View style={styles.prepPill}>
              <Text style={styles.prepText}>{t('dash.nextSlotPrep')}</Text>
            </View>
          </Card>
        </View>

        {/* Réseaux sociaux */}
        <View style={styles.section}>
          <Card>
            <Eye action={t('dash.socialsAction')}>{t('dash.socials')}</Eye>
            <View style={{ marginTop: 14, gap: 14 }}>
              {apps.map((a, i) => (
                <AppGauge
                  key={i}
                  {...a}
                  status={a.over ? t('dash.appOver') : t('dash.appUntil')}
                />
              ))}
            </View>
          </Card>
        </View>

        {/* Bonnes habitudes */}
        <View style={[styles.section, { paddingBottom: 22 }]}>
          <Card padded={false}>
            <View style={{ padding: 16, paddingBottom: 8, paddingHorizontal: 18 }}>
              <Eye action={t('common.seeAll')}>{t('dash.habits')}</Eye>
            </View>
            {habits.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.habitCell,
                  i > 0 && { borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line },
                ]}
              >
                <HabitRow {...h} />
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  hero: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 18 },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
  },
  heroTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 28,
    lineHeight: 28 * 1.1,
    letterSpacing: -0.6,
    color: tokens.color.fg,
    marginTop: 10,
  },
  heroItalic: { fontStyle: 'italic' },
  section: { paddingHorizontal: 16, paddingBottom: 12 },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  weekDay: { alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 999 },
  dotToday: {
    shadowColor: tokens.color.fg,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  dotLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  objLeft: {
    marginTop: 14,
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    lineHeight: 13 * 1.5,
  },
  bentoRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  bentoCard: { flex: 1, padding: 16 },
  since: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.sub,
    marginTop: 4,
  },
  nextWhen: {
    fontFamily: tokens.font.sans,
    fontSize: 22,
    lineHeight: 22 * 1.05,
    letterSpacing: -0.4,
    color: tokens.color.fg,
    marginTop: 10,
  },
  nextAct: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.sub,
    fontStyle: 'italic',
    marginTop: 6,
  },
  prepPill: {
    marginTop: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.line,
    borderRadius: 999,
  },
  prepText: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
  },
  habitCell: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
