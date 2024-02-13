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
  arraySwap,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Sortable from "../../components/dnd/sortable";
import Item from "../../components/dnd/item";
import { useRecoilValue } from "recoil";
import { dashboardCardState, draggableState } from "../store";
import { customCollisionDetectionAlgorithm } from "@/app/components/dnd/util";
import { cardList } from "../../util/constants";
import { DashboardCardConstructor, DashboardCardPlaceholder } from "./card";
import styles from "../main.module.css";

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

        return arraySwap(items, oldIndex, newIndex);
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
                  className={
                    {
                      1: styles["sortable"],
                      2: styles["sortable-wide"],
                    }[item.size]
                  }
                >
                  <DashboardCardPlaceholder />
                </div>
              ) : (
                <Sortable
                  key={item.id}
                  item={{ id: item.id }}
                  className={
                    {
                      1: styles["sortable"],
                      2: styles["sortable-wide"],
                    }[item.size]
                  }
                  draggable={isDraggable}
                >
                  <DashboardCardConstructor item={item} />
                </Sortable>
              )
            )}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          // Active item is rendered here
          <Item item={{ id: parseInt(activeId) }}>
            <div className="opacity-80">
              {items.find((item) => item.id === activeId) ? (
                <DashboardCardConstructor
                  item={items.find((item) => item.id === activeId)!}
                />
              ) : null}
            </div>
          </Item>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
