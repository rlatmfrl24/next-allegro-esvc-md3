import { MdTypography } from "@/app/components/typography";
import {
  CycleSelector,
  SubscriptionItemContainer,
} from "./components/component";
import {
  MdChipSet,
  MdDialog,
  MdElevatedCard,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedTextField,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { Add, InfoOutlined, MoreVert } from "@mui/icons-material";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { DividerComponent } from "@/app/components/divider";
import { RemovableChip } from "@/app/components/chips/removable-chip";
import {
  autoUpdate,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { basicDropdownStyles } from "@/app/util/constants";
import {
  AddLongRangeScheduleDialog,
  AddPtpScheduleDialog,
} from "./components/schedule-dialog";
import { ScheduleSubscriptionProps } from "@/app/util/typeDef/subscription";
import EmptyResultPlaceholder from "@/app/components/empty-placeholder";
import { useSetRecoilState } from "recoil";
import { BottomFloatingState } from "@/app/store/subscription.store";
import Portal from "@/app/components/portal";

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
  } as ScheduleSubscriptionProps;
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

  const [isAddPtpScheduleDialogOpen, setIsAddPtpScheduleDialogOpen] =
    useState(false);

  const [
    isAddLongRangeScheduleDialogOpen,
    setIsAddLongRangeScheduleDialogOpen,
  ] = useState(false);

  const [isPtpScheduleSwitchOn, setIsPtpScheduleSwitchOn] = useState(true);
  const [isLongRangeScheduleSwitchOn, setIsLongRangeScheduleSwitchOn] =
    useState(true);

  return (
    <div className="flex flex-col gap-6">
      <MdTypography variant="title" size="large" className="mt-2">
        Report
      </MdTypography>
      <SubscriptionItemContainer
        name="Point ot Point Schedule"
        isExpandalbe
        // isSwitchOn={ptpSubscriptions.some((report) => report.useEmailService)}
        isSwitchOn={isPtpScheduleSwitchOn}
        onSwitchChange={(val) => {
          setIsPtpScheduleSwitchOn(val);
          // setPtpSubscriptions((prev) => {
          //   return prev.map((report) => {
          //     return {
          //       ...report,
          //       useEmailService: val,
          //     };
          //   });
          // });
        }}
      >
        <div slot="content" className="flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <MdTextButton
              onClick={() => {
                setIsAddPtpScheduleDialogOpen(true);
              }}
            >
              <MdIcon slot="icon">
                <Add fontSize="small" />
              </MdIcon>
              Add Schedule
            </MdTextButton>
            <Portal selector="#main-container">
              <AddPtpScheduleDialog
                open={isAddPtpScheduleDialogOpen}
                onOpenChange={setIsAddPtpScheduleDialogOpen}
                onScheduleSave={(data) => {
                  setPtpSubscriptions((prev) => [...prev, data]);
                }}
              />
            </Portal>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
          </div>
          {ptpSubscriptions.length === 0 && (
            <EmptyResultPlaceholder text="If you'd like to be notified, add a schedule." />
          )}
          {ptpSubscriptions.map((data, index) => (
            <ScheduleSubscriptionItem
              key={index}
              data={data}
              disabled={!isPtpScheduleSwitchOn}
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
              onDelete={() => {
                setPtpSubscriptions((prev) => {
                  return prev.filter((_, i) => i !== index);
                });
              }}
            />
          ))}
        </div>
      </SubscriptionItemContainer>
      <SubscriptionItemContainer
        name="Long Range Schedule"
        isExpandalbe
        // isSwitchOn={longRangeSubscriptions.some(
        //   (report) => report.useEmailService
        // )}
        isSwitchOn={isLongRangeScheduleSwitchOn}
        onSwitchChange={(val) => {
          setIsLongRangeScheduleSwitchOn(val);
          // setLongRangeSubscriptions((prev) => {
          //   return prev.map((report) => {
          //     return {
          //       ...report,
          //       useEmailService: val,
          //     };
          //   });
          // });
        }}
      >
        <div slot="content" className="flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <MdTextButton
              onClick={() => {
                setIsAddLongRangeScheduleDialogOpen(true);
              }}
            >
              <MdIcon slot="icon">
                <Add fontSize="small" />
              </MdIcon>
              Add Schedule
            </MdTextButton>
            <AddLongRangeScheduleDialog
              open={isAddLongRangeScheduleDialogOpen}
              onOpenChange={setIsAddLongRangeScheduleDialogOpen}
              onScheduleSave={(data) => {
                setLongRangeSubscriptions((prev) => [...prev, data]);
              }}
            />
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
          </div>
          {longRangeSubscriptions.length === 0 && (
            <EmptyResultPlaceholder text="If you'd like to be notified, add a schedule." />
          )}
          {longRangeSubscriptions.map((data, index) => (
            <ScheduleSubscriptionItem
              key={index}
              data={data}
              disabled={!isLongRangeScheduleSwitchOn}
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
              onDelete={() => {
                setLongRangeSubscriptions((prev) => {
                  return prev.filter((_, i) => i !== index);
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
  onDelete?: () => void;
  disabled?: boolean;
}) => {
  const [recipients, setRecipients] = useState(props.data.recipients);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const setBottomFloatingVisible = useSetRecoilState(BottomFloatingState);

  const { refs, floatingStyles, context } = useFloating({
    open: isActionMenuOpen,
    onOpenChange: setIsActionMenuOpen,
    placement: "bottom-end",
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    basicDropdownStyles
  );

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, {
      role: "menu",
    }),
  ]);

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
          disabled={props.disabled}
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
          onChanges={(data) => {
            if (props.onChanges) {
              props.onChanges({
                ...props.data,
                cycleType: data.cycleOption,
                cycleValue:
                  data.cycleOption === "Weekly"
                    ? data.weekOption ?? ""
                    : data.cycleOption === "Monthly"
                    ? data.dayOption ?? ""
                    : "",
              });
            }
            if (data.dayOption !== undefined || data.weekOption !== undefined) {
              setBottomFloatingVisible(true);
            }
          }}
        />
        <DividerComponent orientation="vertical" className="border-dotted" />
        <div className="flex-1">
          <MdOutlinedTextField
            label="Recipients"
            disabled={props.disabled}
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
                setBottomFloatingVisible(true);
                e.currentTarget.value = "";
              }
            }}
          />
          <MdChipSet>
            {recipients.map((recipient, index) => (
              <RemovableChip
                key={recipient}
                label={recipient}
                disabled={props.disabled}
                onRemove={() => {
                  setRecipients((prev) => prev.filter((_, i) => i !== index));
                  setBottomFloatingVisible(true);
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
            disabled={props.disabled}
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
        <MdIconButton
          disabled={props.disabled}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <MdIcon>
            <MoreVert />
          </MdIcon>
        </MdIconButton>
        {isMounted && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-10"
          >
            <MdElevatedCard style={transitionStyles} className="py-2">
              <MdListItem
                type="button"
                onClick={() => {
                  setIsActionMenuOpen(false);
                  setIsConfirmDialogOpen(true);
                }}
              >
                Delete
              </MdListItem>
            </MdElevatedCard>
          </div>
        )}
        <Portal selector="#main-container">
          <MdDialog
            open={isConfirmDialogOpen}
            closed={() => setIsConfirmDialogOpen(false)}
          >
            <div slot="headline">
              Are you sure you want to delete this Schedule?
            </div>
            <div slot="content">
              {props.data.origin} / {props.data.destination}
            </div>
            <div slot="actions">
              <MdTextButton
                onClick={() => {
                  setIsConfirmDialogOpen(false);
                }}
              >
                Cancel
              </MdTextButton>
              <MdFilledButton
                onClick={() => {
                  if (props.onDelete) {
                    props.onDelete();
                  }
                  setIsConfirmDialogOpen(false);
                }}
              >
                Delete
              </MdFilledButton>
            </div>
          </MdDialog>
        </Portal>
      </div>
    </div>
  );
};
