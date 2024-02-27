"use client";

import { MdTypography } from "@/app/components/typography";
import {
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";
import { VesselInfoType, VesselScheduleType } from "@/app/util/typeDef";
import VesselResultTable from "./result-table";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import VesselInformationDialog from "../popup/vessel-information";
import Portal from "@/app/components/portal";
import ConditionSummary from "./condition-summary";
import EmptyResultPlaceholder from "../empty-placeholder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VesselIcon from "@/../public/icon_vessel_outline.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ActualScheduleIcon from "@/../public/icon_actual_schedule.svg";
import EstimateScheduleIcon from "@/../public/icon_estimate_schedule.svg";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "@/app/styles/base.module.css";
import {
  createDummaryVesselSchedules,
  createDummyVesselInformations,
} from "../util";

export default function VesselSchedule() {
  const scrollRef = useRef<any>();
  const [isVesselInformationOpen, setIsVesselInformationOpen] = useState(false);

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

  const [initialize, instance] = useOverlayScrollbars({
    events: {
      scroll: (instance) => {
        const viewport = instance.elements().viewport;
        if (viewport.scrollTop > 150) {
          setIsSearchConditionSummaryOpen(true);
        } else {
          setIsSearchConditionSummaryOpen(false);
        }
      },
    },
  });

  useEffect(() => {
    if (scrollRef.current) initialize(scrollRef.current);
  }, [initialize]);

  function clearSearchCondition() {
    setVesselQuery("");
    setPageState("unsearch");
  }

  function ScrollToTop() {
    instance()?.elements().viewport.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div ref={scrollRef} className="flex-1">
      <div className="flex justify-center">
        <div
          aria-label="container"
          className="max-w-[1400px] w-full m-6 flex flex-col gap-4 "
        >
          <ConditionSummary
            open={isSearchConditionSummaryOpen && vesselSchedules.length > 0}
            condition={vesselData}
            scrollTop={ScrollToTop}
          />
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
            {
              {
                unsearch: <EmptyResultPlaceholder />,
                search: (
                  <>
                    <div className="flex justify-center">
                      <div className="flex w-full h-fit">
                        <div className="flex-1 grid grid-cols-[148px_1fr] gap-1">
                          <MdTypography
                            variant="body"
                            size="medium"
                            className="mr-4"
                          >
                            Vessel
                          </MdTypography>
                          <div
                            onClick={() => {
                              if (vesselData.vesselName !== "-")
                                setIsVesselInformationOpen(true);
                            }}
                          >
                            <MdTypography
                              variant="body"
                              size="large"
                              className={`text-primary ${
                                vesselData.vesselName === "-"
                                  ? ""
                                  : "underline cursor-pointer w-fit"
                              }`}
                            >
                              {vesselData.vesselName}
                            </MdTypography>
                          </div>
                          <MdTypography
                            variant="body"
                            size="medium"
                            className="mr-4"
                          >
                            Service Lane
                          </MdTypography>
                          <MdTypography
                            variant="body"
                            size="large"
                            className="text-primary"
                          >
                            {vesselData.serviceLane}
                          </MdTypography>
                          <MdTypography
                            variant="body"
                            size="medium"
                            className="mr-4"
                          >
                            Consortium Voyage
                          </MdTypography>
                          <MdTypography
                            variant="body"
                            size="large"
                            className="text-primary"
                          >
                            {vesselData.consortiumVoyage}
                          </MdTypography>
                        </div>
                        <div className="flex h-fit items-center gap-2.5">
                          <MdTextButton>
                            <MdIcon slot="icon">
                              <ChevronLeftIcon fontSize="small" />
                            </MdIcon>
                            Previous Voyage
                          </MdTextButton>
                          <div
                            aria-label="divider"
                            className="w-px h-6 bg-outlineVariant"
                          ></div>
                          <MdTextButton trailingIcon>
                            Next Voyage
                            <MdIcon slot="icon">
                              <ChevronRightIcon fontSize="small" />
                            </MdIcon>
                          </MdTextButton>
                        </div>
                      </div>
                    </div>
                    <div
                      aria-label="divider"
                      className="h-px w-full border-b border-dashed border-outlineVariant mt-6 mb-4"
                    ></div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <MdTypography
                          variant="label"
                          size="large"
                          className="text-outline"
                        >
                          Ports Total:
                        </MdTypography>
                        <MdTypography
                          variant="body"
                          size="large"
                          prominent
                          className="text-onSurface"
                        >
                          {vesselSchedules.length}
                        </MdTypography>
                      </div>
                      <div className="flex items-center gap-6">
                        <MdTypography
                          variant="label"
                          size="medium"
                          tag="label"
                          className="flex items-center gap-2"
                        >
                          <ActualScheduleIcon />
                          Actual Schedule
                        </MdTypography>
                        <MdTypography
                          variant="label"
                          size="medium"
                          tag="label"
                          className="flex items-center gap-2"
                        >
                          <EstimateScheduleIcon />
                          Estimate Schedule
                        </MdTypography>
                        <MdTextButton>
                          <MdIcon slot="icon">
                            <DownloadIcon fontSize="small" />
                          </MdIcon>
                          Download
                        </MdTextButton>
                      </div>
                    </div>
                    <VesselResultTable data={vesselSchedules} />
                  </>
                ),
              }[pageState]
            }
          </div>
        </div>
      </div>
      <Portal selector="#main-container">
        <VesselInformationDialog
          open={isVesselInformationOpen}
          handleOpen={setIsVesselInformationOpen}
          data={vesselData}
        />
      </Portal>
    </div>
  );
}
