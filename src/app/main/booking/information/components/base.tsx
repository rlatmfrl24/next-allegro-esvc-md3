import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { MdRippleEffect } from "@/app/util/md3";
import { EditOutlined } from "@mui/icons-material";
import classNames from "classnames";

export const Section = ({
  title,
  children,
  hasEdit = false,
  editAction,
}: {
  title: string;
  children: React.ReactNode;
  hasEdit?: boolean;
  editAction?: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center gap-2">
        <DetailTitle title={title} className="flex-1" />
        {hasEdit && (
          <button
            className="relative border border-outlineVariant rounded-full py-1 pl-2 pr-4 flex items-center text-primary gap-0.5"
            onClick={editAction}
          >
            <MdRippleEffect />
            <EditOutlined
              sx={{
                fontSize: "16px",
              }}
            />
            <MdTypography variant="label" size="small">
              Edit
            </MdTypography>
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export const DividerComponent = ({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={classNames(
          "w-px border-r border-r-outlineVariant",
          className
        )}
      ></div>
    );
  }
  return (
    <div
      className={classNames(
        "w-full h-px border-b border-b-outlineVariant",
        className
      )}
    ></div>
  );
};
