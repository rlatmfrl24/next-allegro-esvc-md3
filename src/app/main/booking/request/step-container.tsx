import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  ContainerState,
} from "@/app/store/booking-request.store";
import {
  MdChipSet,
  MdFilledButton,
  MdFilledTonalIconButton,
  MdIconButton,
  MdInputChip,
  MdOutlinedButton,
  MdOutlinedSelect,
  MdOutlinedTextField,
  MdRippleEffect,
  MdSelectOption,
} from "@/app/util/md3";
import { useRecoilState, useSetRecoilState } from "recoil";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  ContainerInformationType,
  ContainerType,
} from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import {
  Add,
  ArrowDropDown,
  Delete,
  DeleteOutline,
  EggTwoTone,
  Upload,
  UploadFileOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import NaToggleButton from "@/app/components/na-toggle-button";

export default function ContainerStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [typeSelections, setTypeSelections] = useState<ContainerType[]>([]);
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);

  const moveToAdditionalInformationStep = () => {
    setBookingRequestStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isSelected: false,
      },
      additionalInformation: {
        ...prev.additionalInformation,
        isSelected: true,
      },
    }));
  };

  function handleTypeSelections(type: ContainerType) {
    if (typeSelections.includes(type)) {
      setTypeSelections((prev) => prev.filter((t) => t !== type));
    } else {
      setTypeSelections((prev) => [...prev, type]);
    }

    const typeKey = type.toLowerCase() as keyof typeof containerInformation;

    if (containerInformation[typeKey].length === 0) {
      setContainerInformation((prev) => ({
        ...prev,
        [typeKey]: [
          ...prev[type.toLowerCase() as keyof typeof prev],
          {
            uuid: faker.string.uuid(),
            size: "20ft",
            type: type,
            quantity: 0,
            soc: 0,
            isDangerous: false,
            dangerousCargoInformation: {
              unNumber: "",
              class: "",
              flashPoint: "",
              packingGroup: "",
              properShippingName: "",
              dangerousCargoCertificate: [],
            },
          } as ContainerInformationType,
        ],
      }));
    }
  }

  useEffect(() => {
    console.log("containerInformation", containerInformation);
  }, [containerInformation]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large">
        Container
      </MdTypography>
      <div className="flex gap-4 mt-6">
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.dry)}
          onClick={() => {
            handleTypeSelections(ContainerType.dry);
          }}
          title="Dry"
          count={
            containerInformation.dry.length === 0
              ? undefined
              : containerInformation.dry.length
          }
        />
        <ContainerToggleButton
          image={<ReeferContainerImage />}
          isSelected={typeSelections.includes(ContainerType.reefer)}
          onClick={() => {
            handleTypeSelections(ContainerType.reefer);
          }}
          title="Reefer"
          count={
            containerInformation.reefer.length === 0
              ? undefined
              : containerInformation.reefer.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.opentop)}
          onClick={() => {
            handleTypeSelections(ContainerType.opentop);
          }}
          title="Open Top"
          count={
            containerInformation.opentop.length === 0
              ? undefined
              : containerInformation.opentop.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.flatrack)}
          onClick={() => {
            handleTypeSelections(ContainerType.flatrack);
          }}
          title="Flat Rack"
          count={
            containerInformation.flatrack.length === 0
              ? undefined
              : containerInformation.flatrack.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.tank)}
          onClick={() => {
            handleTypeSelections(ContainerType.tank);
          }}
          title="Tank"
          count={
            containerInformation.tank.length === 0
              ? undefined
              : containerInformation.tank.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.bulk)}
          onClick={() => {
            handleTypeSelections(ContainerType.bulk);
          }}
          title="Bulk"
          count={
            containerInformation.bulk.length === 0
              ? undefined
              : containerInformation.bulk.length
          }
        />
      </div>
      <div className="flex flex-col w-full mt-6">
        <DryContainerInputContainer list={containerInformation.dry} />
      </div>
      <div className="flex-1 flex items-end justify-end">
        <MdFilledButton onClick={() => moveToAdditionalInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}

const ContainerToggleButton = ({
  image,
  onClick,
  isSelected,
  title,
  count,
}: {
  onClick: () => void;
  image: React.ReactNode;
  isSelected: boolean;
  title: string;
  count?: number;
}) => {
  return (
    <div
      className={`relative flex-1 flex flex-col gap-1 justify-center items-center px-7 py-4 rounded-lg border ${
        isSelected ? "border-primary bg-[#19658414]" : "border-outlineVariant"
      } cursor-pointer`}
      onClick={onClick}
    >
      <MdRippleEffect />
      {image}
      <MdTypography variant="body" size="large" prominent>
        {title}
      </MdTypography>
      {count && count > 0 && (
        <MdTypography
          variant="body"
          size="medium"
          tag="div"
          className={`absolute top-2 right-2 text-white rounded-full w-6 h-6 flex justify-center items-center ${
            isSelected ? "bg-primary" : "bg-secondary"
          }`}
        >
          {count}
        </MdTypography>
      )}
    </div>
  );
};

const DryContainerInputContainer = ({
  list,
}: {
  list: ContainerInformationType[];
}) => {
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex items-center gap-2`}>
            <div className="w-1 h-4 bg-primary"></div>
            <MdTypography variant="body" size="large" prominent>
              Dry Container
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
                  dry: [
                    ...prev.dry,
                    {
                      uuid: faker.string.uuid(),
                      size: "20ft",
                      type: ContainerType.dry,
                      quantity: 0,
                      soc: 0,
                      isDangerous: false,
                      dangerousCargoInformation: {
                        unNumber: "",
                        class: "",
                        flashPoint: "",
                        packingGroup: "",
                        properShippingName: "",
                        dangerousCargoCertificate: [],
                      },
                    },
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

                  <div className="flex gap-4 items-start">
                    <MdOutlinedSelect
                      label="Size"
                      className="text-right"
                      selectedIndex={
                        container.size === "20ft"
                          ? 0
                          : container.size === "40ft"
                          ? 1
                          : container.size === "45ft"
                          ? 2
                          : 3
                      }
                      onchange={(e) => {
                        const value = (e.target as HTMLSelectElement).value;
                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c, i) =>
                            i === index ? { ...c, size: value as any } : c
                          ),
                        }));
                      }}
                    >
                      <MdSelectOption value="20ft">{`20 ft`}</MdSelectOption>
                      <MdSelectOption value="40ft">{`40 ft`}</MdSelectOption>
                      <MdSelectOption value="45ft">{`45 ft`}</MdSelectOption>
                      <MdSelectOption value="53ft">{`53 ft`}</MdSelectOption>
                    </MdOutlinedSelect>
                    <MdOutlinedTextField
                      label="Quantity / Total"
                      className="text-right"
                      value={container.quantity.toString()}
                      onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        const intValue = parseInt(value);
                        if (isNaN(intValue)) return;

                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c, i) =>
                            i === index ? { ...c, quantity: +value } : c
                          ),
                        }));
                      }}
                      onBlur={(e) => {
                        e.target.value = container.quantity.toString();
                      }}
                    />
                    <MdOutlinedTextField
                      label="Quantity / SOC"
                      className="text-right"
                      value={container.soc.toString()}
                      error={container.soc > container.quantity}
                      errorText="SOC cannot be greater than Quantity"
                      onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        const intValue = parseInt(value);
                        if (isNaN(intValue)) return;

                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c, i) =>
                            i === index ? { ...c, soc: +value } : c
                          ),
                        }));
                      }}
                      onBlur={(e) => {
                        e.target.value = container.soc.toString();
                      }}
                    />
                    <MdIconButton
                      className="mt-2"
                      onClick={() => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.filter((c, i) => i !== index),
                        }));
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </MdIconButton>
                  </div>
                  <DangerousCargoInput container={container} />
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const DangerousCargoInput = ({
  container,
}: {
  container: ContainerInformationType;
}) => {
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
        dry: prev.dry.map((c) =>
          c.uuid === container.uuid
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
            dry: prev.dry.map((c) =>
              c.uuid === container.uuid
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
                  dry: prev.dry.map((c) =>
                    c.uuid === container.uuid
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
                  dry: prev.dry.map((c) =>
                    c.uuid === container.uuid
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
            <MdOutlinedSelect
              label="Package Group"
              selectedIndex={
                container.dangerousCargoInformation.packingGroup === "I"
                  ? 1
                  : container.dangerousCargoInformation.packingGroup === "II"
                  ? 2
                  : container.dangerousCargoInformation.packingGroup === "III"
                  ? 3
                  : 0
              }
              onchange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  dry: prev.dry.map((c) =>
                    c.uuid === container.uuid
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
            >
              <MdSelectOption>None</MdSelectOption>
              <MdSelectOption>I</MdSelectOption>
              <MdSelectOption>II</MdSelectOption>
              <MdSelectOption>III</MdSelectOption>
            </MdOutlinedSelect>
            <MdOutlinedTextField
              label="Proper Shipping Name"
              value={container.dangerousCargoInformation.properShippingName}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setContainerInformation((prev) => ({
                  ...prev,
                  dry: prev.dry.map((c) =>
                    c.uuid === container.uuid
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
                      key={index}
                      label={file.name}
                      selected
                      handleTrailingActionFocus={() => {
                        setContainerInformation((prev) => ({
                          ...prev,
                          dry: prev.dry.map((c) =>
                            c.uuid === container.uuid
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
