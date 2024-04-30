import {
  MdElevation,
  MdList,
  MdListItem,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
  useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown } from "@mui/icons-material";
import { MdTypography } from "./typography";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { flushSync } from "react-dom";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextField
>;

export default function NAOutlinedListBox({
  options,
  icon,
  initialValue,
  onSelection,
  className,
  ...props
}: {
  icon?: React.ReactNode;
  options: string[];
  initialValue?: string;
  onSelection?: (value: string) => void;
  className?: string;
} & MdOutlinedTextFieldProps) {
  const [query, setQuery] = useState(initialValue || "");
  const [maxHeight, setMaxHeight] = useState(0);
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);

  useEffect(() => {
    if (initialValue || initialValue === "") {
      setQuery(initialValue);
    }
  }, [initialValue]);

  function handleItemSelection(value: string) {
    setQuery(value);
    onSelection?.(value);
    setIsListOpen(false);
  }

  const { refs, floatingStyles, context, middlewareData, placement } =
    useFloating({
      open: isListOpen,
      onOpenChange: setIsListOpen,
      middleware: [
        offset(2),
        shift(),
        flip({
          padding: 20,
        }),
        size({
          apply({ rects, elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
            flushSync(() => setMaxHeight(availableHeight));
          },
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [focus, click, dismiss, listNavigation]
  );

  const downDirectionStyles = {
    duration: {
      open: 200,
      close: 100,
    },
    initial: {
      opacity: 0,
      transformOrigin: "top",
      transform: "scaleY(0.55) translateY(-10px)",
    },
    open: {
      opacity: 1,
      transformOrigin: "top",
      transform: "scaleY(1) translateY(0)",
    },
    close: {
      opacity: 0,
      transformOrigin: "top",
      transform: "scaleY(0.55) translateY(-10px)",
    },
  };

  const upDirectionStyles = {
    duration: {
      open: 200,
      close: 100,
    },
    initial: {
      opacity: 0,
      transformOrigin: "bottom",
      transform: "scaleY(0.55) translateY(10px)",
    },
    open: {
      opacity: 1,
      transformOrigin: "bottom",
      transform: "scaleY(1) translateY(0)",
    },
    close: {
      opacity: 0,
      transformOrigin: "bottom",
      transform: "scaleY(0.55) translateY(10px)",
    },
  };

  const { isMounted, styles } = useTransitionStyles(
    context,
    placement === "top" ? upDirectionStyles : downDirectionStyles
  );

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      className={`relative cursor-pointer h-fit ${className}`}
    >
      <MdOutlinedTextField
        {...props}
        required={false}
        readOnly
        value={query}
        hasTrailingIcon
        className={`w-full cursor-none ${
          props.readOnly ? "bg-surfaceContainer" : ""
        }`}
      >
        {icon && <div slot="leading-icon">{icon}</div>}
        <div slot="trailing-icon">
          <ArrowDropDown fontSize="small" />
        </div>
      </MdOutlinedTextField>
      {isMounted && options.length > 0 && !props.readOnly && (
        <div
          ref={refs.setFloating}
          style={
            {
              ...floatingStyles,
            } as CSSProperties
          }
          {...getFloatingProps()}
          className="z-50 rounded focus:outline-none"
        >
          <MdList
            style={
              {
                boxShadow:
                  "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3) ",
                ...styles,
                maxHeight: maxHeight,
                minHeight: "2rem",
              } as CSSProperties
            }
            className="relative overflow-y-auto rounded bg-surfaceContainerLow shadow"
          >
            <OverlayScrollbarsComponent defer>
              {options.map((option, index) => (
                <MdListItem
                  key={option}
                  type="button"
                  {...getItemProps()}
                  className={option === query ? `bg-secondaryContainer` : ``}
                  tabIndex={activeIndex === index ? 0 : -1}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  onClick={() => {
                    handleItemSelection(option);
                  }}
                >
                  {option}
                </MdListItem>
              ))}
            </OverlayScrollbarsComponent>
          </MdList>
        </div>
      )}
      {props.required && (
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
