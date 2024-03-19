"use client";
import PageTitle from "@/app/components/title-components";
import styles from "@/app/styles/base.module.css";

export default function SIEdit() {
  return (
    <div aria-label="container" className={styles.container}>
      <PageTitle title="Shipping Instruction" />
      <div className={styles.area}></div>
    </div>
  );
}
