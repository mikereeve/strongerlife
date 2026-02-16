/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* --- Brand Colors ---
       * Warm, trustworthy palette suited for a counseling/ministry site.
       * Primary: Deep navy conveys authority and trust
       * Accent: Warm gold adds warmth and approachability
       * Sage: Calming green for growth/renewal imagery
       */
      colors: {
        brand: {
          navy: "#1B2A4A",
          "navy-light": "#2A3F6E",
          cream: "#FAF7F2",
          gold: "#C8913A",          // Buttons, decorative accents
          "gold-dark": "#A67620",   // Text on light backgrounds (WCAG AA)
          "gold-light": "#E5C88E",
          sage: "#7A9E7E",
          "sage-light": "#B5CDB8",
          charcoal: "#33302B",      // Warm charcoal — harmonizes with cream
          stone: "#6B655A",         // Secondary text (WCAG AA on cream)
          "stone-light": "#8B8578", // Decorative/placeholder text only
        },
      },

      /* --- Typography ---
       * Playfair Display: Elegant serif for headings (warmth + authority)
       * Source Sans 3: Clean, readable sans-serif for body text
       */
      fontFamily: {
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },

      /* --- Spacing & Layout --- */
      maxWidth: {
        content: "1200px",
        narrow: "800px",
      },

      /* --- Animations --- */
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
