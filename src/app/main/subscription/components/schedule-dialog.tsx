import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { DetailTitle, SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilledTonalIconButton,
  MdIcon,
  MdIconButton,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ArrowDropDown,
  Check,
  Favorite,
  FmdGoodOutlined,
  InfoOutlined,
  SwapHorizOutlined,
} from "@mui/icons-material";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CycleSelector } from "./component";
import { DividerComponent } from "@/app/components/divider";
import { RemovableChip } from "@/app/components/chips/removable-chip";
import { ScheduleSubscriptionProps } from "@/app/util/typeDef/subscription";
import { DateTime } from "luxon";
import { Disclosure } from "@headlessui/react";
import { faker } from "@faker-js/faker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";

export const AddPtpScheduleDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onScheduleSave?: (data: ScheduleSubscriptionProps) => void;
}) => {
  const [currentData, setCurrentData] = useState<ScheduleSubscriptionProps>({
    origin: "",
    destination: "",
    cycleType: "Daily",
    cycleValue: "",
    recipients: [],
    useEmailService: false,
    lastSendingDate: DateTime.now(),
  });

  const tempPorts = useMemo(() => {
    return Array.from(
      { length: 100 },
      (_, i) => faker.location.city() + ", " + faker.location.country()
    );
  }, []);
  const tempFavorites = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      origin: faker.location.city() + ", " + faker.location.country(),
      destination: faker.location.city() + ", " + faker.location.country(),
    }));
  }, []);

  const [favorites, setFavorites] = useState(tempFavorites);

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
        setCurrentData({
          origin: "",
          destination: "",
          cycleType: "Daily",
          cycleValue: "",
          recipients: [],
          useEmailService: false,
          lastSendingDate: DateTime.now(),
        });
      }}
      className="min-w-fit"
    >
      <div slot="headline">Add Point to Point Schedule</div>
      <div slot="content" className="min-h-fit overflow-y-auto">
        <div className="flex gap-4 mb-4 items-center">
          <NAOutlinedAutoComplete
            itemList={tempPorts}
            label="Origin"
            initialValue={currentData.origin}
            icon={<FmdGoodOutlined />}
            onItemSelection={(value) => {
              setCurrentData((prev) => ({ ...prev, origin: value }));
            }}
          />
          <MdIconButton
            onClick={() => {
              setCurrentData((prev) => ({
                ...prev,
                origin: currentData.destination,
                destination: currentData.origin,
              }));
            }}
          >
            <SwapHorizOutlined />
          </MdIconButton>
          <NAOutlinedAutoComplete
            itemList={tempPorts}
            label="Destination"
            initialValue={currentData.destination}
            icon={<FmdGoodOutlined />}
            onItemSelection={(value) => {
              setCurrentData((prev) => ({ ...prev, destination: value }));
            }}
          />
        </div>
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className={`flex w-full items-center gap-2`}>
                <SubTitle title="My Favorite" />
                <DividerComponent />
                <ArrowDropDown
                  className={`transform ${open ? "rotate-180" : ""}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={`mb-4`}>
                <MdList className="bg-surfaceContainerHigh">
                  {favorites.map((favorite, index) => (
                    <MdListItem
                      key={index}
                      type="button"
                      onClick={() => {
                        setCurrentData((prev) => ({
                          ...prev,
                          origin: favorite.origin,
                          destination: favorite.destination,
                        }));
                      }}
                    >
                      <MdIcon slot="start">
                        {currentData.origin === favorite.origin &&
                          currentData.destination === favorite.destination && (
                            <Check />
                          )}
                      </MdIcon>
                      {favorite.origin} → {favorite.destination}
                    </MdListItem>
                  ))}
                </MdList>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <SubTitle title="Notification Setting" className="mb-4" />
        <div className="border border-outline rounded-lg px-4 py-6">
          <MdTypography variant="body" size="medium" className="text-outline ">
            <InfoOutlined fontSize="small" className="mr-1" />
            To enter multiple values, separated by a comma or space.
          </MdTypography>
          <div className="flex gap-4 mt-4 relative">
            <CycleSelector
              onChanges={(value) => {
                setCurrentData((prev) => ({
                  ...prev,
                  cycleType: value.cycleOption as
                    | "Daily"
                    | "Weekly"
                    | "Monthly",
                  cycleValue:
                    value.cycleOption === "Weekly"
                      ? value.weekOption ?? ""
                      : value.dayOption ?? "",
                }));
              }}
            />
            <DividerComponent orientation="vertical" />
            <div className="flex-1">
              <MdOutlinedTextField
                label="Recipients"
                className="w-full mb-4"
                onKeyDown={(e) => {
                  const value = e.currentTarget.value;

                  if (e.key === "Enter") {
                    if (e.currentTarget.value === "") {
                      return;
                    }
                    if (currentData.recipients.includes(value)) {
                      return;
                    }
                    setCurrentData((prev) => ({
                      ...prev,
                      recipients: [...prev.recipients, value],
                    }));
                    e.currentTarget.value = "";
                  }
                }}
              />
              <MdChipSet>
                {currentData.recipients.map((recipient, index) => (
                  <RemovableChip
                    key={recipient}
                    label={recipient}
                    onRemove={() => {
                      setCurrentData((prev) => ({
                        ...prev,
                        recipients: prev.recipients.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                  />
                ))}
              </MdChipSet>
            </div>
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
            props.onScheduleSave?.(currentData);
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};

export const AddLongRangeScheduleDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onScheduleSave?: (data: ScheduleSubscriptionProps) => void;
}) => {
  const [currentData, setCurrentData] = useState<ScheduleSubscriptionProps>({
    origin: "",
    destination: "",
    cycleType: "Daily",
    cycleValue: "",
    recipients: [],
    useEmailService: false,
    lastSendingDate: DateTime.now(),
  });

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
        setCurrentData({
          origin: "",
          destination: "",
          cycleType: "Daily",
          cycleValue: "",
          recipients: [],
          useEmailService: false,
          lastSendingDate: DateTime.now(),
        });
      }}
      className="min-w-fit "
    >
      <div slot="headline">Add Long Range Schedule</div>
      <div slot="content" className="min-h-fit overflow-y-auto">
        <input className="h-0" autoFocus />
        <div className="flex gap-4 mb-6">
          <NAOutlinedListBox
            label="Origin"
            options={["ASIA", "EUROPE", "AMERICA", "AFRICA", "OCEANIA"]}
            onSelection={(value) => {
              setCurrentData((prev) => ({ ...prev, origin: value }));
            }}
          />
          <NAOutlinedListBox
            label="Destination"
            options={["ASIA", "EUROPE", "AMERICA", "AFRICA", "OCEANIA"]}
            onSelection={(value) => {
              setCurrentData((prev) => ({ ...prev, destination: value }));
            }}
          />
        </div>
        <SubTitle title="Notification Setting" className="mb-4" />
        <div className="border border-outline rounded-lg px-4 py-6">
          <MdTypography variant="body" size="medium" className="text-outline ">
            <InfoOutlined fontSize="small" className="mr-1" />
            To enter multiple values, separated by a comma or space.
          </MdTypography>
          <div className="flex gap-4 mt-4 relative">
            <CycleSelector
              onChanges={(value) => {
                setCurrentData((prev) => ({
                  ...prev,
                  cycleType: value.cycleOption as
                    | "Daily"
                    | "Weekly"
                    | "Monthly",
                  cycleValue:
                    value.cycleOption === "Weekly"
                      ? value.weekOption ?? ""
                      : value.dayOption ?? "",
                }));
              }}
            />
            <DividerComponent orientation="vertical" />
            <div className="flex-1">
              <MdOutlinedTextField
                label="Recipients"
                className="w-full mb-4"
                onKeyDown={(e) => {
                  const value = e.currentTarget.value;

                  if (e.key === "Enter") {
                    if (e.currentTarget.value === "") {
                      return;
                    }
                    if (currentData.recipients.includes(value)) {
                      return;
                    }
                    setCurrentData((prev) => ({
                      ...prev,
                      recipients: [...prev.recipients, value],
                    }));
                    e.currentTarget.value = "";
                  }
                }}
              />
              <MdChipSet>
                {currentData.recipients.map((recipient, index) => (
                  <RemovableChip
                    key={recipient}
                    label={recipient}
                    onRemove={() => {
                      setCurrentData((prev) => ({
                        ...prev,
                        recipients: prev.recipients.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                  />
                ))}
              </MdChipSet>
            </div>
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
            props.onScheduleSave?.(currentData);
          }}
        >
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
