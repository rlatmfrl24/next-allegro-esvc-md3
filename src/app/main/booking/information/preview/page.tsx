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

export default function BookingRequestPreview() {
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
            <LocationScheduleSection hasEdit />
            <DividerComponent className="my-8" />
            <div className="flex items-stretch">
              <BookingRequestorSection hasEdit />
              <DividerComponent
                className="mx-8 border-dotted"
                orientation="vertical"
              />
              <PartiesSection hasEdit />
            </div>
            <DividerComponent className="my-8" />
            <Section title="Container">ddd</Section>
            <DividerComponent className="my-8" />
            <div className="flex items-stretch">
              <CargoSection hasEdit />
              <DividerComponent
                className="mx-8 border-dotted"
                orientation="vertical"
              />
              <AttachmentSection hasEdit />
            </div>
            <DividerComponent className="my-8" />
            <div className="flex items-stretch">
              <Section title="Duplicate reservation">
                <div className="flex flex-col gap-4">
                  <MdTypography variant="body" size="medium">
                    Do you want to make duplicate bookings for the same vessel?
                  </MdTypography>
                  <MdOutlinedTextField value="10" className="w-fit" />
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
                    state="checked"
                  />
                  <NaToggleButton label="Vessel Departure" state="checked" />
                  <NaToggleButton
                    label="Vessel Advance / Delay"
                    state="checked"
                  />
                </div>
              </Section>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-20 w-[calc(100%-80px)] px-4 pb-2">
          <div
            className="relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
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
