import { MdTypography } from "@/app/components/typography";
import {
  AdditionalInformationState,
  BookingTemplateListState,
  CargoPickUpReturnState,
  ContactInformationState,
  ContainerState,
  LocationScheduleState,
  PartiesState,
} from "@/app/store/booking.store";
import { basicDropdownStyles } from "@/app/util/constants";
import {
  MdDialog,
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRippleEffect,
} from "@/app/util/md3";
import { BookingTemplateProps } from "@/app/util/typeDef/booking";
import {
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown, Check } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const SaveAsTemplate = (props: { className?: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageState, setPageState] = useState<"input" | "success" | "fail">(
    "input"
  );
  const [templateName, setTemplateName] = useState<string>("");
  const setTemplateList = useSetRecoilState(BookingTemplateListState);
  const currentLocationSchedule = useRecoilValue(LocationScheduleState);
  const currentParties = useRecoilValue(PartiesState);
  const currentContainer = useRecoilValue(ContainerState);
  const currentAdditionalInformation = useRecoilValue(
    AdditionalInformationState
  );
  const currentCargoPickUpReturn = useRecoilValue(CargoPickUpReturnState);
  const currentContactInformation = useRecoilValue(ContactInformationState);

  return (
    <>
      <MdOutlinedButton
        onClick={() => {
          setIsDialogOpen(true);
          setPageState("input");
        }}
        className={props.className}
      >
        Save as Template
      </MdOutlinedButton>
      <MdDialog open={isDialogOpen} closed={() => setIsDialogOpen(false)}>
        <div slot="headline">
          {
            {
              input: "Please enter the template name.",
              success: "Data has been saved successfully.",
              fail: "Failed to save data.",
            }[pageState]
          }
        </div>
        <div slot="content">
          {pageState === "input" && (
            <MdOutlinedTextField
              label="Template Name"
              className="w-full"
              onInput={(e) => {
                const value = e.currentTarget.value;
                setTemplateName(value);
              }}
            />
          )}
        </div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            Cancel
          </MdOutlinedButton>
          {pageState === "input" && (
            <MdFilledButton
              onClick={() => {
                setPageState("success");
                setTemplateList((old) => [
                  ...old,
                  {
                    name: templateName,
                    information: {
                      locationSchedule: currentLocationSchedule,
                      parties: currentParties,
                      container: currentContainer,
                      additionalInformation: currentAdditionalInformation,
                      cargoPickUpReturn: currentCargoPickUpReturn,
                      contactInformation: currentContactInformation,
                    },
                  } as BookingTemplateProps,
                ]);
              }}
            >
              Save
            </MdFilledButton>
          )}
        </div>
      </MdDialog>
    </>
  );
};

export const BookingTemplateSelect = (props: {
  initialTemplate?: string;
  onSelectTemplate?: (template: BookingTemplateProps | undefined) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    props.initialTemplate ?? ""
  );
  const templateList = useRecoilValue(BookingTemplateListState);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    whileElementsMounted: autoUpdate,
  });

  const { styles: transitionStyles, isMounted } = useTransitionStyles(
    context,
    basicDropdownStyles
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context),
  ]);

  useEffect(() => {
    if (props.onSelectTemplate) {
      const template = templateList.find((t) => t.name === selectedTemplate);
      if (template) {
        props.onSelectTemplate(template);
      } else {
        props.onSelectTemplate(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <MdTypography
          variant="label"
          size="large"
          className={`rounded-lg pl-4 pr-2 py-1.5 cursor-pointer relative select-none ${
            selectedTemplate === ""
              ? "border border-outline"
              : "bg-secondaryContainer"
          }`}
        >
          <MdRippleEffect />
          {selectedTemplate !== "" && (
            <Check fontSize="small" className="mr-2" />
          )}
          {selectedTemplate === ""
            ? "Booking Template: None Select"
            : selectedTemplate}
          <ArrowDropDown
            fontSize="small"
            className={`ml-2 ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </MdTypography>
      </div>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-10"
        >
          <MdElevatedCard style={transitionStyles} className="py-1">
            <MdList className="bg-surfaceContainerLow rounded-lg">
              <MdListItem
                type="button"
                onClick={() => {
                  setSelectedTemplate("");
                  setIsMenuOpen(false);
                }}
              >
                {selectedTemplate === "" && (
                  <MdIcon slot="start">
                    <Check />
                  </MdIcon>
                )}
                Booking Template: None Select
              </MdListItem>
              {templateList.map((template) => (
                <MdListItem
                  key={template.name}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(template.name);
                    setIsMenuOpen(false);
                  }}
                >
                  {selectedTemplate === template.name && (
                    <MdIcon slot="start">
                      <Check />
                    </MdIcon>
                  )}
                  {template.name}
                </MdListItem>
              ))}
            </MdList>
          </MdElevatedCard>
        </div>
      )}
    </>
  );
};
