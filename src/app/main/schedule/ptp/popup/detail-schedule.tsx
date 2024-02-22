import { MdDialog, MdFilledButton, MdTextButton } from "@/app/util/md3";
import { ListItemType } from "@/app/util/typeDef";
import VesselIcon from "@/../public/icon_vessel.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { MdTypography } from "@/app/components/typography";
import { useState } from "react";
import PlaceInformationDialog from "../../popup/place-information";
import { faker } from "@faker-js/faker";

export default function DetailScheduleDialog({
  open,
  handleOpen,
  item,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  item: ListItemType;
}) {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);

  return (
    <MdDialog
      open={open}
      closed={() => {
        handleOpen(false);
      }}
      className="min-w-[1280px] h-[720px] max-h-[720px] "
    >
      <div slot="headline">Detail Schedule</div>
      <div slot="content">
        <div className="flex-1 flex flex-col gap-4 bg-surface p-6 rounded-lg border-outlineVariant border">
          <div className="text-primary flex items-center relative gap-4">
            <LocationOnIcon />
            <div className="flex-1 border-dashed h-px border border-outlineVariant"></div>
            <VesselIcon />
            <div className="flex-1 border-dashed h-px border border-outlineVariant"></div>
            <LocationOnIcon />
            <ArrowForwardIosIcon
              sx={{
                fontSize: "16px",
              }}
              className="absolute right-7 text-outlineVariant"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-1 flex-col items-start gap-1">
              <MdTypography variant="title" size="medium">
                <span
                  className="border-b border-onSurface uppercase cursor-pointer"
                  onClick={() => {
                    setSelectedPlace(item.origin);
                    setIsPlaceInformationOpen(!isPlaceInformationOpen);
                  }}
                >
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
            </div>
            <div className="flex flex-1 flex-col items-center gap-1">
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
            <div className="flex flex-1 flex-col items-end gap-1">
              <MdTypography variant="title" size="medium">
                <span
                  className="border-b border-onSurface uppercase cursor-pointer"
                  onClick={() => {
                    setSelectedPlace(item.destination);
                    setIsPlaceInformationOpen(!isPlaceInformationOpen);
                  }}
                >
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
        <div className="bg-surfaceContainerLow px-6 py-4 rounded-lg border border-outlineVariant border-t-0 gap-8 flex flex-col">
          <DetailInfoContainer title="Vessel Info">
            <DetailInfoItem title="Flag" value="KR" />
            <DetailInfoItem
              title="Frequency of Vessel Calling"
              value="Outbound : N/A, Inbound : N/A"
            />
            <DetailInfoItem title="Call Sign" value="D7PP" />
            <DetailInfoItem title="IMO No." value="9704300" />
            <DetailInfoItem title="MRN" value="KR" />
          </DetailInfoContainer>
          <DetailInfoContainer title="Closing Info">
            <DetailInfoItem title="Documentation" value="2024-01-30 14:00" />
            <DetailInfoItem title="EDI" value="2024-01-30 14:00" />
            <DetailInfoItem title="Cargo" value="2024-01-30 14:00" />
            <DetailInfoItem title="" value="" />
            <DetailInfoItem title="" value="" />
          </DetailInfoContainer>
          <DetailInfoContainer title="Container Yard Info">
            <DetailInfoItem
              title="Loading Terminal"
              value="BUSAN PORT TERMINAL Gamman"
            />
            <DetailInfoItem title="Customer No." value="03077016" />
            <DetailInfoItem title="Tel No." value="051-620-0364" />
            <DetailInfoItem title="" value="" />
            <DetailInfoItem title="" value="" />
          </DetailInfoContainer>
          <DetailInfoContainer title="CFS Information">
            <DetailInfoItem
              title="Company Name"
              value="BUSAN PORT TERMINAL Gamman"
            />
            <DetailInfoItem title="PIC" value="이영식 차장" />
            <DetailInfoItem title="Tel No." value="051-620-0364" />
            <DetailInfoItem title="" value="" />
            <DetailInfoItem title="" value="" />
          </DetailInfoContainer>
        </div>
        <PlaceInformationDialog
          open={isPlaceInformationOpen}
          handleOpen={setIsPlaceInformationOpen}
          data={{
            yardName: selectedPlace,
            address: faker.location.streetAddress(),
            phoneNo: faker.phone.imei(),
            faxNo: faker.phone.number(),
            customerNo: faker.string.uuid(),
            emailAddress: faker.internet.email(),
          }}
        />
      </div>
      <div slot="actions" className="flex gap-2">
        <MdTextButton
          onClick={() => {
            handleOpen(false);
          }}
        >
          Close
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            handleOpen(false);
          }}
        >
          Booking
        </MdFilledButton>
      </div>
    </MdDialog>
  );
}

const DetailInfoContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-primary"></div>
        <MdTypography variant="body" size="large" className="text-onSurface">
          {title}
        </MdTypography>
      </div>
      <div className="flex gap-8">{children}</div>
    </div>
  );
};

const DetailInfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col flex-1">
      <MdTypography variant="label" size="medium" className="text-outline">
        {title}
      </MdTypography>
      <MdTypography variant="title" size="medium" className="text-onSurface">
        {value}
      </MdTypography>
    </div>
  );
};
