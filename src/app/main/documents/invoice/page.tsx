"use client";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { InvoiceTable } from "./table";

export default function ImportInvoicePage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [searchType, setSearchType] = useState<"date" | "number">("date");
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Invoice (Outbound)" />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={searchType === "date"}
            onClick={() => {
              setSearchType("date");
              setQueries([]);
            }}
            label="OnBoard/Arrival Date"
          />
          <MdOutlinedSegmentedButton
            selected={searchType === "number"}
            onClick={() => {
              setSearchType("number");
              setQueries([]);
            }}
            label="B/L No."
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 items-end">
          {searchType === "date" && (
            <div className="flex-1">
              <DateRangePicker label="OnBoard/Arrival Date" className="w-fit" />
            </div>
          )}
          {searchType === "number" && (
            <div className="flex-1 flex flex-col gap-2">
              <NAOutlinedTextField
                value={inputQuery}
                handleValueChange={(value) => {
                  setInputQuery(value);
                }}
                className="w-1/2"
                label="B/L No. (Multi)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (
                      inputQuery.trim() === "" ||
                      queries.includes(inputQuery)
                    )
                      return;

                    setQueries([...queries, inputQuery]);
                    setInputQuery("");
                  }
                }}
              />
              <MdChipSet>
                {queries.map((query, index) => (
                  <MdInputChip
                    key={faker.string.uuid()}
                    label={query}
                    selected
                    handleTrailingActionFocus={() => {
                      setQueries(queries.filter((_, i) => i !== index));
                    }}
                  />
                ))}
              </MdChipSet>
            </div>
          )}
          <div className="flex gap-4 justify-end">
            <MdTextButton
              onClick={() => {
                setInputQuery("");
                setQueries([]);
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
                text="Please input search criteria and click 'Search' button to search."
                className="my-12"
              />
            ),
            search: <InvoiceTable />,
          }[pageState]
        }
      </div>
    </div>
  );
}
