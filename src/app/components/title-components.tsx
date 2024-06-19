import { useParams } from "next/navigation";
import { MdIcon, MdIconButton } from "../util/md3";
import { MdTypography } from "./typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRecoilState } from "recoil";
import { FavoriteState } from "../store/global.store";
import { Favorite } from "@mui/icons-material";

export default function PageTitle({
  title,
  category,
  href,
  hasFavorite = true,
}: {
  title: string;
  category?: string;
  href?: string;
  hasFavorite?: boolean;
}) {
  const [favoriteStore, setFavoriteStore] = useRecoilState(FavoriteState);

  return (
    <div
      aria-label="page-title"
      className="flex justify-start items-center gap-3"
    >
      <MdTypography variant="title" size="large">
        {title}
      </MdTypography>
      {hasFavorite && (
        <MdIconButton
          onClick={(e) => {
            if (favoriteStore.some((item) => item.title === title)) {
              setFavoriteStore(
                favoriteStore.filter((item) => item.title !== title)
              );
            } else {
              setFavoriteStore([
                ...favoriteStore,
                {
                  title: title,
                  category: category ? category : "",
                  href: href ? href : "",
                },
              ]);
            }
          }}
        >
          <MdIcon>
            {favoriteStore.some((item) => item.title === title) ? (
              <Favorite className="text-primary" />
            ) : (
              <FavoriteBorderIcon />
            )}
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
      <MdTypography variant="body" size="large" className="whitespace-nowrap">
        {title}
      </MdTypography>
    </div>
  );
};

export const DetailTitle = ({
  title,
  className,
  required,
}: {
  title: string;
  className?: string;
  required?: boolean;
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
        {required && <span className="text-error mr-1">*</span>}
        {title}
      </MdTypography>
    </div>
  );
};
