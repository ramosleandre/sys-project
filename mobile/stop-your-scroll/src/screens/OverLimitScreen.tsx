import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Numeric } from '../design-system/components/Numeric';
import { Button } from '../design-system/components/Button';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string) => void };
};

export function OverLimitScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const used = 7.23;
  const limit = 6;
  const pct = Math.min(used / limit, 1);
  const r = 80;
  const circ = 2 * Math.PI * r;

  const apps = [
    { name: 'TikTok', time: '3 h 40', main: true },
    { name: 'Instagram', time: '2 h 10' },
    { name: 'Snapchat', time: '1 h 24' },
  ];

  return (
    <SafeAreaView style={s.safe}>
      {/* Back */}
      <Pressable onPress={() => navigation.goBack()} style={s.backBtn}>
        <Text style={s.backArrow}>‹</Text>
      </Pressable>

      {/* Center */}
      <View style={s.center}>
        {/* Ring */}
        <View style={{ width: 180, height: 180 }}>
          <Svg width={180} height={180} viewBox="0 0 180 180">
            <SvgCircle cx={90} cy={90} r={r} fill="none" stroke={tokens.color.line} strokeWidth={2.5} />
            <SvgCircle
              cx={90} cy={90} r={r} fill="none"
              stroke={tokens.color.warm} strokeWidth={2.5}
              strokeDasharray={`${pct * circ} ${circ}`}
              strokeLinecap="round" rotation={-90} origin="90,90"
            />
          </Svg>
          <View style={s.ringInner}>
            <Numeric size={36} color={tokens.color.warm}>7h14</Numeric>
            <Text style={s.ringLimit}>/ {limit}h</Text>
          </View>
        </View>

        <Text style={s.headline}>Limite dépassée.</Text>
        <Text style={s.sub}>{t('over.body')}</Text>

        {/* App breakdown */}
        <View style={s.appList}>
          {apps.map(app => (
            <View key={app.name} style={s.appRow}>
              <Text style={s.appName}>{app.name}</Text>
              <Text style={[s.appTime, app.main && { color: tokens.color.warm }]}>{app.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom */}
      <View style={s.bottom}>
        <Button label={t('over.accept')} variant="primary" fullWidth onPress={() => navigation.goBack()} />
        <Pressable onPress={() => navigation.navigate('Unblock')} style={s.emergencyBtn}>
          <Text style={s.emergencyText}>{t('over.emergency')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  backBtn: { position: 'absolute', top: 60, left: 20, zIndex: 10, padding: 8 },
  backArrow: { color: tokens.color.sub, fontSize: 22, lineHeight: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 18 },
  ringInner: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ringLimit: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.faint, marginTop: 2 },
  headline: { fontFamily: tokens.font.sans, fontSize: 22, letterSpacing: -0.4, color: tokens.color.fg, textAlign: 'center', fontWeight: '500' },
  sub: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.sub, textAlign: 'center', lineHeight: 13 * 1.55, maxWidth: 280 },
  appList: {
    alignSelf: 'stretch', marginHorizontal: 8,
    borderWidth: tokens.border.hairline, borderColor: tokens.color.line, borderRadius: 14,
    paddingVertical: 4, paddingHorizontal: 18, marginTop: 4,
  },
  appRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 11,
    borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
  },
  appName: { fontFamily: tokens.font.sans, fontSize: 13.5, color: tokens.color.fg },
  appTime: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.sub, fontStyle: 'italic' },
  bottom: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28, gap: 12 },
  emergencyBtn: { alignItems: 'center', paddingVertical: 13 },
  emergencyText: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.warm, letterSpacing: 0.2 },
});
