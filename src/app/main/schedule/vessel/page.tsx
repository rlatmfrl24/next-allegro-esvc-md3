"use client";

import { MdFilledButton, MdTextButton } from "@/app/util/md3";
import { useEffect, useMemo, useState } from "react";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import ConditionSummary from "./condition-summary";
import EmptyResultPlaceholder from "../../../components/empty-placeholder";
import VesselIcon from "@/../public/icon_vessel_outline.svg";
import styles from "@/app/styles/base.module.css";
import {
  createDummaryVesselSchedules,
  createDummyVesselInformations,
} from "../util";
import { useRecoilValue } from "recoil";
import { ScrollState } from "@/app/store/global.store";
import { VesselScheduleResult } from "./search-result";
import PageTitle from "@/app/components/title-components";
import {
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";

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
  const vesselList = useMemo(() => createDummyVesselInformations(400), []);
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);
  const [vesselQuery, setVesselQuery] = useState<string>("");
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
    if (scrollState.instance) {
      scrollState.instance()?.elements().viewport?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <div
      id="content-container"
      aria-label="container"
      className={styles.container + " relative"}
    >
      <PageTitle title="Vessel Schedule" />
      <div className={styles.area}>
        <NAOutlinedAutoComplete
          label="Vessel Name"
          required
          icon={<VesselIcon />}
          recentCookieKey="recent-vessel"
          itemList={vesselList.map((vessel) => vessel.vesselName)}
          onItemSelection={(value) => {
            setVesselQuery(value === "" ? "" : value);
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
          <EmptyResultPlaceholder text={"Please search for the schedule"} />
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
