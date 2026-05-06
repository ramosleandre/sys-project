import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  StyleSheet, Animated, Easing, KeyboardAvoidingView, Platform,
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
    <View style={bub.typingWrap}>
      {dots.map((dot, i) => (
        <Animated.View key={i} style={[bub.dot, {
          opacity: dot.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }),
          transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) }],
        }]} />
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
    <SafeAreaView style={st.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={st.header}>
          <Pressable onPress={() => navigation.goBack()} style={st.backRow}>
            <Text style={st.backArrow}>‹</Text>
            <Text style={st.headerTitle}>{t('habitDetail.chatTitle', { name })}</Text>
          </Pressable>
        </View>

        {/* Messages */}
        <ScrollView ref={scrollRef} style={st.messages} contentContainerStyle={st.messagesContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {messages.map((m, i) => <ChatBubble key={i} from={m.from} text={m.text} />)}
          {isTyping && <TypingDots />}
        </ScrollView>

        {/* Input */}
        <View style={st.inputBar}>
          <View style={st.inputWrap}>
            <TextInput
              style={st.input}
              value={draft}
              onChangeText={setDraft}
              placeholder={t('habitDetail.compose')}
              placeholderTextColor="#5C5447"
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable onPress={handleSend} disabled={!canSend} style={[st.sendBtn, canSend ? st.sendActive : st.sendDisabled]}>
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

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F0D0A' },
  header: {
    paddingHorizontal: 18, paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: '#231F1A',
  },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backArrow: { color: tokens.color.sub, fontSize: 18, lineHeight: 20 },
  headerTitle: { fontFamily: tokens.font.sans, fontSize: 16, color: '#EDE4D5', fontWeight: '500' },
  messages: { flex: 1 },
  messagesContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12, gap: 10 },
  inputBar: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 28, borderTopWidth: 0.5, borderTopColor: '#231F1A', backgroundColor: '#0F0D0A' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1B1814', borderWidth: 1, borderColor: '#231F1A', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 },
  input: { flex: 1, fontFamily: tokens.font.sans, fontSize: 15, color: '#EDE4D5', padding: 0 },
  sendBtn: { width: 32, height: 32, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  sendActive: { backgroundColor: '#EDE4D5' },
  sendDisabled: { backgroundColor: '#2A2520' },
});
