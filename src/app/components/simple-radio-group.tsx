import { useState } from "react";
import { MdRadio } from "../util/md3";
import { MdTypography } from "./typography";

export const SimpleRadioGroup = ({
  options,
  groupName,
  initialSelected,
}: {
  options: string[];
  groupName: string;
  initialSelected?: string;
}) => {
  const [selected, setSelected] = useState<string>(
    initialSelected || options[0]
  );

  return (
    <div className="flex items-center gap-4">
      {options.map((option) => (
        <MdTypography
          tag="label"
          key={option + "_" + groupName}
          variant="label"
          size="large"
          className="flex gap-2 items-center cursor-pointer whitespace-nowrap"
        >
          <MdRadio
            name={groupName}
            checked={selected === option}
            onClick={() => {
              setSelected(option);
            }}
          />
          {option}
        </MdTypography>
      ))}
    </div>
  );
};
