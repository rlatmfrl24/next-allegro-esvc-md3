"use clinet";

import React from "react";
import { createComponent } from "@lit/react";
import { MdRipple } from "@material/web/ripple/ripple.js";
import { MdFilledButton as MdFilledButtonWebComponent } from "@material/web/button/filled-button.js";
import { MdElevatedButton as MdElevatedButtonWebComponent } from "@material/web/button/elevated-button.js";
import { MdOutlinedButton as MdOutlinedButtonWebComponent } from "@material/web/button/outlined-button.js";
import { MdTextButton as MdTextButtonWebComponent } from "@material/web/button/text-button.js";
import { MdOutlinedTextField as MdOutlinedTextFieldWebComponent } from "@material/web/textfield/outlined-text-field.js";
import { MdIcon as MdIconWebComponent } from "@material/web/icon/icon";
import { MdIconButton as MdIconButtonWebComponent } from "@material/web/iconbutton/icon-button";
import { MdElevation as MdElevationWebComponent } from "@material/web/elevation/elevation";
import { MdCheckbox as MdCheckboxWebComponent } from "@material/web/checkbox/checkbox";

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

export const MdOutlinedTextField = createComponent({
  tagName: "md-outlined-text-field",
  elementClass: MdOutlinedTextFieldWebComponent,
  react: React,
  // events: {
  //   onChange: "change",
  //   onInput: "input",
  //   onClose: "close",
  //   onClosed: "closed",
  //   onOpen: "open",
  //   onOpened: "opened",
  // },
});

export const MdCheckbox = createComponent({
  tagName: "md-checkbox",
  elementClass: MdCheckboxWebComponent,
  react: React,
});

export const MdIcon = createComponent({
  tagName: "md-icon",
  elementClass: MdIconWebComponent,
  react: React,
});

export const MdIconButton = createComponent({
  tagName: "md-icon-button",
  elementClass: MdIconButtonWebComponent,
  react: React,
});

export const MdElevation = createComponent({
  tagName: "md-elevation",
  elementClass: MdElevationWebComponent,
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
