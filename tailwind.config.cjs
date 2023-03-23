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
        secondary: "#F0EAD6",
      },
      animation: {
        float1: "float1 6s linear infinite",
        float2: "float2 9s linear infinite",
        float3: "float3 12s linear infinite",
        float4: "float4 7s linear infinite",
        float5: "float5 10s linear infinite",
        float6: "float6 8s linear infinite",
      },
      keyframes: {
        float1: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translate(40px, -100vh)", opacity: "0" },
        },
        float2: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translate(20px, -100vh)", opacity: "0" },
        },
        float3: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translate(-30px, -100vh)", opacity: "0" },
        },
        float4: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translate(-10px, -100vh)", opacity: "0" },
        },
        float5: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translate(-40px, -100vh)", opacity: "0" },
        },
        float6: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translate(30px, -100vh)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
