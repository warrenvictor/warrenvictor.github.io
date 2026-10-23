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
        navy: {
          50: '#f0f5fa',
          100: '#e0ebf5',
          200: '#b8d2eb',
          300: '#85b2dd',
          600: '#1e467a',
          700: '#153359',
          800: '#0f2442',
          900: '#0d223c',
          950: '#081628',
          DEFAULT: '#153359',
        },
        brand: {
          light: '#e0f2fe',
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        }
      }
    },
  },
  plugins: [],
}
