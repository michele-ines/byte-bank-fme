module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../components/**/*.{js,jsx,ts,tsx}", // se seus components vivem fora de src
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: "#47a138",
        brandDark: "#004D61",
      },
      screens: {
        // Se quiser manter os breakpoints padrões, inclua-os aqui também.
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",

        // Adicionando um breakpoint customizado chamado 'desktop'
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};
