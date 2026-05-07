/**
 * Card — bento card surface. Default padded; pass `padded={false}` for list cards.
 */
import React from 'react';
import { View, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  padded?: boolean;
  style?: ViewStyle | ViewStyle[];
  className?: string;
};

export function Card({ children, padded = true, style, className }: Props) {
  return (
    <View
      className={`rounded-[18px] border border-line bg-card ${padded ? 'p-[18px]' : ''} ${className ?? ''}`}
      style={style as any}
    >
      {children}
    </View>
  );
}
