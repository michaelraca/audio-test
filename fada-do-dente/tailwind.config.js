/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magic: {
          light: '#E0D4FC',
          DEFAULT: '#9B72CF',
          dark: '#6B4C9A',
        },
        fairy: {
          pink: '#FFB6D9',
          blue: '#A8D8FF',
          gold: '#FFD700',
        },
        night: {
          sky: '#1a1a3e',
          deep: '#0d0d2b',
        }
      },
      fontFamily: {
        'display': ['Comic Sans MS', 'Chalkboard', 'cursive'],
        'body': ['Verdana', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(155, 114, 207, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(155, 114, 207, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
