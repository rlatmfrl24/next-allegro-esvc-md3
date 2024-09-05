import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { basicDropdownStyles } from "@/app/util/constants";
import {
  MdDialog,
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdTextButton,
} from "@/app/util/md3";
import { SealDataProps } from "@/app/util/typeDef/si";
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
import {
  Add,
  AddCircleOutline,
  ArrowDropDown,
  Delete,
  DeleteOutline,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const sealKindOptions = [
  "Shipper",
  "Carrier",
  "Consolidator",
  "Customs",
  "Unknown",
  "Quarantine Agency",
  "Terminal Agency",
];

const sealTypeOptions = ["Merchanical", "Electronic"];

export const SealTextField = ({
  initialSealData,
  onUpdated,
}: {
  initialSealData?: SealDataProps[];
  onUpdated?: (sealData: SealDataProps[]) => void;
}) => {
  const [currentSealData, setCurrentSealData] = useState(
    initialSealData || [
      {
        index: 1,
        sealKind: "",
        sealType: "",
        sealNumber: "",
      },
    ]
  );

  useEffect(() => {
    onUpdated && onUpdated(currentSealData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSealData]);

  const [focusedComponent, setFocusedComponent] = useState<string | null>(null);
  const [isSealKindOptionOpen, setIsSealKindOptionOpen] = useState(false);
  const [isSealTypeOptionOpen, setIsSealTypeOptionOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<any[]>([]);

  const {
    refs: sealKindRefs,
    floatingStyles: sealKindFloatingStyles,
    context: sealKindContext,
  } = useFloating({
    open: isSealKindOptionOpen,
    onOpenChange: setIsSealKindOptionOpen,
    middleware: [
      offset(),
      flip(),
      shift(),
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

  const {
    refs: sealTypeRefs,
    floatingStyles: sealTypeFloatingStyles,
    context: sealTypeContext,
  } = useFloating({
    open: isSealTypeOptionOpen,
    onOpenChange: setIsSealTypeOptionOpen,
    middleware: [
      offset(),
      flip(),
      shift(),
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

  const { isMounted: isSealKindMounted, styles: sealKindTransitionStyles } =
    useTransitionStyles(sealKindContext, basicDropdownStyles);
  const { isMounted: isSealTypeMounted, styles: sealTypeTransitionStyles } =
    useTransitionStyles(sealTypeContext, basicDropdownStyles);

  const {
    getFloatingProps: getSealKindFloatingProps,
    getReferenceProps: getSealKindReferenceProps,
    getItemProps: getSealKindItemProps,
  } = useInteractions([
    useFocus(sealKindContext),
    useClick(sealKindContext),
    useDismiss(sealKindContext),
    useListNavigation(sealKindContext, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
    }),
  ]);

  const {
    getFloatingProps: getSealTypeFloatingProps,
    getReferenceProps: getSealTypeReferenceProps,
    getItemProps: getSealTypeItemProps,
  } = useInteractions([
    useFocus(sealTypeContext),
    useClick(sealTypeContext),
    useDismiss(sealTypeContext),
    useListNavigation(sealTypeContext, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
    }),
  ]);

  const wrapRef = useRef<HTMLDivElement>(null);

  // if clicked outside of the component, unfocus the component and set the focusedComponent to null
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
      setFocusedComponent(null);
    }
  };

  // add event listener to the document to detect the click event
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="flex border border-outline w-full rounded relative items-center"
    >
      <MdTypography
        variant="body"
        size="small"
        className="absolute -top-2 translate-x-3 w-fit bg-white px-1"
      >
        Seal No. 01
      </MdTypography>
      <div
        aria-label="seal-kind-text-field"
        id="sealKind"
        tabIndex={0}
        ref={sealKindRefs.setReference}
        {...getSealKindReferenceProps()}
        className={`h-full w-52 rounded outline-none flex items-center px-4 border-2 cursor-pointer ${
          isSealKindOptionOpen ? "border-primary" : "border-transparent"
        }`}
      >
        <MdTypography variant="body" size="large" className="flex-1">
          {currentSealData[0].sealKind}
        </MdTypography>
        <MdIcon>
          <ArrowDropDown />
        </MdIcon>
      </div>

      {isSealKindMounted && (
        <div
          ref={sealKindRefs.setFloating}
          style={sealKindFloatingStyles}
          {...getSealKindFloatingProps()}
          className="z-10 outline-none"
        >
          <MdElevatedCard className="py-1" style={sealKindTransitionStyles}>
            <MdList
              className="bg-surfaceContainerLow rounded"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {sealKindOptions.map((option, index) => (
                <MdListItem
                  key={option}
                  type="button"
                  {...getSealKindItemProps()}
                  tabIndex={activeIndex === index ? 0 : -1}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  onClick={() => {
                    setCurrentSealData((prev) => {
                      // const newSealData = [...prev];
                      // newSealData[0].sealKind = option;
                      // return newSealData;
                      return prev.map((sealData, i) => {
                        if (i === 0) {
                          return { ...sealData, sealKind: option };
                        }
                        return sealData;
                      });
                    });
                    setIsSealKindOptionOpen(false);
                  }}
                >
                  {option}
                </MdListItem>
              ))}
            </MdList>
          </MdElevatedCard>
        </div>
      )}
      <DividerComponent orientation="vertical" className="h-5" />
      <div
        ref={sealTypeRefs.setReference}
        {...getSealTypeReferenceProps()}
        aria-label="seal-type-text-field"
        id="sealType"
        tabIndex={0}
        className={`h-full w-40 rounded flex outline-none items-center px-4 border-2 cursor-pointer ${
          isSealTypeOptionOpen ? "border-primary" : "border-transparent"
        }`}
      >
        <MdTypography variant="body" size="large" className="flex-1">
          {currentSealData[0].sealType}
        </MdTypography>
        <MdIcon>
          <ArrowDropDown />
        </MdIcon>
      </div>
      {isSealTypeMounted && (
        <div
          ref={sealTypeRefs.setFloating}
          style={sealTypeFloatingStyles}
          {...getSealTypeFloatingProps()}
          className="z-10 outline-none"
        >
          <MdElevatedCard className="py-1" style={sealTypeTransitionStyles}>
            <MdList
              className="bg-surfaceContainerLow rounded"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {sealTypeOptions.map((option, index) => (
                <MdListItem
                  key={option}
                  type="button"
                  {...getSealTypeItemProps()}
                  tabIndex={activeIndex === index ? 0 : -1}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  onClick={() => {
                    setCurrentSealData((prev) => {
                      return prev.map((sealData, i) => {
                        if (i === 0) {
                          return { ...sealData, sealType: option };
                        }
                        return sealData;
                      });
                    });
                    setIsSealTypeOptionOpen(false);
                  }}
                >
                  {option}
                </MdListItem>
              ))}
            </MdList>
          </MdElevatedCard>
        </div>
      )}
      <DividerComponent orientation="vertical" className="h-5" />
      <input
        placeholder="Seal No."
        id="sealNumber"
        aria-label="seal-number-text-field"
        onFocus={() => setFocusedComponent("sealNumber")}
        onBlur={() => setFocusedComponent(null)}
        className={`h-full flex-1 rounded flex items-center px-4 font-pretendard outline-none border-2 cursor-pointer ${
          focusedComponent === "sealNumber"
            ? "border-primary"
            : "border-transparent"
        }`}
        value={currentSealData[0].sealNumber}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setCurrentSealData((prev) => {
            return prev.map((sealData, i) => {
              if (i === 0) {
                return { ...sealData, sealNumber: value };
              }
              return sealData;
            });
          });
        }}
      />
      <SealSettingDialog
        initialSealData={currentSealData}
        onApply={(data) => {
          setCurrentSealData(data);
        }}
      />
    </div>
  );
};

const SealSettingDialog = ({
  initialSealData,
  onApply,
}: {
  initialSealData?: SealDataProps[];
  onApply?: (sealData: SealDataProps[]) => void;
}) => {
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);
  const [currentSealData, setCurrentSealData] = useState<SealDataProps[]>(
    initialSealData || []
  );

  useEffect(() => {
    setCurrentSealData(initialSealData || []);
  }, [initialSealData]);

  return (
    <>
      <MdIconButton
        className="w-8 h-8 mx-1"
        onClick={() => {
          setIsSettingDialogOpen(true);
        }}
      >
        <AddCircleOutline />
      </MdIconButton>
      <MdDialog
        open={isSettingDialogOpen}
        closed={() => {
          setIsSettingDialogOpen(false);
        }}
        className="w-fit min-w-fit h-[440px]"
      >
        <div slot="headline">Seal Setting</div>
        <div slot="content" className="flex flex-col gap-4 w-fit">
          <MdTextButton
            className="w-fit"
            onClick={() => {
              setCurrentSealData((prev) => {
                const newSealData = [...prev];
                newSealData.push({
                  index: newSealData.length + 1,
                  sealKind: "",
                  sealType: "",
                  sealNumber: "",
                });
                return newSealData;
              });
            }}
          >
            <MdIcon slot="icon">
              <Add />
            </MdIcon>
            Add
          </MdTextButton>
          {currentSealData.map((sealData, index) => (
            <div className="flex gap-2 items-center w-fit" key={sealData.index}>
              <NAOutlinedListBox
                label="Seal Kind"
                className="w-56"
                options={sealKindOptions}
                initialValue={sealData.sealKind}
                value={sealData.sealKind}
                onSelection={(value) => {
                  setCurrentSealData((prev) => {
                    return prev.map((sealData, i) => {
                      if (i === index) {
                        return { ...sealData, sealKind: value };
                      }
                      return sealData;
                    });
                  });
                }}
              />
              <NAOutlinedListBox
                label="Seal Type"
                className="w-44"
                options={sealTypeOptions}
                initialValue={sealData.sealType}
                value={sealData.sealType}
                onSelection={(value) => {
                  setCurrentSealData((prev) => {
                    return prev.map((sealData, i) => {
                      if (i === index) {
                        return { ...sealData, sealType: value };
                      }
                      return sealData;
                    });
                  });
                }}
              />
              <NAOutlinedTextField
                label={`Seal No. ${index + 1}`}
                className="w-44"
                value={sealData.sealNumber}
                handleValueChange={(value) => {
                  setCurrentSealData((prev) => {
                    return prev.map((sealData, i) => {
                      if (i === index) {
                        return { ...sealData, sealNumber: value };
                      }
                      return sealData;
                    });
                  });
                }}
              />
              <MdIconButton
                className="min-w-10"
                onClick={() => {
                  setCurrentSealData((prev) => {
                    return prev.filter((_, i) => i !== index);
                  });
                }}
              >
                <MdIcon>
                  <DeleteOutline />
                </MdIcon>
              </MdIconButton>
            </div>
          ))}
        </div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              setIsSettingDialogOpen(false);
              setCurrentSealData(initialSealData || []);
            }}
          >
            Close
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              onApply && onApply(currentSealData);
              setIsSettingDialogOpen(false);
            }}
          >
            Apply
          </MdFilledButton>
        </div>
      </MdDialog>
    </>
  );
};
