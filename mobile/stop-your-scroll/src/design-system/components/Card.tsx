/**
 * Card — bento card surface. Default padded; pass `padded={false}` for list cards.
 */
import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

type Props = {
  children: React.ReactNode;
  padded?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export function Card({ children, padded = true, style }: Props) {
  return (
    <View style={[styles.card, padded && styles.padded, style as any]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.color.card,
    borderWidth: tokens.border.thin,
    borderColor: tokens.color.line,
    borderRadius: tokens.radius.xl,
  },
  padded: { padding: tokens.layout.cardPadding },
});
