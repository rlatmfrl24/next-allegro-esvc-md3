import { MdTypography } from "@/app/components/typography";
import { MdDialog, MdTextButton } from "@/app/util/md3";
import { Dispatch, SetStateAction } from "react";

export const InvoiceDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
      }}
      className="min-w-fit"
    >
      <div slot="headline">Invoice</div>
      <div slot="content" className="w-[1000px] h-[300px]">
        <div className="bg-surfaceContainerHighest w-full h-full p-3 flex items-center justify-center">
          <MdTypography variant="display" size="large">
            PDF VIEW
          </MdTypography>
        </div>
      </div>
      <div slot="actions">
        <MdTextButton onClick={() => onOpenChange(false)}>Close</MdTextButton>
      </div>
    </MdDialog>
  );
};
