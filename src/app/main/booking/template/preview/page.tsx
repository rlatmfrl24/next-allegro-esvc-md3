"use client";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import PageTitle from "@/app/components/title-components";
import { BookingTemplateListState } from "@/app/store/booking.store";
import styles from "@/app/styles/base.module.css";
import { MdIcon, MdOutlinedButton } from "@/app/util/md3";
import { ChevronLeft } from "@mui/icons-material";
import LocationScheduleSection from "../components/preview/location-schedule";
import CargoSection from "../components/preview/cargo";
import AttachmentSection from "../components/preview/attachment";
import ContactInformationSection from "../../information/components/contact-information";
import PartiesSection from "../../information/components/parties";
import ContainerSection from "../../information/components/contaienr";

export default function BookingTemplatePreview() {
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
        </div>
      </div>
    </div>
  );
}
