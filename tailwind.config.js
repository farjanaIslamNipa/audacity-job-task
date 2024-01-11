/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#6941C6',
        defaultGray: '#4E5D78',
        lightGray: '#B0B7C3',
        errorBorder: '#FDA29B',
        errorFocus: '#FEE4E2',
        error: '#F04438',
        dark: '#101828',
        defaultBorder: '#EAECF0'
      }
    },
    screens:{
      'xs': '412px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  },
  plugins: [],
}