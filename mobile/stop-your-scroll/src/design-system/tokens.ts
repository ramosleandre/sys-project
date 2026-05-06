/**
 * Synk — Design Tokens
 * --------------------------------
 * Single source of truth for colors, type, spacing, radii, motion.
 * Used by every component. Change here, propagate everywhere.
 *
 * Usage with NativeWind:
 *   In `tailwind.config.js`, spread these into theme.extend so classes like
 *   `bg-surface text-fg border-line` are available.
 *
 * Usage with StyleSheet:
 *   import { tokens } from '@/design-system/tokens';
 *   { backgroundColor: tokens.color.surface }
 */

export const color = {
  // Dark palette (default & only mode for v2)
  surface:    '#0A0907',
  raised:     '#15120E',
  card:       '#16130F',
  cardSoft:   '#1B1814',
  line:       'rgba(239, 234, 224, 0.08)',
  lineStrong: 'rgba(239, 234, 224, 0.14)',

  fg:         '#EFEAE0',
  sub:        'rgba(239, 234, 224, 0.58)',
  faint:      'rgba(239, 234, 224, 0.34)',
  ghost:      'rgba(239, 234, 224, 0.18)',
  fill:       'rgba(239, 234, 224, 0.06)',

  ink:        '#0A0907',     // text on light fills
  primary:    '#EFEAE0',     // CTA fill (warm cream)

  // Single accent — reserved for warnings, emergency, "j'y arrive pas"
  warm:       '#C9A57A',
  warmTint:   'rgba(201, 165, 122, 0.35)',
  warmFill:   'rgba(201, 165, 122, 0.12)',

  // Tones for app monogram tiles (originals — no real brand logos)
  toneA:      '#2A2722',
  toneB:      '#1F1D19',
  toneC:      '#231F1A',
  toneD:      '#262320',
} as const;

export const font = {
  /**
   * Sans for everything except numbers.
   * Replace 'Inter' with whatever ships with the bundle.
   */
  sans: 'Inter',

  /**
   * Display for numbers (timers, totals, big values).
   * Krona One — geometric, tabular, easy to swap by editing this single token.
   */
  numeric: 'KronaOne',

  /**
   * Italic display used on a few hero lines & habit names.
   * Optional — falls back to `sans` italic.
   */
  display: 'Inter',
} as const;

export const fontSize = {
  micro:   10,
  caption: 11,
  small:   12,
  body:    13,
  bodyLg:  14,
  lead:    16,
  h3:      18,
  h2:      22,
  h1:      26,
  display: 30,
  hero:    38,
  timer:   56,
} as const;

export const lineHeight = {
  tight:   1.05,
  display: 1.15,
  body:    1.5,
  loose:   1.6,
} as const;

export const letterSpacing = {
  display: -0.6,
  hero:    -1.0,
  caps:    1.6,
  capsLg:  2.0,
  capsXl:  2.5,
} as const;

export const space = {
  0:  0,
  1:  4,
  2:  8,
  3:  10,
  4:  12,
  5:  14,
  6:  16,
  7:  18,
  8:  22,
  9:  24,
  10: 28,
  12: 32,
  14: 40,
  16: 48,
} as const;

export const radius = {
  xs:   4,
  sm:   6,
  md:   12,
  lg:   14,
  xl:   18,
  pill: 999,
} as const;

export const border = {
  hairline: 0.5,
  thin:     1,
} as const;

export const motion = {
  fast:    150,
  base:    250,
  slow:    400,
  // The two interaction primitives in the app:
  holdSkip:    1600,   // long-press to skip block
  holdUnlock:  60000,  // hold to unlock after override
} as const;

export const layout = {
  screenPaddingX: 22,
  cardPadding:    18,
  dockPaddingY:   10,
  dockPaddingBot: 22,
  statusBarTop:   54, // iOS-frame allowance in mockups
} as const;

export const tokens = {
  color, font, fontSize, lineHeight, letterSpacing,
  space, radius, border, motion, layout,
};

export type ColorToken      = keyof typeof color;
export type SpaceToken      = keyof typeof space;
export type RadiusToken     = keyof typeof radius;
export type FontSizeToken   = keyof typeof fontSize;

export default tokens;
