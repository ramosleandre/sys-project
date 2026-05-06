import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { color, font, fontSize as fs } from '../tokens';

type Variant =
  | 'micro' | 'caption' | 'small' | 'body' | 'bodyLg' | 'lead'
  | 'h3' | 'h2' | 'h1' | 'display' | 'hero' | 'timer';
type Tone = 'fg' | 'sub' | 'faint' | 'warm' | 'ink' | 'primary';

export interface SSTextProps extends TextProps {
  variant?: Variant;
  tone?: Tone;
  numeric?: boolean;     // use Krona One + tabular-nums
  italic?: boolean;
  caps?: boolean;        // small-caps eyebrow
  weight?: '400' | '500' | '600';
  center?: boolean;
}

export function Text({
  variant = 'body', tone = 'fg', numeric, italic, caps,
  weight = '400', center, style, ...rest
}: SSTextProps) {
  return (
    <RNText
      {...rest}
      style={[
        styles.base,
        {
          color: color[tone],
          fontFamily: numeric ? font.numeric : font.sans,
          fontSize: fs[variant],
          fontStyle: italic ? 'italic' : 'normal',
          fontWeight: weight,
          textTransform: caps ? 'uppercase' : 'none',
          letterSpacing: caps ? 1.6 : 0,
          textAlign: center ? 'center' : undefined,
          fontVariant: numeric ? ['tabular-nums'] : undefined,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: { includeFontPadding: false } as any,
});
