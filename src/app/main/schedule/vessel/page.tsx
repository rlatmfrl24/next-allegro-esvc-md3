"use client";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { useEffect, useState } from "react";
import { VesselInfoType, VesselScheduleType } from "@/app/util/typeDef";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import ConditionSummary from "./condition-summary";
import EmptyResultPlaceholder from "../empty-placeholder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VesselIcon from "@/../public/icon_vessel_outline.svg";
import styles from "@/app/styles/base.module.css";
import {
  createDummaryVesselSchedules,
  createDummyVesselInformations,
} from "../util";
import { useRecoilValue } from "recoil";
import { ScrollState } from "@/app/store/global.store";
import { VesselScheduleResult } from "./search-result";

export default function VesselSchedule() {
  const emptyVesselData: VesselInfoType = {
    vesselName: "-",
    serviceLane: "-",
    consortiumVoyage: "-",
    age: 0,
    builtOn: "",
    classNumber: "",
    IMONumber: "",
    netWeight: 0,
    officialNumber: "",
    owner: "",
    ownerName: "",
    vesselCode: "",
    grossWeight: 0,
    flag: "",
    callSign: "",
    portOfRegistry: "",
  };

  const scrollState = useRecoilValue(ScrollState);
  const [vesselList] = useState<VesselInfoType[]>(
    createDummyVesselInformations()
  );
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);
  const [vesselQuery, setVesselQuery] = useState<string>("");
  const [recentVesselQueries, setRecentVesselQueries] = useState<string[]>([]);
  const [vesselData, setVesselData] = useState<VesselInfoType>(emptyVesselData);
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [vesselSchedules] = useState<VesselScheduleType[]>(
    createDummaryVesselSchedules()
  );

  useEffect(() => {
    if (scrollState.yPosition > 150) {
      setIsSearchConditionSummaryOpen(true);
    } else {
      setIsSearchConditionSummaryOpen(false);
    }
  }, [scrollState]);

  function clearSearchCondition() {
    setVesselQuery("");
    setPageState("unsearch");
  }

  function ScrollToTop() {
    scrollState.viewPort?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      id="content-container"
      aria-label="container"
      className="relative max-w-[1400px] w-full p-6 flex flex-col gap-4"
    >
      <div
        aria-label="page-title"
        className="flex justify-start items-center gap-3"
      >
        <MdTypography variant="title" size="large">
          Vessel Schedule
        </MdTypography>
        <MdIconButton>
          <MdIcon>
            <FavoriteBorderIcon />
          </MdIcon>
        </MdIconButton>
      </div>
      <div className={styles.area}>
        <NAOutlinedAutoComplete
          value={vesselQuery}
          setValue={setVesselQuery}
          label="Vessel Name"
          required
          icon={<VesselIcon />}
          recentItems={recentVesselQueries}
          itemList={vesselList.map((vessel) => vessel.vesselName)}
          onSelection={(value) => {
            setVesselQuery(value === "" ? "" : value);
            if (value !== "") {
              setRecentVesselQueries((previous) => {
                if (previous.includes(value)) {
                  const index = previous.indexOf(value);
                  previous.splice(index, 1);
                  return [value, ...previous];
                }
                return [value, ...previous].slice(0, 5);
              });
            }
          }}
        />
        <div className="flex justify-end gap-2">
          <MdTextButton
            onClick={() => {
              clearSearchCondition();
            }}
          >
            Reset
          </MdTextButton>
          <MdFilledButton
            onClick={() => {
              console.log(vesselSchedules);
              setPageState("search");
              setVesselData(
                vesselList.find(
                  (vessel) => vessel.vesselName === vesselQuery
                ) || emptyVesselData
              );
            }}
          >
            Search
          </MdFilledButton>
        </div>
      </div>
      <div className={styles.area}>
        {pageState === "unsearch" ? (
          <EmptyResultPlaceholder />
        ) : (
          <VesselScheduleResult
            vesselData={vesselData}
            vesselSchedules={vesselSchedules}
          />
        )}
      </div>
      <ConditionSummary
        open={isSearchConditionSummaryOpen && vesselSchedules.length > 0}
        condition={vesselData}
        scrollTop={ScrollToTop}
      />
    </div>
  );
}
