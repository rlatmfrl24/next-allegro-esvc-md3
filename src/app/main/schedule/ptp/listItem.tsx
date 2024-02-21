import { MdTypography } from "@/app/components/typography";
import { MdElevationButton, MdFilledButton } from "@/app/util/md3";
import { VariableElavatedButton } from "@/app/components/variable-buttons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VesselIcon from "@/../public/icon_vessel.svg";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ListItemType } from "@/app/util/typeDef";
import { useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import PlaceInformationDialog from "./popup/place-information";
import Portal from "@/app/components/portal";
import { faker } from "@faker-js/faker";

export default function ListItem({ item }: { item: ListItemType }) {
  const [isCutOffTooltipOpen, setIsCutOffTooltipOpen] = useState(false);
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

  const { refs, floatingStyles, context } = useFloating({
    open: isCutOffTooltipOpen,
    onOpenChange: setIsCutOffTooltipOpen,
    placement: "bottom-start",
    middleware: [flip(), shift(), offset(8)],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="relative border-outlineVariant border rounded-xl p-6 flex gap-12">
      <div className="flex-1 flex flex-col gap-4">
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
            <div
              ref={refs.setReference}
              {...getReferenceProps}
              onClick={() => {
                setIsCutOffTooltipOpen(!isCutOffTooltipOpen);
              }}
            >
              <VariableElavatedButton
                className="mt-1"
                size="x-small"
                icon={
                  <AccessTimeIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                }
              >
                Cut Off
              </VariableElavatedButton>
              <AnimatePresence>
                {isCutOffTooltipOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps}
                    className="z-10"
                  >
                    <RichTooltipContainer>
                      <RichTooltipItem
                        slot="content"
                        title="Documentation"
                        supportingText="2021-09-01 12:00"
                      />
                      <RichTooltipItem
                        slot="content"
                        title="EDI"
                        supportingText="2021-09-01 12:00"
                      />
                      <RichTooltipItem
                        slot="content"
                        title="Cargo"
                        supportingText="2021-09-01 12:00"
                      />
                    </RichTooltipContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
      <div className="flex flex-col gap-2">
        <MdFilledButton>Booking</MdFilledButton>
        <MdElevationButton>
          <div slot="icon">
            <ExpandMoreOutlinedIcon fontSize="small" />
          </div>
          Details
        </MdElevationButton>
      </div>
      <Portal selector="#main-container">
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
      </Portal>
    </div>
  );
}
