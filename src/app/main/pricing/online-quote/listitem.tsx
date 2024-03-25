import LabelChip from "@/app/components/label-chip";
import { MdTypography } from "@/app/components/typography";
import { MdElevationButton, MdFilledButton, MdIcon } from "@/app/util/md3";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { ArrowDropDown, Place } from "@mui/icons-material";
import { DateTime } from "luxon";
import VesselIcon from "@/../public/icon_vessel.svg";
import { DividerComponent } from "../../booking/information/components/base";
import { Disclosure } from "@headlessui/react";
import { faker } from "@faker-js/faker";
import { useState } from "react";

export const QuotationListItem = ({
  etd,
  eta,
  vessel,
}: {
  etd: DateTime;
  eta: DateTime;
  vessel: VesselInfoType;
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  return (
    <div className="w-full">
      <div className="p-6 border border-outlineVariant rounded-lg flex">
        <div className="flex-1">
          <div className="flex flex-1 justify-between items-center gap-4 mb-4">
            <Place fontSize="small" className="text-primary" />
            <div className="flex-1 border-b border-dashed border-b-outlineVariant"></div>
            <VesselIcon className="text-primary" />
            <div className="flex-1 border-b border-dashed border-b-outlineVariant"></div>
            <Place fontSize="small" className="text-primary" />
          </div>
          <div className="flex flex-1 justify-between">
            <MdTypography variant="title" size="medium">
              {etd.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
            <MdTypography variant="title" size="medium">
              {vessel.vesselName}
            </MdTypography>
            <MdTypography variant="title" size="medium">
              {eta.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
          </div>
          <div className="flex flex-1 justify-between">
            <MdTypography variant="body" size="medium" className="text-outline">
              ETD
            </MdTypography>
            <div className="flex items-center gap-1">
              <MdTypography
                variant="body"
                size="medium"
                prominent
                className="text-secondary"
              >
                {vessel.serviceLane}
              </MdTypography>
              <MdTypography variant="body" size="medium">
                Transit Time
              </MdTypography>
              <MdTypography
                variant="body"
                size="medium"
                prominent
                className="text-secondary"
              >
                {eta.diff(etd, ["days", "hours", "minutes"]).toObject().days}{" "}
                Day(s)
              </MdTypography>
              <MdTypography
                variant="label"
                size="medium"
                className="px-2 py-0.5 bg-secondaryContainer rounded-lg"
              >
                Direct
              </MdTypography>
            </div>
            <MdTypography variant="body" size="medium" className="text-outline">
              ETA
            </MdTypography>
          </div>
        </div>
        <div className="ml-8 mr-6 flex flex-col bg-surfaceContainerLowest px-4 py-2 rounded-lg">
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline text-left"
          >
            Total Price
          </MdTypography>
          <div className="flex items-baseline gap-1 justify-end">
            <MdTypography
              variant="title"
              size="large"
              prominent
              className="text-primary"
            >
              1231
            </MdTypography>
            <MdTypography variant="body" size="small" className="text-outline">
              USD
            </MdTypography>
          </div>
          <DividerComponent className="my-2" />
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline text-left"
          >
            Validity Date
          </MdTypography>
          <MdTypography variant="body" size="small" className="text-onSurface">
            {etd.toFormat("yyyy-MM-dd")} ~ {eta.toFormat("yyyy-MM-dd")}
          </MdTypography>
        </div>

        <div className="flex flex-col gap-2">
          <MdFilledButton>Accept</MdFilledButton>
          <MdElevationButton
            hasIcon
            onClick={() => {
              setIsDetailOpen(!isDetailOpen);
            }}
          >
            <MdIcon slot="icon">
              <ArrowDropDown
                fontSize="small"
                className={isDetailOpen ? "transform rotate-180" : ""}
              />
            </MdIcon>
            Details
          </MdElevationButton>
        </div>
      </div>
      {isDetailOpen && (
        <div className="p-4 border border-outlineVariant rounded-lg bg-surfaceContainerLow">
          <div className="border border-outlineVariant rounded-lg overflow-hidden bg-surfaceContainerLowest">
            <div className="bg-secondaryContainer h-2"></div>
            <div className="px-6 py-4 text-right">
              <div className="flex justify-end">
                <MdTypography
                  variant="label"
                  size="medium"
                  prominent
                  className="px-4 py-2 bg-primaryContainer rounded-2xl w-fit "
                >
                  <span className="mr-1 text-outline">Total</span>
                  {eta.diff(etd, ["days", "hours", "minutes"]).days +
                    ` Day(s) (Ocean: ${
                      eta.diff(etd, ["days", "hours", "minutes"]).days -
                      faker.number.int({ min: 1, max: 3 })
                    } Days)`}
                </MdTypography>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
