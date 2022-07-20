const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ["inter", "sans-serif"],
    },
    extend: {
      colors: {
        dropGray: "#747474",
        dropBlack: "#35322F",
        dropGreen: "#2BBA13"
      }
    }

  },
  plugins: [],
}
