/**
 * HabitRow — a row in "Bonnes habitudes" / journey compare.
 *  Italic name + readable state + progress bar + last-session caption.
 */
import React from 'react';
import { View, Text } from 'react-native';
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
    <View className="gap-2">
      <View className="flex-row items-baseline justify-between">
        <Text className="font-sans text-[16px] italic text-fg" style={{ letterSpacing: -0.2, fontFamily: tokens.font.sans }}>
          {name}
        </Text>
        <Text className="font-sans text-[11.5px] italic text-faint">{count}</Text>
      </View>
      <Bar value={progress} height={3} />
      <Text className="font-sans text-[11.5px] text-sub">{caption}</Text>
    </View>
  );
}
