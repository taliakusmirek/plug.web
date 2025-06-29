module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#1b7dff',
        'neon-lime': '#c2f04e',
        'off-white': '#f8f4e8',
        'jet-black': '#111111',
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        DEFAULT: '#f8f4e8',
      },
    },
  },
  plugins: [],
}; 