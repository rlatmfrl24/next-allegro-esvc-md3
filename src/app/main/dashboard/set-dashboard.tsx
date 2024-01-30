import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  DndContext,
  DragEndEvent,
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
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdIconButton, MdOutlinedTextField } from "@/app/util/md3";
import { cardList } from "../util";
import Sortable from "../../components/dnd/sortable";

export default function SetDashboard(props: {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}) {
  const [items, setItems] = useState(cardList);
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
    <Portal selector="#main-container">
      <AnimatePresence>
        {props.isDrawerOpen && (
          <motion.div
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="absolute right-0 top-0 w-[360px] h-[calc(100%-2.5rem)] bg-white z-10 flex flex-col p-3 border-l border-surfaceVariant"
          >
            <div className="flex py-3 items-center">
              <MdTypography
                variant="title"
                size="large"
                className="flex-1 text-primary"
              >
                Set Dashboard
              </MdTypography>
              <MdIconButton onClick={props.toggleDrawer}>
                <MdIcon>
                  <CloseIcon />
                </MdIcon>
              </MdIconButton>
            </div>

            <MdOutlinedTextField placeholder="Search">
              <MdIcon slot="leading-icon">
                <SearchIcon />
              </MdIcon>
            </MdOutlinedTextField>

            <div className="flex items-center">
              <MdIcon className="h-12 w-12 flex items-center justify-center">
                <ArrowDropDownIcon />
              </MdIcon>
              <MdTypography variant="label" size="medium" className="flex-1">
                Dashboard Item
              </MdTypography>
              <MdTypography
                variant="label"
                size="medium"
                className="text-primary mx-8"
              >
                On/Off
              </MdTypography>
            </div>
            <div className="flex flex-col">
              {items.map((item) => (
                <div key={item.id} className="h-12 flex items-center px-6">
                  <MdTypography variant="body" size="large">
                    {item.title}
                  </MdTypography>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
