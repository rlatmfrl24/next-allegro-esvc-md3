"use client";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";
import { useMemo, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styles from "@/app/styles/base.module.css";
import EmptyResultPlaceholder from "../empty-placeholder";
import { Download } from "@mui/icons-material";
import LongRangeTable from "./table";
import { createDummyLongRangeSchedules } from "../util";
import { LongRangeSearchConditionType } from "@/app/util/typeDef";
import NAOutlinedSelect from "@/app/components/na-outlined-select";
import ServiceLaneSelector from "./service-lane-selector";

export default function LongRangeSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [errorState, setErrorState] = useState<"from" | "to" | null>(null);
  const [searchCondition, setSearchCondition] =
    useState<LongRangeSearchConditionType>({
      continentFrom: "",
      continentTo: "",
    });

  const hasDeparture = false;
  const { schedules, portList } = useMemo(
    () => createDummyLongRangeSchedules(hasDeparture),
    [hasDeparture]
  );

  function checkValidAndSearch() {
    if (searchCondition.continentFrom === "") {
      setErrorState("from");
      return;
    }
    if (searchCondition.continentTo === "") {
      setErrorState("to");
      return;
    }

    if (
      searchCondition.continentFrom !== "" &&
      searchCondition.continentTo !== ""
    ) {
      setErrorState(null);
      setPageState("search");
    }
  }

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
        <div className="flex gap-4">
          <NAOutlinedSelect
            required
            error={errorState === "from"}
            errorText="Please select continent"
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
          </NAOutlinedSelect>
          <NAOutlinedSelect
            required
            error={errorState === "to"}
            errorText="Please select continent"
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
          </NAOutlinedSelect>
          <MdOutlinedButton className="h-fit mt-2">
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
              checkValidAndSearch();
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
      {pageState === "unsearch" ? (
        <EmptyResultPlaceholder />
      ) : (
        <div className="bg-surface rounded-2xl flex flex-col relative overflow-hidden">
          <ServiceLaneSelector />
          <div className="p-6">
            <div className="flex gap-4 items-center justify-end mb-2">
              <MdTypography
                variant="label"
                size="large"
                className="text-outline"
              >
                Total: {schedules.length}
              </MdTypography>
              <MdTextButton>
                <MdIcon slot="icon">
                  <Download fontSize="small" />
                </MdIcon>
                Download
              </MdTextButton>
            </div>
            <LongRangeTable
              schedules={schedules}
              hasDeparture={hasDeparture}
              portList={portList}
            />
          </div>
        </div>
      )}
    </div>
  );
}
