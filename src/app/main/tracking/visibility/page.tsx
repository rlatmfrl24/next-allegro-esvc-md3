"use client";

import { DividerComponent } from "@/app/components/divider";
import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdRadio,
} from "@/app/util/md3";
import { Props } from "@dnd-kit/core/dist/components/DragOverlay";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";

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
          className={`flex items-center gap-2 ${
            value !== -1 ? "cursor-pointer underline" : "text-outline"
          }`}
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
        >
          {value === -1 ? "-" : value}
        </MdTypography>
      </div>
    </>
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

  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Visibility Service" />
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
          />
          <ServiceItem
            category="origin"
            itemKey="emptyContainerRelease"
            label="Empty Container Release"
            summaryData={summaries}
          />
          <ServiceItem
            category="origin"
            itemKey="gateIntoOutboundCY"
            label="Gate Into Outbound CY"
            summaryData={summaries}
          />
          <ServiceItem
            category="origin"
            itemKey="outboundRailDeparture"
            label="Outbound Rail Departure"
            summaryData={summaries}
          />
          <ServiceItem
            category="origin"
            itemKey="outboundRailArrival"
            label="Outbound Rail Arrival"
            summaryData={summaries}
          />
          <ServiceItem
            category="origin"
            itemKey="getIntoOutboundPortTerminal"
            label="Gate Into Outbound CY"
            summaryData={summaries}
          />
          <ServiceItem
            category="origin"
            itemKey="loadedOnVesselAtPOL"
            label="Loaded On Vessel At POL"
            summaryData={summaries}
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
          />
          <ServiceItem
            category="ocean"
            itemKey="inTransitionWater"
            label="In Transition Water"
            summaryData={summaries}
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
          />
          <ServiceItem
            category="destination"
            itemKey="inboundCY"
            label="Inbound CY"
            summaryData={summaries}
          />
          <ServiceItem
            category="destination"
            itemKey="inboundRailDeparture"
            label="Inbound Rail Departure"
            summaryData={summaries}
          />
          <ServiceItem
            category="destination"
            itemKey="inboundRailArrival"
            label="Inbound Rail Arrival"
            summaryData={summaries}
          />
          <ServiceItem
            category="destination"
            itemKey="gateOutFromInboundCY"
            label="Gate Out From Inbound CY"
            summaryData={summaries}
          />
          <ServiceItem
            category="destination"
            itemKey="emptyContainerReturn"
            label="Empty Container Return"
            summaryData={summaries}
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
