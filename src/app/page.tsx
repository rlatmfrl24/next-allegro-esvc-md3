"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
} from "./util/md3";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex  gap-1">
        <p className="flex flex-col">
          <span className="font-pretendard text-4xl font-thin">Booking</span>
          <span className="font-pretendard text-4xl font-light">Booking</span>
          <span className="font-pretendard text-4xl ">Booking</span>
          <span className="font-pretendard text-4xl font-semibold">
            Booking
          </span>
          <span className="font-pretendard text-4xl font-bold">Booking</span>
          <span className="font-pretendard text-4xl font-extrabold">
            Booking
          </span>
          <span className="font-pretendard text-4xl  font-black">Booking</span>
        </p>
        <p className="flex flex-col">
          <span className="font-suit text-4xl font-thin">Booking</span>
          <span className="font-suit text-4xl font-light">Booking</span>
          <span className="font-suit text-4xl ">Booking</span>
          <span className="font-suit text-4xl font-semibold">Booking</span>
          <span className="font-suit text-4xl font-bold">Booking</span>
          <span className="font-suit text-4xl font-extrabold">Booking</span>
          <span className="font-suit text-4xl  font-black">Booking</span>
        </p>

        <div className="flex gap-1 h-fit">
          <MdFilledButton className="font-suit">Click me</MdFilledButton>
          <MdElevationButton className="font-suit">Click me</MdElevationButton>
          <MdOutlinedButton className="font-suit">Click me</MdOutlinedButton>
        </div>
      </div>
    </main>
  );
}
