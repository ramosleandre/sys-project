import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  StyleSheet, Animated, Easing, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { tokens } from '../design-system/tokens';

type Props = { navigation: { replace: (s: string) => void } };
type Message = { from: 'sys' | 'me'; textKey: string };

const FLOW: Message[] = [
  { from: 'sys', textKey: 'onboarding.msg1' },
  { from: 'sys', textKey: 'onboarding.msg2' },
  { from: 'me',  textKey: 'onboarding.msg3' },
  { from: 'sys', textKey: 'onboarding.msg4' },
  { from: 'me',  textKey: 'onboarding.msg5' },
  { from: 'sys', textKey: 'onboarding.msg6' },
  { from: 'me',  textKey: 'onboarding.msg7' },
  { from: 'sys', textKey: 'onboarding.msg8' },
];

function TypingDots() {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  useEffect(() => {
    dots.forEach((dot, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(dot, { toValue: 1, duration: 300, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.delay(600 - i * 150),
        ]),
      ).start();
    });
  }, []);
  return (
    <View style={bub.typingWrap}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={[bub.dot, {
            opacity: dot.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }),
            transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) }],
          }]}
        />
      ))}
    </View>
  );
}

function ChatBubble({ from, text }: { from: 'sys' | 'me'; text: string }) {
  const mine = from === 'me';
  return (
    <View style={[bub.bubble, mine ? bub.mine : bub.sys]}>
      <Text style={[bub.text, { color: mine ? '#F6F1E7' : tokens.color.fg }]}>{text}</Text>
    </View>
  );
}

const bub = StyleSheet.create({
  bubble: { maxWidth: '78%', paddingVertical: 12, paddingHorizontal: 16 },
  mine: {
    alignSelf: 'flex-end', backgroundColor: '#2A2722',
    borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 6,
  },
  sys: {
    alignSelf: 'flex-start', backgroundColor: '#1B1814',
    borderWidth: 1, borderColor: '#2A2520',
    borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 6, borderBottomRightRadius: 20,
  },
  text: { fontFamily: tokens.font.sans, fontSize: 15.5, lineHeight: 15.5 * 1.45, letterSpacing: -0.1 },
  typingWrap: {
    alignSelf: 'flex-start', flexDirection: 'row', gap: 4,
    paddingVertical: 14, paddingHorizontal: 16,
    backgroundColor: '#1B1814', borderRadius: 20, borderWidth: 1, borderColor: '#2A2520',
  },
  dot: { width: 6, height: 6, borderRadius: 6, backgroundColor: '#5C5447' },
});

export function OnboardingChatScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const messages = FLOW.slice(0, step);
  const isComplete = step >= FLOW.length;
  const lastMsg = messages[messages.length - 1];
  const waitingForUser = lastMsg?.from === 'sys' && !isComplete;
  const canSend = draft.trim().length > 0 && waitingForUser;

  useEffect(() => {
    if (step === 0) {
      const id = setTimeout(() => setStep(1), 600);
      return () => clearTimeout(id);
    }
    if (step >= FLOW.length) return;
    const nextMsg = FLOW[step];
    if (nextMsg?.from === 'sys') {
      setIsTyping(true);
      const id = setTimeout(() => { setIsTyping(false); setStep(s => s + 1); }, 1200 + Math.random() * 800);
      return () => clearTimeout(id);
    }
  }, [step]);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [step, isTyping]);

  const handleSend = useCallback(() => {
    if (!canSend) return;
    setDraft('');
    setStep(s => s + 1);
  }, [canSend]);

  return (
    <SafeAreaView style={st.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={st.header}>
          <Text style={st.stepLabel}>{t('onboarding.step')}</Text>
          <Text style={st.title}>{t('onboarding.title')}</Text>
        </View>
        <ScrollView ref={scrollRef} style={st.messages} contentContainerStyle={st.messagesContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {messages.map((m, i) => <ChatBubble key={i} from={m.from} text={t(m.textKey)} />)}
          {isTyping && <TypingDots />}
          {isComplete && (
            <View style={st.doneWrap}>
              <Text style={st.doneText}>{t('onboarding.done')}</Text>
              <Pressable onPress={() => navigation.replace('Main')} style={st.startBtn}>
                <Text style={st.startBtnText}>{t('onboarding.start')}</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
        {!isComplete && (
          <View style={st.inputBar}>
            <View style={st.inputWrap}>
              <TextInput style={st.input} value={draft} onChangeText={setDraft} placeholder={t('onboarding.placeholder')} placeholderTextColor="#5C5447" onSubmitEditing={handleSend} returnKeyType="send" editable={waitingForUser} />
              <Pressable onPress={handleSend} disabled={!canSend} style={[st.sendBtn, canSend ? st.sendActive : st.sendDisabled]}>
                <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                  <Path d="M2 7h10M8 3l4 4-4 4" stroke={canSend ? '#0F0D0A' : '#5C5447'} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </Pressable>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0D0A' },
  header: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 14, borderBottomWidth: 0.5, borderBottomColor: '#231F1A' },
  stepLabel: { fontFamily: tokens.font.sans, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8A8275', fontWeight: '500' },
  title: { fontFamily: tokens.font.sans, fontSize: 24, lineHeight: 24 * 1.15, letterSpacing: -0.4, color: '#EDE4D5', marginTop: 6 },
  messages: { flex: 1 },
  messagesContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12, gap: 10 },
  doneWrap: { alignSelf: 'stretch', marginTop: 8, gap: 16 },
  doneText: { fontFamily: tokens.font.sans, fontSize: 14, color: '#8A8275', lineHeight: 21, fontStyle: 'italic' },
  startBtn: { backgroundColor: tokens.color.primary, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, alignItems: 'center' },
  startBtnText: { fontFamily: tokens.font.sans, fontSize: 14, fontWeight: '500', color: tokens.color.ink },
  inputBar: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 28, borderTopWidth: 0.5, borderTopColor: '#231F1A', backgroundColor: '#0F0D0A' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1B1814', borderWidth: 1, borderColor: '#231F1A', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 },
  input: { flex: 1, fontFamily: tokens.font.sans, fontSize: 15, color: '#EDE4D5', padding: 0 },
  sendBtn: { width: 32, height: 32, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  sendActive: { backgroundColor: '#EDE4D5' },
  sendDisabled: { backgroundColor: '#2A2520' },
});
