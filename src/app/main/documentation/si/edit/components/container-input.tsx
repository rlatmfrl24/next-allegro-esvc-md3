import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import { SIEditContainerState } from "@/app/store/si.store";
import {
  MdChipSet,
  MdFilterChip,
  MdIconButton,
  MdOutlinedIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { SIContainerInputProps, SealKind } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Add, DeleteOutline } from "@mui/icons-material";
import { set } from "lodash";
import { useMemo, useState } from "react";
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
  const [SIEditContainerStore, setSIEditContainerStore] =
    useRecoilState(SIEditContainerState);

  const [selectedCargoManifestUuid, setSelectedCargoManifestUuid] =
    useState<string>("");

  const typeKey =
    container.containerType.toLowerCase() as keyof typeof SIEditContainerStore;

  const tempPackageList = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) =>
      faker.commerce.productMaterial()
    );
  }, []);

  function getLastIndexCargoManifest(container: SIContainerInputProps) {
    return container.cargoManifest.reduce((prev, current) => {
      return prev > current.initialIndex ? prev : current.initialIndex;
    }, 0);
  }

  function addNewCargoManifestToContainer() {
    // add empty CarogManifest to Container
    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, i) =>
        i === containerIndex
          ? {
              ...c,
              cargoManifest: [
                ...c.cargoManifest,
                {
                  uuid: faker.string.uuid(),
                  initialIndex: getLastIndexCargoManifest(container) + 1,
                  cargoInformation: {
                    wpmStatus: "N",
                    combo: "",
                    description: "",
                  },
                  commodityCode: {
                    htsCodeUS: "",
                    hisCodeEUASIA: "",
                    ncmCode: "",
                  },
                },
              ],
            }
          : c
      ),
    }));
  }

  function removeCargoManifestFromContainer(uuid: string) {
    // delete CargoManifest from Container by uuid
    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, j) => {
        if (c.cargoManifest.length === 1) {
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
    setSIEditContainerStore((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey].map((c, j) =>
        c.uuid === container.uuid ? { ...c, [targetProps]: newData } : c
      ),
    }));
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      {!isLastItem && (
        <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
      )}
      <div className="flex gap-2 items-start">
        <NAOutlinedTextField
          label="Container No."
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
          options={["20", "40", "45", "53"]}
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
            setSIEditContainerStore((prev) => ({
              ...prev,
              [typeKey]: prev[typeKey].filter((c, i) => i !== containerIndex),
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
            updateContainerStore(container, "firstSeal", {
              ...container.firstSeal,
              kind: SealKind[value as keyof typeof SealKind],
            });
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
            updateContainerStore(container, "firstSeal", {
              ...container.firstSeal,
              type: value === "Merchanical Seal" ? "merchanical" : "electronic",
            });
          }}
        />
        <NAOutlinedTextField
          value={container.firstSeal.description}
          placeholder="Seal No. 01"
          className="flex-1"
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
          label="Package"
          className="flex-1"
          options={tempPackageList}
          initialValue={container.packageType}
          onSelection={(value) => {
            updateContainerStore(container, "packageType", value);
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

            updateContainerStore(container, "packageQuantity", intValue);
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

              updateContainerStore(container, "packageWeight", intValue);
            }}
          />
          <NAOutlinedListBox
            initialValue={container.pacakgeWeightUnit}
            options={["KGS", "LBS"]}
            onSelection={(value) => {
              updateContainerStore(container, "pacakgeWeightUnit", value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <MdOutlinedTextField
            label="Measure"
            value={container.packageMeasurement.toString()}
            className="text-right"
            onBlur={(e) => {
              e.target.value = container.packageMeasurement.toString();
            }}
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const intValue = parseInt(value);
              if (isNaN(intValue)) return;

              updateContainerStore(container, "packageMeasurement", intValue);
            }}
          />
          <NAOutlinedListBox
            initialValue={container.packageMeasurementUnit}
            options={["CBM", "CBF"]}
            onSelection={(value) => {
              updateContainerStore(container, "packageMeasurementUnit", value);
            }}
          />
        </div>
      </div>
      <NaToggleButton
        className="w-fit"
        label="Cargo Manifest"
        state={container.hasCargoManifest ? "checked" : "unchecked"}
        onClick={(isChecked) => {
          updateContainerStore(container, "hasCargoManifest", !isChecked);
          if (container.cargoManifest.length === 0) {
            addNewCargoManifestToContainer();
          }
          setSelectedCargoManifestUuid("");
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
            <MdChipSet>
              {
                // display CargoManifest
                container.cargoManifest.map((cargo, i) => {
                  return (
                    <MdFilterChip
                      key={cargo.uuid}
                      label={`Cargo #${cargo.initialIndex}`}
                      selected={selectedCargoManifestUuid === cargo.uuid}
                      onClick={() => {
                        if (selectedCargoManifestUuid === cargo.uuid) {
                          setSelectedCargoManifestUuid("");
                        } else {
                          setSelectedCargoManifestUuid(cargo.uuid);
                        }
                      }}
                      handleTrailingActionFocus={(e) => {
                        removeCargoManifestFromContainer(cargo.uuid);
                      }}
                      removable
                    />
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
              <div className="flex gap-2">
                <NAOutlinedListBox
                  options={["Y", "N", "N/A"]}
                  initialValue={
                    container.cargoManifest.find(
                      (cm) => cm.uuid === selectedCargoManifestUuid
                    )?.cargoInformation.wpmStatus || "N/A"
                  }
                  onSelection={(value) => {
                    updateContainerStore(
                      container,
                      "cargoManifest",
                      container.cargoManifest.map((cm) =>
                        cm.uuid === selectedCargoManifestUuid
                          ? {
                              ...cm,
                              cargoInformation: {
                                ...cm.cargoInformation,
                                wpmStatus: value,
                              },
                            }
                          : cm
                      )
                    );
                  }}
                />
                <NAOutlinedTextField
                  label="Combo"
                  value={
                    container.cargoManifest.find(
                      (cm) => cm.uuid === selectedCargoManifestUuid
                    )?.cargoInformation.combo || ""
                  }
                  handleValueChange={(value) => {
                    updateContainerStore(
                      container,
                      "cargoManifest",
                      container.cargoManifest.map((cm) =>
                        cm.uuid === selectedCargoManifestUuid
                          ? {
                              ...cm,
                              cargoInformation: {
                                ...cm.cargoInformation,
                                combo: value,
                              },
                            }
                          : cm
                      )
                    );
                  }}
                />
                <NAOutlinedTextField
                  className="flex-1"
                  placeholder="BULK,LIQUEFIED GAS(ABNORMAL TEMPERATURE/PRESSURE)"
                  value={
                    container.cargoManifest.find(
                      (cm) => cm.uuid === selectedCargoManifestUuid
                    )?.cargoInformation.description || ""
                  }
                  handleValueChange={(value) => {
                    updateContainerStore(
                      container,
                      "cargoManifest",
                      container.cargoManifest.map((cm) =>
                        cm.uuid === selectedCargoManifestUuid
                          ? {
                              ...cm,
                              cargoInformation: {
                                ...cm.cargoInformation,
                                description: value,
                              },
                            }
                          : cm
                      )
                    );
                  }}
                />
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
                <NAOutlinedTextField
                  label="HTS Code(U.S.)"
                  placeholder="Code"
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
                <NAOutlinedTextField
                  label="HTS Code(EU, ASIA)"
                  placeholder="Code"
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
                <NAOutlinedTextField
                  label="NCM Code(Brazil)"
                  placeholder="Code"
                  value={
                    container.cargoManifest.find(
                      (cm) => cm.uuid === selectedCargoManifestUuid
                    )?.commodityCode.ncmCode || ""
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
                                ncmCode: value,
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
