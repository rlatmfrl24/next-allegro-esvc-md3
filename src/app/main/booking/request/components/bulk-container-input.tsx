import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  BulkContainerInformationType,
  ContainerType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { containerVariant } from "./base";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

const BulkContainerInput = ({
  list,
}: {
  list: BulkContainerInformationType[];
}) => {
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="Bulk Container" />
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
                  bulk: [
                    ...prev.bulk,
                    getEmptyContainerData(
                      ContainerType.bulk
                    ) as BulkContainerInformationType,
                  ],
                }));
              }}
            >
              <Add fontSize="small" />
            </MdFilledTonalIconButton>
            <div className="flex flex-col-reverse flex-1">
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
                    <div className="flex gap-4">
                      <div className="flex gap-2 flex-1">
                        <NAOutlinedNumberField
                          className="w-[120px] min-w-[120px]"
                          label="Package"
                          value={container.package?.toString()}
                          handleValueChange={(value) => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              bulk: prev.bulk.map((c) =>
                                c.uuid === container.uuid
                                  ? { ...c, package: value }
                                  : c
                              ),
                            }));
                          }}
                        />
                        <NAOutlinedListBox
                          className="flex-1"
                          options={[
                            "Aerosol",
                            "Bag",
                            "Box",
                            "Crate",
                            "Drum",
                            "Pallet",
                            "Reel",
                            "Roll",
                            "Other",
                          ]}
                          initialValue={container.packageType}
                          onSelection={(packageType) => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              bulk: prev.bulk.map((c) =>
                                c.uuid === container.uuid
                                  ? { ...c, packageType }
                                  : c
                              ),
                            }));
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <NAOutlinedNumberField
                          className="w-[120px] min-w-[120px]"
                          label="Gross Weight"
                          value={container.grossWeight?.toString()}
                          handleValueChange={(value) => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              bulk: prev.bulk.map((c) =>
                                c.uuid === container.uuid
                                  ? { ...c, grossWeight: value }
                                  : c
                              ),
                            }));
                          }}
                        />
                        <NAOutlinedListBox
                          className="w-[120px] min-w-[120px]"
                          options={["KGS", "LBS"]}
                          initialValue={container.grossWeightUnit}
                          onSelection={(value) => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              bulk: prev.bulk.map((c) =>
                                c.uuid === container.uuid
                                  ? { ...c, grossWeightUnit: value as any }
                                  : c
                              ),
                            }));
                          }}
                        />
                      </div>

                      <MdIconButton
                        className="mt-2"
                        onClick={() => {
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.filter((c, i) => i !== index),
                          }));
                        }}
                      >
                        <DeleteOutline fontSize="small" />
                      </MdIconButton>
                    </div>
                    <div className="flex gap-4">
                      <MdOutlinedTextField
                        label="Commodity"
                        className="flex-1"
                        value={container.commodity.description}
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? {
                                    ...c,
                                    commodity: {
                                      ...c.commodity,
                                      description: value,
                                    },
                                  }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedNumberField
                        className="w-36 min-w-36"
                        suffixText="cm"
                        label="Length"
                        value={container.length?.toString()}
                        handleValueChange={(value) => {
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? { ...c, length: value }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedNumberField
                        className="w-36 min-w-36"
                        suffixText="cm"
                        label="Width"
                        value={container.width?.toString()}
                        handleValueChange={(value) => {
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? { ...c, width: value }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedNumberField
                        className="w-36 min-w-36"
                        suffixText="cm"
                        label="Height"
                        value={container.height?.toString()}
                        handleValueChange={(value) => {
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? { ...c, height: value }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedNumberField
                        label="Total Measure"
                        suffixText="CBM"
                        className="w-36 min-w-36"
                        value={container.totalMeasurement?.toString()}
                        handleValueChange={(value) => {
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? { ...c, totalMeasurement: value }
                                : c
                            ),
                          }));
                        }}
                      />
                    </div>
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

export default BulkContainerInput;
