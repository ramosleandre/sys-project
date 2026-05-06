import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Numeric } from '../design-system/components/Numeric';
import { Button } from '../design-system/components/Button';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string) => void };
};

const { width: SCREEN_W } = Dimensions.get('window');

export function OverLimitScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const used = 7.23; // 7h14
  const limit = 6;
  const pct = Math.min(used / limit, 1);
  const r = 90;
  const circ = 2 * Math.PI * r;

  return (
    <SafeAreaView style={s.safe}>
      {/* Back */}
      <Pressable onPress={() => navigation.goBack()} style={s.backBtn}>
        <Text style={s.backArrow}>‹</Text>
      </Pressable>

      {/* Center block */}
      <View style={s.center}>
        {/* Ring gauge — over limit = warm */}
        <View style={s.ringWrap}>
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <SvgCircle cx={100} cy={100} r={r} fill="none" stroke={tokens.color.line} strokeWidth={3} />
            <SvgCircle
              cx={100} cy={100} r={r} fill="none"
              stroke={tokens.color.warm} strokeWidth={3}
              strokeDasharray={`${pct * circ} ${circ}`}
              strokeLinecap="round"
              rotation={-90} origin="100,100"
            />
          </Svg>
          <View style={s.ringInner}>
            <Numeric size={42} color={tokens.color.warm}>7h14</Numeric>
            <Text style={s.ringLimit}>/ {limit}h</Text>
          </View>
        </View>

        {/* Message */}
        <Text style={s.headline}>{t('over.heroLine1')}</Text>
        <Text style={s.sub}>{t('over.body')}</Text>

        {/* Single stat */}
        <View style={s.statRow}>
          <View style={s.statItem}>
            <Text style={s.statLabel}>{t('over.in1y')}</Text>
            <Text style={s.statVal}>10 j</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statItem}>
            <Text style={s.statLabel}>{t('over.in5y')}</Text>
            <Text style={s.statVal}>52 j</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statItem}>
            <Text style={s.statLabel}>{t('over.in10y')}</Text>
            <Text style={s.statVal}>104 j</Text>
          </View>
        </View>

        {/* Lost time warning */}
        <Text style={s.lostTime}>{t('over.lossDetail')}</Text>
      </View>

      {/* Bottom */}
      <View style={s.bottom}>
        <Button
          label={t('over.accept')}
          variant="primary"
          fullWidth
          onPress={() => navigation.goBack()}
        />
        <Pressable onPress={() => navigation.navigate('Unblock')} style={s.emergencyBtn}>
          <Text style={s.emergencyText}>{t('over.emergency')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  backBtn: {
    position: 'absolute', top: 60, left: 20, zIndex: 10,
    width: 36, height: 36, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { color: tokens.color.sub, fontSize: 22, lineHeight: 24 },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32, gap: 20,
  },
  ringWrap: { width: 200, height: 200 },
  ringInner: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  ringLimit: {
    fontFamily: tokens.font.sans, fontSize: 14, color: tokens.color.faint, marginTop: 2,
  },
  headline: {
    fontFamily: tokens.font.sans, fontSize: 22, letterSpacing: -0.4,
    color: tokens.color.fg, textAlign: 'center', fontWeight: '500',
  },
  sub: {
    fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.sub,
    textAlign: 'center', lineHeight: 13 * 1.55, maxWidth: 300,
  },
  statRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: tokens.border.hairline, borderColor: tokens.color.line,
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 6,
    marginTop: 4,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statLabel: {
    fontFamily: tokens.font.sans, fontSize: 10, letterSpacing: 1,
    color: tokens.color.faint, textTransform: 'uppercase',
  },
  statVal: {
    fontFamily: tokens.font.sans, fontSize: 16, color: tokens.color.warm, fontWeight: '600',
  },
  statDivider: {
    width: tokens.border.hairline, height: 28,
    backgroundColor: tokens.color.line,
  },
  lostTime: {
    fontFamily: tokens.font.sans, fontSize: 12, color: tokens.color.faint,
    textAlign: 'center', lineHeight: 12 * 1.55, fontStyle: 'italic',
    maxWidth: 280,
  },
  bottom: {
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28, gap: 12,
  },
  emergencyBtn: {
    alignItems: 'center', paddingVertical: 13,
  },
  emergencyText: {
    fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.warm,
    letterSpacing: 0.2,
  },
});
