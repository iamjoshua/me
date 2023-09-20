/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
        arvo: ["var(--font-arvo)"],
      },
      keyframes: ({ theme }) => ({
        pulseonce: {
          "100%": {
            opacity: 0,
            background: theme("colors.sky.600"),
          },
          "50%": {
            opacity: 0.2,
            background: theme("colors.sky.600"),
          },
          "0%": {
            opacity: 0.5,
            background: theme("colors.sky.600"),
          },
        },
      }),
      animation: {
        fire: "pulseonce 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
