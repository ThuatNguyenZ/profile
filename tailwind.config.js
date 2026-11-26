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
        glow: '0 0 16px rgb(var(--c-cy) / var(--glow-a))',
        'glow-em': '0 0 12px rgb(var(--c-em) / 0.35)',
      },
    },
  },
  plugins: [],
}
