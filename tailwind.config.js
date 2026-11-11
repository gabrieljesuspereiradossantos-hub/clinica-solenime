/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // hover: só em dispositivos com ponteiro (evita hover "preso" no toque)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        // Paleta própria proposta (a validar com a clínica)
        areia: {
          50: "#FBF8F4",
          100: "#F5EFE6",
          200: "#EADFCF",
          300: "#D9C7AE",
        },
        champagne: {
          400: "#C9AE86",
          500: "#B39568", // só decorativo: 2,7:1 sobre areia, não passa AA como texto
          700: "#80633E", // texto (etiquetas, numerais): ~5,3:1 sobre areia-50
        },
        cacau: {
          600: "#7A5F48",
          700: "#5C4534",
          800: "#3E2E23",
        },
        grafite: "#2B2622",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        page: "1440px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};
