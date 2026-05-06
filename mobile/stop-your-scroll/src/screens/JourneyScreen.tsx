import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line, Path, Circle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Bar } from '../design-system/components/Bar';
import { Numeric } from '../design-system/components/Numeric';
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

  const totals = [
    [t('journey.today'), '6 h 48'],
    [t('journey.start'), '10 h 24'],
    [t('journey.delta'), '\u221235 %'],
  ];

  const milestones = [
    { date: 'hier', title: '3e soir cons\u00e9cutif sans Toktik', detail: '42 min reprises' },
    { date: 'mar. 28', title: 'Premier livre termin\u00e9', detail: '\u00ab L\u2019\u00e9cume des jours \u00bb \u00b7 7 h 12' },
    { date: 'lun. 20', title: 'Cap des 20 h', detail: 'depuis le d\u00e9but' },
    { date: 'dim. 12', title: 'Nouvelle habitude \u00b7 marche', detail: 'Sam matin, 15 min' },
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
        <Card>
          <Eye action={t('journey.chartAction')}>{t('journey.chartTitle')}</Eye>
          <View style={{ marginTop: 16 }}>
            <Svg viewBox={`0 0 ${w} ${h + 14}`} width="100%" height={160}>
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
          <View style={evoStyles.xAxis}>
            <Text style={evoStyles.xLabel}>S 8</Text>
            <Text style={evoStyles.xLabel}>S 12</Text>
            <Text style={evoStyles.xLabel}>S 16</Text>
            <Text style={evoStyles.xLabel}>S 19</Text>
          </View>
          {/* Totals */}
          <View style={evoStyles.totalsRow}>
            {totals.map(([k, v], i) => (
              <View key={i} style={{ flex: 1 }}>
                <Text style={evoStyles.totalLabel}>{k}</Text>
                <Numeric size={17} style={{ marginTop: 6 }}>{v}</Numeric>
              </View>
            ))}
          </View>
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
            <View style={evoStyles.projLabels}>
              <Text style={evoStyles.projLabel}>aujourd'hui \u00b7 27 h</Text>
              <Text style={evoStyles.projLabel}>1 an \u00b7 171 h</Text>
              <Text style={evoStyles.projLabel}>2 ans \u00b7 312 h</Text>
            </View>
            <View style={evoStyles.projTrack}>
              <View style={[evoStyles.projFill, { width: '8.6%' }]} />
            </View>
          </View>
        </Card>
      </View>

      {/* Milestones */}
      <View style={{ paddingHorizontal: 22, paddingBottom: 8 }}>
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
      </View>
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
  goalLabel: {
    position: 'absolute',
    right: 0,
    top: -2,
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    color: tokens.color.warm,
    letterSpacing: 0.3,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  xLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    color: tokens.color.faint,
    letterSpacing: 0.3,
  },
  totalsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
  },
  totalLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: tokens.color.faint,
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
  projBar: { marginTop: 16, gap: 6 },
  projLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    color: tokens.color.faint,
    letterSpacing: 0.3,
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
    { name: 'Picgram', letter: 'i', tone: 'a' as const, prev: '3 h 12', now: '2 h 48', delta: -0.13 },
    { name: 'Toktik', letter: 't', tone: 'b' as const, prev: '4 h 50', now: '3 h 06', delta: -0.36 },
    { name: 'Snapfly', letter: 's', tone: 'c' as const, prev: '2 h 20', now: '2 h 24', delta: 0.03 },
  ];

  const habitRows = [
    { name: 'Lecture du soir', prev: '5 / 7', now: '7 / 7', delta: '+2' },
    { name: 'Marche matinale', prev: '0 / 1', now: '1 / 1', delta: '+1' },
    { name: 'Th\u00e9 sans t\u00e9l\u00e9phone', prev: '3 / 7', now: '2 / 7', delta: '\u22121' },
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
          <View style={cmpStyles.deltaRow}>
            <View style={{ flex: 1 }}>
              <Text style={cmpStyles.deltaLabel}>{t('journey.cmpPrev')}</Text>
              <Numeric size={28} color={tokens.color.sub} style={{ marginTop: 6 }}>11 h 22</Numeric>
            </View>
            <Text style={cmpStyles.arrow}>{'\u2192'}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={cmpStyles.deltaLabel}>{t('journey.cmpThisWeek')}</Text>
              <Numeric size={28} style={{ marginTop: 6 }}>9 h 18</Numeric>
            </View>
          </View>
          {/* Bars */}
          <View style={{ marginTop: 18, gap: 8 }}>
            <View style={cmpStyles.barRow}>
              <Text style={[cmpStyles.barLabel, { color: tokens.color.faint }]}>S-1</Text>
              <View style={{ flex: 1 }}><Bar value={0.88} height={6} /></View>
              <Text style={[cmpStyles.barVal, { color: tokens.color.faint }]}>11 h 22</Text>
            </View>
            <View style={cmpStyles.barRow}>
              <Text style={[cmpStyles.barLabel, { color: tokens.color.fg, fontWeight: '600' }]}>S 19</Text>
              <View style={{ flex: 1 }}><Bar value={0.72} height={6} /></View>
              <Text style={[cmpStyles.barVal, { color: tokens.color.fg, fontWeight: '600' }]}>9 h 18</Text>
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
          {appRows.map((a, i) => {
            const dl = (a.delta * 100).toFixed(0);
            const positive = a.delta < 0;
            return (
              <View key={i} style={cmpStyles.appRow}>
                <AppTile letter={a.letter} tone={a.tone} size={24} />
                <Text style={cmpStyles.appName}>{a.name}</Text>
                <View style={cmpStyles.appVals}>
                  <Text style={cmpStyles.appPrev}>{a.prev}</Text>
                  <Text style={cmpStyles.appArrow}>{'\u2192'}</Text>
                  <Text style={cmpStyles.appNow}>{a.now}</Text>
                  <Text style={[cmpStyles.appDelta, { color: positive ? tokens.color.fg : tokens.color.warm }]}>
                    {positive ? '' : '+'}{dl}%
                  </Text>
                </View>
              </View>
            );
          })}
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
              <Text style={cmpStyles.habitPrev}>{h.prev}</Text>
              <Text style={cmpStyles.habitArrow}>{'\u2192'}</Text>
              <View style={cmpStyles.habitNowWrap}>
                <Text style={cmpStyles.habitNow}>{h.now}</Text>
                <Text style={[cmpStyles.habitDelta, { color: h.delta.startsWith('\u2212') ? tokens.color.warm : tokens.color.sub }]}>
                  {h.delta}
                </Text>
              </View>
            </View>
          ))}
        </Card>
      </View>

      {/* Small stats */}
      <View style={cmpStyles.statsGrid}>
        <Card style={{ flex: 1, padding: 14 }}>
          <Text style={cmpStyles.statKicker}>{t('journey.cmpEvenings')}</Text>
          <Numeric size={22} style={{ marginTop: 6 }}>4</Numeric>
          <Text style={[cmpStyles.statDelta, { color: tokens.color.fg }]}>+1</Text>
        </Card>
        <Card style={{ flex: 1, padding: 14 }}>
          <Text style={cmpStyles.statKicker}>{t('journey.cmpMornings')}</Text>
          <Numeric size={22} style={{ marginTop: 6 }}>6 / 7</Numeric>
          <Text style={[cmpStyles.statDelta, { color: tokens.color.faint }]}>=</Text>
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
  deltaRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deltaLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: tokens.color.faint,
  },
  arrow: { color: tokens.color.faint, fontSize: 18, lineHeight: 20 },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barLabel: {
    width: 28,
    fontFamily: tokens.font.sans,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  barVal: {
    width: 44,
    textAlign: 'right',
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
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
  appVals: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  appPrev: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint },
  appArrow: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint },
  appNow: { fontFamily: tokens.font.sans, fontSize: 12, color: tokens.color.fg, fontWeight: '600' },
  appDelta: { fontFamily: tokens.font.sans, fontSize: 10.5, marginLeft: 4 },
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
  habitPrev: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint },
  habitArrow: { fontFamily: tokens.font.sans, fontSize: 12, color: tokens.color.faint },
  habitNowWrap: { flexDirection: 'row', gap: 8, alignItems: 'baseline' },
  habitNow: { fontFamily: tokens.font.sans, fontSize: 12, color: tokens.color.fg, fontWeight: '600' },
  habitDelta: { fontFamily: tokens.font.sans, fontSize: 10.5 },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  statKicker: {
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: tokens.color.faint,
  },
  statDelta: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    marginTop: 4,
  },
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
  },
});
