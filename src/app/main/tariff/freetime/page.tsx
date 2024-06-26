"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { FreetimeRequestTable } from "./table";
import classNames from "classnames";

export default function FreetimeRequestPage() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle
        title="Freetime Request"
        category="DEM/DET"
        href="/main/tariff/freetime"
      />
      <div className={styles.area}>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <NAOutlinedTextField
              label="B/L No. (Multi)"
              value={inputQuery}
              handleValueChange={(value) => {
                setInputQuery(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputQuery.trim() === "" || queries.includes(inputQuery))
                    return;
                  setQueries([...queries, inputQuery]);
                  setInputQuery("");
                }
              }}
            />
            <MdChipSet>
              {queries.map((query, index) => (
                <div key={index}>
                  <MdInputChip
                    className={styles.pointChip}
                    label={query}
                    selected
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
          <NAOutlinedListBox
            label="Bound"
            options={["Loading Port"]}
            initialValue="Loading Port"
          />
          <NAOutlinedListBox
            label="Tariff Type"
            options={["Demurrage", "Detention", "Combined"]}
            initialValue="Demurrage"
          />
          <div className="flex gap-4 justify-end items-end h-full flex-1">
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
      <div className={cx(styles.area, styles.table)}>
        {pageState === "search" ? (
          <FreetimeRequestTable />
        ) : (
          <EmptyResultPlaceholder text="Please enter B/L No. to search." />
        )}
      </div>
    </div>
  );
}
