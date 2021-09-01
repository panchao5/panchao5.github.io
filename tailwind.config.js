const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray,
      primary: colors.lime,
      secondary: colors.yellow,
      success: colors.emerald,
      warning: colors.amber,
      danger: colors.red,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ theme, addUtilities, addComponents }) {
      const newUtilities = {
        ".styled-underline": {
          "--th-underline-color": theme("colors.primary.400"),
          "--th-underline-width": "0.25em",
          background:
            "linear-gradient(90deg, var(--th-underline-color) 0, var(--th-underline-color) 100%) no-repeat",
          "background-size": "90% var(--th-underline-width)",
          "background-position": "left calc(1em - var(--th-underline-width))",
        },
      };

      addUtilities(newUtilities, {
        variants: ["hover"],
      });
    }),
  ],
};
