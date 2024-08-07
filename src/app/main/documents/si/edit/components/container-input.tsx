import LabelChip from "@/app/components/label-chip";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import { SIEditContainerState } from "@/app/store/si.store";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilterChip,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/booking";
import {
  CargoManifestType,
  SIContainerInputProps,
  SealKind,
} from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
  Add,
  DeleteOutline,
  TableChart,
  TextFields,
} from "@mui/icons-material";
import { set } from "lodash";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

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
    <div className="mt-6 flex flex-col gap-4">
      {!isLastItem && (
        <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
      )}
      <LabelChip
        label={`${
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
        className="bg-surfaceContainerHigh text-onSurface w-fit"
      />
      <div className="flex gap-2 items-start">
        <NAOutlinedTextField
          label="Container No."
          maxInputLength={14}
          className="w-52"
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
          className="w-32"
          initialValue={container.isSocContainer ? "Y" : "N"}
          options={["Y", "N"]}
          onSelection={(value) => {
            updateContainerStore(container, "isSocContainer", value === "Y");
          }}
        />
        <MdIconButton
          className="mt-2"
          onClick={() => {
            // delete Container
            if (typeKey === "weightUnit" || typeKey === "measurementUnit")
              return;

            setSIEditContainerStore((prev) => ({
              ...prev,
              [typeKey]: prev[typeKey].filter((c, i) => i !== containerIndex),
            }));
          }}
        >
          <DeleteOutline fontSize="small" />
        </MdIconButton>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <NAOutlinedListBox
            label="Seal Kind"
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
              updateContainerStore(container, "firstSeal", {
                ...container.firstSeal,
                kind: SealKind[value as keyof typeof SealKind],
              });
            }}
          />
          <NAOutlinedListBox
            label="Seal Type"
            options={["Merchanical Seal", "Electronic Seal"]}
            className="w-52"
            initialValue={
              container.firstSeal.type === "merchanical"
                ? "Merchanical Seal"
                : "Electronic Seal"
            }
            onSelection={(value) => {
              updateContainerStore(container, "firstSeal", {
                ...container.firstSeal,
                type:
                  value === "Merchanical Seal" ? "merchanical" : "electronic",
              });
            }}
          />
          <NAOutlinedTextField
            value={container.firstSeal.description}
            placeholder="Seal No. 01"
            className="flex-1"
            maxInputLength={20}
            handleValueChange={(value) => {
              updateContainerStore(container, "firstSeal", {
                ...container.firstSeal,
                description: value,
              });
            }}
          />
        </div>
        <div className="flex gap-2">
          <NAOutlinedListBox
            label="Seal Kind"
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
            initialValue={SealKind[container.secondSeal.kind]}
            onSelection={(value) => {
              updateContainerStore(container, "secondSeal", {
                ...container.secondSeal,
                kind: SealKind[value as keyof typeof SealKind],
              });
            }}
          />
          <NAOutlinedListBox
            label="Seal Type"
            options={["Merchanical Seal", "Electronic Seal"]}
            className="w-52"
            initialValue={
              container.secondSeal.type === "merchanical"
                ? "Merchanical Seal"
                : "Electronic Seal"
            }
            onSelection={(value) => {
              updateContainerStore(container, "secondSeal", {
                ...container.secondSeal,
                type:
                  value === "Merchanical Seal" ? "merchanical" : "electronic",
              });
            }}
          />
          <NAOutlinedTextField
            value={container.secondSeal.description}
            placeholder="Seal No. 02"
            className="flex-1"
            maxInputLength={20}
            handleValueChange={(value) => {
              updateContainerStore(container, "secondSeal", {
                ...container.secondSeal,
                description: value,
              });
            }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2 flex-1">
          <NAOutlinedNumberField
            value={container.packageQuantity?.toString()}
            readOnly={container.hasCargoManifest}
            label="Package"
            maxInputLength={16}
            handleValueChange={(value) => {
              updateContainerStore(container, "packageQuantity", value);
            }}
          />
          <NAOutlinedAutoComplete
            className="flex-1"
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
            className="w-48"
            handleValueChange={(value) => {
              updateContainerStore(container, "packageWeight", value);
            }}
          />
          <NAOutlinedListBox
            initialValue={SIEditContainerStore.weightUnit}
            options={["KGS", "LBS"]}
            className="w-32"
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
            className="w-48"
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
            className="w-32"
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
        className="w-fit"
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
          <div className="flex gap-2">
            <MdOutlinedIconButton
              className="w-8 h-8 min-w-8"
              onClick={() => {
                addNewCargoManifestToContainer();
              }}
            >
              <Add fontSize="small" />
            </MdOutlinedIconButton>
            <MdChipSet className="flex-row-reverse">
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
          </div>
          {container.cargoManifest.find(
            (cm) => cm.uuid === selectedCargoManifestUuid
          ) && (
            <>
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="text-primary"
              >
                Cargo Information
              </MdTypography>
              <div className="flex gap-4">
                <div className="flex gap-2 flex-1">
                  <NAOutlinedNumberField
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
                    label="Package"
                    className="flex-1"
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
                </div>
                <div className="flex gap-2">
                  <NAOutlinedNumberField
                    label="Weight"
                    maxInputLength={22}
                    className="w-48"
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
                    className="w-32"
                    initialValue={SIEditContainerStore.weightUnit}
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
                    className="w-48"
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
                    className="w-32"
                    initialValue={SIEditContainerStore.measurementUnit}
                    onSelection={(value) => {
                      setSIEditContainerStore((prev) => ({
                        ...prev,
                        measurementUnit: value as "CBM" | "CBF",
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <NAOutlinedTextField
                  label="Description of Goods"
                  className="flex-1"
                />
                <NAOutlinedNumberField
                  label="HTS Code(U.S.)"
                  maxInputLength={6}
                  placeholder="Code"
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
                <NAOutlinedNumberField
                  label="HTS Code(EU, ASIA)"
                  maxInputLength={6}
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
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
