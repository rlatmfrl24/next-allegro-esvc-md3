import { useMemo } from "react";
import { useRecoilState } from "recoil";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { DetailTitle } from "@/app/components/title-components";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ContainerType,
  DryContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";

import DangerousCargoInput from "./dangerous-cargo-input";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { AnimatePresence, motion } from "framer-motion";
import { init } from "next/dist/compiled/webpack/webpack";
import { containerVariant } from "./base";

const DryContainerInput = ({
  list,
}: {
  list: DryContainerInformationType[];
}) => {
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);

  const defaultContainerSizeOptions = ["20", "40", "45", "53"];

  const selectableContainerSizeOptions = useMemo(() => {
    // if container size is already selected, remove it from the options
    containerInformation.dry.forEach((container) => {
      const index = defaultContainerSizeOptions.indexOf(container.size);
      if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
    });

    return [...defaultContainerSizeOptions];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerInformation.dry]);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="Dry Container" />
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
                containerInformation.dry.length ===
                defaultContainerSizeOptions.length
              }
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
              <AnimatePresence>
                {list.map((container, index) => (
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
                        required
                        className="w-52 text-right"
                        suffixText="ft"
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
                            dry: prev.dry.map((c, i) =>
                              i === index ? { ...c, size: size } : c
                            ),
                          }));
                        }}
                      />

                      <NAOutlinedTextField
                        label="Quantity / Total"
                        required
                        type="number"
                        value={container.quantity.toString()}
                        handleValueChange={(value) => {
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
                      <NAOutlinedTextField
                        label="Quantity / SOC"
                        value={container.soc.toString()}
                        error={container.soc > container.quantity}
                        errorText="SOC cannot be greater than Quantity"
                        type="number"
                        handleValueChange={(value) => {
                          let intValue = parseInt(value);
                          if (isNaN(intValue)) intValue = 0;

                          setContainerInformation((prev) => ({
                            ...prev,
                            dry: prev.dry.map((c, i) =>
                              i === index ? { ...c, soc: +intValue } : c
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default DryContainerInput;
