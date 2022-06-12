/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
