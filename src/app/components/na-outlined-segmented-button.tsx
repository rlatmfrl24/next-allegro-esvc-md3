import { MdOutlinedSegmentedButton } from "@/app/util/md3";
import { CSSProperties, ComponentProps } from "react";

export default function NaOutlinedSegmentedButton(
  props: ComponentProps<typeof MdOutlinedSegmentedButton>
) {
  return (
    <MdOutlinedSegmentedButton
      style={
        {
          "--md-sys-color-secondary-container": "var(--md-sys-point-color)",
        } as CSSProperties
      }
      {...props}
    />
  );
}
