/**
 * HabitRow — a row in "Bonnes habitudes" / journey compare.
 *  Italic name + readable state + progress bar + last-session caption.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../tokens';
import { Bar } from './Bar';

type Props = {
  name: string;
  count: string;       // "bien parti"
  progress: number;    // 0..1
  caption: string;     // "hier · 2 h 14"
};

export function HabitRow({ name, count, progress, caption }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.head}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
      <Bar value={progress} height={3} />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row:     { gap: 8 },
  head:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  name:    {
    fontFamily: tokens.font.sans, fontStyle: 'italic',
    fontSize: 16, letterSpacing: -0.2, color: tokens.color.fg,
  },
  count:   {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.faint,
    fontStyle: 'italic',
  },
  caption: { fontFamily: tokens.font.sans, fontSize: 11.5, color: tokens.color.sub },
});
