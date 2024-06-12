"use client";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdOutlinedTextField,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";
import { DetentionStatusTable } from "./table";
import { ContractNumberSelector } from "@/app/components/update-contract-number";

export default function DetentionStatusPage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [boundSelection, setBoundSelection] = useState<"outbound" | "inbound">(
    `outbound`
  );
  const [searchType, setSearchType] = useState<"gate" | "number">("gate");
  const [numberQueries, setNumberQueries] = useState<string[]>([]);
  const tempContracts = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Detention Status" />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="Gate Out Date"
            selected={searchType === "gate"}
            onClick={() => setSearchType("gate")}
          />
          <MdOutlinedSegmentedButton
            label="Booking No. or B/L No."
            selected={searchType === "number"}
            onClick={() => setSearchType("number")}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 px-1 py-1">
          <MdTypography variant="label" size="large" tag="label">
            <MdRadio
              className="mr-2"
              name="bound"
              checked={boundSelection === "outbound"}
              onClick={() => setBoundSelection("outbound")}
            />
            Outbound
          </MdTypography>
          <MdTypography variant="label" size="large" tag="label">
            <MdRadio
              className="mr-2"
              name="bound"
              checked={boundSelection === "inbound"}
              onClick={() => setBoundSelection("inbound")}
            />
            Inbound
          </MdTypography>
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            {searchType === "gate" && (
              <div className="flex gap-4 items-center">
                <DateRangePicker label="Date" />
                <ContractNumberSelector contracts={tempContracts} />
              </div>
            )}
            {searchType === "number" && (
              <div className="flex flex-col gap-2">
                <MdOutlinedTextField
                  label="Booking No. or B/L No."
                  value=""
                  className="w-1/2"
                  onKeyDown={(e) => {
                    const query = e.currentTarget.value;

                    if (e.key === "Enter") {
                      if (query === "" || numberQueries.includes(query)) return;
                      setNumberQueries([...numberQueries, query]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <MdChipSet>
                  {numberQueries.map((query, index) => (
                    <div key={query}>
                      <MdInputChip
                        label={query}
                        remove={() => {
                          setNumberQueries((prev) => {
                            return prev.filter((q) => q !== query);
                          });
                        }}
                      />
                    </div>
                  ))}
                </MdChipSet>
              </div>
            )}
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

        {/* <div className="flex gap-4">
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="cursor-pointer"
          >
            <MdRadio
              className="mr-2"
              checked={searchType === "gate"}
              onClick={() => setSearchType("gate")}
            />
            Discharging/Out Gate
          </MdTypography>
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="cursor-pointer"
          >
            <MdRadio
              className="mr-2"
              checked={searchType === "number"}
              onClick={() => setSearchType("number")}
            />
            Booking No. or B/L No.
          </MdTypography>
        </div>
        {searchType === "gate" ? (
          <div className="flex gap-4">
            <DateRangePicker label="Date" />
            <NAOutlinedListBox options={tempContracts} label="Contract No." />
          </div>
        ) : (
          <div className="flex gap-4">
            <NAOutlinedTextField label="Booking No. or B/L No." value="" />
          </div>
        )}
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
        </div> */}
      </div>
      <div className={styles.area}>
        {pageState === "search" ? (
          <DetentionStatusTable />
        ) : (
          <EmptyResultPlaceholder
            text="Please select the search criteria and click the search button."
            className="my-12"
          />
        )}
      </div>
    </div>
  );
}
