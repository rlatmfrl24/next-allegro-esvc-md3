"use clinet";

import React from "react";
import { createComponent } from "@lit/react";
import { MdFilledButton as MdFilledButtonWebComponent } from "@material/web/button/filled-button.js";
import { MdElevatedButton as MdElevatedButtonWebComponent } from "@material/web/button/elevated-button.js";
import { MdOutlinedButton as MdOutlinedButtonWebComponent } from "@material/web/button/outlined-button.js";

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
