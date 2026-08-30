import type { Config } from 'tailwindcss';

/* ────────────────────────────────────────────────────────────────────
   Sokha Realty — Design System
   Theme: "Midnight Navy & Champagne"

   Three ramps drive the whole site:
     navy      → structural dark neutral (surfaces, ink, footer, hero)
     champagne → warm brass accent (rules, labels, CTAs, highlights)
     sand      → warm light neutral (page paper, borders, dark-mode text)

   Legacy aliases (gold / charcoal / ivory) point at the same values so
   every existing component re-skins automatically. Prefer the semantic
   names in new code.
   ──────────────────────────────────────────────────────────────────── */

const navy = {
  50:  '#F4F6F9',
  100: '#E4E9F0',
  200: '#C4CEDB',
  300: '#97A6B8',
  400: '#62748C',
  500: '#3B4E66',
  600: '#24374F',
  700: '#16283C',
  800: '#0F1E2E',
  900: '#0A1622',
};

const champagne = {
  50:  '#FBF7EF',
  100: '#F6ECD9',
  200: '#EDD9B4',
  300: '#E0C089',
  400: '#D2AA6B',
  500: '#B98B4E', // signature brass
  600: '#9C7139',
  700: '#7E5A2D',
  800: '#5F4322',
  900: '#402D17',
};

const sand = {
  50:  '#FFFDFB',
  100: '#FBF9F6', // page paper
  200: '#F4F0E9',
  300: '#E6E0D8', // hairline borders
  400: '#D3CABD',
  500: '#B8AC9B',
};

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
        // ── Semantic ramps ──
        navy,
        champagne,
        sand,

        // ── Legacy aliases (kept so existing markup re-skins) ──
        charcoal: navy,
        gold: champagne,
        ivory: sand,
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Cambria', 'serif'],
        body:    ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs':  ['0.6875rem', { lineHeight: '1rem',     letterSpacing: '0.02em' }],
        xs:     ['0.75rem',   { lineHeight: '1.15rem' }],
        sm:     ['0.875rem',  { lineHeight: '1.5rem' }],
        base:   ['1rem',      { lineHeight: '1.7rem' }],
        lg:     ['1.125rem',  { lineHeight: '1.85rem' }],
        xl:     ['1.25rem',   { lineHeight: '1.9rem'  }],
        '2xl':  ['1.5rem',    { lineHeight: '2rem',     letterSpacing: '-0.01em' }],
        '3xl':  ['1.875rem',  { lineHeight: '2.3rem',   letterSpacing: '-0.015em' }],
        '4xl':  ['2.25rem',   { lineHeight: '2.6rem',   letterSpacing: '-0.02em' }],
        '5xl':  ['3rem',      { lineHeight: '3.35rem',  letterSpacing: '-0.022em' }],
        '6xl':  ['3.75rem',   { lineHeight: '4.05rem',  letterSpacing: '-0.025em' }],
        '7xl':  ['4.5rem',    { lineHeight: '4.75rem',  letterSpacing: '-0.028em' }],
        '8xl':  ['6rem',      { lineHeight: '6.15rem',  letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        label: '0.18em',
        wide2: '0.28em',
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
        container: '1240px',
        'container-sm': '960px',
        'container-xs': '720px',
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        // Champagne glow — reserved for primary CTAs
        'gold-sm':        '0 1px 4px 0 rgba(158, 114, 57, 0.18)',
        'gold':           '0 6px 20px -6px rgba(158, 114, 57, 0.38)',
        'gold-lg':        '0 14px 36px -10px rgba(158, 114, 57, 0.48)',
        // Navy-tinted elevation — everything else
        'card':           '0 1px 2px 0 rgba(10,22,34,0.04), 0 8px 28px -12px rgba(10,22,34,0.14)',
        'card-hover':     '0 2px 4px 0 rgba(10,22,34,0.05), 0 20px 48px -16px rgba(10,22,34,0.22)',
        'dark-card':      '0 1px 2px 0 rgba(0,0,0,0.5), 0 10px 32px -14px rgba(0,0,0,0.7)',
        'dark-card-hover':'0 2px 6px 0 rgba(0,0,0,0.6), 0 24px 56px -18px rgba(0,0,0,0.85)',
        'inset-hairline': 'inset 0 0 0 1px rgba(185,139,78,0.18)',
      },
      backgroundImage: {
        'gold-gradient':      'linear-gradient(135deg, #D2AA6B 0%, #B98B4E 55%, #9C7139 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #D2AA6B 0%, #B98B4E 55%, #9C7139 100%)',
        'dark-gradient':      'linear-gradient(160deg, #0A1622 0%, #16283C 55%, #0F1E2E 100%)',
        'navy-gradient':      'linear-gradient(160deg, #0A1622 0%, #16283C 55%, #0F1E2E 100%)',
        'hero-pattern':       'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(185,139,78,0.14) 0%, transparent 65%)',
        'paper-gradient':     'linear-gradient(180deg, #FFFDFB 0%, #FBF9F6 40%, #F4F0E9 100%)',
        'champagne-sheen':    'linear-gradient(100deg, transparent 20%, rgba(224,192,137,0.35) 50%, transparent 80%)',
      },
      animation: {
        'fade-up':     'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'gold-pulse':  'goldPulse 2.4s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 2.4s linear infinite',
        'rule-in':     'ruleIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(185,139,78,0)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(185,139,78,0.14)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ruleIn: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
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
