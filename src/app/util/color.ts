import {
  MaterialDynamicColors,
  argbFromHex,
  Hct,
  SchemeTonalSpot,
} from "@material/material-color-utilities";

export function dynamicColorTest() {
  const isDark = true;
  const contrastLevel = 0;
  const argb = argbFromHex("#2cf2d1");
  const source = Hct.fromInt(argb);
  const dynamicScheme = new SchemeTonalSpot(source, isDark, contrastLevel);
  console.log({ dynamicScheme });
  //   const getDynamicColor = (name: keyof MaterialDynamicColors) => {
  //     const color = dynamicScheme[name];
  //     return color.toHexString();
  //   };
  //   const getDynamicColor = (name: keyof MaterialDynamicColors) => {
  //     const color = dynamicScheme[name];
  //     return color.toHexString();
  //   }

  //   const scheme = {
  //     background: getDynamicColor("background"),
  //     onBackground: getDynamicColor("onBackground"),
  //     surface: getDynamicColor("surface"),
  //     surfaceDim: getDynamicColor("surfaceDim"),
  //     surfaceBright: getDynamicColor("surfaceBright"),
  //     surfaceContainerLowest: getDynamicColor("surfaceContainerLowest"),
  //     surfaceContainerLow: getDynamicColor("surfaceContainerLow"),
  //     surfaceContainer: getDynamicColor("surfaceContainer"),
  //     surfaceContainerHigh: getDynamicColor("surfaceContainerHigh"),
  //     surfaceContainerHighest: getDynamicColor("surfaceContainerHighest"),
  //     onSurface: getDynamicColor("onSurface"),
  //     surfaceVariant: getDynamicColor("surfaceVariant"),
  //     onSurfaceVariant: getDynamicColor("onSurfaceVariant"),
  //     inverseSurface: getDynamicColor("inverseSurface"),
  //     inverseOnSurface: getDynamicColor("inverseOnSurface"),
  //     outline: getDynamicColor("outline"),
  //     outlineVariant: getDynamicColor("outlineVariant"),
  //     shadow: getDynamicColor("shadow"),
  //     scrim: getDynamicColor("scrim"),
  //     surfaceTintColor: getDynamicColor("surfaceTintColor"),
  //     primary: getDynamicColor("primary"),
  //     onPrimary: getDynamicColor("onPrimary"),
  //     primaryContainer: getDynamicColor("primaryContainer"),
  //     onPrimaryContainer: getDynamicColor("onPrimaryContainer"),
  //     inversePrimary: getDynamicColor("inversePrimary"),
  //     inverseOnPrimary: getDynamicColor("inverseOnPrimary"),
  //     secondary: getDynamicColor("secondary"),
  //     secondaryContainer: getDynamicColor("secondaryContainer"),
  //     onSecondaryContainer: getDynamicColor("onSecondaryContainer"),
  //     tertiary: getDynamicColor("tertiary"),
  //     onTertiary: getDynamicColor("onTertiary"),
  //     tertiaryContainer: getDynamicColor("tertiaryContainer"),
  //     onTertiaryContainer: getDynamicColor("onTertiaryContainer"),
  //     error: getDynamicColor("error"),
  //     onError: getDynamicColor("onError"),
  //     errorContainer: getDynamicColor("errorContainer"),
  //     onErrorContainer: getDynamicColor("onErrorContainer"),
  //     primaryFixed: getDynamicColor("primaryFixed"),
  //     primaryFixedDim: getDynamicColor("primaryFixedDim"),
  //     onPrimaryFixed: getDynamicColor("onPrimaryFixed"),
  //     onPrimaryFixedVariant: getDynamicColor("onPrimaryFixedVariant"),
  //     secondaryFixed: getDynamicColor("secondaryFixed"),
  //     secondaryFixedDim: getDynamicColor("secondaryFixedDim"),
  //     onSecondaryFixed: getDynamicColor("onSecondaryFixed"),
  //     onSecondaryFixedVariant: getDynamicColor("onSecondaryFixedVariant"),
  //     tertiaryFixed: getDynamicColor("tertiaryFixed"),
  //     tertiaryFixedDim: getDynamicColor("tertiaryFixedDim"),
  //     onTertiaryFixed: getDynamicColor("onTertiaryFixed"),
  //     onTertiaryFixedVariant: getDynamicColor("onTertiaryFixedVariant"),
  //   };

  //   console.log({ scheme });
}
