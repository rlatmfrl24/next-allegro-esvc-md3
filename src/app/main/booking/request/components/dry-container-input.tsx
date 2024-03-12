import { useSetRecoilState } from "recoil";

import { MdTypography } from "@/app/components/typography";
import { ContainerState } from "@/app/store/booking-request.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdSelectOption,
} from "@/app/util/md3";
import {
  ContainerInformationType,
  ContainerType,
  DryContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";

import DangerousCargoInput from "./dangerous-cargo-input";
import { getEmptyContainerData } from "@/app/main/util";

const DryContainerInputContainer = ({
  list,
}: {
  list: ContainerInformationType[];
}) => {
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex items-center gap-2`}>
            <div className="w-1 h-4 bg-primary"></div>
            <MdTypography variant="body" size="large" prominent>
              Dry Container
            </MdTypography>
            <div className="flex-1 border-b border-b-outlineVariant"></div>
            <ArrowDropDown
              className={`transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={`flex gap-4`}>
            <MdFilledTonalIconButton
              className="mt-8 min-w-[40px] min-h-[40px]"
              onClick={() => {
                setContainerInformation((prev) => ({
                  ...prev,
                  dry: [
                    ...prev.dry,
                    getEmptyContainerData(
                      ContainerType.dry
                    ) as DryContainerInformationType,
                  ],
                }));
              }}
            >
              <Add fontSize="small" />
            </MdFilledTonalIconButton>
            <div className="flex flex-col-reverse">
              {list.map((container, index) => (
                <div key={container.uuid} className="mt-6 flex flex-col gap-4">
                  {list.length - 1 !== index && (
                    <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                  )}

                  <div className="flex gap-4 items-start">
                    <MdOutlinedSelect
                      label="Size"
                      className="text-right"
                      selectedIndex={
                        container.size === "20ft"
                          ? 0
                          : container.size === "40ft"
                          ? 1
                          : container.size === "45ft"
                          ? 2
                          : 3
                      }
                      onchange={(e) => {
                        const value = (e.target as HTMLSelectElement).value;
                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c, i) =>
                            i === index ? { ...c, size: value as any } : c
                          ),
                        }));
                      }}
                    >
                      <MdSelectOption value="20ft">{`20 ft`}</MdSelectOption>
                      <MdSelectOption value="40ft">{`40 ft`}</MdSelectOption>
                      <MdSelectOption value="45ft">{`45 ft`}</MdSelectOption>
                      <MdSelectOption value="53ft">{`53 ft`}</MdSelectOption>
                    </MdOutlinedSelect>
                    <MdOutlinedTextField
                      label="Quantity / Total"
                      className="text-right"
                      value={container.quantity.toString()}
                      onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        const intValue = parseInt(value);
                        if (isNaN(intValue)) return;

                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c, i) =>
                            i === index ? { ...c, quantity: +value } : c
                          ),
                        }));
                      }}
                      onBlur={(e) => {
                        e.target.value = container.quantity.toString();
                      }}
                    />
                    <MdOutlinedTextField
                      label="Quantity / SOC"
                      className="text-right"
                      value={container.soc.toString()}
                      error={container.soc > container.quantity}
                      errorText="SOC cannot be greater than Quantity"
                      onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        const intValue = parseInt(value);
                        if (isNaN(intValue)) return;

                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c, i) =>
                            i === index ? { ...c, soc: +value } : c
                          ),
                        }));
                      }}
                      onBlur={(e) => {
                        e.target.value = container.soc.toString();
                      }}
                    />
                    <MdIconButton
                      className="mt-2"
                      onClick={() => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.filter((c, i) => i !== index),
                        }));
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </MdIconButton>
                  </div>
                  <DangerousCargoInput
                    container={container}
                    type={ContainerType.dry}
                  />
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default DryContainerInputContainer;
