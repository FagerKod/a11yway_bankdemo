import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Swedish bank navy palette - primary brand color
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',   // Primary navy - main brand color
          800: '#243b53',
          900: '#102a43',
        },
        // Accent blue for CTAs and interactive elements
        accent: {
          400: '#3B82F6',
          500: '#0066CC',  // Swedish blue - CTA color
          600: '#0052A3',
          700: '#004080',
        },
        // Semantic colors for feedback
        success: {
          50: '#E8F5E9',
          500: '#2E7D32',
          600: '#1B5E20',
        },
        error: {
          50: '#FFEBEE',
          500: '#C62828',
          600: '#B71C1C',
        },
        warning: {
          50: '#FFF3E0',
          500: '#F57C00',
          600: '#E65100',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
