"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";

import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedMultiListBox from "@/app/components/na-multi-listbox";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import PageTitle, { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import {
  MdCheckbox,
  MdChipSet,
  MdFilledButton,
  MdInputChip,
  MdOutlinedButton,
  MdRadio,
  MdSwitch,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import {
  routeInformationOptions,
  bookingInformationOptions,
  chargeInformationOptions,
  inboundInformationOptions,
} from "./util";
import SubIndicator from "@/../public/icon_subsum_indicator.svg";
import { difference, isEqual } from "lodash";
import { BottomFloatingBar } from "@/app/components/bottom-floating-bar";
import classNames from "classnames";
import { ContractNumberSelector } from "@/app/components/update-contract-number";

export default function CreateNewReport() {
  const cx = classNames.bind(styles);
  const router = useRouter();
  const tempPorts = useMemo(() => {
    return Array.from(
      { length: 50 },
      () => faker.location.city() + ", " + faker.location.country()
    );
  }, []);
  const [infoType, setInfoType] = useState<"customer" | "contract">("customer");
  const [getServices, setGetServices] = useState<boolean>(false);
  const [reportName, setReportName] = useState<string>("");
  const [isSaveBarOpen, setIsSaveBarOpen] = useState<boolean>(false);
  const [origins, setOrigins] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [bookingInformation, setBookingInformation] = useState<string[]>([]);
  const [routeInformation, setRouteInformation] = useState<string[]>([]);
  const [chargeInformation, setChargeInformation] = useState<string[]>([]);
  const [inboundInformation, setInboundInformation] = useState<string[]>([]);
  const tempContracts = useMemo(() => {
    return Array.from({ length: 50 }, () =>
      faker.string.alphanumeric(11).toUpperCase()
    );
  }, []);

  useEffect(() => {
    if (
      (bookingInformation.length > 0 ||
        routeInformation.length > 0 ||
        chargeInformation.length > 0 ||
        inboundInformation.length > 0) &&
      reportName.length > 0
    ) {
      setIsSaveBarOpen(true);
    } else {
      setIsSaveBarOpen(false);
    }
  }, [
    reportName.length,
    bookingInformation.length,
    chargeInformation.length,
    inboundInformation.length,
    routeInformation.length,
  ]);

  return (
    <div aria-label="container" className={cx(styles.container)}>
      <div className="flex justify-between items-center">
        <PageTitle title="Create New Report" hasFavorite={false} />
        <MdOutlinedButton
          onClick={() => {
            router.push("/main/shipment/my-report");
          }}
        >
          Cancel
        </MdOutlinedButton>
      </div>
      <div className={cx(styles.area, "mb-12")}>
        <DetailTitle title="Report General Information" />
        <div className="grid grid-cols-2 gap-4">
          <NAOutlinedTextField
            label="Report Name"
            value={reportName}
            required
            handleValueChange={(value) => {
              setReportName(value);
            }}
          />
          <div className="flex items-center gap-4">
            <MdTypography tag="label" variant="title" size="small">
              <MdRadio
                name="info-type"
                className="mr-2"
                checked={infoType === "customer"}
                onClick={() => {
                  setInfoType("customer");
                }}
              />
              By Customer
            </MdTypography>
            <MdTypography tag="label" variant="title" size="small">
              <MdRadio
                name="info-type"
                className="mr-2"
                checked={infoType === "contract"}
                onClick={() => {
                  setInfoType("contract");
                }}
              />
              By Contract
            </MdTypography>
            {infoType === "customer" ? (
              <NAOutlinedMultiListBox
                label="By Customer"
                options={[
                  "Shipper",
                  "Consignee",
                  "Notify",
                  "Forwarder",
                  "Also Notify",
                ]}
                unit="Customer"
              />
            ) : (
              <>
                <ContractNumberSelector contracts={tempContracts} />
              </>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <NAOutlinedAutoComplete
              itemList={tempPorts}
              label="Port of Loading"
              className="flex-1"
              removeQueryOnSelect
              onItemSelection={(item) => {
                setOrigins([...origins, item]);
              }}
            />
            <MdChipSet>
              {origins.map((origin) => (
                <div key={origin}>
                  <MdInputChip
                    label={origin}
                    selected
                    remove={() => {
                      setOrigins(origins.filter((q) => q !== origin));
                    }}
                  />
                </div>
              ))}
            </MdChipSet>
          </div>
          <div className="flex flex-col gap-2">
            <NAOutlinedAutoComplete
              itemList={tempPorts}
              label="Port of Discharging"
              className="flex-1"
              removeQueryOnSelect
              onItemSelection={(item) => {
                setDestinations([...destinations, item]);
              }}
            />
            <MdChipSet>
              {destinations.map((destination) => (
                <div key={destination}>
                  <MdInputChip
                    label={destination}
                    selected
                    remove={() => {
                      setDestinations(
                        destinations.filter((item) => item !== destination)
                      );
                    }}
                  />
                </div>
              ))}
            </MdChipSet>
          </div>
        </div>
        <DetailTitle title="Email Service" className="mt-4" />
        <div className="flex items-center gap-2 h-20">
          <MdTypography variant="label" size="medium" className="text-outline">
            Get service
          </MdTypography>
          <MdSwitch
            className="mr-4"
            selected={getServices}
            onClick={() => {
              setGetServices(!getServices);
            }}
          />
          {getServices && (
            <>
              <NAOutlinedListBox
                label="Search Period"
                options={Array.from({ length: 8 }, (_, i) => i + 1).map(
                  (i) => i + " Week" + (i > 1 ? "s" : "")
                )}
              />
              <NAOutlinedListBox
                label="Sending Cycle"
                options={["Daily", "Weekly", "Monthly"]}
              />
            </>
          )}
        </div>
        <DetailTitle title="Report Composition" className="mt-2" required />
        <div className="border border-outlineVariant rounded-lg p-6 flex">
          <div className="flex-1 flex-col">
            <MdTextButton
              onClick={() => {
                setBookingInformation(
                  bookingInformation.length === bookingInformationOptions.length
                    ? []
                    : bookingInformationOptions
                );
              }}
            >
              <MdCheckbox
                className="mr-2"
                checked={
                  difference(bookingInformationOptions, bookingInformation)
                    .length === 0
                }
                indeterminate={
                  bookingInformation.length > 0 &&
                  bookingInformation.length < bookingInformationOptions.length
                }
              />
              Booking Information
            </MdTextButton>
            {bookingInformationOptions.map((option) => (
              <div key={option} className="flex gap-2 items-center pl-4">
                <SubIndicator />
                <MdTextButton
                  onClick={() => {
                    if (bookingInformation.includes(option)) {
                      setBookingInformation(
                        bookingInformation.filter((item) => item !== option)
                      );
                    } else {
                      setBookingInformation([...bookingInformation, option]);
                    }
                  }}
                >
                  <MdCheckbox
                    className="mr-2"
                    checked={bookingInformation.includes(option)}
                  />
                  {option}
                </MdTextButton>
              </div>
            ))}
          </div>
          <div className="flex-1 flex-col">
            <MdTextButton
              onClick={() => {
                setRouteInformation(
                  routeInformation.length === routeInformationOptions.length
                    ? []
                    : routeInformationOptions
                );
              }}
            >
              <MdCheckbox
                className="mr-2"
                checked={
                  difference(routeInformationOptions, routeInformation)
                    .length === 0
                }
                indeterminate={
                  routeInformation.length > 0 &&
                  routeInformation.length < routeInformationOptions.length
                }
              />
              Route Information
            </MdTextButton>
            {routeInformationOptions.map((option) => (
              <div key={option} className="flex gap-2 items-center pl-4">
                <SubIndicator />
                <MdTextButton
                  onClick={() => {
                    if (routeInformation.includes(option)) {
                      setRouteInformation(
                        routeInformation.filter((item) => item !== option)
                      );
                    } else {
                      setRouteInformation([...routeInformation, option]);
                    }
                  }}
                >
                  <MdCheckbox
                    className="mr-2"
                    checked={routeInformation.includes(option)}
                  />
                  {option}
                </MdTextButton>
              </div>
            ))}
          </div>
          <div className="flex-1 flex-col">
            <MdTextButton
              onClick={() => {
                setChargeInformation(
                  chargeInformation.length === chargeInformationOptions.length
                    ? []
                    : chargeInformationOptions
                );
              }}
            >
              <MdCheckbox
                className="mr-2"
                checked={
                  difference(chargeInformationOptions, chargeInformation)
                    .length === 0
                }
                indeterminate={
                  chargeInformation.length > 0 &&
                  chargeInformation.length < chargeInformationOptions.length
                }
              />
              Charge Information
            </MdTextButton>
            {chargeInformationOptions.map((option) => (
              <div key={option} className="flex gap-2 items-center pl-4">
                <SubIndicator />
                <MdTextButton
                  onClick={() => {
                    if (chargeInformation.includes(option)) {
                      setChargeInformation(
                        chargeInformation.filter((item) => item !== option)
                      );
                    } else {
                      setChargeInformation([...chargeInformation, option]);
                    }
                  }}
                >
                  <MdCheckbox
                    className="mr-2"
                    checked={chargeInformation.includes(option)}
                  />
                  {option}
                </MdTextButton>
              </div>
            ))}
          </div>
          <div className="flex-1 flex-col">
            <MdTextButton
              onClick={() => {
                setInboundInformation(
                  inboundInformation.length === inboundInformationOptions.length
                    ? []
                    : inboundInformationOptions
                );
              }}
            >
              <MdCheckbox
                className="mr-2"
                checked={isEqual(inboundInformation, inboundInformationOptions)}
                indeterminate={
                  inboundInformation.length > 0 &&
                  inboundInformation.length < inboundInformationOptions.length
                }
              />
              Inbound Information
            </MdTextButton>
            {inboundInformationOptions.map((option) => (
              <div key={option} className="flex gap-2 items-center pl-4">
                <SubIndicator />
                <MdTextButton
                  onClick={() => {
                    if (inboundInformation.includes(option)) {
                      setInboundInformation(
                        inboundInformation.filter((item) => item !== option)
                      );
                    } else {
                      setInboundInformation([...inboundInformation, option]);
                    }
                  }}
                >
                  <MdCheckbox
                    className="mr-2"
                    checked={inboundInformation.includes(option)}
                  />
                  {option}
                </MdTextButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomFloatingBar open={isSaveBarOpen} onOpenChange={setIsSaveBarOpen}>
        <MdFilledButton
          onClick={() => {
            setIsSaveBarOpen(false);
            router.push("/main/shipment/my-report");
          }}
        >
          Save
        </MdFilledButton>
      </BottomFloatingBar>
    </div>
  );
}
