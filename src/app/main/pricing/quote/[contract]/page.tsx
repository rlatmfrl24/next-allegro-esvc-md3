"use client";

import { MdTypography } from "@/app/components/typography";
import { QuotationTermsState } from "@/app/store/pricing.store";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdFilledButton,
  MdIcon,
  MdOutlinedButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import VesselIcon from "@/../public/icon_ship_route.svg";
import { RoutePanel } from "../components/route-panel";
import { PricePanel } from "../components/price-panel";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";
import classNames from "classnames";

export default function QuotationSelection({
  params,
}: {
  params: { contract: string };
}) {
  const cx = classNames.bind(styles);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const quotationTerms = useRecoilValue(QuotationTermsState);
  const tempCondition = useMemo(() => {
    return {
      eta: DateTime.fromJSDate(faker.date.future()),
      etd: DateTime.fromJSDate(faker.date.past()),
    };
  }, []);
  const router = useRouter();

  return (
    <div aria-label="container" className={styles.container}>
      <div className="flex items-center gap-4">
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
        <MdTypography variant="title" size="large" className="text-outline">
          Contract No.{" "}
          <span className="text-onSurface">
            {params.contract.toUpperCase() || "N/A"}
          </span>
        </MdTypography>
      </div>
      <div className={styles.area}>
        <div className="flex gap-8">
          <div className="flex flex-1 flex-col">
            <div className="relative flex items-center justify-center flex-1 bg-surface">
              <div aria-label="route-origin" className="text-right">
                <MdTypography
                  variant="headline"
                  size="small"
                  className="text-primary"
                >
                  {quotationTerms.origin?.code || "N/A"}
                </MdTypography>
                <MdTypography variant="body" size="small">
                  {quotationTerms.origin?.yardName || "N/A"}
                </MdTypography>
              </div>
              <div
                aria-label="route-middle"
                className="flex items-start w-32 mx-4"
              >
                <DividerComponent className="border-dotted border-b-2 w-8" />
                <VesselIcon className="mx-4 w-6 min-w-6 -translate-y-3" />
                <DividerComponent className="border-dotted border-b-2 w-8" />
              </div>
              <div aria-label="route-destination">
                <MdTypography
                  variant="headline"
                  size="small"
                  className="text-primary"
                >
                  {quotationTerms.destination?.code || "N/A"}
                </MdTypography>
                <MdTypography variant="body" size="small">
                  {quotationTerms.destination?.yardName || "N/A"}
                </MdTypography>
              </div>
            </div>
          </div>
          <DividerComponent orientation="vertical" />
          <div className="flex-1 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-6">
              <SimpleItem
                title="Departure Date"
                value={
                  quotationTerms.departureDate.toFormat("yyyy-MM-dd") || "-"
                }
              />

              <div>
                <MdTypography
                  variant="body"
                  size="medium"
                  className="text-outline mb-1"
                >
                  Transit Time
                </MdTypography>
                <div className="flex">
                  <MdTypography
                    variant="body"
                    size="medium"
                    prominent
                    className="text-onSurface"
                  >
                    {tempCondition.eta.diff(tempCondition.etd, [
                      "days",
                      "hours",
                      "minutes",
                    ]).days + " days"}
                  </MdTypography>
                  <MdTypography
                    variant="label"
                    size="medium"
                    className="px-2 py-0.5 bg-secondaryContainer rounded-lg ml-2 h-fit"
                  >
                    {faker.number.int({
                      min: 1,
                      max: 2,
                    }) === 1 ? (
                      "Direct"
                    ) : (
                      <>
                        {"+"}
                        {faker.number.int({
                          min: 1,
                          max: 2,
                        })}{" "}
                        Transshipment
                      </>
                    )}
                  </MdTypography>
                </div>
              </div>

              <SimpleItem
                title="Container"
                value={quotationTerms.containers
                  .map((container) => {
                    return container.containerType + " x " + container.quantity;
                  })
                  .join(", ")}
              />
              <SimpleItem
                title="Service Term"
                value={
                  quotationTerms.originServiceTerm +
                  " - " +
                  quotationTerms.destinationServiceTerm
                }
              />
              <SimpleItem title="Commodity" value={"Freight All Kinds"} />

              <SimpleItem
                title="Weight"
                value={
                  quotationTerms.grossWeight
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  " " +
                  quotationTerms.weightUnit
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-center border border-primary rounded-lg overflow-hidden">
            <div className="h-2 bg-primary w-full"></div>
            <div className="flex-1 flex-col flex justify-center p-6 gap-4">
              <div className="flex gap-1 items-center justify-center">
                <label
                  onClick={() => {
                    setAgreeTerms(!agreeTerms);
                  }}
                  className="flex items-center"
                >
                  <MdCheckbox checked={agreeTerms} />
                </label>
                <MdTypography variant="body" size="small">
                  I agree the
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="small"
                  className="text-primary underline"
                  prominent
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Terms & Conditions
                </MdTypography>
              </div>

              <MdFilledButton
                disabled={!agreeTerms}
                className="w-full"
                onClick={() => {
                  router.push(
                    `/main/booking/request?quoteNumber=${params.contract}`
                  );
                }}
              >
                <span>
                  Booking Request&nbsp;&nbsp;&nbsp;Total{" "}
                  {faker.number
                    .int({
                      min: 2000,
                      max: 20000,
                    })
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  USD
                </span>
              </MdFilledButton>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cx(
          styles.area,
          styles["no-padding"],
          "overflow-hidden gap-0"
        )}
      >
        <div className="h-2 bg-secondaryContainer"></div>
        <div className="flex gap-8 px-6 pb-6">
          <RoutePanel
            eta={tempCondition.eta}
            etd={tempCondition.etd}
            origin={quotationTerms.origin}
            destination={quotationTerms.destination}
          />
          <PricePanel containers={quotationTerms.containers} />
        </div>
      </div>
    </div>
  );
}

const SimpleItem = ({ title, value }: { title: string; value: string }) => (
  <div>
    <MdTypography variant="body" size="medium" className="text-outline mb-1">
      {title}
    </MdTypography>
    <MdTypography
      variant="body"
      size="medium"
      prominent
      className="text-onSurface"
    >
      {value}
    </MdTypography>
  </div>
);
