import { colors, fonts } from './src/theme/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: fonts,
      maxWidth: { site: '1240px' },
      boxShadow: {
        glow: '0 0 16px rgba(0, 240, 255, 0.18)',
        'glow-em': '0 0 12px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
}
