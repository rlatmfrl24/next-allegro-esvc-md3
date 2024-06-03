import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "@/app/styles/visibility.module.css";
import classNames from "classnames";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import {
  eventReportItemOptions,
  summaryReportItemOptions,
  summaryServiceRouteOptions,
} from "./util";
import { difference } from "lodash";
import SubIndicator from "@/../public/icon_subsum_indicator.svg";
import { Check, InfoOutlined } from "@mui/icons-material";

const CheckTree = (props: {
  name: string;
  options: string[];
  checkedItems: string[];
  onCheckedItemsChange?: (items: string[]) => void;
}) => {
  const [checkedItems, setCheckedItems] = useState(props.checkedItems);

  return (
    <div className="flex flex-col gap-4">
      <MdTypography
        tag="label"
        variant="label"
        size="large"
        className="flex items-center gap-2 cursor-pointer"
      >
        <MdCheckbox
          checked={checkedItems.length === props.options.length}
          indeterminate={
            checkedItems.length > 0 &&
            checkedItems.length < props.options.length
          }
          onClick={() => {
            const diff = difference(props.options, checkedItems);
            if (diff.length === 0) {
              setCheckedItems([]);
              return;
            } else {
              setCheckedItems(props.options);
            }
          }}
        />
        {props.name}
      </MdTypography>
      {props.options.map((option) => (
        <div key={option} className="flex gap-3 ml-1">
          <SubIndicator />
          <MdTypography
            variant="label"
            size="large"
            tag="label"
            className="flex items-center gap-2 cursor-pointer"
          >
            <MdCheckbox
              checked={checkedItems.includes(option)}
              onClick={() => {
                if (checkedItems.includes(option)) {
                  setCheckedItems(
                    checkedItems.filter((item) => item !== option)
                  );
                } else {
                  setCheckedItems([...checkedItems, option]);
                }
              }}
            />
            {option}
          </MdTypography>
        </div>
      ))}
    </div>
  );
};

export const SummaryDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const cx = classNames.bind(styles);

  const [checkedReportItems, setCheckedReportItems] = useState({
    "Basic Information": [] as string[],
    "Vessel Information": [] as string[],
    "Route Information": [] as string[],
    "Customs Information": [] as string[],
    "Rail Movement Information": [] as string[],
    "Pick-up & Delivery Information": [] as string[],
    "Customer Information": [] as string[], //
  });

  useEffect(() => {
    console.log(checkedReportItems);
  }, [checkedReportItems]);

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
          <div className="grid grid-cols-2 gap-6 mt-4">
            {Object.keys(summaryServiceRouteOptions).map((key) => (
              <div key={key}>
                <CheckTree
                  name={key}
                  options={
                    summaryServiceRouteOptions[
                      key as keyof typeof summaryServiceRouteOptions
                    ]
                  }
                  checkedItems={[]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx(styles["inner-dialog-box"], "col-span-2")}>
          <MdTypography variant="body" size="large" prominent>
            Reports
          </MdTypography>
          <div className="grid grid-cols-4 gap-6 mt-4">
            {Object.keys(summaryReportItemOptions).map((key) => (
              <div key={key}>
                <CheckTree
                  name={key}
                  options={
                    summaryReportItemOptions[
                      key as keyof typeof summaryReportItemOptions
                    ]
                  }
                  checkedItems={
                    checkedReportItems[key as keyof typeof checkedReportItems]
                  }
                  onCheckedItemsChange={(items) => {
                    setCheckedReportItems({
                      ...checkedReportItems,
                      [key]: items,
                    });
                  }}
                />
                {key === "Customer Information" && (
                  <MdTypography
                    variant="body"
                    size="medium"
                    className="mt-4 text-outline"
                  >
                    <InfoOutlined fontSize="small" className="mr-2" />
                    For US-bound cargo, info provided.
                  </MdTypography>
                )}
              </div>
            ))}
          </div>
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
          <div className="grid grid-cols-2 gap-6 my-4">
            {Object.keys(summaryServiceRouteOptions).map((key) => (
              <div key={key}>
                <CheckTree
                  name={key}
                  options={
                    summaryServiceRouteOptions[
                      key as keyof typeof summaryServiceRouteOptions
                    ]
                  }
                  checkedItems={[]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx(styles["inner-dialog-box"], "col-span-2")}>
          <MdTypography variant="body" size="large" prominent>
            Report Items
          </MdTypography>
          <div className="my-4">
            <CheckTree
              name="Events"
              options={eventReportItemOptions["Events"]}
              checkedItems={[]}
            />
          </div>
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
          <div className="grid grid-cols-2 gap-6 my-4">
            {Object.keys(summaryServiceRouteOptions).map((key) => (
              <div key={key}>
                <CheckTree
                  name={key}
                  options={
                    summaryServiceRouteOptions[
                      key as keyof typeof summaryServiceRouteOptions
                    ]
                  }
                  checkedItems={[]}
                />
              </div>
            ))}
          </div>
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
