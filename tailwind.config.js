/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,tsx,ts,jsx,mdx,md}'],
  theme: {
    extend: {
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
        backgroundNorm: {
          light: '#FDFCFF',
          dark: '#17181F',
        },
        backgroundAlt: {
          light: '#F5F4F8',
          dark: '#1C1D25',
        },
        border: {
          light: '#BAC8D7A6',
          dark: '#0B0B0E',
        },
        textHeader: {
          light: '#2C324B',
          dark: '#BCD0E9',
        },
        textBody: {
          light: '#535E72',
          dark: '#CFD8E3',
        },
        textAlt: {
          light: '#FFFFFF',
          dark: '#FFFFFF',
        },
        link: {
          light: '#3E64ED',
          dark: '#279CEB',
        },
        linkHover: {
          light: '#425ECCFF',
          dark: '#217dbc',
        },
        highlight: {
          light: '#EC407A',
          dark: '#E3B341',
        },
        headerLink: {
          light: '#66B4F3',
          dark: '#66B4F3',
        },
        headerLinkHover: {
          light: '#5ba2da',
          dark: '#5ba2da',
        },
        buttonAlt: {
          light: '#202941',
          dark: '#202941',
        },
        overlay: {
          light: '#0A0B1DBF',
          dark: '#0A0B1DBF',
        },
      },
    },
  },
  plugins: [],
};
