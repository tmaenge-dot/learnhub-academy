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
        primary: "#0ea5e9",      // Sky blue - professional & trustworthy
        secondary: "#f59e0b",    // Amber - energetic & warm
        accent: "#10b981",       // Emerald - success & growth
        dark: "#1e293b",         // Slate - modern dark
      },
    },
  },
  plugins: [],
};
export default config;
