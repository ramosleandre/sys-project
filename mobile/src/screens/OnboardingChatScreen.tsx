import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  Animated, Easing, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { tokens } from '../design-system/tokens';
import { BrandLogo } from '../design-system/components/BrandLogo';

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
    <View className="self-start flex-row gap-1 rounded-[20px] border border-[#2A2520] bg-cardSoft px-4 py-[14px]">
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          className="h-[6px] w-[6px] rounded-full bg-[#5C5447]"
          style={{
            opacity: dot.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }),
            transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) }],
          }}
        />
      ))}
    </View>
  );
}

function ChatBubble({ from, text }: { from: 'sys' | 'me'; text: string }) {
  const mine = from === 'me';
  return (
    <View className={`max-w-[78%] px-4 py-3 ${mine ? 'self-end rounded-[20px] rounded-br-[6px] bg-toneA' : 'self-start rounded-[20px] rounded-bl-[6px] border border-[#2A2520] bg-cardSoft'}`}>
      <Text className="font-sans text-[15.5px] leading-[22.475px]" style={{ color: mine ? '#F6F1E7' : tokens.color.fg, letterSpacing: -0.1 }}>
        {text}
      </Text>
    </View>
  );
}

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
    <SafeAreaView className="flex-1 bg-[#0F0D0A]">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View className="border-b-[0.5px] border-[#231F1A] px-6 pb-[14px] pt-[14px]">
          <View className="mb-[14px] flex-row items-center justify-between">
            <View className="w-[50px]" />
            <BrandLogo size={36} />
            <Pressable onPress={() => navigation.replace('Main')} hitSlop={12}>
              <Text className="w-[50px] text-right font-sans text-[13px] text-[#8A8275]">{t('onboarding.skip')}</Text>
            </Pressable>
          </View>
          <Text className="font-sans text-[11px] font-medium uppercase text-[#8A8275]" style={{ letterSpacing: 2 }}>
            {t('onboarding.step')}
          </Text>
          <Text className="mt-[6px] font-sans text-[24px] leading-[27.6px] text-[#EDE4D5]" style={{ letterSpacing: -0.4 }}>
            {t('onboarding.title')}
          </Text>
        </View>
        <ScrollView ref={scrollRef} className="flex-1" contentContainerClassName="gap-[10px] px-5 pb-3 pt-5" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {messages.map((m, i) => <ChatBubble key={i} from={m.from} text={t(m.textKey)} />)}
          {isTyping && <TypingDots />}
          {isComplete && (
            <View className="mt-2 self-stretch gap-4">
              <Text className="font-sans text-[14px] italic leading-[21px] text-[#8A8275]">{t('onboarding.done')}</Text>
              <Pressable onPress={() => navigation.replace('Main')} className="items-center rounded-[14px] bg-primary px-7 py-[14px]">
                <Text className="font-sans text-[14px] font-medium text-ink">{t('onboarding.start')}</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
        {!isComplete && (
          <View className="border-t-[0.5px] border-[#231F1A] bg-[#0F0D0A] px-4 pb-7 pt-3">
            <View className="flex-row items-center gap-[10px] rounded-full border border-[#231F1A] bg-cardSoft px-[14px] py-[10px]">
              <TextInput className="flex-1 p-0 font-sans text-[15px] text-[#EDE4D5]" value={draft} onChangeText={setDraft} placeholder={t('onboarding.placeholder')} placeholderTextColor="#5C5447" onSubmitEditing={handleSend} returnKeyType="send" editable={waitingForUser} />
              <Pressable onPress={handleSend} disabled={!canSend} className={`h-8 w-8 items-center justify-center rounded-full ${canSend ? 'bg-[#EDE4D5]' : 'bg-[#2A2520]'}`}>
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
