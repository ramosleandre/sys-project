/**
 * Numeric — wrapper for any number that should use the Krona One face & tabular nums.
 *
 *   <Numeric size={56}>1:27</Numeric>
 *   <Numeric size={22} italic>+ 144 h</Numeric>
 */
import React from 'react';
import { Text, TextStyle } from 'react-native';
import { tokens } from '../tokens';

type Props = {
  children: React.ReactNode;
  size?: number;
  color?: string;
  italic?: boolean;
  style?: TextStyle;
};

export function Numeric({ children, size = 16, color = tokens.color.fg, italic, style }: Props) {
  return (
    <Text style={[{
      fontFamily: tokens.font.numeric,
      fontSize: size,
      color,
      letterSpacing: -size * 0.022,
      fontStyle: italic ? 'italic' : 'normal',
      // RN respects fontVariant for tabular numbers
      // @ts-ignore
      fontVariant: ['tabular-nums'],
    }, style]}>{children}</Text>
  );
}
