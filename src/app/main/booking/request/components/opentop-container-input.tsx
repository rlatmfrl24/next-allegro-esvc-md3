import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import {
  BookingRequestStepState,
  ContainerState,
} from "@/app/store/booking.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ContainerType,
  OpenTopContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useRecoilState, useSetRecoilState } from "recoil";
import DangerousCargoInput from "./dangerous-cargo-input";
import AwkwardContainerInput from "./awkward-container-input";
import { DetailTitle } from "@/app/components/title-components";
import { useMemo } from "react";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariant } from "./base";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

const OpenTopContainerInput = ({
  list,
  showRequired = true,
}: {
  list: OpenTopContainerInformationType[];
  showRequired?: boolean;
}) => {
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);
  const [bookingRequestStep] = useRecoilState(BookingRequestStepState);

  const defaultContainerSizeOptions = ["20", "40", "40HC"];

  const selectableContainerSizeOptions = useMemo(() => {
    // if container size is already selected, remove it from the options
    containerInformation.opentop.forEach((container) => {
      const index = defaultContainerSizeOptions.indexOf(container.size);
      if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
    });

    return [...defaultContainerSizeOptions];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerInformation.opentop]);

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
                disabled={
                  containerInformation.opentop.length ===
                  defaultContainerSizeOptions.length
                }
                onClick={() => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    opentop: [
                      ...prev.opentop,
                      getEmptyContainerData(
                        ContainerType.opentop,
                        selectableContainerSizeOptions
                      ) as OpenTopContainerInformationType,
                    ],
                  }));
                }}
              >
                <Add fontSize="small" />
              </MdFilledTonalIconButton>
              <div className="flex flex-col-reverse">
                <AnimatePresence>
                  {list.map((container, index) => {
                    return (
                      <motion.div
                        key={container.uuid}
                        variants={containerVariant}
                        initial="initial"
                        animate="add"
                        exit="remove"
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
                            required={showRequired}
                            error={
                              bookingRequestStep.container.visited &&
                              container.size === ""
                            }
                            errorText="Size is required"
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
                                opentop: prev.opentop.map((c, i) =>
                                  i === index ? { ...c, size: size as any } : c
                                ),
                              }));
                            }}
                          />
                          <NAOutlinedNumberField
                            label="Quantity / Total"
                            required={showRequired}
                            error={
                              bookingRequestStep.container.visited &&
                              container.quantity === 0
                            }
                            errorText="Quantity is required"
                            value={container.quantity.toString()}
                            handleValueChange={(value) => {
                              setContainerInformation((prev) => ({
                                ...prev,
                                opentop: prev.opentop.map((c, i) =>
                                  i === index
                                    ? { ...c, quantity: value ?? 0 }
                                    : c
                                ),
                              }));
                            }}
                            onBlur={(e) => {
                              e.target.value = container.quantity.toString();
                            }}
                          />
                          <NAOutlinedNumberField
                            label="Quantity / SOC"
                            value={container.soc.toString()}
                            error={container.soc > container.quantity}
                            errorText="SOC cannot be greater than Quantity"
                            handleValueChange={(value) => {
                              setContainerInformation((prev) => ({
                                ...prev,
                                opentop: prev.opentop.map((c, i) =>
                                  i === index ? { ...c, soc: value ?? 0 } : c
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
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};

export default OpenTopContainerInput;
