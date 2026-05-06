/**
 * Field — login-style underlined input. Read-only display variant + editable.
 */
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        editable={editable}
        placeholderTextColor={tokens.color.faint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: tokens.border.hairline,
    borderBottomColor: tokens.color.lineStrong,
    paddingBottom: 10,
  },
  label: {
    fontFamily: tokens.font.sans, fontSize: 10.5, fontWeight: '500',
    letterSpacing: tokens.letterSpacing.caps, textTransform: 'uppercase',
    color: tokens.color.faint,
  },
  input: {
    fontFamily: tokens.font.sans, fontSize: 16,
    color: tokens.color.fg, marginTop: 6, padding: 0,
  },
});
