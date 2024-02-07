/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'myDark': '#01021f',
        'myDark2': '#01022e',
      }
    },
  },
  plugins: [],
};
