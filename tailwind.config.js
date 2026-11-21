import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        forest: {
          50: '#f0f7f3',
          100: '#dceee3',
          200: '#bcddcb',
          300: '#91c3ad',
          400: '#5fa28a',
          500: '#3e846e',
          600: '#2b6957',
          700: '#235446',
          800: '#1F4D36',
          900: '#193e2c',
          950: '#0d2218',
        },
        gold: {
          50: '#fcf8ec',
          100: '#f7edce',
          200: '#eedba0',
          300: '#e3c26b',
          400: '#d9a93e',
          500: '#C9972B',
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
  plugins: [containerQueries],
}
