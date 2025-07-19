/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'organic-sage': {
          50: '#f8faf5',
          100: '#eef3e6',
          200: '#d6e5c4',
          300: '#b8d299',
          400: '#97BC62',
          500: '#7fa055',
          600: '#6a8746',
          700: '#556e38',
          800: '#45582e',
          900: '#3a4927',
        },
        'organic-forest': {
          50: '#f4f7f4',
          100: '#e6ebe6',
          200: '#cdd6ce',
          300: '#a8bba9',
          400: '#7d9a7f',
          500: '#5c7d5e',
          600: '#4a6549',
          700: '#3c5239',
          800: '#2C5F2D',
          900: '#243e25',
        },
        'organic-earth': {
          50: '#fffcf0',
          100: '#fff7db',
          200: '#ffecb7',
          300: '#ffdd88',
          400: '#FFBF00',
          500: '#f0a500',
          600: '#d18400',
          700: '#b06200',
          800: '#8e4b06',
          900: '#743d0b',
        },
      },
      fontFamily: {
        'serif': ['Lora', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'organic': '0 4px 20px rgba(44, 95, 45, 0.1)',
        'organic-lg': '0 8px 30px rgba(44, 95, 45, 0.15)',
      },
    },
  },
  plugins: [],
}
