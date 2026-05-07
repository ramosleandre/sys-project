/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: '#0A0907',
        raised: '#15120E',
        card: '#16130F',
        cardSoft: '#1B1814',
        fg: '#EFEAE0',
        ink: '#0A0907',
        primary: '#EFEAE0',
        warm: '#C9A57A',
        toneA: '#2A2722',
        toneB: '#1F1D19',
        toneC: '#231F1A',
        toneD: '#262320',
      },
      fontFamily: {
        sans: ['Inter'],
        numeric: ['KronaOne'],
        display: ['Fraunces-Italic'],
      },
      borderColor: {
        line: 'rgba(239, 234, 224, 0.08)',
        lineStrong: 'rgba(239, 234, 224, 0.14)',
        warmLine: 'rgba(201,165,122,0.4)',
      },
      backgroundColor: {
        line: 'rgba(239, 234, 224, 0.08)',
        lineStrong: 'rgba(239, 234, 224, 0.14)',
        sub: 'rgba(239, 234, 224, 0.58)',
        faint: 'rgba(239, 234, 224, 0.34)',
        ghost: 'rgba(239, 234, 224, 0.18)',
        fill: 'rgba(239, 234, 224, 0.06)',
        warmTint: 'rgba(201, 165, 122, 0.35)',
        warmFill: 'rgba(201, 165, 122, 0.12)',
      },
      textColor: {
        sub: 'rgba(239, 234, 224, 0.58)',
        faint: 'rgba(239, 234, 224, 0.34)',
      },
    },
  },
  plugins: [],
}
