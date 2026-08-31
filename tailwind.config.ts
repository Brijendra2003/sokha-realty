import type { Config } from 'tailwindcss';

/* ────────────────────────────────────────────────────────────────────
   Sokha Realty — Design System
   Theme: "Warm Organic Luxury"

   The site is built from soft, hand-drawn shapes on warm paper: organic
   blobs behind icons, arched photography, curved bands between sections
   and pill CTAs. Structure stays luxurious (deep navy, brass) but the
   geometry is round and welcoming rather than sharp and corporate.

   Five ramps drive everything:
     navy      → structural dark neutral (deep bands, ink, footer)
     champagne → warm brass accent (rules, labels, primary CTAs)
     sand      → warm light neutral (page paper, hairlines)
     clay      → terracotta support accent (blobs, highlights, tiles)
     sage      → muted green support accent (blobs, tiles, badges)

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
  100: '#FBF7F1', // page paper — a touch warmer than before
  200: '#F5EFE6',
  300: '#E8E0D4', // hairline borders
  400: '#D3C8B8',
  500: '#B8AB98',
};

/* Terracotta — the warm "coral" note the references lean on for
   secondary blobs, highlight tiles and playful accents. */
const clay = {
  50:  '#FDF3EF',
  100: '#FAE3DA',
  200: '#F3C6B5',
  300: '#E9A388',
  400: '#DD8362',
  500: '#C96A47', // signature terracotta
  600: '#A95236',
  700: '#87402A',
  800: '#653020',
  900: '#452016',
};

/* Sage — the calm green note; used for "verified / green building /
   sustainability" cues and to cool down blob clusters. */
const sage = {
  50:  '#F2F6F2',
  100: '#E2EBE2',
  200: '#C4D6C6',
  300: '#9FBCA3',
  400: '#7BA081',
  500: '#5C8464', // signature sage
  600: '#476950',
  700: '#37523E',
  800: '#283C2E',
  900: '#1A281F',
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
        clay,
        sage,

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
        // Organic, hand-drawn silhouettes — the signature shape language.
        blob:      '58% 42% 47% 53% / 47% 52% 48% 53%',
        'blob-2':  '42% 58% 62% 38% / 55% 42% 58% 45%',
        'blob-3':  '65% 35% 38% 62% / 42% 58% 42% 58%',
        // Arch — flat base, domed top. Used for portrait photography.
        arch:      '9999px 9999px 2rem 2rem',
        'arch-lg': '9999px 9999px 2.5rem 2.5rem',
      },
      boxShadow: {
        // Champagne glow — reserved for primary CTAs
        'gold-sm':        '0 1px 4px 0 rgba(158, 114, 57, 0.18)',
        'gold':           '0 8px 22px -8px rgba(158, 114, 57, 0.42)',
        'gold-lg':        '0 16px 40px -12px rgba(158, 114, 57, 0.52)',
        // Warm, diffuse elevation — the default for the soft card language
        'soft':           '0 1px 2px 0 rgba(69, 45, 22, 0.03), 0 10px 30px -14px rgba(69, 45, 22, 0.16)',
        'soft-lg':        '0 2px 6px 0 rgba(69, 45, 22, 0.05), 0 26px 56px -20px rgba(69, 45, 22, 0.24)',
        // Navy-tinted elevation — legacy names, retuned warm
        'card':           '0 1px 2px 0 rgba(69, 45, 22, 0.03), 0 10px 30px -14px rgba(69, 45, 22, 0.16)',
        'card-hover':     '0 2px 6px 0 rgba(69, 45, 22, 0.05), 0 26px 56px -20px rgba(69, 45, 22, 0.24)',
        'dark-card':      '0 1px 2px 0 rgba(0,0,0,0.5), 0 10px 32px -14px rgba(0,0,0,0.7)',
        'dark-card-hover':'0 2px 6px 0 rgba(0,0,0,0.6), 0 24px 56px -18px rgba(0,0,0,0.85)',
        'inset-hairline': 'inset 0 0 0 1px rgba(185,139,78,0.18)',
      },
      backgroundImage: {
        'gold-gradient':      'linear-gradient(135deg, #D2AA6B 0%, #B98B4E 55%, #9C7139 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #D2AA6B 0%, #B98B4E 55%, #9C7139 100%)',
        'clay-gradient':      'linear-gradient(135deg, #E9A388 0%, #C96A47 60%, #A95236 100%)',
        'dark-gradient':      'linear-gradient(160deg, #0A1622 0%, #16283C 55%, #0F1E2E 100%)',
        'navy-gradient':      'linear-gradient(160deg, #0A1622 0%, #16283C 55%, #0F1E2E 100%)',
        'hero-pattern':       'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(185,139,78,0.14) 0%, transparent 65%)',
        'paper-gradient':     'linear-gradient(180deg, #FFFDFB 0%, #FBF7F1 45%, #F5EFE6 100%)',
        'warm-wash':          'radial-gradient(ellipse 70% 55% at 15% 10%, rgba(233,163,136,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 25%, rgba(210,170,107,0.18) 0%, transparent 62%)',
        'champagne-sheen':    'linear-gradient(100deg, transparent 20%, rgba(224,192,137,0.35) 50%, transparent 80%)',
      },
      animation: {
        'fade-up':     'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'gold-pulse':  'goldPulse 2.4s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 11s ease-in-out infinite',
        'shimmer':     'shimmer 2.4s linear infinite',
        'rule-in':     'ruleIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'blob-morph':  'blobMorph 18s ease-in-out infinite',
        'sway':        'sway 9s ease-in-out infinite',
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
        // Slowly reshapes an organic blob so decorative shapes feel alive
        // without ever drawing the eye away from the copy.
        blobMorph: {
          '0%, 100%': { borderRadius: '58% 42% 47% 53% / 47% 52% 48% 53%' },
          '33%':      { borderRadius: '42% 58% 62% 38% / 55% 42% 58% 45%' },
          '66%':      { borderRadius: '65% 35% 38% 62% / 42% 58% 42% 58%' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%':      { transform: 'rotate(4deg)' },
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
