import { MdTypography } from "@/app/components/typography";
import { MdElevationButton, MdFilledButton } from "@/app/util/md3";
import { VariableElavatedButton } from "@/app/components/variable-buttons";
import { ListItemProps } from "./typeDef";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VesselIcon from "@/../public/icon_vessel.svg";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ListItem({ item }: { item: ListItemProps }) {
  return (
    <div className="relative border-outlineVariant border rounded-xl p-6 flex gap-12">
      <div className="flex-1 flex flex-col gap-4">
        <div className="text-primary flex items-center relative gap-4">
          <LocationOnIcon />
          <div className="flex-1 border-dashed h-px border border-outlineVariant"></div>
          <VesselIcon />
          <div className="flex-1 border-dashed h-px border border-outlineVariant"></div>
          <LocationOnIcon />
          <ArrowForwardIosIcon className="absolute h-4 w-4 right-7 text-outlineVariant" />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start gap-1">
            <MdTypography variant="title" size="medium">
              <span className="border-b border-onSurface uppercase">
                {item.origin}
              </span>
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline w-fit"
            >
              {item.departure.toFormat("yyyy-MM-dd")}
            </MdTypography>
            <VariableElavatedButton
              className="mt-1"
              size="x-small"
              icon={<AccessTimeIcon className="w-4 h-4" />}
            >
              Cut Off
            </VariableElavatedButton>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MdTypography variant="title" size="medium">
              <span className="border-b border-onSurface">
                {item.vesselName}
              </span>
            </MdTypography>
            <MdTypography variant="body" size="medium" className="flex">
              <span className="text-secondary font-semibold mr-2">
                {item.serviceLane}
              </span>
              <span className="text-outline mr-1">Transit Time</span>
              <span className="text-secondary font-semibold mr-2">
                {item.transitTime} Days
              </span>
              <MdTypography
                variant="label"
                size="medium"
                className="px-2 py-0.5 bg-secondaryContainer rounded-lg"
              >
                Direct
              </MdTypography>
            </MdTypography>
          </div>
          <div className="flex flex-col items-end gap-1">
            <MdTypography variant="title" size="medium">
              <span className="border-b border-onSurface uppercase">
                {item.destination}
              </span>
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline w-fit"
            >
              {item.arrival.toFormat("yyyy-MM-dd")}
            </MdTypography>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <MdFilledButton>Booking</MdFilledButton>
        <MdElevationButton>
          <div slot="icon">
            <ExpandMoreOutlinedIcon className="w-5 h-5" />
          </div>
          Details
        </MdElevationButton>
      </div>
    </div>
  );
}
