import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
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
    <Text style={groupStyles.head}>{label.toUpperCase()}</Text>
  );
}

function Row({ title, val, warn, onPress }: { title: string; val?: string; warn?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={rowStyles.row}>
      <Text style={[rowStyles.title, warn && { color: tokens.color.warm }]}>{title}</Text>
      {val && <Text style={rowStyles.val}>{val}</Text>}
      <Text style={rowStyles.chevron}>{'›'}</Text>
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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header + avatar */}
        <View style={styles.header}>
          <Text style={styles.kicker}>{t('account.title').toUpperCase()}</Text>
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>L</Text>
            </View>
            <View>
              <Text style={styles.name}>Léa Morel</Text>
              <Text style={styles.email}>lea.morel@proton.me</Text>
            </View>
          </View>
        </View>

        {/* Subscription */}
        <GroupHead label={t('account.subscription')} />
        <View style={{ paddingHorizontal: 22 }}>
          <Card style={{ padding: 14, paddingHorizontal: 16 }}>
            <View style={styles.subRow}>
              <Text style={styles.planName}>{t('account.plan')}</Text>
              <Text style={styles.price}>{t('account.price')}</Text>
            </View>
            <Text style={styles.renew}>{t('account.renew')}</Text>
            <View style={styles.subLinks}>
              <Text style={styles.subLink}>{t('account.manage')}</Text>
              <Text style={styles.subLink}>{t('account.billing')}</Text>
              <Text style={[styles.subLink, { color: tokens.color.faint }]}>{t('account.restore')}</Text>
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
        <View style={langStyles.wrap}>
          <Text style={langStyles.label}>{t('account.language')}</Text>
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

        <Text style={styles.version}>{t('account.version')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const groupStyles = StyleSheet.create({
  head: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 8,
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    letterSpacing: 1.6,
    color: tokens.color.faint,
    fontWeight: '500',
  },
});

const rowStyles = StyleSheet.create({
  row: {
    marginHorizontal: 22,
    paddingVertical: 13,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    flex: 1,
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.fg,
  },
  val: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.faint,
    fontStyle: 'italic',
  },
  chevron: {
    color: tokens.color.faint,
    fontSize: 16,
    lineHeight: 18,
  },
});

const langStyles = StyleSheet.create({
  wrap: {
    marginHorizontal: 22,
    paddingVertical: 13,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    gap: 10,
  },
  label: {
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.fg,
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  header: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 22 },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
  },
  profile: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: tokens.color.card,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: tokens.font.sans,
    fontStyle: 'italic',
    fontSize: 24,
    color: tokens.color.fg,
  },
  name: {
    fontFamily: tokens.font.sans,
    fontSize: 22,
    letterSpacing: -0.3,
    color: tokens.color.fg,
  },
  email: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
    marginTop: 2,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  planName: {
    fontFamily: tokens.font.sans,
    fontSize: 18,
    letterSpacing: -0.2,
    color: tokens.color.fg,
  },
  price: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
  },
  renew: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.faint,
    marginTop: 6,
  },
  subLinks: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  subLink: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
  },
  version: {
    paddingVertical: 24,
    paddingHorizontal: 22,
    textAlign: 'center',
    fontFamily: tokens.font.sans,
    fontSize: 10.5,
    color: tokens.color.faint,
    letterSpacing: 0.3,
  },
});
