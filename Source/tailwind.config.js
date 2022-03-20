module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        accent: "var(--accent)",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
