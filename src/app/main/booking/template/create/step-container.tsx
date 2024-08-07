import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import EmptyContainerPlaceholder from "@/../public/image_empty_container_placeholder.svg";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import OpenTopContainerImage from "@/../public/img_open_top_container.svg";
import FlatRackContainerImage from "@/../public/img_flat_rack_container.svg";
import TankContainerImage from "@/../public/img_tank_container.svg";
import BulkContainerImage from "@/../public/img_bulk_container.svg";
import { SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  BookingRequestStepState,
  ContainerState,
} from "@/app/store/booking.store";
import { QuotationTermsState } from "@/app/store/pricing.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import {
  ContainerType,
  DryContainerInformationType,
} from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";

import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DividerComponent } from "@/app/components/divider";
import { getEmptyContainerData } from "@/app/main/util";
import ContainerToggleButton from "../../request/components/container-toggle-button";
import DryContainerInput from "../../request/components/dry-container-input";
import ReeferContainerInput from "../../request/components/reefer-container-input";
import OpenTopContainerInput from "../../request/components/opentop-container-input";
import FlatRackContainerInput from "../../request/components/flatrack-container-input";
import TankContainerInput from "../../request/components/tank-container-input";
import BulkContainerInput from "../../request/components/bulk-container-input";

export default function ContainerStep() {
  // const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
    BookingRequestStepState
  );
  const [containerInformation, setContainerInformation] =
    useRecoilState(ContainerState);
  const [typeSelections, setTypeSelections] = useState<ContainerType[]>(
    Object.keys(ContainerType).map(
      (key) => ContainerType[key as keyof typeof ContainerType]
    )
  );

  function ValidateContainerInput() {
    let isValid = true;

    containerInformation.dry.forEach((container) => {
      if (container.size === "" || container.quantity === 0) {
        isValid = false;
      }
    });
    containerInformation.reefer.forEach((container) => {
      if (container.size === "" || container.quantity === 0) {
        isValid = false;
      }
    });
    containerInformation.opentop.forEach((container) => {
      if (container.size === "" || container.quantity === 0) {
        isValid = false;
      }
    });
    containerInformation.flatrack.forEach((container) => {
      if (container.size === "" || container.quantity === 0) {
        isValid = false;
      }
    });
    containerInformation.tank.forEach((container) => {
      if (container.size === "" || container.quantity === 0) {
        isValid = false;
      }
    });

    return isValid;
  }

  const isValid = useCallback(ValidateContainerInput, [
    containerInformation.dry,
    containerInformation.flatrack,
    containerInformation.opentop,
    containerInformation.reefer,
    containerInformation.tank,
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
        visited: true,
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

    const defaultContainerSizeOptions = ["20", "40", "40HC"];

    const typeKey = type.toLowerCase() as keyof typeof containerInformation;
    const emptyData = getEmptyContainerData(type, defaultContainerSizeOptions);

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

  // use Quotation Data
  const params = useSearchParams();

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
          // count={
          //   containerInformation.dry.length === 0
          //     ? undefined
          //     : containerInformation.dry.length
          // }
          count={
            containerInformation.dry.length === 0
              ? undefined
              : containerInformation.dry.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                )
          }
          hoverText={
            <div>
              {containerInformation.dry.map((container, index) => {
                return (
                  container.size &&
                  container.quantity !== 0 && (
                    <div key={index} className="flex gap-4">
                      <MdTypography
                        variant="title"
                        size="medium"
                        className="text-white"
                      >
                        {container.size + " x" + container.quantity}
                      </MdTypography>
                    </div>
                  )
                );
              })}
            </div>
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
              : containerInformation.reefer.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                )
          }
          hoverText={
            <div>
              {containerInformation.reefer.map((container, index) => {
                return (
                  container.size &&
                  container.quantity !== 0 && (
                    <div key={index} className="flex gap-4">
                      <MdTypography
                        variant="title"
                        size="medium"
                        className="text-white"
                      >
                        {container.size + " x" + container.quantity}
                      </MdTypography>
                    </div>
                  )
                );
              })}
            </div>
          }
        />
        <ContainerToggleButton
          image={<OpenTopContainerImage />}
          isSelected={typeSelections.includes(ContainerType.opentop)}
          onClick={() => {
            handleTypeSelections(ContainerType.opentop);
          }}
          title="Open Top"
          count={
            containerInformation.opentop.length === 0
              ? undefined
              : containerInformation.opentop.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                )
          }
          hoverText={
            <div>
              {containerInformation.opentop.map((container, index) => {
                return (
                  container.size &&
                  container.quantity !== 0 && (
                    <div key={index} className="flex gap-4">
                      <MdTypography
                        variant="title"
                        size="medium"
                        className="text-white"
                      >
                        {container.size + " x" + container.quantity}
                      </MdTypography>
                    </div>
                  )
                );
              })}
            </div>
          }
        />
        <ContainerToggleButton
          image={<FlatRackContainerImage />}
          isSelected={typeSelections.includes(ContainerType.flatrack)}
          onClick={() => {
            handleTypeSelections(ContainerType.flatrack);
          }}
          title="Flat Rack"
          count={
            containerInformation.flatrack.length === 0
              ? undefined
              : containerInformation.flatrack.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                )
          }
          hoverText={
            <div>
              {containerInformation.flatrack.map((container, index) => {
                return (
                  container.size &&
                  container.quantity !== 0 && (
                    <div key={index} className="flex gap-4">
                      <MdTypography
                        variant="title"
                        size="medium"
                        className="text-white"
                      >
                        {container.size + " x" + container.quantity}
                      </MdTypography>
                    </div>
                  )
                );
              })}
            </div>
          }
        />
        <ContainerToggleButton
          image={<TankContainerImage />}
          isSelected={typeSelections.includes(ContainerType.tank)}
          onClick={() => {
            handleTypeSelections(ContainerType.tank);
          }}
          title="Tank"
          count={
            containerInformation.tank.length === 0
              ? undefined
              : containerInformation.tank.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                )
          }
          hoverText={
            <div>
              {containerInformation.tank.map((container, index) => {
                return (
                  container.size &&
                  container.quantity !== 0 && (
                    <div key={index} className="flex gap-4">
                      <MdTypography
                        variant="title"
                        size="medium"
                        className="text-white"
                      >
                        {container.size + " x" + container.quantity}
                      </MdTypography>
                    </div>
                  )
                );
              })}
            </div>
          }
        />
        <ContainerToggleButton
          image={<BulkContainerImage />}
          isSelected={typeSelections.includes(ContainerType.bulk)}
          onClick={() => {
            handleTypeSelections(ContainerType.bulk);
          }}
          title="Bulk"
          // Bulk container does not have quantity
          count={
            containerInformation.bulk.length === 0
              ? undefined
              : containerInformation.bulk.length
          }
          hoverText={
            <div>
              {containerInformation.bulk.length !== 0 && (
                <MdTypography
                  variant="title"
                  size="medium"
                  className="text-white"
                >
                  {"Bulk x" + containerInformation.bulk.length}
                </MdTypography>
              )}
            </div>
          }
        />
      </div>
      <div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
        {typeSelections.map((type) => {
          return (
            <div key={type}>
              {type === ContainerType.dry && (
                <DryContainerInput
                  list={containerInformation.dry}
                  showRequired={false}
                />
              )}
              {type === ContainerType.reefer && (
                <ReeferContainerInput
                  list={containerInformation.reefer}
                  showRequired={false}
                />
              )}
              {type === ContainerType.opentop && (
                <OpenTopContainerInput
                  list={containerInformation.opentop}
                  showRequired={false}
                />
              )}
              {type === ContainerType.flatrack && (
                <FlatRackContainerInput
                  list={containerInformation.flatrack}
                  showRequired={false}
                />
              )}
              {type === ContainerType.tank && (
                <TankContainerInput
                  list={containerInformation.tank}
                  showRequired={false}
                />
              )}
              {type === ContainerType.bulk && (
                <BulkContainerInput list={containerInformation.bulk} />
              )}
            </div>
          );
        })}
        {typeSelections.length === 0 && (
          <div className="flex-1 flex-col flex items-center justify-center gap-8 pt-6">
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
      <div className="flex items-end justify-end mt-6 flex-1">
        <MdFilledButton onClick={() => moveToAdditionalInformationStep()}>
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
