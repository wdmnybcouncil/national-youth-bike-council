const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Livvic'", defaultTheme.fontFamily.sans],
        balgin: "'Balgin Black'",
      },
    },
  },
  plugins: [],
}
