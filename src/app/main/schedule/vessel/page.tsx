"use client";

import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NAOutlinedAutoComplete } from "@/app/components/autocomplete";
import { createDummyVesselData } from "./util";
import { VesselInfoType } from "@/app/util/typeDef";
import { create } from "domain";

export default function VesselSchedule() {
  const scrollRef = useRef<any>();

  const vesselList = createDummyVesselData();
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);
  const [vesselData, setVesselData] = useState<VesselInfoType>({
    vesselName: "-",
    serviceLane: "-",
    consortiumVoyage: "-",
  });

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

  return (
    <div ref={scrollRef} className="flex-1">
      <div ref={scrollRef} className="flex justify-center">
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
            <NAOutlinedAutoComplete
              label="Vessel Name"
              handleSelect={(value) =>
                setVesselData(
                  vesselList.find((vessel) => vessel.vesselName === value) || {
                    vesselName: "-",
                    serviceLane: "-",
                    consortiumVoyage: "-",
                  }
                )
              }
              required
              itemList={vesselList.map((vessel) => vessel.vesselName)}
            />
            <div className="grid grid-cols-[148px_1fr] gap-1">
              <MdTypography variant="body" size="medium" className="mr-4">
                Vessel
              </MdTypography>
              <MdTypography
                variant="body"
                size="large"
                className="text-primary"
              >
                {vesselData.vesselName}
              </MdTypography>
              <MdTypography variant="body" size="medium" className="mr-4">
                Service Lane
              </MdTypography>
              <MdTypography
                variant="body"
                size="large"
                className="text-primary"
              >
                {vesselData.serviceLane}
              </MdTypography>
              <MdTypography variant="body" size="medium" className="mr-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
