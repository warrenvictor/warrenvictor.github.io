/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./404.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          light: '#e0f2fe',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        }
      }
    },
  },
  plugins: [],
}
