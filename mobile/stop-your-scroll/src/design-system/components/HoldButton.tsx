/**
 * HoldButton — long-press friction primitive.
 *  Used on:
 *   - "Maintiens pour passer outre" (Block screen, ~1.6 s)
 *   - "Maintiens pour débloquer"   (Unblock screen, 60 s)
 *  When hold reaches 100%, calls `onComplete()`. Releasing early resets to 0.
 */
import React from 'react';
import { Pressable, Text, View, Animated } from 'react-native';

type Props = {
  durationMs: number;
  idleLabel: string;
  holdingLabel: string;     // can include "{s}" placeholder for remaining seconds
  onComplete: () => void;
};

export function HoldButton({ durationMs, idleLabel, holdingLabel, onComplete }: Props) {
  const [pressing, setPressing] = React.useState(false);
  const [held, setHeld] = React.useState(0);
  const fillAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!pressing) {
      setHeld(0);
      Animated.timing(fillAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
      return;
    }
    const start = Date.now();
    fillAnim.setValue(0);
    Animated.timing(fillAnim, { toValue: 1, duration: durationMs, useNativeDriver: false }).start();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / durationMs);
      setHeld(p);
      if (p >= 1) {
        clearInterval(id);
        setPressing(false);
        onComplete();
      }
    }, 60);
    return () => clearInterval(id);
  }, [pressing, durationMs, fillAnim, onComplete]);

  const remaining = Math.ceil((1 - held) * (durationMs / 1000));
  const label = pressing
    ? holdingLabel.replace('{s}', String(remaining))
    : idleLabel;

  return (
    <Pressable
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
      className="relative items-center justify-center overflow-hidden rounded-[14px] border-[0.5px] border-lineStrong bg-card py-[18px]"
    >
      <Animated.View className="absolute bottom-0 left-0 top-0 bg-fill" style={{
        width: fillAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
      }} />
      <View pointerEvents="none">
        <Text
          className="font-sans text-[13px] text-sub"
          style={{ letterSpacing: 0.3, fontVariant: ['tabular-nums'] }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
