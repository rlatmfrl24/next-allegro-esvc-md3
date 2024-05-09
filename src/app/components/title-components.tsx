import { MdIcon, MdIconButton } from "../util/md3";
import { MdTypography } from "./typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PageTitle({
  title,
  hasFavorite = true,
}: {
  title: string;
  hasFavorite?: boolean;
}) {
  return (
    <div
      aria-label="page-title"
      className="flex justify-start items-center gap-3"
    >
      <MdTypography variant="title" size="large">
        {title}
      </MdTypography>
      {hasFavorite && (
        <MdIconButton>
          <MdIcon>
            <FavoriteBorderIcon />
          </MdIcon>
        </MdIconButton>
      )}
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
      <MdTypography
        variant="body"
        size="large"
        prominent
        className="whitespace-nowrap"
      >
        {title}
      </MdTypography>
    </div>
  );
};
