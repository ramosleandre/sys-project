import React from 'react';
import { Image, ImageSourcePropType, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../design-system/tokens';
import { Eye } from '../design-system/components/Eye';
import { Card } from '../design-system/components/Card';
import { Bar } from '../design-system/components/Bar';
import { BrandLogo } from '../design-system/components/BrandLogo';

export function DashboardScreen() {
  const { t } = useTranslation();

  const socialApps: {
    name: string;
    logoText: string;
    logoSource?: ImageSourcePropType;
    status: string;
    warm?: boolean;
  }[] = [
    { name: 'Tiktok', logoText: 'T', logoSource: require('../../assets/apps/tiktok.webp'), status: t('dash.socialUsed'), warm: true },
    { name: 'Instagram', logoText: 'P', logoSource: require('../../assets/apps/Instagram_icon.png'), status: t('dash.socialShared') },
    { name: 'Snapchat', logoText: 'S', logoSource: require('../../assets/apps/Snapchat.png'), status: t('dash.socialShared') },
  ];

  const habits = [
    { name: t('habit.reading'), status: t('dash.habitTonight'), caption: 'repris hier soir' },
    { name: t('habit.walking'), status: t('dash.habitPlanned'), caption: "prévue aujourd'hui" },
    { name: t('habit.tea'), status: t('dash.habitTinyStep'), caption: 'petit pas possible' },
  ];

  const weekDots: [string, 'done' | 'today' | 'planned'][] = [
    ['L', 'done'], ['M', 'done'], ['M', 'done'], ['J', 'today'],
    ['V', 'planned'], ['S', 'planned'], ['D', 'planned'],
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <BrandLogo size={28} />
            <Text style={styles.brandName}>{t('brand.name')}</Text>
          </View>
          {/* <Text style={styles.kicker}>{t('dash.kicker').toUpperCase()}</Text> */}
          <Text style={styles.heroTitle}>
            {t('dash.heroPre')}{'\n'}
            <Text style={styles.heroItalic}>{t('dash.heroValue')}</Text> {t('dash.heroPost')}
          </Text>
        </View>

        {/* Objectif */}
        <View style={styles.section}>
          <Card>
            <Eye action="en bonne voie">{t('dash.objective')}</Eye>
            <View style={{ marginTop: 12 }}>
              <Bar value={0.57} height={6} />
            </View>
            <View style={styles.weekRow}>
              {weekDots.map(([d, s], i) => (
                <View key={i} style={styles.weekDay}>
                  <View style={[
                    styles.dot,
                    { backgroundColor: s === 'planned' ? '#2A2620' : tokens.color.primary },
                    s === 'today' && styles.dotToday,
                  ]} />
                  <Text style={[
                    styles.dotLabel,
                    { color: s === 'today' ? tokens.color.fg : tokens.color.faint,
                      fontWeight: s === 'today' ? '600' : '400' },
                  ]}>{d}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.objLeft}>
              {t('dash.objLeft1')} <Text style={{ color: tokens.color.fg }}>{t('dash.objLeft2')}</Text> {t('dash.objLeft3')}
            </Text>
          </Card>
        </View>

        {/* Prochain concret */}
        <View style={styles.section}>
          <Card>
            <Eye>{t('dash.nextSlot')}</Eye>
            <Text style={styles.nextWhen}>Lecture du soir - 1h30</Text>
            <View style={styles.prepPill}>
              <Text style={styles.prepText}>{t('dash.nextSlotPrep')}</Text>
            </View>

            <Text style={styles.nextWhen}>Arroser les plantes - 30 min</Text>
            <View style={styles.prepPill}>
              <Text style={styles.prepText}>préparation à 9h45</Text>
            </View>

          </Card>
        </View>

        {/* Réseaux sociaux */}
        <View style={styles.section}>
          <Card>
            <Eye action={t('dash.socialQuota')}>{t('dash.socials')}</Eye>
            <Text style={styles.socialTitle}>{t('dash.socialTitle')}</Text>
            <Text style={styles.socialBody}>{t('dash.socialBodyShort')}</Text>
            <View style={styles.socialMeter}>
              <Bar value={0.67} height={6} warm />
            </View>
            <View style={styles.socialApps}>
              {socialApps.map((app, i) => (
                <View key={i} style={styles.socialApp}>
                  <View style={styles.socialLogo}>
                    {app.logoSource ? (
                      <Image source={app.logoSource} style={styles.socialLogoImage} />
                    ) : (
                      <Text style={styles.socialLogoText}>{app.logoText}</Text>
                    )}
                  </View>
                  <View style={styles.socialAppCopy}>
                    <Text style={styles.socialAppName}>{app.name}</Text>
                    <Text style={[styles.socialAppStatus, app.warm && styles.socialAppStatusWarm]}>
                      {app.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Bonnes habitudes */}
        {/* <View style={[styles.section, { paddingBottom: 22 }]}>
          <Card padded={false}>
            <View style={{ padding: 16, paddingBottom: 8, paddingHorizontal: 18 }}>
              <Eye action={t('common.seeAll')}>{t('dash.habits')}</Eye>
            </View>
            <View style={styles.habitSummary}>
              <Text style={styles.habitSummaryTitle}>{t('dash.habitSummaryTitle')}</Text>
              <View style={styles.habitTiles}>
                {habits.map((h, i) => (
                  <View key={i} style={styles.habitTile}>
                    <View style={styles.habitMarker}>
                      <Text style={styles.habitMarkerText}>{i + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.habitName}>{h.name}</Text>
                      <Text style={styles.habitCaption}>{h.caption}</Text>
                    </View>
                    <Text style={styles.habitStatus}>{h.status}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  scroll: { flex: 1 },
  hero: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 18 },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  brandName: {
    fontFamily: tokens.font.sans,
    fontSize: 16,
    letterSpacing: 1.4,
    color: tokens.color.sub,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.sub,
    fontWeight: '500',
  },
  heroTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 31,
    lineHeight: 31 * 1.1,
    letterSpacing: -0.6,
    color: tokens.color.fg,
    marginTop: 10,
  },
  heroItalic: { fontStyle: 'italic' },
  section: { paddingHorizontal: 16, paddingBottom: 12 },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  weekDay: { alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 999 },
  dotToday: {
    shadowColor: tokens.color.fg,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  dotLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  objLeft: {
    marginTop: 14,
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    lineHeight: 13 * 1.5,
  },
  nextWhen: {
    fontFamily: tokens.font.sans,
    fontSize: 20,
    lineHeight: 20 * 1.2,
    color: tokens.color.fg,
    marginTop: 10,
  },
  nextAct: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.sub,
    fontStyle: 'italic',
    marginTop: 6,
  },
  prepPill: {
    marginTop: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.line,
    borderRadius: 999,
  },
  prepText: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.faint,
  },
  socialTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 21,
    lineHeight: 21 * 1.15,
    color: tokens.color.fg,
    marginTop: 10,
  },
  socialBody: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    lineHeight: 12.5 * 1.55,
    color: tokens.color.sub,
    marginTop: 8,
  },
  socialMeter: { marginTop: 16 },
  socialApps: {
    marginTop: 14,
    gap: 10,
  },
  socialApp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 2,
  },
  socialLogo: {
    width: 30,
    height: 30,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.color.cardSoft,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLogoText: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
    fontWeight: '600',
  },
  socialLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: tokens.radius.sm,
  },
  socialAppCopy: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialAppName: {
    fontFamily: tokens.font.sans,
    fontSize: 14,
    color: tokens.color.fg,
  },
  socialAppStatus: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.faint,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  socialAppStatusWarm: { color: tokens.color.warm },
  habitSummary: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  habitSummaryTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 19,
    lineHeight: 19 * 1.25,
    color: tokens.color.fg,
  },
  habitTiles: {
    marginTop: 12,
    gap: 10,
  },
  habitTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: tokens.border.hairline,
    borderColor: tokens.color.line,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.color.fill,
  },
  habitMarker: {
    width: 28,
    height: 28,
    borderRadius: tokens.radius.sm,
    backgroundColor: tokens.color.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitMarkerText: {
    fontFamily: tokens.font.sans,
    fontSize: 12,
    color: tokens.color.sub,
    fontWeight: '600',
  },
  habitName: {
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.fg,
    fontStyle: 'italic',
  },
  habitCaption: {
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.faint,
    marginTop: 2,
  },
  habitStatus: {
    maxWidth: 96,
    fontFamily: tokens.font.sans,
    fontSize: 11.5,
    color: tokens.color.sub,
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
