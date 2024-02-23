"use client";

import {
  MdChipSet,
  MdElevation,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
  MdRippleEffect,
} from "@/app/util/md3";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import {
  FloatingFocusManager,
  autoUpdate,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { MdTypography } from "@/app/components/typography";
import ClearIcon from "@mui/icons-material/Clear";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const SearchTextField = ({
  itemList,
  selectionItems,
  maxSelectionCount,
  handleItemSelection,
  ...props
}: {
  itemList: string[];
  selectionItems: string[];
  maxSelectionCount: number;
  handleItemSelection: Dispatch<SetStateAction<string[]>>;
} & MdOutlinedTextFieldProps) => {
  const [value, setValue] = useState(props.value || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [recommandedItems, setRecommandedItems] = useState<string[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [
      offset(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNavigation]
  );

  function handleSelection(item: string) {
    if (
      selectionItems.length < maxSelectionCount &&
      !selectionItems.includes(item)
    ) {
      // setSelectionItems([...selectionItems, item]);
      handleItemSelection([...selectionItems, item]);
    }
    setValue("");
    setIsMenuOpen(false);
  }

  useEffect(() => {
    handleItemSelection(selectionItems);
  }, [handleItemSelection, selectionItems]);

  return (
    <div ref={containerRef} className="relative flex flex-1 flex-col gap-2">
      <MdOutlinedTextFieldBase
        {...props}
        error={selectionItems.length > 0 ? false : props.error}
        {...getReferenceProps()}
        ref={refs.setReference}
        className=""
        value={value}
        disabled={selectionItems.length >= maxSelectionCount}
        placeholder={`Input Up to ${maxSelectionCount} Locations`}
        required={false}
        onInput={(e) => {
          const targetValue = (e.target as HTMLInputElement).value;
          if (
            targetValue.length > 2 &&
            itemList.filter((item) =>
              item.toLowerCase().includes(targetValue.toLowerCase())
            ).length > 0
          ) {
            setRecommandedItems(
              itemList.filter((item) =>
                item.toLowerCase().includes(targetValue.toLowerCase())
              )
            );
            setIsMenuOpen(true);
          } else {
            setRecommandedItems([]);
            setIsMenuOpen(false);
          }

          setValue(targetValue);
        }}
      >
        <MdIcon slot="leading-icon">
          <PlaceOutlinedIcon />
        </MdIcon>
        {value !== "" && (
          <MdIconButton
            slot="trailing-icon"
            onClick={() => {
              setValue("");
            }}
          >
            <MdIcon>
              <CancelIcon />
            </MdIcon>
          </MdIconButton>
        )}
      </MdOutlinedTextFieldBase>
      {isMenuOpen && (
        <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
          <div
            ref={refs.setFloating}
            style={
              {
                "--md-elevation-level": 2,
                ...floatingStyles,
              } as CSSProperties
            }
            {...getFloatingProps()}
            className="relative z-50 bg-surfaceContainer rounded py-2 focus:outline-none"
          >
            <MdElevation />
            <div className="max-h-[600px] overflow-auto">
              {recommandedItems.map((item, index) => (
                <div
                  key={item + "_" + index}
                  className="focus:outline-none focus:bg-surfaceContainerHighest h-12 flex items-center px-3 cursor-pointer relative"
                  tabIndex={activeIndex === index ? 0 : -1}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  {...getItemProps()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSelection(item);
                    }
                  }}
                  onClick={() => {
                    handleSelection(item);
                  }}
                >
                  <MdRippleEffect />
                  {highlightText(item, value)}
                </div>
              ))}
            </div>
          </div>
        </FloatingFocusManager>
      )}

      <MdTypography
        variant="label"
        size="large"
        className="text-error absolute top-0.5 left-1.5"
      >
        *
      </MdTypography>
      <MdChipSet>
        {selectionItems.map((item, index) => {
          return (
            <CustomChip
              key={item + "_" + index}
              label={item}
              onDelete={() => {
                // setSelectionItems((previous) =>
                //   previous.filter((value) => value !== item)
                // );
                handleItemSelection((previous) =>
                  previous.filter((value) => value !== item)
                );
              }}
            />
          );
        })}
      </MdChipSet>
    </div>
  );
};

function highlightText(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <MdTypography variant="body" size="large" className="flex-1">
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? "text-error"
                : "text-onSurface"
            }
          >
            {part}
          </span>
        ))}
      </span>
    </MdTypography>
  );
}

const CustomChip = ({
  label,
  onDelete,
}: {
  label: string;
  onDelete?: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="bg-secondaryContainer h-8 flex items-center min-h-8 pl-3 pr-2 rounded-lg gap-2 whitespace-nowrap">
      <MdTypography
        variant="label"
        size="large"
        className="text-onSecondaryContainer"
      >
        {label}
      </MdTypography>
      <div
        className="relative w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          onDelete?.(label);
        }}
      >
        <MdRippleEffect />
        <ClearIcon
          sx={{
            fontSize: 18,
          }}
        />
      </div>
    </div>
  );
};
