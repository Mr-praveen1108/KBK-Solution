/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#050508',
          mid: '#0c0e14',
          light: '#141820',
        },
        brand: {
          green: '#10b981',
          glow: '#34d399',
          teal: '#06b6d4',
          violet: '#8b5cf6',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, rgba(16,185,129,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(99,102,241,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6,182,212,0.1) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(139,92,246,0.08) 0px, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)',
        'gradient-text': 'linear-gradient(135deg, #34d399 0%, #22d3ee 40%, #a78bfa 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-md': '0 0 40px rgba(16, 185, 129, 0.2), 0 0 80px rgba(99, 102, 241, 0.1)',
        'glow-lg': '0 0 60px rgba(16, 185, 129, 0.25), 0 0 120px rgba(6, 182, 212, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
