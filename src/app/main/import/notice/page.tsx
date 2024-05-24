"use client";

import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";
import {
  MdChipSet,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdTextButton,
} from "@/app/util/md3";
import { useState } from "react";
import { ArrivalNoticeTable } from "./table";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicPopoverStyles } from "@/app/util/constants";
import { Info, InfoOutlined } from "@mui/icons-material";
import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { faker } from "@faker-js/faker";

const SearchTooltip = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: "bottom-end",
    middleware: [shift(), flip(), offset(4)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    basicPopoverStyles
  );

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "tooltip",
    }),
  ]);

  return (
    <>
      <MdIconButton
        ref={refs.setReference}
        {...getReferenceProps()}
        className="mt-2"
      >
        <MdIcon>
          <InfoOutlined />
        </MdIcon>
      </MdIconButton>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-10 max-w-96"
        >
          <div style={transitionStyles}>
            <RichTooltipContainer>
              <RichTooltipItem
                slot="content"
                title={`Please enter KAMBARA KISEN B/L number composed of 3 alphabet characters + 9 digits of number (i/e PUS123456789, Discard the prefix "KKCL").`}
                supportingText={`Ensure your B/L number is assigned by KAMBARA KISEN. Our system does not accept House B/L number assigned by NVOCC or Freight Forwarder.`}
              />
            </RichTooltipContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default function ArrivalNoticePage() {
  const [pageState, setPageState] = useState<"search" | "unsearch">("unsearch");
  const [inputQuery, setInputQuery] = useState<string>("");
  const [queries, setQueries] = useState<string[]>([]);

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Arrival Notice" />
      <div className={styles.area}>
        <div className="flex gap-4 ">
          <DateRangePicker label="Onboard/Arrival Date" />
          <div className="flex flex-col gap-4 flex-1">
            <NAOutlinedTextField
              value={inputQuery}
              className="flex-1"
              label="Container or B/L No. (Multi)"
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
          </div>
          <SearchTooltip />
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
