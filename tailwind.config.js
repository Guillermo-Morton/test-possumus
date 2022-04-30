module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist:[
    {
      pattern: /bg-slate/,
      variants: ['hover'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}