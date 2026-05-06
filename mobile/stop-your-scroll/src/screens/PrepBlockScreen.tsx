import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Numeric } from '../design-system/components/Numeric';
import { Button } from '../design-system/components/Button';

export function PrepBlockScreen() {
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
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.kicker}>{t('prep.kicker').toUpperCase()}</Text>
        <Text style={styles.time}>20:50 \u2014 23:20</Text>
      </View>

      {/* Center */}
      <View style={styles.center}>
        {/* Ring */}
        <View style={styles.ringWrap}>
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
          <View style={styles.ringInner}>
            <Text style={styles.ringLabel}>{t('prep.beforeBlock').toUpperCase()}</Text>
            <Numeric size={56} style={styles.timer}>
              {mm}:{String(ss).padStart(2, '0')}
            </Numeric>
            <Text style={styles.ringSub}>{t('prep.appsCount')}</Text>
          </View>
        </View>

        {/* Message */}
        <View style={styles.message}>
          <Text style={styles.msgTitle}>
            {t('prep.heroLine1')}{'\n'}{t('prep.heroLine2')}
          </Text>
          <Text style={styles.msgBody}>
            {t('prep.silentIn')} {mm}:{String(ss).padStart(2, '0')}.
          </Text>
        </View>

        <Button
          label={t('prep.cantTonight')}
          variant="ghost"
          style={{ borderRadius: 999, paddingHorizontal: 22 }}
        />
      </View>

      {/* Footer */}
      <Text style={styles.footer}>{t('prep.cantCancel')}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
  },
  time: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    letterSpacing: 0.4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 26,
  },
  ringWrap: { width: 240, height: 240 },
  ringInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 10,
    letterSpacing: 2.5,
    color: tokens.color.faint,
  },
  timer: { marginTop: 8 },
  ringSub: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  message: { alignItems: 'center', maxWidth: 280 },
  msgTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 22,
    lineHeight: 22 * 1.25,
    letterSpacing: -0.3,
    color: tokens.color.fg,
    textAlign: 'center',
  },
  msgBody: {
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    marginTop: 8,
    lineHeight: 13 * 1.5,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    color: tokens.color.faint,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
