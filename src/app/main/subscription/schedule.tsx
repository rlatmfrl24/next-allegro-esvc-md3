import { MdTypography } from "@/app/components/typography";
import { CycleSelector, SubscriptionItemContainer } from "./component";
import {
  MdChipSet,
  MdIcon,
  MdIconButton,
  MdOutlinedTextField,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { Add, InfoOutlined, MoreVert } from "@mui/icons-material";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { DividerComponent } from "@/app/components/divider";
import { RemovableChip } from "@/app/components/removable-chip";

type ScheduleSubscriptionProps = {
  origin: string;
  destination: string;
  cycleType: "Daily" | "Weekly" | "Monthly";
  cycleValue: string;
  recipients: string[];
  useEmailService: boolean;
  lastSendingDate: DateTime;
};

function createDummyScheduleSubscription(
  type: "ptp" | "long-range"
): ScheduleSubscriptionProps {
  const cycleType = faker.helpers.arrayElement(["Daily", "Weekly", "Monthly"]);

  return {
    origin:
      type === "ptp"
        ? faker.location.city() + ", " + faker.location.country()
        : faker.helpers.arrayElement(["ASIA", "EUROPE", "AMERICA", "AFRICA"]),
    destination:
      type === "ptp"
        ? faker.location.city() + ", " + faker.location.country()
        : faker.helpers.arrayElement(["ASIA", "EUROPE", "AMERICA", "AFRICA"]),
    cycleType: cycleType as "Daily" | "Weekly" | "Monthly",
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
            Array.from({ length: 31 }, (_, i) => i + 1).map(String)
          ),
    recipients: [],
    useEmailService: faker.datatype.boolean(),
    lastSendingDate: DateTime.fromJSDate(faker.date.recent()),
  };
}

export const ScheduleSubscription = () => {
  const tempPtpScheduleSubscriptions = useMemo(() => {
    return Array.from({ length: 5 }, () =>
      createDummyScheduleSubscription("ptp")
    );
  }, []);

  const tempLongRangeScheduleSubscriptions = useMemo(() => {
    return Array.from({ length: 5 }, () =>
      createDummyScheduleSubscription("long-range")
    );
  }, []);

  const [ptpSubscriptions, setPtpSubscriptions] = useState(
    tempPtpScheduleSubscriptions
  );

  const [longRangeSubscriptions, setLongRangeSubscriptions] = useState(
    tempLongRangeScheduleSubscriptions
  );

  return (
    <div className="flex flex-col gap-6">
      <MdTypography variant="title" size="large" className="mt-2">
        Report
      </MdTypography>
      <SubscriptionItemContainer
        name="Point ot Point Schedule"
        isExpandalbe
        isSwitchOn={ptpSubscriptions.some((report) => report.useEmailService)}
        onSwitchChange={(val) => {
          setPtpSubscriptions((prev) => {
            return prev.map((report) => {
              return {
                ...report,
                useEmailService: val,
              };
            });
          });
        }}
      >
        <div slot="content" className="flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <MdTextButton>
              <MdIcon slot="icon">
                <Add fontSize="small" />
              </MdIcon>
              Add Schedule
            </MdTextButton>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
          </div>
          {ptpSubscriptions.map((data, index) => (
            <ScheduleSubscriptionItem
              key={index}
              data={data}
              onChanges={(data) => {
                setPtpSubscriptions((prev) => {
                  return prev.map((r, i) => {
                    if (i === index) {
                      return data;
                    }
                    return r;
                  });
                });
              }}
            />
          ))}
        </div>
      </SubscriptionItemContainer>
      <SubscriptionItemContainer
        name="Long Range Schedule"
        isExpandalbe
        isSwitchOn={longRangeSubscriptions.some(
          (report) => report.useEmailService
        )}
        onSwitchChange={(val) => {
          setLongRangeSubscriptions((prev) => {
            return prev.map((report) => {
              return {
                ...report,
                useEmailService: val,
              };
            });
          });
        }}
      >
        <div slot="content" className="flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <MdTextButton>
              <MdIcon slot="icon">
                <Add fontSize="small" />
              </MdIcon>
              Add Schedule
            </MdTextButton>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
          </div>
          {longRangeSubscriptions.map((data, index) => (
            <ScheduleSubscriptionItem
              key={index}
              data={data}
              onChanges={(data) => {
                setLongRangeSubscriptions((prev) => {
                  return prev.map((r, i) => {
                    if (i === index) {
                      return data;
                    }
                    return r;
                  });
                });
              }}
            />
          ))}
        </div>
      </SubscriptionItemContainer>
    </div>
  );
};

const ScheduleSubscriptionItem = (props: {
  data: ScheduleSubscriptionProps;
  onChanges?: (data: ScheduleSubscriptionProps) => void;
}) => {
  const [recipients, setRecipients] = useState(props.data.recipients);

  return (
    <div className="border-2 border-secondaryContainer rounded-lg flex">
      <div className="w-2 bg-secondaryContainer"></div>
      <div className="flex-1 p-4 flex gap-4">
        <div className="w-44 max-w-44">
          <MdTypography variant="label" size="small" className="text-outline">
            Origin
          </MdTypography>
          <MdTypography variant="body" size="large" prominent>
            {props.data.origin}
          </MdTypography>
        </div>
        <DividerComponent orientation="vertical" className="border-dotted" />
        <div className="w-44 max-w-44">
          <MdTypography variant="label" size="small" className="text-outline">
            Destination
          </MdTypography>
          <MdTypography variant="body" size="large" prominent>
            {props.data.destination}
          </MdTypography>
        </div>
        <DividerComponent orientation="vertical" className="border-dotted" />
        <CycleSelector
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
        />
        <DividerComponent orientation="vertical" className="border-dotted" />
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
                }}
              />
            ))}
          </MdChipSet>
        </div>
        <DividerComponent orientation="vertical" className="border-dotted" />
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
        <MdIconButton>
          <MdIcon>
            <MoreVert />
          </MdIcon>
        </MdIconButton>
      </div>
    </div>
  );
};
