import { DateTime } from "luxon";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

import { MdSingleDatePicker } from "@/app/components/datepickers/old/date-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { QuotationTermsState } from "@/app/store/pricing.store";
import styles from "@/app/styles/base.module.css";
import {
  MdFilledButton,
  MdFilledTonalIconButton,
  MdIcon,
  MdIconButton,
  MdTextButton,
} from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { Add, DeleteOutline, PlaceOutlined } from "@mui/icons-material";

import { createDummyPlaceInformation } from "../../schedule/util";
import { QuotationContainerType } from "@/app/util/typeDef/pricing";
import { DatePicker } from "@/app/components/datepickers/date-picker";

export default function Condition({
  onReset,
  onSearch,
}: {
  onSearch: () => void;
  onReset: () => void;
}) {
  const tempPorts = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      return createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      );
    });
  }, []);

  const defaultContainerTypeOptions = Object.values(QuotationContainerType);
  const [quotationTerms, setQuotationTerms] =
    useRecoilState(QuotationTermsState);

  const selectableContainerTypeOptions = useMemo(() => {
    // Remove already selected container types
    return defaultContainerTypeOptions.filter(
      (containerType) =>
        !quotationTerms.containers.some(
          (container) => container.containerType === containerType
        )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotationTerms.containers]);

  return (
    <div className={styles.area}>
      <SubTitle title="Route " />
      <div className="flex gap-4">
        <NAOutlinedAutoComplete
          label="Origin"
          required
          className="flex-1"
          icon={<PlaceOutlined />}
          initialValue={quotationTerms.origin?.yardName || ""}
          itemList={tempPorts.map((name) => name.yardName)}
          onItemSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              origin: tempPorts.find((port) => port.yardName === item)!,
            }));
          }}
        />
        <NAOutlinedListBox
          label="Service Term"
          className="w-40"
          initialValue={quotationTerms.originServiceTerm}
          options={["CY", "Door"]}
          onSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              originServiceTerm: item as "CY" | "Door",
            }));
          }}
        />
        <NAOutlinedAutoComplete
          label="Port of Loading"
          disabled={!quotationTerms.origin?.yardName}
          itemList={tempPorts.map((name) => name.yardName)}
          initialValue={quotationTerms.pol?.yardName || ""}
          onItemSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              pol: tempPorts.find((port) => port.yardName === item)!,
            }));
          }}
        />
      </div>
      <div className="flex gap-4">
        <NAOutlinedAutoComplete
          label="Destination"
          required
          className="flex-1"
          icon={<PlaceOutlined />}
          itemList={tempPorts.map((name) => name.yardName)}
          initialValue={quotationTerms.destination?.yardName || ""}
          onItemSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              destination: tempPorts.find((port) => port.yardName === item)!,
            }));
          }}
        />
        <NAOutlinedListBox
          label="Service Term"
          className="w-40"
          options={["CY", "Door"]}
          initialValue={quotationTerms.destinationServiceTerm}
          onSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              destinationServiceTerm: item as "CY" | "Door",
            }));
          }}
        />
        <NAOutlinedAutoComplete
          label="Port of Discharge"
          disabled={!quotationTerms.destination?.yardName}
          itemList={tempPorts.map((name) => name.yardName)}
          initialValue={quotationTerms.pod?.yardName || ""}
          onItemSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              pod: tempPorts.find((port) => port.yardName === item)!,
            }));
          }}
        />
      </div>
      <DatePicker
        className="w-fit"
        label="Departure Date"
        initialDate={quotationTerms.departureDate}
        disablePast
        onDateChange={(date) => {
          date &&
            setQuotationTerms((prev) => ({ ...prev, departureDate: date }));
        }}
      />

      <SubTitle title="Cargo" className="mt-4" />
      <div className="flex">
        <NAOutlinedTextField
          required
          value="FAK (Freight All Kinds)"
          readOnly
          className="mr-4 w-96"
        />
        <NAOutlinedTextField
          type="number"
          required
          className="mr-2"
          label="Total Estimated Gross Weight"
          value={quotationTerms.grossWeight.toString()}
          handleValueChange={(value) => {
            setQuotationTerms((prev) => ({
              ...prev,
              grossWeight: parseFloat(value),
            }));
          }}
        />
        <NAOutlinedListBox
          options={["KGS", "LBS"]}
          className="w-40"
          initialValue={quotationTerms.weightUnit}
          onSelection={(item) => {
            setQuotationTerms((prev) => ({
              ...prev,
              weightUnit: item as "KGS" | "LBS",
            }));
          }}
        />
      </div>
      <SubTitle title="Container" className="mt-4" />
      <div className="flex gap-4">
        <MdFilledTonalIconButton
          className="mt-2"
          disabled={
            quotationTerms.containers.length ===
            defaultContainerTypeOptions.length
          }
          onClick={() => {
            setQuotationTerms((prev) => ({
              ...prev,
              containers: [
                ...prev.containers,
                {
                  containerType: selectableContainerTypeOptions[0],
                  quantity: 0,
                },
              ],
            }));
          }}
        >
          <MdIcon>
            <Add />
          </MdIcon>
        </MdFilledTonalIconButton>
        <div className="flex flex-col gap-4">
          {quotationTerms.containers.map((container, index) => (
            <div key={index} className="flex gap-2">
              <NAOutlinedListBox
                initialValue={container.containerType}
                label="Size"
                options={[
                  container.containerType,
                  ...selectableContainerTypeOptions,
                ]}
                onSelection={(item) => {
                  const selection = item as QuotationContainerType;

                  setQuotationTerms((prev) => {
                    return {
                      ...prev,
                      containers: [
                        ...prev.containers.slice(0, index),
                        {
                          containerType: selection,
                          quantity: container.quantity,
                        },
                        ...prev.containers.slice(index + 1),
                      ],
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                type="number"
                label="Quantity / Total"
                value={container.quantity.toString()}
                handleValueChange={(value) => {
                  setQuotationTerms((prev) => {
                    return {
                      ...prev,
                      containers: [
                        ...prev.containers.slice(0, index),
                        {
                          containerType: container.containerType,
                          quantity: parseInt(value),
                        },
                        ...prev.containers.slice(index + 1),
                      ],
                    };
                  });
                }}
              />
              <MdIconButton
                className="mt-2"
                onClick={() => {
                  setQuotationTerms((prev) => {
                    return {
                      ...prev,
                      containers: [
                        ...prev.containers.slice(0, index),
                        ...prev.containers.slice(index + 1),
                      ],
                    };
                  });
                }}
              >
                <MdIcon>
                  <DeleteOutline />
                </MdIcon>
              </MdIconButton>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <MdTextButton
          onClick={() => {
            setQuotationTerms({
              origin: {} as PlaceInformationType,
              destination: {} as PlaceInformationType,
              originServiceTerm: "CY",
              destinationServiceTerm: "CY",
              pol: {} as PlaceInformationType,
              pod: {} as PlaceInformationType,
              departureDate: DateTime.now(),
              grossWeight: 0,
              weightUnit: "KGS",
              containers: [],
            });
            onReset();
          }}
        >
          Reset
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            console.log(quotationTerms);
            onSearch();
          }}
        >
          Quotation Request
        </MdFilledButton>
      </div>
    </div>
  );
}
