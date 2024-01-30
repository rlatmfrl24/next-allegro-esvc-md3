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
import { dashboardCardState, draggableState } from "../store";
import { customCollisionDetectionAlgorithm } from "@/app/components/dnd/util";
import { cardList } from "../util";
import { DashboardCard, DashboardCardPlaceholder } from "./card";

export default function Dashboard() {
  const [items, setItems] = useState(cardList);
  const [activeId, setActiveId] = useState<string>("");
  const isDraggable = useRecoilValue(draggableState);
  const enabledCardIds = useRecoilValue(dashboardCardState);

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
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over!.id);

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
          {items
            .filter((item) => {
              return enabledCardIds.includes(item.id);
            })
            .map((item) =>
              isDraggable && item.id === activeId ? (
                <div
                  key={item.id}
                  className={`${item.size ? `col-span-${item.size}` : ""}`}
                >
                  <DashboardCardPlaceholder />
                </div>
              ) : (
                <Sortable
                  key={item.id}
                  item={{ id: item.id }}
                  className={item.size ? `col-span-${item.size}` : ""}
                  isDraggable={isDraggable}
                >
                  <DashboardCard title={item.title}>{item.title}</DashboardCard>
                </Sortable>
              )
            )}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          // Active item is rendered here
          <Item item={{ id: parseInt(activeId) }}>
            <div
              className={`h-60 shadow flex items-center justify-center bg-gray-100 rounded-md opacity-80`}
            >
              {items.find((item) => item.id === activeId) ? (
                <DashboardCard
                  title={items.find((item) => item.id === activeId)!.title}
                >
                  {items.find((item) => item.id === activeId)!.title}
                </DashboardCard>
              ) : null}
            </div>
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
