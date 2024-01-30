import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HTMLAttributes } from "react";
import Item, { TItem } from "./item";

type Props = {
  item: TItem;
} & HTMLAttributes<HTMLDivElement>;

const Sortable = ({ item, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const styles = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      item={item}
      ref={setNodeRef}
      style={styles}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default Sortable;
