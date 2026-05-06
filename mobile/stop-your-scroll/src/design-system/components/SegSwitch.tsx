/**
 * SegSwitch — pill-shaped 2-tab segmented control (Évolution / Comparer).
 *  Uses the warm cream fill for the active segment.
 */
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

type Tab<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
};

export function SegSwitch<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <View style={styles.wrap}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <Pressable key={t.id} onPress={() => onChange(t.id)} style={[
            styles.cell,
            on && { backgroundColor: tokens.color.primary },
          ]}>
            <Text style={[
              styles.label,
              { color: on ? tokens.color.ink : tokens.color.sub, fontWeight: on ? '600' : '400' },
            ]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: tokens.color.fill,
    borderWidth: tokens.border.hairline, borderColor: tokens.color.line,
    borderRadius: tokens.radius.pill, padding: 4,
  },
  cell: {
    flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: tokens.radius.pill,
  },
  label: { fontFamily: tokens.font.sans, fontSize: 12.5, letterSpacing: 0.2 },
});
