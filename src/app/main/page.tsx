"use client";

import { MdTypography } from "../components/typography";
import { MdFilterChip, MdIcon, MdIconButton } from "../util/md3";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridLayout from "react-grid-layout";
import styles from "./main.module.css";
import { useSetRecoilState } from "recoil";
import { currentPathState } from "./store";
import { useEffect, useState } from "react";
import { InputCard, StatisticCard } from "./dashboard/card";
import { cardList, makeCardLayout } from "./util";
//override react grid placeholder background color

export default function MainPage() {
  const setCurrentPath = useSetRecoilState(currentPathState);
  const [customizabled, setCustomizabled] = useState(false);

  const layout = makeCardLayout(cardList);

  //set react grid placeholder background color

  useEffect(() => {
    setCurrentPath(["Dashboard"]);
    const placeholder = document.querySelector(".react-grid-placeholder");
    if (placeholder) {
      placeholder.setAttribute(
        "style",
        "background-color: #F7F2FA; border-radius: 8px; border: 1px solid #E5E5E5"
      );
    }
  }, [setCurrentPath]);

  return (
    <div className="max-w-[1400px] w-full">
      <div className="flex p-6 pb-0 items-center gap-1">
        <MdTypography
          variant="title"
          size="large"
          className="text-primary flex-1"
        >
          Dashboard
        </MdTypography>
        <MdFilterChip
          label="Custom"
          defaultChecked={customizabled}
          onClick={() => {
            setCustomizabled(!customizabled);
          }}
        />
        <MdIconButton className="bg-secondaryContainer rounded-full">
          <MdIcon>
            <SettingsOutlinedIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={4}
        width={1400}
        rowHeight={1}
        margin={[24, 24]}
        isDraggable={customizabled}
        onLayoutChange={(layout) => {
          console.log(layout);
        }}
      >
        <div key="bl_status" className="flex items-center">
          <InputCard
            title="B/L Status"
            description="Enter a B/L number to inquiry the B/L status"
            placeholder="B/L number"
            buttonText="Inquiry"
          />
        </div>
        <div key="surrender_bl" className="flex items-center">
          <InputCard
            title="Surrender B/L"
            description="Enter a B/L number to inquiry the B/L status"
            placeholder="B/L number"
            buttonText="Inquiry"
          />
        </div>
        <div key="demurrage_and_detention" className="flex items-center">
          <InputCard
            title="Demurrage & Detention"
            description="Enter a B/L number to inquiry the B/L status"
            placeholder="B/L number"
            buttonText="Inquiry"
          />
        </div>
        <div key="delivery_order" className="flex items-center">
          <InputCard
            title="Demurrage & Detention"
            description="Enter a B/L number to inquiry the B/L status"
            placeholder="B/L number"
            buttonText="Inquiry"
          />
        </div>
        <div key="booking" className="flex items-center">
          <StatisticCard
            title="Booking"
            data={[
              { key: "Booked", value: 10 },
              { key: "Rejected", value: 10 },
              { key: "Processing", value: 10 },
              { key: "Cancelled", value: 10 },
            ]}
          />
        </div>
        <div key="bl_information" className="flex items-center">
          <StatisticCard
            title="B/L Information"
            data={[
              { key: "Booked", value: 10 },
              { key: "Rejected", value: 10 },
              { key: "Processing", value: 10 },
              { key: "Cancelled", value: 10 },
            ]}
          />
        </div>
        <div key="shipping_instruction" className="flex items-center">
          <StatisticCard
            title="Shipping Instruction"
            data={[
              { key: "Booked", value: 10 },
              { key: "Rejected", value: 10 },
              { key: "Processing", value: 10 },
              { key: "Cancelled", value: 10 },
            ]}
          />
        </div>
      </GridLayout>
    </div>
  );
}
