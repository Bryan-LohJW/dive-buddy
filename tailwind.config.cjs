/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c3968",
        secondary: "#F0EAD6",
      },
    },
  },
  plugins: [],
};

module.exports = config;
