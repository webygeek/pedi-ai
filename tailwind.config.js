/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2c4a45',
          light: '#3d5f58',
          dark: '#1c3a35',
        },
        sage: {
          DEFAULT: '#7bada6',
          light: '#a8d5c8',
          dark: '#5b8d86',
        },
        coral: {
          DEFAULT: '#c04f7a',
          light: '#d06a91',
          dark: '#a03d64',
        },
        cream: {
          DEFAULT: '#faf8f5',
          dark: '#f0ebe4',
        },
        mist: '#e8efee',
        danger: {
          DEFAULT: '#9e3535',
          light: '#b84040',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'float': 'float 4s ease-in-out infinite',
        'pulse-dot': 'pulse 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
