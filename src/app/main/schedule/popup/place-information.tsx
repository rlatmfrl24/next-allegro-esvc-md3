import { MdTypography } from "@/app/components/typography";
import { MdDialog, MdTextButton } from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef";

export default function PlaceInformationDialog({
  open,
  handleOpen,
  data,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  data: PlaceInformationType;
}) {
  const RowItem = ({ title, value }: { title: string; value: string }) => {
    return (
      <>
        <div className="bg-surfaceVariant h-9 flex items-center px-2">
          <MdTypography variant="body" size="medium">
            {title}
          </MdTypography>
        </div>
        <div className="bg-surfaceContainerLowest h-9 flex items-center px-2">
          <MdTypography variant="body" size="medium">
            {value}
          </MdTypography>
        </div>
      </>
    );
  };

  return (
    <MdDialog
      open={open}
      closed={() => {
        handleOpen(false);
      }}
      className="min-w-[720px]"
    >
      <div slot="headline">Place Information</div>
      <div slot="content">
        <div className="grid grid-cols-[200px_1fr] border border-outlineVariant bg-outlineVariant gap-px">
          <RowItem title="Yard Name" value={data.yardName} />
          <RowItem title="Address" value={data.address} />
          <RowItem title="Phone No" value={data.phoneNo} />
          <RowItem title="Fax No" value={data.faxNo} />
          <RowItem title="Customer No" value={data.customerNo} />
          <RowItem title="E-Mail Address" value={data.emailAddress} />
        </div>
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            handleOpen(false);
          }}
        >
          Close
        </MdTextButton>
      </div>
    </MdDialog>
  );
}
