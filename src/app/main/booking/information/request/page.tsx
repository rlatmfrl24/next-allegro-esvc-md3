"use client";

import NaToggleButton from "@/app/components/na-toggle-button";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";
import AttachmentSection from "../components/attachment";
import { Section } from "../components/base";
import CargoSection from "../components/cargo";
import ContactInformationSection from "../components/contact-information";
import ContainerSection from "../components/contaienr";
import LocationScheduleSection from "../components/location-schedule";
import PartiesSection from "../components/parties";
import {
  BookingInformationState,
  CurrentBookingDataState,
} from "@/app/store/booking.store";
import { useRecoilValue } from "recoil";
import { MdIcon, MdOutlinedButton, MdOutlinedTextField } from "@/app/util/md3";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RequestNumberSection from "../components/request-number";
import { BookingStatus } from "@/app/util/typeDef/booking";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { ChevronLeft } from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";

export default function BookingRequestInformation() {
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const dataSet = useRecoilValue(BookingInformationState);
  const router = useRouter();
  const cx = classNames.bind(styles);

  useEffect(() => {
    if (dataSet.length === 0) {
      alert("Data is undefined");
      router.push("/main/booking/request");
    }
  }, [dataSet.length, router]);

  return dataSet.length === 0 ? (
    <></>
  ) : (
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

        <PageTitle title="Booking Request Information" hasFavorite={false} />
      </div>

      <div className={cx(styles.area, styles["no-padding"], "overflow-hidden")}>
        <div className="bg-secondaryContainer h-4"></div>
        <RequestNumberSection
          bookingStatus={undefined}
          requestNumber={currentBookingData?.requestNo || ""}
        />
        <DividerComponent className="my-2" />
        <div className="px-6 pt-4 pb-8">
          <LocationScheduleSection data={dataSet[0].locationSchedule} />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <ContactInformationSection data={dataSet[0].contactInformation} />
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <PartiesSection data={dataSet[0].parties} />
          </div>
          <DividerComponent className="my-8" />
          <ContainerSection data={dataSet[0].container} />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <CargoSection data={dataSet[0].cargoPickUpReturn} />
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <AttachmentSection
              file={dataSet[0].additionalInformation.attachment}
              specialInstruction={
                dataSet[0].additionalInformation.specialInstruction
              }
            />
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <Section title="Email Notification Subscription">
              <div className="flex flex-col">
                <NaToggleButton
                  label="Roll-Over (Including T/S)"
                  state={
                    dataSet[0].additionalInformation.emailSubscription.rollOver
                      ? "disabled-checked"
                      : "disabled"
                  }
                />
                <NaToggleButton
                  label="Vessel Departure"
                  state={
                    dataSet[0].additionalInformation.emailSubscription
                      .vesselDeparture
                      ? "disabled-checked"
                      : "disabled"
                  }
                />
                <NaToggleButton
                  label="Vessel Advance / Delay"
                  state={
                    dataSet[0].additionalInformation.emailSubscription
                      .vesselAdvanceDelay
                      ? "disabled-checked"
                      : "disabled"
                  }
                />
              </div>
            </Section>
          </div>

          {/* <DividerComponent className="my-8" /> */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
