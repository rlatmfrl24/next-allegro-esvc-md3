import { MdTypography } from "@/app/components/typography";
import { SIEditContainerState, SIEditStepState } from "@/app/store/si.store";
import { MdFilledButton } from "@/app/util/md3";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ContainerToggleButton from "./components/container-toggle-button";
import { ContainerType } from "@/app/util/typeDef/boooking";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import EmptyContainerPlaceholder from "@/../public/image_empty_container_placeholder.svg";
import ContainerInput from "./components/container-input";
import { getEmptySIEditContainerData } from "@/app/main/util";

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
      setSIEditContainerStore((prev) => ({
        ...prev,
        [typeKey]: [
          ...prev[type.toLowerCase() as keyof typeof prev],
          emptyContainerData,
        ],
      }));
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center">
        <MdTypography variant="title" size="large" className="mb-6">
          Container
        </MdTypography>
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
                <ContainerInput
                  title="Dry Container"
                  list={siContainerStore.dry}
                />
              )}
              {type === ContainerType.reefer && (
                <ContainerInput
                  title="Reefer Container"
                  list={siContainerStore.reefer}
                />
              )}
              {type === ContainerType.opentop && (
                <ContainerInput
                  title="Open Top Container"
                  list={siContainerStore.opentop}
                />
              )}
              {type === ContainerType.flatrack && (
                <ContainerInput
                  title="Flat Rack Container"
                  list={siContainerStore.flatrack}
                />
              )}
              {type === ContainerType.tank && (
                <ContainerInput
                  title="Tank Container"
                  list={siContainerStore.tank}
                />
              )}
              {type === ContainerType.bulk && (
                <ContainerInput
                  title="Bulk Container"
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
