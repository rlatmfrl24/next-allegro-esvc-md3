import { MdRadio } from "../util/md3";
import { MdTypography } from "./typography";

export const SimpleRadioGroup = ({
  options,
  groupName,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  groupName: string;
  onChange?: (selected: string) => void;
}) => {
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
              onChange?.(option);
            }}
          />
          {option}
        </MdTypography>
      ))}
    </div>
  );
};
