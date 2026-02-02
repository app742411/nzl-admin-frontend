/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // all React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#172C53", // Dark Blue
        secondary: "#3ACBFA", // Light Blue
        danger: "#D02030", // Red
      },

      backgroundImage: {
        "brand-950":
          "linear-gradient(135deg, #F2F7FF 0%, #FFFFFF 50%, #EFF5FF 100%)",
        "brand-1000": "linear-gradient(135deg, #00B89E 0%, #0066F8 52%)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
