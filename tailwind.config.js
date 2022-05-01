module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist:[
    {
      pattern: /bg-slate/,
      variants: ['hover'],
    },
    {
      pattern: /w/,
      variants: ['after']
    },
    {
      pattern: /h/,
      variants: ['after']
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}