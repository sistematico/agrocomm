/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: '"Nunito", system-ui, sans-serif',
      },
      colors: {
        monokai: {
          dark: '#272822',
          fg: '#f8f8f2',
          bg: '#49483e',
          border: '#fff3',
          comment: '#75715e',
          yellow: '#e6db74',
          orange: '#fd971f',
          red: '#f92672',
          magenta: '#ae81ff',
          blue: '#66d9ef',
          cyan: '#a1efe4',
          green: '#a6e22e'
        },
        sonokai: {
          black: '#1F1E1C',
          dark: '#242120',
          fg: '#E4E3E1',
          bg: '#312C2B',
          border: '#fff3',
          bg_dim: '#242120',
          bg0: '#312C2B',
          bg1: '#393230',
          comment: '#75715e',
          yellow: '#F0C66F',
          orange: '#F08D71',
          red: '#f92672',
          magenta: '#9FA0E1',
          blue: '#81D0C9',
          cyan: '#a1efe4',
          green: '#A6CD77'
        }
      }
    },
  },
  plugins: [],
}