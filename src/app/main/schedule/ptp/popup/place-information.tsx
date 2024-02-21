import { MdDialog } from "@/app/util/md3";

export default function PlaceInformationDialog({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
}) {
  return (
    <MdDialog
      open={open}
      closed={() => {
        handleOpen(false);
      }}
    >
      <div slot="headline">Place Information</div>
      <div slot="content">
        <div>Place Information</div>
      </div>
    </MdDialog>
  );
}
