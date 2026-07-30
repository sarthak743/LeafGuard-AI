/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          dark: '#1F5723',
          light: '#3F9A45',
        },
        secondary: '#66BB6A',
        accent: '#A5D6A7',
        clay: '#C17A4B',
        canopy: '#E8F5E9',
        bg: '#F8FBF6',
        ink: '#1F2937',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(46, 125, 50, 0.25)',
        card: '0 4px 24px -8px rgba(31, 41, 55, 0.08)',
        lift: '0 20px 40px -16px rgba(46, 125, 50, 0.35)',
      },
      borderRadius: {
        xl2: '1.75rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(12px,-16px) rotate(4deg)' },
        },
        growWidth: {
          '0%': { width: '0%' },
        },
        veinDraw: {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        veinDraw: 'veinDraw 2.4s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
