/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        hide: 'scrollbar-hidden'
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
