/**
 * @type {import('postcss').ProcessOptions}
 */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-nested": {},
    "postcss-rem-to-responsive-pixel": {
      rootValue: 16,
      transformUnit: "px"
    }
  }
}
