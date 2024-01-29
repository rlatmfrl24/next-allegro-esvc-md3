import { CSSProperties, forwardRef, HTMLAttributes } from "react";

export type TItem = {
  id: number;
};

type Props = {
  item: TItem;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Item = forwardRef<HTMLDivElement, Props>(function Item(
  { item, isDragging, style, ...props },
  ref
) {
  const styles: CSSProperties = {
    cursor: isDragging ? "grabbing" : "grab",
    lineHeight: "0.5",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  };

  return (
    <div ref={ref} style={styles} {...props}>
      {item.id}
    </div>
  );
});

export default Item;
