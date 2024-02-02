import { MdIcon, MdIconButton, MdOutlinedTextField } from "@/app/util/md3";
import { ReferenceType } from "@floating-ui/react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateTime } from "luxon";
import { RefAttributes, useState } from "react";

export const MdDateField = (props: { defaultDate?: DateTime }) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const [invalid, setInvalid] = useState(false);
  const [defaultDate, setDefaultDate] = useState<DateTime>(
    props.defaultDate || DateTime.now()
  );

  function validateDate(date: string) {
    return dateRegex.test(date);
  }
  function handleDateChange(e: any) {
    let targetValue = e.target.value;

    // pre-processing if value is 8 digits
    if (e.target.value.length === 8) {
      const month = targetValue.substring(0, 2);
      const day = targetValue.substring(2, 4);
      const year = targetValue.substring(4, 8);
      targetValue = `${month}/${day}/${year}`;
    }

    if (!validateDate(targetValue)) {
      e.target.value = defaultDate.toFormat("MM/dd/yyyy");
      setInvalid(true);
    } else {
      console.log("set to date::->", targetValue);
      setDefaultDate(DateTime.fromFormat(targetValue, "MM/dd/yyyy"));
      setInvalid(false);
    }
  }

  return (
    <MdOutlinedTextField
      className="relative"
      supportingText="MM/DD/YYYY"
      errorText="Invalid date format"
      value={defaultDate.toFormat("MM/dd/yyyy")}
      error={invalid}
      onBlur={(e) => {
        handleDateChange(e);
      }}
    >
      <MdIconButton slot="trailing-icon">
        <MdIcon>
          <CalendarTodayIcon />
        </MdIcon>
      </MdIconButton>
    </MdOutlinedTextField>
  );
};
