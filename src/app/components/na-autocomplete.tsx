import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
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
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import RestoreIcon from "@mui/icons-material/Restore";
import { MdTypography } from "./typography";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export default function OutlinedAutoComplete({
  value,
  setValue,
  itemList,
  recentItems,
  onSelection,
  ...props
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  itemList: string[];
  recentItems?: string[];
  onSelection?: (value: string) => void;
} & MdOutlinedTextFieldProps) {
  // const [value, setValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
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

  useEffect(() => {
    //when list is close, reset the value to default value
    if (!isListOpen) {
      setValue(defaultValue);
    }
  }, [defaultValue, isListOpen, setValue]);

  function handleItemSelect(item: string) {
    setValue(item);
    setDefaultValue(item);
    setIsListOpen(false);
    onSelection?.(item);
  }

  return (
    <div className="relative">
      <MdOutlinedTextFieldBase
        {...props}
        ref={refs.setReference}
        {...getReferenceProps()}
        value={value}
        focus={() => {
          setIsListOpen(true);
        }}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
      >
        {value !== "" && (
          <MdIconButton
            slot="trailing-icon"
            onClick={() => {
              handleItemSelect("");
            }}
          >
            <MdIcon>
              <CancelIcon />
            </MdIcon>
          </MdIconButton>
        )}
      </MdOutlinedTextFieldBase>
      {isListOpen && (
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
              {recentItems &&
                recentItems.length > 0 &&
                recentItems.map((item, index) => (
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
                    {highlightText(item, value)}
                  </MdListItem>
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
                itemList
                  .filter((item) => {
                    return item.toLowerCase().includes(value.toLowerCase());
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
                      {highlightText(item, value)}
                    </MdListItem>
                  ))}
            </OverlayScrollbarsComponent>
          </MdList>
        </div>
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
