/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in-black': {
          '0%': { opacity: '0', backgroundColor: 'black' },
          '100%': { opacity: '1', backgroundColor: 'transparent' },
        },
      },
      animation: {
        'fade-in-black': 'fade-in-black 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
