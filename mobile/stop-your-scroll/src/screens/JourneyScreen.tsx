import React, { useState } from 'react';
import { Image, ImageSourcePropType, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line, Path, Circle, Rect } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
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
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const currentWeek = [7.1, 6.4, 6.8, 5.9, 6.2, 7.5, 6.6];
  const selectedWeek = [9.4, 8.8, 9.1, 8.2, 8.7, 10.1, 9.0];
  const chartW = 140;
  const chartH = 78;
  const chartMax = 11;
  const groupW = chartW / days.length;
  const barW = 4.8;
  const barY = (value: number) => chartH - (value / chartMax) * chartH;
  const barH = (value: number) => (value / chartMax) * chartH;

  const appRows: {
    name: string;
    logoSource: ImageSourcePropType;
    trend: string;
    positive: boolean;
  }[] = [
    { name: 'Instagram', logoSource: require('../../assets/apps/Instagram_icon.png'), trend: 'plus calme', positive: true },
    { name: 'Tiktok', logoSource: require('../../assets/apps/tiktok.webp'), trend: 'net recul', positive: true },
    { name: 'Snapchat', logoSource: require('../../assets/apps/Snapchat.png'), trend: 'à surveiller', positive: false },
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

      {/* Compare chart */}
      <View style={cmpStyles.section}>
        <Card padded={false}>
          <View style={cmpStyles.chartHeader}>
            <Eye action="S 15">{t('journey.cmpScreenTime')}</Eye>
            <Text style={cmpStyles.deltaHeadline}>Cette semaine est plus légère.</Text>
          </View>

          <View style={cmpStyles.weekPicker}>
            <Text style={cmpStyles.weekPickerText}>Comparée à la semaine du 6 avril</Text>
          </View>

          <View style={cmpStyles.compareChart}>
            <Svg
              viewBox={`0 0 ${chartW} ${chartH}`}
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              {[0.25, 0.5, 0.75].map((p, i) => (
                <Line
                  key={i}
                  x1={0}
                  x2={chartW}
                  y1={chartH * p}
                  y2={chartH * p}
                  stroke={tokens.color.line}
                  strokeWidth={0.35}
                />
              ))}
              {days.map((_, i) => {
                const x = i * groupW + groupW / 2;
                return (
                  <React.Fragment key={i}>
                    <Rect
                      x={x - barW - 1}
                      y={barY(selectedWeek[i])}
                      width={barW}
                      height={barH(selectedWeek[i])}
                      rx={1.2}
                      fill={tokens.color.fill}
                    />
                    <Rect
                      x={x + 1}
                      y={barY(currentWeek[i])}
                      width={barW}
                      height={barH(currentWeek[i])}
                      rx={1.2}
                      fill={tokens.color.primary}
                    />
                  </React.Fragment>
                );
              })}
            </Svg>
          </View>

          <View style={cmpStyles.dayLabels}>
            {days.map((d, i) => (
              <Text key={i} style={cmpStyles.dayLabel}>{d}</Text>
            ))}
          </View>

          <View style={cmpStyles.legendRow}>
            <View style={cmpStyles.legendItem}>
              <View style={[cmpStyles.legendDot, { backgroundColor: tokens.color.primary }]} />
              <Text style={cmpStyles.legendText}>Cette semaine</Text>
            </View>
            <View style={cmpStyles.legendItem}>
              <View style={[cmpStyles.legendDot, { backgroundColor: tokens.color.fill }]} />
              <Text style={cmpStyles.legendText}>Semaine S 2</Text>
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
              <View style={cmpStyles.appLogo}>
                <Image source={a.logoSource} style={cmpStyles.appLogoImage} />
              </View>
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
  chartHeader: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  deltaHeadline: {
    fontFamily: tokens.font.sans,
    fontSize: 20,
    lineHeight: 20 * 1.2,
    color: tokens.color.fg,
    marginTop: 14,
  },
  weekPicker: {
    marginHorizontal: 18,
    marginTop: 12,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.line,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.color.fill,
  },
  weekPickerText: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
  },
  compareChart: {
    height: 168,
    marginHorizontal: 14,
    marginTop: 16,
  },
  dayLabels: {
    marginHorizontal: 14,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: tokens.font.sans,
    fontSize: 10,
    color: tokens.color.faint,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  legendText: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.sub,
  },
  deltaSummary: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
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
  appLogo: {
    width: 28,
    height: 28,
    borderRadius: tokens.radius.sm,
    overflow: 'hidden',
    backgroundColor: tokens.color.cardSoft,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.lineStrong,
  },
  appLogoImage: {
    width: '100%',
    height: '100%',
  },
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
