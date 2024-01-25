"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
  createMDTheme,
} from "../util/md3";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";

export default function Test() {
  const [color, setColor] = useState("#009FE8");
  const router = useRouter();

  useEffect(() => {
    createMDTheme(color, color);
  }, [color]);

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
      <div>
        {/* <MdSegmentedButtons>
          <MdSegmentedButton>Button 1</MdSegmentedButton>
          <MdSegmentedButton>Button 1</MdSegmentedButton>
          <MdSegmentedButton>Button 1</MdSegmentedButton>
        </MdSegmentedButtons> */}
      </div>
    </div>
  );
}
