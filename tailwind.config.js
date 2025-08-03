/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1E1E1E',
        primary: '#006D77',
        highlight: '#83C5BE', 
        accent: '#FFD166',
        softText: '#FDFCDC',
        subtleGray: '#2A2A2A',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        poetry: ['Lora', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.3)',
        glow: '0 0 20px rgba(255, 209, 102, 0.4)',
        'glow-primary': '0 0 20px rgba(0, 109, 119, 0.4)',
        'glow-highlight': '0 0 20px rgba(131, 197, 190, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #006D77 0%, #83C5BE 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FFD166 0%, #FFB703 100%)',
        'gradient-dark-teal': 'linear-gradient(135deg, #1E1E1E 0%, #006D77 100%)',
        'gradient-dark-subtle': 'linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 209, 102, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 209, 102, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
