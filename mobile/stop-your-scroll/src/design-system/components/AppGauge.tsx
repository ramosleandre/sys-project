/**
 * AppGauge — one row in the "Réseaux sociaux" bento card.
 *  Tile + name + quiet progress + status line.
 *  When `over`, the right-hand label switches to warm.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../tokens';
import { AppTile } from './AppTile';
import { Bar } from './Bar';

type Props = {
  letter: string;
  name: string;
  used: number;
  cap: number;
  tone?: 'a' | 'b' | 'c' | 'd';
  over?: boolean;
  status: string;          // localized "dépassé" / "usage suspendu à 22:00"
};

export function AppGauge({ letter, name, used, cap, tone, over, status }: Props) {
  const pct = Math.min(used / cap, 1);
  return (
    <View style={styles.row}>
      <AppTile letter={letter} tone={tone} />
      <View style={styles.col}>
        <View style={styles.head}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.usage, { color: over ? tokens.color.warm : tokens.color.sub }]}>
            {over ? 'A reprendre' : 'Dans le cadre'}
          </Text>
        </View>
        <View style={{ marginTop: 7 }}>
          <Bar value={pct} height={2} warm={over} />
        </View>
        <Text style={[styles.status, { color: over ? tokens.color.warm : tokens.color.faint }]}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  col:    { flex: 1 },
  head:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  name:   { fontFamily: tokens.font.sans, fontSize: 13.5, color: tokens.color.fg },
  usage:  {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    fontStyle: 'italic',
  },
  status: { fontFamily: tokens.font.sans, fontSize: 11, marginTop: 5, fontStyle: 'italic' },
});
