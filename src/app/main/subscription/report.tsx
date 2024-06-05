import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { RemovableChip } from "@/app/components/removable-chip";
import { MdTypography } from "@/app/components/typography";
import { MdChipSet, MdOutlinedTextField, MdSwitch } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { InfoOutlined } from "@mui/icons-material";

import {
  CycleSelector,
  SubscriptionItemContainer,
} from "./components/component";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BottomFloatingState } from "@/app/store/subscription.store";

type ReportSubscriptionProps = {
  origin: string;
  destination: string;
  inqueryType: "Customer" | "Contract";
  inqueryValue: string;
  dateType: "Arrival" | "Departure";
  searchingPeriod: number;
  cycleType: "Daily" | "Weekly" | "Monthly";
  cycleValue: string;
  useEmailService: boolean;
  lastSendingDate: DateTime;
};

function createDummyReportSubscriptionData(switchOption?: boolean | undefined) {
  const inqueryType = faker.helpers.arrayElement(["Customer", "Contract"]);
  const cycleType = faker.helpers.arrayElement(["Daily", "Weekly", "Monthly"]);

  return {
    origin: faker.location.city() + ", " + faker.location.country(),
    destination: faker.location.city() + ", " + faker.location.country(),
    inqueryType: inqueryType,
    inqueryValue:
      inqueryType === "Customer"
        ? faker.helpers
            .arrayElements(["Shipper", "Consignee", "Forwarder", "Notify"])
            .join(", ")
        : faker.string.alphanumeric(10).toUpperCase(),
    dateType: faker.helpers.arrayElement(["Arrival", "Departure"]),
    searchingPeriod: faker.number.int({ max: 8 }),
    cycleType: cycleType,
    cycleValue:
      cycleType === "Daily"
        ? ""
        : cycleType === "Weekly"
        ? faker.helpers.arrayElement([
            "SUN",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
          ])
        : faker.helpers.arrayElement(
            Array.from({ length: 31 }, (_, i) => i + 1)
          ),
    useEmailService:
      switchOption !== undefined ? switchOption : faker.datatype.boolean(),
    lastSendingDate: DateTime.fromJSDate(faker.date.recent()),
  } as ReportSubscriptionProps;
}

export const ReportSubscription = () => {
  const tempReports = useMemo(
    () => Array.from({ length: 5 }, () => createDummyReportSubscriptionData()),
    []
  );

  const [reportDataSet, setReportDataSet] = useState(tempReports);

  const isContainerSwithOn = useMemo(() => {
    return reportDataSet.some((report) => report.useEmailService);
  }, [reportDataSet]);

  return (
    <div className="flex flex-col">
      <MdTypography variant="title" size="large" className="mt-2">
        Report
      </MdTypography>
      <MdTypography variant="body" size="medium" className="text-outline my-4">
        <InfoOutlined fontSize="small" className="mr-1" />
        This Service provides customers with customized report without entering
        specific shipment number. 37 items related to your shipment are
        available and these can be edited by simple touch
      </MdTypography>
      <SubscriptionItemContainer
        name="Report"
        isSwitchOn={isContainerSwithOn}
        onSwitchChange={(val) => {
          setReportDataSet((prev) =>
            prev.map((report) => ({ ...report, useEmailService: val }))
          );
        }}
      >
        <div slot="content" className="p-6 flex flex-col">
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline text-right mb-4"
          >
            <InfoOutlined fontSize="small" className="mr-1" />
            To enter multiple values, separated by a comma or space.
          </MdTypography>
          <div className="flex flex-col gap-4">
            {reportDataSet.map((report, index) => (
              <ReportItem
                key={index}
                data={report}
                onChanges={(report) => {
                  setReportDataSet((prev) => {
                    //detect the change
                    return prev.map((r, i) => {
                      if (i === index) {
                        return report;
                      }
                      return r;
                    });
                  });
                }}
              />
            ))}
          </div>
        </div>
      </SubscriptionItemContainer>
    </div>
  );
};

const ReportItem = (props: {
  data: ReportSubscriptionProps;
  onChanges?: (data: ReportSubscriptionProps) => void;
}) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const setIsBottomFloatingVisible = useSetRecoilState(BottomFloatingState);

  return (
    <div className="flex border-2 border-secondaryContainer rounded-lg">
      <div className="w-2 bg-secondaryContainer"></div>
      <div className="flex-1 p-4">
        <MdTypography
          variant="label"
          size="small"
          className="text-outline mb-1"
        >
          Origin / Destination
        </MdTypography>
        <MdTypography variant="body" size="large" prominent>
          {props.data.origin} → {props.data.destination}
        </MdTypography>
        <div className="flex mt-6 gap-4">
          <div className="max-w-36 w-36">
            <MdTypography
              variant="label"
              size="small"
              className="text-outline mb-1"
            >
              Inquiry Option
            </MdTypography>
            <MdTypography variant="body" size="large">
              {props.data.inqueryValue}
            </MdTypography>
          </div>
          <DividerComponent orientation="vertical" className=" border-dotted" />
          <NAOutlinedListBox
            label="Inquiry Type"
            options={["Arrival", "Departure"]}
            initialValue={props.data.dateType}
            className="w-36"
            onSelection={(value) => {
              if (props.onChanges) {
                props.onChanges({
                  ...props.data,
                  dateType: value as "Arrival" | "Departure",
                });
                setIsBottomFloatingVisible(true);
              }
            }}
          />
          <NAOutlinedListBox
            label="Searching Period"
            options={Array.from({ length: 8 }, (_, i) => i + 1).map(
              (i) => String(i + 1) + " Week" + (i > 1 ? "s" : "")
            )}
            initialValue={
              String(props.data.searchingPeriod) +
              " Week" +
              (props.data.searchingPeriod > 1 ? "s" : "")
            }
            className="w-36"
            onSelection={(value) => {
              if (props.onChanges) {
                props.onChanges({
                  ...props.data,
                  searchingPeriod: Number(value.split(" ")[0]),
                });
                setIsBottomFloatingVisible(true);
              }
            }}
          />
          <CycleSelector
            label="Sending Cycle"
            initialValue={{
              cycleOption: props.data.cycleType,
              weekOption:
                props.data.cycleType === "Weekly"
                  ? props.data.cycleValue
                  : undefined,
              dayOption:
                props.data.cycleType === "Monthly"
                  ? props.data.cycleValue
                  : undefined,
            }}
            onChanges={(value) => {
              if (props.onChanges) {
                props.onChanges({
                  ...props.data,
                  cycleType: value.cycleOption,
                  cycleValue:
                    value.cycleOption === "Weekly"
                      ? value.weekOption || ""
                      : value.dayOption || "",
                });
                setIsBottomFloatingVisible(true);
              }
            }}
          />
          <DividerComponent orientation="vertical" className=" border-dotted" />

          <div className="flex-1">
            <MdOutlinedTextField
              label="Recipients"
              className="w-full mb-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.currentTarget.value === "") {
                    return;
                  }
                  if (recipients.includes(e.currentTarget.value)) {
                    return;
                  }
                  setRecipients([...recipients, e.currentTarget.value]);
                  setIsBottomFloatingVisible(true);
                  e.currentTarget.value = "";
                }
              }}
            />
            <MdChipSet>
              {recipients.map((recipient, index) => (
                <RemovableChip
                  key={recipient}
                  label={recipient}
                  onRemove={() => {
                    setRecipients((prev) => prev.filter((_, i) => i !== index));
                    setIsBottomFloatingVisible(true);
                  }}
                />
              ))}
            </MdChipSet>
          </div>
          <DividerComponent orientation="vertical" className=" border-dotted" />
          <div>
            <MdTypography variant="label" size="small" className="text-outline">
              Email Service
            </MdTypography>
            <MdSwitch
              selected={props.data.useEmailService}
              onClick={(e) => {
                e.preventDefault();

                if (props.onChanges) {
                  props.onChanges({
                    ...props.data,
                    useEmailService: !props.data.useEmailService,
                  });
                }
              }}
            />
          </div>
          <DividerComponent orientation="vertical" className=" border-dotted" />
          <div className="flex flex-col w-32">
            <MdTypography
              variant="label"
              size="small"
              className="text-outline mb-1"
            >
              Last Sending Date
            </MdTypography>
            <MdTypography variant="body" size="large">
              {props.data.lastSendingDate.toFormat("yyyy-MM-dd HH:mm")}
            </MdTypography>
          </div>
        </div>
      </div>
    </div>
  );
};
