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
        primary: "#E6FF94",
        secondary: "#9DDE8B",
        tertiary: "#40A578",
        accent: "#006769",
        dark: "#040D12",
        light: "#F8F6F4",
      },
    },
  },
  plugins: [],
};
