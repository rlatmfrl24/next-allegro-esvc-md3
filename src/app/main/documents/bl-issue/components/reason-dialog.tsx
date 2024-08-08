import { MdDialog, MdTextButton } from "@/app/util/md3";
import { BLIssueRequestTableProps } from "@/app/util/typeDef/documents";
import { Dispatch, SetStateAction } from "react";
import { BLStateCell } from "./bl-state";
import { MdTypography } from "@/app/components/typography";
import { faker } from "@faker-js/faker";

export const ReasonDialog = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: BLIssueRequestTableProps;
}) => {
  return (
    <MdDialog
      open={open}
      closed={() => onOpenChange(false)}
      className="min-w-fit"
    >
      <div slot="headline">B/L Issue Request</div>
      <div slot="content">
        <div className="flex gap-2">
          <BLStateCell state={data.status} />
          <MdTypography variant="body" size="large">
            {data.bookingNumber}
          </MdTypography>
        </div>
        <div className="grid grid-cols-[120px_1fr] border rounded p-4 gap-2 mt-3">
          <MdTypography variant="body" size="large" className="text-outline">
            B/L Type
          </MdTypography>
          <MdTypography variant="body" size="large">
            {data.blType}
          </MdTypography>
          <MdTypography variant="body" size="large" className="text-outline">
            VVD
          </MdTypography>
          <MdTypography variant="body" size="large">
            {data.vvd.vesselName}
          </MdTypography>
          <MdTypography variant="body" size="large" className="text-outline">
            POL ETB
          </MdTypography>
          <MdTypography variant="body" size="large">
            {data.polEtb.toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
          <MdTypography variant="body" size="large" className="text-outline">
            POL ETD
          </MdTypography>
          <MdTypography variant="body" size="large">
            {data.polEtd.toFormat("yyyy-MM-dd HH:mm")}
          </MdTypography>
        </div>
        <p className="max-w-[600px] mt-3">{faker.lorem.paragraphs(3)}</p>
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Close
        </MdTextButton>
      </div>
    </MdDialog>
  );
};
