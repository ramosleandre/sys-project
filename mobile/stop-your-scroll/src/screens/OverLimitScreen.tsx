import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tokens } from '../design-system/tokens';
import { Button } from '../design-system/components/Button';
import { Card } from '../design-system/components/Card';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export function OverLimitScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const apps = [
    { name: 'TikTok', time: '3 h 40', main: true },
    { name: 'Instagram', time: '2 h 10' },
    { name: 'Snapchat', time: '1 h 24' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable onPress={() => navigation.goBack()} style={styles.topKicker}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.kicker}>{t('over.kicker').toUpperCase()}</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.heroTitle}>Limite dépassée.</Text>
        <Text style={styles.body}>Tu as dépassé ton temps prévu aujourd’hui. Les réseaux restent coupés pour t’aider à décrocher.</Text>

        {/* <Card style={styles.statusCard}>
          <Text style={styles.statusLabel}>État</Text>
          <Text style={styles.statusTitle}>Réseaux bloqués</Text>
          <Text style={styles.statusBody}>Tu peux laisser le blocage actif, ou passer par le mode urgence.</Text>
        </Card> */}

        <Card style={styles.appSummaryCard}>
          <Text style={styles.statusLabel}>Résumé</Text>
          <View style={styles.appRows}>
            {apps.map(app => (
              <View key={app.name} style={styles.appRow}>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={[styles.appTime, app.main && styles.appTimeMain]}>{app.time}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>

      {/* Bottom buttons */}
      <View style={styles.bottomCta}>
        <Button
          label={t('over.accept')}
          variant="primary"
          fullWidth
          onPress={() => navigation.goBack()}
        />
        <Button
          label={t('over.emergency')}
          variant="warm"
          fullWidth
          onPress={() => navigation.navigate('Unblock')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tokens.color.surface },
  topKicker: { paddingHorizontal: 24, paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10 },
  backArrow: { color: tokens.color.sub, fontSize: 18, lineHeight: 20 },
  kicker: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.color.warm,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  heroTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 36,
    lineHeight: 36 * 1.08,
    letterSpacing: -0.8,
    color: tokens.color.fg,
  },
  body: {
    fontFamily: tokens.font.sans,
    fontSize: 14,
    color: tokens.color.sub,
    lineHeight: 14 * 1.55,
    marginTop: 16,
  },
  statusCard: {
    marginTop: 24,
  },
  statusLabel: {
    fontFamily: tokens.font.sans,
    fontSize: 11,
    color: tokens.color.warm,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  statusTitle: {
    fontFamily: tokens.font.sans,
    fontSize: 19,
    color: tokens.color.fg,
    marginTop: 10,
  },
  statusBody: {
    fontFamily: tokens.font.sans,
    fontSize: 12.5,
    color: tokens.color.sub,
    marginTop: 6,
    lineHeight: 12.5 * 1.55,
  },
  appSummaryCard: {
    marginTop: 20,

  },
  appRows: {
    marginTop: 12,
    gap: 10,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  appName: {
    fontFamily: tokens.font.sans,
    fontSize: 13.5,
    color: tokens.color.fg,
  },
  appTime: {
    fontFamily: tokens.font.sans,
    fontSize: 13,
    color: tokens.color.sub,
    fontStyle: 'italic',
  },
  appTimeMain: {
    color: tokens.color.warm,
  },
  bottomCta: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: tokens.border.hairline,
    borderTopColor: tokens.color.line,
    gap: 10,
  },
});
