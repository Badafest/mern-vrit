/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_dark: "#101C2E",
        primary: "#1E4277",
        primary_light: "#1E449E",
        secondary_dark: "#254458",
        secondary: "#457B9D",
        secondary_light: "#5aa2c",
        tertiary_dark: "#638283",
        tertiary: "#A8DADC",
        tertiary_light: "#bff8fa",
        light: "#F1FAEE",
        lighter: "#FAFDFF",
        contrast_dark: "#E60946",
        contrast: "#E63946",
        contrast_light: "#E66446",
      },
    },
    screens: {
      md: "990px",
    },
  },
  plugins: [],
};
