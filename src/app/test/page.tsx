"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
} from "../util/md3";

export default function Test() {
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
        <MdFilledButton className="font-suit">Click me</MdFilledButton>
        <MdElevationButton className="font-suit">Click me</MdElevationButton>
        <MdOutlinedButton className="font-suit">Click me</MdOutlinedButton>
      </div>
    </div>
  );
}
