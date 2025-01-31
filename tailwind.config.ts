import { getBlogConfig } from "./src/lib/server/config";
import type { Config } from "tailwindcss";
const blogConfig = getBlogConfig();

export default {
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
        day: {
          DEFAULT: blogConfig.lightBackground || "#ffffff",
        },
        night: {
          DEFAULT: blogConfig.darkBackground || "#111827",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
