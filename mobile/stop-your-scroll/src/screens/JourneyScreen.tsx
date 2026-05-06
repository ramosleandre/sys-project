import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line, Path, Circle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Bar } from '../design-system/components/Bar';
import { AppTile } from '../design-system/components/AppTile';
import { SegSwitch } from '../design-system/components/SegSwitch';

type JourneyMode = 'evolution' | 'compare';

// ── Evolution sub-page ──
function JourneyEvolution() {
  const { t } = useTranslation();
  const points = [10.4, 10.1, 9.8, 9.6, 9.2, 8.7, 8.5, 8.2, 7.6, 7.4, 7.1, 6.8];
  const max = 11, min = 5;
  const w = 100, h = 60;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map(p => h - ((p - min) / (max - min)) * h);
  const path = points.map((_, i) => `${i === 0 ? 'M' : 'L'}${xs[i].toFixed(2)},${ys[i].toFixed(2)}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  const goalY = h - ((7 - min) / (max - min)) * h;

  const milestones = [
    { date: 'hier', title: 'Soirée sans Toktik', detail: 'envie reprise plus calmement' },
    { date: 'mar.', title: 'Premier livre terminé', detail: 'lecture redevenue naturelle' },
    { date: 'lun.', title: 'Temps libéré visible', detail: 'moins de reprises automatiques' },
    { date: 'dim.', title: 'Nouvelle habitude · marche', detail: 'mise en route le matin' },
  ];

  return (
    <View style={{ paddingBottom: 24 }}>
      {/* Hero */}
      <View style={{ paddingHorizontal: 22, paddingTop: 4, paddingBottom: 18 }}>
        <Text style={evoStyles.heroTitle}>
          {t('journey.heroPre')}{'\n'}
          <Text style={{ fontStyle: 'italic' }}>{t('journey.heroValue')}</Text> {t('journey.heroPost')}
        </Text>
        <Text style={evoStyles.heroSub}>{t('journey.heroSub')}</Text>
      </View>

      {/* Chart */}
      <View style={evoStyles.section}>
        <Card padded={false}>
          <View style={evoStyles.chartHeader}>
            <Eye>{t('journey.chartTitle')}</Eye>
          </View>
          <View style={evoStyles.chartFrame}>
            <Svg
              viewBox={`0 0 ${w} ${h + 14}`}
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              {[0.25, 0.5, 0.75].map((p, i) => (
                <Line key={i} x1={0} x2={w} y1={h * p} y2={h * p} stroke={tokens.color.line} strokeWidth={0.3} />
              ))}
              <Line x1={0} x2={w} y1={goalY} y2={goalY} stroke={tokens.color.warm} strokeWidth={0.4} strokeDasharray="1.2 1.2" />
              <Path d={area} fill="rgba(239,234,224,0.06)" />
              <Path d={path} fill="none" stroke={tokens.color.primary} strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" />
              <Circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r={1.4} fill={tokens.color.primary} />
            </Svg>
            <Text style={evoStyles.goalLabel}>{t('journey.goalLine')}</Text>
          </View>
          <Text style={evoStyles.chartSummary}>12 dernières semaines</Text>
        </Card>
      </View>

      {/* Projection */}
      <View style={evoStyles.section}>
        <Card>
          <Eye>{t('journey.projection')}</Eye>
          <Text style={evoStyles.projTitle}>
            <Text style={{ fontStyle: 'italic' }}>{t('journey.projVal')}</Text> {t('journey.projPost')}
          </Text>
          <Text style={evoStyles.projSub}>{t('journey.projSub')}</Text>
          <View style={evoStyles.projBar}>
            <View style={evoStyles.projTrack}>
              <View style={[evoStyles.projFill, { width: '8.6%' }]} />
            </View>
            <Text style={evoStyles.projLabel}>Le gain commence petit, puis devient visible.</Text>
          </View>
        </Card>
      </View>

      {/* Milestones */}
      {/* <View style={{ paddingHorizontal: 22, paddingBottom: 8 }}>
        <Eye>{t('journey.milestones')}</Eye>
      </View>
      <View style={{ paddingHorizontal: 22 }}>
        {milestones.map((m, i) => (
          <View key={i} style={evoStyles.logRow}>
            <Text style={evoStyles.logDate}>{m.date}</Text>
            <View style={{ flex: 1 }}>
              <Text style={evoStyles.logTitle}>{m.title}</Text>
              <Text style={evoStyles.logDetail}>{m.detail}</Text>
            </View>
          </View>
        ))}
      </View> */}
    </View>
  );
}

const evoStyles = StyleSheet.create({
  section: { paddingHorizontal: 16, paddingBottom: 12 },
  heroTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 30,
    lineHeight: 30 * 1.05,
    letterSpacing: -0.6,
    color: tokens.color.fg,
  },
  heroSub: {
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    marginTop: 10,
    lineHeight: 13 * 1.55,
  },
  chartHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  chartFrame: {
    height: 178,
    marginTop: 12,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  goalLabel: {
    position: 'absolute',
    right: 18,
    top: -2,
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    color: tokens.color.warm,
    letterSpacing: 0.3,
  },
  chartSummary: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    paddingHorizontal: 18,
    marginTop: -20,
    paddingBottom: 18,
    lineHeight: 12.5 * 1.5,
  },
  projTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 22,
    lineHeight: 22 * 1.2,
    letterSpacing: -0.3,
    color: tokens.color.fg,
    marginTop: 10,
  },
  projSub: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    marginTop: 8,
    lineHeight: 12.5 * 1.55,
  },
  projBar: { marginTop: 16, gap: 8 },
  projLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
  },
  projTrack: {
    height: 2,
    backgroundColor: tokens.color.fill,
  },
  projFill: {
    height: 2,
    backgroundColor: tokens.color.primary,
  },
  logRow: {
    paddingVertical: 12,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    flexDirection: 'row',
    gap: 14,
  },
  logDate: {
    width: 60,
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    color: tokens.color.faint,
    letterSpacing: 0.3,
  },
  logTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.fg,
    letterSpacing: -0.1,
  },
  logDetail: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.sub,
    marginTop: 2,
    fontStyle: 'italic',
  },
});

// ── Compare sub-page ──
function JourneyCompare() {
  const { t } = useTranslation();

  const appRows = [
    { name: 'Picgram', letter: 'i', tone: 'a' as const, trend: 'plus calme', positive: true },
    { name: 'Toktik', letter: 't', tone: 'b' as const, trend: 'net recul', positive: true },
    { name: 'Snapfly', letter: 's', tone: 'c' as const, trend: 'à surveiller', positive: false },
  ];

  const habitRows = [
    { name: 'Lecture du soir', trend: 'plus régulière', positive: true },
    { name: 'Marche matinale', trend: 'installée', positive: true },
    { name: 'Thé sans téléphone', trend: 'à reprendre', positive: false },
  ];

  return (
    <View style={{ paddingBottom: 24 }}>
      {/* Title */}
      <View style={{ paddingHorizontal: 22, paddingTop: 4, paddingBottom: 16 }}>
        <Text style={cmpStyles.title}>{t('journey.cmpTitle')}</Text>
        <Text style={cmpStyles.range}>{t('journey.cmpRange')}</Text>
      </View>

      {/* Delta card */}
      <View style={cmpStyles.section}>
        <Card>
          <Eye>{t('journey.cmpScreenTime')}</Eye>
          <Text style={cmpStyles.deltaHeadline}>Cette semaine est plus légère.</Text>
          <View style={{ marginTop: 16, gap: 8 }}>
            <View style={cmpStyles.barRow}>
              <Text style={[cmpStyles.barLabel, { color: tokens.color.faint }]}>avant</Text>
              <View style={{ flex: 1 }}><Bar value={0.88} height={6} /></View>
            </View>
            <View style={cmpStyles.barRow}>
              <Text style={[cmpStyles.barLabel, { color: tokens.color.fg, fontWeight: '600' }]}>maintenant</Text>
              <View style={{ flex: 1 }}><Bar value={0.72} height={6} /></View>
            </View>
          </View>
          <Text style={cmpStyles.deltaSummary}>
            <Text style={{ fontStyle: 'italic' }}>{t('journey.cmpDeltaPre')}</Text>{' '}
            <Text style={{ color: tokens.color.sub }}>{t('journey.cmpDeltaPost')}</Text>
          </Text>
        </Card>
      </View>

      {/* By app */}
      <View style={cmpStyles.section}>
        <Card padded={false}>
          <View style={{ padding: 16, paddingHorizontal: 18, paddingBottom: 6 }}>
            <Eye>{t('journey.cmpByApp')}</Eye>
          </View>
          {appRows.map((a, i) => (
            <View key={i} style={cmpStyles.appRow}>
              <AppTile letter={a.letter} tone={a.tone} size={24} />
              <Text style={cmpStyles.appName}>{a.name}</Text>
              <Text style={[cmpStyles.appTrend, { color: a.positive ? tokens.color.sub : tokens.color.warm }]}>
                {a.trend}
              </Text>
            </View>
          ))}
        </Card>
      </View>

      {/* Habits */}
      <View style={cmpStyles.section}>
        <Card padded={false}>
          <View style={{ padding: 16, paddingHorizontal: 18, paddingBottom: 6 }}>
            <Eye>{t('journey.cmpHabits')}</Eye>
          </View>
          {habitRows.map((h, i) => (
            <View key={i} style={cmpStyles.habitRow}>
              <Text style={cmpStyles.habitName}>{h.name}</Text>
              <Text style={[cmpStyles.habitTrend, { color: h.positive ? tokens.color.sub : tokens.color.warm }]}>
                {h.trend}
              </Text>
            </View>
          ))}
        </Card>
      </View>

      <Text style={cmpStyles.footer}>{t('journey.cmpFooter')}</Text>
    </View>
  );
}

const cmpStyles = StyleSheet.create({
  section: { paddingHorizontal: 16, paddingBottom: 12 },
  title: {
    fontFamily: tokens.font.sans,
    fontSize: 24,
    lineHeight: 24 * 1.1,
    letterSpacing: -0.4,
    color: tokens.color.fg,
  },
  range: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    marginTop: 6,
  },
  deltaHeadline: {
    fontFamily: tokens.font.sans,
    fontSize: 20,
    lineHeight: 20 * 1.2,
    color: tokens.color.fg,
    marginTop: 14,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barLabel: {
    width: 74,
    fontFamily: tokens.font.sans,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  deltaSummary: {
    marginTop: 16,
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.fg,
    lineHeight: 13 * 1.5,
  },
  appRow: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appName: { flex: 1, fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.fg },
  appTrend: { fontFamily: tokens.font.sans, fontSize: 12, fontStyle: 'italic' },
  habitRow: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  habitName: {
    flex: 1,
    fontFamily: tokens.font.sans,
    fontSize: 13,
    fontStyle: 'italic',
    letterSpacing: -0.1,
    color: tokens.color.fg,
  },
  habitTrend: { fontFamily: tokens.font.sans, fontSize: 12, fontStyle: 'italic' },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 4,
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    lineHeight: 12.5 * 1.55,
  },
});

// ── Main screen ──
export function JourneyScreen() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<JourneyMode>('evolution');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.kicker}>{t('journey.title').toUpperCase()}</Text>
        <SegSwitch
          tabs={[
            { id: 'evolution' as const, label: t('journey.tabEvo') },
            { id: 'compare' as const, label: t('journey.tabCmp') },
          ]}
          active={mode}
          onChange={setMode}
        />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {mode === 'evolution' ? <JourneyEvolution /> : <JourneyCompare />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 14,
  },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
    paddingBottom: 10,
  },
});
