/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', "serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primaryText: "#101828",
        secondaryText: "#475467",
      },
    },
  },
  plugins: [],
};
