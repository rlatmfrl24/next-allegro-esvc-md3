"use client";

import classNames from "classnames";
import { DateTime } from "luxon";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import LabelChip from "@/app/components/label-chip";
import NaToggleButton from "@/app/components/na-toggle-button";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  sumContainerMeasurement,
  sumContainerQuantity,
  sumContainerWeight,
} from "@/app/main/util";
import {
  CurrentSIConditionState,
  SIEditContactInformationState,
  SIEditContainerState,
  SIEditMarkDescriptionState,
  SIEditPartiesState,
  SIEditRouteBLState,
  SIEditStepState,
} from "@/app/store/si.store";
import styles from "@/app/styles/base.module.css";
import siStyles from "@/app/styles/si.module.css";
import {
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
  MdFilledTonalIconButton,
} from "@/app/util/md3";
import { SIEditDataType, SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { EditOutlined, Fax, Mail, Phone } from "@mui/icons-material";

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
  const [contactInformationData, setContactInformationData] = useRecoilState(
    SIEditContactInformationState
  );

  const setSIEditStep = useSetRecoilState(SIEditStepState);
  const setCurrentSICondition = useSetRecoilState(CurrentSIConditionState);
  const cx = classNames.bind(styles);
  const router = useRouter();

  const searchParams = useSearchParams();
  const requestNumber = searchParams.get("reqNo");

  const siBaseData = useMemo(() => {
    return {
      requestNumber: requestNumber
        ? requestNumber
        : `R${faker.string.numeric(10)}`,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function combineAddress(
    street?: string,
    cityState?: string,
    zipCode?: string,
    country?: string
  ) {
    return [country, street, cityState, zipCode].filter((x) => x).join(", ");
  }

  const ContactInfo = ({
    phoneNumber,
    faxNumber,
    email,
  }: {
    phoneNumber?: string;
    faxNumber?: string;
    email?: string;
  }) => {
    return (
      <div className="flex items-center gap-2">
        {phoneNumber && (
          <>
            <MdTypography variant="body" size="medium">
              <Phone
                sx={{ fontSize: 16 }}
                className="text-outlineVariant mr-1"
              />
              {phoneNumber}
            </MdTypography>
            {(faxNumber || email) && (
              <DividerComponent orientation="vertical" className="h-4" />
            )}
          </>
        )}
        {faxNumber && (
          <>
            <MdTypography variant="body" size="medium">
              <Fax sx={{ fontSize: 16 }} className="text-outlineVariant mr-1" />
              {faxNumber}
            </MdTypography>
            {email && (
              <DividerComponent orientation="vertical" className="h-4" />
            )}
          </>
        )}
        {email && (
          <MdTypography variant="body" size="medium">
            <Mail sx={{ fontSize: 16 }} className="text-outlineVariant mr-1" />
            {email}
          </MdTypography>
        )}
      </div>
    );
  };

  const EditButton = ({ target }: { target: string }) => {
    return (
      !requestNumber && (
        <MdFilledTonalIconButton
          className="absolute w-6 h-6 top-2 right-2"
          onClick={() => {
            setSIEditStep((prev) => {
              const newArray = Object.keys(prev).map((k) => {
                return {
                  ...prev[k as keyof typeof prev],
                  isSelected: k === target,
                };
              });
              const newObject: typeof prev = newArray.reduce((prev, curr) => {
                prev[curr.id as keyof typeof prev] = curr;
                return prev;
              }, {} as typeof prev);

              return newObject;
            });
            router.push(`/main/documentation/si/edit?targetStep=${target}`);
          }}
        >
          <EditOutlined
            sx={{
              fontSize: 16,
            }}
          />
        </MdFilledTonalIconButton>
      )
    );
  };

  return (
    <div aria-label="container" className={cx(styles.container, "mb-11")}>
      {requestNumber ? (
        <MdTypography variant="title" size="large">
          <span className="text-outline">Request No. </span>
          {requestNumber}
        </MdTypography>
      ) : (
        <PageTitle title="Shipping Instruction Preview" />
      )}
      <div className={styles.area}>
        <div aria-label="title-area" className="flex justify-between">
          <MdTypography
            variant="headline"
            size="medium"
            className="text-primary"
          >
            Shipping Instruction
          </MdTypography>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <LabelChip
                label="Contact Info."
                className="bg-surfaceContainerHigh"
              />
              <MdTypography variant="body" size="medium" prominent>
                {contactInformationData.name}
              </MdTypography>
              <>
                <DividerComponent orientation="vertical" className="h-4" />
                <Mail
                  sx={{ fontSize: 16 }}
                  className="text-outlineVariant mr-1"
                />
                <MdTypography variant="body" size="medium">
                  {contactInformationData.emailRecipient.length === 0
                    ? "-"
                    : contactInformationData.emailRecipient.join(", ")}
                </MdTypography>
              </>
            </div>
            <div className="flex justify-end items-center gap-2">
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
                <Fax
                  sx={{ fontSize: 16 }}
                  className="text-outlineVariant mr-1"
                />
                {contactInformationData.phone}
              </MdTypography>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 bg-primary gap-px border-y border-y-primary mt-4">
          <div
            className={cx(
              siStyles["preview-section"],
              "col-span-2 row-span-2 flex-col"
            )}
          >
            <EditButton target="parties" />
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
            <MdTypography variant="body" size="medium">
              {partiesData.shipper.fullAddress}
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {combineAddress(
                partiesData.shipper.addressStreet,
                partiesData.shipper.addressCityState,
                partiesData.shipper.addressZipCode,
                partiesData.shipper.addressCountry
              ) || ""}
            </MdTypography>
            {partiesData.shipper.eoriNumber && (
              <MdTypography variant="body" size="medium">
                {`EORI No: ` + partiesData.shipper.eoriNumber}
              </MdTypography>
            )}
            {partiesData.shipper.usccNumber && (
              <MdTypography variant="body" size="medium">
                {`USCC No: ` + partiesData.shipper.usccNumber}
              </MdTypography>
            )}
            {partiesData.shipper.taxID && (
              <MdTypography variant="body" size="medium">
                {`Tax ID: ` + partiesData.shipper.taxID}
              </MdTypography>
            )}
            <ContactInfo
              phoneNumber={partiesData.shipper.phone}
              faxNumber={partiesData.shipper.fax}
              email={partiesData.shipper.email}
            />
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
            <EditButton target="parties" />
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
            <EditButton target="parties" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Consignee
            </MdTypography>
            <MdTypography variant="body" size="medium" prominent>
              {partiesData.consignee.companyName}
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {partiesData.consignee.fullAddress}
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {combineAddress(
                partiesData.consignee.addressStreet,
                partiesData.consignee.addressCityState,
                partiesData.consignee.addressZipCode,
                partiesData.consignee.addressCountry
              ) || ""}
            </MdTypography>
            {partiesData.consignee.eoriNumber && (
              <MdTypography variant="body" size="medium">
                {`EORI No: ` + partiesData.consignee.eoriNumber}
              </MdTypography>
            )}
            {partiesData.consignee.usccNumber && (
              <MdTypography variant="body" size="medium">
                {`USCC No: ` + partiesData.consignee.usccNumber}
              </MdTypography>
            )}
            {partiesData.consignee.taxID && (
              <MdTypography variant="body" size="medium">
                {`Tax ID: ` + partiesData.consignee.taxID}
              </MdTypography>
            )}
            {partiesData.consignee.contactPerson && (
              <MdTypography variant="body" size="medium">
                {`Contact Person: ` + partiesData.consignee.contactPerson}
              </MdTypography>
            )}
            <ContactInfo
              phoneNumber={partiesData.consignee.phone}
              faxNumber={partiesData.consignee.fax}
              email={partiesData.consignee.email}
            />
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="parties" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Forwarding Agent References
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {StringToSplit({ text: partiesData.forwardingAgentReference })}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="parties" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Notify Party
            </MdTypography>
            <MdTypography variant="body" size="medium" prominent>
              {partiesData.notifyParty.companyName}
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {partiesData.notifyParty.fullAddress}
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {combineAddress(
                partiesData.notifyParty.addressStreet,
                partiesData.notifyParty.addressCityState,
                partiesData.notifyParty.addressZipCode,
                partiesData.notifyParty.addressCountry
              ) || ""}
            </MdTypography>
            {partiesData.notifyParty.eoriNumber && (
              <MdTypography variant="body" size="medium">
                {`EORI No: ` + partiesData.notifyParty.eoriNumber}
              </MdTypography>
            )}
            {partiesData.notifyParty.usccNumber && (
              <MdTypography variant="body" size="medium">
                {`USCC No: ` + partiesData.notifyParty.usccNumber}
              </MdTypography>
            )}
            {partiesData.notifyParty.taxID && (
              <MdTypography variant="body" size="medium">
                {`Tax ID: ` + partiesData.notifyParty.taxID}
              </MdTypography>
            )}
            <ContactInfo
              phoneNumber={partiesData.notifyParty.phone}
              faxNumber={partiesData.notifyParty.fax}
              email={partiesData.notifyParty.email}
            />
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="parties" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Also Notify (Name and full address) / Domestic Routing
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {StringToSplit({ text: partiesData.notifyParty.alsoNotify })}
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Vessel Voyage
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.vesselVoyage}
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              PRE_Carrige by
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.preCarriageBy}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Type of Move
            </MdTypography>
            {routeBLData.serviceTypeFrom && routeBLData.serviceTypeTo && (
              <MdTypography variant="body" size="medium">
                {`${routeBLData.serviceTypeFrom === "cy" ? "CY" : "Door"} - ${
                  routeBLData.serviceTypeTo === "cy" ? "CY" : "Door"
                }`}
              </MdTypography>
            )}
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Pier or Place of Receipt
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.por?.yardName}
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Port of Loading
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.pol?.yardName}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Point and Country of Origin
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.pointAndCountryOfOrigin}
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Port of Discharge
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.pod?.yardName}
            </MdTypography>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Place of Delivery (by on Carrier) *
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.del?.yardName}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Final Destination (For the merchant&apos;s reference only)
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {routeBLData.finalDestination}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-row")}
          >
            <div className="flex-1">
              <EditButton target="container" />
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                Total Gross Weight
              </MdTypography>
              <MdTypography variant="body" size="medium" className="text-right">
                <span className="font-semibold mr-1">
                  {sumContainerWeight([
                    ...containerData.dry,
                    ...containerData.reefer,
                    ...containerData.opentop,
                    ...containerData.flatrack,
                    ...containerData.tank,
                    ...containerData.bulk,
                  ])}
                </span>
                <span className="text-outline">{containerData.weightUnit}</span>
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
              <MdTypography variant="body" size="medium" className="text-right">
                <span className="font-semibold mr-1">
                  {sumContainerMeasurement([
                    ...containerData.dry,
                    ...containerData.reefer,
                    ...containerData.opentop,
                    ...containerData.flatrack,
                    ...containerData.tank,
                    ...containerData.bulk,
                  ])}
                </span>
                <span className="text-outline">
                  {containerData.measurementUnit}
                </span>
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
              <MdTypography variant="body" size="medium" className="text-right">
                <span className="font-semibold mr-1">
                  {sumContainerQuantity([
                    ...containerData.dry,
                    ...containerData.reefer,
                    ...containerData.opentop,
                    ...containerData.flatrack,
                    ...containerData.tank,
                    ...containerData.bulk,
                  ])}
                </span>
              </MdTypography>
            </div>
          </div>
          <div
            className={cx(siStyles["preview-section"], "flex-row col-span-2")}
          >
            <EditButton target="markDescription" />
            <div className="flex-1">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="mb-2"
              >
                HS Code
              </MdTypography>
              <MdTypography variant="body" size="medium">
                {markDescriptionData.hsCode}
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
              <MdTypography variant="body" size="medium">
                {markDescriptionData.customsCommodity}
              </MdTypography>
            </div>
          </div>
          <div className={cx(siStyles["preview-section"], "flex-col")}>
            <EditButton target="container" />
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
            <EditButton target="markDescription" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Mark & Nos.
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="border border-outlineVariant border-dashed p-2"
            >
              {StringToSplit({ text: markDescriptionData.mark })}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "flex-col col-span-2")}
          >
            <EditButton target="markDescription" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              Kind of Packages: Description of Goods
            </MdTypography>
            <MdTypography variant="body" size="medium">
              {StringToSplit({ text: markDescriptionData.description })}
            </MdTypography>
          </div>
          <div
            className={cx(siStyles["preview-section"], "col-span-2 flex-col")}
          >
            <EditButton target="routeBL" />
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="mb-2"
            >
              B/L Information
            </MdTypography>

            <div className="flex">
              <div className="flex-1">
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="mb-2"
                >
                  B/L No.
                </MdTypography>
                <MdTypography variant="body" size="medium">
                  {siBaseData.blNumber}
                </MdTypography>
              </div>
              <DividerComponent
                orientation="vertical"
                className="border-dotted mx-4"
              />
              <div className="flex-1">
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="mb-2"
                >
                  B/L Type
                </MdTypography>
                <MdTypography variant="body" size="medium">
                  {
                    {
                      originalBL: "Original B/L",
                      seaWaybill: "Sea Waybill",
                      surrender: "Surrender",
                      none: "None",
                    }[routeBLData.blType]
                  }
                </MdTypography>
              </div>
              <DividerComponent
                orientation="vertical"
                className="border-dotted mx-4"
              />
              <div className="flex-1">
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="mb-2"
                >
                  Freight Terms
                </MdTypography>
                <MdTypography variant="body" size="medium">
                  {
                    {
                      prepaid: "Prepaid",
                      collect: "Collect",
                    }[routeBLData.freightTerms]
                  }
                </MdTypography>
              </div>
            </div>
            <div>
              <MdTypography
                variant="body"
                size="medium"
                prominent
                className="mb-2 mt-5"
              >
                Remark
              </MdTypography>
              <MdTypography variant="body" size="medium">
                {StringToSplit({ text: routeBLData.remarks })}
              </MdTypography>
            </div>
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
            <div className="flex flex-col gap-1">
              <NaToggleButton
                label="Roll-Over (Including T/S)"
                state={
                  contactInformationData.subscrition.rollOver
                    ? "checked"
                    : "unchecked"
                }
                onClick={() => {
                  setContactInformationData((prev) => {
                    return {
                      ...prev,
                      subscrition: {
                        ...prev.subscrition,
                        rollOver: !prev.subscrition.rollOver,
                      },
                    };
                  });
                }}
              />
              <NaToggleButton
                label="Vessel Departure"
                state={
                  contactInformationData.subscrition.vesselDeparture
                    ? "checked"
                    : "unchecked"
                }
                onClick={() => {
                  setContactInformationData((prev) => {
                    return {
                      ...prev,
                      subscrition: {
                        ...prev.subscrition,
                        vesselDeparture: !prev.subscrition.vesselDeparture,
                      },
                    };
                  });
                }}
              />
              <NaToggleButton
                label="Vessel Advance / Delay"
                state={
                  contactInformationData.subscrition.vesselAdvanceDelay
                    ? "checked"
                    : "unchecked"
                }
                onClick={() => {
                  setContactInformationData((prev) => {
                    return {
                      ...prev,
                      subscrition: {
                        ...prev.subscrition,
                        vesselAdvanceDelay:
                          !prev.subscrition.vesselAdvanceDelay,
                      },
                    };
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-20 w-[calc(100%-80px)] px-4 pb-2 z-10">
        <div
          className="relative w-full bg-surfaceContainerHigh rounded-full flex gap-4 p-2 justify-end"
          style={
            {
              "--md-elevation-level": 4,
            } as CSSProperties
          }
        >
          <MdElevation />
          <MdFilledButton
            onClick={() => {
              const newSICondition = {
                parties: partiesData,
                routeBL: routeBLData,
                container: containerData,
                markDescription: markDescriptionData,
                contactInformation: contactInformationData,
              } as SIEditDataType;
              console.log(newSICondition);
              setCurrentSICondition(newSICondition);
              router.push("/main/documentation/si/submission");
            }}
          >
            Submit
          </MdFilledButton>
        </div>
      </div>
    </div>
  );
}
