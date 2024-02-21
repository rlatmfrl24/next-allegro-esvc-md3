"use client";

import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PortSchedule() {
  const scrollRef = useRef<any>();
  const [initialize, instance] = useOverlayScrollbars({
    events: {
      scroll: (instance) => {
        const viewport = instance.elements().viewport;
        // if (viewport.scrollTop > 150) {
        //   setIsSearchConditionSummaryOpen(true);
        // } else {
        //   setIsSearchConditionSummaryOpen(false);
        // }
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
              Port Schedule
            </MdTypography>
            <MdIconButton>
              <MdIcon>
                <FavoriteBorderIcon />
              </MdIcon>
            </MdIconButton>
          </div>
          <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4">
            11
          </div>
        </div>
      </div>
    </div>
  );
}
