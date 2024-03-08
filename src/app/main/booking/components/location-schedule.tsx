import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";

export default function LocationScheduleSection({
  hasEdit = false,
}: {
  hasEdit?: boolean;
}) {
  return (
    <Section title="Location & Schedule" hasEdit={hasEdit}>
      <div className="flex">
        <SimpleItemComponent title="Service Term" value="CY - CY" />
        <SimpleItemComponent title="Port of Loading" value="CHSHA" />
        <SimpleItemComponent title="Port of Discharge" value="SISIN" />
        <SimpleItemComponent title="Departure Date" value="2024-03-10" />
        <SimpleItemComponent title="Contract Number" value="C2201121" />
        <SimpleItemComponent
          title="Booking Office"
          value="Busan Branch Office"
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
