import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import NaToggleButton from "@/app/components/na-toggle-button";
import { ContainerState } from "@/app/store/booking.store";
import {
  ContainerInformationType,
  ContainerType,
} from "@/app/util/typeDef/booking";
import {
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilterChip,
  MdIcon,
  MdOutlinedButton,
  MdOutlinedIconButton,
} from "@/app/util/md3";
import { Add } from "@mui/icons-material";
import { faker } from "@faker-js/faker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

const DangerousCargoInput = ({
  container,
  type,
  showRequired = true,
}: {
  container: ContainerInformationType;
  type: ContainerType;
  showRequired?: boolean;
}) => {
  const typeKey = type.toString().toLowerCase();
  const setContainerInformation = useSetRecoilState(ContainerState);
  const [selectedDangerousCargo, setSelectedDangerousCargo] = useState("");
  const [isResetConfirmDialogOpen, setIsResetConfirmDialogOpen] =
    useState(false);

  useEffect(() => {
    if (container.dangerousCargoInformation.length === 0) {
      setSelectedDangerousCargo("");
    }
  }, [container.dangerousCargoInformation.length]);

  function AddDangerousCargo() {
    const newDangerousCargo = {
      uuid: faker.string.uuid(),
      unNumber: "",
      class: "",
      flashPoint: "",
      packingGroup: "None",
      properShippingName: "",
    };

    setContainerInformation((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
        c.uuid === container.uuid && c.type !== ContainerType.bulk
          ? {
              ...c,
              dangerousCargoInformation: [
                ...c.dangerousCargoInformation,
                newDangerousCargo,
              ],
            }
          : c
      ),
    }));

    setSelectedDangerousCargo(newDangerousCargo.uuid);
  }

  function RemoveDangerousCargo(uuid: string) {
    setContainerInformation((prev) => ({
      ...prev,
      [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
        c.uuid === container.uuid && c.type !== ContainerType.bulk
          ? {
              ...c,
              dangerousCargoInformation: c.dangerousCargoInformation.filter(
                (dci) => dci.uuid !== uuid
              ),
            }
          : c
      ),
    }));

    if (selectedDangerousCargo === uuid) {
      setSelectedDangerousCargo("");
    }

    if (container.dangerousCargoInformation.length === 1) {
      setContainerInformation((prev) => ({
        ...prev,
        [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
          c.uuid === container.uuid && c.type !== ContainerType.bulk
            ? { ...c, isDangerous: false }
            : c
        ),
      }));
    }
  }

  return (
    <>
      <MdDialog
        open={isResetConfirmDialogOpen}
        closed={() => setIsResetConfirmDialogOpen(false)}
      >
        <div slot="headline">
          All input contents of the Cargo Manifest will be discarded.
        </div>
        <div slot="content">Are you sure you want to uncheck?</div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              setIsResetConfirmDialogOpen(false);
            }}
          >
            Cancel
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              setIsResetConfirmDialogOpen(false);
              setContainerInformation((prev) => ({
                ...prev,
                [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                  c.uuid === container.uuid && c.type !== ContainerType.bulk
                    ? {
                        ...c,
                        isDangerous: !c.isDangerous,
                        dangerousCargoInformation: [],
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
      <NaToggleButton
        className="w-fit my-0"
        label="Dangerous Cargo"
        state={container.isDangerous ? "checked" : "unchecked"}
        onClick={() => {
          if (!container.isDangerous) {
            AddDangerousCargo();
            setContainerInformation((prev) => ({
              ...prev,
              [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                c.uuid === container.uuid && c.type !== ContainerType.bulk
                  ? { ...c, isDangerous: !c.isDangerous }
                  : c
              ),
            }));
          } else {
            setIsResetConfirmDialogOpen(true);
          }
        }}
      />
      {container.isDangerous && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <MdOutlinedIconButton
              className="w-8 h-8 min-w-8"
              onClick={() => {
                AddDangerousCargo();
              }}
            >
              <MdIcon>
                <Add />
              </MdIcon>
            </MdOutlinedIconButton>

            <MdChipSet className="flex flex-row">
              {container.dangerousCargoInformation.map((dci, index) => (
                <MdFilterChip
                  key={dci.uuid}
                  removable
                  label={`Dangerous Cargo #` + (index + 1)}
                  selected={selectedDangerousCargo === dci.uuid}
                  onClick={() =>
                    selectedDangerousCargo === dci.uuid
                      ? setSelectedDangerousCargo("")
                      : setSelectedDangerousCargo(dci.uuid)
                  }
                  remove={() => RemoveDangerousCargo(dci.uuid)}
                />
              ))}
            </MdChipSet>
          </div>
          <div className="flex gap-4">
            {selectedDangerousCargo !== "" && (
              <>
                <div className="flex gap-2">
                  <NAOutlinedNumberField
                    label="UN No."
                    required={showRequired}
                    hideZeroPlaceholder
                    enableNumberSeparator={false}
                    maxInputLength={4}
                    className="w-[136px]"
                    value={
                      container.dangerousCargoInformation.find(
                        (dci) => dci.uuid === selectedDangerousCargo
                      )?.unNumber
                    }
                    handleValueChange={(value) => {
                      setContainerInformation((prev) => ({
                        ...prev,
                        [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                          c.uuid === container.uuid &&
                          c.type !== ContainerType.bulk
                            ? {
                                ...c,
                                dangerousCargoInformation:
                                  c.dangerousCargoInformation.map((dci) =>
                                    dci.uuid === selectedDangerousCargo
                                      ? { ...dci, unNumber: value }
                                      : dci
                                  ),
                              }
                            : c
                        ),
                      }));
                    }}
                  />
                  <NAOutlinedNumberField
                    label="Class"
                    required={showRequired}
                    maxInputLength={3}
                    hideZeroPlaceholder
                    className="w-[136px]"
                    value={
                      container.dangerousCargoInformation.find(
                        (dci) => dci.uuid === selectedDangerousCargo
                      )?.class
                    }
                    handleValueChange={(value) =>
                      setContainerInformation((prev) => ({
                        ...prev,
                        [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                          c.uuid === container.uuid &&
                          c.type !== ContainerType.bulk
                            ? {
                                ...c,
                                dangerousCargoInformation:
                                  c.dangerousCargoInformation.map((dci) =>
                                    dci.uuid === selectedDangerousCargo
                                      ? { ...dci, class: value }
                                      : dci
                                  ),
                              }
                            : c
                        ),
                      }))
                    }
                  />
                  <NAOutlinedTextField
                    label="Flash Point"
                    required={showRequired}
                    disabled
                    className="w-[136px]"
                    suffixText="°C"
                    enableClearButton={false}
                    value={
                      container.dangerousCargoInformation.find(
                        (dci) => dci.uuid === selectedDangerousCargo
                      )?.flashPoint
                    }
                    handleValueChange={(value) =>
                      setContainerInformation((prev) => ({
                        ...prev,
                        [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                          c.uuid === container.uuid &&
                          c.type !== ContainerType.bulk
                            ? {
                                ...c,
                                dangerousCargoInformation:
                                  c.dangerousCargoInformation.map((dci) =>
                                    dci.uuid === selectedDangerousCargo
                                      ? { ...dci, flashPoint: value }
                                      : dci
                                  ),
                              }
                            : c
                        ),
                      }))
                    }
                  />
                </div>
                <NAOutlinedListBox
                  label="Packing Group"
                  className="w-[232px]"
                  options={["None", "I", "II", "III"]}
                  initialValue={
                    container.dangerousCargoInformation.find(
                      (dci) => dci.uuid === selectedDangerousCargo
                    )?.packingGroup
                  }
                  onSelection={(value) =>
                    setContainerInformation((prev) => ({
                      ...prev,
                      [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                        c.uuid === container.uuid &&
                        c.type !== ContainerType.bulk
                          ? {
                              ...c,
                              dangerousCargoInformation:
                                c.dangerousCargoInformation.map((dci) =>
                                  dci.uuid === selectedDangerousCargo
                                    ? { ...dci, packingGroup: value }
                                    : dci
                                ),
                            }
                          : c
                      ),
                    }))
                  }
                />
                <NAOutlinedTextField
                  label="Proper Shipping Name"
                  className="flex-1"
                  enableClearButton={false}
                  value={
                    container.dangerousCargoInformation.find(
                      (dci) => dci.uuid === selectedDangerousCargo
                    )?.properShippingName
                  }
                  handleValueChange={(value) =>
                    setContainerInformation((prev) => ({
                      ...prev,
                      [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                        c.uuid === container.uuid &&
                        c.type !== ContainerType.bulk
                          ? {
                              ...c,
                              dangerousCargoInformation:
                                c.dangerousCargoInformation.map((dci) =>
                                  dci.uuid === selectedDangerousCargo
                                    ? { ...dci, properShippingName: value }
                                    : dci
                                ),
                            }
                          : c
                      ),
                    }))
                  }
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DangerousCargoInput;
