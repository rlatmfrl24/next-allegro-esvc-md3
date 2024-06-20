import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdInputChip,
  MdOutlinedButton,
} from "@/app/util/md3";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
import { InfoOutlined } from "@mui/icons-material";
import { faker } from "@faker-js/faker";
import { ContractNumberSelector } from "@/app/components/update-contract-number";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

const CheckTree = (props: {
  name: string;
  options: string[];
  checkedItems: string[];
  onCheckedItemsChange?: (items: string[]) => void;
}) => {
  const [checkedItems, setCheckedItems] = useState(props.checkedItems);

  useEffect(() => {
    if (props.onCheckedItemsChange) {
      props.onCheckedItemsChange(checkedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);

  useEffect(() => {
    setCheckedItems(props.checkedItems);
  }, [props.checkedItems]);

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

  const tempContractNumbers = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [initialCheckedServiceRouteItems, setInitialCheckedServiceRouteItems] =
    useState({
      Origin: faker.helpers.arrayElements(summaryServiceRouteOptions["Origin"]),
      Destination: faker.helpers.arrayElements(
        summaryServiceRouteOptions["Destination"]
      ),
    });
  const [initialCheckedReportItems, setInitialCheckedReportItems] = useState({
    "Basic Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Basic Information"]
    ),
    "Vessel Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Vessel Information"]
    ),
    "Route Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Route Information"]
    ),
    "Customs Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Customs Information"]
    ),
    "Rail Movement Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Rail Movement Information"]
    ),
    "Pick-up & Delivery Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Pick-up & Delivery Information"]
    ),
    "Customer Information": faker.helpers.arrayElements(
      summaryReportItemOptions["Customer Information"]
    ),
  });
  const [checkedReportItems, setCheckedReportItems] = useState(
    initialCheckedReportItems
  );
  const [checkedServiceRouteItems, setCheckedServiceRouteItems] = useState(
    initialCheckedServiceRouteItems
  );
  const [initialRadioOptions, setInitialRadioOptions] = useState({
    shipmentBy: "Shipper",
  });
  const [selectedRadioOption, setSelectedRadioOption] =
    useState(initialRadioOptions);

  function handleReset() {
    setCheckedServiceRouteItems(initialCheckedServiceRouteItems);
    setCheckedReportItems(initialCheckedReportItems);
    setSelectedRadioOption(initialRadioOptions);
    props.onOpenChange(false);
  }

  function handleSave() {
    setInitialCheckedReportItems(checkedReportItems);
    setInitialCheckedServiceRouteItems(checkedServiceRouteItems);
    setInitialRadioOptions(selectedRadioOption);
    props.onOpenChange(false);
    setIsSaveDialogOpen(false);
  }

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-[960px]"
    >
      <div slot="headline">Visibility Summary</div>
      <div slot="content" className="grid grid-cols-2 gap-4">
        <div className={cx(styles["inner-dialog-box"], "flex flex-col gap-6")}>
          <MdTypography variant="body" size="large" prominent>
            Shipment By
          </MdTypography>
          <SimpleRadioGroup
            groupName="summary-shipment-by"
            options={["Shipper", "Consignee", "Contract"]}
            selected={selectedRadioOption.shipmentBy}
            onChange={(option) => {
              setSelectedRadioOption({
                ...selectedRadioOption,
                shipmentBy: option,
              });
            }}
          />
          <ContractNumberSelector contracts={tempContractNumbers} />
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
                  checkedItems={
                    checkedServiceRouteItems[
                      key as keyof typeof checkedServiceRouteItems
                    ]
                  }
                  onCheckedItemsChange={(items) => {
                    setCheckedServiceRouteItems({
                      ...checkedServiceRouteItems,
                      [key]: items,
                    });
                  }}
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
        <MdDialog
          open={isSaveDialogOpen}
          closed={() => {
            setIsSaveDialogOpen(false);
          }}
        >
          <div slot="headline">Are you sure you want to save the changes?</div>
          <div slot="actions">
            <div className="flex gap-4">
              <MdOutlinedButton
                onClick={() => {
                  setIsSaveDialogOpen(false);
                }}
              >
                Cancel
              </MdOutlinedButton>
              <MdFilledButton onClick={handleSave}>Save</MdFilledButton>
            </div>
          </div>
        </MdDialog>
      </div>
      <div slot="actions">
        <MdOutlinedButton onClick={handleReset}>Cancel</MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            setIsSaveDialogOpen(true);
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
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [initialCheckedServiceRouteItems, setInitialCheckedServiceRouteItems] =
    useState({
      Origin: faker.helpers.arrayElements(summaryServiceRouteOptions["Origin"]),
      Destination: faker.helpers.arrayElements(
        summaryServiceRouteOptions["Destination"]
      ),
    });
  const [initialCheckedReportItems, setInitialCheckedReportItems] = useState({
    Events: faker.helpers.arrayElements(eventReportItemOptions["Events"]),
  });
  const [checkedServiceRouteItems, setCheckedServiceRouteItems] = useState(
    initialCheckedServiceRouteItems
  );
  const [checkedReportItems, setCheckedReportItems] = useState(
    initialCheckedReportItems
  );
  const [initialRadioOptions, setInitialRadioOptions] = useState({
    serviceType: "By Service Route",
    inquiryOption: "Shipper",
  });
  const [selectedRadioOption, setSelectedRadioOption] =
    useState(initialRadioOptions);

  const tempContractNumbers = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);

  const [inputQuery, setInputQuery] = useState("");
  const [chips, setChips] = useState<string[]>([]);

  function handleReset() {
    setCheckedServiceRouteItems(initialCheckedServiceRouteItems);
    setCheckedReportItems(initialCheckedReportItems);
    setSelectedRadioOption(initialRadioOptions);
    props.onOpenChange(false);
  }

  function handleSave() {
    setInitialCheckedReportItems(checkedReportItems);
    setInitialCheckedServiceRouteItems(checkedServiceRouteItems);
    setInitialRadioOptions(selectedRadioOption);
    props.onOpenChange(false);
    setIsSaveDialogOpen(false);
  }

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-[960px]"
    >
      <div slot="headline">Event Notification</div>
      <div slot="content" className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex gap-6">
          <MdTypography variant="body" size="large" prominent>
            Service Type
          </MdTypography>
          <SimpleRadioGroup
            groupName="event-service-type"
            options={["By Service Route", "By Booking No. or Container No."]}
            selected={selectedRadioOption.serviceType}
            onChange={(option) => {
              setSelectedRadioOption({
                ...selectedRadioOption,
                serviceType: option,
              });
            }}
          />
        </div>
        {selectedRadioOption.serviceType === "By Service Route" ? (
          <>
            <div
              className={cx(styles["inner-dialog-box"], "flex flex-col gap-4")}
            >
              <MdTypography variant="body" size="large" prominent>
                Inquiry Option
              </MdTypography>
              <SimpleRadioGroup
                groupName="event-inquiry-option"
                options={["Shipper", "Consignee", "Contract"]}
                selected={selectedRadioOption.inquiryOption}
                onChange={(option) => {
                  setSelectedRadioOption({
                    ...selectedRadioOption,
                    inquiryOption: option,
                  });
                }}
              />
              <ContractNumberSelector contracts={tempContractNumbers} />
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
                      checkedItems={
                        checkedServiceRouteItems[
                          key as keyof typeof checkedServiceRouteItems
                        ]
                      }
                      onCheckedItemsChange={(items) => {
                        setCheckedServiceRouteItems({
                          ...checkedServiceRouteItems,
                          [key]: items,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={cx(
                styles["inner-dialog-box"],
                "col-span-2 flex flex-col gap-4"
              )}
            >
              <MdTypography variant="label" size="large" prominent>
                By Booking No. or Container No.
              </MdTypography>
              <NAOutlinedTextField
                label="By Booking No. or Container No."
                value={inputQuery}
                handleValueChange={(value) => setInputQuery(value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (inputQuery && !chips.includes(inputQuery)) {
                      setChips((prev) => [...prev, inputQuery]);
                    }
                    setInputQuery("");
                  }
                }}
              />
              <MdChipSet>
                {chips.map((chip) => (
                  <MdInputChip
                    selected
                    key={chip}
                    label={chip}
                    remove={() => {
                      setChips((prev) => prev.filter((c) => c !== chip));
                    }}
                  />
                ))}
              </MdChipSet>
            </div>
          </>
        )}
        <div className={cx(styles["inner-dialog-box"], "col-span-2")}>
          <MdTypography variant="body" size="large" prominent>
            Report Items
          </MdTypography>
          <div className="my-4">
            <CheckTree
              name="Events"
              options={eventReportItemOptions["Events"]}
              checkedItems={checkedReportItems["Events"] as string[]}
              onCheckedItemsChange={(items) => {
                setCheckedReportItems({
                  ...checkedReportItems,
                  Events: items,
                });
              }}
            />
          </div>
          <MdDialog
            open={isSaveDialogOpen}
            closed={() => {
              setIsSaveDialogOpen(false);
            }}
          >
            <div slot="headline">
              Are you sure you want to save the changes?
            </div>
            <div slot="content"></div>
            <div slot="actions">
              <MdOutlinedButton
                onClick={() => {
                  setIsSaveDialogOpen(false);
                }}
              >
                Cancel
              </MdOutlinedButton>
              <MdFilledButton onClick={handleSave}>Save</MdFilledButton>
            </div>
          </MdDialog>
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton onClick={handleReset}>Cancel</MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            setIsSaveDialogOpen(true);
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

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [initialCheckedServiceRouteItems, setInitialCheckedServiceRouteItems] =
    useState({
      Origin: faker.helpers.arrayElements(summaryServiceRouteOptions["Origin"]),
      Destination: faker.helpers.arrayElements(
        summaryServiceRouteOptions["Destination"]
      ),
    });
  const [checkedServiceRouteItems, setCheckedServiceRouteItems] = useState(
    initialCheckedServiceRouteItems
  );

  const [initialRadioOptions, setInitialRadioOptions] = useState({
    serviceType: "By Service Route",
    inquiryOption: "Shipper",
    typeOfSchedule: "All",
  });
  const [selectedRadioOption, setSelectedRadioOption] =
    useState(initialRadioOptions);

  function handleReset() {
    setCheckedServiceRouteItems(initialCheckedServiceRouteItems);
    setSelectedRadioOption(initialRadioOptions);
    props.onOpenChange(false);
  }

  function handleSave() {
    setInitialCheckedServiceRouteItems(checkedServiceRouteItems);
    setInitialRadioOptions(selectedRadioOption);
    props.onOpenChange(false);
    setIsSaveDialogOpen(false);
  }

  const [inputQuery, setInputQuery] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const tempContractNumbers = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.string.alphanumeric(10).toUpperCase()
    );
  }, []);

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-[960px]"
    >
      <div slot="headline">Vessel Schedule Updates</div>
      <div slot="content" className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex gap-6">
          <MdTypography variant="body" size="large" prominent>
            Service Type
          </MdTypography>
          <SimpleRadioGroup
            groupName="vessel-service-type"
            options={["By Service Route", "By Booking No. or Container No."]}
            selected={selectedRadioOption.serviceType}
            onChange={(option) => {
              setSelectedRadioOption({
                ...selectedRadioOption,
                serviceType: option,
              });
            }}
          />
        </div>
        {selectedRadioOption.serviceType ===
          "By Booking No. or Container No." && (
          <div
            className={cx(
              styles["inner-dialog-box"],
              "col-span-2 flex flex-col gap-4"
            )}
          >
            <MdTypography variant="body" size="large" prominent>
              By Booking No. or Container No.
            </MdTypography>
            <NAOutlinedTextField
              label="By Booking No. or Container No."
              value={inputQuery}
              handleValueChange={(value) => setInputQuery(value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputQuery && !chips.includes(inputQuery)) {
                    setChips((prev) => [...prev, inputQuery]);
                  }
                  setInputQuery("");
                }
              }}
            />
            <MdChipSet>
              {chips.map((chip) => (
                <MdInputChip
                  selected
                  key={chip}
                  label={chip}
                  remove={() => {
                    setChips((prev) => prev.filter((c) => c !== chip));
                  }}
                />
              ))}
            </MdChipSet>
          </div>
        )}
        <div className={cx(styles["inner-dialog-box"], "flex flex-col gap-5")}>
          {selectedRadioOption.serviceType === "By Service Route" && (
            <>
              <MdTypography variant="body" size="large" prominent>
                Inquiry Option
              </MdTypography>
              <SimpleRadioGroup
                groupName="vessel-inquiry-option"
                options={["Shipper", "Consignee", "Contract"]}
                selected={selectedRadioOption.inquiryOption}
                onChange={(option) => {
                  setSelectedRadioOption({
                    ...selectedRadioOption,
                    inquiryOption: option,
                  });
                }}
              />
              <ContractNumberSelector contracts={tempContractNumbers} />
            </>
          )}
          <MdTypography variant="body" size="large" prominent className="mt-4">
            Type of Schedule
          </MdTypography>
          <SimpleRadioGroup
            groupName="vessel-schedule-type"
            options={["All", "Arrival", "Departure"]}
            selected={selectedRadioOption.typeOfSchedule}
            onChange={(option) => {
              setSelectedRadioOption({
                ...selectedRadioOption,
                typeOfSchedule: option,
              });
            }}
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
                  checkedItems={
                    checkedServiceRouteItems[
                      key as keyof typeof checkedServiceRouteItems
                    ]
                  }
                  onCheckedItemsChange={(items) => {
                    setCheckedServiceRouteItems({
                      ...checkedServiceRouteItems,
                      [key]: items,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <MdDialog
          open={isSaveDialogOpen}
          closed={() => setIsSaveDialogOpen(false)}
        >
          <div slot="headline">Are you sure you want to save the changes?</div>
          <div slot="actions">
            <MdOutlinedButton onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </MdOutlinedButton>
            <MdFilledButton onClick={handleSave}>Save</MdFilledButton>
          </div>
        </MdDialog>
      </div>
      <div slot="actions">
        <MdOutlinedButton onClick={handleReset}>Cancel</MdOutlinedButton>
        <MdFilledButton onClick={() => setIsSaveDialogOpen(true)}>
          Save
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
