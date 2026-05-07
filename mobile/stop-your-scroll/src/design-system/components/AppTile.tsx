/**
 * AppTile — abstract monogram tile that stands in for a social-app icon.
 *  Replace `letter` with the real branded icon at integration time.
 *  `size` is the outer square; tone selects from the four neutral fills.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { tokens } from '../tokens';

type Tone = 'a' | 'b' | 'c' | 'd';

type Props = {
  letter: string;
  tone?: Tone;
  size?: number;
};

const TONE_BG: Record<Tone, string> = {
  a: tokens.color.toneA, b: tokens.color.toneB,
  c: tokens.color.toneC, d: tokens.color.toneD,
};

export function AppTile({ letter, tone = 'a', size = 28 }: Props) {
  return (
    <View
      className="items-center justify-center border-[0.5px] border-lineStrong"
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.25), backgroundColor: TONE_BG[tone] }}
    >
      <Text className="font-sans italic text-sub" style={{ fontSize: size * 0.46, fontFamily: tokens.font.sans }}>
        {letter}
      </Text>
    </View>
  );
}
