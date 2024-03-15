"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Download } from "@mui/icons-material";
import { faker } from "@faker-js/faker";

import NAOutlinedSelect from "@/app/components/na-outlined-select";
import styles from "@/app/styles/base.module.css";
import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";

import EmptyResultPlaceholder from "../../../components/empty-placeholder";
import ServiceLaneSelector from "./service-lane-selector";
import LongRangeTable from "./table";
import { createDummyLongRangeSchedules } from "../util";
import PageTitle from "@/app/components/page-title";
import { LongRangeSearchConditionType } from "@/app/util/typeDef/schedule";

export default function LongRangeSchedule() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [errorState, setErrorState] = useState<"from" | "to" | null>(null);
  const [searchCondition, setSearchCondition] =
    useState<LongRangeSearchConditionType>({
      continentFrom: "",
      continentTo: "",
    });

  const hasDeparture = true;
  const [schedules, setSchedules] = useState<any[]>([]);
  const [portList, setPortList] = useState<any[]>([]);

  const serviceLaneItems = useMemo(
    () =>
      Array.from({ length: 30 }, () =>
        faker.string.alphanumeric(4).toUpperCase()
      ),
    []
  );
  const [selectedServiceLane, setSelectedServiceLane] = useState<string>("");

  const createDummyData = useCallback(() => {
    const { schedules, portList } = createDummyLongRangeSchedules(hasDeparture);
    setSchedules(schedules);
    setPortList(portList);
  }, [hasDeparture]);

  useEffect(() => {
    createDummyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServiceLane]);

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
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Long Range Schedule" />
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
        <EmptyResultPlaceholder text={"Please search for the schedule"} />
      ) : (
        <div className="bg-surface rounded-2xl flex flex-col relative overflow-hidden">
          <ServiceLaneSelector
            items={serviceLaneItems}
            onChange={(value) => {
              setSelectedServiceLane(value);
            }}
          />
          <div className="p-6">
            <div className="flex gap-4 items-center justify-between mb-2">
              <MdTextButton>
                <MdIcon slot="icon">
                  <Download fontSize="small" />
                </MdIcon>
                Download
              </MdTextButton>
              <MdTypography
                variant="label"
                size="large"
                className="text-outline"
              >
                Total: {schedules.length}
              </MdTypography>
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
