"use client";

import {
  BookingInformationState,
  BookingTemplateListState,
  CurrentBookingDataState,
} from "@/app/store/booking.store";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import styles from "@/app/styles/base.module.css";
import { useEffect } from "react";
import { MdIcon, MdOutlinedButton } from "@/app/util/md3";
import { ChevronLeft } from "@mui/icons-material";
import PageTitle from "@/app/components/title-components";
import RequestNumberSection from "../../information/components/request-number";
import { DividerComponent } from "@/app/components/divider";
import LocationScheduleSection from "../../information/components/location-schedule";
import ContactInformationSection from "../../information/components/contact-information";
import PartiesSection from "../../information/components/parties";
import ContainerSection from "../../information/components/contaienr";
import CargoSection from "../../information/components/cargo";
import AttachmentSection from "../../information/components/attachment";
import { Section } from "../../information/components/base";
import NaToggleButton from "@/app/components/na-toggle-button";

export default function BookingTemplatePreview() {
  // const currentBookingData = useRecoilValue(CurrentBookingDataState);
  // const dataSet = useRecoilValue(BookingInformationState);
  const searchParams = useSearchParams();
  const templateName = searchParams.get("template");
  const templateList = useRecoilValue(BookingTemplateListState);
  const currentBookingData = templateList.find(
    (template) => template.name === templateName
  )!;

  const router = useRouter();
  const cx = classNames.bind(styles);

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex gap-4">
        <MdOutlinedButton
          onClick={() => {
            router.back();
          }}
        >
          <MdIcon slot="icon">
            <ChevronLeft fontSize="small" />
          </MdIcon>
          Back
        </MdOutlinedButton>

        <PageTitle
          title={`Booking Template (${templateName})`}
          hasFavorite={false}
        />
      </div>

      <div className={cx(styles.area, styles["no-padding"], "overflow-hidden")}>
        <div className="bg-secondaryContainer h-4"></div>
        <div className="px-6 pt-4 pb-8">
          <LocationScheduleSection
            data={currentBookingData.information.locationSchedule as any}
          />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <ContactInformationSection
              data={currentBookingData.information.contactInformation as any}
            />
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <PartiesSection
              data={currentBookingData.information.parties as any}
            />
          </div>
          <DividerComponent className="my-8" />
          <ContainerSection
            data={currentBookingData.information.container as any}
          />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <CargoSection
              data={currentBookingData.information.cargoPickUpReturn as any}
            />
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <AttachmentSection
              file={
                currentBookingData.information.additionalInformation
                  ?.attachment as any
              }
              specialInstruction={
                currentBookingData.information.additionalInformation
                  ?.specialInstruction as any
              }
            />
          </div>

          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            {/* <Section title="Duplicate reservation">
          <div className="flex flex-col gap-4">
            <div>
              <MdTypography
                variant="body"
                size="medium"
                className="text-onSurface"
              >
                Do you want to make duplicate bookings for the same vessel?
              </MdTypography>
              <MdTypography
                variant="body"
                size="small"
                className="text-outline"
              >
                Enter the number of bookings to duplicate. (Maximum 50)
              </MdTypography>
            </div>
            <NAOutlinedTextField
              value={dataSet[0].additionalInformation.duplicateCount.toString()}
              className="w-fit text-right"
              readOnly
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
        /> */}
            <Section title="Email Notification Subscription">
              <div className="flex flex-col">
                <NaToggleButton
                  label="Roll-Over (Including T/S)"
                  state={
                    currentBookingData.information.additionalInformation
                      ?.emailSubscription.rollOver
                      ? "disabled-checked"
                      : "disabled"
                  }
                />
                <NaToggleButton
                  label="Vessel Departure"
                  state={
                    currentBookingData.information.additionalInformation
                      ?.emailSubscription.vesselDeparture
                      ? "disabled-checked"
                      : "disabled"
                  }
                />
                <NaToggleButton
                  label="Vessel Advance / Delay"
                  state={
                    currentBookingData.information.additionalInformation
                      ?.emailSubscription.vesselAdvanceDelay
                      ? "disabled-checked"
                      : "disabled"
                  }
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
