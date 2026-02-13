/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4F46E5",   // Indigo
          secondary: "#6366F1",
          accent: "#22D3EE",    // Cyan
          dark: "#0F172A",
        },
      },
      backgroundImage: {
        "gradient-main":
          "linear-gradient(135deg, #4F46E5 0%, #6366F1 40%, #22D3EE 100%)",
        "gradient-soft":
          "linear-gradient(to right, #eef2ff, #f0f9ff)",
        "gradient-button":
          "linear-gradient(to right, #4F46E5, #6366F1)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.08)",
        glow: "0 0 20px rgba(79, 70, 229, 0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
