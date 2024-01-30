"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Sortable from "../../components/dnd/sortable";
import Item from "../../components/dnd/item";
import { useRecoilValue } from "recoil";
import { draggableState } from "../store";
import { customCollisionDetectionAlgorithm } from "@/app/components/dnd/util";

export default function Dashboard() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [activeId, setActiveId] = useState<string>("");
  const isDraggable = useRecoilValue(draggableState);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragOver(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(parseInt(active.id.toString()));
        const newIndex = items.indexOf(parseInt(over!.id.toString()));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Drag Handlers for DragOverlay
  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId("");
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={customCollisionDetectionAlgorithm}
    >
      <SortableContext items={items} strategy={() => null}>
        <div className="grid grid-cols-4 gap-4">
          {items.map((id) => (
            <Sortable
              key={id}
              item={{ id }}
              className={id % 2 === 0 ? "col-span-2" : ""}
              isDraggable={isDraggable}
            >
              <div
                className={`h-60 shadow flex items-center justify-center bg-gray-100 rounded-md`}
              >
                {id}
              </div>
            </Sortable>
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          // Active item is rendered here
          <Item item={{ id: parseInt(activeId) }}>
            <div
              className={`h-60 shadow flex items-center justify-center bg-gray-100 rounded-md`}
            >
              {activeId}
            </div>
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
