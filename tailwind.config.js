/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        caveat: ["'Caveat'", "'Caveat Fallback'", "cursive"],
        bricolage: ["'Bricolage Grotesque'", "sans-serif"],
        jetbrains: ["'JetBrains Mono'", "monospace"],
        newsreader: ["'Newsreader'", "serif"],
        worksans: ["'Work Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
