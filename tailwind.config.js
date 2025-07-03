/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#FFD700',
        accent: '#00D4FF',
        surface: '#2A2A2A',
        background: '#121212',
        success: '#00E676',
        warning: '#FFA726',
        error: '#EF5350',
        info: '#29B6F6',
        text: {
          primary: '#FFFFFF',
          secondary: '#B0B0B0',
          muted: '#666666',
        }
      },
      fontFamily: {
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow': '0 0 30px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}