import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 0 0 rgb(239, 68, 68)',
        },
      })
    }),
  ],
}
