import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { SIEditPartiesState, SIEditStepState } from "@/app/store/si.store";
import {
  MdCheckbox,
  MdFilledButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { ArrowDropDown, InfoOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ShipperInfo } from "./components/parties/shipper-info";
import { ConsigneeInfo } from "./components/parties/consignee-info";
import { NotifyPartyInfo } from "./components/parties/notify-party-info";
import { DividerComponent } from "@/app/components/divider";

export default function StepParties() {
  const setSIEditStep = useSetRecoilState(SIEditStepState);
  // const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);

  const moveToRouteBLStep = useCallback(() => {
    setSIEditStep((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        isSelected: false,
        visited: true,
      },
      routeBL: {
        ...prev.routeBL,
        isSelected: true,
      },
    }));
  }, [setSIEditStep]);

  const ValidateRequired = useMemo(() => {
    if (
      partiesStore.shipper.companyName === "" ||
      partiesStore.shipper.fullAddress === "" ||
      partiesStore.notifyParty.companyName === "" ||
      partiesStore.notifyParty.fullAddress === ""
    ) {
      return false;
    }

    if (
      partiesStore.consignee.companyName === "" ||
      partiesStore.consignee.fullAddress === ""
    ) {
      return partiesStore.consignee.isToOrder ? true : false;
    } else {
      return true;
    }
  }, [
    partiesStore.consignee.companyName,
    partiesStore.consignee.fullAddress,
    partiesStore.consignee.isToOrder,
    partiesStore.notifyParty.companyName,
    partiesStore.notifyParty.fullAddress,
    partiesStore.shipper.companyName,
    partiesStore.shipper.fullAddress,
  ]);

  useEffect(() => {
    setSIEditStep((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        isCompleted: ValidateRequired,
      },
    }));
  }, [setSIEditStep, ValidateRequired]);

  return (
    <div className="w-full flex flex-col gap-4">
      <MdTypography variant="title" size="large">
        Parties
      </MdTypography>
      <div className="grid grid-cols-2 gap-6">
        <ShipperInfo />
        <div>
          <DetailTitle title="Forwarding Agent References" className="mb-4" />
          <NAOutlinedTextField
            label="Forwarding Agent References"
            type="textarea"
            rows={5}
            value={partiesStore.forwardingAgentReference || ""}
            handleValueChange={(value) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  forwardingAgentReference: value,
                };
              });
            }}
            onBlur={(e) => {
              // split 35 characters
              let splitTexts = e.currentTarget.value
                .replaceAll("\n", "")
                .match(/.{1,35}/g)
                ?.join("\n")
                .toUpperCase();

              if (splitTexts) {
                e.currentTarget.value = splitTexts;
                setPartiesStore((prev) => ({
                  ...prev,
                  forwardingAgentReference: splitTexts as string,
                }));
              }
            }}
          />
        </div>
      </div>
      <DividerComponent className="border-dotted" />
      <div className="grid grid-cols-2 gap-6">
        <ConsigneeInfo />
        <NotifyPartyInfo />
      </div>
      <DividerComponent className="border-dotted" />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <DetailTitle title="Also Notify" className="mb-4" />
          <div>
            <MdOutlinedTextField
              label="Also Notify"
              type="textarea"
              className="w-full"
              rows={5}
              value={partiesStore.notifyParty.alsoNotify || ""}
              onInput={(e) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    notifyParty: {
                      ...prev.notifyParty,
                      alsoNotify: e.currentTarget.value,
                    },
                  };
                });
              }}
              onBlur={(e) => {
                // split 35 characters
                let splitTexts = e.currentTarget.value
                  .replaceAll("\n", "")
                  .match(/.{1,35}/g)
                  ?.join("\n")
                  .toUpperCase();

                if (splitTexts !== undefined) {
                  e.currentTarget.value = splitTexts;
                  setPartiesStore((prev) => ({
                    ...prev,
                    notifyParty: {
                      ...prev.notifyParty,
                      alsoNotify: splitTexts as string,
                    },
                  }));
                }
              }}
            />
          </div>
        </div>
        <div>
          <DetailTitle title="References" className="mb-4" />
          <div className={`flex flex-col gap-4`}>
            <NAOutlinedTextField
              label="Export References"
              type="textarea"
              rows={5}
              value={partiesStore.exportReference || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    exportReference: value,
                  };
                });
              }}
              onBlur={(e) => {
                // split 35 characters
                let splitTexts = e.currentTarget.value
                  .replaceAll("\n", "")
                  .match(/.{1,35}/g)
                  ?.join("\n")
                  .toUpperCase();

                if (splitTexts) {
                  e.currentTarget.value = splitTexts;
                  setPartiesStore((prev) => ({
                    ...prev,
                    exportReference: splitTexts as string,
                  }));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex text-outline">
          <InfoOutlined sx={{ fontSize: 16, mt: 0.25, mr: 0.5 }} />
          <div>
            <MdTypography variant="body" size="medium">
              CHINA-CCAM Requirement
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outlineVariant"
            >
              Shipper (Business Registration Number, Tel), Consignee (USCI or OC
              Code, Tel, P.I.C), Notify (USCI or OC Code, Tel)
            </MdTypography>
          </div>
        </div>
        <div className="flex text-outline">
          <InfoOutlined sx={{ fontSize: 16, mt: 0.25, mr: 0.5 }} />
          <div>
            <MdTypography variant="body" size="medium">
              JAPAN-AFR Requirement{" "}
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outlineVariant"
            >
              Shipper & Consignee & Notify(Tel)
            </MdTypography>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-end items-end">
        <MdFilledButton
          className="w-fit h-fit self-end"
          onClick={() => {
            moveToRouteBLStep();
          }}
        >
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
