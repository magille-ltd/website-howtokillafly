export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        'digital': ['VT323', 'monospace'],
        'military': ['"Black Ops One"', 'cursive'],
      },
      colors: {
        'khaki': {
          300: '#c3b091',
        },
        'army': {
          600: '#4b5320',
        },
        'olive': {
          800: '#3c4720',
        },
      },
    },
  },
  plugins: [],
};
