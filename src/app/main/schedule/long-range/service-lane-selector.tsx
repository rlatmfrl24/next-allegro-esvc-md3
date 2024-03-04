import { MdSecondaryTab, MdTabs } from "@/app/util/md3";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function ServiceLaneSelector() {
  const tabContainerRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { events } = useDraggable(tabContainerRef);

  return (
    <div
      className="overflow-x-scroll scrollbar-hide"
      {...events}
      ref={tabContainerRef}
    >
      <MdTabs className="min-w-fit">
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
        <MdSecondaryTab>1111</MdSecondaryTab>
      </MdTabs>
    </div>
  );
}
