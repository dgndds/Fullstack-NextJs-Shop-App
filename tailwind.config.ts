import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "logo-text": [
          "24px",
          {
            fontWeight: "800",
            lineHeight: "40px",
          },
        ],

        "title-1": [
          "61px",
          {
            fontWeight: "600",
            lineHeight: "75px",
          },
        ],
        "title-2": [
          "55px",
          {
            fontWeight: "600",
            lineHeight: "69px",
          },
        ],
        "title-3": [
          "32px",
          {
            fontWeight: "600",
            lineHeight: "46px",
          },
        ],
        "subtitle-1": [
          "24px",
          {
            fontWeight: "700",
            lineHeight: "40px",
          },
        ],
        "subtitle-2": [
          "20px",
          {
            fontWeight: "600",
            lineHeight: "32px",
          },
        ],
        "subtitle-3": [
          "16px",
          {
            fontWeight: "500",
            lineHeight: "24px",
          },
        ],

        "mobile-title-1": [
          "59px",
          {
            fontWeight: "600",
            lineHeight: "75px",
          },
        ],
        "mobile-title-2": [
          "43px",
          {
            fontWeight: "600",
            lineHeight: "69px",
          },
        ],
        "mobile-title-3": [
          "20px",
          {
            fontWeight: "600",
            lineHeight: "46px",
          },
        ],

        // Body text
        body: [
          "16px",
          {
            lineHeight: "1.5",
          },
        ],
        "body-small": [
          "14px",
          {
            lineHeight: "1.5",
          },
        ],

        sm: [
          "14px",
          {
            lineHeight: "1.5",
          },
        ],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
