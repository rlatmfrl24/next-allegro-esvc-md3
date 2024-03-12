import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking-request.store";
import { MdFilledTonalIconButton, MdOutlinedTextField } from "@/app/util/md3";
import {
  BulkContainerInformationType,
  ContainerType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";

const BulkContainerInput = ({
  list,
}: {
  list: BulkContainerInformationType[];
}) => {
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex items-center gap-2`}>
            <div className="w-1 h-4 bg-primary"></div>
            <MdTypography variant="body" size="large" prominent>
              Bulk Container
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
            <div className="flex flex-col-reverse">
              {list.map((container, index) => (
                <div key={container.uuid} className="mt-6 flex flex-col gap-4">
                  {list.length - 1 !== index && (
                    <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <MdOutlinedTextField
                        className="w-[120px] min-w-[120px]"
                        label="Package"
                        value={container.package.toString()}
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? { ...c, package: +value }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedListBox
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
                      <MdOutlinedTextField
                        className="w-[120px] min-w-[120px]"
                        label="Gross Weight"
                        value={container.grossWeight.toString()}
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          setContainerInformation((prev) => ({
                            ...prev,
                            bulk: prev.bulk.map((c) =>
                              c.uuid === container.uuid
                                ? { ...c, grossWeight: +value }
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
                    <MdOutlinedTextField
                      label="Commodity"
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
                  </div>
                  <div className="flex gap-4">
                    <MdOutlinedTextField
                      className="w-36 min-w-36"
                      suffixText="cm"
                      label="Length"
                      value={container.length.toString()}
                      onInput={(e) => {
                        const value = e.currentTarget.value;
                        setContainerInformation((prev) => ({
                          ...prev,
                          bulk: prev.bulk.map((c) =>
                            c.uuid === container.uuid
                              ? { ...c, length: +value }
                              : c
                          ),
                        }));
                      }}
                    />
                    <MdOutlinedTextField
                      className="w-36 min-w-36"
                      suffixText="cm"
                      label="Width"
                      value={container.width.toString()}
                      onInput={(e) => {
                        const value = e.currentTarget.value;
                        setContainerInformation((prev) => ({
                          ...prev,
                          bulk: prev.bulk.map((c) =>
                            c.uuid === container.uuid
                              ? { ...c, width: +value }
                              : c
                          ),
                        }));
                      }}
                    />
                    <MdOutlinedTextField
                      className="w-36 min-w-36"
                      suffixText="cm"
                      label="Height"
                      value={container.height.toString()}
                      onInput={(e) => {
                        const value = e.currentTarget.value;
                        setContainerInformation((prev) => ({
                          ...prev,
                          bulk: prev.bulk.map((c) =>
                            c.uuid === container.uuid
                              ? { ...c, height: +value }
                              : c
                          ),
                        }));
                      }}
                    />
                    <MdOutlinedTextField
                      className="flex-1"
                      label="Total Measure"
                      suffixText="CBM"
                      value={container.totalMeasurement.toString()}
                      onInput={(e) => {
                        const value = e.currentTarget.value;
                        setContainerInformation((prev) => ({
                          ...prev,
                          bulk: prev.bulk.map((c) =>
                            c.uuid === container.uuid
                              ? { ...c, totalMeasurement: +value }
                              : c
                          ),
                        }));
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default BulkContainerInput;
