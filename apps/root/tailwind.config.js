module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
