import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Numeric } from '../design-system/components/Numeric';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string, p?: any) => void };
};

function PenIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke={tokens.color.sub} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function Pill({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[pl.base, active && pl.active]}>
      <Text style={[pl.text, active && pl.textActive]}>{label}</Text>
    </Pressable>
  );
}

const pl = StyleSheet.create({
  base: {
    borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
    borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: 'transparent',
  },
  active: { backgroundColor: tokens.color.primary, borderColor: tokens.color.primary },
  text: { fontFamily: tokens.font.sans, fontSize: 12.5, color: tokens.color.fg },
  textActive: { color: tokens.color.ink },
});

function Tag({ label }: { label: string }) {
  return (
    <View style={tag.base}>
      <Text style={tag.text}>{label}</Text>
    </View>
  );
}

const tag = StyleSheet.create({
  base: {
    borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
    borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: tokens.color.fill,
  },
  text: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.fg },
});

export function HabitDetailScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [habitName, setHabitName] = useState(t('habit.readingFull'));
  const [isEditingName, setIsEditingName] = useState(false);
  const [startDay, setStartDay] = useState('Lun');
  const [endDay, setEndDay] = useState('Dim');

  const allDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const stats = [
    [t('habitDetail.kept'), '11 / 14'],
    [t('habitDetail.streak'), t('habitDetail.streakDays')],
    [t('habitDetail.avg'), t('habitDetail.avgVal')],
  ];

  const suggestions = [
    t('habitDetail.opt1'),
    t('habitDetail.opt2'),
    t('habitDetail.opt3'),
  ];

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={s.backRow}>
          <Text style={s.backArrow}>‹</Text>
          <Text style={s.backLabel}>{t('habitDetail.title').toUpperCase()}</Text>
        </Pressable>
        <Pressable onPress={() => setIsEditingName(!isEditingName)} hitSlop={12}>
          <PenIcon />
        </Pressable>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={s.titleBlock}>
          {isEditingName ? (
            <TextInput
              style={s.habitNameInput}
              value={habitName}
              onChangeText={setHabitName}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <Text style={s.habitName}>{habitName}</Text>
          )}
        </View>

        {/* Days pills */}
        <View style={s.configSection}>
          <View style={s.configRow}>
            <Text style={s.configLabel}>JOURS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
              {allDays.map(d => (
                <Pill
                  key={d}
                  label={d}
                  active={allDays.indexOf(d) >= allDays.indexOf(startDay) && allDays.indexOf(d) <= allDays.indexOf(endDay)}
                  onPress={() => {
                    if (allDays.indexOf(d) < allDays.indexOf(startDay)) setStartDay(d);
                    else setEndDay(d);
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Horaire + Apps coupées + Préparation — compact row */}
          <View style={s.infoGrid}>
            <View style={s.infoItem}>
              <Text style={s.configLabel}>HORAIRE</Text>
              <View style={s.tagRow}>
                <Tag label="20:50" />
                <Text style={s.tagArrow}>→</Text>
                <Tag label="23:20" />
              </View>
            </View>
            <View style={s.infoItem}>
              <Text style={s.configLabel}>APPS COUPÉES</Text>
              <Tag label={t('plan.appsCategory')} />
            </View>
            <View style={s.infoItem}>
              <Text style={s.configLabel}>PRÉPARATION</Text>
              <Tag label={t('habitDetail.prepVal')} />
            </View>
          </View>
        </View>

        {/* Separator */}
        <View style={s.separator} />

        {/* Stats */}
        <View style={s.statRow}>
          {stats.map(([k, v], i) => (
            <Card key={i} style={s.statCard}>
              <Text style={s.statLabel}>{k}</Text>
              <Numeric size={20} style={{ marginTop: 8 }}>{v}</Numeric>
            </Card>
          ))}
        </View>

        {/* Too hard */}
        <View style={s.section}>
          <Card padded={false}>
            <View style={{ padding: 16, paddingHorizontal: 18, paddingBottom: 4 }}>
              <Eye>{t('habitDetail.tooHard')}</Eye>
              <Text style={s.tooHardSub}>{t('habitDetail.tooHardSub')}</Text>
            </View>
            <View style={s.suggestionsWrap}>
              {suggestions.map((sg, i) => (
                <Pressable key={i} style={s.suggestionPill}>
                  <Text style={s.suggestionText}>{sg}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={s.compose} onPress={() => navigation.navigate('HabitChat', { habitName })}>
              <View style={s.composeLogo}>
                <Text style={s.composeLogoLetter}>s</Text>
              </View>
              <Text style={s.composeHint}>{t('habitDetail.compose')}</Text>
              <Text style={s.composeSend}>›</Text>
            </Pressable>
          </Card>
        </View>

        <View style={s.danger}>
          <Text style={s.dangerText}>{t('habitDetail.delete')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 12,
  },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backArrow: { color: tokens.color.sub, fontSize: 18, lineHeight: 20 },
  backLabel: { fontFamily: tokens.font.sans, fontSize: 11, letterSpacing: 2, color: tokens.color.sub, fontWeight: '500' },
  titleBlock: { paddingHorizontal: 22, paddingTop: 6, paddingBottom: 10 },
  habitName: {
    fontFamily: tokens.font.sans, fontStyle: 'italic', fontSize: 28,
    lineHeight: 28 * 1.1, letterSpacing: -0.5, color: tokens.color.fg,
  },
  habitNameInput: {
    fontFamily: tokens.font.sans, fontStyle: 'italic', fontSize: 28,
    lineHeight: 28 * 1.1, letterSpacing: -0.5, color: tokens.color.fg,
    borderBottomWidth: 1, borderBottomColor: tokens.color.lineStrong, paddingBottom: 4, padding: 0,
  },
  configSection: { paddingHorizontal: 22, paddingBottom: 4, gap: 16 },
  configRow: { gap: 8 },
  configLabel: {
    fontFamily: tokens.font.sans, fontSize: 10, letterSpacing: 1.4,
    color: tokens.color.faint, fontWeight: '500',
  },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  infoItem: { gap: 6 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tagArrow: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.faint },
  separator: {
    height: tokens.border.hairline, backgroundColor: tokens.color.line,
    marginHorizontal: 22, marginVertical: 16,
  },
  statRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  statCard: { flex: 1, padding: 14 },
  statLabel: { fontFamily: tokens.font.sans, fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase', color: tokens.color.faint },
  section: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 12 },
  tooHardSub: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.sub, marginTop: 8, lineHeight: 13 * 1.55 },
  suggestionsWrap: { paddingHorizontal: 14, paddingVertical: 8, paddingBottom: 14, gap: 6 },
  suggestionPill: {
    borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
    borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: tokens.color.fill,
  },
  suggestionText: { fontFamily: tokens.font.sans, fontSize: 12.5, color: tokens.color.fg, letterSpacing: 0.1 },
  compose: {
    borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
    paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  composeLogo: { width: 22, height: 22, borderRadius: 6, backgroundColor: tokens.color.primary, alignItems: 'center', justifyContent: 'center' },
  composeLogoLetter: { fontFamily: tokens.font.sans, fontStyle: 'italic', fontSize: 12, color: tokens.color.ink },
  composeHint: { flex: 1, fontFamily: tokens.font.sans, fontSize: 12.5, color: tokens.color.faint, fontStyle: 'italic' },
  composeSend: { color: tokens.color.sub, fontSize: 16 },
  danger: { paddingHorizontal: 22, paddingBottom: 24, paddingTop: 6 },
  dangerText: {
    fontFamily: tokens.font.sans, fontSize: 12.5, color: tokens.color.warm,
    paddingVertical: 12, borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
  },
});
