export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,tsx,ts,jsx,mdx,md}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['Lexend Deca Variable', 'sans-serif'],
      },
      fontSize: {
        sm: ['0.875rem', '1.4rem'],
        base: ['1rem', '1.6rem'],
        lg: ['1.125rem', '1.8rem'],
        xl: ['1.25rem', '2rem'],
        '2xl': ['1.5rem', '2.4rem'],
      },
      colors: {
        'shoko-bg': 'var(--shoko-bg)',
        'shoko-bg-alt': 'var(--shoko-bg-alt)',
        'shoko-button-alt': 'var(--shoko-button-alt)',
        'shoko-button-alt-hover': 'var(--shoko-button-alt-hover)',
        'shoko-border': 'var(--shoko-border)',
        'shoko-text': 'var(--shoko-text)',
        'shoko-text-header': 'var(--shoko-text-header)',
        'shoko-text-alt': 'var(--shoko-text-alt)',
        'shoko-link': 'var(--shoko-link)',
        'shoko-link-hover': 'var(--shoko-link-hover)',
        'shoko-link-header': 'var(--shoko-link-header)',
        'shoko-link-header-hover': 'var(--shoko-link-header-hover)',
        'shoko-highlight': 'var(--shoko-highlight)',
        'shoko-overlay': 'var(--shoko-overlay)',
      },
    },
  },
};
