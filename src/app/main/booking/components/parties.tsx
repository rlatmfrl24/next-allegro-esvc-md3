import { MdTypography } from "@/app/components/typography";
import { Section } from "./base";
import { PartiesType } from "@/app/util/typeDef";

export default function PartiesSection({
  data,
  hasEdit,
}: {
  hasEdit?: boolean;
  data: PartiesType;
}) {
  return (
    <Section title="Parties" hasEdit={hasEdit}>
      <div className="grid grid-cols-[240px_1fr] gap-4">
        <MdTypography variant="body" size="medium" className="text-outline">
          Shipper
        </MdTypography>
        <div>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.shipper.name || "N/A"}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            {data.shipper.address || "N/A"}
          </MdTypography>
        </div>

        <MdTypography variant="body" size="medium" className="text-outline">
          Freight Forwarder
        </MdTypography>
        <div>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.freightForwarder.name || "N/A"}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            {data.freightForwarder.address || "N/A"}
          </MdTypography>
        </div>

        <MdTypography variant="body" size="medium" className="text-outline">
          Consignee
        </MdTypography>
        <div>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.consignee.name || "N/A"}
          </MdTypography>
          <MdTypography variant="body" size="medium" className="text-outline">
            {data.consignee.address || "N/A"}
          </MdTypography>
        </div>
        <MdTypography variant="body" size="medium" className="text-outline">
          Actual Shipper
        </MdTypography>
        <div>
          <MdTypography variant="body" size="medium" className="text-onSurface">
            {data.actualShipper || "N/A"}
          </MdTypography>
        </div>
      </div>
    </Section>
  );
}
