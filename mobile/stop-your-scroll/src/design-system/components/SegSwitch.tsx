/**
 * SegSwitch — pill-shaped 2-tab segmented control (Évolution / Comparer).
 *  Uses the warm cream fill for the active segment.
 */
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { tokens } from '../tokens';

type Tab<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
};

export function SegSwitch<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <View className="flex-row rounded-full border-[0.5px] border-line bg-fill p-1">
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <Pressable
            key={t.id}
            onPress={() => onChange(t.id)}
            className={`flex-1 items-center rounded-full py-2 ${on ? 'bg-primary' : ''}`}
          >
            <Text
              className={`font-sans text-[12.5px] ${on ? 'font-semibold text-ink' : 'font-normal text-sub'}`}
              style={{ letterSpacing: 0.2, fontFamily: tokens.font.sans }}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
