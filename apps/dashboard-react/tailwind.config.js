module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../components/**/*.{js,jsx,ts,tsx}',   // se seus components vivem fora de src
  ],
    theme: {
    extend: {
      colors: {
        brandGreen: "#47a138",
        brandDark: "#004D61"
      }
    },
  },
  plugins: [],
}
