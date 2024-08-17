/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'nuclear-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#0ca7eb',
          600: '#008bd1',
          700: '#016aa3',
          800: '#065a86',
          900: '#0b4b6f',
          950: '#072f4a',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/bg/mt-diablo-1920x455.jpg')",
        'regular-pattern': "url('/images/WoN-title-banner-v3.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
