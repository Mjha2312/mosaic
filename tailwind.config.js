/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#070709',
        'abyss-2': '#0b0b10',
        'card-glass': 'rgba(255,255,255,0.04)',
        electric: '#6a5cff',
        hyper: '#ff3df5',
        cyber: '#00e5ff',
        acid: '#d4ff3f',
        ink: '#f4f4f8',
        muted: '#9a9aaf',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-electric': '0 0 20px rgba(106,92,255,0.35), 0 0 60px rgba(106,92,255,0.15)',
        'glow-hyper': '0 0 20px rgba(255,61,245,0.35), 0 0 60px rgba(255,61,245,0.15)',
        'glow-cyber': '0 0 20px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.12)',
        'glow-acid': '0 0 20px rgba(212,255,63,0.3), 0 0 60px rgba(212,255,63,0.12)',
        'card-glow': '0 8px 40px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-28px) rotate(6deg)' },
        },
        'orb-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -40px)' },
        },
        'slide-in-next': {
          '0%': { transform: 'translateX(60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-prev': {
          '0%': { transform: 'translateX(-60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'orb-pulse': 'orb-pulse 8s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        pop: 'pop 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-slow': 'fade-in 0.8s ease-out',
        drift: 'drift 18s ease-in-out infinite',
        'slide-in-next': 'slide-in-next 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-prev': 'slide-in-prev 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
