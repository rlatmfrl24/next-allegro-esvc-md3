import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        suit: ["var(--font-suit)"],
        pretendard: ["var(--font-pretendard)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        primary: "var(--md-sys-color-primary)",
        onPrimary: "var(--md-sys-color-on-primary)",
        primaryContainer: "var(--md-sys-color-primary-container)",
        onPrimaryContainer: "var(--md-sys-color-on-primary-container)",
        secondary: "var(--md-sys-color-secondary)",
        onSecondary: "var(--md-sys-color-on-secondary)",
        secondaryContainer: "var(--md-sys-color-secondary-container)",
        onSecondaryContainer: "var(--md-sys-color-on-secondary-container)",
        tertiary: "var(--md-sys-color-tertiary)",
        onTertiary: "var(--md-sys-color-on-tertiary)",
        tertiaryContainer: "var(--md-sys-color-tertiary-container)",
        onTertiaryContainer: "var(--md-sys-color-on-tertiary-container)",
        error: "var(--md-sys-color-error)",
        onError: "var(--md-sys-color-on-error)",
        errorContainer: "var(--md-sys-color-error-container)",
        onErrorContainer: "var(--md-sys-color-on-error-container)",
        background: "var(--md-sys-color-background)",
        onBackground: "var(--md-sys-color-on-background)",
        outline: "var(--md-sys-color-outline)",
        outlineVariant: "var(--md-sys-color-outline-variant)",
        shadow: "var(--md-sys-color-shadow)",
        scrim: "var(--md-sys-color-scrim)",
        inverserSurface: "var(--md-sys-color-inverse-surface)",
        inverseOnSurface: "var(--md-sys-color-inverse-on-surface)",
        inversePrimary: "var(--md-sys-color-inverse-primary)",

        primaryFixed: "var(--md-sys-color-primary-fixed)",
        onPrimaryFixed: "var(--md-sys-color-on-primary-fixed)",
        primaryFixedDim: "var(--md-sys-color-primary-fixed-dim)",
        onPrimaryFixedVariant: "var(--md-sys-color-on-primary-fixed-variant)",
        secondaryFixed: "var(--md-sys-color-secondary-fixed)",
        onSecondaryFixed: "var(--m3-sys-light-on-secondary-fixed)",
        secondaryFixedDim: "var(--md-sys-color-secondary-fixed-dim)",
        onSecondaryFixedVariant:
          "var(--md-sys-color-on-secondary-fixed-variant)",
        tertiaryFixed: "var(--md-sys-color-tertiary-fixed)",
        onTertiaryFixed: "var(--md-sys-color-on-tertiary-fixed)",
        tertiaryFixedDim: "var(--md-sys-color-tertiary-fixed-dim)",
        onTertiaryFixedVariant: "var(--md-sys-color-on-tertiary-fixed-variant)",

        surface: "var(--md-sys-color-surface)",
        onSurface: "var(--md-sys-color-on-surface)",
        surfaceVariant: "var(--md-sys-color-surface-variant)",
        onSurfaceVariant: "var(--md-sys-color-on-surface-variant)",
        surfaceDim: "var(--md-sys-color-surface-dim)",
        surfaceBright: "var(--md-sys-color-surface-bright)",
        surfaceContainer: "var(--md-sys-color-surface-container)",
        surfaceContainerLowest: "var(--md-sys-color-surface-container-lowest)",
        surfaceContainerLow: "var(--md-sys-color-surface-container-low)",
        surfaceContainerHigh: "var(--md-sys-color-surface-container-high)",
        surfaceContainerHighest:
          "var(--md-sys-color-surface-container-highest)",

        extendGoodContainer: "#B4F1BD",
        extendOnGoodContainer: "#00210B",
        extendPendingContainer: "#FCE186",
        extendOnPendingContainer: "#231B00",

        pointColor: "var(--md-sys-point-color)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
