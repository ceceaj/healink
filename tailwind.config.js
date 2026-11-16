/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core SELENA Phase 1 Palette
        selena: {
          bg: "#FAFAFA",             // Primary: Soft Off-White app background
          primary: "#FAFAFA",        // Primary alias
          purple: "#CDB4DB",         // Accent 1: Pastel Purple
          lavender: "#CDB4DB",       // Alias matching reference design
          "purple-dark": "#6B5779",  // Deep muted plum for contrast icons/badges
          "purple-light": "#F4EEF8", // Soft lavender wash for cards/chips
          pink: "#FFC8DD",           // Accent 2: Pastel Pink
          "pink-light": "#FFF0F5",   // Soft blush wash
          text: "#1D1A39",           // Text: Dark Navy/Purple
          navy: "#1D1A39",           // Alias matching reference design
          muted: "#4A4E69",          // Secondary muted slate purple text
          mint: "#D8F3DC",           // Grounding sage mint accent
          cream: "#FFF9FA",          // Soft cream surface
          alert: "#FDE2E4",          // Trauma-informed soft rose alert
        },
        // Sanctuary Haven Reference Design System Tokens
        background: "#FAFAFA",
        surface: "#FCF8FF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F6F1FF",
        "surface-container": "#F0EBFF",
        "surface-container-high": "#EAE5FF",
        "primary-container": "#CDB4DB",
        "secondary-container": "#FFC8DD",
        "tertiary-container": "#A9C3AE",
        "on-surface": "#1D1A39",
        "on-surface-variant": "#4A454C",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "Nunito Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",      // 16px default soft rounding
        xl: "1rem",           // 16px
        "2xl": "1.25rem",     // 20px (Sanctuary card envelope)
        "3xl": "1.5rem",      // 24px (Sheets, hero containers, bottom nav)
        "4xl": "2rem",        // 32px
      },
      boxShadow: {
        "gentle-card": "0 8px 24px rgba(29, 26, 57, 0.05)",
        "soft-purple": "0 10px 25px -4px rgba(205, 180, 219, 0.4), 0 4px 6px -2px rgba(205, 180, 219, 0.2)",
        "soft-pink": "0 10px 25px -4px rgba(255, 200, 221, 0.5), 0 4px 6px -2px rgba(255, 200, 221, 0.25)",
        "bottom-nav": "0 -8px 32px rgba(29, 26, 57, 0.06)",
        "mobile-frame": "0 0 50px rgba(29, 26, 57, 0.08)",
      },
    },
  },
  plugins: [],
};

