import { CargoTrackingProps, TransitType } from "@/app/util/typeDef/tracking";
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { Place } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { getLastActualInfo } from "../util";
import { MdTypography } from "@/app/components/typography";
import TransitPortIcon from "@/../public/icon_transit_port.svg";
import TransitShipIcon from "@/../public/icon_transit_ship.svg";
import TransitTrainIcon from "@/../public/icon_transit_train.svg";
import TransitTruckIcon from "@/../public/icon_transit_truck.svg";
import { PlainTooltip } from "@/app/components/tooltip";
import { DividerComponent } from "@/app/components/divider";

function getIconByTransitType(type: TransitType) {
  switch (type) {
    case TransitType.Truck:
      return <TransitTruckIcon />;
    case TransitType.Train:
      return <TransitTrainIcon />;
    case TransitType.Ship:
      return <TransitShipIcon />;
    case TransitType.Port:
      return <TransitPortIcon />;
  }
}

const TrackingPoint = ({
  data,
  position,
}: {
  data: CargoTrackingProps;
  position: "start" | "end";
}) => {
  const { refs, floatingStyles } = useFloating({
    middleware: [offset(4)],
    placement: position === "start" ? "top-start" : "top-end",
  });

  const showTooltip =
    (data.ratio <= 5 && position === "start") ||
    (data.ratio >= 95 && position === "end");

  return (
    <>
      <Place
        ref={refs.setReference}
        className={
          (data.ratio > 5 && position === "start") ||
          (data.ratio > 95 && position === "end")
            ? "text-primary"
            : "text-outlineVariant"
        }
        sx={{
          fontSize: "32px",
        }}
      />
      {showTooltip && (
        <div ref={refs.setFloating} style={floatingStyles}>
          {getLastActualInfo(data.detailInfo.cargoDetail) !== undefined && (
            <PlainTooltip
              label={
                getLastActualInfo(data.detailInfo.cargoDetail)!.description
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export const TrackingProcessInfo = ({ data }: { data: CargoTrackingProps }) => {
  const wholeBarRef = useRef<HTMLDivElement>(null);
  const leftBarRef = useRef<HTMLDivElement>(null);

  const [leftOver, setLeftOver] = useState(0);
  const [rightOver, setRightOver] = useState(0);
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const { refs, floatingStyles } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: "top",
    middleware: [
      offset({
        mainAxis: 4,
        crossAxis:
          (leftOver > 0 ? leftOver : 0) + (rightOver > 0 ? -rightOver - 32 : 0),
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const tooltipWidth = refs.floating.current?.clientWidth;
    const leftBarWidth = leftBarRef.current?.clientWidth;
    const wholeBarRefWidth = wholeBarRef.current?.clientWidth;
    const rightBarWidth = (wholeBarRefWidth || 0) - (leftBarWidth || 0);

    if (tooltipWidth && leftBarWidth) {
      const leftOver = tooltipWidth / 2 - leftBarWidth;
      setLeftOver(leftOver);
    }

    if (tooltipWidth && rightBarWidth) {
      const rightOver = tooltipWidth / 2 - rightBarWidth;
      setRightOver(rightOver);
    }

    // console.log("leftOver", isLeftOver);
    // console.log("rightOver", isRightOver);
  }, [leftOver, rightOver, refs.floating]);

  return (
    <div
      className="flex flex-col flex-1 justify-center pr-12"
      ref={wholeBarRef}
    >
      <div className="relative flex w-full items-center">
        <TrackingPoint data={data} position="start" />
        <DividerComponent
          orientation="horizontal"
          className="h-1 border-b-2 border-b-outlineVariant border-dotted mx-2"
        />
        <div
          ref={leftBarRef}
          style={{ width: `${data.ratio}%` }}
          className="flex w-full px-8 absolute top-1/2 -translate-y-1/2"
        >
          <DividerComponent
            orientation="horizontal"
            className="flex-1 h-1 border-b-4 border-b-primary"
          />
        </div>

        <TrackingPoint data={data} position="end" />

        {data.ratio < 95 && data.ratio > 5 && (
          <>
            <div
              className="absolute top-1/2 -translate-y-1/2 bg-surface px-2 w-fit"
              style={{ left: `calc(${data.ratio}% - 32px)` }}
              ref={refs.setReference}
            >
              {getIconByTransitType(data.transitType)}
            </div>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                // backgroundColor:
                //   leftOver > 0
                //     ? "red"
                //     : rightOver > 0
                //     ? "blue"
                //     : "var(--md-sys-color-inverse-surface)",
                backgroundColor: "var(--md-sys-color-inverse-surface)",
                visibility:
                  getLastActualInfo(data.detailInfo.cargoDetail) === undefined
                    ? "hidden"
                    : "visible",
              }}
              className={`flex px-2 py-1 rounded`}
            >
              <MdTypography
                variant="body"
                size="small"
                className="text-inverseOnSurface"
              >
                {getLastActualInfo(data.detailInfo.cargoDetail)?.description}
              </MdTypography>
            </div>
          </>
        )}
      </div>
      <div className="flex w-full justify-between mt-2.5">
        <MdTypography variant="body" size="large" prominent>
          {data.start.yardName}
        </MdTypography>
        <MdTypography variant="body" size="large" prominent>
          {data.end.yardName}
        </MdTypography>
      </div>
    </div>
  );
};
