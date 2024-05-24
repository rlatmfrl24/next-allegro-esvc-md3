import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { MdTypography } from "@/app/components/typography";
import { MdElevation, MdIcon, MdList, MdListItem } from "@/app/util/md3";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown, Check } from "@mui/icons-material";

export const GridSelectComponent = ({
  className,
  initialSelection,
  options,
  onChange,
}: {
  className?: string;
  initialSelection?: string;
  options: string[];
  onChange?: (value: string) => void;
}) => {
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [selection, setSelection] = useState(
    initialSelection ? initialSelection : options[0]
  );
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    options.indexOf(selection)
  );

  const listRef = useRef<any[]>([]);
  const { refs, floatingStyles, context } = useFloating({
    open: isOptionOpen,
    onOpenChange: setIsOptionOpen,
    middleware: [
      offset(2),
      shift(),
      flip(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
          flushSync(() => setMaxHeight(availableHeight - 50));
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 100,
    },
    initial: { opacity: 0, transform: "translateY(-8px)" },
    open: { opacity: 1, transform: "translateY(0)" },
    close: { opacity: 0, transform: "translateY(-8px)" },
  });

  const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useDismiss(context),
      useListNavigation(context, {
        listRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
      }),
    ]
  );

  useEffect(() => {
    if (onChange && selection !== initialSelection) {
      onChange(selection);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  return (
    <>
      <div
        className={`relative p-2 h-full flex items-center cursor-pointer ${
          className ? className : ""
        } ${isOptionOpen ? "" : ""}`}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MdTypography
          variant="body"
          size="medium"
          className="flex-1 h-full flex items-center"
        >
          {selection}
        </MdTypography>
        <MdIcon>
          <ArrowDropDown
            className={`transition duration-300 ${
              isOptionOpen ? "transform rotate-180 " : ""
            }`}
          />
        </MdIcon>
      </div>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-10 outline-none"
          >
            <div
              style={
                {
                  "--md-elevation-level": 3,
                  ...styles,
                } as CSSProperties
              }
              className="relative rounded outline-none"
            >
              <MdElevation />
              <MdList
                className="relative rounded overflow-y-auto outline-none bg-surfaceContainer"
                style={{ maxHeight } as CSSProperties}
              >
                <OverlayScrollbarsComponent defer>
                  {options.map((option, index) => (
                    <MdListItem
                      key={option}
                      tabIndex={activeIndex === index ? 0 : -1}
                      ref={(node) => {
                        listRef.current[index] = node;
                      }}
                      {...getItemProps()}
                      className={`hover:bg-surfaceDim cursor-pointer select-none ${
                        activeIndex === index ? "bg-surfaceDim" : ""
                      } ${selection === option ? "bg-surfaceDim" : ""}`}
                      onClick={() => {
                        setSelectedIndex(index);
                        setSelection(option);
                        setIsOptionOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelectedIndex(index);
                          setSelection(option);
                          setIsOptionOpen(false);
                        }
                      }}
                    >
                      {/* <MdIcon slot="start">
                        {selection === option && <Check />}
                      </MdIcon> */}
                      {option}
                    </MdListItem>
                  ))}
                </OverlayScrollbarsComponent>
              </MdList>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
