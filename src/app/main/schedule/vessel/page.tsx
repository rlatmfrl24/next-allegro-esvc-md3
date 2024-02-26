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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createDummyVesselData } from "./util";
import { VesselInfoType } from "@/app/util/typeDef";
import EmptyResultPlaceHolder from "@/../public/image_empty_search_result.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ActualScheduleIcon from "@/../public/icon_actual_schedule.svg";
import EstimateScheduleIcon from "@/../public/icon_estimate_schedule.svg";
import DownloadIcon from "@mui/icons-material/Download";
import VesselResultTable from "./result-table";
import OutlinedAutoComplete from "@/app/components/na-autocomplete";

export default function VesselSchedule() {
  const scrollRef = useRef<any>();

  const [vesselList] = useState<VesselInfoType[]>(createDummyVesselData());
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);
  const [vesselQuery, setVesselQuery] = useState<string>("");
  const [recentVesselQueries, setRecentVesselQueries] = useState<string[]>([]);
  const [vesselData, setVesselData] = useState<VesselInfoType>({
    vesselName: "-",
    serviceLane: "-",
    consortiumVoyage: "-",
  });
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");

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

  return (
    <div ref={scrollRef} className="flex-1">
      <div className="flex justify-center">
        <div
          aria-label="container"
          className="max-w-[1400px] w-full m-6 flex flex-col gap-4 "
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
          <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4">
            <OutlinedAutoComplete
              value={vesselQuery}
              setValue={setVesselQuery}
              label="Vessel Name"
              recentItems={recentVesselQueries}
              itemList={vesselList.map((vessel) => vessel.vesselName)}
              className="w-full"
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
                  setPageState("search");
                  setVesselData(
                    vesselList.find(
                      (vessel) => vessel.vesselName === vesselQuery
                    ) || {
                      vesselName: "-",
                      serviceLane: "-",
                      consortiumVoyage: "-",
                    }
                  );
                }}
              >
                Search
              </MdFilledButton>
            </div>
          </div>
          <div className="bg-surface rounded-2xl p-6 flex flex-col">
            {
              {
                unsearch: (
                  <div className="flex flex-col justify-center items-center h-96">
                    <EmptyResultPlaceHolder className="mb-8" />
                    <MdTypography
                      variant="headline"
                      size="medium"
                      className="text-outlineVariant"
                    >
                      Please search for the schedule
                    </MdTypography>
                  </div>
                ),
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
                          2
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
                    <VesselResultTable />
                  </>
                ),
              }[pageState]
            }
          </div>
        </div>
      </div>
    </div>
  );
}
