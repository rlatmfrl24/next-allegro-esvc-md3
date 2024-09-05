import { CSSProperties, useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { MdIconButton, MdSecondaryTab, MdTabs } from "@/app/util/md3";

export default function ServiceLaneSelector({
  items,
  onChange,
}: {
  items: string[];
  onChange?: (value: string) => void;
}) {
  const tabContainerRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { events } = useDraggable(tabContainerRef);
  const [scrollState, setScrollState] = useState<"left" | "right" | "none">(
    "left"
  );
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    // detect ref is overflowed
    setTimeout(() => {
      if (tabContainerRef.current) {
        setIsOverflowed(
          tabContainerRef.current.scrollWidth >
            tabContainerRef.current.clientWidth
        );
      }
    }, 3);
  }, []);

  return (
    <div className="relative ">
      <div
        className="overflow-x-scroll scrollbar-hide"
        {...events}
        ref={tabContainerRef}
        onScroll={(e) => {
          //detect scroll to left end
          if (e.currentTarget.scrollLeft === 0) {
            scrollState !== "left" && setScrollState("left");
          } else {
            scrollState !== "none" && setScrollState("none");
          }

          //detect scroll to right end
          if (
            e.currentTarget.scrollLeft + e.currentTarget.clientWidth ===
            e.currentTarget.scrollWidth
          ) {
            scrollState !== "right" && setScrollState("right");
          } else {
            scrollState !== "none" && setScrollState("none");
          }
        }}
      >
        <MdTabs
          className="min-w-fit"
          onchange={(e) => {
            const activeTabIndex = (e.target as any).activeTabIndex;
            onChange && onChange(items[activeTabIndex]);
          }}
        >
          {items.map((item, index) => (
            <MdSecondaryTab
              style={
                {
                  "--md-secondary-tab-container-color": "#fff",
                } as CSSProperties
              }
              key={index}
            >
              {item}
            </MdSecondaryTab>
          ))}
        </MdTabs>
      </div>
      {isOverflowed && scrollState !== "left" && (
        <>
          <div className="absolute top-0 left-0 h-full flex items-center bg-surface border-b border-b-outlineVariant z-10">
            <MdIconButton
              onClick={() => {
                tabContainerRef.current?.scrollBy({
                  left: -100,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronLeft />
            </MdIconButton>
          </div>
          <div className="absolute top-0 left-10 w-12 h-full bg-gradient-to-r from-surface to-transparent  flex items-center justify-start border-b border-b-outlineVariant"></div>
        </>
      )}
      {isOverflowed && scrollState !== "right" && (
        <>
          <div className="absolute top-0 right-0 h-full flex items-center bg-surface border-b border-b-outlineVariant">
            <MdIconButton
              onClick={() => {
                tabContainerRef.current?.scrollBy({
                  left: 100,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronRight />
            </MdIconButton>
          </div>
          <div className="absolute top-0 right-10 w-12 h-full bg-gradient-to-l from-surface to-transparent  flex items-center justify-end border-b border-b-outlineVariant"></div>
        </>
      )}
    </div>
  );
}
