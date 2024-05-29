import { MdTypography } from "@/app/components/typography";
import { MdDialog, MdFilledButton, MdOutlinedButton } from "@/app/util/md3";
import { Dispatch, SetStateAction } from "react";
import styles from "@/app/styles/visibility.module.css";
import classNames from "classnames";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";

export const SummaryDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const cx = classNames.bind(styles);

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-fit"
    >
      <div slot="headline">Visibility Summary</div>
      <div slot="content" className="grid grid-cols-2 gap-4">
        <div className={cx(styles["inner-dialog-box"])}>
          <MdTypography variant="body" size="large" prominent className="mb-4">
            Shipment By
          </MdTypography>
          <SimpleRadioGroup
            groupName="summary-shipment-by"
            options={["Shipper", "Consignee", "Contract"]}
          />
        </div>
        <div className={cx(styles["inner-dialog-box"])}>
          <MdTypography variant="body" size="large" prominent>
            Service Route
          </MdTypography>
        </div>
        <div className={cx(styles["inner-dialog-box"], "col-span-2")}>
          <MdTypography variant="body" size="large" prominent>
            Reports
          </MdTypography>
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const EventDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const cx = classNames.bind(styles);

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-fit"
    >
      <div slot="headline">Event Notification</div>
      <div slot="content" className="grid grid-cols-2 gap-4">
        <div className={cx(styles["inner-dialog-box"], "flex flex-col gap-4")}>
          <MdTypography variant="body" size="large" prominent>
            Service Type
          </MdTypography>
          <SimpleRadioGroup
            groupName="event-service-type"
            options={["By Service Route", "By Booking No. or Container No."]}
          />
          <MdTypography variant="body" size="large" prominent className="mt-4">
            Inquiry Option
          </MdTypography>
          <SimpleRadioGroup
            groupName="event-inquiry-option"
            options={["Shipper", "Consignee", "Contract"]}
          />
        </div>
        <div className={cx(styles["inner-dialog-box"])}>
          <MdTypography variant="body" size="large" prominent>
            Service Route
          </MdTypography>
        </div>
        <div className={cx(styles["inner-dialog-box"], "col-span-2")}>
          <MdTypography variant="body" size="large" prominent>
            Report Items
          </MdTypography>
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const VesselDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const cx = classNames.bind(styles);
  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-fit"
    >
      <div slot="headline">Vessel Schedule Updates</div>
      <div slot="content" className="grid grid-cols-2 gap-4">
        <div className={cx(styles["inner-dialog-box"], "flex flex-col gap-4")}>
          <MdTypography variant="body" size="large" prominent>
            Service Type
          </MdTypography>
          <SimpleRadioGroup
            groupName="vessel-service-type"
            options={["By Service Route", "By Booking No. or Container No."]}
          />
          <MdTypography variant="body" size="large" prominent className="mt-4">
            Inquiry Option
          </MdTypography>
          <SimpleRadioGroup
            groupName="vessel-inquiry-option"
            options={["Shipper", "Consignee", "Contract"]}
          />
          <MdTypography variant="body" size="large" prominent className="mt-4">
            Type of Schedule
          </MdTypography>
          <SimpleRadioGroup
            groupName="vessel-schedule-type"
            options={["All", "Arrival", "Departure"]}
          />
        </div>
        <div className={cx(styles["inner-dialog-box"])}>
          <MdTypography variant="body" size="large" prominent>
            Service Route
          </MdTypography>
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange;
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
