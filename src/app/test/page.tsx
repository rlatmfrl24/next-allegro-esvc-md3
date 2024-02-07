"use client";

import {
  MdElevatedCard,
  MdElevationButton,
  MdFilledButton,
  MdFilledCard,
  MdIcon,
  MdNavigationBar,
  MdNavigationDrawer,
  MdNavigationTab,
  MdOutlinedButton,
  MdOutlinedCard,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
  MdRippleEffect,
  MdTextButton,
} from "../util/md3";
import { createMDTheme, applyPresetTheme } from "../util/theme";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  MdSegmentedButton,
  MdSegmentedButtons,
} from "../components/segmented-button";

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
          onChange={(e) => {
            setColor(e.target.value);
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
        <p className="flex flex-col font-pretendard text-4xl">
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
        <MdFilledButton>Click me</MdFilledButton>
        <MdElevationButton>Click me</MdElevationButton>
        <MdOutlinedButton>Click me</MdOutlinedButton>
        <MdTextButton>Click me</MdTextButton>
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
      <div className="flex gap-2 mt-4">
        <MdElevatedCard className=" w-48 h-24 flex justify-center items-center">
          Elevated Card
        </MdElevatedCard>
        <MdFilledCard className="w-48 h-24 flex justify-center items-center">
          Filled Card
        </MdFilledCard>
        <MdOutlinedCard className="w-48 h-24 flex justify-center items-center">
          Outlined Card
        </MdOutlinedCard>
      </div>
      <div className="flex gap-2 mt-4">
        <MdNavigationBar activeIndex={1} hideInactiveLabels>
          <MdNavigationTab label="Calendar" showBadge badgeValue="4">
            <MdIcon slot="active-icon">
              <CalendarTodayIcon />
            </MdIcon>
            <MdIcon slot="inactive-icon">
              <CalendarTodayOutlinedIcon />
            </MdIcon>
          </MdNavigationTab>
          <MdNavigationTab label="User" showBadge>
            <MdIcon slot="active-icon">
              <AccountCircleIcon />
            </MdIcon>
            <MdIcon slot="inactive-icon">
              <AccountCircleOutlinedIcon />
            </MdIcon>
          </MdNavigationTab>
          <MdNavigationTab label="Setting">
            <MdIcon slot="active-icon">
              <SettingsIcon />
            </MdIcon>
            <MdIcon slot="inactive-icon">
              <SettingsOutlinedIcon />
            </MdIcon>
          </MdNavigationTab>
        </MdNavigationBar>
      </div>
      <div className="flex gap-2 mt-4">
        <MdOutlinedSegmentedButtonSet className="flex-1">
          <MdOutlinedSegmentedButton label="111"></MdOutlinedSegmentedButton>
          <MdOutlinedSegmentedButton label="222"></MdOutlinedSegmentedButton>
          <MdOutlinedSegmentedButton label="333"></MdOutlinedSegmentedButton>
          <MdOutlinedSegmentedButton
            label="444"
            disabled
          ></MdOutlinedSegmentedButton>
        </MdOutlinedSegmentedButtonSet>
      </div>
      <div className="flex gap-2 mt-4 ">
        <MdSegmentedButtons value="111" className="flex-1">
          <MdSegmentedButton id="111">111</MdSegmentedButton>
          <MdSegmentedButton id="222">222</MdSegmentedButton>
          <MdSegmentedButton id="333">333</MdSegmentedButton>
          <MdSegmentedButton id="444" disabled>
            444
          </MdSegmentedButton>
        </MdSegmentedButtons>
      </div>
    </div>
  );
}
