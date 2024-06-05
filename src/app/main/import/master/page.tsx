"use client";
import classNames from "classnames";
import { useMemo, useState } from "react";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { InfoTooltipButton } from "@/app/components/info-tooltip-button";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
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

import { InboundMasterTable } from "./table";

const OnboardConditions = () => {
  const tempPortList = useMemo(() => {
    return Array.from(
      { length: 100 },
      (_, index) => faker.location.city() + ", " + faker.location.country()
    );
  }, []);

  return (
    <div className="flex gap-4 flex-1">
      <DateRangePicker label="Onboard/Arrival Date" />
      <NAOutlinedAutoComplete label="Port of Loading" itemList={tempPortList} />
      <NAOutlinedAutoComplete
        label="Port of Discharging"
        itemList={tempPortList}
      />
    </div>
  );
};

const BlConditions = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <>
      <div className="flex gap-2 flex-col flex-1">
        <div className="flex gap-4 items-center">
          <NAOutlinedTextField
            value={inputQuery}
            handleValueChange={(value) => {
              setInputQuery(value);
            }}
            className="w-[832px]"
            label="B/L No. (Multi)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (inputQuery !== "" && !queries.includes(inputQuery))
                  setQueries([...queries, inputQuery]);
                setInputQuery("");
              }
            }}
          />
          <InfoTooltipButton
            title="Please enter B/L number composed of 14 alphanumeric characters."
            supportingText="Ensure your B/L number is assigned by ALLEGRO. Our system does not accept House B/L number assigned by NVOCC or Freight Forwarder."
          />
        </div>
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
      </div>
    </>
  );
};

export default function InboundMaster() {
  const cx = classNames.bind(styles);
  const [pageState, setPageState] = useState<"unseach" | "search">("unseach");
  const [currentTab, setCurrentTab] = useState<"onboard" | "bl">("onboard");

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle title="Inbound Master" />
      <div className={cx(styles.area)}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={currentTab === "onboard"}
            label="Onboard/Arrival Date"
            onClick={() => {
              setCurrentTab("onboard");
            }}
          />
          <MdOutlinedSegmentedButton
            selected={currentTab === "bl"}
            label="B/L No."
            onClick={() => {
              setCurrentTab("bl");
            }}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4 items-end">
          {currentTab === "onboard" ? <OnboardConditions /> : <BlConditions />}
          <div className="flex gap-4 justify-end">
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
      </div>
      <div className={cx(styles.area)}>
        {pageState === "search" ? (
          <InboundMasterTable />
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
