import { MdTypography } from "@/app/components/typography";
import { SubTitle } from "./components";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { useState } from "react";
import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import { MdOutlinedTextField } from "@/app/util/md3";

export default function CargoStep() {
  const [commodity, setCommodity] = useState("");

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Cargo & Pick Up/Return
      </MdTypography>
      <SubTitle title="Cargo" className="mb-4" />
      <div className="flex gap-4">
        <NAOutlinedAutoComplete
          label="Commodity"
          value={commodity}
          setValue={setCommodity}
          itemList={[]}
          className="flex-1"
        />
        <MdOutlinedTextField value="0" suffixText="KGS" className="flex-1" />
      </div>
      <SubTitle title="Container Pick Up/Return Place" className="mt-6 mb-4" />
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <MdSingleDatePicker className="flex-1" label="Empty Pick Up Date" />
          <div className="flex-1">
            <MdOutlinedTextField type="time" />
          </div>
        </div>
        <div className="flex gap-4">
          <MdOutlinedTextField
            className="flex-1"
            label="Empty Pick Up CY/Depot"
            placeholder="Empty Pick Up CY/Depot (Prefered)"
          />
          <div className="flex-1 flex gap-4">
            <MdOutlinedTextField disabled label="Code" className="flex-1" />
            <MdOutlinedTextField disabled label="Address" className="flex-1" />
          </div>
        </div>
        <div className="flex gap-4">
          <MdSingleDatePicker
            className="flex-1"
            label="Full Cargo Return Date"
          />
          <div className="flex-1"></div>
        </div>
        <div className="flex gap-4">
          <MdOutlinedTextField
            className="flex-1"
            label="Full Container Return CY"
          />
          <div className="flex-1 flex gap-4">
            <MdOutlinedTextField disabled label="Code" className="flex-1" />
            <MdOutlinedTextField disabled label="Address" className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
