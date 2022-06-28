const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "public/**/*.html"],
  theme: {
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["'Livvic'", defaultTheme.fontFamily.sans],
        balgin: "'Balgin Black'",
      },
      colors: {
        skin: {
          accent: "var(--color-text-accent)",
          primary: "var(--color-text-primary)",
        },
      },
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          primary: "var(--color-text-primary)",
          muted: "var(--color-text-muted)",
          accent: "var(--color-text-accent)",
        },
      },
      backgroundColor: {
        skin: {
          "fill-base": "var(--color-fill-base)",
          "fill-base-transparent": "var(--color-fill-base-transparent)",
          "fill-primary": "var(--color-fill-primary)",
          "fill-accent": "var(--color-fill-accent)",
          "fill-card-accent": "var(--color-fill-card-accent)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
        },
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
