import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Button } from '../design-system/components/Button';
import { Numeric } from '../design-system/components/Numeric';

type Props = {
  navigation: { goBack: () => void; navigate: (s: string, p?: any) => void };
};

function Tag({ label }: { label: string }) {
  return (
    <View style={tg.base}><Text style={tg.text}>{label}</Text></View>
  );
}
const tg = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
    borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: tokens.color.fill,
  },
  text: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.fg },
});

export function EditPlanScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [habits, setHabits] = useState([
    { name: t('habit.readingFull'), active: true },
    { name: t('habit.walkingFull'), active: true },
  ]);
  const [weeks, setWeeks] = useState(10);
  const [categories, setCategories] = useState([
    { name: t('plan.categorySocial'), apps: 'Instagram, TikTok, Snapchat', current: '6.8 h', target: '4.4 h' },
  ]);

  const addHabit = () => setHabits(h => [...h, { name: `Habitude ${h.length + 1}`, active: true }]);
  const removeHabit = (idx: number) => setHabits(h => h.filter((_, i) => i !== idx));

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={s.backRow}>
          <Text style={s.backArrow}>‹</Text>
          <Text style={s.backLabel}>MODIFIER LE PLAN</Text>
        </Pressable>
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Eye label */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 10 }}>
          <Eye>Objectif temps d'écran</Eye>
        </View>

        {/* Each category = its own card */}
        {categories.map((cat, ci) => (
          <View key={ci} style={s.cardWrap}>
            <Card>
              <View style={s.timeRow}>
                <View style={{ gap: 6 }}>
                  <Text style={s.timeLabel}>ACTUEL</Text>
                  <Tag label={cat.current} />
                </View>
                <View style={s.timeCenter}>
                  <Svg width={32} height={16} viewBox="0 0 32 16">
                    <Line x1={0} y1={8} x2={26} y2={8} stroke={tokens.color.primary} strokeWidth={1.2} />
                    <Path d="M22 3 L29 8 L22 13" stroke={tokens.color.primary} strokeWidth={1.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
                <View style={{ gap: 6, alignItems: 'flex-end' }}>
                  <Text style={s.timeLabel}>OBJECTIF</Text>
                  <Tag label={cat.target} />
                </View>
              </View>
              <View style={s.catNameRow}>
                <Text style={s.catName}>{cat.name}</Text>
                <Text style={s.catApps}>{cat.apps}</Text>
              </View>
            </Card>
          </View>
        ))}

        {/* Add category — standalone between cards */}
        <View style={s.cardWrap}>
          <Pressable style={s.addCatBtn} onPress={() => {
            setCategories(c => [...c, { name: t('plan.categoryGames'), apps: 'Brawl Stars, Clash Royale', current: '2.1 h', target: '1.0 h' }]);
          }}>
            <Text style={s.addCatPlus}>+</Text>
            <Text style={s.addCatText}>{t('plan.addCategory')}</Text>
          </Pressable>
        </View>

        {/* Duration */}
        <View style={s.cardWrap}>
          <Card>
            <Eye>Durée du programme</Eye>
            <View style={s.weeksRow}>
              <Pressable onPress={() => setWeeks(w => Math.max(1, w - 1))} style={s.weekBtn}>
                <Text style={s.weekBtnText}>−</Text>
              </Pressable>
              <View style={{ alignItems: 'center' }}>
                <Numeric size={36}>{weeks}</Numeric>
                <Text style={s.weekUnit}>semaines</Text>
              </View>
              <Pressable onPress={() => setWeeks(w => Math.min(52, w + 1))} style={s.weekBtn}>
                <Text style={s.weekBtnText}>+</Text>
              </Pressable>
            </View>
            <View style={s.weekBar}>
              <View style={[s.weekFill, { width: `${(4 / weeks) * 100}%` }]} />
            </View>
            <Text style={s.weekSub}>Semaine 4 / {weeks}</Text>
          </Card>
        </View>

        {/* Habits */}
        <View style={s.cardWrap}>
          <Card padded={false}>
            <View style={s.habitHeader}>
              <Eye>Habitudes</Eye>
              <Pressable onPress={addHabit} hitSlop={12}>
                <View style={s.addBadge}><Text style={s.addBadgeText}>+</Text></View>
              </Pressable>
            </View>
            {habits.map((h, i) => (
              <View key={i} style={s.habitItem}>
                <Text style={s.habitName}>{h.name}</Text>
                <Pressable onPress={() => removeHabit(i)} hitSlop={8}>
                  <View style={s.removeBadge}><Text style={s.removeBadgeText}>−</Text></View>
                </Pressable>
              </View>
            ))}
          </Card>
        </View>

        {/* Chat assist */}
        <View style={s.cardWrap}>
          <Card padded={false}>
            <Pressable style={s.chatAssist} onPress={() => navigation.navigate('HabitChat', { habitName: 'Mon plan' })}>
              <View style={s.chatLogo}><Text style={s.chatLogoLetter}>s</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.chatTitle}>Besoin d'aide ?</Text>
                <Text style={s.chatSub}>Discute avec l'assistant pour ajuster ton plan</Text>
              </View>
              <Text style={s.chatChevron}>›</Text>
            </Pressable>
          </Card>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={s.bottomCta}>
        <Button label="Mettre à jour" variant="primary" fullWidth onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  headerRow: { paddingHorizontal: 18, paddingVertical: 12 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backArrow: { color: tokens.color.sub, fontSize: 18, lineHeight: 20 },
  backLabel: { fontFamily: tokens.font.sans, fontSize: 11, letterSpacing: 2, color: tokens.color.sub, fontWeight: '500' },
  cardWrap: { paddingHorizontal: 16, paddingBottom: 14 },
  // Time blocks
  timeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timeCenter: { alignItems: 'center', paddingHorizontal: 12 },
  timeLabel: { fontFamily: tokens.font.sans, fontSize: 9.5, letterSpacing: 1.2, color: tokens.color.faint, fontWeight: '500' },
  catNameRow: { gap: 2, marginTop: 12 },
  catName: { fontFamily: tokens.font.sans, fontSize: 14, color: tokens.color.fg, fontWeight: '500' },
  catApps: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint, fontStyle: 'italic' },
  addCatBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16,
    paddingVertical: 10, paddingHorizontal: 14,
    borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
    borderRadius: 12, borderStyle: 'dashed',
  },
  addCatPlus: { fontFamily: tokens.font.sans, fontSize: 16, color: tokens.color.sub },
  addCatText: { fontFamily: tokens.font.sans, fontSize: 13, color: tokens.color.sub },
  // Weeks
  weeksRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  weekBtn: {
    width: 44, height: 44, borderRadius: 999, borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
    alignItems: 'center', justifyContent: 'center',
  },
  weekBtnText: { color: tokens.color.fg, fontSize: 22, lineHeight: 24 },
  weekUnit: { fontFamily: tokens.font.sans, fontSize: 12, color: tokens.color.sub, marginTop: 2 },
  weekBar: { height: 3, backgroundColor: tokens.color.fill, borderRadius: 2, marginTop: 16, overflow: 'hidden' },
  weekFill: { height: 3, backgroundColor: tokens.color.primary, borderRadius: 2 },
  weekSub: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint, marginTop: 6 },
  // Habits
  habitHeader: {
    padding: 16, paddingHorizontal: 18, paddingBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  habitItem: {
    paddingVertical: 12, paddingHorizontal: 18,
    borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
    flexDirection: 'row', alignItems: 'center',
  },
  habitName: { flex: 1, fontFamily: tokens.font.sans, fontSize: 13.5, color: tokens.color.fg },
  addBadge: { width: 26, height: 26, borderRadius: 999, backgroundColor: tokens.color.primary, alignItems: 'center', justifyContent: 'center' },
  addBadgeText: { color: tokens.color.ink, fontSize: 16, lineHeight: 18, fontWeight: '600' },
  removeBadge: {
    width: 26, height: 26, borderRadius: 999, borderWidth: tokens.border.hairline, borderColor: 'rgba(201,165,122,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  removeBadgeText: { color: tokens.color.warm, fontSize: 16, lineHeight: 18 },
  // Chat
  chatAssist: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, paddingHorizontal: 18 },
  chatLogo: { width: 32, height: 32, borderRadius: 8, backgroundColor: tokens.color.primary, alignItems: 'center', justifyContent: 'center' },
  chatLogoLetter: { fontFamily: tokens.font.sans, fontStyle: 'italic', fontSize: 16, color: tokens.color.ink },
  chatTitle: { fontFamily: tokens.font.sans, fontSize: 13.5, color: tokens.color.fg },
  chatSub: { fontFamily: tokens.font.sans, fontSize: 11, color: tokens.color.faint, marginTop: 2 },
  chatChevron: { color: tokens.color.faint, fontSize: 16 },
  bottomCta: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
});
