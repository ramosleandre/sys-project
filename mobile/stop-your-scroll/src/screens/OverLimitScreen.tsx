import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Bar } from '../design-system/components/Bar';
import { Numeric } from '../design-system/components/Numeric';
import { Button } from '../design-system/components/Button';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function OverLimitScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const projections = [
    { label: t('over.in1y'), val: '\u2212 10 j 8 h', frac: 0.2 },
    { label: t('over.in5y'), val: '\u2212 52 j', frac: 0.62 },
    { label: t('over.in10y'), val: '\u2212 104 j', frac: 1.0 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topKicker}>
        <Text style={styles.kicker}>{t('over.kicker').toUpperCase()}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 22, paddingTop: 16 }}>
          {/* Hero */}
          <Text style={styles.heroTitle}>
            {t('over.heroLine1')}{'\n'}
            <Text style={{ color: tokens.color.sub, fontStyle: 'italic' }}>
              {t('over.heroLine2')}
            </Text>
          </Text>
          <Text style={styles.body}>{t('over.body')}</Text>

          {/* Quota bar */}
          <View style={styles.quotaBox}>
            <View style={styles.quotaHeader}>
              <Text style={styles.quotaLabel}>{t('over.quotaApp')}</Text>
              <Numeric size={11} color={tokens.color.warm}>7 h 14 / 6 h</Numeric>
            </View>
            <View style={{ marginTop: 4 }}>
              <Bar value={1} height={2} warm />
            </View>
          </View>

          {/* Long-term projection */}
          <View style={styles.projSection}>
            <Text style={styles.projKicker}>{t('over.ifYouContinue').toUpperCase()}</Text>
            <Text style={styles.projTitle}>
              {t('over.lossPre')}{'\n'}
              <Text style={{ fontStyle: 'italic', color: tokens.color.warm }}>
                {t('over.lossValue')}
              </Text>{'\n'}
              {t('over.lossPost')}
            </Text>
            <Text style={styles.projDetail}>{t('over.lossDetail')}</Text>

            {/* Bars */}
            <View style={styles.barsWrap}>
              {projections.map((p, i) => (
                <View key={i} style={{ gap: 5 }}>
                  <View style={styles.barHeader}>
                    <Text style={styles.barLabel}>{p.label}</Text>
                    <Text style={styles.barVal}>{p.val}</Text>
                  </View>
                  <View style={{ height: 4, backgroundColor: tokens.color.fill, borderRadius: 2, overflow: 'hidden' }}>
                    <View style={{ width: `${p.frac * 100}%`, height: 4, backgroundColor: tokens.color.warm }} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Quote */}
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>{t('over.quote')}</Text>
          </View>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomCta}>
        <Button
          label={t('over.accept')}
          variant="primary"
          fullWidth
          onPress={() => navigation.goBack()}
        />
        <Button
          label={t('over.emergency')}
          variant="warm"
          fullWidth
          onPress={() => navigation.navigate('Unblock')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  topKicker: { paddingHorizontal: 24, paddingTop: 20 },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.warm,
    fontWeight: '500',
  },
  heroTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 34,
    lineHeight: 34 * 1.05,
    letterSpacing: -0.9,
    color: tokens.color.fg,
  },
  body: {
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.sub,
    lineHeight: 13.5 * 1.55,
    marginTop: 16,
  },
  quotaBox: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.lineStrong,
    borderRadius: 14,
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quotaLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    letterSpacing: 0.3,
  },
  projSection: { marginTop: 22 },
  projKicker: {
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    letterSpacing: 1.6,
    color: tokens.color.warm,
    fontWeight: '500',
  },
  projTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 26,
    lineHeight: 26 * 1.15,
    letterSpacing: -0.5,
    color: tokens.color.fg,
    marginTop: 12,
  },
  projDetail: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    marginTop: 10,
    lineHeight: 12.5 * 1.55,
  },
  barsWrap: { marginTop: 18, gap: 12 },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    letterSpacing: 0.3,
  },
  barVal: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.warm,
    fontStyle: 'italic',
  },
  quoteBox: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: tokens.color.fill,
    borderRadius: 14,
  },
  quoteText: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    lineHeight: 12.5 * 1.55,
    fontStyle: 'italic',
  },
  bottomCta: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    gap: 10,
  },
});
