import { DetailTitle } from "@/app/components/title-components";
import { getEmptySIEditContainerData } from "@/app/main/util";
import { SIEditContainerState } from "@/app/store/si.store";
import { MdFilledTonalIconButton } from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/booking";
import { SIContainerInputProps } from "@/app/util/typeDef/si";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ContainerInput from "./container-input";

const ContainerTypeInputComponent = ({
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

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <div className="flex gap-2 justify-center items-center">
            <MdFilledTonalIconButton
              className="min-w-[40px] min-h-[40px] h-fit"
              onClick={() => {
                if (typeKey === "weightUnit" || typeKey === "measurementUnit")
                  return;

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
            <Disclosure.Button className={`flex w-full items-center gap-2`}>
              <DetailTitle title={title} />
              <div className="flex-1 border-b border-b-outlineVariant"></div>
              <ArrowDropDown
                className={`transform transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className={`flex pl-12 gap-4`}>
            <div className="flex flex-col-reverse w-full">
              {list.map((container, index) => {
                return (
                  <ContainerInput
                    key={container.uuid}
                    container={container}
                    containerIndex={index}
                    isLastItem={list.length - 1 === index}
                  />
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ContainerTypeInputComponent;
