module.exports = {
  mode: 'jit',
  purge: [
    'index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Nunito', 'sans-serif'],
        display: ['VT323', 'monospace']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
