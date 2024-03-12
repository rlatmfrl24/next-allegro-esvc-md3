import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

import { MdTypography } from "@/app/components/typography";
import {
  MdElevation,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
  autoUpdate,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
} from "@floating-ui/react";
import { ArrowDropDown, CancelOutlined } from "@mui/icons-material";
import { CommodityType } from "@/app/util/typeDef/boooking";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export default function CommodityAutoComplete({
  required,
  className,
  defaultSelection,
  onSelectionChange,
  ...props
}: {
  required?: boolean;
  className?: string;
  defaultSelection?: CommodityType;
  onSelectionChange?: (value: CommodityType) => void;
} & MdOutlinedTextFieldProps) {
  const [query, setQuery] = useState("");
  const [commodityList, setCommodityList] = useState<CommodityType[]>([]);
  const [defaultValue, setDefaultValue] = useState<CommodityType>(
    defaultSelection || { code: "", description: "" }
  );
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<any[]>([]);

  const tempCommodities = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      code: faker.string.numeric(7),
      description: faker.commerce.productName(),
    }));
  }, []);

  useEffect(() => {
    const commodityList =
      query === ""
        ? tempCommodities
        : tempCommodities.filter(
            (commodity) =>
              commodity.description
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              commodity.code.toLowerCase().includes(query.toLowerCase())
          );
    setCommodityList(commodityList);
  }, [query, tempCommodities]);

  const { refs, floatingStyles, context } = useFloating({
    open: isListOpen,
    onOpenChange: setIsListOpen,
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
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, listNavigation]
  );

  useEffect(() => {
    //when list is close, reset the value to default value
    if (!isListOpen) {
      setQuery(defaultValue.description);
    }
  }, [defaultValue.description, isListOpen]);

  function handleItemSelect(value: CommodityType) {
    setQuery(value.description);
    setDefaultValue(value);
    setIsListOpen(false);
    onSelectionChange?.(value);
  }

  return (
    <div className={`flex relative ${className}`}>
      <MdOutlinedTextFieldBase
        label="Commodity"
        {...props}
        {...getReferenceProps()}
        ref={refs.setReference}
        focus={() => {
          setIsListOpen(true);
        }}
        value={query}
        className="flex-1"
        required={false}
        onInput={(e) => {
          setQuery(e.currentTarget.value);
        }}
      >
        <div slot="trailing-icon" className="mr-2">
          {query !== "" && (
            <MdIconButton
              onClick={() => {
                handleItemSelect({ code: "", description: "" });
              }}
            >
              <MdIcon>
                <CancelOutlined />
              </MdIcon>
            </MdIconButton>
          )}
          <div
            className={`w-10 h-10 flex items-center justify-center ${
              isListOpen ? "rotate-180" : ""
            }`}
          >
            <ArrowDropDown className="flex-1" />
          </div>
        </div>
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
          className="relative z-30 bg-surfaceContainerLow rounded focus-outline-none"
        >
          <MdElevation />
          <MdList className="relative max-h-[600px] overflow-y-auto rounded bg-surfaceContainerLow">
            <OverlayScrollbarsComponent defer>
              {commodityList.map((commodity, index) => (
                <MdListItem
                  key={commodity.code}
                  type="button"
                  className="foucs:bg-surfaceContainerHighest focus:outline-none"
                  {...getItemProps()}
                  tabIndex={index === activeIndex ? 0 : -1}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  onClick={() => {
                    handleItemSelect(commodity);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleItemSelect(commodity);
                    }
                  }}
                >
                  <MdTypography
                    variant="body"
                    size="large"
                    className="text-onSurface"
                  >
                    {query !== ""
                      ? highlightText(commodity.description, query)
                      : commodity.description}
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-onSurfaceVariant"
                  >
                    {query !== ""
                      ? highlightText(commodity.code, query)
                      : commodity.code}
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
