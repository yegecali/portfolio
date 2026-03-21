/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Lato", "sans-serif"],
      },
      colors: {
        bg: "rgb(var(--bg-light) / <alpha-value>)",
        surface: "rgb(var(--surface-light) / <alpha-value>)",
        muted: "rgb(var(--muted-light) / <alpha-value>)",
        border: "rgb(var(--border-light) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary-light) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted-light) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        cyan: "rgb(var(--cyan) / <alpha-value>)",
        violet: "rgb(var(--violet) / <alpha-value>)",
      },
      keyframes: {
        open: {
          "0%": {
            opacity: 1,
            transform: "translateX(100%)",
          },
        },
        close: {
          to: {
            opacity: 0,
            transform: "translateX(100%)",
          },
        },
        waving: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        rotating: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "border-scroll": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "waving-hand": "waving 2s linear 3",
        rotating: "rotating 20s linear infinite",
        "border-scroll": "border-scroll 6s linear infinite",
      },
    },
  },
  plugins: [],
};
