"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdElevation,
  MdFilledButton,
  MdInputChip,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import classNames from "classnames";
import { CSSProperties, useState } from "react";
import { VGMTable } from "./table";
import { AnimatePresence, motion } from "framer-motion";
import NaOutlinedSegmentedButton from "@/app/components/na-outlined-segmented-button";

export default function VGMSearch() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [searchType, setSearchType] = useState<"booking" | "container">(
    "booking"
  );

  const [queris, setQueries] = useState<string[]>([]);

  return (
    <div
      id="vgm-container"
      aria-label="container"
      className={cx(styles.container)}
    >
      <PageTitle title="VGM" category="Documents" href="/main/documents/vgm" />
      <div className={cx(styles.area)}>
        <MdOutlinedSegmentedButtonSet>
          <NaOutlinedSegmentedButton
            onClick={() => {
              setSearchType("booking");
              setQueries([]);
            }}
            selected={searchType === "booking"}
            label="Booking No."
          />
          <NaOutlinedSegmentedButton
            onClick={() => {
              setSearchType("container");
              setQueries([]);
            }}
            selected={searchType === "container"}
            label="Container No."
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <NAOutlinedTextField
              value=""
              className="w-[832px]"
              // placeholder="Container or Booking or B/L No. (Multi)"
              label={
                searchType === "booking"
                  ? "Booking No. (Multi)"
                  : "Container No. (Multi)"
              }
              onKeyDown={(e) => {
                const query = e.currentTarget.value;

                if (e.key === "Enter") {
                  if (query !== "" && !queris.includes(query))
                    setQueries([...queris, query]);
                  e.currentTarget.value = "";
                }
              }}
            />
            <MdChipSet className="mt-2">
              {queris.map((q, i) => (
                <MdInputChip
                  className={styles.pointChip}
                  key={faker.string.uuid()}
                  label={q}
                  selected={true}
                  remove={() => {
                    setQueries((prev) => {
                      const newQueries = prev.filter((_, index) => index !== i);
                      return newQueries;
                    });
                  }}
                />
              ))}
            </MdChipSet>
          </div>
          <div className="flex gap-4 justify-end">
            <MdTextButton
              onClick={() => {
                setQueries([]);
                setPageState("unseach");
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
      <div className={cx(styles.area, styles.table)}>
        {pageState === "unseach" ? (
          <EmptyResultPlaceholder
            text="Please search for the condition."
            className="my-20"
          />
        ) : (
          <VGMTable />
        )}
      </div>
    </div>
  );
}
