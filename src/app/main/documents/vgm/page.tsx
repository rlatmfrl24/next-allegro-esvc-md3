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
import { VGMTable } from "./table";

export default function VGMSearch() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [query, setQuery] = useState("");
  const [queris, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle title="VGM" />
      <div className={cx(styles.area)}>
        <NAOutlinedTextField
          value={query}
          handleValueChange={(value) => {
            setQuery(value);
          }}
          placeholder="Container or Booking or B/L No. (Multi)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (query !== "" && !queris.includes(query))
                setQueries([...queris, query]);
              setQuery("");
            }
          }}
        />
        <MdChipSet>
          {queris.map((q, i) => (
            <MdInputChip
              key={faker.string.uuid()}
              label={q}
              selected={true}
              handleTrailingActionFocus={() => {
                console.log("focus");
                setQueries((prev) => {
                  const newQueries = prev.filter((_, index) => index !== i);
                  return newQueries;
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
        {pageState === "unseach" ? (
          <EmptyResultPlaceholder
            text="Please search for the condition."
            className="my-20"
          />
        ) : (
          <>
            <VGMTable />
          </>
        )}
      </div>
    </div>
  );
}
