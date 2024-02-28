"use client";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styles from "@/app/styles/base.module.css";
import EmptyResultPlaceholder from "../empty-placeholder";

type LongRangeSearchConditionType = {
  continentFrom: string;
  continentTo: string;
};

export default function LongRangeSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [searchCondition, setSearchCondition] =
    useState<LongRangeSearchConditionType>({
      continentFrom: "",
      continentTo: "",
    });

  return (
    <div
      aria-label="container"
      className="max-w-[1400px] w-full m-6 flex flex-col gap-4 "
    >
      <div
        aria-label="page-title"
        className="flex justify-start items-center gap-3"
      >
        <MdTypography variant="title" size="large">
          Long Range Schedule
        </MdTypography>
        <MdIconButton>
          <MdIcon>
            <FavoriteBorderIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <div className={styles.area} aria-label="search-condition-area">
        <div className="flex items-center gap-4">
          <MdOutlinedSelect
            aria-label="continent-from-select"
            label="Continent From"
            className="w-80"
            onchange={(e) => {
              const target = e.target as HTMLSelectElement;
              setSearchCondition((prev) => ({
                ...prev,
                continentFrom: target.value,
              }));
            }}
          >
            <MdIcon slot="leading-icon">
              <PlaceOutlinedIcon />
            </MdIcon>
            <MdSelectOption value="asia">Asia</MdSelectOption>
            <MdSelectOption value="europe">Europe</MdSelectOption>
            <MdSelectOption value="north-america">North America</MdSelectOption>
            <MdSelectOption value="south-america">South America</MdSelectOption>
            <MdSelectOption value="africa">Africa</MdSelectOption>
            <MdSelectOption value="oceania">Oceania</MdSelectOption>
          </MdOutlinedSelect>
          <MdOutlinedSelect
            aria-label="continent-to-select"
            label="Continent To"
            className="w-80"
            onchange={(e) => {
              const target = e.target as HTMLSelectElement;
              setSearchCondition((prev) => ({
                ...prev,
                continentTo: target.value,
              }));
            }}
          >
            <MdIcon slot="leading-icon">
              <PlaceOutlinedIcon />
            </MdIcon>
            <MdSelectOption value="asia">Asia</MdSelectOption>
            <MdSelectOption value="europe">Europe</MdSelectOption>
            <MdSelectOption value="north-america">North America</MdSelectOption>
            <MdSelectOption value="south-america">South America</MdSelectOption>
            <MdSelectOption value="africa">Africa</MdSelectOption>
            <MdSelectOption value="oceania">Oceania</MdSelectOption>
          </MdOutlinedSelect>
          <MdOutlinedButton className="h-fit">
            <MdIcon slot="icon">
              <AddOutlinedIcon fontSize="small" />
            </MdIcon>
            Add Mailing
          </MdOutlinedButton>
        </div>
        <div className="flex gap-2 justify-end">
          <MdTextButton
            onClick={() => {
              setPageState("unsearch");

              setSearchCondition({
                continentFrom: "",
                continentTo: "",
              });

              const continentFrom = document.querySelector(
                'md-outlined-select[aria-label="continent-from-select"]'
              ) as any;
              continentFrom.reset();

              const continentTo = document.querySelector(
                'md-outlined-select[aria-label="continent-to-select"]'
              ) as any;
              continentTo.reset();
            }}
          >
            Reset
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              setPageState("search");
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
      {pageState === "unsearch" ? (
        <EmptyResultPlaceholder />
      ) : (
        <div className={styles.area}>Search Result</div>
      )}
    </div>
  );
}
