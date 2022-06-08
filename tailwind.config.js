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
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          primary: 'var(--color-text-primary)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-text-accent)',
        },
      },
      backgroundColor: {
        skin: {
          'fill-base': 'var(--color-fill-base)',
          'fill-primary': 'var(--color-fill-primary)',
          'fill-accent': 'var(--color-fill-accent)',
          'button-accent': 'var(--color-button-accent)',
          'button-accent-hover': 'var(--color-button-accent-hover)',
        },
      },
    },
  },
  plugins: [],
}
