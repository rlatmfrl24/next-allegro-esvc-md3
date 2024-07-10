import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  CargoPickUpReturnState,
} from "@/app/store/booking.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import { CommodityType } from "@/app/util/typeDef/booking";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";

import { SubTitle } from "@/app/components/title-components";
import { useSearchParams } from "next/navigation";
import { QuotationTermsState } from "@/app/store/pricing.store";
import { DatePicker } from "@/app/components/datepickers/date-picker";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import { getWeightText } from "@/app/main/tracking/cargo/util";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

export default function CargoStep() {
  const [cargoPickUpReturnData, setCargoPickUpReturnData] = useRecoilState(
    CargoPickUpReturnState
  );
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  // const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
  //   BookingRequestStepState
  // );

  const moveToContainerStep = useCallback(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      cargoPickUpReturn: {
        ...prev.cargoPickUpReturn,
        isSelected: false,
        visited: true,
      },
      container: {
        ...prev.container,
        isSelected: true,
      },
    }));
  }, [setBookingRequestStep]);

  const tempCommodities = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      description: faker.commerce.productName(),
      code: faker.string.numeric(7),
    }));
  }, []);

  // use Quotation Data
  const params = useSearchParams();
  const quotationTerms = useRecoilValue(QuotationTermsState);

  useEffect(() => {
    if (params.has("quoteNumber")) {
      setCargoPickUpReturnData((prev) => ({
        ...prev,
        commodity: {
          code: "-",
          description: "FAK (Freight of All Kinds)",
        },
        grossWeight: getWeightText(quotationTerms?.grossWeight || 0),
        grossWeightUnit: quotationTerms?.weightUnit || "KGS",
      }));
    }
  }, [quotationTerms, params, setCargoPickUpReturnData]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Cargo & Pick Up/Return
      </MdTypography>
      <SubTitle title="Cargo" className="mb-4" />
      <div className="flex gap-4">
        <NAMultiAutoComplete
          label="Commodity"
          initialValue={cargoPickUpReturnData.commodity}
          isAllowOnlyListItems={false}
          showAllonFocus={true}
          itemList={tempCommodities}
          readOnly={params.has("quoteNumber")}
          onQueryChange={(query) => {
            setCargoPickUpReturnData((prev) => {
              return {
                ...prev,
                commodity: {
                  code: "-",
                  description: query,
                },
              };
            });
          }}
          onItemSelection={(value) => {
            setCargoPickUpReturnData((prev) => {
              return { ...prev, commodity: value as CommodityType };
            });
          }}
        />

        <NAOutlinedNumberField
          value={cargoPickUpReturnData.grossWeight}
          className="h-fit"
          label="Gross Weight"
          maxInputLength={9}
          readOnly={params.has("quoteNumber")}
          handleValueChange={(value) => {
            setCargoPickUpReturnData((prev) => {
              return {
                ...prev,
                // grossWeight: intValue > 999999999 ? "999999999" : value,
                grossWeight: value?.toLocaleString() ?? "0",
              };
            });
          }}
        />
        <NAOutlinedListBox
          className="w-32"
          readOnly={params.has("quoteNumber")}
          initialValue={cargoPickUpReturnData.grossWeightUnit}
          options={["KGS", "LBS"]}
          onSelection={(value) => {
            setCargoPickUpReturnData((prev) => {
              return { ...prev, grossWeightUnit: value as "KGS" | "LBS" };
            });
          }}
        />
      </div>
      <SubTitle title="Container Pick Up/Return Place" className="mt-6 mb-4" />
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <DatePicker
            className="flex-1"
            label="Empty Pick Up Date"
            initialDate={cargoPickUpReturnData.emptyPickUpDate}
            onDateChange={(date) => {
              setCargoPickUpReturnData((prev) => {
                return { ...prev, emptyPickUpDate: date };
              });
            }}
          />

          <div className="flex-1">
            <MdOutlinedTextField
              type="time"
              value={
                cargoPickUpReturnData.emptyPickUpDate?.toFormat("HH:mm") || ""
              }
              onInput={(e) => {
                const date = cargoPickUpReturnData.emptyPickUpDate;
                const time = e.currentTarget.value;
                const hour = Number(time.split(":")[0]);
                const minute = Number(time.split(":")[1]);
                date &&
                  setCargoPickUpReturnData((prev) => {
                    return {
                      ...prev,
                      emptyPickUpDate: date.set({ hour, minute }),
                    };

                    // return {
                    //   ...prev,
                    //   emptyPickUpDate: date.set({ hour, minute }),
                    // };
                  });
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-end justify-end">
        <MdFilledButton onClick={() => moveToContainerStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
