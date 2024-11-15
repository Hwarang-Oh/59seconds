/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear infinite',
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        mainColor1: '#474972',
        mainColor2: '#C4C5D7',
        mainColor3: '#9E96C1',
        subColor1: '#FFE4D5',
        subColor2: '#F26E68',
        subColor3: '#999999',
        subColor4: '#B4F1B6',
        subColor5: '#0A8706',
        'search-border': 'rgba(71, 73, 114, 0.6)',
        'search-input': 'rgba(71, 73, 114, 0.32)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
