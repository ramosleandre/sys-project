import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  Animated, Easing, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { tokens } from '../design-system/tokens';

type Props = {
  navigation: { goBack: () => void };
  route?: { params?: { habitName?: string } };
  habitName?: string;
};

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
        <Animated.View key={i} className="h-[6px] w-[6px] rounded-full bg-[#5C5447]" style={{
          opacity: dot.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }),
          transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) }],
        }} />
      ))}
    </View>
  );
}

function ChatBubble({ from, text }: { from: 'sys' | 'me'; text: string }) {
  const mine = from === 'me';
  return (
    <View
      className={`max-w-[78%] px-4 py-3 ${mine ? 'self-end rounded-[20px] rounded-br-[6px] bg-toneA' : 'self-start rounded-[20px] rounded-bl-[6px] border border-[#2A2520] bg-cardSoft'}`}
    >
      <Text className="font-sans text-[15.5px] leading-[22.475px]" style={{ color: mine ? '#F6F1E7' : tokens.color.fg, letterSpacing: -0.1 }}>
        {text}
      </Text>
    </View>
  );
}

export function HabitChatScreen({ navigation, route, habitName: propName }: Props) {
  const { t } = useTranslation();
  const name = route?.params?.habitName ?? propName ?? '';
  const [messages, setMessages] = useState<{ from: 'sys' | 'me'; text: string }[]>([]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // Initial system greeting
  useEffect(() => {
    const id = setTimeout(() => {
      setMessages([{ from: 'sys', text: t('habitDetail.tooHardSub') }]);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    if (!draft.trim()) return;
    const userMsg = draft.trim();
    setDraft('');
    setMessages(m => [...m, { from: 'me', text: userMsg }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(m => [...m, { from: 'sys', text: 'Je note. On ajustera ton plan en fonction.' }]);
    }, 1500);
  }, [draft]);

  const canSend = draft.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-[#0F0D0A]">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View className="border-b-[0.5px] border-[#231F1A] px-[18px] py-[14px]">
          <Pressable onPress={() => navigation.goBack()} className="flex-row items-center gap-[10px]">
            <Text className="text-[18px] leading-5 text-sub">‹</Text>
            <Text className="font-sans text-[16px] font-medium text-[#EDE4D5]">{t('habitDetail.chatTitle', { name })}</Text>
          </Pressable>
        </View>

        {/* Messages */}
        <ScrollView ref={scrollRef} className="flex-1" contentContainerClassName="gap-[10px] px-5 pb-3 pt-5" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {messages.map((m, i) => <ChatBubble key={i} from={m.from} text={m.text} />)}
          {isTyping && <TypingDots />}
        </ScrollView>

        {/* Input */}
        <View className="border-t-[0.5px] border-[#231F1A] bg-[#0F0D0A] px-4 pb-7 pt-3">
          <View className="flex-row items-center gap-[10px] rounded-full border border-[#231F1A] bg-cardSoft px-[14px] py-[10px]">
            <TextInput
              className="flex-1 p-0 font-sans text-[15px] text-[#EDE4D5]"
              value={draft}
              onChangeText={setDraft}
              placeholder={t('habitDetail.compose')}
              placeholderTextColor="#5C5447"
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable onPress={handleSend} disabled={!canSend} className={`h-8 w-8 items-center justify-center rounded-full ${canSend ? 'bg-[#EDE4D5]' : 'bg-[#2A2520]'}`}>
              <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <Path d="M2 7h10M8 3l4 4-4 4" stroke={canSend ? '#0F0D0A' : '#5C5447'} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
