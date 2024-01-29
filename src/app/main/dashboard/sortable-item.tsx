import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HTMLAttributes } from "react";
import Item, { TItem } from "./item";

type Props = {
  item: TItem;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  console.log(styles);

  return (
    <Item
      item={item}
      ref={setNodeRef}
      style={styles}
      {...props}
      {...attributes}
      {...listeners}
      className="h-12"
    />
  );
};

export default SortableItem;
