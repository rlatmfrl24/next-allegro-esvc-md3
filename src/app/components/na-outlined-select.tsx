import { MdOutlinedSelect } from "../util/md3";
import { MdTypography } from "./typography";

type MdOutlinedSelectProps = React.ComponentProps<typeof MdOutlinedSelect>;

export default function NAOutlinedSelect({ ...props }: MdOutlinedSelectProps) {
  return (
    <div className="relative">
      <MdOutlinedSelect {...props} required={false} />
      {props.required && (
        <MdTypography
          variant="label"
          size="large"
          className="text-error absolute top-0.5 left-1.5"
        >
          *
        </MdTypography>
      )}
    </div>
  );
}
