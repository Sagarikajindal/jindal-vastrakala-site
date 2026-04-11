import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdf8ec",
          100: "#f9edca",
          200: "#f2d78f",
          300: "#eabc4a",
          400: "#d4a017",
          500: "#b8870e",
          600: "#96690a",
          700: "#744f0c",
          800: "#5c3e10",
          900: "#4a3212",
        },
        crimson: {
          50:  "#fef2f2",
          100: "#fde0e0",
          200: "#fbb8b8",
          300: "#f78080",
          400: "#ef4040",
          500: "#dc1e1e",
          600: "#b91212",
          700: "#991212",
          800: "#7e1414",
          900: "#6b1717",
        },
        royal: {
          50:  "#f5f0ff",
          100: "#ede4ff",
          200: "#d9c8ff",
          300: "#be9fff",
          400: "#9f6bff",
          500: "#8338f5",
          600: "#6e1fe0",
          700: "#5c16bc",
          800: "#4a1499",
          900: "#3d1280",
        },
        ink: {
          900: "#0f0a05",
          800: "#1a1209",
          700: "#261a0e",
          600: "#352414",
          500: "#4a3319",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4a017 0%, #eabc4a 50%, #b8870e 100%)",
        "dark-gradient": "linear-gradient(180deg, #0f0a05 0%, #1a1209 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
