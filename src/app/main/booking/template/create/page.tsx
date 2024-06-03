"use client";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import PageTitle from "@/app/components/title-components";
import { BookingTemplateSelect } from "@/app/main/booking/template/components/generic";
import {
  AdditionalInformationState,
  BookingRequestStepState,
  BookingTemplateListState,
  CargoPickUpReturnState,
  ContactInformationState,
  ContainerState,
  LocationScheduleState,
  PartiesState,
  resetBookingState,
} from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import {
  MdDialog,
  MdElevation,
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { BookingInformationRequestType } from "@/app/util/typeDef/boooking";
import { ChevronLeft } from "@mui/icons-material";

import AdditionalInformationStep from "./step-additional-information";
import CargoStep from "./step-cargo";
import ContactInformationStep from "./step-contact-information";
import ContainerStep from "./step-container";
import StepItem from "./step-item";
import LoactionScheduleStep from "./step-location-schedule";
import PartiesStep from "./step-parties";
import { TemplateNameUpdater } from "./template-name-updater";

export default function BookingTemplateCreationPage() {
  return (
    <Suspense>
      <BookingTemplateCreation />
    </Suspense>
  );
}

function BookingTemplateCreation() {
  const cx = classNames.bind(styles);
  const [bookingRequestStepState, setBookingRequestStepState] = useRecoilState(
    BookingRequestStepState
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetBookingStore, setResetBookingStore] =
    useRecoilState(resetBookingState);
  const [isCancelConfrimDialogOpen, setIsCancelConfrimDialogOpen] =
    useState(false);
  const [isCreateConfrimDialogOpen, setIsCreateConfrimDialogOpen] =
    useState(false);
  const [newTemplateName, setNewTemplateName] = useState(
    searchParams.get("template") || ""
  );
  const [templateList, setTemplateList] = useRecoilState(
    BookingTemplateListState
  );

  const [locationSchedule, setLocationSchedule] = useRecoilState(
    LocationScheduleState
  );
  const [parties, setParties] = useRecoilState(PartiesState);
  const [container, setContainer] = useRecoilState(ContainerState);
  const [cargoPickUpReturn, setCargoPickUpReturn] = useRecoilState(
    CargoPickUpReturnState
  );
  const [additionalInformation, setAdditionalInformation] = useRecoilState(
    AdditionalInformationState
  );
  const [contactInformation, setContactInformation] = useRecoilState(
    ContactInformationState
  );

  useEffect(() => {
    if (searchParams.get("type") === "edit") {
      const template = templateList.find(
        (template) => template.name === searchParams.get("template")
      );
      if (template) {
        setLocationSchedule(template.information.locationSchedule as any);
        setParties(template.information.parties as any);
        setContainer(template.information.container as any);
        setCargoPickUpReturn(template.information.cargoPickUpReturn as any);
        setAdditionalInformation(
          template.information.additionalInformation as any
        );
        setContactInformation(template.information.contactInformation as any);
      }
    } else {
      setResetBookingStore();
    }

    // clearBookingRequestStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStepClick(key: string) {
    setBookingRequestStepState((prev) => {
      const newArray = Object.keys(prev).map((k) => {
        return {
          ...prev[k as keyof typeof prev],
          isSelected: k === key,
          visited:
            prev[k as keyof typeof prev].visited ||
            prev[k as keyof typeof prev].isSelected,
        };
      });
      const newObject: typeof prev = newArray.reduce((prev, curr) => {
        prev[curr.id as keyof typeof prev] = curr;
        return prev;
      }, {} as typeof prev);

      return newObject;
    });
  }

  function getSelectedStepId() {
    // return keyof typeof bookingRequestState
    return Object.keys(bookingRequestStepState).find((key) => {
      return bookingRequestStepState[
        key as keyof typeof bookingRequestStepState
      ].isSelected;
    });
  }

  return (
    <div
      aria-label="container"
      className={cx(styles["container"], "flex-1 flex-col overflow-y-auto")}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {searchParams.get("type") === "edit" ? (
            <>
              <MdOutlinedButton
                hasIcon
                onClick={() => {
                  router.back();
                }}
              >
                <MdIcon slot="icon">
                  <ChevronLeft fontSize="small" />
                </MdIcon>
                Back
              </MdOutlinedButton>
              {/* <PageTitle title="Booking Template(Edit)" /> */}
              <TemplateNameUpdater
                defaultName={newTemplateName}
                onUpdateTemplateName={(name) => {
                  setNewTemplateName(name);
                }}
              />
            </>
          ) : (
            <>
              <PageTitle title="New Template" hasFavorite={false} />
            </>
          )}
        </div>
        <div className="flex items-center">
          {searchParams.get("type") !== "edit" && (
            <>
              <BookingTemplateSelect
                initialTemplate={searchParams.get("template") as string}
                onSelectTemplate={(template) => {
                  if (template === undefined) {
                    setResetBookingStore();
                    return;
                  }
                  setLocationSchedule(
                    template.information.locationSchedule as any
                  );
                  setParties(template.information.parties as any);
                  setContainer(template.information.container as any);
                  setCargoPickUpReturn(
                    template.information.cargoPickUpReturn as any
                  );
                  setAdditionalInformation(
                    template.information.additionalInformation as any
                  );
                  setContactInformation(
                    template.information.contactInformation as any
                  );
                }}
              />
              <MdOutlinedButton
                className="ml-4"
                onClick={() => {
                  setIsCancelConfrimDialogOpen(true);
                }}
              >
                Cancel
              </MdOutlinedButton>
              <MdDialog
                open={isCancelConfrimDialogOpen}
                closed={() => setIsCancelConfrimDialogOpen(false)}
              >
                <div slot="headline">
                  Changes may not be saved. Are you sure you want to cancel?
                </div>
                <div slot="actions">
                  <MdOutlinedButton
                    onClick={() => {
                      setIsCancelConfrimDialogOpen(false);
                    }}
                  >
                    Close
                  </MdOutlinedButton>
                  <MdFilledButton
                    onClick={() => {
                      router.back();
                    }}
                  >
                    OK
                  </MdFilledButton>
                </div>
              </MdDialog>
            </>
          )}
        </div>
      </div>
      <div
        className={cx(
          styles["area"],
          styles["no-padding"],
          styles["row-direction"],
          "flex-1"
        )}
      >
        <div className="flex flex-col gap-4 py-6 px-4 border-r border-r-outlineVariant">
          {Object.keys(bookingRequestStepState).map((key) => {
            const item =
              bookingRequestStepState[
                key as keyof typeof bookingRequestStepState
              ];
            return (
              <StepItem
                key={key}
                title={item.title}
                isSelected={item.isSelected}
                isCompleted={item.isCompleted}
                onClick={() => {
                  if (getSelectedStepId() !== key) handleStepClick(key);
                }}
              />
            );
          })}
        </div>
        <Suspense>
          <div className="flex-1 flex p-6">
            {
              {
                locationSchedule: <LoactionScheduleStep />,
                parties: <PartiesStep />,
                cargoPickUpReturn: <CargoStep />,
                container: <ContainerStep />,
                additionalInformation: <AdditionalInformationStep />,
                contactInformation: <ContactInformationStep />,
              }[getSelectedStepId() as keyof typeof bookingRequestStepState]
            }
          </div>
        </Suspense>
      </div>
      <div>
        <div
          className="relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
          style={
            {
              "--md-elevation-level": 4,
            } as CSSProperties
          }
        >
          <MdElevation />
          {searchParams.get("type") === "edit" ? (
            <MdFilledButton
              onClick={() => {
                const newBookingInformation = {
                  locationSchedule,
                  parties,
                  container,
                  cargoPickUpReturn,
                  additionalInformation,
                  contactInformation,
                } as BookingInformationRequestType;
                setTemplateList((prev) => {
                  const newTemplateList = prev.map((template) => {
                    if (template.name === searchParams.get("template")) {
                      return {
                        ...template,
                        name: newTemplateName,
                        information: newBookingInformation,
                      };
                    }
                    return template;
                  });
                  return newTemplateList;
                });

                router.push("/main/booking/template");
              }}
            >
              Save
            </MdFilledButton>
          ) : (
            <>
              <MdFilledButton
                onClick={() => {
                  setIsCreateConfrimDialogOpen(true);
                }}
              >
                Create
              </MdFilledButton>
              <MdDialog
                open={isCreateConfrimDialogOpen}
                closed={() => setIsCreateConfrimDialogOpen(false)}
              >
                <div slot="headline">Please enter the template name.</div>
                <div slot="content">
                  <MdOutlinedTextField
                    className="w-full"
                    label="Template Name"
                    onInput={(e) => {
                      const value = e.currentTarget.value;
                      setNewTemplateName(value);
                    }}
                  />
                </div>
                <div slot="actions">
                  <MdOutlinedButton
                    onClick={() => {
                      setIsCreateConfrimDialogOpen(false);
                    }}
                  >
                    Close
                  </MdOutlinedButton>
                  <MdFilledButton
                    disabled={newTemplateName === ""}
                    onClick={() => {
                      const newBookingInformation = {
                        locationSchedule,
                        parties,
                        container,
                        cargoPickUpReturn,
                        additionalInformation,
                        contactInformation,
                      } as BookingInformationRequestType;
                      setTemplateList((prev) => {
                        const newTemplateList = [
                          ...prev,
                          {
                            name: newTemplateName,
                            information: newBookingInformation,
                          },
                        ];
                        return newTemplateList;
                      });
                      setIsCreateConfrimDialogOpen(false);
                      router.push("/main/booking/template");
                    }}
                  >
                    Create
                  </MdFilledButton>
                </div>
              </MdDialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
