import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // ─── shadcn tokens (preservados para o admin e componentes shadcn) ────
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ─── Brand tokens (docs/brand/paleta.md) ───────────────────────────
        navy: {
          900: "#070E18",
          800: "#0C1829",
          700: "#12253D",
          600: "#1B3558",
          500: "#2A4F7A",
        },
        teal: {
          600: "#007A5A",
          500: "#009B72",
          400: "#00B886",
          300: "#2BD9A5",
          200: "#83EDD0",
          100: "#D5FAF0",
        },
        amber: {
          600: "#A06400",
          500: "#C77E00",
          400: "#E99B13",
          300: "#F5B740",
          200: "#FCD680",
          100: "#FFF2D6",
        },
        sand: "#F4F1EC",
        site: {
          white: "#FDFCFA",
          text: "#0B1422",
          "text-mid": "#3D4F62",
          "text-light": "#7A8DA0",
        },
        // Cores das tags da RegulatoryBar
        regulatory: {
          bncc: "#60A5FA",
          cne1: "#34D399",
          pned: "#A78BFA",
          cne2: "#FBBF24",
          eca: "#FB7185",
        },
      },
      borderRadius: {
        // shadcn
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // brand
        card: "16px",
        btn: "9px",
        pill: "100px",
      },
      fontFamily: {
        // shadcn usa `font-sans` por padrão → mapeado para DM Sans (corpo)
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Brand tokens
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        // Para hero e H2 do brand
        tightest: "-0.04em",
        tighter: "-0.03em",
        // Eyebrows uppercase
        eyebrow: "0.15em",
        regulatory: "0.14em",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
