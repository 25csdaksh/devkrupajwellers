/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dominant: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-dominant-rgb) / ${opacityValue})` : `var(--color-dominant)`,
        secondary: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-secondary-rgb) / ${opacityValue})` : `var(--color-secondary)`,
        accent: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-accent-rgb) / ${opacityValue})` : `var(--color-accent)`,
      },
      textColor: {
        primary: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-text-primary-rgb) / ${opacityValue})` : `var(--color-text-primary)`,
        secondary: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-text-secondary-rgb) / ${opacityValue})` : `var(--color-text-secondary)`,
        muted: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-text-muted-rgb) / ${opacityValue})` : `var(--color-text-muted)`,
        light: ({ opacityValue }) => opacityValue !== undefined ? `rgb(var(--color-text-light-rgb) / ${opacityValue})` : `var(--color-text-light)`,
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      }
    },
  },
  plugins: [],
}
