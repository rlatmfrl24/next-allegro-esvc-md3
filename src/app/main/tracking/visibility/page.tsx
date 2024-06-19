"use client";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdDialog,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { createColumnHelper } from "@tanstack/react-table";
import { createDummyPlaceInformation } from "../../schedule/util";
import { BasicTable } from "@/app/components/table/basic-table";
import { useRouter } from "next/navigation";
import LabelChip from "@/app/components/label-chip";
import { Download } from "@mui/icons-material";
import { DividerComponent } from "@/app/components/divider";

type ServiceSummaryDialogProps = {
  bookingNumber: string;
  containerNumber: string;
  status: "Accepted" | "Requested";
  eventDateTime: DateTime;
  typeSize: string;
  place: PlaceInformationType;
};

type VisibilityServicePageProps = {
  origin: {
    bookingConfirmed: number;
    emptyContainerRelease: number;
    gateIntoOutboundCY: number;
    outboundRailDeparture: number;
    outboundRailArrival: number;
    getIntoOutboundPortTerminal: number;
    loadedOnVesselAtPOL: number;
  };
  ocean: {
    inTSPort: number;
    inTransitionWater: number;
  };
  destination: {
    unloadedFromVesselAtPOD: number;
    inboundCY: number;
    inboundRailDeparture: number;
    inboundRailArrival: number;
    gateOutFromInboundCY: number;
    emptyContainerReturn: number;
  };
};

function createDummySummary() {
  return {
    origin: {
      bookingConfirmed:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      emptyContainerRelease:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      gateIntoOutboundCY:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      outboundRailDeparture:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      outboundRailArrival:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      getIntoOutboundPortTerminal:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      loadedOnVesselAtPOL:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
    },
    ocean: {
      inTSPort: faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      inTransitionWater:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
    },
    destination: {
      unloadedFromVesselAtPOD:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      inboundCY: faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      inboundRailDeparture:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      inboundRailArrival:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      gateOutFromInboundCY:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
      emptyContainerReturn:
        faker.helpers.maybe(() => faker.number.int({ max: 20 })) || -1,
    },
  };
}

const ServiceItem = (props: {
  category: string;
  itemKey: string;
  label: string;
  summaryData: VisibilityServicePageProps;
  onClick?: () => void;
}) => {
  const category =
    props.summaryData[props.category as keyof VisibilityServicePageProps];
  const value = category[props.itemKey as keyof typeof category];

  return (
    <>
      <div
        className={`p-3 ${
          value !== -1 ? "bg-surface" : "bg-surfaceContainerLow"
        }`}
      >
        <MdTypography
          tag="label"
          variant="body"
          size="medium"
          className={`flex items-center gap-2 w-fit ${
            value !== -1 ? "cursor-pointer underline" : "text-outline"
          }`}
          onClick={props.onClick}
        >
          <MdRadio checked={value !== -1} disabled={value === -1} />
          {props.label}
        </MdTypography>
      </div>
      <div
        className={`flex items-center justify-center ${
          value !== -1 ? "bg-surface" : "bg-surfaceContainerLow"
        }`}
      >
        <MdTypography
          variant="body"
          size="medium"
          className={value !== -1 ? "underline cursor-pointer" : ""}
          onClick={props.onClick}
        >
          {value === -1 ? "-" : value}
        </MdTypography>
      </div>
    </>
  );
};

const ServiceSummaryDialog = (props: {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<ServiceSummaryDialogProps[]>(
    []
  );
  const tempData = useMemo(() => {
    return Array.from({ length: 30 }, (_, index) => {
      return {
        bookingNumber: faker.string.alphanumeric(10).toUpperCase(),
        containerNumber:
          faker.helpers.maybe(() =>
            faker.string.alphanumeric(10).toUpperCase()
          ) || "",
        status: faker.helpers.arrayElement(["Accepted", "Requested"]),
        eventDateTime: DateTime.fromJSDate(faker.date.recent()),
        typeSize:
          faker.helpers.arrayElement(["Dry", "Reefer"]) +
          " " +
          faker.helpers.arrayElement(["20", "40"]),
        place: createDummyPlaceInformation(
          faker.location.city() + ", " + faker.location.country()
        ),
      };
    });
  }, []);

  const columnHelper = createColumnHelper<ServiceSummaryDialogProps>();
  const columnDefs = [
    columnHelper.display({
      id: "check",
      header: "",
      cell: (info) => (
        <div className="flex justify-center items-center">
          <MdCheckbox checked={info.row.getIsSelected()} />
        </div>
      ),
      size: 50,
    }),
    columnHelper.accessor("bookingNumber", {
      id: "bookingNumber",
      header: "Booking No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="underline cursor-pointer w-fit"
          onClick={() => {
            router.push(`/main/tracking/cargo`);
          }}
        >
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("containerNumber", {
      id: "containerNumber",
      header: "Container No.",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className={`w-fit ${
            info.getValue() === "" ? "text-outline" : "underline cursor-pointer"
          }`}
          onClick={() => {
            router.push(`/main/tracking/cargo`);
          }}
        >
          {info.getValue() === "" ? "Not Assigned" : info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => (
        <LabelChip
          size="medium"
          label={info.getValue()}
          className={
            info.getValue() === "Accepted"
              ? "bg-extendGoodContainer text-extendOnGoodContainer"
              : "bg-surfaceContainerHigh text-onSurface"
          }
        />
      ),
    }),
    columnHelper.accessor("eventDateTime", {
      id: "eventDateTime",
      header: "Event Date Time",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue().toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("typeSize", {
      id: "typeSize",
      header: "Type / Size",
      cell: (info) => (
        <MdTypography variant="body" size="medium">
          {info.getValue()}
        </MdTypography>
      ),
    }),
    columnHelper.accessor("place", {
      id: "place",
      header: "Place",
      cell: (info) => (
        <MdTypography
          variant="body"
          size="medium"
          className="w-fit underline cursor-pointer"
        >
          {info.getValue().yardName}
        </MdTypography>
      ),
    }),
  ];

  return (
    <MdDialog
      open={props.isOpen}
      closed={() => props.onOpenChange(false)}
      className="w-fit max-w-[70%]"
    >
      <div slot="headline">Visibility Summary</div>
      <div slot="content">
        <MdTypography variant="body" size="medium" className="mb-6">
          Booking Confirmed
        </MdTypography>
        <BasicTable
          ActionComponent={() => {
            return (
              <div className="flex-1 flex gap-4 items-center">
                <MdTextButton>
                  <MdIcon slot="icon">
                    <Download fontSize="small" />
                  </MdIcon>
                  Download
                </MdTextButton>
                {selectedRows.length > 0 && (
                  <>
                    <DividerComponent orientation="vertical" className="h-6" />
                    <MdTextButton>Add My Tracking</MdTextButton>
                    <MdTextButton>B/L Preview</MdTextButton>
                  </>
                )}
              </div>
            );
          }}
          data={tempData}
          columns={columnDefs}
          getSelectionRows={(rows) => {
            setSelectedRows(rows);
          }}
        />
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Close
        </MdOutlinedButton>
      </div>
    </MdDialog>
  );
};

export default function VisibilityServicePage() {
  const [currentTab, setCurrentTab] = useState("shipper");
  const summaries = useMemo(() => {
    return createDummySummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const totalSummary = useMemo(() => {
    return faker.number.int({ max: 200 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaries]);

  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

  return (
    <div aria-label="container" className={styles.container}>
      <ServiceSummaryDialog
        isOpen={isSummaryDialogOpen}
        onOpenChange={setIsSummaryDialogOpen}
      />
      <PageTitle
        title="Visibility Service"
        category="Tracking"
        href="/main/tracking/visibility"
      />
      <div className={styles.area}>
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="By Shipper"
            onClick={() => setCurrentTab("shipper")}
            selected={currentTab === "shipper"}
          />
          <MdOutlinedSegmentedButton
            label="By Consignee"
            onClick={() => setCurrentTab("consignee")}
            selected={currentTab === "consignee"}
          />
          <MdOutlinedSegmentedButton
            label="By Contract"
            onClick={() => setCurrentTab("contract")}
            selected={currentTab === "contract"}
          />
        </MdOutlinedSegmentedButtonSet>
        <div className="grid grid-cols-[312px_1fr_224px] gap-px bg-outlineVariant">
          <div className="bg-surfaceVariant p-2">
            <MdTypography variant="body" size="medium" prominent>
              Region
            </MdTypography>
          </div>
          <div className="bg-surfaceVariant p-2">
            <MdTypography variant="body" size="medium" prominent>
              Status
            </MdTypography>
          </div>
          <div className="bg-surfaceVariant p-2">
            <MdTypography variant="body" size="medium" prominent>
              Number of Container
            </MdTypography>
          </div>
          <div className="bg-surface row-span-7 p-2 flex">
            <MdTypography variant="body" size="medium">
              Origin
            </MdTypography>
          </div>
          <ServiceItem
            category="origin"
            itemKey="bookingConfirmed"
            label="Booking Confirmed"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="origin"
            itemKey="emptyContainerRelease"
            label="Empty Container Release"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="origin"
            itemKey="gateIntoOutboundCY"
            label="Gate Into Outbound CY"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="origin"
            itemKey="outboundRailDeparture"
            label="Outbound Rail Departure"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="origin"
            itemKey="outboundRailArrival"
            label="Outbound Rail Arrival"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="origin"
            itemKey="getIntoOutboundPortTerminal"
            label="Gate Into Outbound CY"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="origin"
            itemKey="loadedOnVesselAtPOL"
            label="Loaded On Vessel At POL"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <div className="bg-surface row-span-2 p-2 flex">
            <MdTypography variant="body" size="medium">
              Ocean
            </MdTypography>
          </div>
          <ServiceItem
            category="ocean"
            itemKey="inTSPort"
            label="In TS Port"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="ocean"
            itemKey="inTransitionWater"
            label="In Transition Water"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <div className="bg-surface row-span-6 p-2 flex">
            <MdTypography variant="body" size="medium">
              Destination
            </MdTypography>
          </div>
          <ServiceItem
            category="destination"
            itemKey="unloadedFromVesselAtPOD"
            label="Unloaded From Vessel At POD"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="destination"
            itemKey="inboundCY"
            label="Inbound CY"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="destination"
            itemKey="inboundRailDeparture"
            label="Inbound Rail Departure"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="destination"
            itemKey="inboundRailArrival"
            label="Inbound Rail Arrival"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="destination"
            itemKey="gateOutFromInboundCY"
            label="Gate Out From Inbound CY"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <ServiceItem
            category="destination"
            itemKey="emptyContainerReturn"
            label="Empty Container Return"
            summaryData={summaries}
            onClick={() => setIsSummaryDialogOpen(true)}
          />
          <div className="col-span-2 px-2 py-4 bg-tertiaryContainer">
            <MdTypography variant="body" size="medium">
              All Region
            </MdTypography>
          </div>
          <div className="flex justify-center items-center bg-tertiaryContainer">
            <MdTypography variant="body" size="medium">
              {totalSummary}
            </MdTypography>
          </div>
        </div>
      </div>
    </div>
  );
}
