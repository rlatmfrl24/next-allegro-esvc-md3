import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import { useRecoilValue } from "recoil";
import { draggableState } from "../store";

export type TItem = {
  id: number;
  title?: string;
  tooltip?: string;
  children?: React.ReactNode;
};

type Props = {
  item: TItem;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(function Item(
  { item, isDragging, style, ...props },
  ref
) {
  const isDraggable = useRecoilValue(draggableState);

  const styles: CSSProperties = {
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
    lineHeight: "0.5",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  };

  return (
    <div
      ref={ref}
      style={styles}
      {...props}
      className={`h-60 shadow flex items-center justify-center bg-gray-100 rounded-md ${
        item.id % 2 === 0 ? "col-span-2" : ""
      }`}
    >
      {item.id}
    </div>
  );
});

export default Item;
