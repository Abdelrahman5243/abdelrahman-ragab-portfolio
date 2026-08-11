/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "var(--dark-primary)",
          secondary: "var(--dark-secondary)",
          border: "var(--dark-border)",
          title: "var(--dark-title)",
          subtitle: "var(--dark-subtitle)",
          bgHeader: "var(--dark-bgHeader)",
          blue: "var(--dark-accent)",
          iconHover: "var(--dark-iconHover)",
        },
        light: {
          primary: "var(--light-primary)",
          secondary: "var(--light-secondary)",
          border: "var(--light-border)",
          title: "var(--light-title)",
          subtitle: "var(--light-subtitle)",
          bgHeader: "var(--light-bgHeader)",
          blue: "var(--light-accent)",
          iconHover: "var(--light-iconHover)",
        },
      },
      container: {
        center: true,
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  // Safelist for dynamically generated classes
  safelist: [
    'dark',
    'arabic',
  ],
};