import { useMemo, useState } from "react";

import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedSelect from "@/app/components/na-outlined-select";
import { MdTypography } from "@/app/components/typography";
import {
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdRadio,
  MdSelectOption,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { FmdGoodOutlined } from "@mui/icons-material";

export default function LoactionScheduleStep() {
  const portList = useMemo(() => {
    return Array.from(
      { length: 50 },
      (_, i) => faker.location.city() + ", " + faker.location.country()
    );
  }, []);
  const bookingOfficeList = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => faker.company.name());
  }, []);
  const randomContractList = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => "C" + faker.string.numeric(10));
  }, []);

  const [originPort, setOriginPort] = useState("");
  const [destinationPort, setDestinationPort] = useState("");

  return (
    <div>
      <MdTypography variant="title" size="large" className="mb-6">
        Location & Schedule
      </MdTypography>
      <div className="flex flex-col gap-6">
        <form className="flex gap-8">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="cursor-pointer"
          >
            <MdRadio name="location-type" className="mr-2" />
            By Schedule Search
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="cursor-pointer"
          >
            <MdRadio name="location-type" className="mr-2" />
            By The Earliest Available Schedule
          </MdTypography>
        </form>
        <div className="flex gap-4">
          <NAOutlinedAutoComplete
            itemList={portList}
            value={originPort}
            setValue={setOriginPort}
            required
            label="Origin"
            icon={<FmdGoodOutlined />}
            className="flex-1"
          />
          <MdOutlinedSelect defaultValue={"CY"}>
            <MdSelectOption value="CY">CY</MdSelectOption>
            <MdSelectOption value="Door">Door</MdSelectOption>
          </MdOutlinedSelect>
          <MdOutlinedTextField placeholder="Port of Loading"></MdOutlinedTextField>
        </div>
        <div className="flex gap-4">
          <NAOutlinedAutoComplete
            itemList={portList}
            value={destinationPort}
            setValue={setDestinationPort}
            required
            label="Destination"
            icon={<FmdGoodOutlined />}
            className="flex-1"
          />
          <MdOutlinedSelect>
            <MdSelectOption>CY</MdSelectOption>
            <MdSelectOption>Door</MdSelectOption>
          </MdOutlinedSelect>
          <MdOutlinedTextField placeholder="Port of Discharging"></MdOutlinedTextField>
        </div>
        <div className="flex">
          <MdSingleDatePicker />
        </div>
        <div className="flex gap-4">
          <NAOutlinedSelect label="Booking Office" required>
            {bookingOfficeList.map((office, index) => (
              <MdSelectOption key={index} value={office}>
                {office}
              </MdSelectOption>
            ))}
          </NAOutlinedSelect>
          <MdOutlinedSelect label="Contract Number">
            {randomContractList.map((contract, index) => (
              <MdSelectOption key={index} value={contract}>
                {contract}
              </MdSelectOption>
            ))}
            <MdSelectOption>Manually Input</MdSelectOption>
          </MdOutlinedSelect>
          <MdOutlinedTextField />
        </div>
      </div>
    </div>
  );
}
