/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        gold: '#c9a84c',
        'gold-light': '#f0c96b',
        ink: '#0d0f14',
        'ink-2': '#1c1f2a',
        surface: '#f8f7f4',
      },
    },
  },
  plugins: [],
}
