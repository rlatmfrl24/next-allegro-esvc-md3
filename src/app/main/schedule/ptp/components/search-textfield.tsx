"use client";

import { getCookie, setCookie } from "cookies-next";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdElevation,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdListItem,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
  MdRippleEffect,
} from "@/app/util/md3";
import {
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
import { CancelOutlined as CancelIcon, Delete } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import styles from "@/app/styles/base.module.css";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const SearchTextField = ({
  itemList,
  selectionItems,
  maxSelectionCount,
  recentCookieKey,
  handleItemSelection,
  ...props
}: {
  itemList: string[];
  selectionItems: string[];
  maxSelectionCount: number;
  recentCookieKey?: string;

  handleItemSelection: Dispatch<SetStateAction<string[]>>;
} & MdOutlinedTextFieldProps) => {
  const [value, setValue] = useState(props.value || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [recommandedItems, setRecommandedItems] = useState<string[]>([]);

  // const recentItems = recentCookieKey
  //   ? (JSON.parse(getCookie(recentCookieKey) || "[]") as string[])
  //   : ([] as string[]);

  const loadRecentItems = useCallback(() => {
    if (recentCookieKey) {
      return JSON.parse(getCookie(recentCookieKey) || "[]") as string[];
    }
    return [];
  }, [recentCookieKey]);

  const [recentItems, setRecentItems] = useState(loadRecentItems());

  function addRecentItems(value: string) {
    const maxRecentItems = 5;

    if (recentCookieKey) {
      const recent = JSON.parse(getCookie(recentCookieKey) || "[]") as string[];
      if (recent.includes(value)) {
        const index = recent.indexOf(value);
        recent.splice(index, 1);
        recent.unshift(value);
      } else {
        recent.unshift(value);
      }

      if (recent.length > maxRecentItems) {
        recent.pop();
      }

      setCookie(recentCookieKey, JSON.stringify(recent), {
        maxAge: 31536000,
      });
    }

    setRecentItems(loadRecentItems());
  }

  function removeRecentItem(value: string) {
    if (recentCookieKey) {
      const recent = JSON.parse(getCookie(recentCookieKey) || "[]") as string[];
      const index = recent.indexOf(value);
      recent.splice(index, 1);
      setCookie(recentCookieKey, JSON.stringify(recent), {
        maxAge: 31536000,
      });
    }

    setRecentItems(loadRecentItems());
  }

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
      handleItemSelection([...selectionItems, item]);
    }
    addRecentItems(item.toUpperCase());
    setValue("");
    setIsMenuOpen(false);
  }

  useEffect(() => {
    handleItemSelection(selectionItems);
  }, [handleItemSelection, selectionItems]);

  const showRecommand = useCallback(() => {
    if (recentItems.length > 0) {
      return true;
    }

    if (value.length > 2) {
      const queryResult = itemList.filter((value) => {
        return value.toLowerCase().includes(value.toLowerCase());
      });

      if (queryResult.length > 0) {
        return true;
      }
    }

    return false;
  }, [itemList, recentItems.length, value.length]);

  return (
    <div ref={containerRef} className="flex flex-1 flex-col gap-2 relative">
      <MdOutlinedTextFieldBase
        {...props}
        error={selectionItems.length > 0 ? false : props.error}
        {...getReferenceProps()}
        ref={refs.setReference}
        value={value}
        disabled={selectionItems.length >= maxSelectionCount}
        placeholder={`Input Up to ${maxSelectionCount} Locations`}
        required={false}
        onFocus={() => {
          setIsMenuOpen(true);
        }}
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
            tabIndex={-1}
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
      {showRecommand() && isMenuOpen && (
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
            {recentItems.length > 0 && (
              <MdTypography
                className="m-3 bg-primaryContainer text-onPrimaryContainer w-fit h-6 px-3 flex items-center rounded-lg"
                variant="label"
                size="medium"
              >
                Reuse a Previous Search
              </MdTypography>
            )}

            {recentItems &&
              recentItems.length > 0 &&
              recentItems.map((item, index) => (
                <>
                  <MdListItem
                    key={item}
                    type="button"
                    className="focus:bg-surfaceContainerHighest focus:outline-none "
                    {...getItemProps()}
                    tabIndex={activeIndex === index ? 0 : -1}
                    ref={(node) => {
                      listRef.current[index] = node;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSelection(item);
                      }
                    }}
                    onClick={() => {
                      handleSelection(item);
                    }}
                  >
                    <MdIcon slot="start">
                      <RestoreIcon />
                    </MdIcon>
                    {highlightText(item, value)}
                    <MdIconButton
                      slot="end"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // remove from recentItems
                        removeRecentItem(item);
                      }}
                    >
                      <MdIcon>
                        <CancelIcon />
                      </MdIcon>
                    </MdIconButton>
                  </MdListItem>
                </>
              ))}
            {recentItems &&
              recentItems.length > 0 &&
              itemList.filter((item) => {
                return item.toLowerCase().includes(value.toLowerCase());
              }).length > 0 &&
              value.length > 2 && (
                <div
                  aria-label="recent-divider"
                  className="h-px w-full bg-outlineVariant"
                ></div>
              )}
            {value.length > 2 &&
              recommandedItems.map((item, index) => (
                <div
                  key={item + "_" + index}
                  className="focus:outline-none focus:bg-surfaceContainerHighest h-12 flex items-center px-3 cursor-pointer relative"
                  tabIndex={
                    activeIndex === index + (recentItems?.length || 0) ? 0 : -1
                  }
                  ref={(node) => {
                    listRef.current[index + (recentItems?.length || 0)] = node;
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
            <div key={item + "_" + index}>
              <MdInputChip
                className={styles.pointChip}
                label={item}
                selected
                remove={() => {
                  handleItemSelection((previous) =>
                    previous.filter((value) => value !== item)
                  );
                }}
              />
            </div>
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
