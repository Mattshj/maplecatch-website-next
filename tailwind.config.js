/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "inter-medium": ["Inter", "sans-serif"],
        "inter-semibold": ["Inter", "sans-serif"],
        "inter-bold": ["Inter", "sans-serif"],
        "inter-extrabold": ["Inter", "sans-serif"],
      },
      colors: {
        light: {
          primary: '#C62828',
          primaryLight: '#EF5350',
          primaryDark: '#8E0000',
          background: '#FFFFFF',
          surface: {
            primary: '#EEEEEE',
            secondary: '#D9D9D9',
            tertiary: '#BCBCBC',
            quaternary: '#B0B0B0',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
            tertiary: '#BDBDBD',
          },
          border: { 
            primary: '#E0E0E0',
            secondary: '#EEEEEE',
          },
          icon: {
            primary: '#C62828',
            secondary: '#757575',
          },
          button: {
            primary: '#C62828',
            secondary: '#263238',
            text: {
              primary: '#FFFFFF',
              secondary: '#C62828',
            },
          },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
};
