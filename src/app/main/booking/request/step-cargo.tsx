import { MdTypography } from "@/app/components/typography";
import { SubTitle } from "./components";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { useEffect, useState } from "react";
import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import { MdOutlinedTextField } from "@/app/util/md3";
import CommodityAutoComplete from "./commodity-search";
import { CommodityType } from "@/app/util/typeDef";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

export default function CargoStep() {
  const [commodity, setCommodity] = useState<CommodityType>({
    code: "",
    description: "",
  });
  const [grossWeight, setGrossWeight] = useState("0.000");

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Cargo & Pick Up/Return
      </MdTypography>
      <SubTitle title="Cargo" className="mb-4" />
      <div className="flex gap-4">
        <CommodityAutoComplete
          className="flex-1"
          required
          defaultSelection={commodity}
          onSelectionChange={(value) => {
            setCommodity(value);
          }}
        />
        <NAOutlinedTextField
          value={grossWeight}
          suffixText="KGS"
          className="flex-1"
          required
          onKeyDown={(e) => {
            //block non numeric input
            if (
              isNaN(Number(e.key)) &&
              e.key !== "Backspace" &&
              e.key !== "."
            ) {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            setGrossWeight(e.currentTarget.value);
          }}
          onBlur={(e) => {
            const numbericData = Number(e.currentTarget.value);
            if (isNaN(numbericData)) {
              e.currentTarget.value = "0.000";
              setGrossWeight("0.000");
            } else {
              setGrossWeight(numbericData.toFixed(3));
            }
          }}
        />
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
