/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // to hide scrollbar
      scrollbar: {
        hide: 'scrollbar-hidden'
      },

      // blinking animation
      keyframes: {
        pulse: {
          '0%': {opacity:1},
          '50%': {opacity:0.6},
          '100%': {opacity:1},
        },
        animation: {
          pulse: 'pulse 10s infinite'
        }
      }

    },
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        '.scrollbar-hidden': {
          'scrollbar-width':'none', // Firefox
          '-ms-overflow-style': 'none', // Edge, IE
          '&::-webkit-scrollbar': {
            display: 'none', // Safari, Chrome
          }
        }
      }
      addUtilities(newUtilities);
    }
  ],
}
