/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#bddffc',
          100: '#94ccfa',
          200: '#6bb8f8',
          300: '#4da9f7',
          400: '#359af5',
          500: '#318ce7',
          600: '#2b7ad4',
          700: '#2769c2',
          800: '#1f4ba2',
          900: '#1e428b',
        }
      }
    },
  },
  plugins: [],
}

