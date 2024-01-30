"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HTMLAttributes } from "react";
import Item, { TItem } from "./item";
import { useRecoilValue } from "recoil";
import { draggableState } from "../store";

type Props = {
  item: TItem;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Sortable = ({ item, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const isDraggable = useRecoilValue(draggableState);

  const styles = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      item={item}
      ref={isDraggable ? setNodeRef : undefined}
      style={styles}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default Sortable;
