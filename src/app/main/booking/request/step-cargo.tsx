import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { MdSingleDatePicker } from "@/app/components/datepickers/date-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  CargoPickUpReturnState,
} from "@/app/store/booking-request.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";

import CommodityAutoComplete from "./commodity-search";
import { SubTitle } from "./components";

export default function CargoStep() {
  const [cargoPickUpReturnData, setCargoPickUpReturnData] = useRecoilState(
    CargoPickUpReturnState
  );
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);

  const ValidateRequired = useCallback(() => {
    if (
      cargoPickUpReturnData.commodity.code === "" ||
      cargoPickUpReturnData.commodity.description === "" ||
      cargoPickUpReturnData.grossWeight === "0.000"
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    cargoPickUpReturnData.commodity.code,
    cargoPickUpReturnData.commodity.description,
    cargoPickUpReturnData.grossWeight,
  ]);

  const moveToContainerStep = useCallback(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      cargoPickUpReturn: {
        ...prev.cargoPickUpReturn,
        isSelected: false,
      },
      container: {
        ...prev.container,
        isSelected: true,
      },
    }));
  }, [setBookingRequestStep]);

  useEffect(() => {
    if (ValidateRequired()) {
      setBookingRequestStep((prev) => ({
        ...prev,
        cargoPickUpReturn: {
          ...prev.cargoPickUpReturn,
          isCompleted: true,
        },
      }));
    } else {
      setBookingRequestStep((prev) => ({
        ...prev,
        cargoPickUpReturn: {
          ...prev.cargoPickUpReturn,
          isCompleted: false,
        },
      }));
    }
  }, [ValidateRequired, setBookingRequestStep]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Cargo & Pick Up/Return
      </MdTypography>
      <SubTitle title="Cargo" className="mb-4" />
      <div className="flex gap-4">
        <CommodityAutoComplete
          className="flex-1"
          required
          defaultSelection={cargoPickUpReturnData.commodity}
          onSelectionChange={(value) => {
            setCargoPickUpReturnData((prev) => {
              return { ...prev, commodity: value };
            });
          }}
        />
        <NAOutlinedTextField
          value={cargoPickUpReturnData.grossWeight}
          suffixText="KGS"
          className="flex-1"
          required
          onKeyDown={(e) => {
            //block non numeric input
            if (
              isNaN(Number(e.key)) &&
              e.key !== "Backspace" &&
              e.key !== "."
            ) {
              e.preventDefault();
            }
          }}
          onBlur={(e) => {
            const numbericData = Number(e.currentTarget.value);
            if (isNaN(numbericData)) {
              e.currentTarget.value = "0.000";
              setCargoPickUpReturnData((prev) => {
                return { ...prev, grossWeight: "0.000" };
              });
            } else {
              setCargoPickUpReturnData((prev) => {
                return { ...prev, grossWeight: numbericData.toFixed(3) };
              });
            }
          }}
        />
      </div>
      <SubTitle title="Container Pick Up/Return Place" className="mt-6 mb-4" />
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <MdSingleDatePicker
            className="flex-1"
            label="Empty Pick Up Date"
            defaultDate={cargoPickUpReturnData.emptyPickUpDate}
            handleDateChange={(date) => {
              setCargoPickUpReturnData((prev) => {
                return { ...prev, emptyPickUpDate: date };
              });
            }}
          />
          <div className="flex-1">
            <MdOutlinedTextField
              type="time"
              value={cargoPickUpReturnData.emptyPickUpDate?.toFormat("HH:mm")}
              onInput={(e) => {
                const date = cargoPickUpReturnData.emptyPickUpDate;
                const time = e.currentTarget.value;
                const hour = Number(time.split(":")[0]);
                const minute = Number(time.split(":")[1]);
                setCargoPickUpReturnData((prev) => {
                  return {
                    ...prev,
                    emptyPickUpDate: date.set({ hour, minute }),
                  };
                });
              }}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <MdOutlinedTextField
            className="flex-1"
            label="Empty Pick Up CY/Depot"
            placeholder="Empty Pick Up CY/Depot (Prefered)"
            value={cargoPickUpReturnData.emptyPickUpLocation.yardName}
            onInput={(e) => {
              setCargoPickUpReturnData((prev) => {
                return {
                  ...prev,
                  emptyPickUpLocation: {
                    ...prev.emptyPickUpLocation,
                    yardName: e.currentTarget.value,
                  },
                };
              });
            }}
          />
          <div className="flex-1 flex gap-4">
            <MdOutlinedTextField
              disabled
              label="Code"
              className="flex-1"
              value={cargoPickUpReturnData.emptyPickUpLocation.code}
              onInput={(e) => {
                setCargoPickUpReturnData((prev) => {
                  return {
                    ...prev,
                    emptyPickUpLocation: {
                      ...prev.emptyPickUpLocation,
                      code: e.currentTarget.value,
                    },
                  };
                });
              }}
            />

            <MdOutlinedTextField
              disabled
              label="Address"
              className="flex-1"
              value={cargoPickUpReturnData.emptyPickUpLocation.address}
              onInput={(e) => {
                setCargoPickUpReturnData((prev) => {
                  return {
                    ...prev,
                    emptyPickUpLocation: {
                      ...prev.emptyPickUpLocation,
                      address: e.currentTarget.value,
                    },
                  };
                });
              }}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <MdSingleDatePicker
            className="flex-1"
            label="Full Cargo Return Date"
            defaultDate={cargoPickUpReturnData.fullReturnDate}
            handleDateChange={(date) => {
              setCargoPickUpReturnData((prev) => {
                return { ...prev, fullReturnDate: date };
              });
            }}
          />
          <div className="flex-1"></div>
        </div>
        <div className="flex gap-4">
          <MdOutlinedTextField
            className="flex-1"
            label="Full Container Return CY"
            value={cargoPickUpReturnData.fullReturnLocation.yardName}
            onInput={(e) => {
              setCargoPickUpReturnData((prev) => {
                return {
                  ...prev,
                  fullReturnLocation: {
                    ...prev.fullReturnLocation,
                    yardName: e.currentTarget.value,
                  },
                };
              });
            }}
          />
          <div className="flex-1 flex gap-4">
            <MdOutlinedTextField
              disabled
              label="Code"
              className="flex-1"
              value={cargoPickUpReturnData.fullReturnLocation.code}
              onInput={(e) => {
                setCargoPickUpReturnData((prev) => {
                  return {
                    ...prev,
                    fullReturnLocation: {
                      ...prev.fullReturnLocation,
                      code: e.currentTarget.value,
                    },
                  };
                });
              }}
            />
            <MdOutlinedTextField
              disabled
              label="Address"
              className="flex-1"
              value={cargoPickUpReturnData.fullReturnLocation.address}
              onInput={(e) => {
                setCargoPickUpReturnData((prev) => {
                  return {
                    ...prev,
                    fullReturnLocation: {
                      ...prev.fullReturnLocation,
                      address: e.currentTarget.value,
                    },
                  };
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
