module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': "'Poppins'",
        'roboto': "'Roboto'",
      },
      colors: {
        "secondary-text": "#7B7B7B",
        "card-bg": "#EBEBEB",
      }
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
