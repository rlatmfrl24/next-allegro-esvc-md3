"use client";

import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import { basicPopoverStyles } from "@/app/util/constants";
import {
  MdChipSet,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
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
import { InfoOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { ChargeInquiryTable } from "./table";

export default function ChargeInquiryPage() {
  const [pageState, setPageState] = useState<"unsearch" | "search">("unsearch");
  const [searchType, setSearchType] = useState<"outbound" | "inbound">(
    "outbound"
  );
  const [currentTab, setCurrentTab] = useState<
    "bl" | "container" | "customer" | "contract"
  >("bl");

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Charge Inquiry" />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="B/L No."
            selected={currentTab === "bl"}
            onClick={() => {
              setCurrentTab("bl");
              setPageState("unsearch");
            }}
          />
          <MdOutlinedSegmentedButton
            label="Container No."
            selected={currentTab === "container"}
            onClick={() => {
              setCurrentTab("container");
              setPageState("unsearch");
            }}
          />
          <MdOutlinedSegmentedButton
            label="By Type of Customer"
            selected={currentTab === "customer"}
            onClick={() => {
              setCurrentTab("customer");
              setPageState("unsearch");
            }}
          />
          <MdOutlinedSegmentedButton
            label="Contract No."
            selected={currentTab === "contract"}
            onClick={() => {
              setCurrentTab("contract");
              setPageState("unsearch");
            }}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex gap-4">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="cursor-pointer"
          >
            <MdRadio
              name="search-type"
              className="mr-2"
              checked={searchType === "outbound"}
              onClick={() => {
                setSearchType("outbound");
              }}
            />
            Outbound
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="cursor-pointer"
          >
            <MdRadio
              name="search-type"
              className="mr-2"
              checked={searchType === "inbound"}
              onClick={() => {
                setSearchType("inbound");
              }}
            />
            Inbound
          </MdTypography>
        </div>
        {
          {
            bl: <BlNumberCriteria />,
            container: <ContainerNumberCriteria />,
            customer: <TypeCustomerCriteria />,
            contract: <ContractNumberCriteria />,
          }[currentTab]
        }
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
        {
          {
            unsearch: (
              <EmptyResultPlaceholder
                className="my-12"
                text="Please enter search criteria to view the result."
              />
            ),
            search: (
              <ChargeInquiryTable
                tableType={
                  currentTab === "bl"
                    ? "complex"
                    : currentTab === "container"
                    ? "complex"
                    : currentTab === "customer"
                    ? "simple"
                    : "simple"
                }
              />
            ),
          }[pageState]
        }
      </div>
    </div>
  );
}

const BlNumberCriteria = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
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
    useRole(context),
  ]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <NAOutlinedTextField
          value={inputQuery}
          handleValueChange={(value) => {
            setInputQuery(value);
          }}
          label="B/L No. (Multi)"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (queries.includes(inputQuery)) return;
              setQueries([...queries, inputQuery]);
              setInputQuery("");
            }
          }}
        />
        <>
          <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
            <MdIcon>
              <InfoOutlined />
            </MdIcon>
          </MdIconButton>
          {isMounted && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-10"
            >
              <div style={transitionStyles}>
                <RichTooltipContainer>
                  <RichTooltipItem
                    slot="content"
                    title="Tooltip"
                    supportingText="Tooltip Text"
                  />
                </RichTooltipContainer>
              </div>
            </div>
          )}
        </>
      </div>
      <MdChipSet>
        {queries.map((query, index) => (
          <MdInputChip
            key={faker.string.uuid()}
            label={query}
            selected
            handleTrailingActionFocus={() => {
              setQueries(queries.filter((q, i) => i !== index));
            }}
          />
        ))}
      </MdChipSet>
    </div>
  );
};

const ContainerNumberCriteria = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [queries, setQueries] = useState<string[]>([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
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
    useRole(context),
  ]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <NAOutlinedTextField
          value={inputQuery}
          handleValueChange={(value) => {
            setInputQuery(value);
          }}
          label="Container No. (Multi)"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (queries.includes(inputQuery)) return;
              setQueries([...queries, inputQuery]);
              setInputQuery("");
            }
          }}
        />
        <>
          <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
            <MdIcon>
              <InfoOutlined />
            </MdIcon>
          </MdIconButton>
          {isMounted && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-10"
            >
              <div style={transitionStyles}>
                <RichTooltipContainer>
                  <RichTooltipItem
                    slot="content"
                    title="Tooltip"
                    supportingText="Tooltip Text"
                  />
                </RichTooltipContainer>
              </div>
            </div>
          )}
        </>
      </div>
      <MdChipSet>
        {queries.map((query, index) => (
          <MdInputChip
            key={faker.string.uuid()}
            label={query}
            selected
            handleTrailingActionFocus={() => {
              setQueries(queries.filter((q, i) => i !== index));
            }}
          />
        ))}
      </MdChipSet>
    </div>
  );
};

const TypeCustomerCriteria = () => {
  return (
    <div className="flex gap-4 items-center">
      <DateRangePicker label="Booking Date" />
      <MdTypography
        tag="label"
        variant="label"
        size="large"
        className="cursor-pointer"
      >
        <MdRadio name="customer-type" className="mr-2" />
        By Shipper
      </MdTypography>
      <MdTypography
        tag="label"
        variant="label"
        size="large"
        className="cursor-pointer"
      >
        <MdRadio name="customer-type" className="mr-2" />
        By Consignee
      </MdTypography>
    </div>
  );
};

const ContractNumberCriteria = () => {
  const tempContracts = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <DateRangePicker label="Booking Date " />
      <NAOutlinedListBox label="Contract No." options={tempContracts} />
    </div>
  );
};
