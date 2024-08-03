/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#000",
          secondary: "rgb(24, 24, 27)",
          border: "rgba(63, 63, 70, 0.4)",
          title: "rgb(244, 244, 245)",
          subtitle: "rgb(161, 161, 170)",
          bgHeader: "rgb(39, 39, 42)",
          blue: "rgb(93, 188, 252)",
          iconHover: "#d4d4d8",
        },
        light: {
          primary: "rgb(250, 250, 250)",
          secondary: "rgb(255, 255, 255)",
          border: "rgba(202, 202, 202, 0.518)",
          title: "rgb(39, 39, 42)",
          subtitle: "rgb(82, 82, 91)",
          bgHeader: "rgb(247, 247, 247)",
          blue: "rgb(0, 149, 246)",
          iconHover: "#333",
        },
      },
      container: {
        center: "true",
      },
    },
  },
  plugins: [],
};
