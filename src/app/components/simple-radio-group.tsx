import { useEffect, useState } from "react";
import { MdRadio } from "../util/md3";
import { MdTypography } from "./typography";
import { on } from "events";

export const SimpleRadioGroup = ({
  options,
  groupName,
  initialSelected,
  onChange,
}: {
  options: string[];
  groupName: string;
  initialSelected?: string;
  onChange?: (selected: string) => void;
}) => {
  const [selected, setSelected] = useState<string>(
    initialSelected || options[0]
  );

  useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected);
    }
  }, [initialSelected]);

  useEffect(() => {
    onChange && onChange(selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
