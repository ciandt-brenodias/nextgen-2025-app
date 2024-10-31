/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          100: '#FAB8B4',
          200: '#FA8982',
          300: '#FA5A50',
          400: '#D94A41',
          500: '#A63832',
        },
        purple: {
          100: '#994D74',
          200: '#802655',
          300: '#690037',
        },
        pink: {
          100: '#FAB9FF',
          200: '#C785CC',
          300: '#A26CA6',
        },
        navy: {
          100: '#393973',
          200: '#242459',
          300: '#000050',
        },
        blue: {
          100: '#B4DCFA',
          200: '#8CB3D9',
          300: '#6B8FB3',
        },
      },
    }
  },
  plugins: [],
};

