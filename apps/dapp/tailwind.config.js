module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
    }
  },
}
