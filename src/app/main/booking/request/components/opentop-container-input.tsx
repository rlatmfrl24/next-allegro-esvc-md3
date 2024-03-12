import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import { ContainerState } from "@/app/store/booking-request.store";
import { MdFilledTonalIconButton } from "@/app/util/md3";
import {
  ContainerType,
  OpenTopContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";

const OpenTopContainerInput = ({
  list,
}: {
  list: OpenTopContainerInformationType[];
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
                Open Top Container
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
                    opentop: [
                      ...prev.opentop,
                      getEmptyContainerData(
                        ContainerType.opentop
                      ) as OpenTopContainerInformationType,
                    ],
                  }));
                }}
              >
                <Add fontSize="small" />
              </MdFilledTonalIconButton>
              <div className="flex flex-col-reverse">
                {list.map((container, index) => {
                  return (
                    <div key={index} className="flex gap-4 items-center mt-4">
                      {list.length - 1 !== index && (
                        <div className="w-full border-dotted border-b border-b-outlineVariant mb-4"></div>
                      )}
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

export default OpenTopContainerInput;
