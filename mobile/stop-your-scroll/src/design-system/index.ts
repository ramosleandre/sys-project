/**
 * Public API of the design system.
 * Import from '@/design-system' rather than from individual files.
 */
export { tokens, color, font, fontSize, space, radius, motion, layout } from './tokens';
export type { ColorToken, SpaceToken, RadiusToken, FontSizeToken } from './tokens';

export { Eye }       from './components/Eye';
export { BrandLogo } from './components/BrandLogo';
export { Card }      from './components/Card';
export { Button }    from './components/Button';
export { AppTile }   from './components/AppTile';
export { Bar }       from './components/Bar';
export { Field }     from './components/Field';
export { Numeric }   from './components/Numeric';
export { Dock }      from './components/Dock';
export type { DockId } from './components/Dock';
export { AppGauge }  from './components/AppGauge';
export { HabitRow }  from './components/HabitRow';
export { SegSwitch } from './components/SegSwitch';
export { HoldButton }from './components/HoldButton';
