import { MdTypography } from "@/app/components/typography";
import ShipRouteIcon from "@/../public/icon_ship_route.svg";
import { useSetRecoilState } from "recoil";
import { BookingRequestStepState } from "@/app/store/booking.store";
import { useRouter } from "next/navigation";
import { LocationScheduleType } from "@/app/util/typeDef/booking";
import { Section } from "../../../information/components/base";

export default function LocationScheduleSection({
  data,
  hasEdit = false,
}: {
  data: LocationScheduleType;
  hasEdit?: boolean;
}) {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const router = useRouter();

  function moveToLocationScheduleStep() {
    setBookingRequestStep((prev) => ({
      ...prev,
      locationSchedule: {
        ...prev.locationSchedule,
        isSelected: true,
      },
    }));
    router.push("/main/booking/request");
  }

  return (
    <Section
      title="Location & Schedule"
      hasEdit={hasEdit}
      editAction={() => {
        moveToLocationScheduleStep();
      }}
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <MdTypography variant="body" size="small" className="text-outline">
          {data.originPort.yardName}
        </MdTypography>
        <MdTypography variant="headline" size="small" className="text-primary">
          {data.originPort.code}
        </MdTypography>
        <div className="w-8 border-b border-outline border-dotted"></div>
        <ShipRouteIcon />
        <div className="w-8 border-b border-outline border-dotted"></div>
        <MdTypography variant="headline" size="small" className="text-primary">
          {data.destinationPort.code}
        </MdTypography>
        <MdTypography variant="body" size="small" className="text-outline">
          {data.destinationPort.yardName}
        </MdTypography>
      </div>
      <div className="flex">
        <SimpleItemComponent
          title="Service Term"
          value={
            (data.originType === "cy" ? "CY" : "Door") +
            " - " +
            (data.destinationType === "cy" ? "CY" : "Door")
          }
        />
        <SimpleItemComponent
          title="Place of Receipt"
          value={data.originPort.code || "N/A"}
        />
        <SimpleItemComponent
          title="Port of Loading"
          value={data.pol.code || "N/A"}
        />
        <SimpleItemComponent
          title="Port of Discharge"
          value={data.pod.code || "N/A"}
        />
        <SimpleItemComponent
          title="Place of Delivery"
          value={data.destinationPort.code || "N/A"}
        />

        <SimpleItemComponent
          title="Booking O.ffice"
          value={data.bookingOffice || "N/A"}
        />
      </div>
    </Section>
  );
}

const SimpleItemComponent = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 flex-1">
      <MdTypography variant="body" size="medium" className="text-outline">
        {title}
      </MdTypography>
      <MdTypography variant="body" size="medium" className="text-onSurface">
        {value}
      </MdTypography>
    </div>
  );
};
