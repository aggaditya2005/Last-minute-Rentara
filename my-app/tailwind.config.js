/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%": {
            textShadow:
              "0 0 10px #ff4d6d, 0 0 20px #ff99b3, 0 0 40px #ffccd6",
          },
          "100%": {
            textShadow:
              "0 0 20px #ff4d6d, 0 0 30px #ff99b3, 0 0 60px #ffccd6, 0 0 80px #ffccd6",
          },
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
