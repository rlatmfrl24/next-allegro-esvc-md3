import { MdTypography } from "@/app/components/typography";
import { MdFilledButton, MdIcon, MdOutlinedTextField } from "@/app/util/md3";
import { DashboardInputCardDataType } from "@/app/util/typeDef";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function InputCard(props: DashboardInputCardDataType) {
  return (
    <div className="border-primaryContainer border rounded-xl flex-1 bg-white select-none">
      <div className="flex items-center text-primary bg-surfaceContainerLow h-16 px-4 rounded-xl border-b border-primaryContainer">
        <MdTypography variant="title" size="medium" className="flex-1">
          {props.title}
        </MdTypography>
        <MdIcon>
          <InfoOutlinedIcon />
        </MdIcon>
      </div>
      <div className="px-6 pb-6 flex flex-col gap-4 ">
        <MdTypography variant="body" size="medium" className="mt-4">
          {props.description}
        </MdTypography>
        <MdOutlinedTextField
          className="flex-1"
          placeholder={props.placeholder}
        />
        <MdFilledButton className="w-fit self-end">
          {props.buttonText}
        </MdFilledButton>
      </div>
    </div>
  );
}
