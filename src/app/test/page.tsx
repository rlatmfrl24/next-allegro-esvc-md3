"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
  createMDTheme,
  applyPresetTheme,
} from "../util/md3";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";
import { dynamicColorTest } from "../util/color";

export default function Test() {
  const [color, setColor] = useState("#009FE8");
  const router = useRouter();

  useEffect(() => {
    createMDTheme(color, color);
  }, [color]);

  function HexTest() {
    const [color, setColor] = useState("#009FE8");

    return (
      <div>
        <input
          type="text"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
          className="border"
        />
        <button className="border" onClick={() => createMDTheme(color, color)}>
          Apply
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <MdFilledButton
        onClick={() => {
          router.push("/");
        }}
      >
        Go to Main
      </MdFilledButton>

      <HexColorPicker color={color} onChange={setColor} />

      <HexTest />
      <div className="flex gap-4">
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
      </div>

      <div className="flex gap-2">
        <MdFilledButton className="font-suit">Click me</MdFilledButton>
        <MdElevationButton className="font-suit">Click me</MdElevationButton>
        <MdOutlinedButton className="font-suit">Click me</MdOutlinedButton>
        <MdTextButton className="font-suit">Click me</MdTextButton>
      </div>
      <div className="flex gap-2 font-pretendard font-bold">
        <MdOutlinedTextField label="Label" className="h-fit" />
        <MdOutlinedTextField label="Label" className="h-fit" disabled />
        <MdOutlinedTextField label="Label" className="h-fit" error />
        <MdOutlinedTextField
          label="Label"
          className="h-fit"
          supportingText="Required"
        />
        <MdOutlinedTextField
          label="Label"
          className="h-fit"
          prefixText="US"
          suffixText="USD"
        />
      </div>

      <div className="flex gap-2">
        <button
          className="bg-[#004aae] px-4 py-2 text-white font-suit rounded-xl"
          onClick={() => {
            applyPresetTheme("preset_1");
          }}
        >
          Preset 1
        </button>
        <button
          className="bg-[#2a6c00] px-4 py-2 text-white font-suit rounded-xl"
          onClick={() => {
            applyPresetTheme("preset_2");
          }}
        >
          Preset 2
        </button>
        <button
          className="bg-[#8b4a61] px-4 py-2 text-white font-suit rounded-xl"
          onClick={() => {
            applyPresetTheme("preset_3");
          }}
        >
          Preset 3
        </button>
        <MdElevationButton
          onClick={() => {
            dynamicColorTest();
          }}
        >
          Dynamic Test
        </MdElevationButton>
      </div>
    </div>
  );
}
