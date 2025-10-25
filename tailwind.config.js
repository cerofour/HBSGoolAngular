/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0081c5',
        secondary: '#8bc54a',
        danger: '#ec2700',
        'primary-hard': '#076ba1',
        'secondary-dark': '#6b9a3a',
        'danger-dark': '#c21e00',
      },
    },
  },
  plugins: [],
};

