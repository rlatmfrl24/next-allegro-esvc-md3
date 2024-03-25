"use client";

import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { QuotationTermsState } from "@/app/store/pricing.store";
import styles from "@/app/styles/base.module.css";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

export default function QuotationSelection({
  params,
}: {
  params: { contract: string };
}) {
  const [quotationTerms, setQuotationTerms] =
    useRecoilState(QuotationTermsState);

  const tempCondition = useMemo(() => {
    return {
      eta: DateTime.fromJSDate(faker.date.future()),
      etd: DateTime.fromJSDate(faker.date.past()),
    };
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Online Quote" />
      <div className={styles.area}>
        <div className="flex gap-8">
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between items-center ">
              <MdTypography
                variant="title"
                size="large"
                className="text-outline"
              >
                Contract No.{" "}
                <span className="text-onSurface">
                  {params.contract.toUpperCase() || "N/A"}
                </span>
              </MdTypography>
              <MdTypography
                variant="label"
                size="small"
                className="bg-surfaceContainerLow rounded-full px-4 py-2"
              >
                <span className="text-outline mr-2">Validity Date</span>
                {tempCondition.etd.toFormat("yyyy-MM-dd")} ~{" "}
                {tempCondition.eta.toFormat("yyyy-MM-dd")}
              </MdTypography>
            </div>
            <div></div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3">
              <SimpleItem
                title="Departure Date"
                value={
                  quotationTerms.departureDate.toFormat("yyyy-MM-dd") || "-"
                }
              />
              <SimpleItem
                title="Service Term"
                value={
                  quotationTerms.originServiceTerm +
                  " - " +
                  quotationTerms.destinationServiceTerm
                }
              />
            </div>
          </div>
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
