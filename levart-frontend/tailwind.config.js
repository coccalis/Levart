/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "360px",
        smLg: "1366px",
        mdLg: "1536px",
      },
      colors: {
        "primary-grn": "#47A050",
        "dark-grn": "#00241B",
        "light-grn": "#CEFFD2",
        mainText: "#3A3A3A",
        "secondary-text": "#888888",
        "third-text": "#808080",
        navClr: "#D2FFD7",
        navSearchClr: "#D2FFD7",
        mainBtn: "#47A050",
        linkBtn: "#54BA56",
        hoverLinkBtn: "#38853A",
        hoverText: "#419448",
        "divider-clr": "#9ED7A3",
        dropDownHover: "#d9ffdc",
        "border-dark": "#808080",
        "chat-bouble": "#78E378",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#47A050",
            },
          },
        },
      },
    }),
  ],
};
