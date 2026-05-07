import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { SegSwitch } from '../design-system/components/SegSwitch';
import { RootStackParamList } from '../navigation/types';
import { setLang } from '../i18n';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function GroupHead({ label }: { label: string }) {
  return (
    <Text className="px-[22px] pb-2 pt-[14px] font-sans text-[10.5px] font-medium text-faint" style={{ letterSpacing: 1.6 }}>
      {label.toUpperCase()}
    </Text>
  );
}

function Row({ title, val, warn, onPress }: { title: string; val?: string; warn?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="mx-[22px] flex-row items-center gap-3 border-t-[0.5px] border-line py-[13px]">
      <Text className="flex-1 font-sans text-[13.5px]" style={{ color: warn ? tokens.color.warm : tokens.color.fg }}>{title}</Text>
      {val && <Text className="font-sans text-[12px] italic text-faint">{val}</Text>}
      <Text className="text-[16px] leading-[18px] text-faint">{'›'}</Text>
    </Pressable>
  );
}

export function AccountScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const handleLangChange = (lang: 'fr' | 'en') => {
    setLang(lang);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header + avatar */}
        <View className="px-[22px] pb-[22px] pt-[14px]">
          <Text className="font-sans text-[11px] font-medium text-sub" style={{ letterSpacing: 2 }}>{t('account.title').toUpperCase()}</Text>
          <View className="mt-[14px] flex-row items-center gap-[14px]">
            <View className="h-[54px] w-[54px] items-center justify-center rounded-full border-[0.5px] border-lineStrong bg-card">
              <Text className="font-sans text-[24px] italic text-fg">L</Text>
            </View>
            <View>
              <Text className="font-sans text-[22px] text-fg" style={{ letterSpacing: -0.3 }}>Léa Morel</Text>
              <Text className="mt-0.5 font-sans text-[12px] text-sub">lea.morel@proton.me</Text>
            </View>
          </View>
        </View>

        {/* Subscription */}
        <GroupHead label={t('account.subscription')} />
        <View className="px-[22px]">
          <Card className="px-4 py-[14px]">
            <View className="flex-row items-baseline justify-between">
              <Text className="font-sans text-[18px] text-fg" style={{ letterSpacing: -0.2 }}>{t('account.plan')}</Text>
              <Text className="font-sans text-[12px] text-sub">{t('account.price')}</Text>
            </View>
            <Text className="mt-[6px] font-sans text-[11.5px] text-faint">{t('account.renew')}</Text>
            <View className="mt-3 flex-row gap-4">
              <Text className="font-sans text-[12px] text-sub">{t('account.manage')}</Text>
              <Text className="font-sans text-[12px] text-sub">{t('account.billing')}</Text>
              <Text className="font-sans text-[12px] text-faint">{t('account.restore')}</Text>
            </View>
          </Card>
        </View>

        {/* Settings */}
        <GroupHead label={t('account.settings')} />
        <Row title={t('account.notifs')} val={t('account.notifsVal')} />
        <Row title={t('account.appearance')} val={t('account.appearanceVal')} />
        <Row title={t('account.appsWatched')} val="3" />
        <Row title={t('account.account')} val="Apple · Léa M." />

        {/* Language switcher */}
        <View className="mx-[22px] gap-[10px] border-t-[0.5px] border-line py-[13px]">
          <Text className="font-sans text-[13.5px] text-fg">{t('account.language')}</Text>
          <SegSwitch
            tabs={[
              { id: 'fr' as const, label: t('account.langFr') },
              { id: 'en' as const, label: t('account.langEn') },
            ]}
            active={currentLang}
            onChange={handleLangChange}
          />
        </View>

        {/* Help */}
        <GroupHead label={t('account.help')} />
        <Row title={t('account.helpCenter')} />
        <Row title={t('account.contact')} val="contact@synk.app" />
        <Row title={t('account.legal')} />

        {/* Account */}
        <GroupHead label={t('account.acctSection')} />
        <Row title={t('account.signout')} onPress={() => navigation.navigate('Login')} />
        <Row title={t('account.deleteAcct')} warn />

        {/* Block demo screens */}
        <GroupHead label={t('account.demoSection')} />
        <Row
          title={t('account.demoPrep')}
          val={t('account.demoPrepVal')}
          onPress={() => navigation.navigate('PrepBlock')}
        />
        <Row
          title={t('account.demoOver')}
          val={t('account.demoOverVal')}
          onPress={() => navigation.navigate('OverLimit')}
        />
        <Row
          title={t('account.demoUnblock')}
          val={t('account.demoUnblockVal')}
          onPress={() => navigation.navigate('Unblock')}
        />

        <Text className="px-[22px] py-6 text-center font-sans text-[10.5px] text-faint" style={{ letterSpacing: 0.3 }}>
          {t('account.version')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
