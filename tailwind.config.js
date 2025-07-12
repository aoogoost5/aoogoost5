/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './index.js',
  ],
  theme: {
    extend: {
      colors: {
        wood: 'var(--wood-color)',
        fire: 'var(--fire-color)',
        earth: 'var(--earth-color)',
        metal: 'var(--metal-color)',
        water: 'var(--water-color)',
      },
    },
  },
  plugins: [],
} 