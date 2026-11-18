/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f3',
          100: '#dceee3',
          200: '#bcddcb',
          300: '#91c3ad',
          400: '#5fa28a',
          500: '#3e846e',
          600: '#2b6957',
          700: '#235446',
          800: '#1F4D36', // primary brand deep forest green
          900: '#193e2c',
          950: '#0d2218',
        },
        cream: {
          50: '#fdfbf7',
          100: '#F5F1E6', // primary background cream
          200: '#eae2cd',
          300: '#dcd0ad',
          400: '#cbb789',
          500: '#bc9f6b',
        },
        gold: {
          50: '#fcf8ec',
          100: '#f7edce',
          200: '#eedba0',
          300: '#e3c26b',
          400: '#d9a93e',
          500: '#C9972B', // primary mustard gold button/accent
          600: '#ad7a21',
          700: '#8a5b1d',
          800: '#72481e',
          900: '#613c1d',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px rgba(31, 77, 54, 0.06)',
        'elevated': '0 20px 40px -15px rgba(31, 77, 54, 0.15)',
      }
    },
  },
  plugins: [],
}
