"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HTMLAttributes } from "react";
import Item, { TItem } from "./item";

type Props = {
  item: TItem;
  className?: string;
  draggable?: boolean;
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Sortable = ({ item, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });
  const draggable = props.draggable === undefined ? true : props.draggable;

  const styles = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      item={item}
      ref={draggable ? setNodeRef : undefined}
      style={styles}
      {...props}
      {...attributes}
      {
        //add listeners to the element if it is draggable
        ...(draggable ? listeners : {})
      }
    >
      {props.children}
    </Item>
  );
};

export default Sortable;
