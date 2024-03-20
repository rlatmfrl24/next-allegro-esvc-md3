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

const StringToSplit = (props: { text: string }) => {
  return (
    <>
      {props.text.split("\n").map((line, index) => {
        return (
          <span key={index}>
            {line}
            <br />
          </span>
        );
      })}
    </>
  );
};

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
              {StringToSplit({ text: partiesData.exportReference })}
            </MdTypography>
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
              Consignee
            </MdTypography>
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
              Forwarding Agent References
            </MdTypography>
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
              Notify Party
            </MdTypography>
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
              Also Notify (Name and full address) / Domestic Routing
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Vessel Voyage
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              PRE_Carrige by
            </MdTypography>
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
              Type of Move
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Pier or Place of Receipt
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Port of Loading
            </MdTypography>
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
              Point and Country of Origin
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Port of Discharge
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Place of Delivery (by on Carrier) *
            </MdTypography>
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
              Final Destination (For the merchant&apos;s reference only)
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-row")}
          >
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Total Gross Weight
              </MdTypography>
            </div>
            <DividerComponent
              orientation="vertical"
              className="border-dotted mx-4"
            />
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Total Measurement
              </MdTypography>
            </div>
            <DividerComponent
              orientation="vertical"
              className="border-dotted mx-4"
            />
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Total Package
              </MdTypography>
            </div>
          </div>
          <div
            className={cx(siStyles["preview-section"], "flex-row col-span-2")}
          >
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                HS Code
              </MdTypography>
            </div>
            <DividerComponent
              orientation="vertical"
              className="border-dotted mx-4"
            />
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Custom Commodity
              </MdTypography>
            </div>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Container No.
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Mark & Nos.
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "flex-col col-span-2")}
          >
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Kind of Packages: Description of Goods
            </MdTypography>
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
              B/L Information
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "flex-col col-span-2")}
          >
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Email Notification Subscription
            </MdTypography>
          </div>
        </div>
      </div>
    </div>
  );
}
