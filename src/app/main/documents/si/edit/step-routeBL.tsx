import { DividerComponent } from "@/app/components/divider";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import { SIEditRouteBLState, SIEditStepState } from "@/app/store/si.store";
import {
  MdCheckbox,
  MdFilledButton,
  MdIcon,
  MdOutlinedTextField,
  MdRadio,
} from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { PlaceOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function StepRouteBL() {
  const [routeBLStore, setRouteBLStore] = useRecoilState(SIEditRouteBLState);
  // const setSIEditStep = useSetRecoilState(SIEditStepState);
  const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);

  const moveToContainerStep = useCallback(() => {
    setSIEditStep((prev) => {
      return {
        ...prev,
        routeBL: {
          ...prev.routeBL,
          isSelected: false,
          visited: true,
        },
        container: {
          ...prev.container,
          isSelected: true,
        },
      };
    });
  }, [setSIEditStep]);

  const ValidateRequired = useMemo(() => {
    return (
      !!routeBLStore.vesselVoyage &&
      !!routeBLStore.serviceTypeFrom &&
      !!routeBLStore.serviceTypeTo
    );
  }, [
    routeBLStore.vesselVoyage,
    routeBLStore.serviceTypeFrom,
    routeBLStore.serviceTypeTo,
  ]);

  useEffect(() => {
    setSIEditStep((prev) => {
      return {
        ...prev,
        routeBL: {
          ...prev.routeBL,
          isCompleted: ValidateRequired,
        },
      };
    });
  }, [ValidateRequired, setSIEditStep]);

  const tempPortList = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      return createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      );
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <MdTypography variant="title" size="large" className="mb-6">
        Route & BL Information
      </MdTypography>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
        <NAOutlinedTextField
          required
          error={SIEditStep.routeBL.visited && !routeBLStore.vesselVoyage}
          errorText="Vessel Voyage is required"
          label="Vessel Voy(Flag)"
          maxInputLength={30}
          value={routeBLStore.vesselVoyage || ""}
          handleValueChange={(value) =>
            setRouteBLStore((prev) => ({ ...prev, vesselVoyage: value }))
          }
        />
        <NAOutlinedTextField
          label="Pre-Carriage By"
          maxInputLength={30}
          value={routeBLStore.preCarriageBy || ""}
          handleValueChange={(value) =>
            setRouteBLStore((prev) => ({ ...prev, preCarriageBy: value }))
          }
        />
        <div></div>

        <NAOutlinedTextField
          readOnly
          hasLeadingIcon
          label="Pier or Place of Receipt"
          value={routeBLStore.por?.yardName || ""}
        >
          <MdIcon slot="leading-icon">
            <PlaceOutlined />
          </MdIcon>
        </NAOutlinedTextField>

        <NAOutlinedTextField
          readOnly
          hasLeadingIcon
          label="Port of Loading"
          value={routeBLStore.pol?.yardName || ""}
        >
          <MdIcon slot="leading-icon">
            <PlaceOutlined />
          </MdIcon>
        </NAOutlinedTextField>

        <div></div>
        <NAOutlinedTextField
          readOnly
          hasLeadingIcon
          label="Port of Discharging"
          value={routeBLStore.pod?.yardName || ""}
        >
          <MdIcon slot="leading-icon">
            <PlaceOutlined />
          </MdIcon>
        </NAOutlinedTextField>

        <NAOutlinedTextField
          readOnly
          hasLeadingIcon
          label="Place of Delivery (By On Carrier)"
          value={routeBLStore.del?.yardName || ""}
        >
          <MdIcon slot="leading-icon">
            <PlaceOutlined />
          </MdIcon>
        </NAOutlinedTextField>

        <div></div>
        <div className="col-span-3">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2 cursor-pointer w-fit"
          >
            <MdCheckbox
              checked={routeBLStore.isUsingRoutePrint}
              // onClick={() => setIsUsingRouteInput((prev) => !prev)}
              onClick={() =>
                setRouteBLStore((prev) => ({
                  ...prev,
                  isUsingRoutePrint: !prev.isUsingRoutePrint,
                }))
              }
            />
            Printed on the B/L
          </MdTypography>
        </div>
        {routeBLStore.isUsingRoutePrint && (
          <>
            <NAOutlinedAutoComplete
              icon={<PlaceOutlined />}
              label="Pier or Place of Receipt"
              isAllowOnlyListItems={false}
              maxInputLength={25}
              itemList={tempPortList.map((item) => item.yardName)}
              initialValue={routeBLStore.routePrint.por || ""}
              onQueryChange={(value) => {
                if (value) {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      por: value,
                    },
                  }));
                }
              }}
              onItemSelection={(value) => {
                setRouteBLStore((prev) => ({
                  ...prev,
                  routePrint: {
                    ...prev.routePrint,
                    por: value,
                  },
                }));
              }}
            />
            <NAOutlinedAutoComplete
              icon={<PlaceOutlined />}
              label="Port of Loading"
              maxInputLength={25}
              initialValue={routeBLStore.routePrint.pol || ""}
              isAllowOnlyListItems={false}
              itemList={tempPortList.map((item) => item.yardName)}
              onQueryChange={(value) => {
                if (value) {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      pol: value,
                    },
                  }));
                }
              }}
              onItemSelection={(value) => {
                setRouteBLStore((prev) => ({
                  ...prev,
                  routePrint: {
                    ...prev.routePrint,
                    pol: value,
                  },
                }));
              }}
            />
            <NaToggleButton
              className="h-fit mt-3"
              label="Same as Place of Receipt"
              state={
                routeBLStore.routePrint.por === undefined ||
                routeBLStore.routePrint.por === ""
                  ? "disabled"
                  : routeBLStore.routePrint.por === routeBLStore.routePrint.pol
                  ? "checked"
                  : "unchecked"
              }
              onClick={(isChecked) => {
                if (isChecked) {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      pol: prev.pol.yardName,
                    },
                  }));
                } else {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      pol: prev.routePrint.por,
                    },
                  }));
                }
              }}
            />
            <NAOutlinedAutoComplete
              icon={<PlaceOutlined />}
              label="Port of Discharging"
              maxInputLength={25}
              itemList={tempPortList.map((item) => item.yardName)}
              initialValue={routeBLStore.routePrint.pod || ""}
              isAllowOnlyListItems={false}
              onQueryChange={(value) => {
                if (value) {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      pod: value,
                    },
                  }));
                }
              }}
              onItemSelection={(value) => {
                setRouteBLStore((prev) => ({
                  ...prev,
                  routePrint: {
                    ...prev.routePrint,
                    pod: value,
                  },
                }));
              }}
            />
            <NAOutlinedAutoComplete
              icon={<PlaceOutlined />}
              maxInputLength={25}
              label="Place of Delivery (By On Carrier)"
              itemList={tempPortList.map((item) => item.yardName)}
              initialValue={routeBLStore.routePrint.del || ""}
              isAllowOnlyListItems={false}
              onQueryChange={(value) => {
                if (value) {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      del: value,
                    },
                  }));
                }
              }}
              onItemSelection={(value) => {
                setRouteBLStore((prev) => ({
                  ...prev,
                  routePrint: {
                    ...prev.routePrint,
                    del: value,
                  },
                }));
              }}
            />
            <NaToggleButton
              className="h-fit mt-3"
              label="Same as Place of Discharging"
              state={
                routeBLStore.routePrint.pod === undefined ||
                routeBLStore.routePrint.pod === ""
                  ? "disabled"
                  : routeBLStore.routePrint.pod === routeBLStore.routePrint.del
                  ? "checked"
                  : "unchecked"
              }
              onClick={(isChecked) => {
                if (isChecked) {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      del: prev.del.yardName,
                    },
                  }));
                } else {
                  setRouteBLStore((prev) => ({
                    ...prev,
                    routePrint: {
                      ...prev.routePrint,
                      del: prev.routePrint.pod,
                    },
                  }));
                }
              }}
            />
          </>
        )}
        <NAOutlinedTextField
          label="Point and Country of Origin"
          maxInputLength={32}
          value={routeBLStore.pointAndCountryOfOrigin || ""}
          handleValueChange={(value) =>
            setRouteBLStore((prev) => ({
              ...prev,
              pointAndCountryOfOrigin: value,
            }))
          }
        />
        <NAOutlinedTextField
          label="Final Destination"
          maxInputLength={30}
          value={routeBLStore.finalDestination || ""}
          handleValueChange={(value) =>
            setRouteBLStore((prev) => ({
              ...prev,
              finalDestination: value,
            }))
          }
        />
        <div></div>
        <div className="flex gap-2">
          <NAOutlinedListBox
            required
            error={SIEditStep.routeBL.visited && !routeBLStore.serviceTypeFrom}
            errorText="Service Type is required"
            options={["CY", "Door"]}
            initialValue={
              routeBLStore.serviceTypeFrom === "cy"
                ? "CY"
                : routeBLStore.serviceTypeFrom === "door"
                ? "Door"
                : ""
            }
            label="Service Type"
            onSelection={(value) =>
              setRouteBLStore((prev) => ({
                ...prev,
                serviceTypeFrom: value.toLowerCase() as "cy" | "door",
              }))
            }
          />
          <NAOutlinedListBox
            required
            error={SIEditStep.routeBL.visited && !routeBLStore.serviceTypeTo}
            errorText="Service Type is required"
            options={["CY", "Door"]}
            initialValue={
              routeBLStore.serviceTypeTo === "cy"
                ? "CY"
                : routeBLStore.serviceTypeTo === "door"
                ? "Door"
                : ""
            }
            label="Service Type"
            onSelection={(value) =>
              setRouteBLStore((prev) => ({
                ...prev,
                serviceTypeTo: value.toLowerCase() as "cy" | "door",
              }))
            }
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DetailTitle title="BL Type" />
          <DividerComponent className="flex-1" />
        </div>
        <form className="flex gap-9">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2"
            onClick={() =>
              setRouteBLStore((prev) => ({ ...prev, blType: "originalBL" }))
            }
          >
            <MdRadio
              name="blType"
              checked={routeBLStore.blType === "originalBL"}
            />
            Original B/L
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2"
            onClick={() =>
              setRouteBLStore((prev) => ({ ...prev, blType: "surrender" }))
            }
          >
            <MdRadio
              name="blType"
              checked={routeBLStore.blType === "surrender"}
            />
            B/L Surrender
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2"
            onClick={() =>
              setRouteBLStore((prev) => ({ ...prev, blType: "seaWaybill" }))
            }
          >
            <MdRadio
              name="blType"
              checked={routeBLStore.blType === "seaWaybill"}
            />
            Sea Waybill
          </MdTypography>
        </form>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DetailTitle title="Freight Terms" />
          <DividerComponent className="flex-1" />
        </div>
        <form className="flex gap-9">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2 "
            onClick={() =>
              setRouteBLStore((prev) => ({
                ...prev,
                freightTerms: "prepaid",
              }))
            }
          >
            <MdRadio
              name="freightTerms"
              checked={routeBLStore.freightTerms === "prepaid"}
            />
            Prepaid
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2"
            onClick={() =>
              setRouteBLStore((prev) => ({
                ...prev,
                freightTerms: "collect",
              }))
            }
          >
            <MdRadio
              name="freightTerms"
              checked={routeBLStore.freightTerms === "collect"}
            />
            Collect
          </MdTypography>
        </form>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DetailTitle title="House B/L Involve" />
          <DividerComponent className="flex-1" />
        </div>
        <form className="flex gap-9">
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2 "
            onClick={() =>
              setRouteBLStore((prev) => ({
                ...prev,
                houseBLInvovled: "none",
              }))
            }
          >
            <MdRadio
              name="houseBLInvolve"
              checked={routeBLStore.houseBLInvovled === "none"}
            />
            None
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2 "
            onClick={() =>
              setRouteBLStore((prev) => ({
                ...prev,
                houseBLInvovled: "console",
              }))
            }
          >
            <MdRadio
              name="houseBLInvolve"
              checked={routeBLStore.houseBLInvovled === "console"}
            />
            Console (Exist)
          </MdTypography>
          <MdTypography
            tag="label"
            variant="label"
            size="large"
            className="flex items-center gap-2"
            onClick={() =>
              setRouteBLStore((prev) => ({
                ...prev,
                houseBLInvovled: "simple",
              }))
            }
          >
            <MdRadio
              name="houseBLInvolve"
              checked={routeBLStore.houseBLInvovled === "simple"}
            />
            Simple (Do not Exist)
          </MdTypography>
        </form>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DetailTitle title="Remark" />
          <DividerComponent className="flex-1" />
        </div>
        <NAOutlinedTextField
          label="Remark"
          type="textarea"
          maxInputLength={2000}
          rows={5}
          className="w-full"
          value={routeBLStore.remarks || ""}
          handleValueChange={(value) => {
            setRouteBLStore((prev) => ({ ...prev, remarks: value }));
          }}
          onBlur={(e) => {
            // split 35 characters
            let splitTexts = e.currentTarget.value
              .replaceAll("\n", "")
              .match(/.{1,50}/g)
              ?.join("\n");

            if (splitTexts) {
              e.currentTarget.value = splitTexts;
              setRouteBLStore((prev) => ({
                ...prev,
                ...{ remarks: splitTexts },
              }));
            }
          }}
        />
      </div>
      <MdFilledButton
        className="w-fit self-end mt-4"
        onClick={() => {
          moveToContainerStep();
        }}
      >
        Next
      </MdFilledButton>
    </div>
  );
}
