const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',  // Corrected line
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('flowbite/plugin')
    flowbite.plugin(),
    require('tailwind-scrollbar'),
  ],
};
