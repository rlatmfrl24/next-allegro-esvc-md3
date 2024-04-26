import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import { SIEditRouteBLState, SIEditStepState } from "@/app/store/si.store";
import { MdFilledButton, MdOutlinedTextField, MdRadio } from "@/app/util/md3";
import { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { PlaceOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function StepRouteBL() {
  const [routeBLStore, setRouteBLStore] = useRecoilState(SIEditRouteBLState);
  const setSIEditStep = useSetRecoilState(SIEditStepState);

  const moveToContainerStep = useCallback(() => {
    setSIEditStep((prev) => {
      return {
        ...prev,
        routeBL: {
          ...prev.routeBL,
          isSelected: false,
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
      !!routeBLStore.por?.yardName &&
      !!routeBLStore.pol?.yardName &&
      !!routeBLStore.pod?.yardName &&
      !!routeBLStore.del?.yardName &&
      !!routeBLStore.serviceTypeFrom &&
      !!routeBLStore.serviceTypeTo
    );
  }, [
    routeBLStore.del?.yardName,
    routeBLStore.pod?.yardName,
    routeBLStore.pol?.yardName,
    routeBLStore.por?.yardName,
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
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Route & BL Information
      </MdTypography>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
          <NAOutlinedTextField
            required
            label="Vessel Voy(Flag)"
            value={routeBLStore.vesselVoyage || ""}
            handleValueChange={(value) =>
              setRouteBLStore((prev) => ({ ...prev, vesselVoyage: value }))
            }
          />
          <NAOutlinedTextField
            label="Pre-Carriage By"
            value={routeBLStore.preCarriageBy || ""}
            handleValueChange={(value) =>
              setRouteBLStore((prev) => ({ ...prev, preCarriageBy: value }))
            }
          />
          <div></div>
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Pier or Place of Receipt"
            itemList={tempPortList.map((item) => item.yardName)}
            initialValue={routeBLStore.por?.yardName || ""}
            onItemSelection={(value) => {
              const selectedPort = tempPortList.find(
                (item) => item.yardName === value
              );
              selectedPort
                ? setRouteBLStore((prev) => ({ ...prev, por: selectedPort }))
                : setRouteBLStore((prev) => ({
                    ...prev,
                    por: {} as PlaceInformationType,
                  }));
            }}
          />
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Port of Loading"
            initialValue={routeBLStore.pol?.yardName || ""}
            itemList={tempPortList.map((item) => item.yardName)}
            onItemSelection={(value) => {
              const selectedPort = tempPortList.find(
                (item) => item.yardName === value
              );
              selectedPort
                ? setRouteBLStore((prev) => ({ ...prev, pol: selectedPort }))
                : setRouteBLStore((prev) => ({
                    ...prev,
                    pol: {} as PlaceInformationType,
                  }));
            }}
          />
          <NaToggleButton
            label="Same as Place of Receipt"
            state={
              routeBLStore.por?.yardName === undefined ||
              routeBLStore.por?.yardName === ""
                ? "disabled"
                : routeBLStore.por?.yardName === routeBLStore.pol?.yardName
                ? "checked"
                : "unchecked"
            }
            onClick={(isChecked) => {
              if (isChecked) {
                setRouteBLStore((prev) => ({
                  ...prev,
                  pol: {} as PlaceInformationType,
                }));
              } else {
                setRouteBLStore((prev) => ({ ...prev, pol: prev.por }));
              }
            }}
          />
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Port of Discharging"
            itemList={tempPortList.map((item) => item.yardName)}
            initialValue={routeBLStore.pod?.yardName || ""}
            onItemSelection={(value) => {
              const selectedPort = tempPortList.find(
                (item) => item.yardName === value
              );
              selectedPort
                ? setRouteBLStore((prev) => ({ ...prev, pod: selectedPort }))
                : setRouteBLStore((prev) => ({
                    ...prev,
                    pod: {} as PlaceInformationType,
                  }));
            }}
          />
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Place of Delivery (By On Carrier)"
            itemList={tempPortList.map((item) => item.yardName)}
            initialValue={routeBLStore.del?.yardName || ""}
            onItemSelection={(value) => {
              const selectedPort = tempPortList.find(
                (item) => item.yardName === value
              );
              selectedPort
                ? setRouteBLStore((prev) => ({ ...prev, del: selectedPort }))
                : setRouteBLStore((prev) => ({
                    ...prev,
                    del: {} as PlaceInformationType,
                  }));
            }}
          />
          <NaToggleButton
            label="Same as Place of Discharging"
            state={
              routeBLStore.pod?.yardName === undefined ||
              routeBLStore.pod?.yardName === ""
                ? "disabled"
                : routeBLStore.pod?.yardName === routeBLStore.del?.yardName
                ? "checked"
                : "unchecked"
            }
            onClick={(isChecked) => {
              if (isChecked) {
                setRouteBLStore((prev) => ({
                  ...prev,
                  del: {} as PlaceInformationType,
                }));
              } else {
                setRouteBLStore((prev) => ({ ...prev, del: prev.pod }));
              }
            }}
          />
          <NAOutlinedTextField
            label="Point and Country of Origin"
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
          <MdOutlinedTextField
            label="Remark"
            type="textarea"
            rows={5}
            className="w-full"
            value={routeBLStore.remarks || ""}
            onInput={(e) =>
              setRouteBLStore((prev) => ({
                ...prev,
                remarks: e.currentTarget.value,
              }))
            }
          />
        </div>
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
