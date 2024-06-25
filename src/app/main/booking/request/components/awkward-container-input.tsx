import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { ContainerState } from "@/app/store/booking.store";
import { MdOutlinedTextField } from "@/app/util/md3";
import {
  ContainerType,
  FlatRackContainerInformationType,
  OpenTopContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { useSetRecoilState } from "recoil";

const AwkwardContainerInput = ({
  container,
  type,
}: {
  container: OpenTopContainerInformationType | FlatRackContainerInformationType;
  type: ContainerType.opentop | ContainerType.flatrack;
}) => {
  const typeKey = type.toString().toLowerCase();
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <>
      <NaToggleButton
        className="w-fit"
        label="Awkward Cargo"
        state={container.isAwkward ? "checked" : "unchecked"}
        onClick={() => {
          setContainerInformation((prev) => ({
            ...prev,
            [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
              c.uuid === container.uuid
                ? {
                    ...c,
                    isAwkward: !container.isAwkward,
                  }
                : c
            ),
          }));
        }}
      />
      {container.isAwkward && (
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <NAOutlinedNumberField
                className="w-32 min-w-32"
                label="Package"
                maxInputLength={9}
                value={container.awkward.package?.toString() ?? ""}
                handleValueChange={(value) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              package: value,
                            },
                          }
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
                initialValue={container.awkward.packageType}
                onSelection={(packageType) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              packageType: packageType as any,
                            },
                          }
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
                maxInputLength={15}
                value={container.awkward.grossWeight?.toString()}
                handleValueChange={(value) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              grossWeight: value,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
              <NAOutlinedListBox
                className="w-[120px] min-w-[120px]"
                options={["KGS", "LBS"]}
                initialValue={container.awkward.grossWeightUnit}
                onSelection={(unit) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              grossWeightUnit: unit as any,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
            </div>
            <div className="flex gap-2">
              <NAOutlinedNumberField
                className="w-[120px] min-w-[120px]"
                label="Net Weight"
                maxInputLength={15}
                value={container.awkward.netWeight?.toString()}
                handleValueChange={(value) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              netWeight: value,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
              <NAOutlinedListBox
                className="w-[120px] min-w-[120px]"
                options={["KGS", "LBS"]}
                initialValue={container.awkward.netWeightUnit}
                onSelection={(unit) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              netWeightUnit: unit as any,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <MdOutlinedTextField
              className="flex-1"
              label="Commodity"
              value={container.awkward.commodity.description}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                    c.uuid === container.uuid &&
                    (c.type === ContainerType.opentop ||
                      c.type === ContainerType.flatrack)
                      ? {
                          ...c,
                          awkward: {
                            ...c.awkward,
                            commodity: {
                              ...c.awkward.commodity,
                              description: value,
                            },
                          },
                        }
                      : c
                  ),
                }));
              }}
            />
            <div className="flex gap-2">
              <NAOutlinedNumberField
                className="w-28 min-w-28"
                label="Length"
                maxInputLength={5}
                value={container.awkward.length?.toString()}
                handleValueChange={(value) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              length: value,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
              <NAOutlinedNumberField
                className="w-28 min-w-28"
                label="Width"
                maxInputLength={5}
                value={container.awkward.width?.toString()}
                handleValueChange={(value) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              width: value,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
              <NAOutlinedNumberField
                className="w-28 min-w-28"
                label="Height"
                maxInputLength={5}
                value={container.awkward.height?.toString()}
                handleValueChange={(value) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              height: value,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
              <NAOutlinedListBox
                className="w-28 min-w-28"
                options={["CM", "INCH"]}
                initialValue={container.awkward.unit}
                onSelection={(unit) => {
                  setContainerInformation((prev) => ({
                    ...prev,
                    [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                      c.uuid === container.uuid &&
                      (c.type === ContainerType.opentop ||
                        c.type === ContainerType.flatrack)
                        ? {
                            ...c,
                            awkward: {
                              ...c.awkward,
                              unit: unit as any,
                            },
                          }
                        : c
                    ),
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <MdOutlinedTextField
              className="flex-1"
              label="Remark"
              value={container.awkward.remark}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                    c.uuid === container.uuid &&
                    (c.type === ContainerType.opentop ||
                      c.type === ContainerType.flatrack)
                      ? {
                          ...c,
                          awkward: {
                            ...c.awkward,
                            remark: value,
                          },
                        }
                      : c
                  ),
                }));
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AwkwardContainerInput;
