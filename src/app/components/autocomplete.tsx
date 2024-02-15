import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
  MdRippleEffect,
} from "../util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { MdTypography } from "./typography";
import { CSSProperties, useRef, useState } from "react";
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
  const [value, setValue] = useState(props.value || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recommandedItems, setRecommandedItems] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

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
                      setValue(item);
                      setIsMenuOpen(false);
                    }
                  }}
                  onClick={() => {
                    setValue(item);
                    setIsMenuOpen(false);
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
