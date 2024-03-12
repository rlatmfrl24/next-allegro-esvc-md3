"use client";

import NaToggleButton from "@/app/components/na-toggle-button";
import PageTitle from "@/app/components/page-title";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import classNames from "classnames";
import AttachmentSection from "../components/attachment";
import { DividerComponent, Section } from "../components/base";
import CargoSection from "../components/cargo";
import ContactInformationSection from "../components/contact-information";
import ContainerSection from "../components/contaienr";
import LocationScheduleSection from "../components/location-schedule";
import PartiesSection from "../components/parties";
import { BookingInformationState } from "@/app/store/booking-request.store";
import { useRecoilValue } from "recoil";
import { MdOutlinedTextField } from "@/app/util/md3";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingRequestInformation() {
  const dataSet = useRecoilValue(BookingInformationState);
  const router = useRouter();

  useEffect(() => {
    if (dataSet.length === 0) {
      alert("Data is undefined");
      router.push("/main/booking/request");
    }
  }, [dataSet.length, router]);

  const cx = classNames.bind(styles);

  return dataSet.length === 0 ? (
    <></>
  ) : (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Booking Request Information" />

      <div className={cx(styles.area, styles["no-padding"], "overflow-hidden")}>
        <div className="bg-secondaryContainer h-4"></div>
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
          <ContainerSection />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <CargoSection data={dataSet[0].cargoPickUpReturn} />
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <AttachmentSection
              files={dataSet[0].additionalInformation.attachments}
              specialInstruction={
                dataSet[0].additionalInformation.specialInstruction
              }
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
                <MdOutlinedTextField
                  value={dataSet[0].additionalInformation.duplicateCount.toString()}
                  className="w-fit text-right"
                  disabled
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
                    dataSet[0].additionalInformation.emailSubscription.rollOver
                      ? "checked"
                      : "unchecked"
                  }
                />
                <NaToggleButton
                  label="Vessel Departure"
                  state={
                    dataSet[0].additionalInformation.emailSubscription
                      .vesselDeparture
                      ? "checked"
                      : "unchecked"
                  }
                />
                <NaToggleButton
                  label="Vessel Advance / Delay"
                  state={
                    dataSet[0].additionalInformation.emailSubscription
                      .vesselAdvanceDelay
                      ? "checked"
                      : "unchecked"
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
