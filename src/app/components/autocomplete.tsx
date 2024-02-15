import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdMenuItem,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "../util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { MdTypography } from "./typography";
import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  FloatingFocusManager,
  autoUpdate,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedAutoComplete = ({
  id,
  itemList,
  className,
  ...props
}: {
  id: string;
  itemList: string[];
  className?: string;
} & MdOutlinedTextFieldProps) => {
  const [width, setWidth] = useState<number | undefined>(0);
  const [value, setValue] = useState(props.value || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recommandedItems, setRecommandedItems] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [offset(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNavigation]
  );

  function highlightText(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
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
    );
  }

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [setWidth, containerRef.current?.offsetWidth]);

  return (
    <div ref={containerRef} className={className + " relative flex"}>
      <MdOutlinedTextFieldBase
        {...props}
        ref={refs.setReference}
        className="flex-1"
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
        value={value}
        {...getReferenceProps()}
      >
        {value !== "" && props.label && (
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
                width: width,
                "--md-elevation-level": 2,
                ...floatingStyles,
              } as CSSProperties
            }
            {...getFloatingProps()}
            className="relative z-50 bg-surfaceContainer rounded py-1"
          >
            <MdElevation />
            {recommandedItems.map((item, index) => (
              <MdMenuItem
                tabIndex={activeIndex === index ? 0 : -1}
                ref={(node) => {
                  listRef.current[index] = node;
                }}
                {...getItemProps()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setValue(item);
                    setIsMenuOpen(false);
                  }
                }}
                key={index}
                onClick={() => {
                  setValue(item);
                  setIsMenuOpen(false);
                }}
              >
                {highlightText(item, value)}
              </MdMenuItem>
            ))}
          </div>
        </FloatingFocusManager>
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
};
