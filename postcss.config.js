/**
 * @type {import('postcss').ProcessOptions}
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-nested": {},
    "postcss-rem-to-responsive-pixel": {
      rootValue: 16,
      transformUnit: "px"
    }
  }
}
