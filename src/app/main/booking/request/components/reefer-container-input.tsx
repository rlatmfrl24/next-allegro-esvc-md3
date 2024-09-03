import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import {
  BookingRequestStepState,
  ContainerState,
} from "@/app/store/booking.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ContainerType,
  ReeferContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useRecoilState, useSetRecoilState } from "recoil";
import DangerousCargoInput from "./dangerous-cargo-input";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { DetailTitle } from "@/app/components/title-components";
import { useMemo } from "react";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariant } from "./base";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

const ReeferContainerInput = ({
  list,
  showRequired = true,
}: {
  list: ReeferContainerInformationType[];
  showRequired?: boolean;
}) => {
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);
  const [bookingRequestStep] = useRecoilState(BookingRequestStepState);
  const defaultContainerSizeOptions = ["20", "40", "40HC"];

  const selectableContainerSizeOptions = useMemo(() => {
    // if container size is already selected, remove it from the options
    containerInformation.reefer.forEach((container) => {
      const index = defaultContainerSizeOptions.indexOf(container.size);
      if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
    });

    return [...defaultContainerSizeOptions];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerInformation.reefer]);

  return (
    <Disclosure defaultOpen>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button className={`flex w-full items-center gap-2`}>
              <DetailTitle title="Reefer Container" />
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
                  containerInformation.reefer.length ===
                  defaultContainerSizeOptions.length
                }
                onClick={() => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    reefer: [
                      ...prev.reefer,
                      getEmptyContainerData(
                        ContainerType.reefer,
                        selectableContainerSizeOptions
                      ) as ReeferContainerInformationType,
                    ],
                  }));
                }}
              >
                <Add fontSize="small" />
              </MdFilledTonalIconButton>
              <div className="flex flex-col-reverse flex-1">
                <AnimatePresence>
                  {list.map((container, index) => {
                    return (
                      <motion.div
                        key={container.uuid}
                        variants={containerVariant}
                        className="flex flex-1 gap-4"
                        initial="initial"
                        animate="add"
                        exit="remove"
                      >
                        <div
                          key={container.uuid}
                          className="mt-6 flex flex-col gap-2 flex-1"
                        >
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
                                    reefer: prev.reefer.map((c, i) =>
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
                                    reefer: prev.reefer.map((c, i) =>
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
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    reefer: prev.reefer.map((c, i) =>
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
                                label="Degree"
                                className="w-[120px]"
                                maxInputLength={5}
                                value={container.temperature?.toString() ?? ""}
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    reefer: prev.reefer.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            temperature: value,
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                              <NAOutlinedListBox
                                options={["℃", "℉"]}
                                className="w-[104px]"
                                initialValue={
                                  container.temperatureUnit as string
                                }
                                onSelection={(unit) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    reefer: prev.reefer.map((c, i) =>
                                      i === index
                                        ? { ...c, temperatureUnit: unit as any }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            <div className="flex flex-1 gap-2">
                              <NAOutlinedNumberField
                                label="Ventilation"
                                className="w-28"
                                maxInputLength={3}
                                value={container.ventilation?.toString() ?? ""}
                                handleValueChange={(value) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    reefer: prev.reefer.map((c, i) =>
                                      i === index
                                        ? { ...c, ventilation: value }
                                        : c
                                    ),
                                  }));
                                }}
                              />

                              <NAOutlinedListBox
                                options={["%Open", "%Close"]}
                                className="w-32"
                                initialValue={
                                  container.ventilationType
                                    ? container.ventilationType === "open"
                                      ? "%Open"
                                      : "%Close"
                                    : ""
                                }
                                onSelection={(type) => {
                                  setContainerInformation((prev) => ({
                                    ...prev,
                                    reefer: prev.reefer.map((c, i) =>
                                      i === index
                                        ? {
                                            ...c,
                                            ventilationType:
                                              type === "%Open"
                                                ? "open"
                                                : "close",
                                          }
                                        : c
                                    ),
                                  }));
                                }}
                              />
                            </div>
                            <NAOutlinedListBox
                              label="Nature"
                              className="flex-1"
                              required={showRequired}
                              options={["Chilled", "Frozen"]}
                              initialValue={container.nature}
                              onSelection={(nature) => {
                                setContainerInformation((prev) => ({
                                  ...prev,
                                  reefer: prev.reefer.map((c, i) =>
                                    i === index ? { ...c, nature } : c
                                  ),
                                }));
                              }}
                            />
                            <NAOutlinedNumberField
                              label="Humidity"
                              suffixText="%"
                              className="w-28"
                              maxInputLength={3}
                              value={container.humidity?.toString() ?? ""}
                              handleValueChange={(value) => {
                                setContainerInformation((prev) => ({
                                  ...prev,
                                  reefer: prev.reefer.map((c, i) =>
                                    i === index ? { ...c, humidity: value } : c
                                  ),
                                }));
                              }}
                            />

                            <NAOutlinedListBox
                              label="Genset"
                              required={showRequired}
                              className="w-28"
                              options={["Yes", "No"]}
                              initialValue={container.genset ? "Yes" : "No"}
                              onSelection={(gen) => {
                                setContainerInformation((prev) => ({
                                  ...prev,
                                  reefer: prev.reefer.map((c, i) =>
                                    i === index
                                      ? { ...c, genset: gen === "Yes" }
                                      : c
                                  ),
                                }));
                              }}
                            />
                          </div>

                          <DangerousCargoInput
                            container={container}
                            type={ContainerType.reefer}
                          />
                        </div>
                        <MdOutlinedIconButton
                          className={
                            list.length - 1 !== index ? "mt-16" : "mt-8"
                          }
                          onClick={() => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              reefer: prev.reefer.filter((c, i) => i !== index),
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

export default ReeferContainerInput;
