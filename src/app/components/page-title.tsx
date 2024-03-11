import { MdIcon, MdIconButton } from "../util/md3";
import { MdTypography } from "./typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PageTitle({ title }: { title: string }) {
  return (
    <div
      aria-label="page-title"
      className="flex justify-start items-center gap-3"
    >
      <MdTypography variant="title" size="large">
        {title}
      </MdTypography>
      <MdIconButton>
        <MdIcon>
          <FavoriteBorderIcon />
        </MdIcon>
      </MdIconButton>
    </div>
  );
}
