"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";
import { DividerComponent, Section } from "../../components/base";
import LocationScheduleSection from "../../components/location-schedule";
import BookingRequestorSection from "../../components/booking-requestor";
import PartiesSection from "../../components/parties";
import {
  MdElevation,
  MdFilledButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { CSSProperties } from "react";
import CargoSection from "../../components/cargo";
import AttachmentSection from "../../components/attachment";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import Link from "next/link";
import ContainerSection from "../../components/contaienr";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CargoPickUpReturnState,
  ContactInformationState,
  AdditionalInformationState,
  LocationScheduleState,
  PartiesState,
} from "@/app/store/booking-request.store";

export default function BookingRequestPreview() {
  const locationScheduleValue = useRecoilValue(LocationScheduleState);
  const partiesValue = useRecoilValue(PartiesState);
  const cargoValue = useRecoilValue(CargoPickUpReturnState);
  const etcValue = useRecoilValue(AdditionalInformationState);
  const contactInformationValue = useRecoilValue(ContactInformationState);
  const [additionalInformationData, setAdditionalInformationData] =
    useRecoilState(AdditionalInformationState);

  const cx = classNames.bind(styles);
  return (
    <>
      <div aria-label="container" className={cx(styles.container, "mb-12")}>
        <PageTitle title="Booking Request Preview" />
        <div
          className={cx(styles.area, styles["no-padding"], "overflow-hidden")}
        >
          <div className="bg-secondaryContainer h-4"></div>
          <div className="px-6 pt-4 pb-8">
            <LocationScheduleSection hasEdit data={locationScheduleValue} />
            <DividerComponent className="my-8" />
            <div className="flex items-stretch">
              <BookingRequestorSection hasEdit data={contactInformationValue} />
              <DividerComponent
                className="mx-8 border-dotted"
                orientation="vertical"
              />
              <PartiesSection hasEdit data={partiesValue} />
            </div>
            <DividerComponent className="my-8" />
            <ContainerSection />
            <DividerComponent className="my-8" />
            <div className="flex items-stretch">
              <CargoSection hasEdit data={cargoValue} />
              <DividerComponent
                className="mx-8 border-dotted"
                orientation="vertical"
              />
              <AttachmentSection
                hasEdit
                files={etcValue.attachments}
                specialInstruction={etcValue.specialInstruction}
              />
            </div>
            <DividerComponent className="my-8" />
            <div className="flex items-stretch">
              <Section title="Duplicate reservation">
                <div className="flex flex-col gap-4">
                  <div>
                    <MdTypography
                      variant="body"
                      size="medium"
                      className="text-onSurface"
                    >
                      Do you want to make duplicate bookings for the same
                      vessel?
                    </MdTypography>
                    <MdTypography
                      variant="body"
                      size="small"
                      className="text-outline"
                    >
                      Enter the number of bookings to duplicate. (Maximum 50)
                    </MdTypography>
                  </div>
                  <MdOutlinedTextField
                    value={additionalInformationData.duplicateCount.toString()}
                    className="w-fit text-right"
                    onKeyDown={(e) => {
                      // Only allow numbers and backspace
                      if (
                        !(
                          (e.key >= "0" && e.key <= "9") ||
                          e.key === "Backspace" ||
                          e.key === "Delete" ||
                          e.key === "ArrowLeft" ||
                          e.key === "ArrowRight" ||
                          e.key === "Tab" ||
                          e.key === "Shift" ||
                          e.key === "Control" ||
                          e.key === "Alt" ||
                          e.key === "ArrowUp" ||
                          e.key === "ArrowDown"
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.currentTarget.value);
                      if (value > 50) {
                        setAdditionalInformationData((prev) => {
                          return {
                            ...prev,
                            duplicateCount: 50,
                          };
                        });
                      } else if (value < 1) {
                        setAdditionalInformationData((prev) => {
                          return {
                            ...prev,
                            duplicateCount: 1,
                          };
                        });
                      } else if (isNaN(value)) {
                        setAdditionalInformationData((prev) => {
                          return {
                            ...prev,
                            duplicateCount: 1,
                          };
                        });
                      } else {
                        setAdditionalInformationData((prev) => {
                          return {
                            ...prev,
                            duplicateCount: value,
                          };
                        });
                      }
                    }}
                  />
                  <MdTypography
                    variant="body"
                    size="small"
                    className="text-outline"
                  >
                    (Multiple booking request may take some time to complete.
                    Please wait a moment.)
                  </MdTypography>
                </div>
              </Section>
              <DividerComponent
                className="mx-8 border-dotted"
                orientation="vertical"
              />
              <Section title="Email Notification Subscription">
                <div className="flex flex-col">
                  <NaToggleButton
                    label="Roll-Over (Including T/S)"
                    state={
                      additionalInformationData.emailSubscription.rollOver
                        ? "checked"
                        : "unchecked"
                    }
                    onClick={() => {
                      setAdditionalInformationData((prev) => {
                        return {
                          ...prev,
                          emailSubscription: {
                            ...prev.emailSubscription,
                            rollOver: !prev.emailSubscription.rollOver,
                          },
                        };
                      });
                    }}
                  />
                  <NaToggleButton
                    label="Vessel Departure"
                    state={
                      additionalInformationData.emailSubscription
                        .vesselDeparture
                        ? "checked"
                        : "unchecked"
                    }
                    onClick={() => {
                      setAdditionalInformationData((prev) => {
                        return {
                          ...prev,
                          emailSubscription: {
                            ...prev.emailSubscription,
                            vesselDeparture:
                              !prev.emailSubscription.vesselDeparture,
                          },
                        };
                      });
                    }}
                  />
                  <NaToggleButton
                    label="Vessel Advance / Delay"
                    state={
                      additionalInformationData.emailSubscription
                        .vesselAdvanceDelay
                        ? "checked"
                        : "unchecked"
                    }
                    onClick={() => {
                      setAdditionalInformationData((prev) => {
                        return {
                          ...prev,
                          emailSubscription: {
                            ...prev.emailSubscription,
                            vesselAdvanceDelay:
                              !prev.emailSubscription.vesselAdvanceDelay,
                          },
                        };
                      });
                    }}
                  />
                </div>
              </Section>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-20 w-[calc(100%-80px)] px-4 pb-2 z-20">
          <div
            className=" relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
            style={
              {
                "--md-elevation-level": 4,
              } as CSSProperties
            }
          >
            <MdElevation />
            <Link href={`/main/booking/status`}>
              <MdFilledButton>Submit</MdFilledButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
