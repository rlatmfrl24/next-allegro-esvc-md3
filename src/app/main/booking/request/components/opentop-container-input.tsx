import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking-request.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ContainerType,
  OpenTopContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import DangerousCargoInput from "./dangerous-cargo-input";
import AwkwardContainerInput from "./awkward-container-input";
import { DetailTitle } from "@/app/components/title-components";

const OpenTopContainerInput = ({
  list,
}: {
  list: OpenTopContainerInformationType[];
}) => {
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <Disclosure defaultOpen>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button className={`flex w-full items-center gap-2`}>
              <DetailTitle title="Open Top Container" />
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
                    opentop: [
                      ...prev.opentop,
                      getEmptyContainerData(
                        ContainerType.opentop
                      ) as OpenTopContainerInformationType,
                    ],
                  }));
                }}
              >
                <Add fontSize="small" />
              </MdFilledTonalIconButton>
              <div className="flex flex-col-reverse">
                {list.map((container, index) => {
                  return (
                    <div
                      key={container.uuid}
                      className="mt-6 flex flex-col gap-4"
                    >
                      {list.length - 1 !== index && (
                        <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                      )}
                      <div className="flex gap-4 items-start">
                        <NAOutlinedListBox
                          label="Size"
                          className="w-52 text-right"
                          suffixText="ft"
                          initialValue={container.size.replaceAll("ft", "")}
                          options={["20", "40", "45", "53"]}
                          onSelection={(size) => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              opentop: prev.opentop.map((c, i) =>
                                i === index ? { ...c, size: size as any } : c
                              ),
                            }));
                          }}
                        />
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
                              opentop: prev.opentop.map((c, i) =>
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
                              opentop: prev.opentop.map((c, i) =>
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
                              opentop: prev.opentop.filter(
                                (c, i) => i !== index
                              ),
                            }));
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </MdIconButton>
                      </div>
                      <AwkwardContainerInput
                        container={container}
                        type={ContainerType.opentop}
                      />
                      <DangerousCargoInput
                        container={container}
                        type={ContainerType.opentop}
                      />
                    </div>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};

export default OpenTopContainerInput;
