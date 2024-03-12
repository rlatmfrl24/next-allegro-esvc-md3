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
import { useEffect, useRef, useState } from "react";
import {
  BulkContainerInformationType,
  ContainerInformationType,
  ContainerType,
  DryContainerInformationType,
  FlatRackContainerInformationType,
  OpenTopContainerInformationType,
  ReeferContainerInformationType,
  TankContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline, Upload } from "@mui/icons-material";
import NaToggleButton from "@/app/components/na-toggle-button";
import ContainerToggleButton from "./components/container-toggle-button";
import DangerousCargoInput from "./components/dangerous-cargo-input";
import DryContainerInputContainer from "./components/dry-container-input";
import ReeferContainerInput from "./components/reefer-container-input";
import { Flat, get } from "lodash";
import { getEmptyContainerData } from "../../util";
import OpenTopContainerInput from "./components/opentop-container-input";
import FlatRackContainerInput from "./components/flatrack-container-input";
import TankContainerInputContainer from "./components/tank-container-input";
import BulkContainerInput from "./components/bulk-container-input";

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
    const emptyData = getEmptyContainerData(type);

    if (containerInformation[typeKey].length === 0) {
      setContainerInformation((prev) => ({
        ...prev,
        [typeKey]: [
          ...prev[type.toLowerCase() as keyof typeof prev],
          emptyData,
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
      <div className="flex flex-col w-full mt-6 gap-6">
        {typeSelections.includes(ContainerType.dry) && (
          <DryContainerInputContainer list={containerInformation.dry} />
        )}
        {typeSelections.includes(ContainerType.reefer) && (
          <ReeferContainerInput list={containerInformation.reefer} />
        )}
        {typeSelections.includes(ContainerType.opentop) && (
          <OpenTopContainerInput list={containerInformation.opentop} />
        )}
        {typeSelections.includes(ContainerType.flatrack) && (
          <FlatRackContainerInput list={containerInformation.flatrack} />
        )}
        {typeSelections.includes(ContainerType.tank) && (
          <TankContainerInputContainer list={containerInformation.tank} />
        )}
        {typeSelections.includes(ContainerType.bulk) && (
          <BulkContainerInput list={containerInformation.bulk} />
        )}
      </div>
      <div className="flex-1 flex items-end justify-end mt-6">
        <MdFilledButton onClick={() => moveToAdditionalInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
