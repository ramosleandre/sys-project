import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Numeric } from '../design-system/components/Numeric';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HabitDetail'>;
};

function DetailRow({ k, v }: { k: string; v: string }) {
  return (
    <View style={detailStyles.row}>
      <Text style={detailStyles.key}>{k}</Text>
      <Text style={detailStyles.val}>{v}</Text>
      <Text style={detailStyles.chevron}>{'\u203A'}</Text>
    </View>
  );
}

export function HabitDetailScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const stats = [
    [t('habitDetail.kept'), '11 / 14'],
    [t('habitDetail.streak'), t('habitDetail.streakDays')],
    [t('habitDetail.avg'), t('habitDetail.avgVal')],
  ];

  const suggestions = [
    t('habitDetail.opt1'),
    t('habitDetail.opt2'),
    t('habitDetail.opt3'),
    t('habitDetail.opt4'),
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <Pressable onPress={() => navigation.goBack()} style={styles.backRow}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
        <Text style={styles.backLabel}>{t('habitDetail.title').toUpperCase()}</Text>
      </Pressable>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.habitName}>{t('habit.readingFull')}</Text>
          <Text style={styles.habitSched}>{t('habitDetail.schedule')}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statRow}>
          {stats.map(([k, v], i) => (
            <Card key={i} style={styles.statCard}>
              <Text style={styles.statLabel}>{k}</Text>
              <Numeric size={20} style={{ marginTop: 8 }}>{v}</Numeric>
            </Card>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Card padded={false}>
            <View style={{ padding: 16, paddingHorizontal: 18, paddingBottom: 8 }}>
              <Eye>{t('habitDetail.settings')}</Eye>
            </View>
            <DetailRow k={t('habitDetail.schedField')} v="20:50 \u2014 23:20" />
            <DetailRow k={t('habitDetail.daysField')} v={t('habitDetail.daysVal')} />
            <DetailRow k={t('habitDetail.appsField')} v={t('habitDetail.appsVal')} />
            <DetailRow k={t('habitDetail.prepField')} v={t('habitDetail.prepVal')} />
          </Card>
        </View>

        {/* Too hard */}
        <View style={styles.section}>
          <Card padded={false}>
            <View style={{ padding: 16, paddingHorizontal: 18, paddingBottom: 4 }}>
              <Eye>{t('habitDetail.tooHard')}</Eye>
              <Text style={styles.tooHardSub}>{t('habitDetail.tooHardSub')}</Text>
            </View>
            <View style={styles.suggestionsWrap}>
              {suggestions.map((s, i) => (
                <View key={i} style={styles.suggestionPill}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </View>
              ))}
            </View>
            {/* Compose */}
            <View style={styles.compose}>
              <View style={styles.composeLogo}>
                <Text style={styles.composeLogoLetter}>s</Text>
              </View>
              <Text style={styles.composeHint}>{t('habitDetail.compose')}</Text>
              <Text style={styles.composeSend}>{t('common.send')}</Text>
            </View>
          </Card>
        </View>

        {/* Danger */}
        <View style={styles.danger}>
          <Text style={styles.dangerText}>{t('habitDetail.delete')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const detailStyles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  key: {
    flex: 1,
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.fg,
  },
  val: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.faint,
    fontStyle: 'italic',
    textAlign: 'right',
    maxWidth: '60%',
  },
  chevron: {
    color: tokens.color.faint,
    fontSize: 14,
    lineHeight: 16,
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  backArrow: {
    color: tokens.color.sub,
    fontSize: 18,
    lineHeight: 20,
  },
  backLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
  },
  titleBlock: {
    paddingHorizontal: 22,
    paddingTop: 6,
    paddingBottom: 18,
  },
  habitName: {
    fontFamily: tokens.font.sans,
    fontStyle: 'italic',
    fontSize: 28,
    lineHeight: 28 * 1.1,
    letterSpacing: -0.5,
    color: tokens.color.fg,
  },
  habitSched: {
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    marginTop: 6,
  },
  statRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  statCard: { flex: 1, padding: 14 },
  statLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 9.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: tokens.color.faint,
  },
  section: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 12 },
  tooHardSub: {
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    marginTop: 8,
    lineHeight: 13 * 1.55,
  },
  suggestionsWrap: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    paddingBottom: 14,
    gap: 6,
  },
  suggestionPill: {
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.lineStrong,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: tokens.color.fill,
  },
  suggestionText: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.fg,
    letterSpacing: 0.1,
  },
  compose: {
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  composeLogo: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: tokens.color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composeLogoLetter: {
    fontFamily: tokens.font.sans,
    fontStyle: 'italic',
    fontSize: 12,
    color: tokens.color.ink,
  },
  composeHint: {
    flex: 1,
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.faint,
    fontStyle: 'italic',
  },
  composeSend: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.sub,
  },
  danger: {
    paddingHorizontal: 22,
    paddingBottom: 24,
    paddingTop: 6,
  },
  dangerText: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.warm,
    paddingVertical: 12,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
  },
});
