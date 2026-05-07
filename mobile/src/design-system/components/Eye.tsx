/**
 * Eye — uppercase eyebrow label, used above every section/card.
 *
 *   <Eye>Bonnes habitudes</Eye>
 *   <Eye action="Voir tout">Réseaux sociaux</Eye>
 */
import React from 'react';
import { View, Text } from 'react-native';
import { tokens } from '../tokens';

type Props = {
  children: React.ReactNode;
  action?: string;
  style?: any;
};

export function Eye({ children, action, style }: Props) {
  return (
    <View className="flex-row items-baseline justify-between" style={style}>
      <Text className="font-sans text-[10.5px] font-medium uppercase text-sub" style={{ letterSpacing: tokens.letterSpacing.caps }}>
        {children}
      </Text>
      {action ? <Text className="font-sans text-[12px] text-faint">{action}</Text> : null}
    </View>
  );
}
