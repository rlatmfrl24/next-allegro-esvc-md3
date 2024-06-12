"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import classNames from "classnames";
import { useState } from "react";
import { TareContainerTable } from "./table";
import { Close, Delete, Refresh } from "@mui/icons-material";
import { faker } from "@faker-js/faker";

export default function TARESearch() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle title="Container Tare Finder" />
      <div className={cx(styles.area, styles.row)}>
        <div className="flex flex-col gap-2 flex-1">
          <NAOutlinedTextField
            value=""
            className="w-[832px]"
            label="Container No. (Multi)"
            onKeyDown={(e) => {
              const query = e.currentTarget.value;

              if (e.key === "Enter") {
                if (query !== "" && !queries.includes(query))
                  setQueries([...queries, query]);
                e.currentTarget.value = "";
              }
            }}
          />
          <MdChipSet>
            {queries.map((query, index) => (
              <MdInputChip
                key={faker.string.uuid()}
                label={query}
                selected
                remove={() => {
                  setQueries((prev) => {
                    return prev.filter((_, i) => i !== index);
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
      <div className={cx(styles.area)}>
        {pageState === "search" ? (
          <TareContainerTable />
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
