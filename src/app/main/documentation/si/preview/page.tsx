"use client";

import LabelChip from "@/app/components/label-chip";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  SIEditContactInformationState,
  SIEditContainerState,
  SIEditMarkDescriptionState,
  SIEditPartiesState,
  SIEditRouteBLState,
  SIEditStepState,
} from "@/app/store/si.store";
import styles from "@/app/styles/base.module.css";
import siStyles from "@/app/styles/si.module.css";
import { SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Fax, Mail, Phone } from "@mui/icons-material";
import classNames from "classnames";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SIPreview() {
  const partiesData = useRecoilValue(SIEditPartiesState);
  const routeBLData = useRecoilValue(SIEditRouteBLState);
  const containerData = useRecoilValue(SIEditContainerState);
  const markDescriptionData = useRecoilValue(SIEditMarkDescriptionState);
  const contactInformationData = useRecoilValue(SIEditContactInformationState);

  const setSIEditStep = useSetRecoilState(SIEditStepState);
  const cx = classNames.bind(styles);

  const siBaseData = useMemo(() => {
    return {
      requestNumber: `R${faker.string.numeric(10)}`,
      bookingNumber: faker.string.alphanumeric(12).toUpperCase(),
      blState: faker.helpers.arrayElement(Object.values(SIState)),
      blNumber: faker.string.alphanumeric(12).toUpperCase(),
      requestBlType: faker.helpers.arrayElement([
        "O.BL",
        "SeaWaybill",
        "Surrender",
        "None",
      ]),
      actualShipper: faker.person.fullName(),
      SiCutOffTime: DateTime.local(),
      requestUpdateDate: DateTime.local(),
      vessel: createDummyVesselInformation(),
      origin: faker.location.city(),
      destination: faker.location.city(),
      bookingVia: faker.helpers.arrayElement(["web", "edi", "general"]),
      estimatedTimeofBerth: DateTime.local(),
      estimatedTimeofDeparture: DateTime.local(),
      estimatedTimeofArrival: DateTime.local(),
      blType: faker.helpers.arrayElement(["", "FCL", "LCL"]),
      remarks: faker.helpers.maybe(() => faker.lorem.sentence()),
    };
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Shipping Instruction Preview" />
      <div className={styles.area}>
        <div
          aria-label="title-area"
          className="flex items-center justify-between"
        >
          <MdTypography
            variant="headline"
            size="medium"
            className="text-primary"
          >
            Shipping Instruction
          </MdTypography>
          <div className="flex items-center gap-2">
            <LabelChip
              label="Contact Info."
              className="bg-surfaceContainerHigh"
            />
            <MdTypography variant="body" size="medium" prominent>
              {contactInformationData.name}
            </MdTypography>
            <DividerComponent orientation="vertical" className="h-4" />
            <MdTypography variant="body" size="medium">
              <Phone
                sx={{ fontSize: 16 }}
                className="text-outlineVariant mr-1"
              />
              {contactInformationData.telNumber}
            </MdTypography>
            <DividerComponent orientation="vertical" className="h-4" />
            <MdTypography variant="body" size="medium">
              <Phone
                sx={{ fontSize: 16 }}
                className="text-outlineVariant mr-1"
              />
              {contactInformationData.phone}
            </MdTypography>
            <DividerComponent orientation="vertical" className="h-4" />
            <MdTypography variant="body" size="medium">
              <Fax sx={{ fontSize: 16 }} className="text-outlineVariant mr-1" />
              {contactInformationData.phone}
            </MdTypography>
            <DividerComponent orientation="vertical" className="h-4" />
            <MdTypography variant="body" size="medium">
              <Mail
                sx={{ fontSize: 16 }}
                className="text-outlineVariant mr-1"
              />
              {contactInformationData.emailRecipient[0]}
            </MdTypography>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 bg-primary gap-px border-y border-y-primary mt-4">
          <div
            className={cx(
              siStyles["preview-section"],
              "col-span-2 row-span-2 flex-col"
            )}
          >
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Shipper/Exporter
            </MdTypography>
            <MdTypography variant="body" size="medium" prominent>
              {partiesData.shipper.companyName}
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "col-span-2")}>
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Booking No.
              </MdTypography>
              <MdTypography variant="body" size="medium">
                {siBaseData.bookingNumber}
              </MdTypography>
            </div>
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Document No.
              </MdTypography>
              <MdTypography variant="body" size="medium">
                {siBaseData.blNumber}
              </MdTypography>
            </div>
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Export Doc
              </MdTypography>
              <MdTypography variant="body" size="medium">
                {`?`}
              </MdTypography>
            </div>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Export References
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {partiesData.exportReference.split("\n").map((line, index) => {
                return (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </MdTypography>
          </div>
          <div className="bg-surface col-span-2">Consignee</div>
          <div className="bg-surface col-span-2">
            Forwarding Agent References
          </div>
          <div className="bg-surface col-span-2">Notify Party</div>
          <div className="bg-surface col-span-2">Also Notify</div>
          <div className="bg-surface">Vessel Voyage</div>
          <div className="bg-surface">Pre Carriage By</div>
          <div className="bg-surface col-span-2">Type of Move</div>
          <div className="bg-surface">Pier or Place of Receipt</div>
          <div className="bg-surface">Port of Loading</div>
          <div className="bg-surface col-span-2">
            Point and Country of Origin
          </div>
          <div className="bg-surface">Port of Discharge</div>
          <div className="bg-surface">Place of delivery</div>
          <div className="bg-surface col-span-2">Final Destination</div>
          <div className="bg-surface col-span-2">Weight</div>
          <div className="bg-surface col-span-2">HS Code</div>
          <div className="bg-surface">Container No</div>
          <div className="bg-surface">Mark & Nos</div>
          <div className="bg-surface col-span-2">Kind of Packages</div>
          <div className="bg-surface col-span-2">B/L Information</div>
          <div className="bg-surface col-span-2">
            Email Notification Subscription
          </div>
        </div>
      </div>
    </div>
  );
}
