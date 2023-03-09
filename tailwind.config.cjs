/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F4819F",
          50: "#FDEBEF",
          100: "#FCDFE6",
          200: "#FAC7D5",
          300: "#F8B0C3",
          400: "#F698B1",
          500: "#F4819F",
          600: "#ED3162",
          700: "#B8103C",
          800: "#680922",
          900: "#180208",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
