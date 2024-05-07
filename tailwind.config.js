/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg-theme.png')"
      },

      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'dancing': ['Dancing Script', 'Poppins']
      },

      boxShadow: {
        'footer' : '0px -2px 51px -7px rgba(0,0,0,0.35)'
      }
    },
  },
  plugins: [],
}

