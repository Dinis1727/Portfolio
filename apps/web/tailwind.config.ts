import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}', // caso tenhas páginas fora de /app
  ],
  darkMode: 'media', // ativa modo escuro automático com base no SO
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f9fafb',
          dark: '#0f172a',
        },
        primary: {
          DEFAULT: '#6366f1', // indigo-500
          dark: '#4f46e5',
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500
          dark: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
