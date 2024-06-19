"use client";
import { useState } from "react";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { InfoTooltipButton } from "@/app/components/info-tooltip-button";
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

import { ArrivalNoticeTable } from "./table";

export default function ArrivalNoticePage() {
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");
  const [searchType, setSearchType] = useState<"date" | "bl" | "container">(
    "date"
  ); // ["date", "bl", "container"
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="Arrival Notice"
        category="Import"
        href="/main/import/notice"
      />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={searchType === "date"}
            onClick={() => {
              setSearchType("date");
              setQueries([]);
            }}
            label="Onboard/Arrival Date"
          />
          <MdOutlinedSegmentedButton
            selected={searchType === "bl"}
            onClick={() => {
              setSearchType("bl");
              setQueries([]);
            }}
            label="B/L No."
          />
          <MdOutlinedSegmentedButton
            selected={searchType === "container"}
            onClick={() => {
              setSearchType("container");
              setQueries([]);
            }}
            label="Container No."
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            {searchType === "date" && (
              <DateRangePicker label="Onboard/Arrival Date" className="w-fit" />
            )}
            {searchType === "bl" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <NAOutlinedTextField
                    value=""
                    label="B/L No. (Multi)"
                    className="w-1/2"
                    onKeyDown={(e) => {
                      const query = e.currentTarget.value;

                      if (e.key === "Enter") {
                        if (query !== "" && !queries.includes(query))
                          setQueries([...queries, query]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <InfoTooltipButton
                    title={`Please enter KAMBARA KISEN B/L number composed of 3 alphabet characters + 9 digits of number (i/e PUS123456789, Discard the prefix "KKCL").`}
                    supportingText="Ensure your B/L number is assigned by KAMBARA KISEN. Our system does not accept House B/L number assigned by NVOCC or Freight Forwarder."
                  />
                </div>
                <MdChipSet>
                  {queries.map((query) => (
                    <div key={query}>
                      <MdInputChip
                        label={query}
                        selected
                        remove={() => {
                          setQueries(queries.filter((q) => q !== query));
                        }}
                      />
                    </div>
                  ))}
                </MdChipSet>
              </div>
            )}
            {searchType === "container" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <NAOutlinedTextField
                    value=""
                    label="Container No. (Multi)"
                    className="w-1/2"
                    onKeyDown={(e) => {
                      const query = e.currentTarget.value;

                      if (e.key === "Enter") {
                        if (query !== "" && !queries.includes(query))
                          setQueries([...queries, query]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
                <MdChipSet>
                  {queries.map((query) => (
                    <div key={query}>
                      <MdInputChip
                        label={query}
                        selected
                        remove={() => {
                          setQueries(queries.filter((q) => q !== query));
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
      </div>
      <div className={styles.area}>
        {pageState === "search" ? (
          <ArrivalNoticeTable />
        ) : (
          <EmptyResultPlaceholder
            className="my-12"
            text="Please search for the condition."
          />
        )}
      </div>
    </div>
  );
}
