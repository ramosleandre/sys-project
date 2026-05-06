import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { BrandLogo } from '../design-system';
import { Field } from '../design-system/components/Field';
import { Button } from '../design-system/components/Button';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('lea.morel@');
  const [password, setPassword] = useState('••••••••••');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoRow}>
            <BrandLogo size={42} />
            <Text style={styles.brandName}>{t('brand.name').toUpperCase()}</Text>
          </View>

          {/* Greeting */}
          <View style={styles.greeting}>
            <Text style={styles.greetLine1}>{t('login.greeting1')}</Text>
            <Text style={styles.greetLine2}>{t('login.greeting2')}</Text>
          </View>

          {/* Fields */}
          <View style={styles.fields}>
            <Field label={t('login.id')} value={email} onChangeText={setEmail} />
            <Field
              label={t('login.password')}
              value={password}
              onChangeText={setPassword}
              secure
            />
          </View>

          {/* CTA */}
          <Button
            label={t('login.cta')}
            variant="primary"
            fullWidth
            style={styles.cta}
            onPress={() => navigation.replace('Main')}
          />

          {/* Links */}
          <View style={styles.links}>
            <Text style={styles.link}>{t('login.forgot')}</Text>
            <Text style={styles.link}>{t('login.create')}</Text>
          </View>
        </View>

        {/* Bottom */}
        <Text style={styles.continueWith}>{t('login.continueWith')}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  flex: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 56,
  },
  brandName: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: tokens.color.sub,
    fontFamily: tokens.font.sans,
  },
  greeting: { marginBottom: 44 },
  greetLine1: {
    fontFamily: tokens.font.sans,
    fontSize: tokens.fontSize.hero,
    lineHeight: tokens.fontSize.hero * 1.05,
    letterSpacing: -1,
    color: tokens.color.fg,
  },
  greetLine2: {
    fontFamily: tokens.font.sans,
    fontSize: tokens.fontSize.hero,
    lineHeight: tokens.fontSize.hero * 1.05,
    letterSpacing: -1,
    color: tokens.color.sub,
  },
  fields: { gap: 14 },
  cta: { marginTop: 28 },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  link: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
  },
  continueWith: {
    textAlign: 'center',
    paddingBottom: 28,
    fontSize: 11,
    color: tokens.color.faint,
    letterSpacing: 0.3,
    fontFamily: tokens.font.sans,
  },
});
