/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        iphone: "375px",
      },
    },
  },
  plugins: [],
};
