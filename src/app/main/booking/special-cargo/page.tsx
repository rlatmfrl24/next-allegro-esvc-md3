"use client";
import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import PageTitle from "@/app/components/title-components";
import {
  RichTooltipContainer,
  RichTooltipItem,
} from "@/app/components/tooltip";
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
  MdSecondaryTab,
  MdTabs,
  MdTextButton,
} from "@/app/util/md3";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useInteractions,
  useTransitionStyles,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager,
} from "@floating-ui/react";
import { Download, InfoOutlined } from "@mui/icons-material";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { ColumnHelper, createColumnHelper } from "@tanstack/react-table";
import { MdTypography } from "@/app/components/typography";
import { BasicTable } from "@/app/components/table/basic-table";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import LabelChip from "@/app/components/chips/label-chip";
import {
  AwkwardCargoStatusProps,
  DangerousCargoStatusProps,
  SpecialCargoStatusProps,
  createDummyAwkwardCargoStatus,
  createDummyDangerousCargoStatus,
  createDummySpecialCargoStatus,
} from "./util";

export default function SpecialCargoStatusSearch() {
  const cx = classNames.bind(styles);
  const [selectedTab, setSelectedTab] = useState<
    "dangerous" | "awkward" | "reefer"
  >("dangerous");
  const [searchType, setSearchType] = useState<"polEta" | "bookingNo">(
    "polEta"
  );
  const [queries, setQueries] = useState<string[]>([]);

  const dangerousCargos = useMemo(() => {
    return Array.from({ length: 50 }, createDummyDangerousCargoStatus);
  }, []);
  const awkwardCargos = useMemo(() => {
    return Array.from({ length: 50 }, createDummyAwkwardCargoStatus);
  }, []);
  const reeferCargos = useMemo(() => {
    return Array.from({ length: 50 }, createDummySpecialCargoStatus);
  }, []);

  const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
    useVesselScheduleDialog();

  const columnHelper = createColumnHelper<SpecialCargoStatusProps>();
  const columnDefs = [
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("targetVessel.pol", {
      id: "pol",
      header: "POL of Target Vessel",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().yardName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("targetVessel.pod", {
      id: "pod",
      header: "POD of Target Vessel",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().yardName}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("targetVessel.vessel", {
      id: "vessel",
      header: "Vessel",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={() => {
            setCurrentVessel(info.getValue());
            setIsVesselScheduleDialogOpen(true);
          }}
        >
          {info.getValue().vesselName}
        </MdTypography>
      ),
      size: 300,
    }),
    columnHelper.accessor("typeSize", {
      id: "typeSize",
      header: "Type/Size",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    selectedTab === "dangerous" &&
      (
        columnHelper as unknown as ColumnHelper<DangerousCargoStatusProps>
      ).accessor("class", {
        id: "class",
        header: "Class",
        cell: (info) => (
          <MdTypography variant="body" size="medium">
            {info.getValue()}
          </MdTypography>
        ),
        size: 100,
      }),

    selectedTab === "dangerous" &&
      (
        columnHelper as unknown as ColumnHelper<DangerousCargoStatusProps>
      ).accessor("unNumber", {
        id: "unNumber",
        header: "UN Number",
        cell: (info) => (
          <MdTypography variant="body" size="medium" className="text-right">
            {info.getValue()}
          </MdTypography>
        ),
        size: 150,
      }),

    selectedTab === "awkward" &&
      (
        columnHelper as unknown as ColumnHelper<AwkwardCargoStatusProps>
      ).accessor("dimension", {
        id: "dimension",
        header: () => (
          <>
            Over Dimesion (CM)
            <br />
            [Left x Right x Height]
          </>
        ),
        cell: (info) => (
          <MdTypography variant="body" size="medium">
            {`${info.getValue().left} x ${info.getValue().right} x ${
              info.getValue().height
            }`}
          </MdTypography>
        ),
      }),

    columnHelper.accessor("requestDate", {
      id: "requestDate",
      header: "Request Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),

    columnHelper.accessor("approval", {
      id: "approval",
      header: "Approval",
      cell: (info) => (
        <LabelChip
          label={info.getValue()}
          size="medium"
          className={
            info.getValue() === "Approved"
              ? "bg-extendGoodContainer"
              : info.getValue() === "Requested"
              ? "bg-surfaceContainerHigh"
              : "bg-errorContainer text-onErrorContainer"
          }
        />
      ),
    }),
    columnHelper.accessor("approvalDate", {
      id: "approvalDate",
      header: "Approval Date",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
  ].filter((column) => column !== false);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <PageTitle title="Special Cargo  Status Search" />
      {renderDialog()}
      <div className={cx(styles.area)}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            selected={searchType === "polEta"}
            onClick={() => setSearchType("polEta")}
            label="POL ETA"
          />
          <MdOutlinedSegmentedButton
            selected={searchType === "bookingNo"}
            onClick={() => setSearchType("bookingNo")}
            label="Booking or B/L No."
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="flex items-end">
          <div className="flex-1 flex gap-4 items-center">
            {searchType === "polEta" && (
              <DateRangePicker label="POL ETA" buttonMode="after" />
            )}
            {searchType === "bookingNo" && (
              <div>
                <div className="flex gap-4 items-center">
                  <NAOutlinedTextField
                    placeholder="Search by B/L No. or Booking Bo."
                    className="w-[840px]"
                    onKeyDown={(e) => {
                      const value = e.currentTarget.value;
                      if (value === "" || queries.includes(value)) {
                        return;
                      }

                      if (e.key === "Enter") {
                        setQueries([...queries, value]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <SearchInfo />
                </div>
                <MdChipSet className="mt-2">
                  {queries.map((query, index) => (
                    <div key={index}>
                      <MdInputChip
                        label={query}
                        remove={() => {
                          setQueries((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </div>
                  ))}
                </MdChipSet>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <MdTextButton>Reset</MdTextButton>
            <MdFilledButton>Search</MdFilledButton>
          </div>
        </div>
      </div>
      <div className={cx(styles.area, styles["no-padding"], "overflow-hidden")}>
        <MdTabs>
          <MdSecondaryTab
            selected={selectedTab === "dangerous"}
            onClick={() => {
              setSelectedTab("dangerous");
            }}
          >
            Dangerous Cargo
          </MdSecondaryTab>
          <MdSecondaryTab
            selected={selectedTab === "awkward"}
            onClick={() => {
              setSelectedTab("awkward");
            }}
          >
            Awkward Cargo
          </MdSecondaryTab>
          <MdSecondaryTab
            selected={selectedTab === "reefer"}
            onClick={() => {
              setSelectedTab("reefer");
            }}
          >
            Reefer Cargo
          </MdSecondaryTab>
        </MdTabs>
        <div className="p-6 pt-2 ">
          {selectedTab === "dangerous" && (
            <BasicTable
              ActionComponent={() => {
                return (
                  <div className="flex-1">
                    <MdTextButton>
                      <MdIcon slot="icon">
                        <Download fontSize="small" />
                      </MdIcon>
                      Download
                    </MdTextButton>
                  </div>
                );
              }}
              data={dangerousCargos}
              columns={columnDefs}
              isSingleSelect
            />
          )}
          {selectedTab === "awkward" && (
            <BasicTable
              ActionComponent={() => {
                return (
                  <div className="flex-1">
                    <MdTextButton>
                      <MdIcon slot="icon">
                        <Download fontSize="small" />
                      </MdIcon>
                      Download
                    </MdTextButton>
                  </div>
                );
              }}
              data={awkwardCargos}
              columns={columnDefs}
              isSingleSelect
            />
          )}
          {selectedTab === "reefer" && (
            <BasicTable
              ActionComponent={() => {
                return (
                  <div className="flex-1">
                    <MdTextButton>
                      <MdIcon slot="icon">
                        <Download fontSize="small" />
                      </MdIcon>
                      Download
                    </MdTextButton>
                  </div>
                );
              }}
              data={reeferCargos}
              columns={columnDefs}
              isSingleSelect
            />
          )}
        </div>
      </div>
    </div>
  );
}

const SearchInfo = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: "bottom-start",
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const { isMounted, styles: tooltipStyles } = useTransitionStyles(
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
      <MdIconButton ref={refs.setReference} {...getReferenceProps()}>
        <MdIcon>
          <InfoOutlined />
        </MdIcon>
      </MdIconButton>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            style={floatingStyles}
            ref={refs.setFloating}
            {...getFloatingProps()}
            className="z-10 max-w-96"
          >
            <div style={tooltipStyles}>
              <RichTooltipContainer>
                <RichTooltipItem
                  slot="content"
                  title="Please enter B/L number composed of 16 alphanumeric characters. (i/e DJSCSHA210000017)"
                  supportingText="If you want to request free time extension and check DEM/DET 's amount of Destination at Loading port, please select “INBOUND” on the BOUND You can request free time extension of Destination after arrive at Destination."
                />
              </RichTooltipContainer>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
