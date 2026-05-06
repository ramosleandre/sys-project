import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Card } from '../design-system/components/Card';
import { HoldButton } from '../design-system/components/HoldButton';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Unblock'>;
};

export function UnblockScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const options = [
    'x = (e+3) / (e−1)',
    'x = (e−3) / (e−1)',
    'x = (e+3) / (e+1)',
    'x = e − 4',
  ];

  const onComplete = useCallback(() => {
    Alert.alert('Unlocked', 'App unblocked for this session.');
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backRow}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.kicker}>{t('unblock.kicker').toUpperCase()}</Text>
        </Pressable>
        <Text style={styles.step}>{t('unblock.step')}</Text>
      </View>

      {/* Problem */}
      <View style={styles.problemWrap}>
        <Text style={styles.problemLabel}>{t('unblock.problem').toUpperCase()}</Text>
        <Text style={styles.solveFor}>{t('unblock.solveFor')}</Text>

        <Card style={styles.equationCard}>
          <Text style={styles.equation}>
            ln(x + 3) {'−'} ln(x {'−'} 1) = 1
          </Text>
        </Card>

        {/* Options grid */}
        <View style={styles.optionsGrid}>
          {options.map((opt, i) => (
            <View
              key={i}
              style={[
                styles.option,
                i === 0 && styles.optionSelected,
              ]}
            >
              <Text style={[
                styles.optionText,
                { color: i === 0 ? tokens.color.fg : tokens.color.sub },
              ]}>
                {opt}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Hold to unlock */}
      <View style={styles.holdSection}>
        <Text style={styles.holdKicker}>{t('unblock.holdTitle').toUpperCase()}</Text>
        <HoldButton
          durationMs={60000}
          idleLabel={t('unblock.holdHint')}
          holdingLabel={`${t('unblock.holding')} · {s}s`}
          onComplete={onComplete}
        />
        <Text style={styles.releaseWarn}>{t('unblock.releaseWarn')}</Text>
      </View>
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
  },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backArrow: { color: tokens.color.sub, fontSize: 18, lineHeight: 20 },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.warm,
    fontWeight: '500',
  },
  step: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    letterSpacing: 0.3,
  },
  problemWrap: {
    paddingHorizontal: 26,
    paddingTop: 24,
  },
  problemLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    letterSpacing: 1.6,
    color: tokens.color.faint,
    fontWeight: '500',
  },
  solveFor: {
    fontFamily: tokens.font.sans,
    fontSize: 26,
    lineHeight: 26 * 1.25,
    letterSpacing: -0.3,
    color: tokens.color.fg,
    marginTop: 10,
  },
  equationCard: {
    marginTop: 16,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  equation: {
    fontFamily: tokens.font.sans,
    fontStyle: 'italic',
    fontSize: 28,
    letterSpacing: -0.2,
    color: tokens.color.fg,
    textAlign: 'center',
  },
  optionsGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.line,
    borderRadius: 12,
  },
  optionSelected: {
    borderColor: tokens.color.primary,
    backgroundColor: 'rgba(239,234,224,0.04)',
  },
  optionText: {
    fontFamily: tokens.font.sans,
    fontStyle: 'italic',
    fontSize: 13,
    letterSpacing: 0.1,
  },
  holdSection: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  holdKicker: {
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    letterSpacing: 1.6,
    color: tokens.color.faint,
    fontWeight: '500',
    marginBottom: 10,
  },
  releaseWarn: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 0.2,
  },
});
