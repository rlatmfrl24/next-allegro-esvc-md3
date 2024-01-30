"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Sortable from "./sortable";
import Item from "./item";

export default function Dashboard() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [activeId, setActiveId] = useState<string>("");

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

  // Custom collision detection algorithm for Maximum update depth exceeded error
  function customCollisionDetectionAlgorithm(args: any) {
    const closestCornersCollisions = closestCorners(args);
    const closestCenterCollisions = closestCenter(args);
    const pointerWithinCollisions = pointerWithin(args);

    if (
      closestCornersCollisions.length > 0 &&
      closestCenterCollisions.length > 0 &&
      pointerWithinCollisions.length > 0
    ) {
      return pointerWithinCollisions;
    }

    return [];
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
              className={`h-60 shadow flex items-center justify-center bg-gray-100 rounded-md ${
                id % 2 === 0 ? "col-span-2" : ""
              }`}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          // Active item is rendered here
          <Item
            item={{ id: parseInt(activeId) }}
            className={`h-60 shadow flex items-center justify-center bg-gray-100 rounded-md ${
              parseInt(activeId) % 2 === 0 ? "col-span-2" : ""
            }`}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
