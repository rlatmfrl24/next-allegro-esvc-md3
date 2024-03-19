import { useRef } from "react";
import { useSetRecoilState } from "recoil";

import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import { ContainerState } from "@/app/store/booking.store";
import {
  ContainerInformationType,
  ContainerType,
} from "@/app/util/typeDef/boooking";
import {
  MdChipSet,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";

import { Upload } from "@mui/icons-material";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";

const DangerousCargoInput = ({
  container,
  type,
}: {
  container: ContainerInformationType;
  type: ContainerType;
}) => {
  const typeKey = type.toString().toLowerCase();
  const setContainerInformation = useSetRecoilState(ContainerState);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const mergedFiles = files.concat(
        container.dangerousCargoInformation.dangerousCargoCertificate
      );
      setContainerInformation((prev) => ({
        ...prev,
        [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
          c.uuid === container.uuid && c.type !== ContainerType.bulk
            ? {
                ...c,
                dangerousCargoInformation: {
                  ...c.dangerousCargoInformation,
                  dangerousCargoCertificate: mergedFiles,
                },
              }
            : c
        ),
      }));
    }
  };
  const handleClick = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <NaToggleButton
        className="w-fit"
        label="Dangerous Cargo"
        state={container.isDangerous ? "checked" : "unchecked"}
        onClick={() => {
          setContainerInformation((prev) => ({
            ...prev,
            [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
              c.uuid === container.uuid && c.type !== ContainerType.bulk
                ? { ...c, isDangerous: !c.isDangerous }
                : c
            ),
          }));
        }}
      />
      {container.isDangerous && (
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <MdOutlinedTextField
              label="UN No."
              value={container.dangerousCargoInformation.unNumber}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                    c.uuid === container.uuid && c.type !== ContainerType.bulk
                      ? {
                          ...c,
                          dangerousCargoInformation: {
                            ...c.dangerousCargoInformation,
                            unNumber: value,
                          },
                        }
                      : c
                  ),
                }));
              }}
            />
            <MdOutlinedTextField
              label="Class"
              value={container.dangerousCargoInformation.class}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                    c.uuid === container.uuid && c.type !== ContainerType.bulk
                      ? {
                          ...c,
                          dangerousCargoInformation: {
                            ...c.dangerousCargoInformation,
                            class: value,
                          },
                        }
                      : c
                  ),
                }));
              }}
            />

            <MdOutlinedTextField
              label="Flash Point"
              disabled
              value={container.dangerousCargoInformation.flashPoint}
            />
            <NAOutlinedListBox
              label="Package Group"
              options={["None", "I", "II", "III"]}
              initialValue={container.dangerousCargoInformation.packingGroup}
              onSelection={(value) => {
                setContainerInformation((prev) => ({
                  ...prev,
                  [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                    c.uuid === container.uuid && c.type !== ContainerType.bulk
                      ? {
                          ...c,
                          dangerousCargoInformation: {
                            ...c.dangerousCargoInformation,
                            packingGroup: value as any,
                          },
                        }
                      : c
                  ),
                }));
              }}
            />
            <MdOutlinedTextField
              label="Proper Shipping Name"
              value={container.dangerousCargoInformation.properShippingName}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  [typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
                    c.uuid === container.uuid && c.type !== ContainerType.bulk
                      ? {
                          ...c,
                          dangerousCargoInformation: {
                            ...c.dangerousCargoInformation,
                            properShippingName: value,
                          },
                        }
                      : c
                  ),
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <MdTypography variant="title" size="small">
              Dangerous Cargo Certificate
            </MdTypography>
            <div className="flex items-center gap-4">
              <MdOutlinedButton onClick={handleClick}>
                <div slot="icon">
                  <Upload fontSize="small" />
                </div>
                File Upload
              </MdOutlinedButton>
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                multiple
                onInput={handleFileChange}
              />
              <MdChipSet>
                {container.dangerousCargoInformation.dangerousCargoCertificate.map(
                  (file, index) => (
                    <MdInputChip
                      key={file.name}
                      label={file.name}
                      selected
                      handleTrailingActionFocus={() => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          [typeKey]: prev[typeKey as keyof typeof prev].map(
                            (c) =>
                              c.uuid === container.uuid &&
                              c.type !== ContainerType.bulk
                                ? {
                                    ...c,
                                    dangerousCargoInformation: {
                                      ...c.dangerousCargoInformation,
                                      dangerousCargoCertificate:
                                        c.dangerousCargoInformation.dangerousCargoCertificate.filter(
                                          (item) => item.name !== file.name
                                        ),
                                    },
                                  }
                                : c
                          ),
                        }));
                      }}
                    />
                  )
                )}
              </MdChipSet>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DangerousCargoInput;
