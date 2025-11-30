/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#b7e7ff',
          300: '#85d9ff',
          400: '#4ac4ff',
          500: '#189df2',
          600: '#0d77c9',
          700: '#0b5ea1',
          800: '#0d4f82',
          900: '#0f446c',
        },
      },
    },
  },
  plugins: [],
};
