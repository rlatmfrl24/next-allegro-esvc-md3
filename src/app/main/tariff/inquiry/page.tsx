"use client";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";
import { ChargeInquiryTable } from "./table";
import { InfoTooltipButton } from "@/app/components/info-tooltip-button";
import { ContractNumberSelector } from "@/app/components/update-contract-number";

export default function ChargeInquiryPage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [searchType, setSearchType] = useState<"outbound" | "inbound">(
    "outbound"
  );
  const [currentTab, setCurrentTab] = useState<
    "bl" | "container" | "customer" | "contract"
  >("bl");

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Charge Inquiry" />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="B/L No."
            selected={currentTab === "bl"}
            onClick={() => {
              setCurrentTab("bl");
              setPageState("unsearch");
            }}
          />
          <MdOutlinedSegmentedButton
            label="Container No."
            selected={currentTab === "container"}
            onClick={() => {
              setCurrentTab("container");
              setPageState("unsearch");
            }}
          />
          <MdOutlinedSegmentedButton
            label="By Type of Customer"
            selected={currentTab === "customer"}
            onClick={() => {
              setCurrentTab("customer");
              setPageState("unsearch");
            }}
          />
          <MdOutlinedSegmentedButton
            label="Contract No."
            selected={currentTab === "contract"}
            onClick={() => {
              setCurrentTab("contract");
              setPageState("unsearch");
            }}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 p-1">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="cursor-pointer"
          >
            <MdRadio
              name="search-type"
              className="mr-2"
              checked={searchType === "outbound"}
              onClick={() => {
                setSearchType("outbound");
              }}
            />
            Outbound
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="cursor-pointer"
          >
            <MdRadio
              name="search-type"
              className="mr-2"
              checked={searchType === "inbound"}
              onClick={() => {
                setSearchType("inbound");
              }}
            />
            Inbound
          </MdTypography>
        </div>
        <div className="flex items-end">
          <div className="flex-1">
            {
              {
                bl: <BlNumberCriteria />,
                container: <ContainerNumberCriteria />,
                customer: <TypeCustomerCriteria />,
                contract: <ContractNumberCriteria />,
              }[currentTab]
            }
          </div>
          <div className="flex gap-4 justify-end">
            <MdTextButton
              onClick={() => {
                setPageState("unsearch");
              }}
            >
              Reset
            </MdTextButton>
            <MdFilledButton
              onClick={() => {
                setPageState("search");
              }}
            >
              Search
            </MdFilledButton>
          </div>
        </div>
      </div>
      <div className={styles.area}>
        {
          {
            unsearch: (
              <EmptyResultPlaceholder
                className="my-12"
                text="Please enter search criteria to view the result."
              />
            ),
            search: (
              <ChargeInquiryTable
                tableType={
                  currentTab === "bl"
                    ? "complex"
                    : currentTab === "container"
                    ? "complex"
                    : currentTab === "customer"
                    ? "simple"
                    : "simple"
                }
              />
            ),
          }[pageState]
        }
      </div>
    </div>
  );
}

const BlNumberCriteria = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <NAOutlinedTextField
          value={inputQuery}
          handleValueChange={(value) => {
            setInputQuery(value);
          }}
          label="B/L No. (Multi)"
          className="w-1/2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (queries.includes(inputQuery)) return;
              setQueries([...queries, inputQuery]);
              setInputQuery("");
            }
          }}
        />
        <InfoTooltipButton title="Tooltip" supportingText="Tooltip Text" />
      </div>
      <MdChipSet>
        {queries.map((query, index) => (
          <div key={query}>
            <MdInputChip
              label={query}
              selected
              remove={() => {
                setQueries(queries.filter((q, i) => i !== index));
              }}
            />
          </div>
        ))}
      </MdChipSet>
    </div>
  );
};

const ContainerNumberCriteria = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <NAOutlinedTextField
          value={inputQuery}
          handleValueChange={(value) => {
            setInputQuery(value);
          }}
          label="Container No. (Multi)"
          className="w-1/2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (queries.includes(inputQuery)) return;
              setQueries([...queries, inputQuery]);
              setInputQuery("");
            }
          }}
        />
        <InfoTooltipButton title="Tooltip" supportingText="Tooltip Text" />
      </div>
      <MdChipSet>
        {queries.map((query, index) => (
          <div key={query}>
            <MdInputChip
              label={query}
              selected
              remove={() => {
                setQueries(queries.filter((q, i) => i !== index));
              }}
            />
          </div>
        ))}
      </MdChipSet>
    </div>
  );
};

const TypeCustomerCriteria = () => {
  return (
    <div className="flex gap-4 items-center">
      <DateRangePicker label="Booking Date" />
      <MdTypography
        tag="label"
        variant="label"
        size="large"
        className="cursor-pointer"
      >
        <MdRadio name="customer-type" className="mr-2" checked />
        By Shipper
      </MdTypography>
      <MdTypography
        tag="label"
        variant="label"
        size="large"
        className="cursor-pointer"
      >
        <MdRadio name="customer-type" className="mr-2" />
        By Consignee
      </MdTypography>
    </div>
  );
};

const ContractNumberCriteria = () => {
  const tempContracts = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <DateRangePicker label="Booking Date " />
      <ContractNumberSelector contracts={tempContracts} />
    </div>
  );
};
