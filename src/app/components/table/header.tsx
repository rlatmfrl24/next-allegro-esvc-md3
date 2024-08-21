import { useSortable } from "@dnd-kit/sortable";
import { ArrowUpward } from "@mui/icons-material";
import { Header, flexRender } from "@tanstack/react-table";
import { useState, CSSProperties } from "react";
import { MdTypography } from "../typography";
import { getCommonPinningStyles } from "./util";
import { MdIconButton } from "@/app/util/md3";
import { CSS } from "@dnd-kit/utilities";

export const HeaderComponent = ({
  header,
  disabled,
  required = false,
  isPinned = false,
}: {
  header: Header<any, any>;
  disabled: boolean;
  required?: boolean;
  isPinned?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // const headerStyles = isPinned ? getCommonPinningStyles(header.column) :
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.id,
    });

  const draggableStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
  };

  const headerStyles = isPinned
    ? getCommonPinningStyles(header.column)
    : draggableStyles;

  return (
    <th
      style={{
        width: `calc(var(--header-${header?.id}-size) * 1px)`,
        ...headerStyles,
      }}
      ref={setNodeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative max-h-14 h-14 ${isPinned ? "z-30" : ""}`}
    >
      <div className="h-full flex items-center">
        <div
          {...attributes}
          {...listeners}
          className={`flex-1 flex justify-between items-center h-full ${
            isDragging ? "cursor-move" : "cursor-default"
          }`}
        >
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="p-2 flex-1 select-none"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </MdTypography>
        </div>

        {header.column.getCanSort() && (
          <MdIconButton
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              header.column.toggleSorting();
            }}
            className={`z-10 min-w-10 ${
              header.column.getIsSorted() === false && !isHovered
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            <ArrowUpward
              fontSize="small"
              className={`${
                header.column.getIsSorted() === false
                  ? "text-gray-400"
                  : header.column.getIsSorted() === "asc"
                  ? "rotate-0 text-primary"
                  : "rotate-180 text-primary"
              }`}
            />
          </MdIconButton>
        )}

        <div
          onMouseDown={(e) => {
            // table.resetRowSelection();
            header.getResizeHandler()(e);
          }}
          onTouchStart={(e) => {
            // table.resetRowSelection();
            header.getResizeHandler()(e);
          }}
          className={`absolute right-0 z-20 w-3 h-[calc(100%-16px)] cursor-col-resize border-r ${
            header.column.getIsPinned() && header.column.getIsLastColumn("left")
              ? "border-r-onSurfaceVariant"
              : "border-r-outlineVariant"
          }`}
        ></div>
        {required && (
          <MdTypography
            variant="body"
            size="medium"
            className="absolute top-2 left-2 text-error"
          >
            *
          </MdTypography>
        )}
      </div>
    </th>
  );
};
