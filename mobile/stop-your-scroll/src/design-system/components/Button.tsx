/**
 * Button — three variants matching the mockup language.
 *  primary  → cream fill on dark (CTA: "Se connecter", "Modifier le plan")
 *  ghost    → hairline border, subtle text ("j'y arrive pas ce soir")
 *  warm     → warm-tinted outline, used only for emergency/over-limit
 */
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../tokens';

type Variant = 'primary' | 'ghost' | 'warm';

type Props = {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function Button({ label, variant = 'primary', onPress, style, fullWidth }: Props) {
  return (
    <Pressable onPress={onPress} style={[
      styles.base,
      variant === 'primary' && styles.primary,
      variant === 'ghost' && styles.ghost,
      variant === 'warm' && styles.warm,
      fullWidth && { alignSelf: 'stretch' },
      style,
    ]}>
      <Text style={[
        styles.label,
        variant === 'primary' && { color: tokens.color.ink },
        variant === 'ghost' && { color: tokens.color.sub },
        variant === 'warm' && { color: tokens.color.warm },
      ]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14, paddingHorizontal: 22,
    borderRadius: tokens.radius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  primary: { backgroundColor: tokens.color.primary },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: tokens.border.hairline, borderColor: tokens.color.lineStrong,
  },
  warm: {
    backgroundColor: 'transparent',
    borderWidth: tokens.border.hairline, borderColor: 'rgba(201,165,122,0.4)',
  },
  label: {
    fontFamily: tokens.font.sans,
    fontSize: 14, fontWeight: '500', letterSpacing: -0.1,
  },
});
