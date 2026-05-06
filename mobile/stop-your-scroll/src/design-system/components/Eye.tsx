/**
 * Eye — uppercase eyebrow label, used above every section/card.
 *
 *   <Eye>Bonnes habitudes</Eye>
 *   <Eye action="Voir tout">Réseaux sociaux</Eye>
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../tokens';

type Props = {
  children: React.ReactNode;
  action?: string;
  style?: any;
};

export function Eye({ children, action, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.label}>{children}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  label: {
    fontFamily: tokens.font.sans,
    fontSize: 10.5, letterSpacing: tokens.letterSpacing.caps,
    textTransform: 'uppercase', color: tokens.color.sub, fontWeight: '500',
  },
  action: { fontFamily: tokens.font.sans, fontSize: 12, color: tokens.color.faint },
});
