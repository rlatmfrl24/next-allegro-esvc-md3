import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { ArrowDropDown, FmdGood, InfoOutlined } from "@mui/icons-material";
import VesselIcon from "@/../public/icon_vessel.svg";
import { CargoTrackingProps } from "@/app/util/typeDef/tracking";
import { DetailTitle } from "@/app/components/title-components";
import { MdIcon, MdIconButton } from "@/app/util/md3";
import {
  VesselInfoType,
  VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import { createDummyVesselSchedules } from "@/app/main/schedule/util";

export const SailingInfo = ({
  data,
  callOpenVesselInformationDialog,
  callOpenVesselScheduleDialog,
}: {
  data: CargoTrackingProps;
  callOpenVesselInformationDialog: (vesselInfo: VesselInfoType) => void;
  callOpenVesselScheduleDialog: (
    vesselInfo: VesselInfoType,
    schedules: VesselScheduleType[]
  ) => void;
}) => {
  return (
    <div className="w-[760px] border-r border-dotted pr-4 mr-4">
      <DetailTitle title="Sailing Info" className="mb-4" />
      <div className="flex flex-col">
        {data.detailInfo.cargoSailingInfo.length < 2 ? (
          <EmptySailingInfo />
        ) : (
          <>
            {data.detailInfo.cargoSailingInfo.map((sailingInfo, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-6">
                    <FmdGood className="text-primary" />
                    <MdTypography
                      variant="body"
                      size="large"
                      className="text-primary"
                      prominent
                    >
                      {sailingInfo.port.yardName}
                    </MdTypography>
                  </div>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline"
                  >
                    {sailingInfo.time.toFormat("yyyy-MM-dd HH:mm")}
                  </MdTypography>
                </div>
                {index !== data.detailInfo.cargoSailingInfo.length - 1 && (
                  <>
                    {data.detailInfo.cargoSailingVessel[index] && (
                      <div className="flex">
                        <div className="relative w-12 py-1">
                          <ArrowDropDown className="absolute top-1/2 -translate-y-1/2 bg-surfaceContainerLowest text-primary" />
                          <DividerComponent
                            orientation="vertical"
                            className="h-full ml-[11px] border-dotted"
                          />
                        </div>
                        <div className="flex items-center bg-secondaryContainer w-full px-8 py-2 rounded-2xl my-12">
                          <div className="w-10 h-10 flex items-center justify-center text-primary">
                            <VesselIcon />
                          </div>
                          <MdTypography
                            variant="body"
                            size="large"
                            className="text-onSurfaceVariant underline cursor-pointer"
                            onClick={() => {
                              callOpenVesselScheduleDialog(
                                data.detailInfo.cargoSailingVessel[index],
                                createDummyVesselSchedules()
                              );
                            }}
                          >
                            {
                              data.detailInfo.cargoSailingVessel[index]
                                .vesselName
                            }
                          </MdTypography>
                          <div className="flex-1"></div>
                          <MdIconButton
                            onClick={() => {
                              callOpenVesselInformationDialog(
                                data.detailInfo.cargoSailingVessel[index]
                              );
                            }}
                          >
                            <MdIcon>
                              <InfoOutlined />
                            </MdIcon>
                          </MdIconButton>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const EmptySailingInfo = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <FmdGood className="text-primary" />
          <MdTypography
            variant="body"
            size="large"
            className="text-primary"
            prominent
          >
            Not Assigned
          </MdTypography>
        </div>
      </div>
      <div className="flex">
        <div className="relative w-12 py-1">
          <ArrowDropDown className="absolute top-1/2 -translate-y-1/2 bg-surfaceContainerLowest text-primary" />
          <DividerComponent
            orientation="vertical"
            className="h-full ml-[11px] border-dotted"
          />
        </div>
        <div className="flex items-center bg-secondaryContainer w-full px-8 py-2 rounded-2xl my-12">
          <div className="w-10 h-10 flex items-center justify-center text-primary">
            <VesselIcon />
          </div>
          <MdTypography
            variant="body"
            size="large"
            className="text-onSurfaceVariant flex-1"
          >
            Not Assigned
          </MdTypography>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <FmdGood className="text-primary" />
        <MdTypography
          variant="body"
          size="large"
          className="text-primary"
          prominent
        >
          Not Assigned
        </MdTypography>
      </div>
    </div>
  );
};
