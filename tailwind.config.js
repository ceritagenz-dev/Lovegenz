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
          pink: "#FF3D7F",
          hotpink: "#FF1493",
          red: "#E0115F",
          deepred: "#C2185B",
          cream: "#FFF0F3",
          purple: "#A91079",
          gold: "#FFD166",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        heartbeatFast: {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.25)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        floatUp: {
          "0%": { opacity: "0.3", transform: "translateY(0) scale(0.8)" },
          "40%": { opacity: "0.7" },
          "100%": { opacity: "0", transform: "translateY(-180px) scale(1.1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        gradientshift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-40px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        heartbeat: "heartbeat 1.4s ease-in-out infinite",
        "heartbeat-fast": "heartbeatFast 0.9s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-up": "floatUp 3s ease-in-out infinite",
        wiggle: "wiggle 1.8s ease-in-out infinite",
        gradientshift: "gradientshift 8s ease infinite",
        "fade-in-up": "fadeInUp 0.55s ease-out forwards",
        confetti: "confettiFall linear forwards",
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
    },
  },
  plugins: [],
};
