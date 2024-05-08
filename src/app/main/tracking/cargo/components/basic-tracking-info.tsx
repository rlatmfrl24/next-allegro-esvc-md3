import { DividerComponent } from "@/app/components/divider";
import { MdTypography } from "@/app/components/typography";
import { CargoTrackingProps } from "@/app/util/typeDef/tracking";
import { Place } from "@mui/icons-material";

export const BasicTrackingInfo = ({ data }: { data: CargoTrackingProps }) => {
  return (
    <>
      <div className="flex flex-col pr-4 mr-4 border-r border-dotted border-outlineVariant w-60">
        <MdTypography variant="label" size="small" className="text-outline">
          BKG No.
        </MdTypography>
        <MdTypography
          variant="body"
          size="medium"
          prominent
          className="text-onSurface"
        >
          {data.bookingNumber}
        </MdTypography>
      </div>
      <div className="flex flex-col border-r border-dotted border-outlineVariant mr-4 w-80">
        <MdTypography variant="label" size="small" className="text-outline">
          Container No.
        </MdTypography>
        <div className="flex items-center gap-2">
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-onSurface"
          >
            {data.contaienrNumber}
          </MdTypography>
          <DividerComponent orientation="vertical" className="h-4" />
          <MdTypography
            variant="label"
            size="medium"
            className="text-onSurface"
          >
            {data.containerSize + `'` + data.containerType}
          </MdTypography>
        </div>
        <div className="grid grid-cols-[56px_1fr] w-fit mt-2">
          <MdTypography variant="label" size="medium" className="text-outline">
            Seal No.
          </MdTypography>
          <MdTypography
            variant="label"
            size="medium"
            className="text-onSurfaceVariant"
          >
            {data.sealNumber}
          </MdTypography>
          <MdTypography variant="label" size="medium" className="text-outline">
            Weight
          </MdTypography>
          <div className="flex gap-1">
            <MdTypography
              tag="span"
              variant="label"
              size="medium"
              className="text-onSurfaceVariant"
            >
              {data.weight.toFixed(3)}
            </MdTypography>
            <MdTypography
              tag="span"
              variant="label"
              size="medium"
              className="text-outline"
            >
              {data.weightUnit}
            </MdTypography>
          </div>
        </div>
        <MdTypography
          variant="label"
          size="medium"
          className="flex items-center mt-4 gap-1"
        >
          <Place className="text-primary" fontSize="small" />
          {data.lastPort.yardName}
        </MdTypography>
        <MdTypography
          variant="body"
          size="small"
          className="text-outline mt-1 "
        >
          {data.lastPortTime.toFormat("yyyy-MM-dd HH:mm")}
        </MdTypography>
      </div>
    </>
  );
};
