import { MdTypography } from "@/app/components/typography";
import { InfoOutlined } from "@mui/icons-material";
import { SimpleSubscriptionItem } from "./components/component";

export const DocumentationSubscription = () => {
  return (
    <div className="flex flex-col">
      <MdTypography variant="title" size="large" className="mt-2">
        Documentation
      </MdTypography>
      <MdTypography
        variant="body"
        size="medium"
        className="text-outline flex items-center gap-1 mt-4"
      >
        <InfoOutlined fontSize="small" />
        This setting is a default value and will be applied when you submit a
        Booking or Shipping Instruction Notification will be sent to
        <MdTypography
          variant="body"
          size="medium"
          prominent
          className="text-onSurface"
        >
          “Contact Email Address”
        </MdTypography>
        provided during Booking or Shipping Instruction
      </MdTypography>
      <div className="flex flex-col gap-6 mt-7">
        <SimpleSubscriptionItem name="Booking Follow up" />
        <SimpleSubscriptionItem name="Shipping Instruction Follow up" />
      </div>
    </div>
  );
};
