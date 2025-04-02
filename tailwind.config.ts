import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0575E6',
      },
      backgroundImage: {
        'gradient-top-right': 'radial-gradient(circle at top right, rgba(5, 117, 230, 0.3) 0%, rgba(5, 117, 230, 0) 35%)',
        'gradient-bottom-right': 'radial-gradient(circle at bottom right, rgba(5, 117, 230, 0.3) 0%, rgba(5, 117, 230, 0) 35%)',
        'gradient-right': 'radial-gradient(circle at right, rgba(5, 117, 230, 0.3) 0%, rgba(5, 117, 230, 0) 35%)',
        'gradient-center': 'radial-gradient(circle at center, rgba(5, 117, 230, 1) 0%, rgba(5, 117, 230, 0) 100%)',
        'gradient-left': 'radial-gradient(circle at left, rgba(5, 117, 230, 0.6) 0%, rgba(5, 117, 230, 0) 20%)'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
