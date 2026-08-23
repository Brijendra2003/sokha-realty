import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sokha Realty Brand Colors
        gold: {
          50:  '#FDF9ED',
          100: '#FAF0CC',
          200: '#F4DC95',
          300: '#ECC85A',
          400: '#E4B530',
          500: '#C9A84C', // Primary Gold
          600: '#A8841C',
          700: '#8B6914',
          800: '#6E5010',
          900: '#4A3508',
        },
        charcoal: {
          50:  '#F5F5F5',
          100: '#E8E8E8',
          200: '#C8C8C8',
          300: '#A0A0A0',
          400: '#6B6B6B',
          500: '#3D3D3D',
          600: '#2A2A2A',
          700: '#1A1A1A',
          800: '#0F0F0F',
          900: '#0B0B0B',
        },
        ivory: {
          50:  '#FDFCFA',
          100: '#F9F6F0',
          200: '#F2EBE0',
          300: '#E8DDD0',
          400: '#D9CCBA',
          500: '#C4B49A',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        '2xs':  ['0.625rem', { lineHeight: '1rem' }],
        xs:     ['0.75rem',  { lineHeight: '1.125rem' }],
        sm:     ['0.875rem', { lineHeight: '1.375rem' }],
        base:   ['1rem',     { lineHeight: '1.625rem' }],
        lg:     ['1.125rem', { lineHeight: '1.75rem' }],
        xl:     ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.625rem' }],
        '5xl':  ['3rem',     { lineHeight: '3.5rem' }],
        '6xl':  ['3.75rem',  { lineHeight: '4.25rem' }],
        '7xl':  ['4.5rem',   { lineHeight: '5rem' }],
        '8xl':  ['6rem',     { lineHeight: '6.5rem' }],
      },
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        container: '1200px',
        'container-sm': '960px',
        'container-xs': '720px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'gold-sm':  '0 2px 8px 0 rgba(201, 168, 76, 0.15)',
        'gold':     '0 4px 20px 0 rgba(201, 168, 76, 0.25)',
        'gold-lg':  '0 8px 40px 0 rgba(201, 168, 76, 0.35)',
        'card':     '0 4px 24px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 12px 48px 0 rgba(0,0,0,0.12)',
        'dark-card': '0 4px 24px 0 rgba(0,0,0,0.4)',
        'dark-card-hover': '0 12px 48px 0 rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gold-gradient':   'linear-gradient(135deg, #C9A84C 0%, #E4B530 50%, #A8841C 100%)',
        'dark-gradient':   'linear-gradient(135deg, #0B0B0B 0%, #1A1A1A 100%)',
        'hero-pattern':    'radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)',
      },
      animation: {
        'fade-up':       'fadeUp 0.6s ease forwards',
        'fade-in':       'fadeIn 0.5s ease forwards',
        'slide-right':   'slideRight 0.5s ease forwards',
        'gold-pulse':    'goldPulse 2s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(201,168,76,0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
};

export default config;
