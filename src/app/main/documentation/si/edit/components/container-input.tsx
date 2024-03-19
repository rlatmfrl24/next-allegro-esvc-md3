import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { getEmptySIEditContainerData } from "@/app/main/util";
import { SIEditContainerState } from "@/app/store/si.store";
import {
  MdChipSet,
  MdFilledTonalIconButton,
  MdFilterChip,
  MdIconButton,
  MdOutlinedIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/boooking";
import { SIContainerInputProps, SealKind } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const ContainerInput = ({
  title,
  type,
  list,
}: {
  title: string;
  type: ContainerType;
  list: SIContainerInputProps[];
}) => {
  const [siContainerStore, setSIEditContainerStore] =
    useRecoilState(SIEditContainerState);
  const typeKey = type.toLowerCase() as keyof typeof siContainerStore;
  const tempPackageList = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.commerce.productMaterial()
    );
  }, []);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title={title} />
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
                setSIEditContainerStore((prev) => ({
                  ...prev,
                  [typeKey]: [
                    ...prev[typeKey],
                    getEmptySIEditContainerData(type),
                  ],
                }));
              }}
            >
              <Add fontSize="small" />
            </MdFilledTonalIconButton>
            <div className="flex flex-col-reverse w-full">
              {list.map((container, index) => {
                return (
                  <div
                    key={container.uuid}
                    className="mt-6 flex flex-col gap-4 "
                  >
                    {list.length - 1 !== index && (
                      <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                    )}
                    <div className="flex gap-2 items-start">
                      <NAOutlinedTextField
                        label="Container No."
                        className="w-52"
                        value={container.containerNumber}
                        handleValueChange={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((item) =>
                              item.uuid === container.uuid
                                ? { ...item, containerNumber: value }
                                : item
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedListBox
                        suffixText="ft"
                        label="Size"
                        className="w-52"
                        initialValue={container.containerSize}
                        options={["20", "40", "45", "53"]}
                        onSelection={(size) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index
                                ? {
                                    ...c,
                                    containerSize: size as
                                      | "20"
                                      | "40"
                                      | "45"
                                      | "53",
                                  }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedListBox
                        label="S.O.C"
                        className="w-32"
                        initialValue={container.isSocContainer ? "Y" : "N"}
                        options={["Y", "N"]}
                        onSelection={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index
                                ? {
                                    ...c,
                                    isSocContainer: value === "Y",
                                  }
                                : c
                            ),
                          }));
                        }}
                      />
                      <MdIconButton
                        className="mt-2"
                        onClick={() => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].filter(
                              (c, i) => i !== index
                            ),
                          }));
                        }}
                      >
                        <DeleteOutline fontSize="small" />
                      </MdIconButton>
                    </div>
                    <div className="flex gap-2">
                      <NAOutlinedListBox
                        label="Kind"
                        options={[
                          "Shipper",
                          "Carrier",
                          "Consolidator",
                          "Customs",
                          "Unknown",
                          "Quarantine Agency",
                          "Terminal Agency",
                        ]}
                        className="w-52"
                        initialValue={SealKind[container.firstSeal.kind]}
                        onSelection={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index
                                ? {
                                    ...c,
                                    firstSeal: {
                                      ...c.firstSeal,
                                      kind: SealKind[
                                        value as keyof typeof SealKind
                                      ],
                                    },
                                  }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedListBox
                        label="Seal No. 01"
                        options={["Merchanical Seal", "Electronic Seal"]}
                        className="w-52"
                        initialValue={
                          container.firstSeal.type === "merchanical"
                            ? "Merchanical Seal"
                            : "Electronic Seal"
                        }
                        onSelection={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index
                                ? {
                                    ...c,
                                    firstSeal: {
                                      ...c.firstSeal,
                                      type:
                                        value === "Merchanical Seal"
                                          ? "merchanical"
                                          : "electronic",
                                    },
                                  }
                                : c
                            ),
                          }));
                        }}
                      />
                      <NAOutlinedTextField
                        value={container.firstSeal.description}
                        placeholder="Seal No. 01"
                        className="flex-1"
                        handleValueChange={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index
                                ? {
                                    ...c,
                                    firstSeal: {
                                      ...c.firstSeal,
                                      description: value,
                                    },
                                  }
                                : c
                            ),
                          }));
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <NAOutlinedListBox
                        label="Package"
                        className="flex-1"
                        options={tempPackageList}
                        initialValue={container.packageType}
                        onSelection={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index ? { ...c, packageType: value } : c
                            ),
                          }));
                        }}
                      />
                      <MdOutlinedTextField
                        value={container.packageQuantity.toString()}
                        className="w-52 text-right"
                        onBlur={(e) => {
                          e.target.value = container.packageQuantity.toString();
                        }}
                        onInput={(e) => {
                          const value = (e.target as HTMLInputElement).value;
                          const intValue = parseInt(value);
                          if (isNaN(intValue)) return;

                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            [typeKey]: prev[typeKey].map((c, i) =>
                              i === index
                                ? { ...c, packageQuantity: intValue }
                                : c
                            ),
                          }));
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex gap-2">
                        <MdOutlinedTextField
                          label="Weight"
                          value={container.packageWeight.toString()}
                          className="text-right"
                          onBlur={(e) => {
                            e.target.value = container.packageWeight.toString();
                          }}
                          onInput={(e) => {
                            const value = (e.target as HTMLInputElement).value;
                            const intValue = parseInt(value);
                            if (isNaN(intValue)) return;

                            setSIEditContainerStore((prev) => ({
                              ...prev,
                              [typeKey]: prev[typeKey].map((c, i) =>
                                i === index
                                  ? { ...c, packageWeight: intValue }
                                  : c
                              ),
                            }));
                          }}
                        />
                        <NAOutlinedListBox
                          initialValue={container.pacakgeWeightUnit}
                          options={["KGS", "LBS"]}
                          onSelection={(value) => {
                            setSIEditContainerStore((prev) => ({
                              ...prev,
                              [typeKey]: prev[typeKey].map((c, i) =>
                                i === index
                                  ? { ...c, pacakgeWeightUnit: value }
                                  : c
                              ),
                            }));
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <MdOutlinedTextField
                          label="Measure"
                          value={container.packageMeasurement.toString()}
                          className="text-right"
                          onBlur={(e) => {
                            e.target.value =
                              container.packageMeasurement.toString();
                          }}
                          onInput={(e) => {
                            const value = (e.target as HTMLInputElement).value;
                            const intValue = parseInt(value);
                            if (isNaN(intValue)) return;

                            setSIEditContainerStore((prev) => ({
                              ...prev,
                              [typeKey]: prev[typeKey].map((c, i) =>
                                i === index
                                  ? { ...c, packageMeasurement: intValue }
                                  : c
                              ),
                            }));
                          }}
                        />
                        <NAOutlinedListBox
                          initialValue={container.packageMeasurementUnit}
                          options={["CBM", "CBF"]}
                          onSelection={(value) => {
                            setSIEditContainerStore((prev) => ({
                              ...prev,
                              [typeKey]: prev[typeKey].map((c, i) =>
                                i === index
                                  ? { ...c, packageMeasurementUnit: value }
                                  : c
                              ),
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <NaToggleButton
                      label="Cargo Manifest"
                      state={
                        container.hasCargoManifest ? "checked" : "unchecked"
                      }
                      onClick={(isChecked) => {
                        setSIEditContainerStore((prev) => ({
                          ...prev,
                          [typeKey]: prev[typeKey].map((c, i) =>
                            i === index
                              ? { ...c, hasCargoManifest: !isChecked }
                              : c
                          ),
                        }));
                      }}
                    />
                    {container.hasCargoManifest && (
                      <>
                        <div className="flex gap-2">
                          <MdOutlinedIconButton className="w-8 h-8">
                            <Add fontSize="small" />
                          </MdOutlinedIconButton>
                          <MdChipSet>
                            <MdFilterChip label="Cargo #1" removable />
                            <MdFilterChip label="Cargo #2" removable />
                          </MdChipSet>
                        </div>
                        <MdTypography
                          variant="body"
                          size="large"
                          prominent
                          className="text-primary"
                        >
                          Cargo Information
                        </MdTypography>
                        <div className="flex gap-2">
                          <NAOutlinedListBox options={["Y", "N", "N/A"]} />
                          <NAOutlinedTextField label="Combo" />
                          <NAOutlinedTextField className="flex-1" />
                        </div>
                        <MdTypography
                          variant="body"
                          size="large"
                          prominent
                          className="text-primary"
                        >
                          Commodity Code
                        </MdTypography>
                        <div className="flex gap-2">
                          <NAOutlinedTextField label="HTS Code(U.S.)" />
                          <NAOutlinedTextField label="HTS Code(EU, ASIA)" />
                          <NAOutlinedTextField label="NCM Code(Brazil)" />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ContainerInput;
