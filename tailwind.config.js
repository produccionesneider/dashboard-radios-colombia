/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-card': '#1E1E1E',
        'brand-blue': '#2563EB',
        'brand-red': '#DC2626',
        'brand-orange': '#F97316',
        'brand-emerald': '#10B981',
      }
    },
  },
  plugins: [],
}