import { getCookie, setCookie } from "cookies-next";
import { get } from "lodash";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
import RestoreIcon from "@mui/icons-material/Restore";

import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
  MdRippleEffect,
} from "../util/md3";
import { MdTypography } from "./typography";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

type InteralRecordType = {
  key: string;
  value: string;
};

export default function NAMultiAutoComplete({
  itemList,
  icon,
  required,
  recentCookieKey,
  initialValue,
  onItemSelection,
  onQueryChange,
  isAllowOnlyListItems = true,
  showAllonFocus = false,
  className,
  ...props
}: {
  itemList: Record<string, string>[]; // changed from string[] to string[] | Record<string, string>[]
  required?: boolean;
  recentCookieKey?: string;
  icon?: React.ReactNode;
  initialValue?: Record<string, string>;
  onItemSelection?: (selectedItem: Record<string, string>) => void;
  onQueryChange?: (value: string) => void;
  isAllowOnlyListItems?: boolean;
  showAllonFocus?: boolean;
  className?: string;
} & MdOutlinedTextFieldProps) {
  const [keySet, setKeySet] = useState<string[]>([]);
  function convertRecordArrayToInteralRecordArray(
    itemList: Record<string, string>[]
  ): InteralRecordType[] {
    const firstItem = itemList[0];
    const keyList = Object.keys(firstItem).map((key) => key);
    setKeySet(keyList);

    return itemList.map((item) => {
      return {
        key: get(item, keyList[0], ""),
        value: get(item, keyList[1], ""),
      };
    });
  }
  const InteralRecordItemList = useMemo(() => {
    return convertRecordArrayToInteralRecordArray(itemList);
  }, [itemList]);

  const [query, setQuery] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState({
    key: "",
    value: "",
  });

  const loadRecentItems = useCallback(() => {
    if (recentCookieKey) {
      const recent = JSON.parse(getCookie(recentCookieKey) || "[]");
      return recent;
    }
    return [];
  }, [recentCookieKey]);

  const [allRecentItems, setRecentItems] = useState(loadRecentItems);

  function addRecentItems(value: InteralRecordType) {
    const maxRecentItems = 5;

    if (value.key === "" || value.value === "") {
      return;
    }

    if (recentCookieKey) {
      const recent = JSON.parse(
        getCookie(recentCookieKey) || "[]"
      ) as InteralRecordType[];

      // check if the value is already in the recent list
      if (recent.some((item) => item.key === value.key)) {
        const index = recent.findIndex((item) => item.key === value.key);
        recent.splice(index, 1);
        recent.unshift(value);
      } else {
        recent.unshift(value);
      }

      if (recent.length > maxRecentItems) {
        recent.pop();
      }

      setCookie(recentCookieKey, JSON.stringify(recent), {
        maxAge: 36000,
      });
    }

    setRecentItems(loadRecentItems());
  }

  function removeRecentItems(value: InteralRecordType) {
    if (recentCookieKey) {
      const recent = JSON.parse(
        getCookie(recentCookieKey) || "[]"
      ) as InteralRecordType[];

      const index = recent.findIndex((item) => item.key === value.key);
      recent.splice(index, 1);

      setCookie(recentCookieKey, JSON.stringify(recent), {
        maxAge: 36000,
      });
    }

    setRecentItems(loadRecentItems());
  }

  const [isListOpen, setIsListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open: isListOpen,
    onOpenChange: setIsListOpen,
    middleware: [
      offset(2),
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
      setQuery(defaultValue.key);
    }
  }, [defaultValue, isAllowOnlyListItems, isListOpen, setQuery]);

  useEffect(() => {
    // when the initial value is changed, update the query and default value
    const convertedInitialValue = {
      key: get(initialValue, keySet[0], ""),
      value: get(initialValue, keySet[1], ""),
    };

    setQuery(convertedInitialValue.key || "");
    setDefaultValue(convertedInitialValue);
  }, [initialValue, keySet]);

  function handleItemSelect(item: InteralRecordType) {
    // when an item is selected, update the query, default value, and close the list
    setQuery(item.key);
    setDefaultValue(item);
    setIsListOpen(false);
    item && addRecentItems(item);
    onItemSelection?.({
      [keySet[0]]: item.key,
      [keySet[1]]: item.value,
    });
  }

  function getMatchedItems(query: string, itemList: InteralRecordType[]) {
    return itemList.filter((value) => {
      return (
        value.value.toLowerCase().includes(query.toLowerCase()) ||
        value.key.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  const recommandItems = useMemo(() => {
    return query !== ""
      ? getMatchedItems(query, InteralRecordItemList)
      : InteralRecordItemList;
  }, [InteralRecordItemList, query]);

  const matchedRecentItems = getMatchedItems(query, allRecentItems);

  const showRecommandPopover = useCallback(() => {
    if (matchedRecentItems.length > 0) {
      return true;
    }

    if (query.length > 2 || showAllonFocus) {
      return recommandItems.length > 0;
    }

    return false;
  }, [
    matchedRecentItems.length,
    query.length,
    recommandItems.length,
    showAllonFocus,
  ]);

  return (
    <div
      className={`relative ${className} ${
        props.readOnly ? "bg-surfaceContainer" : ""
      }`}
    >
      <MdOutlinedTextFieldBase
        {...props}
        ref={refs.setReference}
        {...getReferenceProps()}
        value={query}
        className="w-full"
        required={false}
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          onQueryChange?.(e.currentTarget.value);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
        }}
      >
        {icon && <MdIcon slot="leading-icon">{icon}</MdIcon>}
        <div slot="trailing-icon" className="mr-2">
          {query !== "" && !props.readOnly && (
            <div
              className="cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full"
              tabIndex={-1}
              onClick={() => {
                handleItemSelect({ key: "", value: "" });
              }}
            >
              <MdRippleEffect />
              <MdIcon>
                <CancelIcon />
              </MdIcon>
            </div>
            // <MdIconButton
            //   tabIndex={-1}
            //   onClick={() => {
            //     handleItemSelect({ key: "", value: "" });
            //   }}
            // >
            //   <MdIcon>
            //     <CancelIcon />
            //   </MdIcon>
            // </MdIconButton>
          )}
        </div>
      </MdOutlinedTextFieldBase>
      {showRecommandPopover() && isListOpen && (
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
          <MdList className="relative max-h-[600px] overflow-y-auto rounded bg-surfaceContainerLow">
            <OverlayScrollbarsComponent defer>
              {matchedRecentItems.length > 0 &&
                matchedRecentItems.map((item, index) => (
                  <MdListItem
                    key={item.key}
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
                    <MdTypography
                      variant="body"
                      size="large"
                      className="text-onSurface"
                    >
                      {highlightText(item.key, query)}
                    </MdTypography>
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-onSurfaceVariant"
                    >
                      {highlightText(item.value, query)}
                    </MdTypography>
                    <MdIconButton
                      slot="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentItems(item);
                      }}
                    >
                      <MdIcon>
                        <CancelIcon />
                      </MdIcon>
                    </MdIconButton>
                  </MdListItem>
                ))}

              {matchedRecentItems.length > 0 &&
                recommandItems.length > 0 &&
                query.length > 2 && (
                  <div
                    aria-label="recent-divider"
                    className="h-px w-full bg-outlineVariant"
                  ></div>
                )}

              {(showAllonFocus || query.length > 2) &&
                recommandItems.map((item, index) => (
                  <MdListItem
                    key={item.key}
                    type="button"
                    className="focus:bg-surfaceContainerHighest focus:outline-none flex flex-col"
                    {...getItemProps()}
                    tabIndex={
                      activeIndex === index + (matchedRecentItems?.length || 0)
                        ? 0
                        : -1
                    }
                    ref={(node) => {
                      listRef.current[
                        index + (matchedRecentItems?.length || 0)
                      ] = node;
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
                    <MdTypography
                      variant="body"
                      size="large"
                      className="text-onSurface"
                    >
                      {highlightText(item.key, query)}
                    </MdTypography>
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-onSurfaceVariant"
                    >
                      {highlightText(item.value, query)}
                    </MdTypography>
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

function highlightText(text: string, query: string) {
  if (query === "") {
    return text;
  }

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span className="text-error" key={index}>
        {part}
      </span>
    ) : (
      part
    )
  );
}
