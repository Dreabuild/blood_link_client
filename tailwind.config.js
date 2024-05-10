/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BF0000",
        secondary: "#1E1E1E",
        red: {
          50: "#f9e6e6",
          100: "#ebb0b0",
          200: "#e28a8a",
          300: "#d45454",
          400: "#cc3333",
          500: "#bf0000",
          600: "#ae0000",
          700: "#880000",
          800: "#690000",
          900: "#500000",
        },
        gray: {
          50: "e9e9e9",
          100: "#b9b9b9",
          200: "#989898",
          300: "#686868",
          400: "#4b4b4b",
          500: "#1e1e1e",
          600: "#1b1b1b",
          700: "#151515",
          800: "#111111",
          900: "#0d0d0d",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
