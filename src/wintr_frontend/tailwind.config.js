/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent": "#6CAFD9",
        // dark 
        "dark_background": "var(--dark_background)",
        "dark_text": "var(--dark_color)",
        "dark_button": "#3A3A3A",
        "dark_bgdisabled": "#3A3A3A",
        "dark_textdisabled": "#B0B0B0",
        "dark_borderdisabled": "#4A4A4A",
        "dark_input_background": "#2A2A2A",
        "dark_input_border": "#5A5A5A",

        // light 
        "light_background": "var(--light_background)",
        "light_text": "var(--light_color)",
        "light_button": "#F8F9FA",
        "light_disabled": "#808080",
        "light_bgdisabled": "#D3D3D3",
        "light_textdisabled": "#A0A0A0",
        "light_borderdisabled": "#B0B0B0",
        "light_input_background": "#F0F0F0",
        "light_input_border": "#C0C0C0",

        // subscribe 
        "lifetime": "#6CAFD9",
        "yearly": "#F1C40F",
        "monthly": "#C0C0C0",

        // temp 
        "bganimation": "#74B3DB",
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