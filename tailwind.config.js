/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic': ['Comic Sans MS', 'cursive'],
        'bubble': ['Arial Black', 'sans-serif'],
      },
      animation: {
        'tap-effect': 'tapEffect 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'background-effect': 'backgroundEffect 2s ease-out forwards',
        'bounce-across': 'bounceAcross 2s infinite linear',
        'float-up': 'floatUp 3s infinite ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'level-up': 'levelUp 1s ease-in-out',
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
      },
      keyframes: {
        tapEffect: {
          '0%': {
            transform: 'scale(0) rotate(0deg)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.5) rotate(180deg)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(2.5) rotate(360deg)',
            opacity: '0',
          },
        },
        backgroundEffect: {
          '0%': {
            transform: 'scale(0) translateY(0)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.5) translateY(-20px)',
            opacity: '0.7',
          },
          '100%': {
            transform: 'scale(2) translateY(-40px)',
            opacity: '0',
          },
        },
        bounceAcross: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(-50%)',
          },
          '50%': {
            transform: 'translateX(300px) translateY(-80px)',
          },
        },
        floatUp: {
          '0%, 100%': {
            transform: 'translateX(-50%) translateY(0)',
          },
          '50%': {
            transform: 'translateX(-50%) translateY(-40px)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        levelUp: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
