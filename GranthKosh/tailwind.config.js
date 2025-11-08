/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#D69E2E",
        "background-light": "#FFFFFF",
        "background-dark": "#2D3748",
        "text-light-primary": "#2D3748",
        "text-dark-primary": "#FFFFFF",
        "text-light-secondary": "#4A5568",
        "text-dark-secondary": "#A0AEC0",
        "border-light": "#E2E8F0",
        "border-dark": "#4A5568",
        "surface-light": "#F7FAFC",
        "surface-dark": "#1A202C"
      },
      fontFamily: {
        "display": ["Lora", "serif"],
        "body": ["Work Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
