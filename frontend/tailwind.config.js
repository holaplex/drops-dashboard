const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dropCharcoal: '#35322F',
        dropGray: '#747474',
        dropYellow: '#E6A602',
        dropGreen: '#2BBA13',
      },
      spacing: {
        283: '17.688rem',
        400: '25',
      },
    },
  },
  plugins: [],
};
