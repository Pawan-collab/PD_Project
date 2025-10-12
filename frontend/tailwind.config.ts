import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // animations used by your components
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        "slide-up": { from: { transform: "translateY(12px)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
        "pulse-glow": { "0%,100%": { opacity: "1" }, "50%": { opacity: ".6" } }
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "slide-up": "slide-up .25s ease-out both",
        "pulse-glow": "pulse-glow 1.8s ease-in-out infinite"
      },
      boxShadow: {
        elegant: "0 8px 24px rgba(0,0,0,.12)",
        glow: "0 0 0 6px rgba(244,63,94,.15)" // rose glow
      },
      colors: {
        // lightweight tokens to back your utility aliases below
        primary: { DEFAULT: "#e11d48", foreground: "#ffffff" }, // rose-600
        muted: { DEFAULT: "#f1f5f9", foreground: "#334155" },    // slate
        accent: { DEFAULT: "#0ea5e9", foreground: "#ffffff" },  // sky-500
  border: "#fecdd3",                                      // rose-200
  background: { DEFAULT: "#f8fafc", foreground: "#334155" }, // custom background color
  foreground: "#334155" // custom foreground color
      }
    }
  },
  plugins: []
} satisfies Config;
