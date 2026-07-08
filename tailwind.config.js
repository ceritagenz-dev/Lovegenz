/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bucin: {
          pink:    "#FF3D7F",
          hotpink: "#FF1493",
          red:     "#E0115F",
          deepred: "#C2185B",
          cream:   "#FFF0F3",
          purple:  "#A91079",
          gold:    "#FFD166",
          dark:    "#1a0015",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
      },
      keyframes: {
        heartbeat: {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.1)" },
        },
        heartbeatFast: {
          "0%,100%": { transform: "scale(1)" },
          "15%":     { transform: "scale(1.28)" },
          "30%":     { transform: "scale(1)" },
          "45%":     { transform: "scale(1.15)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%":     { transform: "translateY(-14px) rotate(4deg)" },
        },
        floatUp: {
          "0%":   { opacity: "0.2",  transform: "translateY(0) scale(0.7)" },
          "40%":  { opacity: "0.18" },
          "100%": { opacity: "0",    transform: "translateY(-180px) scale(1.2)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%":     { transform: "rotate(3deg)" },
        },
        gradientshift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        confettiFall: {
          "0%":   { transform: "translateY(-40px) rotate(0deg)",   opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        bounceSelect: {
          "0%":   { transform: "scale(1)" },
          "35%":  { transform: "scale(0.96)" },
          "65%":  { transform: "scale(1.04)" },
          "100%": { transform: "scale(1)" },
        },
        breathe: {
          "0%,100%": { transform: "scale(1)",    boxShadow: "0 0 0 0 rgba(255,209,102,0.0)" },
          "50%":     { transform: "scale(1.03)", boxShadow: "0 0 28px 12px rgba(255,209,102,0.3)" },
        },
        iconPop: {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.22)" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 10px rgba(255,61,127,0.3)" },
          "50%":     { boxShadow: "0 0 28px rgba(255,61,127,0.65)" },
        },
        sparkle: {
          "0%,100%": { opacity: "0.6", transform: "scale(1) rotate(0deg)" },
          "50%":     { opacity: "1",   transform: "scale(1.3) rotate(180deg)" },
        },
      },
      animation: {
        heartbeat:       "heartbeat 1.4s ease-in-out infinite",
        "heartbeat-fast":"heartbeatFast 0.9s ease-in-out infinite",
        float:           "float 4s ease-in-out infinite",
        "float-up":      "floatUp 3s ease-in-out infinite",
        wiggle:          "wiggle 1.8s ease-in-out infinite",
        gradientshift:   "gradientshift 8s ease infinite",
        "fade-in-up":    "fadeInUp 0.55s ease-out forwards",
        confetti:        "confettiFall linear forwards",
        "bounce-select": "bounceSelect 0.32s ease-out",
        breathe:         "breathe 2.6s ease-in-out infinite",
        "icon-pop":      "iconPop 2s ease-in-out infinite",
        "glow-pulse":    "glowPulse 2s ease-in-out infinite",
        sparkle:         "sparkle 2.5s ease-in-out infinite",
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
    },
  },
  plugins: [],
};
