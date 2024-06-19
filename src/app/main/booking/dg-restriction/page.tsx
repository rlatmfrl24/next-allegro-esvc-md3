"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdFilledButton,
  MdFilledTonalIconButton,
  MdIcon,
  MdOutlinedTextField,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Search } from "@mui/icons-material";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { UNNumberSearchDialog } from "./dialog";
import { DGRestrictionTable } from "./table";

type SearchCondition = {
  pol: string;
  pod: string;
  targetLane: { key: string; value: string };
  seq: string;
  unNumber: string;
  class: string;
  description: string;
};

export default function DGRestrictionSearch() {
  const cx = classNames.bind(styles);
  const [searchCondition, setSearchCondition] = useState<SearchCondition>({
    pol: "",
    pod: "",
    targetLane: { key: "", value: "" },
    seq: "",
    unNumber: "",
    class: "",
    description: "",
  });
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [unNumberDialogOpen, setUnNumberDialogOpen] = useState(false);
  const tempPortList = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) =>
      (faker.location.city() + ", " + faker.location.country()).toUpperCase()
    );
  }, []);

  const tempTargetLanes = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      return {
        key: (faker.string.alpha(2) + faker.string.numeric(2)).toUpperCase(),
        value: (
          faker.location.country() +
          " " +
          faker.location.city()
        ).toUpperCase(),
      };
    });
  }, []);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <UNNumberSearchDialog
        open={unNumberDialogOpen}
        onOpenChange={setUnNumberDialogOpen}
        onApply={(data) => {
          setSearchCondition((prev) => ({
            ...prev,
            seq: data.unNumber[0],
            unNumber: data.unNumber,
            class: data.class,
            description: data.description,
          }));
        }}
      />
      <PageTitle
        title="DG Restriction Search"
        category="Booking"
        href="/main/booking/dg-restriction"
      />
      <div className={cx(styles.area, styles.row)}>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-4">
            <NAOutlinedAutoComplete
              label="Place of Loading"
              itemList={tempPortList}
              className="w-[424px]"
              required
              initialValue={searchCondition.pol}
              onItemSelection={(item) => {
                setSearchCondition((prev) => ({ ...prev, pol: item }));
              }}
            />
            <NAOutlinedAutoComplete
              label="Place of Discharging"
              itemList={tempPortList}
              className="w-[424px]"
              required
              initialValue={searchCondition.pod}
              onItemSelection={(item) => {
                setSearchCondition((prev) => ({ ...prev, pod: item }));
              }}
            />
            <NAMultiAutoComplete
              showAllonFocus
              required
              label="Target Lane"
              itemList={tempTargetLanes}
              initialValue={{
                key: searchCondition.targetLane.key,
                value: searchCondition.targetLane.value,
              }}
              onItemSelection={(item) => {
                setSearchCondition((prev) => ({
                  ...prev,
                  targetLane: {
                    key: item.key,
                    value: item.value,
                  },
                }));
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <NAOutlinedTextField
              label="UN No."
              className="w-32"
              required
              value={searchCondition.unNumber}
              handleValueChange={(value) => {
                setSearchCondition((prev) => ({ ...prev, unNumber: value }));
                if (value === "") {
                  setSearchCondition((prev) => ({
                    ...prev,
                    seq: "",
                    class: "",
                    description: "",
                  }));
                }
              }}
            />
            <NAOutlinedTextField
              label="Seq."
              className="w-28"
              value={searchCondition.seq}
              handleValueChange={(value) => {
                setSearchCondition((prev) => ({ ...prev, seq: value }));
                if (value === "") {
                  setSearchCondition((prev) => ({
                    ...prev,
                    unNumber: "",
                    class: "",
                    description: "",
                  }));
                }
              }}
            />
            <MdFilledTonalIconButton
              onClick={() => {
                setUnNumberDialogOpen(true);
              }}
            >
              <MdIcon>
                <Search />
              </MdIcon>
            </MdFilledTonalIconButton>
            <NAOutlinedTextField
              label="Class"
              readOnly
              className="w-24"
              value={searchCondition.class}
            />
            <NAOutlinedTextField
              label="Description"
              readOnly
              className="w-[600px]"
              value={searchCondition.description}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-end h-fit">
          <MdTextButton
            onClick={() => {
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
      <div className={cx(styles.area, styles.table)}>
        {pageState === "unseach" && (
          <EmptyResultPlaceholder text="Please search for the condition." />
        )}
        {pageState === "search" && <DGRestrictionTable />}
      </div>
    </div>
  );
}
