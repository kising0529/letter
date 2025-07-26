/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'letter-brown': '#8B4513',
        'letter-cream': '#F5F5DC',
        'letter-gold': '#DAA520'
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'handwriting': ['Courier New', 'monospace']
      }
    },
  },
  plugins: [],
} 