import { DateTime } from "luxon";

import ActualDateIcon from "@/../public/icon_actual_schedule.svg";
import EstimatedDateIcon from "@/../public/icon_estimate_schedule.svg";
import EmptyContainerImage from "@/../public/image_empty_container_placeholder.svg";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { CargoTrackingProps } from "@/app/util/typeDef/tracking";
import { InfoOutlined } from "@mui/icons-material";

export const CargoDetailInfo = ({
  data,
  callOpenPlaceInformationDialog,
}: {
  data: CargoTrackingProps;
  callOpenPlaceInformationDialog: (data: PlaceInformationType) => void;
}) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-1">
        <DetailTitle title="Cargo Detail" />
        <InfoOutlined
          sx={{
            fontSize: "16px",
          }}
          className="text-outline"
        />
      </div>
      {data.detailInfo.cargoDetail.length === 0 ? (
        <>
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <EmptyContainerImage />
            <MdTypography
              variant="title"
              size="large"
              className="text-outlineVariant"
            >
              No cargo detail information is available.
            </MdTypography>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-[1fr_auto_1fr]">
            {data.detailInfo.cargoDetail.map((detail, index) => (
              <>
                <MdTypography
                  variant="body"
                  size="medium"
                  className={`text-onSurface flex h-full gap-2 p-2 ${
                    index === data.detailInfo.cargoDetail.length - 1
                      ? ""
                      : "border-b border-b-outlineVariant"
                  }`}
                >
                  {detail.description}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className={`text-onSurface flex h-full gap-2 p-2  ${
                    index === data.detailInfo.cargoDetail.length - 1
                      ? ""
                      : "border-b border-b-outlineVariant"
                  }`}
                >
                  <span className="pt-0.5">
                    {detail.date > DateTime.now() ? (
                      <EstimatedDateIcon />
                    ) : (
                      <ActualDateIcon />
                    )}
                  </span>
                  {detail.date.toFormat("yyyy-MM-dd HH:mm")}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className={`text-onSurface flex h-full gap-2 p-2 underline cursor-pointer ${
                    index === data.detailInfo.cargoDetail.length - 1
                      ? ""
                      : "border-b border-b-outlineVariant"
                  }`}
                  onClick={() => {
                    callOpenPlaceInformationDialog(detail.location);
                  }}
                >
                  {detail.location.yardName}
                </MdTypography>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};
