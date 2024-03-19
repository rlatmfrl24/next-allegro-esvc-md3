import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { getEmptySIEditContainerData } from "@/app/main/util";
import { SIEditContainerState } from "@/app/store/si.store";
import { MdFilledTonalIconButton } from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/boooking";
import { SIContainerInputProps } from "@/app/util/typeDef/si";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";

const ContainerInput = ({
  title,
  list,
}: {
  title: string;
  list: SIContainerInputProps[];
}) => {
  const setSIEditContainerStore = useSetRecoilState(SIEditContainerState);

  return (
    <Disclosure>
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
                  dry: [
                    ...prev.dry,
                    getEmptySIEditContainerData(ContainerType.dry),
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
                    <div className="flex gap-4 items-start">
                      <NAOutlinedTextField
                        label="Container No."
                        value={container.containerNumber}
                        handleValueChange={(value) => {
                          setSIEditContainerStore((prev) => ({
                            ...prev,
                            dry: prev.dry.map((item) =>
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
                        options={["20", "40", "45"]}
                      />
                    </div>
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
