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

export const SubTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${className ? className : ""}`}>
      <div className="w-1 h-4 bg-primary"></div>
      <MdTypography variant="body" size="large">
        {title}
      </MdTypography>
    </div>
  );
};

export const DetailTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${className ? className : ""}`}>
      <div className="h-4 w-1 bg-primary rounded-r-sm"></div>
      <MdTypography variant="body" size="large" prominent>
        {title}
      </MdTypography>
    </div>
  );
};
