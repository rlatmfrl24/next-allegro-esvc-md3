"use client";

import PageTitle from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { useState } from "react";

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
      bookingConfirmed: faker.number.int({ max: 20 }),
      emptyContainerRelease: faker.number.int({ max: 20 }),
      gateIntoOutboundCY: faker.number.int({ max: 20 }),
      outboundRailDeparture: faker.number.int({ max: 20 }),
      outboundRailArrival: faker.number.int({ max: 20 }),
      getIntoOutboundPortTerminal: faker.number.int({ max: 20 }),
      loadedOnVesselAtPOL: faker.number.int({ max: 20 }),
    },
    ocean: {
      inTSPort: faker.number.int({ max: 20 }),
      inTransitionWater: faker.number.int({ max: 20 }),
    },
    destination: {
      unloadedFromVesselAtPOD: faker.number.int({ max: 20 }),
      inboundCY: faker.number.int({ max: 20 }),
      inboundRailDeparture: faker.number.int({ max: 20 }),
      inboundRailArrival: faker.number.int({ max: 20 }),
      gateOutFromInboundCY: faker.number.int({ max: 20 }),
      emptyContainerReturn: faker.number.int({ max: 20 }),
    },
  };
}

export default function VisibilityServicePage() {
  const [currentTab, setCurrentTab] = useState("shipper");
  const [summaries, setSummaries] = useState({
    shipper: createDummySummary(),
    consignee: createDummySummary(),
    contract: createDummySummary(),
  });

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
        <div className="grid grid-cols-[312px_1fr_224px]">
          <div>
            <MdTypography variant="body" size="medium" prominent>
              Region
            </MdTypography>
          </div>
          <div>Status</div>
          <div>Number of Container</div>
        </div>
      </div>
    </div>
  );
}
