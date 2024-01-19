"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
} from "../util/md3";
import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from "@material/material-color-utilities";

export default function Test() {
  function createTheme() {
    const theme = themeFromSourceColor(argbFromHex("#120891"), []);
    console.log(JSON.stringify(theme, null, 2));

    // Check if the user has dark mode turned on
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Apply the theme to the body by updating custom properties for material tokens
    applyTheme(theme, { target: document.body, dark: systemDark });
  }

  return (
    <div className="flex gap-1 p-2">
      <p className="flex flex-col font-suit text-4xl">
        <span className="font-thin">Booking</span>
        <span className="font-light">Booking</span>
        <span>Booking</span>
        <span className="font-semibold">Booking</span>
        <span className="font-bold">Booking</span>
        <span className="font-extrabold">Booking</span>
        <span className="font-black">Booking</span>
      </p>
      <p className="flex flex-col font-pretendard text-4xl">
        <span className="font-thin">Booking</span>
        <span className="font-light">Booking</span>
        <span>Booking</span>
        <span className="font-semibold">Booking</span>
        <span className="font-bold">Booking</span>
        <span className="font-extrabold">Booking</span>
        <span className="font-black">Booking</span>
      </p>

      <div className="flex gap-1 h-fit">
        <MdFilledButton
          className="font-suit"
          onClick={() => {
            createTheme();
          }}
        >
          Click me
        </MdFilledButton>
        <MdElevationButton className="font-suit">Click me</MdElevationButton>
        <MdOutlinedButton className="font-suit">Click me</MdOutlinedButton>
      </div>
    </div>
  );
}
