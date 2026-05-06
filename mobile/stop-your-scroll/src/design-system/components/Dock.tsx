/**
 * Dock — bottom 4-tab navigation: Plan / Gestion / Parcours / Compte.
 * Wire the `onPress` to your navigator. Active state set by parent.
 */
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Line, Path } from 'react-native-svg';
import { tokens } from '../tokens';
import { useTranslation } from 'react-i18next';

export type DockId = 'plan' | 'gestion' | 'parcours' | 'compte';

type Props = {
  active: DockId;
  onChange?: (id: DockId) => void;
};

export function Dock({ active, onChange }: Props) {
  const { t } = useTranslation();
  const items: { id: DockId; label: string; Icon: React.FC<{ color: string }> }[] = [
    { id: 'plan',     label: t('dock.plan'),     Icon: DotGrid },
    { id: 'gestion',  label: t('dock.gestion'),  Icon: Calendar },
    { id: 'parcours', label: t('dock.parcours'), Icon: Spark },
    { id: 'compte',   label: t('dock.compte'),   Icon: Person },
  ];
  return (
    <View style={styles.dock}>
      {items.map(({ id, label, Icon }) => {
        const on = id === active;
        const c = on ? tokens.color.fg : tokens.color.faint;
        return (
          <Pressable key={id} onPress={() => onChange?.(id)} style={styles.cell}>
            <Icon color={c} />
            <Text style={[styles.label, { color: c, fontWeight: on ? '500' : '400' }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    flexDirection: 'row',
    borderTopWidth: tokens.border.hairline, borderTopColor: tokens.color.line,
    backgroundColor: tokens.color.surface,
    paddingTop: tokens.layout.dockPaddingY,
    paddingBottom: tokens.layout.dockPaddingBot,
    paddingHorizontal: 8,
  },
  cell: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 6 },
  label: { fontFamily: tokens.font.sans, fontSize: 10.5, letterSpacing: 0.4 },
});

// ── Glyphs ──
const DotGrid = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18">
    {[3, 9, 15].flatMap(y => [3, 9, 15].map(x => (
      <Circle key={`${x}-${y}`} cx={x} cy={y} r={1.1} fill={color} />
    )))}
  </Svg>
);
const Calendar = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18">
    <Rect x={2.5} y={3.5} width={13} height={12} rx={2} stroke={color} strokeWidth={1} fill="none" />
    <Line x1={2.5} y1={7} x2={15.5} y2={7} stroke={color} strokeWidth={1} />
    <Line x1={6} y1={2} x2={6} y2={5} stroke={color} strokeWidth={1} />
    <Line x1={12} y1={2} x2={12} y2={5} stroke={color} strokeWidth={1} />
  </Svg>
);
const Spark = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18">
    <Path d="M2 13 L6 8 L9 11 L13 4 L16 9" stroke={color} strokeWidth={1} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const Person = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18">
    <Circle cx={9} cy={6.5} r={2.7} stroke={color} strokeWidth={1} fill="none" />
    <Path d="M3 16 C3 12.5, 6 11, 9 11 C12 11, 15 12.5, 15 16" stroke={color} strokeWidth={1} fill="none" />
  </Svg>
);
