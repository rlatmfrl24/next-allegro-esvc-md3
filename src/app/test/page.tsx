"use client";

import {
  MdChipSet,
  MdCircularProgress,
  MdFilledButton,
  MdInputChip,
} from "../util/md3";
import { createMDTheme, applyPresetTheme } from "../util/theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";

import CommodityAutoComplete from "../main/booking/request/components/commodity-search";
import { faker } from "@faker-js/faker";
import NAMultiAutoComplete from "../components/na-multi-autocomplete";
import EmptyResultPlaceholder from "../components/empty-placeholder";
import { DatePicker } from "../components/datepickers/date-picker";
import { DateRangePicker } from "../components/datepickers/date-range-picker";

export default function Test() {
  const [color, setColor] = useState("#009FE8");
  const router = useRouter();

  useEffect(() => {
    createMDTheme(color);
  }, [color]);

  const options = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      code: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    }));
  }, []);

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
    <div className="flex flex-1 flex-col gap-2 p-2 overflow-auto h-full">
      <MdFilledButton
        onClick={() => {
          router.push("/");
        }}
      >
        Go to Main
      </MdFilledButton>
      <div className="flex gap-2 justify-center">
        <EmptyResultPlaceholder className="w-full" text="No Data Found." />
      </div>

      <div className="h-fit">
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <HexTest />
      <div className="flex gap-2">
        <DatePicker />
        <DateRangePicker />
        <DateRangePicker buttonMode="before" />
        <DateRangePicker buttonMode="after" />
      </div>

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

      <div className="flex gap-2">
        <NAMultiAutoComplete
          itemList={options}
          onItemSelection={(value) => {
            console.log(value);
          }}
          recentCookieKey="test-recent"
          isAllowOnlyListItems={false}
        />
        <CommodityAutoComplete />
        <MdFilledButton
          onClick={() => {
            document.cookie = "test-recent=";
          }}
        >
          Clear Cookie
        </MdFilledButton>
      </div>
      <div className="flex gap-2">
        <MdCircularProgress indeterminate />
        <MdCircularProgress value={0.3} />
        <MdCircularProgress value={0.6} />
        <MdCircularProgress value={0.9} />
      </div>
    </div>
  );
}
