import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";

export type TItem = {
  id: number | string;
  className?: string;
  children?: React.ReactNode;
};

type Props = {
  item: TItem;
  isDragging?: boolean;
  draggable?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(function Item(
  { item, isDragging, style, ...props },
  ref
) {
  const styles: CSSProperties = {
    cursor: props.draggable ? (isDragging ? "grabbing" : "grab") : "default",
    lineHeight: "0.5",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  };

  return (
    <div ref={ref} style={styles} {...props}>
      {props.children}
    </div>
  );
});

export default Item;
