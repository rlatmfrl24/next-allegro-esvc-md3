import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { getEmptyContainerData } from "@/app/main/util";
import {
  BookingRequestStepState,
  ContainerState,
} from "@/app/store/booking.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedIconButton,
} from "@/app/util/md3";
import {
  ContainerType,
  FlatRackContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import DangerousCargoInput from "./dangerous-cargo-input";
import AwkwardContainerInput from "./awkward-container-input";
import { DetailTitle } from "@/app/components/title-components";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariant } from "./base";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

const FlatRackContainerInput = ({
  list,
  showRequired = true,
}: {
  list: FlatRackContainerInformationType[];
  showRequired?: boolean;
}) => {
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);
  const [bookingRequestStep] = useRecoilState(BookingRequestStepState);

  const defaultContainerSizeOptions = ["20", "40", "40HC"];

  const selectableContainerSizeOptions = useMemo(() => {
    // if container size is already selected, remove it from the options
    containerInformation.flatrack.forEach((container) => {
      const index = defaultContainerSizeOptions.indexOf(container.size);
      if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
    });

    return [...defaultContainerSizeOptions];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerInformation.flatrack]);

  return (
    <Disclosure defaultOpen>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button className={`flex w-full items-center gap-2`}>
              <DetailTitle title="Flat Rack Container" />
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
                  containerInformation.flatrack.length ===
                  defaultContainerSizeOptions.length
                }
                onClick={() => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    flatrack: [
                      ...prev.flatrack,
                      getEmptyContainerData(
                        ContainerType.flatrack,
                        selectableContainerSizeOptions
                      ) as FlatRackContainerInformationType,
                    ],
                  }));
                }}
              >
                <Add fontSize="small" />
              </MdFilledTonalIconButton>
              <div className="flex flex-1 flex-col-reverse">
                <AnimatePresence>
                  {list.map((container, index) => {
                    return (
                      <motion.div
                        key={container.uuid}
                        className="flex gap-4 flex-1"
                        variants={containerVariant}
                        initial="initial"
                        animate="add"
                        exit="remove"
                      >
                        <div className="mt-6 flex flex-col flex-1 gap-2">
                          {list.length - 1 !== index && (
                            <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                          )}
                          <div className="flex gap-4 items-start">
                            <div className="flex gap-2">
                              <NAOutlinedListBox
                                label="Size"
                                className="w-[136px] text-right"
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
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? { ...c, size: size as any }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                              <NAOutlinedNumberField
                                label="Quantity / Total"
                                className="w-[136px]"
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
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? { ...c, quantity: value ?? 0 }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                              <NAOutlinedNumberField
                                label="Quantity / SOC"
                                className="w-[136px]"
                                value={container.soc.toString()}
                                error={container.soc > container.quantity}
                                errorText="SOC cannot be greater than Quantity"
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? { ...c, soc: value ?? 0 }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            <div className="flex gap-2">
                              <NAOutlinedNumberField
                                label="Package"
                                maxInputLength={9}
                                value={container.package?.toString() ?? ""}
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            package: value,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                              <NAOutlinedListBox
                                label=""
                                initialValue={container.packageType}
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
                                onSelection={(packageType) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            packageType: packageType as any,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            <div className="flex gap-2">
                              <NAOutlinedNumberField
                                label="Gross Weight"
                                value={container.grossWeight?.toString() ?? ""}
                                maxInputLength={9}
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            grossWeight: value,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                              <NAOutlinedListBox
                                label=""
                                className="w-36"
                                initialValue={container.grossWeightUnit}
                                options={["KGS", "LBS"]}
                                onSelection={(unit) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            grossWeightUnit: unit as any,
                                            netWeightUnit: unit as any,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            <div className="flex gap-2">
                              <NAOutlinedNumberField
                                label="Net Weight"
                                value={container.netWeight?.toString() ?? ""}
                                maxInputLength={9}
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            netWeight: value,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                              <NAOutlinedListBox
                                label=""
                                className="w-36"
                                initialValue={container.netWeightUnit}
                                options={["KGS", "LBS"]}
                                onSelection={(unit) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    flatrack: prev.flatrack.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            grossWeightUnit: unit as any,
                                            netWeightUnit: unit as any,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                            </div>
                          </div>
                          <AwkwardContainerInput
                            container={container}
                            type={ContainerType.flatrack}
                          />
                          <DangerousCargoInput
                            container={container}
                            type={ContainerType.flatrack}
                          />
                        </div>
                        <MdOutlinedIconButton
                          className={
                            list.length - 1 !== index ? "mt-16" : "mt-8"
                          }
                          onClick={() => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              flatrack: prev.flatrack.filter(
                                (c, i) => i !== index
                              ),
                            }));
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </MdOutlinedIconButton>
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

export default FlatRackContainerInput;
