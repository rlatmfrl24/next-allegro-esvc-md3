import { MdFilterChip, MdTextButton } from "@/app/util/md3";
import ListItem from "./components/listItem";
import DownloadIcon from "@mui/icons-material/Download";
import { PtPScheduleType, VesselInfoType } from "@/app/util/typeDef/schedule";
import { MdTypography } from "@/app/components/typography";
import { FilterChipMenu } from "@/app/components/filter-chip-menu";
import {
  usePlaceInfoDialog,
  useVesselInfoDialog,
  useVesselScheduleDialog,
} from "@/app/components/common-dialog-hooks";

export default function PointToPointListResult({
  list,
}: {
  list: PtPScheduleType[];
}) {
  const {
    renderDialog,
    setCurrentVessel: setVesselForScheduleDialog,
    setIsVesselScheduleDialogOpen,
  } = useVesselScheduleDialog();
  const {
    renderDialog: renderPlaceDialog,
    setCurrentPlace,
    setIsPlaceInfoDialogOpen,
  } = usePlaceInfoDialog();
  const {
    renderDialog: renderVesselDialog,
    setCurrentVessel,
    setIsVesselInfoDialogOpen,
  } = useVesselInfoDialog();

  function handleVesselScheduleClick(vessel: VesselInfoType) {
    setVesselForScheduleDialog(vessel);
    setIsVesselScheduleDialogOpen(true);
  }

  function handleVesselInfoClick(vessel: VesselInfoType) {
    setCurrentVessel(vessel);
    setIsVesselInfoDialogOpen(true);
  }

  function handlePlaceInfoClick(place: any) {
    setCurrentPlace(place);
    setIsPlaceInfoDialogOpen(true);
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MdTextButton>
            <div slot="icon">
              <DownloadIcon fontSize="small" />
            </div>
            Download
          </MdTextButton>

          <FilterChipMenu
            initialValue="Earliest Departure"
            options={[
              "Earliest Departure",
              "Earliest Arrival",
              "Fatest Transit Time",
            ]}
          />

          <MdFilterChip label="Direct Only" />
        </div>

        <MdTypography variant="label" size="large" className="text-outline ">
          Total: {list.length}
        </MdTypography>
      </div>
      {renderDialog()}
      {renderPlaceDialog()}
      {renderVesselDialog()}
      <div className="flex flex-col gap-4">
        {list.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onVesselScheduleClick={(vessel) => {
              handleVesselScheduleClick(vessel);
            }}
            onVesselInformationClick={(vessel) => {
              handleVesselInfoClick(vessel);
            }}
            onPlaceInformationClick={(place) => {
              handlePlaceInfoClick(place);
            }}
          />
        ))}
      </div>
    </div>
  );
}
