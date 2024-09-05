import { useRecoilValue } from "recoil";

import LabelChip from "@/app/components/label-chip";
import { MdTypography } from "@/app/components/typography";
import { QuotationTermsState } from "@/app/store/pricing.store";
import styles from "@/app/styles/base.module.css";
import {
  MdFilterChip,
  MdIcon,
  MdOutlinedButton,
  MdTextButton,
} from "@/app/util/md3";
import { Download, SwapHorizOutlined } from "@mui/icons-material";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { QuotationListItem } from "../components/listitem";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { createDummyVesselInformation } from "../../../schedule/util";
import { FilterChipMenu } from "@/app/components/filter-chip-menu";
import { useMemo } from "react";
import classNames from "classnames";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";

export default function QuotationList({
  onResearch,
}: {
  onResearch: () => void;
}) {
  const quotationTerms = useRecoilValue(QuotationTermsState);
  const quotationItems = useMemo(() => {
    return Array.from({
      length: faker.number.int({
        min: 0,
        max: 5,
      }),
    }).map((_, index) => ({
      id: faker.string.uuid(),
      etd: DateTime.fromJSDate(faker.date.past()),
      eta: DateTime.fromJSDate(faker.date.future()),
      origin: quotationTerms.origin,
      destination: quotationTerms.destination,
      vessel: createDummyVesselInformation(),
      containers: quotationTerms.containers,
    }));
  }, [
    quotationTerms.containers,
    quotationTerms.destination,
    quotationTerms.origin,
  ]);
  const cx = classNames.bind(styles);

  return (
    <>
      <div className={cx(styles.area)}>
        <div className="flex items-end">
          <div>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline mb-1"
            >
              Origin
            </MdTypography>
            <LabelChip label={quotationTerms.origin?.yardName} />
          </div>
          <SwapHorizOutlined className="mb-3 mx-4" />
          <div>
            <MdTypography
              variant="label"
              size="medium"
              className="text-outline mb-1"
            >
              Destination
            </MdTypography>
            <LabelChip label={quotationTerms.destination?.yardName} />
          </div>
        </div>
        <div className="flex justify-between">
          {/* <TermsItem
            title="Port of Loading"
            value={quotationTerms.pol?.yardName || "-"}
          />
          <TermsItem
            title="Port of Discharge"
            value={quotationTerms.pod?.yardName || "-"}
          /> */}
          <TermsItem
            title="Departure Date"
            value={quotationTerms.departureDate.toFormat("yyyy-MM-dd")}
          />
          <TermsItem
            title="Service Term"
            value={
              quotationTerms.originServiceTerm +
              " - " +
              quotationTerms.destinationServiceTerm
            }
          />
          <TermsItem
            title="Container"
            value={quotationTerms.containers
              .map((container) => {
                return container.containerType + " x " + container.quantity;
              })
              .join(", ")}
          />
          <TermsItem title="Commodity" value={`Freight All Kinds`} />
          <TermsItem
            title="Weight"
            value={
              quotationTerms.grossWeight
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " " +
              quotationTerms.weightUnit
            }
          />
          <MdOutlinedButton onClick={onResearch}>Re-Search</MdOutlinedButton>
        </div>
      </div>
      <div className={cx(styles.area, "flex-1")}>
        {quotationItems.length === 0 ? (
          <>
            <EmptyResultPlaceholder text={"No Quotation Available"} />
          </>
        ) : (
          <>
            <div className="flex gap-4 justify-between items-center ">
              <div className="flex gap-4 items-center ">
                <FilterChipMenu
                  initialValue="Earliest Departure"
                  options={[
                    "Earliest Departure",
                    "Earliest Arrival",
                    "Fastest Transit Time",
                  ]}
                />
                <MdFilterChip label="Direct Only" />
              </div>
              <MdTextButton hasIcon className="h-fit">
                <MdIcon slot="icon">
                  <Download fontSize="small" />
                </MdIcon>
                Download
              </MdTextButton>
            </div>
            <div className="flex flex-col gap-4">
              {quotationItems.map((item) => (
                <QuotationListItem
                  key={item.id}
                  eta={item.eta}
                  etd={item.etd}
                  origin={item.origin}
                  destination={item.destination}
                  vessel={item.vessel}
                  containers={item.containers}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const TermsItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <MdTypography variant="label" size="medium" className="text-outline">
        {title}
      </MdTypography>
      <MdTypography variant="body" size="medium">
        {value}
      </MdTypography>
    </div>
  );
};
