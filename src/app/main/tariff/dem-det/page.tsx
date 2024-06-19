"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import { MdFilledButton, MdRadio, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";
import { DemDetTable } from "./table";

export default function DemDetPage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [searchType, setSearchType] = useState<"outbound" | "inbound">(
    "outbound"
  );
  const tempOriginCoverage = useMemo(() => {
    return Array.from({ length: 200 }, () =>
      faker.string.alpha(6).toUpperCase()
    ).filter((value, index, self) => self.indexOf(value) === index);
  }, []);
  const tempDestination = useMemo(() => {
    return Array.from({ length: 200 }, () => faker.location.country()).filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }, []);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="DEM/DET Tariff"
        category="DEM/DET"
        href="/main/tariff/dem-det"
      />
      <div className={styles.area}>
        <div className="flex gap-4">
          <MdTypography
            tag="label"
            variant="body"
            size="medium"
            className="cursor-pointer"
          >
            <MdRadio
              name="type"
              className="mr-2"
              checked={searchType === "outbound"}
              onClick={() => setSearchType("outbound")}
            />
            Outbound
          </MdTypography>
          <MdTypography
            tag="label"
            variant="body"
            size="medium"
            className="cursor-pointer"
          >
            <MdRadio
              name="type"
              className="mr-2"
              checked={searchType === "inbound"}
              onClick={() => setSearchType("inbound")}
            />
            Inbound
          </MdTypography>
        </div>
        <div className="flex gap-4">
          {searchType === "outbound" ? (
            <>
              <NAOutlinedAutoComplete
                label="Origin Coverage"
                itemList={tempDestination}
              />
              <NAOutlinedListBox
                options={["All", ...tempOriginCoverage]}
                initialValue="All"
                label="Destination"
              />
            </>
          ) : (
            <>
              <NAOutlinedListBox
                options={["All", ...tempOriginCoverage]}
                initialValue="All"
                label="Origin"
              />
              <NAOutlinedAutoComplete
                label="Destination Coverage"
                itemList={tempDestination}
              />
            </>
          )}
          <div className="flex gap-4 justify-end items-end flex-1 h-full">
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
        {pageState === "unsearch" ? (
          <EmptyResultPlaceholder
            className="my-12 "
            text="Please select the search criteria and click the search button."
          />
        ) : (
          <DemDetTable />
        )}
      </div>
    </div>
  );
}
