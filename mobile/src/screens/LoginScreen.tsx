import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 justify-center px-8">
          {/* Logo */}
          <View className="mb-14 flex-row items-center gap-3">
            <BrandLogo size={42} />
            <Text className="font-sans text-[12px] text-sub" style={{ letterSpacing: 1.5 }}>
              {t('brand.name').toUpperCase()}
            </Text>
          </View>

          {/* Greeting */}
          <View className="mb-11">
            <Text className="font-sans text-[38px] leading-[40px] text-fg" style={{ letterSpacing: -1 }}>
              {t('login.greeting1')}
            </Text>
            <Text className="font-sans text-[38px] leading-[40px] text-sub" style={{ letterSpacing: -1 }}>
              {t('login.greeting2')}
            </Text>
          </View>

          {/* Fields */}
          <View className="gap-[14px]">
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
            className="mt-7"
            onPress={() => navigation.replace('OnboardingChat')}
          />

          {/* Links */}
          <View className="mt-[18px] flex-row justify-between">
            <Text className="font-sans text-[12.5px] text-sub">{t('login.forgot')}</Text>
            <Text className="font-sans text-[12.5px] text-sub">{t('login.create')}</Text>
          </View>
        </View>

        {/* Bottom */}
        <Text className="pb-7 text-center font-sans text-[11px] text-faint" style={{ letterSpacing: 0.3 }}>
          {t('login.continueWith')}
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
