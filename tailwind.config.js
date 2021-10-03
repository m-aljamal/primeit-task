module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "2rem",
      center: true,
    },
    extend: {
      colors:{
        dark:"#1D2D50"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
