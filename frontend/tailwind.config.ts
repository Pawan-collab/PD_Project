import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        rajdhani: ['"Rajdhani"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        },
        "slide-up": {
          from: { transform: "translateY(12px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" }
        },
        "pulse-glow": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".6" }
        },
        "float-gentle": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "scale-up": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up .25s ease-out both",
        "pulse-glow": "pulse-glow 1.8s ease-in-out infinite",
        "float-gentle": "float-gentle 8s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "scale-up": "scale-up 0.6s ease-out forwards"
      },
      boxShadow: {
        elegant: "0 8px 24px rgba(0,0,0,.12)",
        glow: "0 0 24px rgba(66, 153, 225, 0.4)",
        neon: "0 0 20px rgba(56, 189, 248, 0.5)",
        cyber: "0 8px 32px rgba(66, 153, 225, 0.3)",
        neural: "0 4px 24px rgba(139, 92, 246, 0.3)"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
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
    }
  },
  plugins: []
} satisfies Config;
