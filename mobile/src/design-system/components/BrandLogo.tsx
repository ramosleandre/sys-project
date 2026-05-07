import React from 'react';
import Svg, { Text as SvgText } from 'react-native-svg';
import { tokens } from '../tokens';

type Props = {
  size?: number;
  color?: string;
};

export function BrandLogo({ size = 44, color = tokens.color.fg }: Props) {
  const showGhosts = size >= 32;
  const font = 'Fraunces-Italic';
  return (
    <Svg width={size} height={size * 1.18} viewBox="0 0 100 118" accessibilityRole="image">
      {showGhosts && (
        <>
          <SvgText
            x="50" y="74" textAnchor="middle"
            fontFamily={font} fontStyle="italic" fontWeight="400" fontSize="96"
            fill={color} opacity={0.30}
            translate="0, 23"
          >s</SvgText>
          <SvgText
            x="50" y="74" textAnchor="middle"
            fontFamily={font} fontStyle="italic" fontWeight="400" fontSize="96"
            fill={color} opacity={0.55}
            translate="0, 11.5"
          >s</SvgText>
        </>
      )}
      <SvgText
        x="50" y="74" textAnchor="middle"
        fontFamily={font} fontStyle="italic" fontWeight="400" fontSize="96"
        fill={color}
      >s</SvgText>
    </Svg>
  );
}
