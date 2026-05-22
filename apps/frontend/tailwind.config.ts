import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0f1419',
          muted: '#5c6570',
          faint: '#8b949e',
        },
        paper: {
          DEFAULT: '#f6f5f2',
          white: '#fdfcfa',
          elevated: '#ffffff',
        },
        accent: {
          blue: '#0a3d5c',
          teal: '#0d5c63',
          warm: '#c45c26',
          gold: '#b8860b',
        },
        edge: {
          DEFAULT: '#e2dfd8',
          strong: '#cdc9c0',
        },
      },
      fontFamily: {
        sans: ['var(--font-appi-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-appi-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 24px -4px rgba(15, 20, 25, 0.08)',
        card: '0 4px 32px -8px rgba(15, 20, 25, 0.12)',
        lift: '0 12px 40px -12px rgba(10, 61, 92, 0.18)',
        nav: '0 8px 32px -8px rgba(15, 20, 25, 0.14)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(13, 92, 99, 0.35), transparent), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(196, 92, 38, 0.12), transparent)',
        'page-accent': 'linear-gradient(135deg, rgba(10, 61, 92, 0.06) 0%, transparent 50%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.45s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
  plugins: [],
}

export default config
