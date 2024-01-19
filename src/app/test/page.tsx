"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
  MdRippleEffect,
  MdTextButton,
  createMDTheme,
} from "../util/md3";

export default function Test() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex">
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

      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2">
          <MdFilledButton
            className="font-suit text-secondary"
            onClick={() => {
              createMDTheme("#f44336", "#298189");
            }}
          >
            Click me
          </MdFilledButton>
          <MdElevationButton className="font-suit">Click me</MdElevationButton>
          <MdOutlinedButton className="font-suit">Click me</MdOutlinedButton>
          <MdTextButton className="font-suit">Click me</MdTextButton>
        </div>
      </div>
    </div>
  );
}
