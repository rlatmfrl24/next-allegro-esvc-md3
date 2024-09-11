"use client";

import classNames from "classnames";
import { DateTime } from "luxon";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, Suspense, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import LabelChip from "@/app/components/label-chip";
import NaToggleButton from "@/app/components/na-toggle-button";
import PageTitle, { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
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
  MdAssistChip,
  MdChipSet,
  MdDialog,
  MdElevation,
  MdFilledButton,
  MdFilledTonalButton,
  MdFilledTonalIconButton,
  MdFilterChip,
  MdIcon,
  MdOutlinedButton,
  MdRippleEffect,
} from "@/app/util/md3";
import {
  CargoManifestType,
  SIContainerInputProps,
  SIEditDataType,
  SIState,
  SealKind,
} from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  AttachFile,
  ChevronLeft,
  EditOutlined,
  Email,
  Fax,
  Inventory,
  Inventory2,
  Inventory2Outlined,
  InventoryOutlined,
  Mail,
  Phone,
  Place,
} from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";
import Portal from "@/app/components/portal";
import { SimpleItem } from "@/app/main/booking/request/components/base";
import Item from "@/app/components/dnd/item";
import { m } from "framer-motion";

export default function SIPreviewPage() {
  return (
    <Suspense>
      <SIPreview />
    </Suspense>
  );
}

function SIPreview() {
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
  const wholeContainerList = [
    ...containerData.dry,
    ...containerData.reefer,
    ...containerData.opentop,
    ...containerData.flatrack,
    ...containerData.tank,
    ...containerData.bulk,
  ];

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
    city?: string,
    state?: string,
    zipCode?: string,
    country?: string
  ) {
    return [country, street, city, state, zipCode].filter((x) => x).join(", ");
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
            router.push(`/main/documents/si/edit?targetStep=${target}`);
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
    <div aria-label="container" className={cx(styles.container)}>
      <div className="flex gap-4 items-center">
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
        {requestNumber ? (
          <MdTypography variant="title" size="large">
            <span className="text-outline">Request No. </span>
            {requestNumber}
          </MdTypography>
        ) : (
          <PageTitle title="Shipping Instruction Preview" hasFavorite={false} />
        )}
      </div>

      <div className={cx(styles.area, "mb-12")}>
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
                  {/* {contactInformationData.emailRecipient.length === 0
                    ? "-"
                    : contactInformationData.emailRecipient.join(", ")} */}
                  {contactInformationData.email}
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
              {contactInformationData.fax && (
                <>
                  <DividerComponent orientation="vertical" className="h-4" />
                  <MdTypography variant="body" size="medium">
                    <Fax
                      sx={{ fontSize: 16 }}
                      className="text-outlineVariant mr-1"
                    />
                    {contactInformationData.fax}
                  </MdTypography>
                </>
              )}
              <DividerComponent orientation="vertical" className="h-4" />
              <MdTypography variant="body" size="medium">
                <Place
                  sx={{ fontSize: 16 }}
                  className="text-outlineVariant mr-1"
                />
                {contactInformationData.address}
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
                partiesData.shipper.addressCity,
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
                partiesData.consignee.addressCity,
                partiesData.consignee.addressState,
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
                partiesData.notifyParty.addressCity,
                partiesData.notifyParty.addressState,
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
            {wholeContainerList.map((container, index) => {
              return (
                <>
                  <ContainerPreview key={index} {...container} />
                  {index !== wholeContainerList.length - 1 && (
                    <DividerComponent className="my-4 border-dotted" />
                  )}
                </>
              );
            })}
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
            {markDescriptionData.descriptionFile && (
              <MdAssistChip
                hasIcon
                label={markDescriptionData.descriptionFile.name}
                className="w-fit"
              >
                <MdIcon slot="icon">
                  <AttachFile sx={{ fontSize: 18 }} />
                </MdIcon>
              </MdAssistChip>
            )}

            <MdTypography variant="body" size="medium" className="mt-2">
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
                  House B/L Involve
                </MdTypography>
                <MdTypography variant="body" size="medium">
                  {
                    {
                      none: "None",
                      console: "Console (Exist)",
                      simple: "Simple (Do not Exist)",
                    }[routeBLData.houseBLInvovled]
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
                  !requestNumber
                    ? contactInformationData.subscrition.rollOver
                      ? "checked"
                      : "unchecked"
                    : contactInformationData.subscrition.rollOver
                    ? "disabled-checked"
                    : "disabled"
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
                  !requestNumber
                    ? contactInformationData.subscrition.vesselDeparture
                      ? "checked"
                      : "unchecked"
                    : contactInformationData.subscrition.vesselDeparture
                    ? "disabled-checked"
                    : "disabled"
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
                  !requestNumber
                    ? contactInformationData.subscrition.vesselAdvanceDelay
                      ? "checked"
                      : "unchecked"
                    : contactInformationData.subscrition.vesselAdvanceDelay
                    ? "disabled-checked"
                    : "disabled"
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
      {!requestNumber ? (
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
            <MdFilledTonalButton>Temparary Save</MdFilledTonalButton>
            <MdFilledButton
              onClick={() => {
                const newSICondition = {
                  parties: partiesData,
                  routeBL: routeBLData,
                  container: containerData,
                  markDescription: markDescriptionData,
                  contactInformation: contactInformationData,
                } as SIEditDataType;
                setCurrentSICondition(newSICondition);
                router.push("/main/documents/si");
              }}
            >
              Submit
            </MdFilledButton>
          </div>
        </div>
      ) : (
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
            <MdOutlinedButton>Print</MdOutlinedButton>
            <MdOutlinedButton>B/L View</MdOutlinedButton>
          </div>
        </div>
      )}
    </div>
  );
}

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

const CargoManifestDetail = (props: {
  containerData: SIContainerInputProps;
  manifests: CargoManifestType[];
}) => {
  const containerStore = useRecoilValue(SIEditContainerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManifest, setSelectedManifest] =
    useState<CargoManifestType | null>(props.manifests[0] || null);

  const ItemComponent = (props: { label: string; value: string }) => {
    return (
      <div className="flex-1">
        <MdTypography
          variant="body"
          size="medium"
          prominent
          className="whitespace-nowrap"
        >
          {props.label}
        </MdTypography>
        <MdTypography
          variant="body"
          size="medium"
          className="text-outline whitespace-nowrap"
        >
          {props.value}
        </MdTypography>
      </div>
    );
  };

  return (
    <>
      <MdTypography
        variant="body"
        size="small"
        className="relative ml-2 border border-outline rounded-full px-2 flex items-center text-primary cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <MdRippleEffect />
        <Inventory2 sx={{ fontSize: 12 }} />
        {`x${props.manifests.length}`}
      </MdTypography>
      <Portal selector="#main-container">
        <MdDialog
          open={isModalOpen}
          closed={() => {
            setIsModalOpen(false);
          }}
          className="min-w-[520px]"
        >
          <div slot="headline">
            {/* {props.containerData.containerNumber || "N/A"} -{" "} */}
            {props.containerData.containerNumber
              ? props.containerData.containerNumber + " - "
              : ""}
            {props.containerData.containerSize +
              " " +
              props.containerData.containerType || "N/A"}
          </div>
          <div slot="content" className="flex flex-col">
            <MdChipSet className="flex">
              {props.manifests.map((manifest, index) => {
                return (
                  <MdFilterChip
                    key={index}
                    selected={selectedManifest?.uuid === manifest.uuid}
                    label={`Cargo #${index + 1}`}
                    onClick={() => {
                      setSelectedManifest(manifest);
                    }}
                  />
                );
              })}
            </MdChipSet>
            <DividerComponent className="my-4" />
            <DetailTitle title="Cargo Information" />
            <div className="flex flex-col gap-4 my-4">
              <ItemComponent
                label="Package"
                value={
                  selectedManifest?.packageQuantity +
                    " " +
                    selectedManifest?.packageType || "-"
                }
              />
              <div className="flex">
                <ItemComponent
                  label="Weight"
                  value={
                    (selectedManifest?.weight
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "-") +
                    " " +
                    containerStore.weightUnit
                  }
                />
                <ItemComponent
                  label="Measurement"
                  value={
                    (selectedManifest?.measurement
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "-") +
                    " " +
                    containerStore.measurementUnit
                  }
                />
              </div>
              <ItemComponent
                label="Description"
                value={selectedManifest?.cargoInformation.description || "-"}
              />
            </div>
            <DetailTitle title="Commodity Code" />
            <div className="flex my-4">
              <ItemComponent
                label="HTS Code(U.S.)"
                value={selectedManifest?.commodityCode.htsCodeUS || "-"}
              />
              <ItemComponent
                label="HS Code(EU, ASIA)"
                value={selectedManifest?.commodityCode.hisCodeEUASIA || "-"}
              />
            </div>
          </div>
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Cancel
            </MdOutlinedButton>
          </div>
        </MdDialog>
      </Portal>
    </>
  );
};

const ContainerPreview = (containerData: SIContainerInputProps) => {
  const containerStore = useRecoilValue(SIEditContainerState);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <MdTypography variant="body" size="large" prominent className="flex-1">
          {containerData.containerNumber || "-"}
        </MdTypography>
        <MdTypography
          variant="body"
          size="small"
          prominent
          className="text-primary"
        >
          {containerData.containerSize +
            " " +
            containerData.containerType +
            " "}
        </MdTypography>
        {containerData.hasCargoManifest && (
          <CargoManifestDetail
            containerData={containerData}
            manifests={containerData.cargoManifest}
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <MdTypography
          variant="body"
          size="small"
          prominent
          className="text-primary"
        >
          Seal 01
        </MdTypography>
        <MdTypography variant="body" size="small" prominent className="flex-1">
          {containerData.sealData[0].sealNumber || "-"}
        </MdTypography>
        <DividerComponent orientation="vertical" className="h-3" />
        <MdTypography variant="label" size="small" className="text-outline">
          {/* {{
            electronic: "Electronic Seal",
            merchanical: "Merchanical Seal",
          }[containerData.firstSeal.type] +
            ", " +
            {
              [SealKind.Shipper]: "Shipper",
              [SealKind.Carrier]: "Carrier",
              [SealKind.Consolidator]: "Consolidator",
              [SealKind.Customs]: "Customs",
              [SealKind.Unknown]: "Unknown",
              [SealKind["Quarantine Agency"]]: "Quarantine Agency",
              [SealKind["Terminal Agency"]]: "Terminal Agency",
            }[containerData.firstSeal.kind]} */}
          {containerData.sealData[0].sealType +
            ", " +
            containerData.sealData[0].sealKind}
        </MdTypography>
      </div>
      {containerData.sealData.length > 1 && (
        <div className="flex items-center gap-2">
          <MdTypography
            variant="body"
            size="small"
            prominent
            className="text-primary"
          >
            Seal 02
          </MdTypography>
          <MdTypography
            variant="body"
            size="small"
            prominent
            className="flex-1"
          >
            {containerData.sealData[1].sealNumber || "-"}
          </MdTypography>
          <DividerComponent orientation="vertical" className="h-3" />
          <MdTypography variant="label" size="small" className="text-outline">
            {/* {{
              electronic: "Electronic Seal",
              merchanical: "Merchanical Seal",
            }[containerData.secondSeal.type] +
              ", " +
              {
                [SealKind.Shipper]: "Shipper",
                [SealKind.Carrier]: "Carrier",
                [SealKind.Consolidator]: "Consolidator",
                [SealKind.Customs]: "Customs",
                [SealKind.Unknown]: "Unknown",
                [SealKind["Quarantine Agency"]]: "Quarantine Agency",
                [SealKind["Terminal Agency"]]: "Terminal Agency",
              }[containerData.secondSeal.kind]} */}
            {containerData.sealData[1].sealType +
              ", " +
              containerData.sealData[1].sealKind}
          </MdTypography>
        </div>
      )}
      <div className="bg-secondaryContainer rounded p-2 mt-2">
        <div className="flex gap-2 items-center justify-end">
          <MdTypography variant="body" size="small" prominent>
            {containerData.packageQuantity}
          </MdTypography>
          {containerData.packageType && (
            <MdTypography variant="body" size="small" className="text-outline">
              {containerData.packageType}
            </MdTypography>
          )}
        </div>
        <DividerComponent className="my-2 border-dotted" />
        <div className="flex items-center">
          <div className="flex flex-1 gap-2 items-center justify-end">
            <MdTypography variant="body" size="small" prominent>
              {containerData.packageWeight}
            </MdTypography>
            <MdTypography variant="body" size="small" className="text-outline">
              {containerStore.weightUnit}
            </MdTypography>
          </div>
          <DividerComponent orientation="vertical" className="h-4 mx-4" />
          <div className="flex flex-1 gap-2 items-center justify-end">
            <MdTypography variant="body" size="small" prominent>
              {containerData.packageMeasurement}
            </MdTypography>
            <MdTypography variant="body" size="small" className="text-outline">
              {containerStore.measurementUnit}
            </MdTypography>
          </div>
        </div>
      </div>
    </div>
  );
};
