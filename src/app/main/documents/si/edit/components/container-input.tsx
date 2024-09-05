import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import Portal from "@/app/components/portal";
import { SIEditContainerState } from "@/app/store/si.store";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilterChip,
  MdOutlinedButton,
  MdOutlinedIconButton,
} from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/booking";
import {
  CargoManifestType,
  SIContainerInputProps,
} from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Add, DeleteOutline } from "@mui/icons-material";

import { SealTextField } from "./seal-textfield";

export default function ContainerInput({
  container,
  containerIndex,
  isLastItem = false,
}: {
  container: SIContainerInputProps;
  containerIndex: number;
  isLastItem?: boolean;
}) {
  const [
    isWarningRemoveCargoManifestDialogOpen,
    setIsWarningRemoveCargoManifestDialogOpen,
  ] = useState(false);

  const [SIEditContainerStore, setSIEditContainerStore] =
    useRecoilState(SIEditContainerState);

  const [selectedCargoManifestUuid, setSelectedCargoManifestUuid] =
    useState<string>("");

  const typeKey =
    container.containerType.toLowerCase() as keyof typeof SIEditContainerStore;

  const tempPackageList = useMemo(() => {
    return (
      Array.from({ length: 20 }, (_, i) => faker.commerce.productMaterial())
        // remove duplicate packageType
        .filter((value, index, self) => self.indexOf(value) === index)
    );
  }, []);

  function addNewCargoManifestToContainer() {
    // add empty CarogManifest to Container
    if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

    const newCargoManifest: CargoManifestType = {
      uuid: faker.string.uuid(),
      packageType: "",
      packageQuantity: undefined,
      weight: undefined,
      measurement: undefined,
      cargoInformation: {
        description: "",
      },
      commodityCode: {
        htsCodeUS: "",
        hisCodeEUASIA: "",
      },
    } as CargoManifestType;

    setSelectedCargoManifestUuid(newCargoManifest.uuid);
    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, i) =>
        i === containerIndex
          ? {
              ...c,
              cargoManifest: [...c.cargoManifest, newCargoManifest],
            }
          : c
      ),
    }));
  }

  function removeCargoManifestFromContainer(uuid: string) {
    // delete CargoManifest from Container by uuid
    if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, j) => {
        if (c.cargoManifest.length === 0) {
          return {
            ...c,
            hasCargoManifest: false,
            cargoManifest: [],
          };
        } else {
          return j === containerIndex
            ? {
                ...c,
                cargoManifest: c.cargoManifest.filter((cm) => cm.uuid !== uuid),
              }
            : c;
        }
      }),
    }));
  }

  function updateContainerStore(
    container: SIContainerInputProps,
    targetProps: string,
    newData: any
  ) {
    // update ContainerStore by uuid
    if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, j) =>
        c.uuid === container.uuid ? { ...c, [targetProps]: newData } : c
      ),
    }));
  }

  useEffect(() => {
    // calculate total weight and measurement and packageQuantity
    if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

    const totalWeight = container.cargoManifest.reduce(
      (acc, cm) => acc + (cm.weight ?? 0),
      0
    );
    const totalMeasurement = container.cargoManifest.reduce(
      (acc, cm) => acc + (cm.measurement ?? 0),
      0
    );
    const totalPackageQuantity = container.cargoManifest.reduce(
      (acc, cm) => acc + (cm.packageQuantity ?? 0),
      0
    );

    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, j) =>
        c.uuid === container.uuid && container.hasCargoManifest
          ? {
              ...c,
              packageWeight: totalWeight,
              packageMeasurement: totalMeasurement,
              packageQuantity: totalPackageQuantity,
            }
          : c
      ),
    }));
  }, [
    container.cargoManifest,
    container.hasCargoManifest,
    container.uuid,
    setSIEditContainerStore,
    typeKey,
  ]);

  return (
    <div className="flex gap-4">
      <div className="mt-6 flex flex-col gap-4">
        {!isLastItem && (
          <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
        )}

        <div className="flex gap-4">
          <div className="flex gap-2 items-start">
            <NAOutlinedTextField
              label="Type"
              className="w-[216px]"
              readOnly
              value={`${
                container.containerType === ContainerType.dry
                  ? "Dry"
                  : container.containerType === ContainerType.reefer
                  ? "Reefer"
                  : container.containerType === ContainerType.opentop
                  ? "Open Top"
                  : container.containerType === ContainerType.flatrack
                  ? "Flat Rack"
                  : container.containerType === ContainerType.tank
                  ? "Tank"
                  : "Bulk"
              } #${containerIndex + 1}`}
            />
            <NAOutlinedTextField
              label="Container No."
              maxInputLength={14}
              className="w-[216px]"
              value={container.containerNumber}
              handleValueChange={(value) => {
                updateContainerStore(container, "containerNumber", value);
              }}
            />
            <NAOutlinedListBox
              suffixText="ft"
              label="Size"
              className="w-52"
              initialValue={container.containerSize}
              options={["20", "40", "40HC", "45"]}
              onSelection={(size) => {
                updateContainerStore(container, "containerSize", size);
              }}
            />
            <NAOutlinedListBox
              label="S.O.C"
              className="w-24"
              initialValue={container.isSocContainer ? "Y" : "N"}
              options={["Y", "N"]}
              onSelection={(value) => {
                updateContainerStore(
                  container,
                  "isSocContainer",
                  value === "Y"
                );
              }}
            />
          </div>
          <SealTextField
            initialSealData={container.sealData}
            onUpdated={(newSealData) => {
              updateContainerStore(container, "sealData", newSealData);
            }}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex gap-2 flex-1">
            <NAOutlinedNumberField
              value={container.packageQuantity?.toString()}
              readOnly={container.hasCargoManifest}
              label="Package"
              className="w-[216px]"
              maxInputLength={16}
              handleValueChange={(value) => {
                updateContainerStore(container, "packageQuantity", value);
              }}
            />
            <NAOutlinedAutoComplete
              className="w-[536px]"
              readOnly={container.hasCargoManifest}
              itemList={tempPackageList}
              placeholder="Package Type"
              initialValue={container.packageType}
              isAllowOnlyListItems={false}
              showAllonFocus
              onQueryChange={(value) => {
                updateContainerStore(container, "packageType", value);
              }}
              onItemSelection={(value) => {
                updateContainerStore(container, "packageType", value);
              }}
            />
          </div>
          <div className="flex gap-2 ">
            <NAOutlinedNumberField
              label="Weight"
              value={container.packageWeight?.toString() ?? ""}
              readOnly={container.hasCargoManifest}
              maxInputLength={22}
              className="flex-1"
              handleValueChange={(value) => {
                updateContainerStore(container, "packageWeight", value);
              }}
            />
            <NAOutlinedListBox
              initialValue={SIEditContainerStore.weightUnit}
              options={["KGS", "LBS"]}
              className="w-28"
              readOnly={container.hasCargoManifest}
              onSelection={(value) => {
                setSIEditContainerStore((prev) => ({
                  ...prev,
                  weightUnit: value as "KGS" | "LBS",
                }));
              }}
            />
          </div>
          <div className="flex gap-2">
            <NAOutlinedNumberField
              label="Measure"
              className="flex-1"
              maxInputLength={16}
              value={container.packageMeasurement?.toString()}
              readOnly={container.hasCargoManifest}
              handleValueChange={(value) => {
                updateContainerStore(container, "packageMeasurement", value);
              }}
            />
            <NAOutlinedListBox
              initialValue={SIEditContainerStore.measurementUnit}
              options={["CBM", "CBF"]}
              className="w-28"
              readOnly={container.hasCargoManifest}
              onSelection={(value) => {
                setSIEditContainerStore((prev) => ({
                  ...prev,
                  measurementUnit: value as "CBM" | "CBF",
                }));
              }}
            />
          </div>
        </div>

        <Portal selector="#main-container">
          <MdDialog
            open={isWarningRemoveCargoManifestDialogOpen}
            closed={() => setIsWarningRemoveCargoManifestDialogOpen(false)}
          >
            <div slot="headline">
              All input contents of the Cargo Manifest will be discarded.
            </div>
            <div slot="content">Are you sure you want to uncheck?</div>
            <div slot="actions">
              <MdOutlinedButton
                onClick={() => {
                  setIsWarningRemoveCargoManifestDialogOpen(false);
                }}
              >
                Cancel
              </MdOutlinedButton>
              <MdFilledButton
                onClick={() => {
                  updateContainerStore(container, "hasCargoManifest", false);
                  setIsWarningRemoveCargoManifestDialogOpen(false);

                  if (typeKey === "weightUnit" || typeKey === "measurementUnit")
                    return;

                  setSIEditContainerStore((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey].map((c, i) =>
                      i === containerIndex
                        ? {
                            ...c,
                            hasCargoManifest: false,
                            cargoManifest: [],
                          }
                        : c
                    ),
                  }));
                }}
              >
                Yes
              </MdFilledButton>
            </div>
          </MdDialog>
        </Portal>
        <NaToggleButton
          className="w-fit my-0"
          label="Cargo Manifest"
          state={container.hasCargoManifest ? "checked" : "unchecked"}
          onClick={(isChecked) => {
            if (isChecked) {
              setIsWarningRemoveCargoManifestDialogOpen(true);
            } else {
              updateContainerStore(container, "hasCargoManifest", !isChecked);
              if (container.cargoManifest.length === 0) {
                addNewCargoManifestToContainer();
              }
            }
          }}
        />
        {container.hasCargoManifest && (
          <>
            <div className="flex gap-2 flex-1">
              <MdChipSet className="flex-row">
                {
                  // display CargoManifest
                  container.cargoManifest.map((cargo, i) => {
                    return (
                      <div key={cargo.uuid}>
                        <MdFilterChip
                          style={
                            {
                              "--md-filter-chip-selected-container-color":
                                "var(--md-sys-point-color)",
                            } as CSSProperties
                          }
                          label={`Cargo #${i + 1}`}
                          selected={selectedCargoManifestUuid === cargo.uuid}
                          onClick={() => {
                            if (selectedCargoManifestUuid === cargo.uuid) {
                              setSelectedCargoManifestUuid("");
                            } else {
                              setSelectedCargoManifestUuid(cargo.uuid);
                            }
                          }}
                          remove={(e) => {
                            removeCargoManifestFromContainer(cargo.uuid);
                          }}
                          removable
                        />
                      </div>
                    );
                  })
                }
              </MdChipSet>
              <MdOutlinedIconButton
                className="w-8 h-8 min-w-8"
                onClick={() => {
                  addNewCargoManifestToContainer();
                }}
              >
                <Add fontSize="small" />
              </MdOutlinedIconButton>
            </div>
            {container.cargoManifest.find(
              (cm) => cm.uuid === selectedCargoManifestUuid
            ) && (
              <>
                <div className="flex gap-4 flex-1">
                  <div className="flex gap-2 flex-1">
                    <NAOutlinedNumberField
                      label="Package"
                      className="w-[104px]"
                      maxInputLength={16}
                      value={container.cargoManifest
                        .find((cm) => cm.uuid === selectedCargoManifestUuid)
                        ?.packageQuantity?.toString()}
                      handleValueChange={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  packageQuantity: value,
                                }
                              : cm
                          )
                        );
                      }}
                    />
                    <NAOutlinedAutoComplete
                      placeholder="Package"
                      className="w-40"
                      itemList={tempPackageList}
                      initialValue={
                        container.cargoManifest.find(
                          (cm) => cm.uuid === selectedCargoManifestUuid
                        )?.packageType || ""
                      }
                      isAllowOnlyListItems={false}
                      showAllonFocus
                      onQueryChange={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  packageType: value,
                                }
                              : cm
                          )
                        );
                      }}
                      onItemSelection={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  packageType: value,
                                }
                              : cm
                          )
                        );
                      }}
                    />
                    <NAOutlinedNumberField
                      label="Weight"
                      maxInputLength={22}
                      className="w-[104px]"
                      value={container.cargoManifest
                        .find((cm) => cm.uuid === selectedCargoManifestUuid)
                        ?.weight?.toString()}
                      handleValueChange={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  weight: value,
                                }
                              : cm
                          )
                        );
                      }}
                    />
                    <NAOutlinedListBox
                      options={["KGS", "LBS"]}
                      className="w-28"
                      initialValue={SIEditContainerStore.weightUnit}
                      onSelection={(value) => {
                        setSIEditContainerStore((prev) => ({
                          ...prev,
                          weightUnit: value as "KGS" | "LBS",
                        }));
                      }}
                    />
                    <NAOutlinedNumberField
                      label="Measure"
                      className="w-[104px]"
                      maxInputLength={16}
                      value={container.cargoManifest
                        .find((cm) => cm.uuid === selectedCargoManifestUuid)
                        ?.measurement?.toString()}
                      handleValueChange={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  measurement: value,
                                }
                              : cm
                          )
                        );
                      }}
                    />
                    <NAOutlinedListBox
                      options={["CBM", "CBF"]}
                      className="w-28"
                      initialValue={SIEditContainerStore.measurementUnit}
                      onSelection={(value) => {
                        setSIEditContainerStore((prev) => ({
                          ...prev,
                          measurementUnit: value as "CBM" | "CBF",
                        }));
                      }}
                    />
                    <NAOutlinedTextField
                      label="Description of Goods"
                      className="flex-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <NAOutlinedNumberField
                      label="HTS Code(EU, ASIA)"
                      maxInputLength={6}
                      className="w-[184px]"
                      placeholder="Code"
                      hideZeroPlaceholder
                      enableNumberSeparator={false}
                      value={
                        container.cargoManifest.find(
                          (cm) => cm.uuid === selectedCargoManifestUuid
                        )?.commodityCode.hisCodeEUASIA || ""
                      }
                      handleValueChange={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  commodityCode: {
                                    ...cm.commodityCode,
                                    hisCodeEUASIA: value,
                                  },
                                }
                              : cm
                          )
                        );
                      }}
                    />
                    <NAOutlinedNumberField
                      label="HTS Code(U.S.)"
                      maxInputLength={6}
                      placeholder="Code"
                      className="w-[136px]"
                      hideZeroPlaceholder
                      enableNumberSeparator={false}
                      value={
                        container.cargoManifest.find(
                          (cm) => cm.uuid === selectedCargoManifestUuid
                        )?.commodityCode.htsCodeUS || ""
                      }
                      handleValueChange={(value) => {
                        updateContainerStore(
                          container,
                          "cargoManifest",
                          container.cargoManifest.map((cm) =>
                            cm.uuid === selectedCargoManifestUuid
                              ? {
                                  ...cm,
                                  commodityCode: {
                                    ...cm.commodityCode,
                                    htsCodeUS: value,
                                  },
                                }
                              : cm
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <MdOutlinedIconButton
        className={isLastItem ? "mt-8" : "mt-16"}
        onClick={() => {
          // delete Container
          if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

          setSIEditContainerStore((prev) => ({
            ...prev,
            [typeKey]: prev[typeKey].filter((c, i) => i !== containerIndex),
          }));
        }}
      >
        <DeleteOutline fontSize="small" />
      </MdOutlinedIconButton>
    </div>
  );
}
