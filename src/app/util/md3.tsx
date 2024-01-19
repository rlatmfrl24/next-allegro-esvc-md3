"use clinet";

import React from "react";
import { createComponent } from "@lit/react";
import { MdRipple } from "@material/web/ripple/ripple.js";
import { MdFilledButton as MdFilledButtonWebComponent } from "@material/web/button/filled-button.js";
import { MdElevatedButton as MdElevatedButtonWebComponent } from "@material/web/button/elevated-button.js";
import { MdOutlinedButton as MdOutlinedButtonWebComponent } from "@material/web/button/outlined-button.js";
import { MdTextButton as MdTextButtonWebComponent } from "@material/web/button/text-button.js";

import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities";

export const MdRippleEffect = createComponent({
  tagName: "md-ripple",
  elementClass: MdRipple,
  react: React,
});

export const MdFilledButton = createComponent({
  tagName: "md-filled-button",
  elementClass: MdFilledButtonWebComponent,
  react: React,
});

export const MdElevationButton = createComponent({
  tagName: "md-elevated-button",
  elementClass: MdElevatedButtonWebComponent,
  react: React,
});

export const MdOutlinedButton = createComponent({
  tagName: "md-outlined-button",
  elementClass: MdOutlinedButtonWebComponent,
  react: React,
});

export const MdTextButton = createComponent({
  tagName: "md-text-button",
  elementClass: MdTextButtonWebComponent,
  react: React,
});

export function createMDTheme(
  sourceColor: string,
  pointColor: string,
  isContainDarkMode?: boolean
) {
  const theme = themeFromSourceColor(argbFromHex(sourceColor), [
    {
      name: "point",
      value: argbFromHex(pointColor),
      blend: true,
    },
  ]);
  console.log(JSON.stringify(theme, null, 2));

  // Check if the user has dark mode turned on
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply the theme to the body by updating custom properties for material tokens
  if (isContainDarkMode !== undefined && isContainDarkMode === true) {
    applyTheme(theme, { target: document.body, dark: systemDark });
  } else {
    applyTheme(theme, { target: document.body });
  }
}
