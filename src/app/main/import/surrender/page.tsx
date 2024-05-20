"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
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
import classNames from "classnames";
import { useState } from "react";
import { SurrenderTable } from "./table";

export default function BLSurrenderCheck() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle title="B/L Surrender Check" />
      <div className={cx(styles.area)}>
        <NAOutlinedTextField
          value={inputQuery}
          label="Container or Booking or B/L No. (Multi)"
          handleValueChange={(value) => {
            setInputQuery(value);
          }}
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
            <MdInputChip
              key={faker.string.uuid()}
              label={query}
              selected={true}
              handleTrailingActionFocus={() => {
                setQueries((prev) => {
                  return prev.filter((_, i) => i !== index);
                });
              }}
            />
          ))}
        </MdChipSet>
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
