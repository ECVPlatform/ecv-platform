/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:       '#1A1916',
        parchment: '#F0EDE8',
        tobacco:   '#8B7355',
        fog:       '#B8B2A8',
        white:     '#FFFFFF',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '430px' },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'fade-up-1': 'fadeUp 0.5s 0.1s ease both',
        'fade-up-2': 'fadeUp 0.5s 0.2s ease both',
        'fade-up-3': 'fadeUp 0.5s 0.3s ease both',
        'fade-up-4': 'fadeUp 0.5s 0.4s ease both',
        'fade-up-5': 'fadeUp 0.5s 0.5s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
