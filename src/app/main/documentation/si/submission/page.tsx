"use client";

import PageTitle from "@/app/components/page-title";
import styles from "@/app/styles/base.module.css";
import SISearchCondition from "./condition";
import { MdChipSet, MdFilterChip, MdTextButton } from "@/app/util/md3";
import StatusFilterComponent from "@/app/components/status-filter";
import { SIState } from "@/app/util/typeDef/si";
import SITable from "./table";
import { Download } from "@mui/icons-material";
import { MdTypography } from "@/app/components/typography";

export default function SISearch() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="SI Search" />
      <SISearchCondition />
      <div className={styles.area}>
        <MdChipSet>
          <StatusFilterComponent statusOptions={Object.values(SIState)} />
          <MdFilterChip label="My Shipment " />
        </MdChipSet>
        <SITable />
      </div>
    </div>
  );
}
