/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#FBF8F4',
        ivory: '#F5EEE6',
        sand: '#E6DACC',
        mink: '#AE9E8F',
        taupe: '#8B7B6D',
        bronze: '#9C7A5C',
        cocoa: '#4B3C33',
        espresso: '#221A15',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      letterSpacing: { logo: '0.32em', wide2: '0.22em' },
    },
  },
  plugins: [],
};
