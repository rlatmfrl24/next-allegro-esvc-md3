import { useRecoilState, useSetRecoilState } from "recoil";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ContainerType,
  TankContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";

import DangerousCargoInput from "./dangerous-cargo-input";
import { DetailTitle } from "@/app/components/title-components";
import { useMemo } from "react";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

const TankContainerInput = ({
  list,
}: {
  list: TankContainerInformationType[];
}) => {
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);

  const defaultContainerSizeOptions = ["20", "40", "45", "53"];

  const selectableContainerSizeOptions = useMemo(() => {
    // if container size is already selected, remove it from the options
    containerInformation.tank.forEach((container) => {
      const index = defaultContainerSizeOptions.indexOf(container.size);
      if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
    });

    return [...defaultContainerSizeOptions];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerInformation.tank]);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="Tank Container" />
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
              disabled={
                defaultContainerSizeOptions.length === 0 ||
                containerInformation.tank.length === 4
              }
              onClick={() => {
                setContainerInformation((prev) => ({
                  ...prev,
                  tank: [
                    ...prev.tank,
                    getEmptyContainerData(
                      ContainerType.tank
                    ) as TankContainerInformationType,
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
                    <NAOutlinedListBox
                      label="Size"
                      className="w-52 text-right"
                      suffixText="ft"
                      required
                      initialValue={container.size}
                      options={
                        container.size !== ""
                          ? [
                              container.size,
                              ...selectableContainerSizeOptions,
                            ].sort()
                          : selectableContainerSizeOptions
                      }
                      onSelection={(size) => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          tank: prev.tank.map((c, i) =>
                            i === index ? { ...c, size: size as any } : c
                          ),
                        }));
                      }}
                    />
                    <NAOutlinedTextField
                      label="Quantity / Total"
                      type="number"
                      required
                      value={container.quantity.toString()}
                      handleValueChange={(value) => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          tank: prev.tank.map((c, i) =>
                            i === index ? { ...c, quantity: +value } : c
                          ),
                        }));
                      }}
                    />
                    <NAOutlinedTextField
                      label="Quantity / SOC"
                      type="number"
                      value={container.soc.toString()}
                      error={container.soc > container.quantity}
                      errorText="SOC cannot be greater than Quantity"
                      handleValueChange={(value) => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          tank: prev.tank.map((c, i) =>
                            i === index ? { ...c, soc: +value } : c
                          ),
                        }));
                      }}
                    />
                    <MdIconButton
                      className="mt-2"
                      onClick={() => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          tank: prev.tank.filter((c, i) => i !== index),
                        }));
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </MdIconButton>
                  </div>
                  <DangerousCargoInput
                    container={container}
                    type={ContainerType.tank}
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

export default TankContainerInput;
