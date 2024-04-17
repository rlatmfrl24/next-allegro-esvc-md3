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
  isPinned = false,
}: {
  header: Header<any, any>;
  disabled: boolean;
  isPinned?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // const headerStyles = isPinned ? getCommonPinningStyles(header.column) :
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
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
      className="max-h-14 h-14"
    >
      <div className="h-full flex items-center">
        <div
          className="flex-1 flex justify-between items-center h-full"
          {...attributes}
          {...listeners}
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
        {header.column.getCanSort() &&
          (isHovered || header.column.getIsSorted()) && (
            <MdIconButton
              disabled={disabled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                header.column.toggleSorting();
              }}
              className="z-10 min-w-10"
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
          className={`w-2 h-[calc(100%-16px)] cursor-col-resize border-r border-r-outlineVariant`}
        ></div>
      </div>
    </th>
  );
};
