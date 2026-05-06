/**
 * Bar — hairline progress bar (single-axis, used for objective, app gauges, habit pct).
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

type Props = {
  value: number;       // 0..1
  height?: number;     // default 3
  warm?: boolean;      // use warm color (over-limit / emergency)
};

export function Bar({ value, height = 3, warm }: Props) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <View style={[
        styles.fill,
        { width: `${pct * 100}%`, backgroundColor: warm ? tokens.color.warm : tokens.color.primary, borderRadius: height / 2 },
      ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { backgroundColor: tokens.color.fill, overflow: 'hidden' },
  fill:  { height: '100%' },
});
