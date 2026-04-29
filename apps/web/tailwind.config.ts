import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "beulrock-black": "#0B0B0B",
        "beulrock-red": "#FF0000",
        "beulrock-card": "#1a1a1a",
        "beulrock-border": "#333333",
      },
    },
  },
  plugins: [],
};
export default config;