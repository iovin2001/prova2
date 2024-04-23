import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: "#b29155",
        black: "#151515",
        grey: "#282828",
        white: "#ffffff",
        red: "#ff0033",
        green: "#198754",
        ivory: "#e8e0dd",
        pastelBlack: "#2b2929",
        orange: "#d77769",
        yellow: "#e1aa0e",
        rose: "#c06052",
        blue: "#4CA2FF",
        buttonblue: "#99caff"
      },
      fontFamily: {
        heading: ["RocGrotesk", "monospace"],
        reddit: ["HeadingNow"],
        sub: ["Inter", "serif"],
        hindi: ["Tiro Devanagari Hindi"],
        space: ["Space Grotesk"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "3.560rem",
        banner: "5.560rem",
      },
      backdropBlur: {
        lg: "200px",
      },
    },
  }, plugins: [],
}
export default config
