import {
  MdChipSet,
  MdFilledTonalIconButton,
  MdIcon,
  MdOutlinedButton,
} from "@/app/util/md3";
import { MdTypography } from "@/app/components/typography";
import { useRecoilState } from "recoil";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteRouteListState } from "@/app/store/ptp.store";
import SummaryContainer from "../../summary-container";
import { PtPSearchConditionType } from "@/app/util/typeDef/schedule";

const SummaryItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col w-[212px]">
      <MdTypography variant="body" size="medium" className="text-outline">
        {title}
      </MdTypography>
      <MdTypography variant="title" size="medium">
        {value}
      </MdTypography>
    </div>
  );
};

const PortChip = ({ port }: { port: string }) => {
  return (
    <MdTypography
      variant="label"
      size="large"
      className="px-3 py-1.5 bg-secondaryContainer text-onSecondaryContainer rounded-lg whitespace-nowrap"
    >
      {port}
    </MdTypography>
  );
};

export default function ConditionSummary({
  open,
  condition,
  scrollTop,
}: {
  open: boolean;
  condition: PtPSearchConditionType;
  scrollTop?: () => void;
}) {
  const [presetList, setPresetList] = useRecoilState(FavoriteRouteListState);

  function isCurrentRouteFavourite() {
    return presetList.some((preset) => {
      return (
        preset.origin.toString() === condition.origins.toString() &&
        preset.destination.toString() === condition.destinations.toString()
      );
    });
  }

  function toggleFavourite() {
    if (isCurrentRouteFavourite()) {
      setPresetList(
        presetList.filter((preset) => {
          return (
            preset.origin.toString() !== condition.origins.toString() ||
            preset.destination.toString() !== condition.destinations.toString()
          );
        })
      );
    } else {
      setPresetList([
        ...presetList,
        {
          id: "preset-" + presetList.length,
          name: "Preset " + (presetList.length + 1),
          origin: condition.origins,
          destination: condition.destinations,
        },
      ]);
    }
  }

  return (
    <SummaryContainer open={open} collapseSize={300}>
      <div className="w-full py-6 flex mx-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex gap-4 ">
            <div className="flex flex-1 flex-col gap-1">
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                Origin
              </MdTypography>
              <MdChipSet>
                {condition.origins.map((origin, index) => (
                  <PortChip key={origin} port={origin} />
                ))}
              </MdChipSet>
            </div>
            <div className="flex flex-col gap-1">
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                &nbsp;
              </MdTypography>
              <MdIcon>
                <SwapHorizOutlinedIcon />
              </MdIcon>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                Destination
              </MdTypography>
              <MdChipSet>
                {condition.destinations.map((destination, index) => (
                  <PortChip key={destination} port={destination} />
                ))}
              </MdChipSet>
            </div>
          </div>
          <div className="flex gap-4">
            <SummaryItem
              title="Search On"
              value={
                condition.searchOn === "departure" ? "Departure" : "Arrival"
              }
            />
            <SummaryItem
              title="Date"
              value={`${condition.startDate.toFormat(
                "yyyy-MM-dd"
              )} ~ ${condition.endDate.toFormat("yyyy-MM-dd")}`}
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-between items-end">
          <MdFilledTonalIconButton
            onClick={() => {
              toggleFavourite();
            }}
          >
            <MdIcon>
              {isCurrentRouteFavourite() ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </MdIcon>
          </MdFilledTonalIconButton>

          <MdOutlinedButton onClick={scrollTop}>Re-Search</MdOutlinedButton>
        </div>
      </div>
    </SummaryContainer>
  );
}
