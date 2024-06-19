"use client";

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
import classNames from "classnames";
import { useState } from "react";
import { SurrenderTable } from "./table";

export default function BLSurrenderCheck() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [searchType, setSearchType] = useState<"bl" | "container">("bl"); // ["bl", "container"
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle
        title="B/L Surrender Check"
        category="Import"
        href="/main/import/surrender"
      />
      <div className={cx(styles.area)}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={searchType === "bl"}
            onClick={() => setSearchType("bl")}
            label="B/L No."
          />
          <MdOutlinedSegmentedButton
            selected={searchType === "container"}
            onClick={() => setSearchType("container")}
            label="Container No."
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col gap-2 flex-1">
            <NAOutlinedTextField
              value={inputQuery}
              handleValueChange={(value) => {
                setInputQuery(value);
              }}
              label={
                searchType === "bl"
                  ? "B/L No. (Multi)"
                  : "Container No. (Multi)"
              }
              className="w-1/2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputQuery !== "" && !queries.includes(inputQuery))
                    setQueries([...queries, inputQuery]);
                  setInputQuery("");
                }
              }}
            />
            <MdChipSet>
              {queries.map((query, index) => (
                <div key={query}>
                  <MdInputChip
                    label={query}
                    selected={true}
                    remove={() => {
                      setQueries((prev) => {
                        return prev.filter((_, i) => i !== index);
                      });
                    }}
                  />
                </div>
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
      <div className={cx(styles.area)}>
        {pageState === "search" ? (
          <SurrenderTable />
        ) : (
          <EmptyResultPlaceholder
            text="Please search for the condition."
            className="my-12"
          />
        )}
      </div>
    </div>
  );
}
