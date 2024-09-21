import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{md,mdx,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-gradient':
          'linear-gradient(90deg, rgba(23, 24, 31, 0.9) 0%, rgba(23, 24, 31, 0.95) 68%, rgba(23, 24, 31, 1) 100%)',
      },
      boxShadow: {
        custom: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        'shoko-bg': 'var(--shoko-bg)',
        'shoko-bg-alt': 'var(--shoko-bg-alt)',
        'shoko-text': 'var(--shoko-text)',
        'shoko-text-75': 'var(--shoko-text-75)',
        'shoko-icon': 'var(--shoko-icon)',
        'shoko-link': 'var(--shoko-link)',
        'shoko-link-hover': 'var(--shoko-link-hover)',
        'shoko-highlight': 'var(--shoko-highlight)',
        'shoko-divider': 'var(--shoko-divider)',
        'shoko-border': 'var(--shoko-border)',
        'shoko-btn-text': 'var(--shoko-btn-text)',
        'shoko-btn-hover': 'var(--shoko-btn-hover)',
      },
      fontFamily: {
        header: ['Space Grotesk Variable', 'sans-serif'],
        body: ['Inter Variable', 'sans-serif'],
      },
      fontSize: {
        'shoko-14': ['0.875rem', { lineHeight: '1.5' }],
        'shoko-18': ['1.125rem', { lineHeight: '1.5' }],
        'shoko-20': ['1.25rem', { lineHeight: '1.5' }],
        'shoko-24': ['1.5rem', { lineHeight: '1.5' }],
        'shoko-36': ['2.25rem', { lineHeight: '1.5' }],
      },
      screens: {
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
