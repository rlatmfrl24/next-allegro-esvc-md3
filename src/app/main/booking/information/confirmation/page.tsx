"use client";

import classNames from "classnames";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  BookingInformationState,
  CurrentBookingDataState,
} from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import { MdIcon, MdOutlinedButton, MdOutlinedTextField } from "@/app/util/md3";
import { BookingStatus } from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { ChevronLeft } from "@mui/icons-material";

import { Section } from "../components/base";
import ContainerSection from "../components/contaienr";
import LocationScheduleSection from "../components/location-schedule";
import RequestNumberSection from "../components/request-number";
import { DividerComponent } from "@/app/components/divider";

export default function BookingConfirmationInformation() {
  const cx = classNames.bind(styles);
  const currentBookingData = useRecoilValue(CurrentBookingDataState);
  const dataSet = useRecoilValue(BookingInformationState);
  const router = useRouter();

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
        <PageTitle
          title="Booking Confirmation Information"
          hasFavorite={false}
        />
      </div>
      <div className={cx(styles.area, styles["no-padding"], "overflow-hidden")}>
        <div className="bg-secondaryContainer h-4"></div>
        <RequestNumberSection
          bookingStatus={undefined}
          // bookingStatus={currentBookingData?.status || BookingStatus.Requested}
          requestNumber={currentBookingData?.requestNo || ""}
          title="Booking No."
        />
        <DividerComponent className="my-2" />
        <div className="px-6 pt-4 pb-8">
          <LocationScheduleSection data={dataSet[0].locationSchedule} />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <Section title="Contact Information">
              <div className="grid grid-cols-[160px_1fr] gap-4">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Booking Date
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {currentBookingData?.requestDate.toFormat("yyyy-MM-dd")}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Cell Phone
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].contactInformation.telNo}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Booking Staff
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].contactInformation.name}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Sales Req
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].contactInformation.address}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  B/L No
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {currentBookingData?.bookingNo}
                </MdTypography>
              </div>
            </Section>
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <Section title="">
              <div className="grid grid-cols-[160px_1fr] gap-4">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Truck Vessel
                </MdTypography>
                <div>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-onSurface"
                  >
                    {currentBookingData?.vessel.vesselName}
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline"
                  >
                    {DateTime.fromJSDate(faker.date.recent()).toFormat(
                      "yyyy-MM-dd HH:mm"
                    )}
                  </MdTypography>
                </div>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Pre Carrier
                </MdTypography>
                <div>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-onSurface"
                  >
                    {currentBookingData?.vessel.vesselName}
                  </MdTypography>
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="text-outline"
                  >
                    {DateTime.fromJSDate(faker.date.recent()).toFormat(
                      "yyyy-MM-dd HH:mm"
                    )}
                  </MdTypography>
                </div>
              </div>
            </Section>
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <Section title="">
              <div className="grid grid-cols-[160px_1fr] gap-4">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Shipper
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].parties.shipper.name}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Freight Forwarder
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].parties.freightForwarder.name || "-"}
                </MdTypography>
              </div>
            </Section>
          </div>
          <DividerComponent className="my-8" />

          <ContainerSection data={dataSet[0].container} />
          <DividerComponent className="my-8" />
          <div className="flex items-stretch">
            <Section title="Cargo">
              <div className="grid grid-cols-[160px_1fr] gap-4">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Total Package
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {faker.number.int({ min: 10, max: 1000 })}
                  <span className="text-outline ml-2">Unit</span>
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Total Weight
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.grossWeight}
                  <span className="text-outline ml-2">
                    {dataSet[0].cargoPickUpReturn.grossWeightUnit}
                  </span>
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Total Measure
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {faker.number.int({
                    min: 100,
                    max: 1000,
                  })}
                  <span className="text-outline ml-2">CBM</span>
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Commodity
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.commodity.description}
                </MdTypography>
              </div>
            </Section>
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <Section title="Empty Pick Up">
              <div className="grid grid-cols-[160px_1fr] gap-4">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Date
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.emptyPickUpDate?.toFormat(
                    "yyyy-MM-dd"
                  ) ?? "-"}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Yard
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.emptyPickUpLocation.yardName ||
                    "-"}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Address
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.emptyPickUpLocation.address ||
                    "-"}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Tel No.
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.emptyPickUpLocation
                    .customerNo || "-"}
                </MdTypography>
              </div>
            </Section>
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <Section title="Full Return">
              <div className="grid grid-cols-[160px_1fr] gap-4">
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Date
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.fullReturnDate?.toFormat(
                    "yyyy-MM-dd"
                  ) ?? "-"}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Yard
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.fullReturnLocation.yardName ||
                    "-"}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Address
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.fullReturnLocation.address ||
                    "-"}
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline"
                >
                  Tel No.
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-onSurface"
                >
                  {dataSet[0].cargoPickUpReturn.fullReturnLocation.customerNo ||
                    "-"}
                </MdTypography>
              </div>
            </Section>
            <DividerComponent
              className="mx-8 border-dotted"
              orientation="vertical"
            />
            <Section title="Special Instruction on Booking">
              <MdTypography
                variant="body"
                size="medium"
                className="flex-1 flex flex-col"
              >
                {dataSet[0].additionalInformation.specialInstruction
                  .split("\n")
                  .map((line, index) => <div key={index}>{line}</div>) || "-"}
              </MdTypography>
            </Section>
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
        </div>
      </div>
    </div>
  );
}
