module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    "cssnano": { preset: "advanced", autoprefixer: false, "postcss-zindex": false }
  }
};