"use client";

import {
  MdElevationButton,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdTextButton,
} from "../util/md3";
import styles from "./test.module.css";

export default function Test() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-4">
        <p className="flex flex-col font-suit text-4xl">
          <span className="font-thin">Booking</span>
          <span className="font-light">Booking</span>
          <span>Booking</span>
          <span className="font-semibold">Booking</span>
          <span className="font-bold">Booking</span>
          <span className="font-extrabold">Booking</span>
          <span className="font-black">Booking</span>
        </p>
        <p className="flex flex-col font-pretendard text-4xl">
          <span className="font-thin">Booking</span>
          <span className="font-light">Booking</span>
          <span>Booking</span>
          <span className="font-semibold">Booking</span>
          <span className="font-bold">Booking</span>
          <span className="font-extrabold">Booking</span>
          <span className="font-black">Booking</span>
        </p>
      </div>

      <div className="flex gap-2">
        <MdFilledButton className="font-suit">Click me</MdFilledButton>
        <MdElevationButton className="font-suit">Click me</MdElevationButton>
        <MdOutlinedButton className="font-suit">Click me</MdOutlinedButton>
        <MdTextButton className="font-suit">Click me</MdTextButton>
      </div>
      <div className="flex gap-2 font-pretendard font-bold">
        <MdOutlinedTextField
          className={styles.outlinedTextField}
          label="Label"
        />
        <MdOutlinedTextField
          className={styles.outlinedTextField}
          label="Label"
          disabled
        />
        <MdOutlinedTextField
          className={styles.outlinedTextField}
          label="Label"
          error
        />
        <MdOutlinedTextField
          className={styles.outlinedTextField}
          label="Label"
          supportingText="Required"
        />
        <MdOutlinedTextField
          className={styles.outlinedTextField}
          label="Label"
          prefixText="US"
          suffixText="USD"
        />
      </div>
    </div>
  );
}
