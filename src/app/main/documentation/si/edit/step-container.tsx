import { MdTypography } from "@/app/components/typography";
import { SIEditContainerState, SIEditStepState } from "@/app/store/si.store";
import { MdFilledButton } from "@/app/util/md3";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ContainerToggleButton from "./components/container-toggle-button";
import { ContainerType } from "@/app/util/typeDef/boooking";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import EmptyContainerPlaceholder from "@/../public/image_empty_container_placeholder.svg";
import ContainerTypeInputComponent from "./components/container-type-input";
import {
  getEmptySIEditContainerData,
  sumContainerMeasurement,
  sumContainerQuantity,
  sumContainerWeight,
} from "@/app/main/util";
import LabelChip from "@/app/components/label-chip";
import { DividerComponent } from "@/app/main/booking/information/components/base";

export default function StepContainer() {
  const setSIEditStep = useSetRecoilState(SIEditStepState);
  const [typeSelections, setTypeSelections] = useState<ContainerType[]>([]);
  const [siContainerStore, setSIEditContainerStore] =
    useRecoilState(SIEditContainerState);

  useEffect(() => {
    setSIEditStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isCompleted: true,
      },
    }));
  }, [setSIEditStep]);

  const moveToMarkDescriptionStep = useCallback(() => {
    setSIEditStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isSelected: false,
      },
      markDescription: {
        ...prev.markDescription,
        isSelected: true,
      },
    }));
  }, [setSIEditStep]);

  function handleTypeSelections(type: ContainerType) {
    if (typeSelections.includes(type)) {
      setTypeSelections((prev) => prev.filter((t) => t !== type));
    } else {
      setTypeSelections((prev) => [...prev, type]);
    }

    const typeKey = type.toLowerCase() as keyof typeof siContainerStore;
    const emptyContainerData = getEmptySIEditContainerData(type);

    if (siContainerStore[typeKey].length === 0) {
      if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

      setSIEditContainerStore((prev) => ({
        ...prev,
        [typeKey]: [...prev[typeKey], emptyContainerData],
      }));
    }
  }

  useEffect(() => {
    siContainerStore.dry.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.dry));
    siContainerStore.reefer.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.reefer)
      );
    siContainerStore.opentop.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.opentop)
      );
    siContainerStore.flatrack.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.flatrack)
      );
    siContainerStore.tank.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.tank));
    siContainerStore.bulk.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.bulk));
  }, [
    siContainerStore.bulk.length,
    siContainerStore.dry.length,
    siContainerStore.flatrack.length,
    siContainerStore.opentop.length,
    siContainerStore.reefer.length,
    siContainerStore.tank.length,
  ]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <MdTypography variant="title" size="large">
          Container
        </MdTypography>
        <div className="bg-surfaceContainerHigh rounded-2xl px-4 py-1 flex items-center">
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-primary"
          >
            {sumContainerQuantity([
              ...siContainerStore.dry,
              ...siContainerStore.reefer,
              ...siContainerStore.opentop,
              ...siContainerStore.flatrack,
              ...siContainerStore.tank,
              ...siContainerStore.bulk,
            ])}
          </MdTypography>
          <DividerComponent
            orientation="vertical"
            className="mx-4 h-4 flex items-center"
          />
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-primary"
          >
            {sumContainerWeight([
              ...siContainerStore.dry,
              ...siContainerStore.reefer,
              ...siContainerStore.opentop,
              ...siContainerStore.flatrack,
              ...siContainerStore.tank,
              ...siContainerStore.bulk,
            ])}
          </MdTypography>
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline ml-2"
          >
            {siContainerStore.weightUnit}
          </MdTypography>
          <DividerComponent
            orientation="vertical"
            className="mx-4 h-4 flex items-center"
          />
          <MdTypography
            variant="body"
            size="medium"
            prominent
            className="text-primary"
          >
            {sumContainerMeasurement([
              ...siContainerStore.dry,
              ...siContainerStore.reefer,
              ...siContainerStore.opentop,
              ...siContainerStore.flatrack,
              ...siContainerStore.tank,
              ...siContainerStore.bulk,
            ])}
          </MdTypography>
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline ml-2"
          >
            {siContainerStore.measurementUnit}
          </MdTypography>
        </div>
      </div>
      <div className="flex gap-4">
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.dry)}
          title="Dry"
          onClick={() => handleTypeSelections(ContainerType.dry)}
          count={
            siContainerStore.dry.length === 0
              ? undefined
              : siContainerStore.dry.length
          }
        />
        <ContainerToggleButton
          image={<ReeferContainerImage />}
          isSelected={typeSelections.includes(ContainerType.reefer)}
          title="Reefer"
          onClick={() => handleTypeSelections(ContainerType.reefer)}
          count={
            siContainerStore.reefer.length === 0
              ? undefined
              : siContainerStore.reefer.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.opentop)}
          title="Open top"
          onClick={() => handleTypeSelections(ContainerType.opentop)}
          count={
            siContainerStore.opentop.length === 0
              ? undefined
              : siContainerStore.opentop.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.flatrack)}
          title="Flat rack"
          onClick={() => handleTypeSelections(ContainerType.flatrack)}
          count={
            siContainerStore.flatrack.length === 0
              ? undefined
              : siContainerStore.flatrack.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.tank)}
          title="Tank"
          onClick={() => handleTypeSelections(ContainerType.tank)}
          count={
            siContainerStore.tank.length === 0
              ? undefined
              : siContainerStore.tank.length
          }
        />
        <ContainerToggleButton
          image={<DryContainerImage />}
          isSelected={typeSelections.includes(ContainerType.bulk)}
          title="Bulk"
          onClick={() => handleTypeSelections(ContainerType.bulk)}
          count={
            siContainerStore.bulk.length === 0
              ? undefined
              : siContainerStore.bulk.length
          }
        />
      </div>
      <div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
        {typeSelections.map((type) => {
          return (
            <div key={type}>
              {type === ContainerType.dry && (
                <ContainerTypeInputComponent
                  title="Dry Container"
                  type={ContainerType.dry}
                  list={siContainerStore.dry}
                />
              )}
              {type === ContainerType.reefer && (
                <ContainerTypeInputComponent
                  title="Reefer Container"
                  type={ContainerType.reefer}
                  list={siContainerStore.reefer}
                />
              )}
              {type === ContainerType.opentop && (
                <ContainerTypeInputComponent
                  title="Open Top Container"
                  type={ContainerType.opentop}
                  list={siContainerStore.opentop}
                />
              )}
              {type === ContainerType.flatrack && (
                <ContainerTypeInputComponent
                  title="Flat Rack Container"
                  type={ContainerType.flatrack}
                  list={siContainerStore.flatrack}
                />
              )}
              {type === ContainerType.tank && (
                <ContainerTypeInputComponent
                  title="Tank Container"
                  type={ContainerType.tank}
                  list={siContainerStore.tank}
                />
              )}
              {type === ContainerType.bulk && (
                <ContainerTypeInputComponent
                  title="Bulk Container"
                  type={ContainerType.bulk}
                  list={siContainerStore.bulk}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
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
      <div className="flex-1 flex justify-end items-end">
        <MdFilledButton
          className="h-fit"
          onClick={() => moveToMarkDescriptionStep()}
        >
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}
