import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking-request.store";
import {
  MdFilledTonalIconButton,
  MdIconButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import {
  ContainerType,
  ReeferContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import DangerousCargoInput from "./dangerous-cargo-input";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";

const ReeferContainerInput = ({
  list,
}: {
  list: ReeferContainerInformationType[];
}) => {
  const setContainerInformation = useSetRecoilState(ContainerState);

  return (
    <Disclosure>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button className={`flex items-center gap-2`}>
              <div className="w-1 h-4 bg-primary"></div>
              <MdTypography variant="body" size="large" prominent>
                Reefer Container
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
                    reefer: [
                      ...prev.reefer,
                      getEmptyContainerData(
                        ContainerType.reefer
                      ) as ReeferContainerInformationType,
                    ],
                  }));
                }}
              >
                <Add fontSize="small" />
              </MdFilledTonalIconButton>
              <div className="flex flex-col-reverse">
                {list.map((container, index) => {
                  return (
                    <div
                      key={container.uuid}
                      className="mt-6 flex flex-col gap-4"
                    >
                      {list.length - 1 !== index && (
                        <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                      )}
                      <div className="flex gap-4 items-start">
                        <NAOutlinedListBox
                          label="Size"
                          className="w-52 text-right"
                          suffixText="ft"
                          options={["20", "40", "45", "53"]}
                        />
                        <MdOutlinedTextField label="Quantity / Total" />
                        <MdOutlinedTextField label="Quantity / SOC" />
                        <MdIconButton
                          className="mt-2"
                          onClick={() => {
                            setContainerInformation((prev) => ({
                              ...prev,
                              reefer: prev.reefer.filter((c, i) => i !== index),
                            }));
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </MdIconButton>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="flex gap-2">
                          <MdOutlinedTextField label="Degree" />
                          <NAOutlinedListBox options={["℃", "℉"]} />
                        </div>
                        <div className="flex gap-2">
                          <MdOutlinedTextField label="Ventilation" />
                          <NAOutlinedListBox options={["%Open", "%Close"]} />
                        </div>
                        <NAOutlinedListBox
                          label="Nature"
                          options={["Chilled", "Frozen"]}
                        />
                        <MdOutlinedTextField label="Humidity" suffixText="%" />
                        <NAOutlinedListBox
                          label="Gen"
                          options={["Yes", "No"]}
                        />
                      </div>

                      <DangerousCargoInput
                        container={container}
                        type={ContainerType.reefer}
                      />
                    </div>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
};

export default ReeferContainerInput;
