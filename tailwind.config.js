/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        healink: {
          bg: "#F7FBF7",
          ivory: "#FFFDF5",
          green: "#10B981",
          "green-hover": "#059669",
          "green-soft": "#ECFDF5",
          "green-deep": "#064E3B",
          yellow: "#FACC15",
          "yellow-accent": "#F59E0B",
          "yellow-soft": "#FEF9C3",
          sky: "#38BDF8",
          "sky-light": "#E0F2FE",
          trust: "#0284C7",
          coral: "#FB7185",
          "coral-light": "#FFE4E6",
          "coral-dark": "#E11D48",
          charcoal: "#1E293B",
          slate: "#475569",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-nunito)",
          "Nunito",
          "Nunito Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "1rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "kid-card": "0 10px 25px -5px rgba(6, 78, 59, 0.07), 0 4px 10px -2px rgba(6, 78, 59, 0.04)",
        "tactile-green": "0 4px 0 #059669",
        "tactile-yellow": "0 4px 0 #D97706",
        "tactile-sky": "0 4px 0 #0284C7",
        "tactile-coral": "0 4px 0 #E11D48",
        "bottom-nav": "0 -6px 24px rgba(6, 78, 59, 0.08)",
      },
    },
  },
  plugins: [],
};
