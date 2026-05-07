/**
 * Button — three variants matching the mockup language.
 *  primary  → cream fill on dark (CTA: "Se connecter", "Modifier le plan")
 *  ghost    → hairline border, subtle text ("j'y arrive pas ce soir")
 *  warm     → warm-tinted outline, used only for emergency/over-limit
 */
import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { tokens } from '../tokens';

type Variant = 'primary' | 'ghost' | 'warm';

type Props = {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  style?: ViewStyle;
  fullWidth?: boolean;
  className?: string;
};

export function Button({ label, variant = 'primary', onPress, style, fullWidth, className }: Props) {
  const variantClass = {
    primary: 'bg-primary',
    ghost: 'border-[0.5px] border-lineStrong bg-transparent',
    warm: 'border-[0.5px] border-warmLine bg-transparent',
  }[variant];
  const labelClass = {
    primary: 'text-ink',
    ghost: 'text-sub',
    warm: 'text-warm',
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      className={`items-center justify-center rounded-[14px] px-[22px] py-[14px] ${variantClass} ${fullWidth ? 'self-stretch' : ''} ${className ?? ''}`}
      style={style}
    >
      <Text
        className={`font-sans text-[14px] font-medium ${labelClass}`}
        style={{ letterSpacing: -0.1, fontFamily: tokens.font.sans }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
