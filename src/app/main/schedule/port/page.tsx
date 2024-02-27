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
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";
import { MdRangeDatePicker } from "@/app/components/datepickers/range-picker";
import NaToggleButton from "@/app/components/na-toggle-button";
import PortIcon from "@/../public/icon_port.svg";
import styles from "@/app/styles/base.module.css";

export default function PortSchedule() {
  const scrollRef = useRef<any>();
  const [portQuery, setPortQuery] = useState("");
  const [isOcenVesselOnly, setIsOcenVesselOnly] = useState(false);
  const [isSearchConditionSummaryOpen, setIsSearchConditionSummaryOpen] =
    useState(false);

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
              Port Schedule
            </MdTypography>
            <MdIconButton>
              <MdIcon>
                <FavoriteBorderIcon />
              </MdIcon>
            </MdIconButton>
          </div>
          <div aria-label="condition-container" className={styles.area}>
            <div className="flex gap-4 items-start">
              <NAOutlinedAutoComplete
                label="Port Name"
                className="w-full"
                value={portQuery}
                required
                icon={<PortIcon />}
                setValue={setPortQuery}
                itemList={Array.from({ length: 60 }, (_, i) => {
                  return `${faker.location.city()}, ${faker.location.country()}`;
                })}
              />
              <MdRangeDatePicker />
              <NaToggleButton
                className="mr-36 h-10"
                label="Ocean Vessel Only"
                state={isOcenVesselOnly ? "checked" : "unchecked"}
                onChange={(value) => {
                  setIsOcenVesselOnly(
                    value === "checked"
                      ? true
                      : value === "unchecked"
                      ? false
                      : isOcenVesselOnly
                  );
                }}
              />
            </div>
            <div
              aria-label="search-condition-actions"
              className="flex justify-end gap-2"
            >
              <MdTextButton>Reset</MdTextButton>
              <MdFilledButton>Search</MdFilledButton>
            </div>
          </div>
          <div className={styles.area}></div>
        </div>
      </div>
    </div>
  );
}
