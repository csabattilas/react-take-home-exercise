/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', 
          600: '#4f46e5',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          300: '#cbd5e1',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444', 
          600: '#dc2626', 
        },
        success: {
          500: '#22c55e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
