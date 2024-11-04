/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        mainColor1: '#474972',
        mainColor2: '#C4C5D7',
        mainColor3: '#9E96C1',
        subColor1: '#FFE4D5',
        subColor2: '#F26E68',
        'search-border': 'rgba(71, 73, 114, 0.6)',
        'search-input': 'rgba(71, 73, 114, 0.32)',
      },
    },
  },
  plugins: [],
};
