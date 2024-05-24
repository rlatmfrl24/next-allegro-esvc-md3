import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "../util/md3";
import {
  autoUpdate,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { MdTypography } from "./typography";
import RestoreIcon from "@mui/icons-material/Restore";
import { getCookie, setCookie } from "cookies-next";
import { flushSync } from "react-dom";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export default function NAOutlinedAutoComplete({
  itemList,
  icon,
  required,
  recentCookieKey,
  initialValue,
  onItemSelection: onSelection,
  onQueryChange,
  isAllowOnlyListItems = true,
  removeQueryOnSelect = false,
  className,
  maxInputLength,
  showAllonFocus = false,
  maxListHeight = 600,
  ...props
}: {
  itemList: string[];
  required?: boolean;
  recentCookieKey?: string;
  icon?: React.ReactNode;
  initialValue?: string;
  onItemSelection?: (value: string) => void;
  onQueryChange?: (value: string) => void;
  isAllowOnlyListItems?: boolean;
  removeQueryOnSelect?: boolean;
  maxListHeight?: number;
  maxInputLength?: number;
  showAllonFocus?: boolean;
  className?: string;
} & MdOutlinedTextFieldProps) {
  const [query, setQuery] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState(initialValue || "");
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState(maxListHeight);

  const recentItems = useMemo(() => {
    return recentCookieKey
      ? (JSON.parse(getCookie(recentCookieKey) || "[]") as string[])
      : ([] as string[]);
  }, [recentCookieKey]);

  function setRecentItems(value: string) {
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
  }

  const listRef = useRef<any[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: isListOpen,
    onOpenChange: setIsListOpen,
    middleware: [
      offset(2),
      shift(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
          flushSync(() => {
            setMaxHeight(availableHeight);
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNavigation, focus]
  );

  useEffect(() => {
    //when list is close, reset the value to default value
    if (!isListOpen && isAllowOnlyListItems) {
      setQuery(defaultValue);
    }
  }, [defaultValue, isAllowOnlyListItems, isListOpen, setQuery]);

  useEffect(() => {
    setQuery(initialValue || "");
    setDefaultValue(initialValue || "");
  }, [initialValue]);

  // useEffect(() => {
  //   onQueryChange?.(query);
  // }, [query, onQueryChange]);

  function handleItemSelect(item: string) {
    let returnValue = item;

    if (maxInputLength && item.length > maxInputLength) {
      returnValue = item.slice(0, maxInputLength);
    }

    if (removeQueryOnSelect) {
      setQuery("");
      setDefaultValue("");
    } else {
      setQuery(returnValue);
      setDefaultValue(returnValue);
    }
    setIsListOpen(false);
    onSelection?.(returnValue);
    item !== "" && setRecentItems(returnValue);
  }

  const showRecommand = useCallback(() => {
    if (props.readOnly) {
      return false;
    }

    if (
      recentItems.filter((item) => {
        return item.toLowerCase().includes(query.toLowerCase());
      }).length > 0
    ) {
      return true;
    }

    if (query.length > 2 || showAllonFocus) {
      const queryResult = itemList.filter((value) => {
        return value.toLowerCase().includes(query.toLowerCase());
      });

      if (queryResult.length > 0) {
        return true;
      }
    }

    return false;
  }, [itemList, props.readOnly, query, recentItems, showAllonFocus]);

  return (
    <div className={`relative ${className}`}>
      <MdOutlinedTextFieldBase
        {...props}
        ref={refs.setReference}
        {...getReferenceProps()}
        value={query}
        className={`w-full ${props.readOnly ? "bg-surfaceContainer" : ""}`}
        required={false}
        onInput={(e) => {
          if (maxInputLength && e.currentTarget.value.length > maxInputLength) {
            e.currentTarget.value = e.currentTarget.value.slice(
              0,
              maxInputLength
            );
          }

          setQuery(e.currentTarget.value);
          onQueryChange?.(e.currentTarget.value);
        }}
      >
        {icon && <MdIcon slot="leading-icon">{icon}</MdIcon>}
        <div slot="trailing-icon" className="mr-2">
          {query !== "" && !props.readOnly && (
            <MdIconButton
              onClick={() => {
                handleItemSelect("");
              }}
            >
              <MdIcon>
                <CancelIcon />
              </MdIcon>
            </MdIconButton>
          )}
        </div>
      </MdOutlinedTextFieldBase>
      {showRecommand() && isListOpen && (
        <div
          ref={refs.setFloating}
          style={
            {
              "--md-elevation-level": 2,
              ...floatingStyles,
            } as CSSProperties
          }
          {...getFloatingProps()}
          className="relative z-50 bg-surfaceContainerLow rounded focus:outline-none"
        >
          <MdElevation />
          <MdList
            style={{ maxHeight: maxHeight - 10 }}
            className="relative overflow-y-auto rounded bg-surfaceContainerLow"
          >
            <OverlayScrollbarsComponent defer>
              {recentItems &&
                recentItems.length > 0 &&
                recentItems
                  .filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase());
                  })
                  .sort((a, b) => {
                    //sort by matched index
                    const aIndex = a.toLowerCase().indexOf(query.toLowerCase());
                    const bIndex = b.toLowerCase().indexOf(query.toLowerCase());
                    if (aIndex < bIndex) {
                      return -1;
                    } else if (aIndex > bIndex) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                  .map((item, index) => (
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
                          handleItemSelect(item);
                        }
                      }}
                      onClick={() => {
                        handleItemSelect(item);
                      }}
                    >
                      <MdIcon slot="start">
                        <RestoreIcon />
                      </MdIcon>
                      {highlightText(item, query)}
                    </MdListItem>
                  ))}
              {recentItems &&
                recentItems.filter((item) => {
                  return item.toLowerCase().includes(query.toLowerCase());
                }).length > 0 &&
                itemList.filter((item) => {
                  return item.toLowerCase().includes(query.toLowerCase());
                }).length > 0 &&
                query.length > 2 && (
                  <div
                    aria-label="recent-divider"
                    className="h-px w-full bg-outlineVariant"
                  ></div>
                )}
              {(showAllonFocus || query.length > 2) &&
                itemList
                  .filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase());
                  })
                  .sort((a, b) => {
                    //sort by matched index
                    const aIndex = a.toLowerCase().indexOf(query.toLowerCase());
                    const bIndex = b.toLowerCase().indexOf(query.toLowerCase());
                    if (aIndex < bIndex) {
                      return -1;
                    } else if (aIndex > bIndex) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                  .map((item, index) => (
                    <MdListItem
                      key={item}
                      type="button"
                      className="focus:bg-surfaceContainerHighest focus:outline-none"
                      {...getItemProps()}
                      tabIndex={
                        activeIndex === index + (recentItems?.length || 0)
                          ? 0
                          : -1
                      }
                      ref={(node) => {
                        listRef.current[index + (recentItems?.length || 0)] =
                          node;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleItemSelect(item);
                        }
                      }}
                      onClick={() => {
                        handleItemSelect(item);
                      }}
                    >
                      {highlightText(item, query)}
                    </MdListItem>
                  ))}
            </OverlayScrollbarsComponent>
          </MdList>
        </div>
      )}
      {required && (
        <MdTypography
          variant="label"
          size="large"
          className="text-error absolute top-0.5 left-1.5"
        >
          *
        </MdTypography>
      )}
    </div>
  );
}

function highlightText(text: string, highlight: string) {
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

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
