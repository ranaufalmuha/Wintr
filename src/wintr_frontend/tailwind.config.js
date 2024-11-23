/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // dark 
        "dark_background": "var(--dark_background)",
        "dark_text": "var(--dark_color)",
        "dark_disabled": "#808080",
        "dark_button": "black",

        // light 
        "light_background": "var(--light_background)",
        "light_text": "var(--light_color)",
        "light_disabled": "#808080",
        "light_button": "white",

        "accent": "#6CAFD9",

        "light": "#F6F6F6",
        "dark": "#212121",
        "content": "#212121",

        "disabled": "#808080",
      },
      gradientColorStopPositions: {
        3: '3%',
      }
    },
  },
  plugins: [],
}