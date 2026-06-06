/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#CD0032',
          dark: '#080403',
          light: '#FAFBFC',
        },
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
