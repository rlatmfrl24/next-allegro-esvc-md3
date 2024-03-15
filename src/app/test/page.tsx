"use client";

import { MdFilledButton } from "../util/md3";
import { createMDTheme, applyPresetTheme } from "../util/theme";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";

export default function Test() {
  const [color, setColor] = useState("#009FE8");
  const router = useRouter();

  useEffect(() => {
    createMDTheme(color);
  }, [color]);

  function HexTest() {
    const [color, setColor] = useState("#009FE8");

    return (
      <div>
        <input
          type="text"
          value={color}
          onClick={(e) => {
            setColor((e.target as HTMLInputElement).value);
          }}
          className="border"
        />
        <button className="border" onClick={() => createMDTheme(color)}>
          Apply
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-2 p-2 overflow-auto">
      <MdFilledButton
        onClick={() => {
          router.push("/");
        }}
      >
        Go to Main
      </MdFilledButton>
      <div className="h-fit">
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <HexTest />

      <div className="flex gap-2">
        <button
          className="bg-[#004aae] px-4 py-2 text-white font-pretendard rounded-xl"
          onClick={() => {
            applyPresetTheme("preset_1");
          }}
        >
          Preset 1
        </button>
        <button
          className="bg-[#2a6c00] px-4 py-2 text-white font-pretendard rounded-xl"
          onClick={() => {
            applyPresetTheme("preset_2");
          }}
        >
          Preset 2
        </button>
        <button
          className="bg-[#8b4a61] px-4 py-2 text-white font-pretendard rounded-xl"
          onClick={() => {
            applyPresetTheme("preset_3");
          }}
        >
          Preset 3
        </button>
      </div>
    </div>
  );
}
