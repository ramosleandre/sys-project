/**
 * Field — login-style underlined input. Read-only display variant + editable.
 */
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { tokens } from '../tokens';

type Props = {
  label: string;
  value: string;
  onChangeText?: (s: string) => void;
  secure?: boolean;
  editable?: boolean;
};

export function Field({ label, value, onChangeText, secure, editable = true }: Props) {
  return (
    <View className="border-b-[0.5px] border-lineStrong pb-[10px]">
      <Text className="font-sans text-[10.5px] font-medium uppercase text-faint" style={{ letterSpacing: tokens.letterSpacing.caps }}>
        {label}
      </Text>
      <TextInput
        className="mt-[6px] p-0 font-sans text-[16px] text-fg"
        style={{ fontFamily: tokens.font.sans }}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        editable={editable}
        placeholderTextColor={tokens.color.faint}
      />
    </View>
  );
}
