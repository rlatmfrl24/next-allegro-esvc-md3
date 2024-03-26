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
  MdChipSet,
  MdFilledButton,
  MdFilterChip,
  MdIcon,
  MdOutlinedButton,
  MdSelectOption,
  MdTextButton,
} from "@/app/util/md3";

import EmptyResultPlaceholder from "../../../components/empty-placeholder";
import ServiceLaneSelector from "./service-lane-selector";
import LongRangeTable from "./table";
import { createDummyLongRangeSchedules } from "../util";
import PageTitle, { SubTitle } from "@/app/components/title-components";
import { LongRangeSearchConditionType } from "@/app/util/typeDef/schedule";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";

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
  const [selectedServiceLane, setSelectedServiceLane] = useState<string>(
    serviceLaneItems[0] || ""
  );

  const createDummyData = useCallback(() => {
    const { schedules, portList } = createDummyLongRangeSchedules(hasDeparture);
    setSchedules(schedules);
    setPortList(portList);
  }, [hasDeparture]);

  const [serviceLaneRoutes, setServiceLaneRoutes] = useState<string[]>();
  const [selectedRoute, setSelectedRoute] = useState<string>();

  useEffect(() => {
    const routes = Array.from({
      length: faker.number.int({
        min: 1,
        max: 5,
      }),
    }).map((_, index) => `Route #${index + 1}`);
    setServiceLaneRoutes(routes);
    setSelectedRoute(routes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServiceLane]);

  useEffect(() => {
    createDummyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoute]);

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

  const tempServiceLaneTitle = useMemo(() => {
    return `${faker.location.city()}-${faker.location.city()} SERVICE (${selectedServiceLane})`;
  }, [selectedServiceLane]);

  const continentList = [
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Long Range Schedule" />
      <div className={styles.area} aria-label="search-condition-area">
        <div className="flex gap-4">
          <NAOutlinedListBox
            label="Continent From"
            required
            icon={<PlaceOutlinedIcon />}
            error={errorState === "from"}
            errorText="Please select continent"
            initialValue={searchCondition.continentFrom}
            options={continentList}
            onSelection={(value) => {
              setSearchCondition((prev) => ({
                ...prev,
                continentFrom: value,
              }));
            }}
          />

          <NAOutlinedListBox
            label="Continent To"
            required
            icon={<PlaceOutlinedIcon />}
            error={errorState === "to"}
            errorText="Please select continent"
            initialValue={searchCondition.continentTo}
            options={continentList}
            onSelection={(value) => {
              setSearchCondition((prev) => ({
                ...prev,
                continentTo: value,
              }));
            }}
          />

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
            <SubTitle title={tempServiceLaneTitle} className="mb-2" />
            <MdChipSet className="mb-4">
              {serviceLaneRoutes?.map((route, index) => (
                <MdFilterChip
                  key={index}
                  label={route}
                  selected={route === selectedRoute}
                  onClick={() => {
                    setSelectedRoute(route);
                  }}
                />
              ))}
            </MdChipSet>
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
