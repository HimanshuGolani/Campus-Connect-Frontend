export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];

export const theme = {
  extend: {
    colors: {
      primary: "rgb(236,87,43)",
      lightgray: "rgb(233,233,233)",
      lightdarkgray: "rgb(239,239,239)",
    },
  },
};

export const plugins = [
  require("@tailwindcss/aspect-ratio"),
  require("@tailwindcss/line-clamp"),
];

export const v = {};
