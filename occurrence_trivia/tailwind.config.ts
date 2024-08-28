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
        floralWhite: '#fffcf2ff',
        timberwolf: '#ccc5b9ff',
        blackOlive: '#403d39ff',
        eerieBlack: '#252422ff',
        flame: '#eb5e28ff',
      }
    },
  },
  plugins: [],
};
export default config;
