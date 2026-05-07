import React from 'react';
import { Image, ImageSourcePropType, View, Text, ScrollView } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View className="px-[22px] pb-[18px] pt-[14px]">
          <View className="mb-3 flex-row items-center gap-[10px]">
            <BrandLogo size={28} />
            <Text className="font-sans text-[16px] font-medium uppercase text-sub" style={{ letterSpacing: 1.4 }}>{t('brand.name')}</Text>
          </View>
          {/* <Text style={styles.kicker}>{t('dash.kicker').toUpperCase()}</Text> */}
          <Text className="mt-[10px] font-sans text-[31px] leading-[34.1px] text-fg" style={{ letterSpacing: -0.6 }}>
            {t('dash.heroPre')}{'\n'}
            <Text className="italic">{t('dash.heroValue')}</Text> {t('dash.heroPost')}
          </Text>
        </View>

        {/* Objectif */}
        <View className="px-4 pb-3">
          <Card>
            <Eye action="en bonne voie">{t('dash.objective')}</Eye>
            <View className="mt-3">
              <Bar value={0.57} height={6} />
            </View>
            <View className="mt-[14px] flex-row justify-between">
              {weekDots.map(([d, s], i) => (
                <View key={i} className="items-center gap-[6px]">
                  <View
                    className="h-2 w-2 rounded-full"
                    style={[
                      { backgroundColor: s === 'planned' ? '#2A2620' : tokens.color.primary },
                      s === 'today' && {
                        shadowColor: tokens.color.fg,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.18,
                        shadowRadius: 3,
                      },
                    ]}
                  />
                  <Text className="font-sans text-[10px]" style={{ color: s === 'today' ? tokens.color.fg : tokens.color.faint, fontWeight: s === 'today' ? '600' : '400', letterSpacing: 0.4 }}>{d}</Text>
                </View>
              ))}
            </View>
            <Text className="mt-[14px] font-sans text-[13px] leading-[19.5px] text-sub">
              {t('dash.objLeft1')} <Text style={{ color: tokens.color.fg }}>{t('dash.objLeft2')}</Text> {t('dash.objLeft3')}
            </Text>
          </Card>
        </View>

        {/* Prochain concret */}
        <View className="px-4 pb-3">
          <Card>
            <Eye>{t('dash.nextSlot')}</Eye>
            <Text className="mt-[10px] font-sans text-[20px] leading-6 text-fg">Lecture du soir - 1h30</Text>
            <View className="mt-[14px] self-start rounded-full border-[0.5px] border-line px-[9px] py-[5px]">
              <Text className="font-sans text-[11px] text-faint">{t('dash.nextSlotPrep')}</Text>
            </View>

            <Text className="mt-[10px] font-sans text-[20px] leading-6 text-fg">Arroser les plantes - 30 min</Text>
            <View className="mt-[14px] self-start rounded-full border-[0.5px] border-line px-[9px] py-[5px]">
              <Text className="font-sans text-[11px] text-faint">préparation à 9h45</Text>
            </View>

          </Card>
        </View>

        {/* Réseaux sociaux */}
        <View className="px-4 pb-3">
          <Card>
            <Eye action={t('dash.socialQuota')}>{t('dash.socials')}</Eye>
            <Text className="mt-[10px] font-sans text-[21px] leading-[24.15px] text-fg">{t('dash.socialTitle')}</Text>
            <Text className="mt-2 font-sans text-[12.5px] leading-[19.375px] text-sub">{t('dash.socialBodyShort')}</Text>
            <View className="mt-4">
              <Bar value={0.67} height={6} warm />
            </View>
            <View className="mt-[14px] gap-[10px]">
              {socialApps.map((app, i) => (
                <View key={i} className="flex-row items-center gap-[10px] py-0.5">
                  <View className="h-[30px] w-[30px] items-center justify-center rounded-[6px] border-[0.5px] border-lineStrong bg-cardSoft">
                    {app.logoSource ? (
                      <Image source={app.logoSource} className="h-full w-full rounded-[6px]" />
                    ) : (
                      <Text className="font-sans text-[12px] font-semibold text-sub">{app.logoText}</Text>
                    )}
                  </View>
                  <View className="flex-1 flex-row items-baseline justify-between gap-3">
                    <Text className="font-sans text-[14px] text-fg">{app.name}</Text>
                    <Text className="text-right font-sans text-[11.5px] italic" style={{ color: app.warm ? tokens.color.warm : tokens.color.faint }}>
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
