/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#09090B", // Near-black for modern dark mode
          secondary: "#1C1C1F", // Rich dark surface like Framer
          border: "rgba(63, 63, 70, 0.3)", // Subtle modern border
          title: "#FAFAFA", // Crisp white text
          subtitle: "#A0A0AB", // Modern muted text
          bgHeader: "#18181B", // Distinct dark header
          blue: "#3B82F6", // Modern blue like Framer
          iconHover: "#E2E2E2", // Clean hover state
        },
        light: {
          primary: "#FAFAFA", // Clean white background
          secondary: "#FFFFFF", // Pure white surface
          border: "rgba(228, 228, 231, 0.7)", // Subtle light border
          title: "#09090B", // Near-black text
          subtitle: "#71717A", // Modern gray text
          bgHeader: "#F8F8F8", // Subtle header background
          blue: "#2563EB", // Vibrant blue for light mode
          iconHover: "#27272A", // Dark hover state
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
  plugins: [],
};