import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import EmptyContainerPlaceholder from "@/../public/image_empty_container_placeholder.svg";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  ContainerState,
} from "@/app/store/booking.store";
import { MdFilledButton } from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/boooking";

import { getEmptyContainerData } from "../../util";
import BulkContainerInput from "./components/bulk-container-input";
import ContainerToggleButton from "./components/container-toggle-button";
import DryContainerInput from "./components/dry-container-input";
import FlatRackContainerInput from "./components/flatrack-container-input";
import OpenTopContainerInput from "./components/opentop-container-input";
import ReeferContainerInput from "./components/reefer-container-input";
import TankContainerInput from "./components/tank-container-input";

export default function ContainerStep() {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [typeSelections, setTypeSelections] = useState<ContainerType[]>([]);
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);

  function ValidateContainerInput() {
    // if container's type is "" or container's number is 0, return false
    if (typeSelections.length === 0) {
      return false;
    }

    let isValid = true;
    typeSelections.forEach((type) => {
      const typeKey = type.toLowerCase() as keyof typeof containerInformation;
      const containerList = containerInformation[typeKey];
      containerList.forEach((container) => {
        if (
          container.type === ContainerType.dry ||
          container.type === ContainerType.reefer ||
          container.type === ContainerType.opentop ||
          container.type === ContainerType.flatrack ||
          container.type === ContainerType.tank
        ) {
          if (container.size === "" || container.quantity === 0) {
            isValid = false;
          }
        }
      });
    });

    return isValid;
  }

  const isValid = useCallback(ValidateContainerInput, [
    containerInformation,
    typeSelections,
  ]);

  useEffect(() => {
    setBookingRequestStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isCompleted: isValid(),
      },
    }));
  }, [isValid, setBookingRequestStep]);

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
    containerInformation.dry.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.dry));
    containerInformation.reefer.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.reefer)
      );
    containerInformation.opentop.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.opentop)
      );
    containerInformation.flatrack.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.flatrack)
      );
    containerInformation.tank.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.tank));
    containerInformation.bulk.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.bulk));
  }, [
    containerInformation.bulk.length,
    containerInformation.dry.length,
    containerInformation.flatrack.length,
    containerInformation.opentop.length,
    containerInformation.reefer.length,
    containerInformation.tank.length,
  ]);

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
      <div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
        {typeSelections.map((type) => {
          return (
            <div key={type}>
              {type === ContainerType.dry && (
                <DryContainerInput list={containerInformation.dry} />
              )}
              {type === ContainerType.reefer && (
                <ReeferContainerInput list={containerInformation.reefer} />
              )}
              {type === ContainerType.opentop && (
                <OpenTopContainerInput list={containerInformation.opentop} />
              )}
              {type === ContainerType.flatrack && (
                <FlatRackContainerInput list={containerInformation.flatrack} />
              )}
              {type === ContainerType.tank && (
                <TankContainerInput list={containerInformation.tank} />
              )}
              {type === ContainerType.bulk && (
                <BulkContainerInput list={containerInformation.bulk} />
              )}
            </div>
          );
        })}
        {typeSelections.length === 0 && (
          <div className="flex-1 flex-col flex items-center justify-center gap-8">
            <EmptyContainerPlaceholder />
            <MdTypography
              variant="headline"
              size="medium"
              className="text-outlineVariant"
            >
              Please select the container type you want to add.
            </MdTypography>
          </div>
        )}
      </div>
      <div className="flex items-end justify-end mt-6">
        <MdFilledButton onClick={() => moveToAdditionalInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
