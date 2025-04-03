/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      animation: {
        gradient: "gradientBG 5s ease infinite",
      },
      keyframes: {
        gradientBG: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },

      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        customColor: "rgb(23, 30, 64)",
        primary: "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        gold: "#FFD700",
      },
      backgroundImage: {
        "multiple-gradients":
          "linear-gradient(to bottom, #f87171, #1e40af), linear-gradient(to right, #1e40af, #f87171)",
      },
      backgroundBlendMode: {
        multiply: "multiply",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        wide: "2880px",
        xs: "400px",
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
