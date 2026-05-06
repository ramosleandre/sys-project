import React from 'react';
import Svg, { Text as SvgText } from 'react-native-svg';
import { tokens } from '../tokens';

type Props = {
  size?: number;
  color?: string;
};

export function BrandLogo({ size = 44, color = tokens.color.fg }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 118" accessibilityRole="image">
      <SvgText
        x="50"
        y="74"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="96"
        fill={color}
      >
        s
      </SvgText>
    </Svg>
  );
}
