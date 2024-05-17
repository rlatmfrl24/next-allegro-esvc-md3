import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { useSetRecoilState } from "recoil";
import { BookingRequestStepState } from "@/app/store/booking.store";
import { useRouter } from "next/navigation";
import { CargoPickUpReturnType } from "@/app/util/typeDef/boooking";

export default function CargoSection({
  data,
  hasEdit,
}: {
  hasEdit?: boolean;
  data: CargoPickUpReturnType;
}) {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const router = useRouter();

  function moveToCargoStep() {
    setBookingRequestStep((prev) => ({
      ...prev,
      cargoPickUpReturn: {
        ...prev.cargoPickUpReturn,
        isSelected: true,
      },
    }));
    router.push("/main/booking/request");
  }

  return (
    <Section
      title="Cargo"
      hasEdit={hasEdit}
      editAction={() => {
        moveToCargoStep();
      }}
    >
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Commodty
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.commodity.description}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Total Estimated Gross Weight
        </MdTypography>
        <div className="flex gap-2">
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.grossWeight}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            {data.grossWeightUnit}
          </MdTypography>
        </div>
        <MdTypography variant="body" size="medium" className="text-outline">
          Empty Pick Up Date
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.emptyPickUpDate?.toFormat("yyyy-MM-dd HH:mm") ?? "-"}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Empty Pick Up CY/Depot (Prefered)
        </MdTypography>
        <div>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.emptyPickUpLocation.yardName}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            {data.emptyPickUpLocation.address}
          </MdTypography>
        </div>
        <MdTypography variant="body" size="medium" className="text-outline">
          Full Container Return Date
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-onSurface">
          {data.fullReturnDate?.toFormat("yyyy-MM-dd") ?? "-"}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline">
          Full Container Return CY
        </MdTypography>
        <div>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.fullReturnLocation.yardName}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            {data.fullReturnLocation.address}
          </MdTypography>
        </div>
      </div>
    </Section>
  );
}
