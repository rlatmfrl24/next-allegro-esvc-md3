import {
  Theme,
  applyTheme,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";

// custom theme
import defaultTheme from "@/../public/preset/default.json";
import preset_1 from "@/../public/preset/preset_1.json";
import preset_2 from "@/../public/preset/preset_2.json";
import preset_3 from "@/../public/preset/preset_3.json";
import YGTheme from "@/../public/preset/palette/YG.json";
import RETheme from "@/../public/preset/palette/RE.json";
import BLTheme from "@/../public/preset/palette/BL.json";
import GRTheme from "@/../public/preset/palette/GR.json";
import NATheme from "@/../public/preset/palette/NA.json";
import ORTheme from "@/../public/preset/palette/OR.json";
import PKTheme from "@/../public/preset/palette/PK.json";
import PUTheme from "@/../public/preset/palette/PU.json";

export function createMDTheme(
  sourceColor: string,
  isContainDarkMode?: boolean
) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor));
  // console.log(JSON.stringify(theme, null, 2));

  // Check if the user has dark mode turned on
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply the theme to the body by updating custom properties for material tokens
  if (isContainDarkMode !== undefined && isContainDarkMode === true) {
    applyTheme(theme, { target: document.body, dark: systemDark });
    applySurfaceStyles(theme, { dark: systemDark });
    applyFixedStyles(theme);
  } else {
    applyTheme(theme, { target: document.body });
    applySurfaceStyles(theme, { dark: false });
    applyFixedStyles(theme);
  }
}

export function applySurfaceStyles(
  theme: Theme,
  { dark }: { dark: boolean }
): void {
  if (dark) {
    const elevationProps = {
      "--md-sys-color-surface-dim": theme.palettes.neutral.tone(6),
      "--md-sys-color-surface-bright": theme.palettes.neutral.tone(24),
      "--md-sys-color-surface-container-lowest": theme.palettes.neutral.tone(4),
      "--md-sys-color-surface-container-low": theme.palettes.neutral.tone(10),
      "--md-sys-color-surface-container": theme.palettes.neutral.tone(12),
      "--md-sys-color-surface-container-high": theme.palettes.neutral.tone(17),
      "--md-sys-color-surface-container-highest":
        theme.palettes.neutral.tone(22),
    };

    for (const [property, argbColor] of Object.entries(elevationProps)) {
      document.body.style.setProperty(property, hexFromArgb(argbColor));
    }
  } else {
    const elevationProps = {
      "--md-sys-color-surface-dim": theme.palettes.neutral.tone(87),
      "--md-sys-color-surface-bright": theme.palettes.neutral.tone(98),
      "--md-sys-color-surface-container-lowest":
        theme.palettes.neutral.tone(100),
      "--md-sys-color-surface-container-low": theme.palettes.neutral.tone(96),
      "--md-sys-color-surface-container": theme.palettes.neutral.tone(94),
      "--md-sys-color-surface-container-high": theme.palettes.neutral.tone(92),
      "--md-sys-color-surface-container-highest":
        theme.palettes.neutral.tone(90),
    };

    for (const [property, argbColor] of Object.entries(elevationProps)) {
      document.body.style.setProperty(property, hexFromArgb(argbColor));
    }
  }
}

export function applyFixedStyles(theme: Theme): void {
  const elevationProps = {
    "--md-sys-color-primary-fixed": theme.palettes.primary.tone(90),
    "--md-sys-color-primary-fixed-dim": theme.palettes.primary.tone(80),
    "--md-sys-color-on-primary-fixed": theme.palettes.primary.tone(10),
    "--md-sys-color-on-primary-fixed-variant": theme.palettes.primary.tone(30),
    "--md-sys-color-secondary-fixed": theme.palettes.secondary.tone(90),
    "--md-sys-color-secondary-fixed- dim": theme.palettes.secondary.tone(80),
    "--md-sys-color-on-secondary-fixed": theme.palettes.secondary.tone(10),
    "--md-sys-color-on-secondary-fixed-variant":
      theme.palettes.secondary.tone(30),
    "--md-sys-color-tertiary-fixed": theme.palettes.tertiary.tone(90),
    "--md-sys-color-tertiary-fixed-dim": theme.palettes.tertiary.tone(80),
    "--md-sys-color-on-tertiary-fixed": theme.palettes.tertiary.tone(10),
    "--md-sys-color-on-tertiary-fixed-variant":
      theme.palettes.tertiary.tone(30),
  };

  for (const [property, argbColor] of Object.entries(elevationProps)) {
    document.body.style.setProperty(property, hexFromArgb(argbColor));
  }
}

export function addCustomThemeToken(token: string, color: string) {
  document.body.style.setProperty(token, color);
}

export function applyPointColor(color: string) {
  document.body.style.setProperty("--md-sys-point-color", color);
}

export function applyPresetTheme(
  presetName: string,
  isDarkMode?: boolean,
  afterApply?: () => void
) {
  let css = {};
  switch (presetName) {
    case "preset_1":
      css = preset_1;
      break;
    case "preset_2":
      css = preset_2;
      break;
    case "preset_3":
      css = preset_3;
      break;
    case "YG":
      css = YGTheme;
      break;
    case "RE":
      css = RETheme;
      break;
    case "BL":
      css = BLTheme;
      break;
    case "GR":
      css = GRTheme;
      break;
    case "NA":
      css = NATheme;
      break;
    case "OR":
      css = ORTheme;
      break;
    case "PK":
      css = PKTheme;
      break;
    case "PU":
      css = PUTheme;
      break;

    default:
      css = defaultTheme;
      break;
  }

  const target = document.body;
  const theme = JSON.parse(JSON.stringify(css));

  // Apply the theme to the body by updating custom properties for material tokens

  Object.keys(theme).forEach((key) => {
    const isDark = isDarkMode !== undefined && isDarkMode === true;
    const isDarkKey = key.includes("--m3-sys-dark-");
    const isLightKey = key.includes("--m3-sys-light-");

    if (key.includes("--m3-state-layers-")) {
      //ignore
      return;
    } else {
      if ((isDark && isDarkKey) || (!isDark && isLightKey)) {
        const token = key
          .replace(isDark ? "--m3-sys-dark-" : "--m3-sys-light-", "")
          .toLowerCase();
        target.style.setProperty(`--md-sys-color-${token}`, theme[key]);
      } else if (!(isDark && isLightKey) && !(!isDark && isDarkKey)) {
        target.style.setProperty(key, theme[key]);
      }
    }
    if (key === "--m3-point-color") {
      console.log("point color", theme[key]);
      target.style.setProperty("--md-sys-point-color", theme[key]);
    }
  });

  if (afterApply) {
    afterApply();
  }

  // target.style.setProperty(key, theme[key]);
  // if (key.includes("--m3-sys-light-")) {
  //   const token = key.replace("--m3-sys-light-", "").toLowerCase();
  //   target.style.setProperty(`--md-sys-color-${token}`, theme[key]);
  // }
}
