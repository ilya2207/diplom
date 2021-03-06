module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        'chakra-blue': {
          100: '#bee3f8',
          200: '#90cdf4',
          300: '#63b3ed',
          400: '#4299e1',
          500: '#3182ce',
          600: '#2b6cb0',
          700: '#2c5282',
          800: '#2a4365',
          900: '#1A365D',
        },
        'chakra-red': {
          500: '#E53E3E',
        },
        'chakra-green': {
          400: '#48BB78',
        },
      },
      screens: {
        laptop: { max: '1100px' },
        lowTablet: { max: '800px' },
        tablet: { max: '600px' },
        mobile: { max: '400px' },
      },
      fontFamily: {
        title: ['Russo One', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
