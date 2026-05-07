/**
 * AppGauge — one row in the "Réseaux sociaux" bento card.
 *  Tile + name + quiet progress + status line.
 *  When `over`, the right-hand label switches to warm.
 */
import React from 'react';
import { View, Text } from 'react-native';
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
    <View className="flex-row items-center gap-3">
      <AppTile letter={letter} tone={tone} />
      <View className="flex-1">
        <View className="flex-row items-baseline justify-between">
          <Text className="font-sans text-[13.5px] text-fg">{name}</Text>
          <Text className="font-sans text-[11.5px] italic" style={{ color: over ? tokens.color.warm : tokens.color.sub }}>
            {over ? 'A reprendre' : 'Dans le cadre'}
          </Text>
        </View>
        <View className="mt-[7px]">
          <Bar value={pct} height={2} warm={over} />
        </View>
        <Text className="mt-[5px] font-sans text-[11px] italic" style={{ color: over ? tokens.color.warm : tokens.color.faint }}>
          {status}
        </Text>
      </View>
    </View>
  );
}
